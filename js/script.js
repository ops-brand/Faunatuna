const content = window.FAUNATUNA_CONTENT;

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" },
);

const renderIngredientCard = ({ image, alt, title, text }) => `
  <article class="info-card">
    <img src="${image}" alt="${alt}" class="info-card__image" />
    <div class="info-card__body">
      <h3>${title}</h3>
      <p>${text}</p>
    </div>
  </article>
`;

const renderFlavorCard = ({ image, title, variant }) => `
  <article class="flavor-card flavor-card--${variant}">
    <img src="${image}" alt="" aria-hidden="true" />
    <h3>${title}</h3>
  </article>
`;

const renderExperienceCard = ({ image, alt }) => `
  <figure class="experience-card">
    <img src="${image}" alt="${alt}" />
  </figure>
`;

const renderGalleryItem = ({ image, alt, modifier = "" }) => `
  <figure class="gallery-grid__item ${modifier}">
    <img src="${image}" alt="${alt}" />
  </figure>
`;

const renderInto = (selector, html) => {
  const target = document.querySelector(selector);
  if (target) target.innerHTML = html;
};

renderInto(
  '[data-component="ingredients"]',
  content.ingredients.map(renderIngredientCard).join(""),
);

renderInto(
  '[data-component="flavors"]',
  content.flavors.map(renderFlavorCard).join(""),
);

renderInto(
  '[data-component="experience"]',
  content.experience.map(renderExperienceCard).join(""),
);

renderInto(
  '[data-component="gallery"]',
  content.gallery.map(renderGalleryItem).join(""),
);

document.querySelectorAll(".reveal").forEach((section) => observer.observe(section));
