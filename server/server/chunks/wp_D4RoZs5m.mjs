function formatDate(dateStr) {
  const date = new Date(dateStr);
  const options = {
    month: "long",
    day: "numeric",
    year: "numeric"
  };
  return date.toLocaleDateString("en-US", options);
}

const domain = "https://telesign.com";
const apiUrl = `${domain}/wp-json/wp/v2`;
const getPageInfo = async (slug) => {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch page data: ${response.statusText}`);
  }
  const [data] = await response.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
    yoast_head_json: seo
  } = data;
  return { title, content, seo };
};
const getLatestArticles = async ({
  perPage = 10,
  apiUrl: apiUrl2
}) => {
  const response = await fetch(
    `${apiUrl2}/wp-json/wp/v2/posts?per_page=${perPage}&_embed`
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch latest posts`);
  }
  const results = await response.json();
  if (!results.length) {
    throw new Error(`No posts found`);
  }
  const posts = results.map((post) => {
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered;
    const content = post.content.rendered;
    const date = post.date;
    const slug = post.slug;
    const featuredMedia = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "default-image-url.jpg";
    const category = post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Unknown Category";
    const link = post.link;
    return {
      title,
      excerpt,
      content,
      date,
      slug,
      featuredMedia,
      category,
      link
    };
  });
  return posts;
};
const getCategoryBySlug = async (slug) => {
  const primaryCategory = await fetchCategory(
    "https://www.telesign.com/wp-json/wp/v2",
    slug
  );
  if (primaryCategory) return primaryCategory;
  const secondaryCategory = await fetchCategory(
    "https://www.rollingstone.com/wp-json/wp/v2",
    slug
  );
  if (secondaryCategory) return secondaryCategory;
  throw new Error(`Category ${slug} not found in any API.`);
};
const fetchCategory = async (apiUrl2, slug) => {
  try {
    const response = await fetch(`${apiUrl2}/categories?slug=${slug}`);
    if (!response.ok) return null;
    const categories = await response.json();
    if (!categories.length) return null;
    return {
      id: categories[0].id,
      name: categories[0].name,
      description: categories[0].description,
      title: categories[0].name,
      seo: categories[0].yoast_head,
      apiUrl: apiUrl2
    };
  } catch (error) {
    console.warn(`Failed to fetch category from ${apiUrl2}: ${error.message}`);
    return null;
  }
};
const getArticlesByCategory = async ({
  perPage = 3,
  categoryId
}) => {
  const primaryArticles = await fetchCategoryArticles(
    "https://www.telesign.com/wp-json/wp/v2",
    categoryId,
    perPage
  );
  const secondaryArticles = await fetchCategoryArticles(
    "https://www.rollingstone.com/wp-json/wp/v2",
    categoryId,
    perPage
  );
  return [...primaryArticles, ...secondaryArticles];
};
const fetchCategoryArticles = async (apiUrl2, categoryId, perPage) => {
  try {
    const response = await fetch(
      `${apiUrl2}/posts?categories=${categoryId}&per_page=${perPage}&_embed`
    );
    if (!response.ok) return [];
    const results = await response.json();
    return results.map((post) => ({
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      slug: post.slug,
      featuredMedia: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "default-image-url.jpg",
      category: post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Unknown Category",
      apiUrl: apiUrl2
    }));
  } catch (error) {
    console.warn(`Failed to fetch posts from ${apiUrl2}: ${error.message}`);
    return [];
  }
};
const getPostInfo = async (slug) => {
  const primaryApiUrl = "https://www.telesign.com/wp-json/wp/v2";
  const secondaryApiUrl = "https://www.rollingstone.com/wp-json/wp/v2";
  try {
    const primaryPost = await fetchPostInfo(primaryApiUrl, slug);
    if (primaryPost) return primaryPost;
  } catch (error) {
    console.warn(
      `Primary API failed: ${error.message}. Trying secondary API...`
    );
  }
  try {
    const secondaryPost = await fetchPostInfo(secondaryApiUrl, slug);
    if (!secondaryPost) {
      throw new Error("Post not found in secondary API");
    }
    return secondaryPost;
  } catch (secondError) {
    console.error(`Both APIs failed: ${secondError.message}`);
    return null;
  }
};
const fetchPostInfo = async (apiUrl2, slug) => {
  const response = await fetch(`${apiUrl2}/posts?slug=${slug}&_embed`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post data from ${apiUrl2}`);
  }
  const [data] = await response.json();
  const {
    title: { rendered: title },
    content: { rendered: content },
    yoast_head_json: seo,
    date,
    author
  } = data;
  const category = data._embedded?.["wp:term"]?.[0]?.[0]?.name || "Unknown Category";
  const categorySlug = data._embedded?.["wp:term"]?.[0]?.[0]?.slug || "Unknown Category";
  const featuredMedia = data._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "default-image-url.jpg";
  return {
    title,
    content,
    seo,
    category,
    author,
    categorySlug,
    date,
    apiUrl: apiUrl2,
    featuredMedia
  };
};
const getAuthorById = async (authorId) => {
  const primaryApiUrl = "https://www.telesign.com/wp-json/wp/v2";
  const secondaryApiUrl = "https://www.rollingstone.com/wp-json/wp/v2";
  try {
    return await fetchAuthor(primaryApiUrl, authorId);
  } catch (error) {
    console.warn(
      `Primary API (${primaryApiUrl}) failed: ${error.message}. Retrying with secondary API...`
    );
    try {
      return await fetchAuthor(secondaryApiUrl, authorId);
    } catch (secondError) {
      console.error(`Both APIs failed: ${secondError.message}`);
      throw new Error("Failed to fetch author information from all sources.");
    }
  }
};
const fetchAuthor = async (apiUrl2, authorId) => {
  const id = typeof authorId === "string" ? parseInt(authorId, 10) : authorId;
  const response = await fetch(`${apiUrl2}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch author data from ${apiUrl2}`);
  }
  const authorData = await response.json();
  return { id: authorData.id, name: authorData.name, apiUrl: apiUrl2 };
};

export { getArticlesByCategory as a, getPostInfo as b, getAuthorById as c, getPageInfo as d, getLatestArticles as e, formatDate as f, getCategoryBySlug as g };
