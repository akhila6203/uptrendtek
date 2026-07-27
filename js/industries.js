/* =========================================================
   UPTRENTEK INDUSTRIES PAGE JAVASCRIPT
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {
    initializeIndustriesReveal();
    preventEmptyIndustryLinks();
  }
);

/* =========================================================
   REVEAL ELEMENTS ON SCROLL
========================================================= */

function initializeIndustriesReveal() {
  const revealElements =
    document.querySelectorAll(
      ".industries-page .reveal"
    );

  if (!revealElements.length) {
    return;
  }

  /* Browser IntersectionObserver support lekapothe
     elements direct ga display avutayi */

  if (
    !("IntersectionObserver" in window)
  ) {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(
          (entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            observer.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -45px 0px",
      }
    );

  revealElements.forEach(
    (element, index) => {
      element.style.transitionDelay =
        `${Math.min(index * 55, 250)}ms`;

      revealObserver.observe(element);
    }
  );
}

/* =========================================================
   PREVENT EMPTY CARD LINKS

   Present detail pages create cheyyaledu kabatti href="#"
   click chesthe top ki jump avvakunda prevent chestundi.

   Later individual industry pages create chesinappudu:
   href="banking.html"
   ila replace cheyyandi.
========================================================= */

function preventEmptyIndustryLinks() {
  const emptyIndustryLinks =
    document.querySelectorAll(
      '.industry-image-link[href="#"]'
    );

  emptyIndustryLinks.forEach(
    (link) => {
      link.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
        }
      );
    }
  );
}