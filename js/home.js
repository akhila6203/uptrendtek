document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  /* =======================================================
     HERO SLIDER
  ======================================================= */

  const hero =
    document.getElementById("homeHero");

  const heroSlides =
    Array.from(
      document.querySelectorAll(
        ".home-hero-slide"
      )
    );

  const heroPreviousButton =
    document.getElementById(
      "heroPrev"
    );

  const heroNextButton =
    document.getElementById(
      "heroNext"
    );

  const heroDotsContainer =
    document.getElementById(
      "heroDots"
    );

  let activeHeroIndex = 0;
  let heroAutoplayTimer = null;

  const HERO_AUTOPLAY_DELAY = 5500;

  function showHeroSlide(index) {
    if (!heroSlides.length) {
      return;
    }

    activeHeroIndex =
      (
        index +
        heroSlides.length
      ) %
      heroSlides.length;

    heroSlides.forEach(
      (slide, slideIndex) => {
        const isActive =
          slideIndex ===
          activeHeroIndex;

        slide.classList.toggle(
          "is-active",
          isActive
        );

        slide.setAttribute(
          "aria-hidden",
          isActive
            ? "false"
            : "true"
        );
      }
    );

    const heroDots =
      heroDotsContainer
        ? Array.from(
            heroDotsContainer.querySelectorAll(
              ".home-hero-dot"
            )
          )
        : [];

    heroDots.forEach(
      (dot, dotIndex) => {
        const isActive =
          dotIndex ===
          activeHeroIndex;

        dot.classList.toggle(
          "is-active",
          isActive
        );

        dot.setAttribute(
          "aria-current",
          isActive
            ? "true"
            : "false"
        );
      }
    );
  }

  function createHeroDots() {
    if (
      !heroDotsContainer ||
      !heroSlides.length
    ) {
      return;
    }

    heroDotsContainer.innerHTML = "";

    heroSlides.forEach(
      (_, slideIndex) => {
        const dot =
          document.createElement(
            "button"
          );

        dot.type = "button";

        dot.className =
          "home-hero-dot";

        dot.setAttribute(
          "aria-label",
          `Go to hero slide ${
            slideIndex + 1
          }`
        );

        dot.addEventListener(
          "click",
          () => {
            showHeroSlide(
              slideIndex
            );

            restartHeroAutoplay();
          }
        );

        heroDotsContainer.appendChild(
          dot
        );
      }
    );
  }

  function showNextHeroSlide() {
    showHeroSlide(
      activeHeroIndex + 1
    );
  }

  function showPreviousHeroSlide() {
    showHeroSlide(
      activeHeroIndex - 1
    );
  }

  function stopHeroAutoplay() {
    if (!heroAutoplayTimer) {
      return;
    }

    window.clearInterval(
      heroAutoplayTimer
    );

    heroAutoplayTimer = null;
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();

    if (
      heroSlides.length <= 1
    ) {
      return;
    }

    heroAutoplayTimer =
      window.setInterval(
        showNextHeroSlide,
        HERO_AUTOPLAY_DELAY
      );
  }

  function restartHeroAutoplay() {
    startHeroAutoplay();
  }

  heroPreviousButton?.addEventListener(
    "click",
    () => {
      showPreviousHeroSlide();
      restartHeroAutoplay();
    }
  );

  heroNextButton?.addEventListener(
    "click",
    () => {
      showNextHeroSlide();
      restartHeroAutoplay();
    }
  );

  hero?.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "ArrowLeft"
      ) {
        showPreviousHeroSlide();
        restartHeroAutoplay();
      }

      if (
        event.key ===
        "ArrowRight"
      ) {
        showNextHeroSlide();
        restartHeroAutoplay();
      }
    }
  );

  hero?.addEventListener(
    "mouseenter",
    stopHeroAutoplay
  );

  hero?.addEventListener(
    "mouseleave",
    startHeroAutoplay
  );

  document.addEventListener(
    "visibilitychange",
    () => {
      if (document.hidden) {
        stopHeroAutoplay();
      } else {
        startHeroAutoplay();
      }
    }
  );

  /* =======================================================
     HERO TOUCH SWIPE
  ======================================================= */

  let heroTouchStartX = 0;
  let heroTouchEndX = 0;

  hero?.addEventListener(
    "touchstart",
    (event) => {
      heroTouchStartX =
        event.changedTouches[0]
          ?.clientX || 0;
    },
    {
      passive: true,
    }
  );

  hero?.addEventListener(
    "touchend",
    (event) => {
      heroTouchEndX =
        event.changedTouches[0]
          ?.clientX || 0;

      const difference =
        heroTouchStartX -
        heroTouchEndX;

      if (
        Math.abs(difference) <
        50
      ) {
        return;
      }

      if (difference > 0) {
        showNextHeroSlide();
      } else {
        showPreviousHeroSlide();
      }

      restartHeroAutoplay();
    },
    {
      passive: true,
    }
  );

  createHeroDots();
  showHeroSlide(0);
  startHeroAutoplay();

  /* =======================================================
     COUNTER ANIMATION
  ======================================================= */

  const counterElements =
    document.querySelectorAll(
      ".home-counter-number"
    );

  function animateCounter(element) {
    const target =
      Number(
        element.dataset.counter
      ) || 0;

    const suffix =
      element.dataset.suffix || "";

    const duration = 1600;

    const startTime =
      performance.now();

    function updateCounter(
      currentTime
    ) {
      const elapsed =
        currentTime -
        startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          3
        );

      let currentValue =
        Math.floor(
          target *
          easedProgress
        );

      if (
        suffix === "K" &&
        target === 5000
      ) {
        element.textContent =
          `${
            Math.floor(
              currentValue /
              1000
            )
          }K`;
      } else {
        element.textContent =
          `${currentValue}${suffix}`;
      }

      if (progress < 1) {
        window.requestAnimationFrame(
          updateCounter
        );
      } else if (
        suffix === "K" &&
        target === 5000
      ) {
        element.textContent =
          "5K";
      } else {
        element.textContent =
          `${target}${suffix}`;
      }
    }

    window.requestAnimationFrame(
      updateCounter
    );
  }

  if (
    "IntersectionObserver" in
    window
  ) {
    const counterObserver =
      new IntersectionObserver(
        (entries, observer) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
                return;
              }

              animateCounter(
                entry.target
              );

              observer.unobserve(
                entry.target
              );
            }
          );
        },
        {
          threshold: 0.45,
        }
      );

    counterElements.forEach(
      (counter) => {
        counterObserver.observe(
          counter
        );
      }
    );
  } else {
    counterElements.forEach(
      animateCounter
    );
  }

  /* =======================================================
     TESTIMONIAL SLIDER
  ======================================================= */
  /* =======================================================
     TESTIMONIAL INFINITE SLIDER
  ======================================================= */

  const testimonialTrack =
    document.getElementById(
      "testimonialTrack"
    );

  const testimonialPreviousButton =
    document.getElementById(
      "testimonialPrev"
    );

  const testimonialNextButton =
    document.getElementById(
      "testimonialNext"
    );

  const testimonialDotsContainer =
    document.getElementById(
      "testimonialDots"
    );

  const testimonialViewport =
    testimonialTrack?.parentElement;

  const originalTestimonialCards =
    testimonialTrack
      ? Array.from(
          testimonialTrack.querySelectorAll(
            ".home-testimonial-card"
          )
        )
      : [];

  let testimonialVisibleCards = 1;

  let testimonialIndex = 0;

  let testimonialCardStep = 0;

  let testimonialAutoplayTimer =
    null;

  let testimonialIsMoving =
    false;

  let testimonialResizeTimer =
    null;

  const TESTIMONIAL_DELAY =
    5000;

  const TESTIMONIAL_TRANSITION =
    "transform 0.55s ease";

  function getVisibleTestimonials() {
    if (
      window.innerWidth <= 767
    ) {
      return 1;
    }

    if (
      window.innerWidth <= 991
    ) {
      return 2;
    }

    return 3;
  }

  function removeTestimonialClones() {
    if (!testimonialTrack) {
      return;
    }

    testimonialTrack
      .querySelectorAll(
        ".home-testimonial-card.is-clone"
      )
      .forEach((clone) => {
        clone.remove();
      });
  }

  function createTestimonialClones() {
    if (
      !testimonialTrack ||
      !originalTestimonialCards.length
    ) {
      return;
    }

    removeTestimonialClones();

    testimonialVisibleCards =
      Math.min(
        getVisibleTestimonials(),
        originalTestimonialCards.length
      );

    const firstCards =
      originalTestimonialCards.slice(
        0,
        testimonialVisibleCards
      );

    const lastCards =
      originalTestimonialCards.slice(
        -testimonialVisibleCards
      );

    /*
     * Last cards clones track beginning lo
     * add chestunnam.
     */

    lastCards
      .slice()
      .reverse()
      .forEach((card) => {
        const clone =
          card.cloneNode(true);

        clone.classList.add(
          "is-clone"
        );

        clone.setAttribute(
          "aria-hidden",
          "true"
        );

        testimonialTrack.prepend(
          clone
        );
      });

    /*
     * First cards clones track ending lo
     * add chestunnam.
     */

    firstCards.forEach((card) => {
      const clone =
        card.cloneNode(true);

      clone.classList.add(
        "is-clone"
      );

      clone.setAttribute(
        "aria-hidden",
        "true"
      );

      testimonialTrack.appendChild(
        clone
      );
    });
  }

  function calculateTestimonialCardStep() {
    if (!testimonialTrack) {
      return;
    }

    const firstCard =
      testimonialTrack.querySelector(
        ".home-testimonial-card"
      );

    if (!firstCard) {
      testimonialCardStep = 0;
      return;
    }

    const trackStyles =
      window.getComputedStyle(
        testimonialTrack
      );

    const gap =
      Number.parseFloat(
        trackStyles.columnGap ||
        trackStyles.gap ||
        "0"
      ) || 0;

    testimonialCardStep =
      firstCard.getBoundingClientRect()
        .width +
      gap;
  }

  function moveTestimonialTrack(
    animate = true
  ) {
    if (
      !testimonialTrack ||
      !testimonialCardStep
    ) {
      return;
    }

    testimonialTrack.style.transition =
      animate
        ? TESTIMONIAL_TRANSITION
        : "none";

    const translateX =
      testimonialIndex *
      testimonialCardStep;

    testimonialTrack.style.transform =
      `translate3d(-${translateX}px, 0, 0)`;
  }

  function getRealTestimonialIndex() {
    const totalCards =
      originalTestimonialCards.length;

    if (!totalCards) {
      return 0;
    }

    return (
      (
        testimonialIndex -
        testimonialVisibleCards
      ) %
        totalCards +
      totalCards
    ) %
      totalCards;
  }

  function createTestimonialDots() {
    if (
      !testimonialDotsContainer
    ) {
      return;
    }

    testimonialDotsContainer.innerHTML =
      "";

    originalTestimonialCards.forEach(
      (_, dotIndex) => {
        const dot =
          document.createElement(
            "button"
          );

        dot.type = "button";

        dot.className =
          "home-testimonial-dot";

        dot.setAttribute(
          "aria-label",
          `Show testimonial ${
            dotIndex + 1
          }`
        );

        dot.addEventListener(
          "click",
          () => {
            if (
              testimonialIsMoving
            ) {
              return;
            }

            testimonialIndex =
              testimonialVisibleCards +
              dotIndex;

            testimonialIsMoving =
              true;

            moveTestimonialTrack(
              true
            );

            updateTestimonialDots();

            restartTestimonialAutoplay();
          }
        );

        testimonialDotsContainer.appendChild(
          dot
        );
      }
    );

    updateTestimonialDots();
  }

  function updateTestimonialDots() {
    if (
      !testimonialDotsContainer
    ) {
      return;
    }

    const realIndex =
      getRealTestimonialIndex();

    const dots =
      testimonialDotsContainer.querySelectorAll(
        ".home-testimonial-dot"
      );

    dots.forEach(
      (dot, dotIndex) => {
        const isActive =
          dotIndex === realIndex;

        dot.classList.toggle(
          "is-active",
          isActive
        );

        dot.setAttribute(
          "aria-current",
          isActive
            ? "true"
            : "false"
        );
      }
    );
  }

  function showNextTestimonial() {
    if (
      testimonialIsMoving ||
      originalTestimonialCards.length <=
        testimonialVisibleCards
    ) {
      return;
    }

    testimonialIsMoving =
      true;

    testimonialIndex += 1;

    moveTestimonialTrack(
      true
    );

    updateTestimonialDots();
  }

  function showPreviousTestimonial() {
    if (
      testimonialIsMoving ||
      originalTestimonialCards.length <=
        testimonialVisibleCards
    ) {
      return;
    }

    testimonialIsMoving =
      true;

    testimonialIndex -= 1;

    moveTestimonialTrack(
      true
    );

    updateTestimonialDots();
  }

  function handleTestimonialTransitionEnd(
    event
  ) {
    if (
      event.propertyName !==
      "transform"
    ) {
      return;
    }

    const totalCards =
      originalTestimonialCards.length;

    /*
     * Ending clones reach ayyaka,
     * visible ga same card unna original
     * position ki animation lekunda move chestundi.
     */

    if (
      testimonialIndex >=
      totalCards +
        testimonialVisibleCards
    ) {
      testimonialIndex =
        testimonialVisibleCards;

      moveTestimonialTrack(
        false
      );
    }

    /*
     * Beginning clones reach ayyaka,
     * original ending position ki animation
     * lekunda move chestundi.
     */

    if (
      testimonialIndex <
      testimonialVisibleCards
    ) {
      testimonialIndex =
        totalCards +
        testimonialVisibleCards -
        1;

      moveTestimonialTrack(
        false
      );
    }

    testimonialIsMoving =
      false;

    updateTestimonialDots();
  }

  function stopTestimonialAutoplay() {
    if (
      !testimonialAutoplayTimer
    ) {
      return;
    }

    window.clearInterval(
      testimonialAutoplayTimer
    );

    testimonialAutoplayTimer =
      null;
  }

  function startTestimonialAutoplay() {
    stopTestimonialAutoplay();

    if (
      originalTestimonialCards.length <=
      testimonialVisibleCards
    ) {
      return;
    }

    testimonialAutoplayTimer =
      window.setInterval(
        showNextTestimonial,
        TESTIMONIAL_DELAY
      );
  }

  function restartTestimonialAutoplay() {
    stopTestimonialAutoplay();
    startTestimonialAutoplay();
  }

  function buildTestimonialSlider() {
    if (
      !testimonialTrack ||
      !originalTestimonialCards.length
    ) {
      return;
    }

    stopTestimonialAutoplay();

    testimonialIsMoving =
      false;

    createTestimonialClones();

    calculateTestimonialCardStep();

    testimonialIndex =
      testimonialVisibleCards;

    createTestimonialDots();

    /*
     * Initial position animation lekunda
     * set chestunnam.
     */

    moveTestimonialTrack(
      false
    );

    updateTestimonialDots();

    /*
     * Browser layout complete ayyaka
     * transition restore chestunnam.
     */

    window.requestAnimationFrame(
      () => {
        window.requestAnimationFrame(
          () => {
            if (
              testimonialTrack
            ) {
              testimonialTrack.style.transition =
                TESTIMONIAL_TRANSITION;
            }
          }
        );
      }
    );

    startTestimonialAutoplay();
  }

  testimonialPreviousButton
    ?.addEventListener(
      "click",
      () => {
        showPreviousTestimonial();
        restartTestimonialAutoplay();
      }
    );

  testimonialNextButton
    ?.addEventListener(
      "click",
      () => {
        showNextTestimonial();
        restartTestimonialAutoplay();
      }
    );

  testimonialTrack?.addEventListener(
    "transitionend",
    handleTestimonialTransitionEnd
  );

  testimonialViewport?.addEventListener(
    "mouseenter",
    stopTestimonialAutoplay
  );

  testimonialViewport?.addEventListener(
    "mouseleave",
    startTestimonialAutoplay
  );

  /* =======================================================
     TESTIMONIAL TOUCH SWIPE
  ======================================================= */

  let testimonialTouchStartX = 0;

  let testimonialTouchEndX = 0;

  testimonialViewport?.addEventListener(
    "touchstart",
    (event) => {
      testimonialTouchStartX =
        event.changedTouches[0]
          ?.clientX || 0;

      stopTestimonialAutoplay();
    },
    {
      passive: true,
    }
  );

  testimonialViewport?.addEventListener(
    "touchend",
    (event) => {
      testimonialTouchEndX =
        event.changedTouches[0]
          ?.clientX || 0;

      const difference =
        testimonialTouchStartX -
        testimonialTouchEndX;

      if (
        Math.abs(difference) >=
        45
      ) {
        if (difference > 0) {
          showNextTestimonial();
        } else {
          showPreviousTestimonial();
        }
      }

      startTestimonialAutoplay();
    },
    {
      passive: true,
    }
  );

  buildTestimonialSlider();
  /* =======================================================
     SCROLL REVEAL
  ======================================================= */

  const revealElements =
    document.querySelectorAll(
      ".home-page .reveal"
    );

  if (
    "IntersectionObserver" in
    window
  ) {
    const revealObserver =
      new IntersectionObserver(
        (
          entries,
          observer
        ) => {
          entries.forEach(
            (entry) => {
              if (
                !entry.isIntersecting
              ) {
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
            "0px 0px -35px 0px",
        }
      );

    revealElements.forEach(
      (element) => {
        revealObserver.observe(
          element
        );
      }
    );
  } else {
    revealElements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );
  }

  /* =======================================================
     WINDOW RESIZE
  ======================================================= */

  let resizeTimer = null;

  window.addEventListener(
    "resize",
    () => {
      window.clearTimeout(
        resizeTimer
      );

      resizeTimer =
        window.setTimeout(
          () => {
            testimonialIndex =
              Math.min(
                testimonialIndex,
                getMaximumTestimonialIndex()
              );

            createTestimonialDots();
            updateTestimonialSlider();

            showHeroSlide(
              activeHeroIndex
            );
          },
          160
        );
    }
  );
});