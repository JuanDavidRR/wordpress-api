import { c as createComponent, a as createAstro, d as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Dzq3yZD1.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_CXx4V0Wm.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Test = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Test;
  const title = "About us";
  const description = "Just a generic description for an about page";
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": title, "description": description }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="max-w-6xl mx-auto px-4 mt-10"> <h2 class="text-3xl font-bold">Latest Technology Posts</h2> <p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga neque
      delectus deserunt eligendi veritatis labore optio asperiores sequi ab
      vitae? Molestiae numquam at iusto velit. Quisquam debitis rerum corporis
      quia!
</p> <p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aliquam
      delectus consectetur aut, ad provident laboriosam explicabo dolores quod
      adipisci illum non doloremque repellendus quaerat perspiciatis autem ab
      veniam amet!
</p> <p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aliquam
      delectus consectetur aut, ad provident laboriosam explicabo dolores quod
      adipisci illum non doloremque repellendus quaerat perspiciatis autem ab
      veniam amet!
</p> <p>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias aliquam
      delectus consectetur aut, ad provident laboriosam explicabo dolores quod
      adipisci illum non doloremque repellendus quaerat perspiciatis autem ab
      veniam amet!
</p> </section> ` })}`;
}, "C:/Web/density-dwarf/src/pages/test.astro", void 0);

const $$file = "C:/Web/density-dwarf/src/pages/test.astro";
const $$url = "/test";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Test,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
