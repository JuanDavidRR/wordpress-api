import { c as createComponent, a as createAstro, m as maybeRenderHead, b as addAttribute, u as unescapeHTML, r as renderTemplate } from './astro/server_Dzq3yZD1.mjs';
import 'kleur/colors';
import 'clsx';
import { f as formatDate } from './wp_D4RoZs5m.mjs';

const $$Astro = createAstro();
const $$BlogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogCard;
  const { title, featuredMedia, date, excerpt, category, slug, link } = Astro2.props;
  const domain = "http://localhost:4321";
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`${domain}/post/${slug}`, "href")} class="block"> <article class="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.03] relative"> ${featuredMedia && renderTemplate`<img${addAttribute(featuredMedia, "src")}${addAttribute(title, "alt")} class="w-full h-48 object-cover" decoding="async" loading="lazy" width="400" height="200">`} <div class="p-4 flex flex-col gap-2"> <h2 class="text-xl font-bold text-gray-900">${unescapeHTML(title)}</h2> <p class="text-sm text-gray-500">${formatDate(date)}</p> ${category && renderTemplate`<p class="text-white font-semibold absolute top-5 left-5 bg-blue-700 rounded-full py-1 px-4">${unescapeHTML(category)}</p>`} <div class="text-gray-700">${unescapeHTML(excerpt)}</div> </div> </article> </a>`;
}, "C:/Web/density-dwarf/src/components/BlogCard.astro", void 0);

export { $$BlogCard as $ };
