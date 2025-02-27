import type { Post, APIResponsePost } from "../types";

// Ensure environment variable is set
if (!import.meta.env.WP_DOMAIN) {
  throw new Error("❌ WP_DOMAIN is not defined in .env!");
}

const domain = import.meta.env.WP_DOMAIN;
const apiUrl = `https://www.telesign.com//wp-json/wp/v2`;

//function to fetch the wordpress page data to astro
export const getPageInfo = async (slug: string) => {
  const response = await fetch(`${apiUrl}/pages?slug=${slug}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch page data: ${response.statusText}`);
  }

  //destructuring data object and get the info
  const [data] = await response.json();
  //get the data to render on the pages
  const {
    title: { rendered: title },
    content: { rendered: content },
    yoast_head_json: seo,
  } = data;
  return { title, content, seo };
};

//function to fetch the wordpress latest articles data to astro
export const getLatestArticles = async ({
  perPage = 10,
  apiUrl,
}: {
  perPage?: number;
  apiUrl: string;
}) => {
  const response = await fetch(
    `${apiUrl}/wp-json/wp/v2/posts?per_page=${perPage}&_embed`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch latest posts`);
  }
  const results = await response.json();
  if (!results.length) {
    throw new Error(`No posts found`);
  }
  const posts: Post[] = results.map((post: APIResponsePost) => {
    //destructuring data object and get the info
    const title = post.title.rendered;
    const excerpt = post.excerpt.rendered;
    const content = post.content.rendered;
    const date = post.date;
    const slug = post.slug;
    const featuredMedia =
      post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
      "default-image-url.jpg";
    const category =
      post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Unknown Category";
    const link = post.link;
    return {
      title,
      excerpt,
      content,
      date,
      slug,
      featuredMedia,
      category,
      link,
    };
  });

  return posts;
};

// Function to fetch categories from both APIs
export const getAllCategories = async () => {
  const primaryCategories = await fetchCategories(
    "https://www.telesign.com/wp-json/wp/v2"
  );
  const secondaryCategories = await fetchCategories(
    "https://www.rollingstone.com/wp-json/wp/v2"
  );

  return [...primaryCategories, ...secondaryCategories];
};

const fetchCategories = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/categories?per_page=100`);
    if (!response.ok) return [];

    const categories = await response.json();
    return categories.map((category: any) => ({
      id: category.id,
      slug: category.slug,
      name: category.name,
      apiUrl,
    }));
  } catch (error) {
    console.warn(`Failed to fetch categories from ${apiUrl}: ${error.message}`);
    return [];
  }
};

// Function to fetch category data by slug
export const getCategoryBySlug = async (slug: string) => {
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

const fetchCategory = async (apiUrl: string, slug: string) => {
  try {
    const response = await fetch(`${apiUrl}/categories?slug=${slug}`);
    if (!response.ok) return null;

    const categories = await response.json();
    if (!categories.length) return null;

    return {
      id: categories[0].id,
      name: categories[0].name,
      description: categories[0].description,
      title: categories[0].name,
      seo: categories[0].yoast_head,
      apiUrl,
    };
  } catch (error) {
    console.warn(`Failed to fetch category from ${apiUrl}: ${error.message}`);
    return null;
  }
};

// Function to fetch posts by category from both APIs
export const getArticlesByCategory = async ({
  perPage = 3,
  categoryId,
}: {
  perPage?: number;
  categoryId: number;
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

const fetchCategoryArticles = async (
  apiUrl: string,
  categoryId: number,
  perPage: number
) => {
  try {
    const response = await fetch(
      `${apiUrl}/posts?categories=${categoryId}&per_page=${perPage}&_embed`
    );
    if (!response.ok) return [];

    const results = await response.json();
    return results.map((post: any) => ({
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      slug: post.slug,
      featuredMedia:
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        "default-image-url.jpg",
      category:
        post._embedded?.["wp:term"]?.[0]?.[0]?.name || "Unknown Category",
      apiUrl,
    }));
  } catch (error) {
    console.warn(`Failed to fetch posts from ${apiUrl}: ${error.message}`);
    return [];
  }
};

export const getAllPostsSlugs = async () => {
  const primarySlugs = await fetchSlugs(
    "https://www.telesign.com/wp-json/wp/v2"
  );
  const secondarySlugs = await fetchSlugs(
    "https://www.rollingstone.com/wp-json/wp/v2"
  );

  return [...primarySlugs, ...secondarySlugs]; // ✅ Merge both sources
};

const fetchSlugs = async (apiUrl: string) => {
  try {
    const response = await fetch(`${apiUrl}/posts?per_page=100`);
    if (!response.ok) return [];

    const results = await response.json();
    return results.map((post: APIResponsePost) => post.slug);
  } catch (error) {
    console.warn(`Failed to fetch slugs from ${apiUrl}: ${error.message}`);
    return [];
  }
};

// Function to fetch the WordPress post info per slug with embedded taxonomy data
export const getPostInfo = async (slug: string) => {
  const primaryApiUrl = "https://www.telesign.com/wp-json/wp/v2";
  const secondaryApiUrl = "https://www.rollingstone.com/wp-json/wp/v2";

  try {
    const primaryPost = await fetchPostInfo(primaryApiUrl, slug);
    if (primaryPost) return primaryPost; // ✅ If post exists in Telesign, return it
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
    return null; // ✅ Instead of throwing, return `null` so Astro can handle it
  }
};

// Helper function to fetch post info from a given API URL
const fetchPostInfo = async (apiUrl: string, slug: string) => {
  const response = await fetch(`${apiUrl}/posts?slug=${slug}&_embed`);

  if (!response.ok) {
    throw new Error(`Failed to fetch post data from ${apiUrl}`);
  }

  // Destructure the first (and only) post from the JSON response
  const [data] = await response.json();

  // Destructure the needed fields from the data object
  const {
    title: { rendered: title },
    content: { rendered: content },
    yoast_head_json: seo,
    date,
    author,
  } = data;

  // Using the _embedded property to safely extract the category name.
  const category =
    data._embedded?.["wp:term"]?.[0]?.[0]?.name || "Unknown Category";
  const categorySlug =
    data._embedded?.["wp:term"]?.[0]?.[0]?.slug || "Unknown Category";
  const featuredMedia =
    data._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "default-image-url.jpg";

  // Return the extracted data, including category and source API URL
  return {
    title,
    content,
    seo,
    category,
    author,
    categorySlug,
    date,
    apiUrl,
    featuredMedia,
  };
};

export const getAuthorById = async (authorId: number | string) => {
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

// Helper function to fetch author data from a given API URL
const fetchAuthor = async (apiUrl: string, authorId: number | string) => {
  const id = typeof authorId === "string" ? parseInt(authorId, 10) : authorId;
  const response = await fetch(`${apiUrl}/users/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch author data from ${apiUrl}`);
  }

  const authorData = await response.json();
  return { id: authorData.id, name: authorData.name, apiUrl };
};
