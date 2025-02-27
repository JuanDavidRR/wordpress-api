import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, u as unescapeHTML } from '../../chunks/astro/server_Dzq3yZD1.mjs';
import 'kleur/colors';
import { $ as $$Image } from '../../chunks/_astro_assets_CnYV6cTM.mjs';
import { b as getPostInfo, c as getAuthorById, f as formatDate } from '../../chunks/wp_Bk021gkL.mjs';
import { $ as $$Layout } from '../../chunks/Layout_BpMrdiNr.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const slug = Astro2.params.slug;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const postData = await getPostInfo(slug);
  if (!postData) {
    return Astro2.redirect("/404");
  }
  const {
    title,
    content,
    seo,
    author,
    categorySlug,
    category,
    date,
    featuredMedia
  } = postData;
  const authorData = await getAuthorById(author);
  const authorName = authorData?.name || "Unknown Author";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": seo?.og_description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<article class="text-2xl max-w-4xl mx-auto flex flex-col gap-5 mt-10"> <p>Author: ${authorName}</p> <p>
Category: <a class="text-blue-700"${addAttribute(`${"http://localhost:4321"}/category/${categorySlug}`, "href")}>${category}</a> </p> <p class="text-lg">${formatDate(date)}</p> ${renderComponent($$result2, "Image", $$Image, { "src": featuredMedia, "alt": title, "class": "w-full object-cover", "decoding": "async", "loading": "lazy", "width": "1000", "height": "500" })} <div class="text-xl">${unescapeHTML(content)}</div> </article> ` })}`;
}, "C:/Web/density-dwarf/src/pages/post/[slug].astro", void 0);
const $$file = "C:/Web/density-dwarf/src/pages/post/[slug].astro";
const $$url = "/post/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
