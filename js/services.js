document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const servicesGrid =
    document.getElementById("servicesGrid");

  const services = [
    {
      title: "Mobile Application Development",
      description:
        "Transform business ideas into powerful Android, iOS and cross-platform mobile applications with intuitive user experiences.",
      icon: "fa-solid fa-mobile-screen-button",
      href: "mobile-application-development.html",
    },
    {
      title: "Software Development",
      description:
        "Build market-leading digital products with custom software engineering, modernization, migration and maintenance services.",
      icon: "fa-solid fa-code",
      href: "software-development.html",
    },
    {
      title: "Application Development",
      description:
        "Modernize and build secure, scalable applications that improve customer experiences and support long-term business growth.",
      icon: "fa-solid fa-layer-group",
      href: "application-development.html",
      featured: true,
    },
    {
      title: "Web Development",
      description:
        "Create responsive, secure and conversion-focused websites and web applications that represent your business professionally.",
      icon: "fa-solid fa-laptop-code",
      href: "web-development.html",
    },
        {
      title: "UI/UX Design",
      description:
        "Deliver intuitive, accessible and engaging digital experiences through research, interface design and usability testing.",
      icon: "fa-solid fa-pen-ruler",
      href: "ui-ux-design.html",
    },
      {
      title: "Digital Marketing",
      description:
        "Increase visibility, qualified traffic and customer engagement with SEO, content, social media and performance marketing.",
      icon: "fa-solid fa-bullhorn",
      href: "digital-marketing.html",
    },
    {
      title: "IT Staffing",
      description:
        "Build high-performing technology teams with qualified contract, direct-hire and staff augmentation professionals.",
      icon: "fa-solid fa-users-gear",
      href: "it-staffing.html",
    },
    {
      title: "IT Consulting",
      description:
        "Align technology investments with business goals through architecture consulting, digital strategy and modernization roadmaps.",
      icon: "fa-solid fa-chart-line",
      href: "it-consulting.html",
    },
  ];

  function renderServices() {
    if (!servicesGrid) {
      return;
    }

    servicesGrid.innerHTML = services
      .map(
        (service, index) => `
          <article
            class="services-card reveal ${
              service.featured
                ? "featured"
                : ""
            }"
            style="transition-delay: ${
              Math.min(index * 60, 260)
            }ms"
          >

            <div class="services-card-icon">
              <i
                class="${service.icon}"
                aria-hidden="true"
              ></i>
            </div>

            <h2>
              ${service.title}
            </h2>

            <p>
              ${service.description}
            </p>

            <a
              class="services-read-more"
              href="${service.href}"
              aria-label="Read more about ${service.title}"
            >
              Read More

              <i
                class="fa-solid fa-angles-right"
                aria-hidden="true"
              ></i>
            </a>

          </article>
        `
      )
      .join("");
  }

  function initializeReveal() {
    const revealElements =
      document.querySelectorAll(".reveal");

    if (
      !("IntersectionObserver" in window)
    ) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    const observer =
      new IntersectionObserver(
        (entries, revealObserver) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add(
              "is-visible"
            );

            revealObserver.unobserve(
              entry.target
            );
          });
        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px",
        }
      );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  }

  renderServices();
  initializeReveal();
});