import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dzq3yZD1.mjs';
import 'kleur/colors';
import { $ as $$BlogCard } from '../chunks/BlogCard_Dwz9GtDX.mjs';
import { $ as $$Layout } from '../chunks/Layout_CXx4V0Wm.mjs';
import { d as getPageInfo, e as getLatestArticles } from '../chunks/wp_D4RoZs5m.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { title, content, seo } = await getPageInfo("home");
  const [postsFromSite1, postsFromSite2] = await Promise.all([
    getLatestArticles({
      perPage: 5,
      apiUrl: "https://www.telesign.com"
    }),
    getLatestArticles({
      perPage: 4,
      apiUrl: "https://www.rollingstone.com"
    })
  ]);
  const allPosts = [...postsFromSite1, ...postsFromSite2];
  const sortedPosts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": seo?.description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-6xl mx-auto px-4 mt-10"> <h2 class="text-3xl font-bold">Latest Technology Posts</h2> <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8"> ${sortedPosts.map((post) => renderTemplate`${renderComponent($$result2, "BlogCard", $$BlogCard, { "client:visible": true, ...post, "client:component-hydration": "visible", "client:component-path": "@/components/BlogCard.astro", "client:component-export": "default" })}`)} </section> </section> ` })}`;
}, "C:/Web/density-dwarf/src/pages/index.astro", void 0);

const $$file = "C:/Web/density-dwarf/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
