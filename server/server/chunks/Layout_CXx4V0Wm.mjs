import { c as createComponent, a as createAstro, b as addAttribute, e as renderHead, u as unescapeHTML, f as renderSlot, r as renderTemplate } from './astro/server_Dzq3yZD1.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const mainMenu = [
  {
    title: "Home",
    url: "/"
  },
  {
    title: "Politics",
    url: "http://localhost:4321/category/politics"
  },
  {
    title: "Industry Insight",
    url: "http://localhost:4321/category/industry-insight"
  },
  {
    title: "Announcements",
    url: "http://localhost:4321/category/announcements"
  },
  {
    title: "Music",
    url: "http://localhost:4321/category/music"
  },
  {
    title: "Security Tips",
    url: "http://localhost:4321/category/security-tips"
  },
  {
    title: "Threats Trends",
    url: "http://localhost:4321/category/threats-trends"
  }
];

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title,
    description = "Just a blog created with WordPress and Astro",
    seo = {}
  } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><meta${addAttribute(title, "name")}${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title} | My Blog</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> <section class="bg-slate-950 text-center text-white py-16" data-astro-cid-sckkx6r4> <div class="max-w-4xl mx-auto flex flex-col gap-10" data-astro-cid-sckkx6r4> <h1 class="text-5xl font-extrabold uppercase" data-astro-cid-sckkx6r4>${unescapeHTML(title)}</h1> <section class="text-xl" data-astro-cid-sckkx6r4>${unescapeHTML(seo?.description === "" || seo?.description === void 0 ? description : seo.description)}</section> </div> <div class="flex gap-5 justify-center items-center mt-10" data-astro-cid-sckkx6r4> <a class="bg-blue-700 px-4 py-2 text-xl font-semibold rounded-lg hover:scale-[1.1] duration-300" href="/about" data-astro-cid-sckkx6r4>About</a> <a class=" bg-blue-700 px-4 py-2 text-xl font-semibold rounded-lg hover:scale-[1.1] duration-300" href="/test" data-astro-cid-sckkx6r4>Test</a> </div> </section> <ul class="bg-blue-700 text-xl text-white flex items-center justify-center gap-10" data-astro-cid-sckkx6r4> ${mainMenu.map((item) => renderTemplate`<a class="p-2 hover:bg-blue-900 duration-200"${addAttribute(item.url, "href")} data-astro-cid-sckkx6r4> <li class="uppercase" data-astro-cid-sckkx6r4>${item.title}</li> </a>`)} </ul> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Web/density-dwarf/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
