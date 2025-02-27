import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Dzq3yZD1.mjs';
import 'kleur/colors';
import { $ as $$BlogCard } from '../../chunks/BlogCard_Dwz9GtDX.mjs';
import { $ as $$Layout } from '../../chunks/Layout_CXx4V0Wm.mjs';
import { g as getCategoryBySlug, a as getArticlesByCategory } from '../../chunks/wp_D4RoZs5m.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  const { category } = Astro2.params;
  if (!category) {
    return Astro2.redirect("/404");
  }
  const categoryData = await getCategoryBySlug(category);
  if (!categoryData) {
    return Astro2.redirect("/404");
  }
  const posts = await getArticlesByCategory({
    perPage: 3,
    categoryId: categoryData.id
  });
  if (!posts || posts.length === 0) {
    console.warn(`\u26A0\uFE0F No posts found for category: ${category}`);
  }
  const title = categoryData.name;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Category: ${title}`, "description": "Just a generic description for a category page" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-6xl mx-auto px-4 mt-10"> <h2 class="text-3xl font-bold">${title}'s Latest Posts</h2> ${posts.length > 0 ? renderTemplate`<section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8"> ${posts.map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "client:visible": true, ...post, "client:component-hydration": "visible", "client:component-path": "@/components/BlogCard.astro", "client:component-export": "default" })}`)} </section>` : renderTemplate`<p class="text-xl mt-5">No posts available in this category.</p>`} </section> ` })}`;
}, "C:/Web/density-dwarf/src/pages/category/[category].astro", void 0);

const $$file = "C:/Web/density-dwarf/src/pages/category/[category].astro";
const $$url = "/category/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
