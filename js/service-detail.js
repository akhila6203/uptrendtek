/* =========================================================
   UPTRENTEK SERVICE DETAIL PAGE

   services-data.js lo unna flat data structure ni
   base chesukoni all service pages render chestundi.
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const root = document.getElementById(
    "serviceDetailRoot"
  );

  if (!root) {
    console.error(
      "serviceDetailRoot element not found."
    );

    return;
  }

  const services =
    window.SERVICES_DATA || {};

  const serviceKey =
    document.body.dataset.service ||
    "application-development";

  const service =
    services[serviceKey];

  if (!service) {
    console.error(
      `Service data not found for key: ${serviceKey}`
    );

    renderNotFound(root);

    return;
  }

  document.title =
    service.pageTitle ||
    `${service.title} | UpTrendTek`;

  root.innerHTML = `
    ${renderServiceBanner(service)}

    ${renderServicePage(
      serviceKey,
      service
    )}

    ${renderContactSection(service)}
  `;

  initializeReveal();
  initializeServiceForm();
  initializeImageErrors();
});

/* =========================================================
   COMMON HELPERS
========================================================= */

function hasText(value) {
  return (
    typeof value === "string" &&
    value.trim() !== ""
  );
}

function safeArray(value) {
  return Array.isArray(value)
    ? value
    : [];
}

function renderParagraph(text, className = "") {
  if (!hasText(text)) {
    return "";
  }

  return `
    <p class="${className}">
      ${text}
    </p>
  `;
}

function renderParagraphs(paragraphs) {
  return safeArray(paragraphs)
    .filter(hasText)
    .map(
      (paragraph) => `
        <p>
          ${paragraph}
        </p>
      `
    )
    .join("");
}

function renderHeading(
  text,
  tag = "h2",
  className = ""
) {
  if (!hasText(text)) {
    return "";
  }

  return `
    <${tag} class="${className}">
      ${text}
    </${tag}>
  `;
}

function renderSectionLabel(text) {
  if (!hasText(text)) {
    return "";
  }

  return `
    <span class="service-section-label">
      ${text}
    </span>
  `;
}

function renderImage(
  src,
  alt,
  className = ""
) {
  if (!hasText(src)) {
    return "";
  }

  return `
    <img
      src="${src}"
      alt="${alt || ""}"
      class="${className}"
    >
  `;
}

/* =========================================================
   BANNER
========================================================= */

function renderServiceBanner(service) {
  const bannerImage =
    service.bannerImage ||
    "assets/about/about-banner.jpg";

  return `
    <section
      class="service-detail-banner"
      style="background-image:url('${bannerImage}')"
    >

      <div class="service-detail-banner-overlay"></div>

      <div
        class="container service-detail-banner-content"
      >

        <span
          class="service-detail-banner-subtitle"
        >
          OUR SERVICES
        </span>

        <h1>
          ${service.title}
        </h1>

        <nav
          class="service-detail-breadcrumb"
          aria-label="Breadcrumb"
        >

          <a href="index.html">
            Home
          </a>

          <i
            class="fa-solid fa-chevron-right"
            aria-hidden="true"
          ></i>

          <a href="services.html">
            Services
          </a>

          <i
            class="fa-solid fa-chevron-right"
            aria-hidden="true"
          ></i>

          <span aria-current="page">
            ${service.title}
          </span>

        </nav>

      </div>

    </section>
  `;
}

/* =========================================================
   PAGE ROUTER
========================================================= */

function renderServicePage(
  serviceKey,
  service
) {
  switch (serviceKey) {
    case "application-development":
      return renderApplicationDevelopment(
        service
      );

    case "software-development":
      return renderSoftwareDevelopment(
        service
      );

    case "web-development":
      return renderWebDevelopment(
        service
      );

    case "mobile-application-development":
      return renderMobileDevelopment(
        service
      );

    case "it-consulting":
      return renderITConsulting(
        service
      );

    case "it-staffing":
      return renderITStaffing(
        service
      );

    case "ui-ux-design":
      return renderUIUXDesign(
        service
      );

    case "digital-marketing":
      return renderDigitalMarketing(
        service
      );

    default:
      return renderCommonService(
        service
      );
  }
}

/* =========================================================
   COMMON FIRST SECTION
========================================================= */

function renderCommonIntro(
  service,
  options = {}
) {
  const imageSide =
    options.imageSide || "left";

  const showImage =
    options.showImage !== false;

  const imageHtml = showImage
    ? `
      <div class="service-overview-image reveal">

        ${renderImage(
          service.mainImage,
          service.title
        )}

      </div>
    `
    : "";

  const contentHtml = `
    <div class="service-overview-content reveal">

      ${renderSectionLabel(
        options.label ||
        "UPTRENTEK EXPERTISE"
      )}

      ${renderHeading(
        service.title,
        "h2"
      )}

      ${renderParagraph(
        service.subtitle,
        "service-lead"
      )}

      ${renderHeading(
        service.mainHeading,
        "h3",
        "service-special-title"
      )}

      ${renderParagraph(
        service.intro,
        "service-intro-text"
      )}

      ${
        hasText(service.highlight)
          ? `
            <div class="service-highlight-box">
              ${service.highlight}
            </div>
          `
          : ""
      }

      ${renderParagraph(
        service.description
      )}

      ${renderParagraph(
        service.additionalIntro
      )}

      ${renderParagraph(
        service.recruitmentText
      )}

    </div>
  `;

  return `
    <section
      class="service-section service-overview-section"
    >

      <div
        class="container service-overview-grid ${
          imageSide === "right"
            ? "image-right"
            : "image-left"
        }"
      >

        ${
          imageSide === "right"
            ? contentHtml + imageHtml
            : imageHtml + contentHtml
        }

      </div>

    </section>
  `;
}

/* =========================================================
   APPLICATION DEVELOPMENT
========================================================= */
function renderApplicationDevelopment(
  service
) {
  return `
    ${renderCommonIntro(service, {
      imageSide: "left",
    })}

    <!-- APPLICATION MODERNIZATION -->

    <section
      class="service-section service-challenges-section"
    >

      <div
        class="container service-two-column-layout"
      >

        <div
          class="service-challenges-content reveal"
        >

          ${renderSectionLabel(
            "APPLICATION MODERNIZATION"
          )}

          ${renderHeading(
            service.sectionTwoTitle
          )}

          ${renderParagraph(
            service.sectionTwoText
          )}

          ${renderCheckList(
            service.points
          )}

        </div>

        <div
          class="service-side-image reveal"
        >

          ${renderImage(
            service.secondaryImage,
            service.sectionTwoTitle
          )}

        </div>

      </div>

    </section>

    <!-- MIGRATION AND MODERNIZATION -->

    <section
      class="
        service-section
        application-modernization-section
      "
    >

      <div
        class="
          container
          application-modernization-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            application-modernization-content
            reveal
          "
        >

          ${renderHeading(
            service.sectionFourTitle
          )}

          ${renderParagraph(
            service.sectionFourText
          )}

          <div
            class="
              application-modernization-cards
            "
          >

            ${safeArray(service.cards)
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      application-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(index * 80, 160)}ms
                    "
                  >

                    <span
                      class="service-benefit-icon"
                    >
                      <i
                        class="${
                          card.icon ||
                          "fa-solid fa-check"
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>

                      ${renderHeading(
                        card.title,
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text
                      )}

                    </div>

                  </article>
                `
              )
              .join("")}

          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    application-modernization-closing
                    reveal
                  "
                >
                  ${renderParagraph(
                    service.closingText
                  )}
                </div>
              `
              : ""
          }

        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  application-modernization-image
                  reveal
                "
              >

                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle
                )}

              </div>
            `
            : ""
        }

      </div>

    </section>
  `;
}
/* =========================================================
   SOFTWARE DEVELOPMENT
========================================================= */

function renderSoftwareDevelopment(service) {
  return `
    <!-- ===============================================
         FIRST SECTION
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "right",
    })}

    <!-- ===============================================
         UP TREND TEK AGENCY VALUES

         Left  : Image
         Right : Heading, paragraph and checklist
    ================================================ -->

    <section
      class="
        service-section
        software-agency-values-section
      "
    >

      <div
        class="
          container
          software-agency-values-layout
        "
      >

        <!-- LEFT IMAGE -->

        ${
          hasText(service.secondaryImage)
            ? `
              <div
                class="
                  software-agency-values-image
                  reveal
                "
              >

                ${renderImage(
                  service.secondaryImage,
                  service.sectionTwoTitle ||
                  "Up Trend Tek Agency Values"
                )}

              </div>
            `
            : ""
        }

        <!-- RIGHT CONTENT -->

        <div
          class="
            software-agency-values-content
            reveal
          "
        >

          ${renderHeading(
            service.sectionTwoTitle
          )}

          ${
            hasText(service.sectionTwoText)
              ? renderParagraph(
                  service.sectionTwoText
                )
              : ""
          }

          ${renderCheckList(
            service.points
          )}

        </div>

      </div>

    </section>

    <!-- ===============================================
         HUMAN-CENTRIC SOFTWARE AND PRODUCT DEVELOPMENT

         Left:
         Heading
         Description
         Certified Experts
         Quick Response
         Closing paragraph

         Right:
         Image
    ================================================ -->

    <section
      class="
        service-section
        software-human-centric-section
      "
    >

      <div
        class="
          container
          software-human-centric-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            software-human-centric-content
            reveal
          "
        >

          ${renderHeading(
            service.sectionFourTitle
          )}

          ${renderParagraph(
            service.sectionFourText
          )}

          <div
            class="
              software-human-centric-cards
            "
          >

            ${safeArray(service.cards)
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      software-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(
                        index * 80,
                        160
                      )}ms
                    "
                  >

                    <span
                      class="service-benefit-icon"
                    >

                      <i
                        class="${
                          card.icon ||
                          "fa-solid fa-check"
                        }"
                        aria-hidden="true"
                      ></i>

                    </span>

                    <div>

                      ${renderHeading(
                        card.title,
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text
                      )}

                    </div>

                  </article>
                `
              )
              .join("")}

          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    software-human-centric-closing
                    reveal
                  "
                >

                  ${renderParagraph(
                    service.closingText
                  )}

                </div>
              `
              : ""
          }

        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  software-human-centric-image
                  reveal
                "
              >

                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle ||
                  "Human-Centric Software Development"
                )}

              </div>
            `
            : ""
        }

      </div>

    </section>
  `;
}
/* =========================================================
   WEB DEVELOPMENT
========================================================= */

function renderWebDevelopment(service) {
  return `
    <!-- ===============================================
         WEB DEVELOPMENT INTRO
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "left",
    })}

    <!-- ===============================================
         WEB DEVELOPMENT SERVICES CARDS
    ================================================ -->

    <section
      class="
        service-section
        web-development-cards-section
      "
    >

      <div class="container">

        <div class="web-development-card-grid">

          ${safeArray(service.cards)
            .map(
              (card, index) => `
                <article
                  class="
                    web-development-card
                    reveal
                  "
                  style="
                    transition-delay:
                    ${Math.min(index * 70, 210)}ms
                  "
                >

                  ${renderHeading(
                    card.title,
                    "h3"
                  )}

                  ${
                    hasText(card.image)
                      ? `
                        <div
                          class="
                            web-development-card-image
                          "
                        >

                          ${renderImage(
                            card.image,
                            card.title
                          )}

                        </div>
                      `
                      : ""
                  }

                  ${renderParagraph(
                    card.text
                  )}

                </article>
              `
            )
            .join("")}

        </div>

      </div>

    </section>

    <!-- ===============================================
         WEB DEVELOPMENT EXPERTISE

         LEFT:
         Heading
         Description
         Certified Experts
         Quick Response
         Closing paragraph

         RIGHT:
         Image
    ================================================ -->

    <section
      class="
        service-section
        web-development-expertise-section
      "
    >

      <div
        class="
          container
          web-development-expertise-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            web-development-expertise-content
            reveal
          "
        >

          ${renderHeading(
            service.sectionFourTitle
          )}

          ${renderParagraph(
            service.sectionFourText
          )}

          <div
            class="
              web-development-benefit-cards
            "
          >

            ${safeArray(service.cards)
              .slice(0, 2)
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      web-development-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(index * 80, 160)}ms
                    "
                  >

                    <span
                      class="service-benefit-icon"
                    >
                      <i
                        class="${
                          card.icon ||
                          (
                            index === 0
                              ? "fa-solid fa-file-shield"
                              : "fa-solid fa-clock"
                          )
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>

                      ${renderHeading(
                        card.benefitTitle ||
                        (
                          index === 0
                            ? "Certified Experts"
                            : "Quick Response"
                        ),
                        "h3"
                      )}

                      ${renderParagraph(
                        card.benefitText ||
                        (
                          index === 0
                            ? "We have amazing security experts to save data"
                            : "Responding quickly is our priority in dealing clients"
                        )
                      )}

                    </div>

                  </article>
                `
              )
              .join("")}

          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    web-development-closing
                    reveal
                  "
                >

                  ${renderParagraph(
                    service.closingText
                  )}

                </div>
              `
              : ""
          }

        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  web-development-expertise-image
                  reveal
                "
              >

                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle ||
                  "Web Development Expertise"
                )}

              </div>
            `
            : ""
        }

      </div>

    </section>
  `;
}
/* =========================================================
   MOBILE APP DEVELOPMENT
========================================================= */

function renderMobileDevelopment(service) {
  return `
    <!-- ===============================================
         FIRST SECTION
         LEFT CONTENT + RIGHT IMAGE
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "right",
    })}

    <!-- ===============================================
         FULL WIDTH INTRO TEXT

         Duplicate second image remove chesam.
         Two paragraphs full width lo vastayi.
    ================================================ -->

    <section
      class="
        service-section
        mobile-intro-text-section
      "
    >
      <div class="container">

        <div
          class="
            mobile-intro-text-content
            reveal
          "
        >
          ${renderParagraph(
            service.mobileIntroText
          )}

          ${renderParagraph(
            service.mobileBusinessText
          )}
        </div>

      </div>
    </section>

    <!-- ===============================================
         ROI + PROCESS IMAGE

         LEFT  : ROI heading and points
         RIGHT : Process image

         Our Process heading render avvadu.
    ================================================ -->

    <section
      class="
        service-section
        mobile-roi-section
      "
    >
      <div
        class="
          container
          mobile-roi-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            mobile-roi-content
            reveal
          "
        >
          ${renderHeading(
            service.roiTitle
          )}

          ${renderRichPoints(
            service.roiPoints
          )}
        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.processImage)
            ? `
              <div
                class="
                  mobile-roi-image
                  reveal
                "
              >
                ${renderImage(
                  service.processImage,
                  "Mobile application development process"
                )}
              </div>
            `
            : ""
        }

      </div>
    </section>

    <!-- ===============================================
         MOBILE PLATFORM SERVICES

         Android
         iOS
         Hybrid
         React Native
         Flutter

         One after another.
         Alternating content and image.
    ================================================ -->

    <section
      class="
        service-section
        mobile-platforms-section
      "
    >
      <div class="container">

        <div
          class="
            mobile-platforms-list
          "
        >
          ${safeArray(
            service.platformServices
          )
            .map(
              (platform, index) =>
                renderMobilePlatformRow(
                  platform,
                  index
                )
            )
            .join("")}
        </div>

      </div>
    </section>

    <!-- ===============================================
         FINAL SECTION

         LEFT:
         Heading
         Certified Experts
         Quick Response
         Closing paragraph

         RIGHT:
         Image
    ================================================ -->

    <section
      class="
        service-section
        mobile-expertise-section
      "
    >
      <div
        class="
          container
          mobile-expertise-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            mobile-expertise-content
            reveal
          "
        >
          ${renderHeading(
            service.finalSectionTitle ||
            "Mobile Application Development Services"
          )}

          ${
            hasText(service.finalSectionText)
              ? renderParagraph(
                  service.finalSectionText
                )
              : ""
          }

          <div
            class="
              mobile-expertise-cards
            "
          >
            ${safeArray(
              service.benefitCards ||
              service.cards
            )
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      mobile-expertise-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(
                        index * 80,
                        160
                      )}ms
                    "
                  >
                    <span
                      class="
                        service-benefit-icon
                      "
                    >
                      <i
                        class="${
                          card.icon ||
                          (
                            index === 0
                              ? "fa-solid fa-file-shield"
                              : "fa-solid fa-clock"
                          )
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>
                      ${renderHeading(
                        card.title ||
                        (
                          index === 0
                            ? "Certified Experts"
                            : "Quick Response"
                        ),
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text ||
                        (
                          index === 0
                            ? "We have amazing security experts to save data"
                            : "Responding quickly is our priority in dealing clients"
                        )
                      )}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    mobile-expertise-closing
                    reveal
                  "
                >
                  ${renderParagraph(
                    service.closingText
                  )}
                </div>
              `
              : ""
          }
        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  mobile-expertise-image
                  reveal
                "
              >
                ${renderImage(
                  service.thirdImage,
                  service.finalSectionTitle ||
                  service.title
                )}
              </div>
            `
            : ""
        }

      </div>
    </section>
  `;
}
/* =========================================================
   MOBILE PLATFORM ROW
========================================================= */

function renderMobilePlatformRow(
  platform,
  index
) {
  const imageOnLeft =
    index % 2 !== 0;

  const contentHtml = `
    <div
      class="
        mobile-platform-content
        reveal
      "
    >
      ${renderHeading(
        platform.title,
        "h2"
      )}

      ${renderParagraphs(
        platform.paragraphs
      )}

      ${renderHeading(
        platform.subheading,
        "h3"
      )}

      ${renderBulletList(
        platform.list
      )}

      ${renderHeading(
        platform.toolsTitle,
        "h4"
      )}

      ${renderParagraph(
        platform.toolsText
      )}

      ${safeArray(
        platform.contentSections
      )
        .map(
          (section) => `
            <div
              class="
                mobile-platform-extra-content
              "
            >
              ${renderHeading(
                section.title,
                "h3"
              )}

              ${renderParagraph(
                section.text
              )}

              ${renderBulletList(
                section.list
              )}
            </div>
          `
        )
        .join("")}
    </div>
  `;

 const platformImages =
  safeArray(
    platform.images
  ).length
    ? safeArray(
        platform.images
      )
    : (
        hasText(platform.image)
          ? [platform.image]
          : []
      );

const imageHtml =
  platformImages.length
    ? `
      <div
        class="
          mobile-platform-images
          ${
            platformImages.length > 1
              ? "has-multiple-images"
              : "has-single-image"
          }
          reveal
        "
      >
        ${platformImages
          .map(
            (image, imageIndex) => `
              <div
                class="
                  mobile-platform-image
                  mobile-platform-image-${
                    imageIndex + 1
                  }
                "
              >
                ${renderImage(
                  image,
                  `${platform.title} ${
                    imageIndex + 1
                  }`
                )}
              </div>
            `
          )
          .join("")}
      </div>
    `
    : "";

  return `
    <article
      class="
        mobile-platform-row
        ${
          imageOnLeft
            ? "image-left"
            : "image-right"
        }
      "
    >
      ${
        imageOnLeft
          ? imageHtml + contentHtml
          : contentHtml + imageHtml
      }
    </article>
  `;
}
/* =========================================================
   IT CONSULTING
========================================================= */

function renderITConsulting(service) {
  return `
    <!-- ===============================================
         FIRST SECTION
         LEFT CONTENT + RIGHT IMAGE
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "right",
    })}

    <!-- ===============================================
         IT CONSULTING SERVICES
    ================================================ -->

    <section
      class="
        service-section
        it-consulting-services-section
      "
    >
      <div class="container">

        <div
          class="
            it-consulting-services-heading
            reveal
          "
        >
          ${renderHeading(
            service.sectionTwoTitle ||
            "Our Wide Range of IT Solutions, Consulting Services"
          )}

          ${
            hasText(service.sectionTwoText)
              ? renderParagraph(
                  service.sectionTwoText
                )
              : ""
          }

          ${
            hasText(service.sectionTwoAdditionalText)
              ? renderParagraph(
                  service.sectionTwoAdditionalText
                )
              : ""
          }

          ${
            hasText(service.sectionTwoClosingText)
              ? renderParagraph(
                  service.sectionTwoClosingText
                )
              : ""
          }
        </div>

        <div
          class="
            it-consulting-services-grid
          "
        >
          ${safeArray(
            service.consultingServices
          )
            .map(
              (item, index) => `
                <article
                  class="
                    it-consulting-service-item
                    reveal
                  "
                  style="
                    transition-delay:
                    ${Math.min(
                      index * 70,
                      210
                    )}ms
                  "
                >
                  ${renderHeading(
                    item.title,
                    "h3"
                  )}

                  ${renderParagraph(
                    item.text
                  )}
                </article>
              `
            )
            .join("")}
        </div>

      </div>
    </section>

    <!-- ===============================================
         IT CONSULTING EXPERTISE

         LEFT:
         Heading
         Description
         Certified Experts
         Quick Response
         Closing paragraph

         RIGHT:
         Image
    ================================================ -->

    <section
      class="
        service-section
        it-consulting-expertise-section
      "
    >
      <div
        class="
          container
          it-consulting-expertise-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            it-consulting-expertise-content
            reveal
          "
        >
          ${renderHeading(
            service.sectionFourTitle ||
            "IT Consulting Expertise"
          )}

          ${
            hasText(service.sectionFourText)
              ? renderParagraph(
                  service.sectionFourText
                )
              : ""
          }

          <div
            class="
              it-consulting-benefit-cards
            "
          >
            ${safeArray(
              service.benefitCards ||
              service.cards
            )
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      it-consulting-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(
                        index * 80,
                        160
                      )}ms
                    "
                  >
                    <span
                      class="
                        service-benefit-icon
                      "
                    >
                      <i
                        class="${
                          card.icon ||
                          (
                            index === 0
                              ? "fa-solid fa-file-shield"
                              : "fa-solid fa-clock"
                          )
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>
                      ${renderHeading(
                        card.title ||
                        (
                          index === 0
                            ? "Certified Experts"
                            : "Quick Response"
                        ),
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text ||
                        (
                          index === 0
                            ? "We have amazing security experts to save data"
                            : "Responding quickly is our priority in dealing clients"
                        )
                      )}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    it-consulting-closing
                    reveal
                  "
                >
                  ${renderParagraph(
                    service.closingText
                  )}
                </div>
              `
              : ""
          }
        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  it-consulting-expertise-image
                  reveal
                "
              >
                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle ||
                  "IT Consulting Expertise"
                )}
              </div>
            `
            : ""
        }

      </div>
    </section>
  `;
}

/* =========================================================
   IT STAFFING
========================================================= */

function renderITStaffing(service) {
  return `
    <!-- ===============================================
         FIRST SECTION
         LEFT CONTENT + RIGHT IMAGE
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "right",
    })}

    <!-- ===============================================
         WHY CHOOSE OUR IT STAFFING AGENCY

         Separate large image section ikkada remove chesam.
         Existing content change cheyyaledu.
    ================================================ -->

    <section
      class="
        service-section
        it-staffing-why-section
      "
    >
      <div class="container">

        <div
          class="
            it-staffing-why-content
            reveal
          "
        >
          ${renderHeading(
            service.sectionTwoTitle ||
            "Why Choose Our IT Staffing Agency"
          )}

          ${renderParagraphs(
            service.sectionTwoParagraphs
          )}

          ${
            hasText(service.sectionTwoText)
              ? renderParagraph(
                  service.sectionTwoText
                )
              : ""
          }

          ${
            hasText(
              service.sectionTwoAdditionalText
            )
              ? renderParagraph(
                  service.sectionTwoAdditionalText
                )
              : ""
          }

          ${
            hasText(
              service.sectionTwoClosingText
            )
              ? renderParagraph(
                  service.sectionTwoClosingText
                )
              : ""
          }
        </div>

      </div>
    </section>

    <!-- ===============================================
         IT STAFFING EXPERTISE

         LEFT:
         Heading
         Certified Experts
         Quick Response
         Closing paragraph

         RIGHT:
         Image
    ================================================ -->

    <section
      class="
        service-section
        it-staffing-expertise-section
      "
    >
      <div
        class="
          container
          it-staffing-expertise-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            it-staffing-expertise-content
            reveal
          "
        >
          ${renderHeading(
            service.sectionFourTitle ||
            "IT Staffing Expertise"
          )}

          ${
            hasText(service.sectionFourText)
              ? renderParagraph(
                  service.sectionFourText
                )
              : ""
          }

          <div
            class="
              it-staffing-benefit-cards
            "
          >
            ${safeArray(
              service.benefitCards ||
              service.cards
            )
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      it-staffing-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(
                        index * 80,
                        160
                      )}ms
                    "
                  >
                    <span
                      class="
                        service-benefit-icon
                      "
                    >
                      <i
                        class="${
                          card.icon ||
                          (
                            index === 0
                              ? "fa-solid fa-file-shield"
                              : "fa-solid fa-clock"
                          )
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>
                      ${renderHeading(
                        card.title ||
                        (
                          index === 0
                            ? "Certified Experts"
                            : "Quick Response"
                        ),
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text ||
                        (
                          index === 0
                            ? "We have amazing security experts to save data"
                            : "Responding quickly is our priority in dealing clients"
                        )
                      )}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    it-staffing-closing
                    reveal
                  "
                >
                  ${renderParagraph(
                    service.closingText
                  )}
                </div>
              `
              : ""
          }
        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  it-staffing-expertise-image
                  reveal
                "
              >
                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle ||
                  "IT Staffing Expertise"
                )}
              </div>
            `
            : ""
        }

      </div>
    </section>
  `;
}
/* =========================================================
   UI / UX DESIGN
========================================================= */

function renderUIUXDesign(service) {
  return `
    <!-- ===============================================
         FIRST SECTION
         LEFT CONTENT + RIGHT IMAGE
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "right",
    })}

    <!-- ===============================================
         UI/UX DESIGN FEATURES

         All points one section lo.
         Desktop lo 2 columns.
    ================================================ -->

    <section
      class="
        service-section
        uiux-features-section
      "
    >
      <div class="container">

        <div
          class="
            uiux-features-heading
            reveal
          "
        >
          ${renderHeading(
            service.sectionTwoTitle ||
            "Extra focus on conversion and engagement"
          )}

          ${
            hasText(service.sectionTwoText)
              ? renderParagraph(
                  service.sectionTwoText
                )
              : ""
          }
        </div>

        <div
          class="
            uiux-features-grid
          "
        >
          ${safeArray(
            service.designFeatures
          )
            .map(
              (feature, index) => `
                <article
                  class="
                    uiux-feature-item
                    reveal
                  "
                  style="
                    transition-delay:
                    ${Math.min(
                      index * 70,
                      280
                    )}ms
                  "
                >
                  ${renderHeading(
                    feature.title,
                    "h3"
                  )}

                  ${renderParagraph(
                    feature.text
                  )}
                </article>
              `
            )
            .join("")}
        </div>

      </div>
    </section>

    <!-- ===============================================
         UI/UX DESIGN EXPERTISE

         LEFT:
         Heading
         Certified Experts
         Quick Response
         Closing paragraph

         RIGHT:
         Image
    ================================================ -->

    <section
      class="
        service-section
        uiux-expertise-section
      "
    >
      <div
        class="
          container
          uiux-expertise-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            uiux-expertise-content
            reveal
          "
        >
          ${renderHeading(
            service.sectionFourTitle ||
            "UI/UX Design Expertise"
          )}

          ${
            hasText(service.sectionFourText)
              ? renderParagraph(
                  service.sectionFourText
                )
              : ""
          }

          <div
            class="
              uiux-benefit-cards
            "
          >
            ${safeArray(
              service.benefitCards ||
              service.cards
            )
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      uiux-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(
                        index * 80,
                        160
                      )}ms
                    "
                  >
                    <span
                      class="
                        service-benefit-icon
                      "
                    >
                      <i
                        class="${
                          card.icon ||
                          (
                            index === 0
                              ? "fa-solid fa-file-shield"
                              : "fa-solid fa-clock"
                          )
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>
                      ${renderHeading(
                        card.title ||
                        (
                          index === 0
                            ? "Certified Experts"
                            : "Quick Response"
                        ),
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text ||
                        (
                          index === 0
                            ? "We have amazing security experts to save data"
                            : "Responding quickly is our priority in dealing clients"
                        )
                      )}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    uiux-closing
                    reveal
                  "
                >
                  ${renderParagraph(
                    service.closingText
                  )}
                </div>
              `
              : ""
          }
        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  uiux-expertise-image
                  reveal
                "
              >
                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle ||
                  "UI/UX Design Expertise"
                )}
              </div>
            `
            : ""
        }

      </div>
    </section>
  `;
}
/* =========================================================
   DIGITAL MARKETING
========================================================= */

function renderDigitalMarketing(service) {
  return `
    <!-- ===============================================
         FIRST SECTION
         LEFT CONTENT + RIGHT IMAGE
    ================================================ -->

    ${renderCommonIntro(service, {
      imageSide: "right",
    })}

    <!-- ===============================================
         AGENCY VALUES
         LEFT IMAGE + RIGHT CONTENT
    ================================================ -->

    <section
      class="
        service-section
        digital-values-section
      "
    >
      <div
        class="
          container
          digital-values-layout
        "
      >

        <!-- LEFT IMAGE -->

        ${
          hasText(service.secondaryImage)
            ? `
              <div
                class="
                  digital-values-image
                  reveal
                "
              >
                ${renderImage(
                  service.secondaryImage,
                  service.valuesTitle ||
                  "UpTrendTek Agency Values"
                )}
              </div>
            `
            : ""
        }

        <!-- RIGHT CONTENT -->

        <div
          class="
            digital-values-content
            reveal
          "
        >
          ${renderHeading(
            service.valuesTitle ||
            "UpTrendTek Agency Values"
          )}

          ${
            hasText(service.valuesText)
              ? renderParagraph(
                  service.valuesText
                )
              : ""
          }

          ${renderBulletList(
            service.valuesList
          )}
        </div>

      </div>
    </section>

    <!-- ===============================================
         DIGITAL MARKETING SERVICES
         DESKTOP: TWO ITEMS PER ROW
    ================================================ -->

    <section
      class="
        service-section
        digital-marketing-services-section
      "
    >
      <div class="container">

        <div
          class="
            digital-marketing-services-heading
            reveal
          "
        >
          ${renderHeading(
            service.sectionTwoTitle ||
            "Digital Marketing Solutions"
          )}

          ${
            hasText(service.sectionTwoText)
              ? renderParagraph(
                  service.sectionTwoText
                )
              : ""
          }
        </div>

        <div
          class="
            digital-marketing-services-grid
          "
        >
          ${safeArray(
            service.marketingServices
          )
            .map(
              (item, index) => `
                <article
                  class="
                    digital-marketing-service-item
                    reveal
                  "
                  style="
                    transition-delay:
                    ${Math.min(
                      index * 70,
                      280
                    )}ms
                  "
                >
                  ${renderHeading(
                    item.title,
                    "h3"
                  )}

                  ${renderParagraph(
                    item.text
                  )}
                </article>
              `
            )
            .join("")}
        </div>

      </div>
    </section>

    <!-- ===============================================
         DIGITAL MARKETING SERVICES EXPERTISE

         LEFT:
         Heading
         Certified Experts
         Quick Response
         Closing text

         RIGHT:
         Image
    ================================================ -->

    <section
      class="
        service-section
        digital-expertise-section
      "
    >
      <div
        class="
          container
          digital-expertise-layout
        "
      >

        <!-- LEFT CONTENT -->

        <div
          class="
            digital-expertise-content
            reveal
          "
        >
          ${renderHeading(
            service.sectionFourTitle ||
            "Digital Marketing Services"
          )}

          ${
            hasText(service.sectionFourText)
              ? renderParagraph(
                  service.sectionFourText
                )
              : ""
          }

          <div
            class="
              digital-benefit-cards
            "
          >
            ${safeArray(
              service.benefitCards ||
              service.cards
            )
              .map(
                (card, index) => `
                  <article
                    class="
                      service-benefit-card
                      digital-benefit-card
                      reveal
                    "
                    style="
                      transition-delay:
                      ${Math.min(
                        index * 80,
                        160
                      )}ms
                    "
                  >
                    <span
                      class="
                        service-benefit-icon
                      "
                    >
                      <i
                        class="${
                          card.icon ||
                          (
                            index === 0
                              ? "fa-solid fa-file-shield"
                              : "fa-solid fa-clock"
                          )
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>
                      ${renderHeading(
                        card.title ||
                        (
                          index === 0
                            ? "Certified Experts"
                            : "Quick Response"
                        ),
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text ||
                        (
                          index === 0
                            ? "We have amazing security experts to save data"
                            : "Responding quickly is our priority in dealing clients"
                        )
                      )}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>

          ${
            hasText(service.closingText)
              ? `
                <div
                  class="
                    digital-closing
                    reveal
                  "
                >
                  ${renderParagraph(
                    service.closingText
                  )}
                </div>
              `
              : ""
          }
        </div>

        <!-- RIGHT IMAGE -->

        ${
          hasText(service.thirdImage)
            ? `
              <div
                class="
                  digital-expertise-image
                  reveal
                "
              >
                ${renderImage(
                  service.thirdImage,
                  service.sectionFourTitle ||
                  "Digital Marketing Services"
                )}
              </div>
            `
            : ""
        }

      </div>
    </section>
  `;
}
/* =========================================================
   GENERIC FALLBACK SERVICE
========================================================= */

function renderCommonService(service) {
  return `
    ${renderCommonIntro(service)}

    ${renderTextSection(
      service.sectionTwoTitle,
      service.sectionTwoText
    )}

    ${renderCardsImageSection(
      service
    )}

    ${renderClosingSection(
      service.closingText
    )}
  `;
}

/* =========================================================
   REUSABLE CONTENT SECTIONS
========================================================= */

function renderTextSection(
  title,
  text
) {
  if (
    !hasText(title) &&
    !hasText(text)
  ) {
    return "";
  }

  return `
    <section
      class="service-section service-text-only-section"
    >

      <div class="container">

        <div class="service-wide-content reveal">

          ${renderHeading(title)}

          ${
            hasText(title)
              ? `
                <span
                  class="service-heading-line"
                ></span>
              `
              : ""
          }

          ${renderParagraph(text)}

        </div>

      </div>

    </section>
  `;
}

function renderCardsImageSection(
  service
) {
  const cards =
    safeArray(service.cards);

  if (
    !cards.length &&
    !hasText(service.thirdImage)
  ) {
    return "";
  }

  return `
    <section
      class="service-section service-card-image-section"
    >

      <div class="container">

        ${
          hasText(
            service.sectionFourTitle
          ) ||
          hasText(
            service.sectionFourText
          )
            ? `
              <div
                class="service-card-image-heading reveal"
              >

                ${renderHeading(
                  service.sectionFourTitle
                )}

                ${renderParagraph(
                  service.sectionFourText
                )}

              </div>
            `
            : ""
        }

        <div
          class="service-card-image-layout"
        >

          <div
            class="service-benefit-cards"
          >

            ${cards
              .map(
                (
                  card,
                  index
                ) => `
                  <article
                    class="service-benefit-card reveal"
                    style="transition-delay:${
                      Math.min(
                        index * 80,
                        160
                      )
                    }ms"
                  >

                    <span
                      class="service-benefit-icon"
                    >
                      <i
                        class="${
                          card.icon ||
                          "fa-solid fa-check"
                        }"
                        aria-hidden="true"
                      ></i>
                    </span>

                    <div>

                      ${renderHeading(
                        card.title,
                        "h3"
                      )}

                      ${renderParagraph(
                        card.text
                      )}

                    </div>

                  </article>
                `
              )
              .join("")}

          </div>

          ${
            hasText(
              service.thirdImage
            )
              ? `
                <div
                  class="service-benefit-image reveal"
                >

                  ${renderImage(
                    service.thirdImage,
                    service.title
                  )}

                </div>
              `
              : ""
          }

        </div>

      </div>

    </section>
  `;
}

function renderClosingSection(text) {
  if (!hasText(text)) {
    return "";
  }

  return `
    <section
      class="service-section service-closing-section"
    >

      <div class="container">

        <div class="service-wide-content reveal">

          ${renderParagraph(text)}

        </div>

      </div>

    </section>
  `;
}

/* =========================================================
   LIST HELPERS
========================================================= */

function renderCheckList(items) {
  const list =
    safeArray(items);

  if (!list.length) {
    return "";
  }

  return `
    <ul class="service-check-list">

      ${list
        .map(
          (item) => `
            <li>

              <i
                class="fa-solid fa-circle-check"
                aria-hidden="true"
              ></i>

              <span>
                ${
                  typeof item ===
                  "string"
                    ? item
                    : item.text || ""
                }
              </span>

            </li>
          `
        )
        .join("")}

    </ul>
  `;
}

function renderBulletList(items) {
  const list =
    safeArray(items);

  if (!list.length) {
    return "";
  }

  return `
    <ul class="service-bullet-list">

      ${list
        .map(
          (item) => `
            <li>
              ${item}
            </li>
          `
        )
        .join("")}

    </ul>
  `;
}

function renderRichPoints(items) {
  const list =
    safeArray(items);

  if (!list.length) {
    return "";
  }

  return `
    <ul class="service-rich-points">

      ${list
        .map(
          (item) => `
            <li>

              <strong>
                ${item.title || ""}
              </strong>

              <span>
                ${item.text || ""}
              </span>

            </li>
          `
        )
        .join("")}

    </ul>
  `;
}

/* =========================================================
   CONTACT SECTION
========================================================= */

function renderContactSection(service) {
  const contactImage =
    service.contactImage ||
    "assets/services/service-contact.jpg";

  return `
    <section
      class="service-contact-section"
      id="serviceContact"
    >

      <div
        class="container service-contact-layout"
      >

        <div
          class="service-contact-visual reveal"
        >

          ${renderImage(
            contactImage,
            "Contact UpTrendTek"
          )}

          <div
            class="service-contact-overlay"
          ></div>

          <div
            class="service-contact-visual-content"
          >

            <span>
              LET'S WORK TOGETHER
            </span>

            <h2>
              Have a
              ${service.title.toLowerCase()}
              requirement?
            </h2>

            <p>
              Share your requirements with our
              team and we will contact you as
              soon as possible.
            </p>

            <div
              class="service-contact-details"
            >

              <a href="tel:+14302212038">

                <i
                  class="fa-solid fa-phone"
                  aria-hidden="true"
                ></i>

                <div>

                  <small>
                    Call Us
                  </small>

                  <strong>
                    +1 430 221 2038
                  </strong>

                </div>

              </a>

              <a
                href="mailto:hr@uptrendtllc.com"
              >

                <i
                  class="fa-solid fa-envelope"
                  aria-hidden="true"
                ></i>

                <div>

                  <small>
                    Send Email
                  </small>

                  <strong>
                    hr@uptrendtllc.com
                  </strong>

                </div>

              </a>

            </div>

          </div>

        </div>

        <div
          class="service-contact-form-card reveal"
        >

          <div
            class="service-contact-form-heading"
          >

            ${renderSectionLabel(
              "GET IN TOUCH"
            )}

            <h2>
              Send us a message
            </h2>

            <p>
              Complete the form and our team
              will contact you regarding your
              ${service.title.toLowerCase()}
              requirements.
            </p>

          </div>

         <form
  class="service-enquiry-form"
  id="serviceEnquiryForm"
  novalidate
>

  <input
    type="hidden"
    name="service"
    value="${service.title}"
  >

  <input
    type="hidden"
    name="form_source"
    value="Service Detail Page"
  >

  <input
    type="hidden"
    name="page_url"
    id="servicePageUrl"
    value=""
  >

  <div
    class="service-form-honeypot"
    aria-hidden="true"
  >
    <label for="serviceWebsite">
      Website
    </label>

    <input
      type="text"
      id="serviceWebsite"
      name="website"
      tabindex="-1"
      autocomplete="off"
    >
  </div>
            <div class="service-form-grid">

              ${renderFormField({
                id:
                  "serviceName",

                name:
                  "name",

                label:
                  "Your Name",

                type:
                  "text",

                placeholder:
                  "Enter your name",

                icon:
                  "fa-regular fa-user",

                autocomplete:
                  "name",
              })}

              ${renderFormField({
                id:
                  "serviceEmail",

                name:
                  "email",

                label:
                  "Email Address",

                type:
                  "email",

                placeholder:
                  "Enter email address",

                icon:
                  "fa-regular fa-envelope",

                autocomplete:
                  "email",
              })}

              ${renderFormField({
                id:
                  "servicePhone",

                name:
                  "phone",

                label:
                  "Phone Number",

                type:
                  "tel",

                placeholder:
                  "Enter phone number",

                icon:
                  "fa-solid fa-phone",

                autocomplete:
                  "tel",
              })}

              ${renderFormField({
                id:
                  "serviceSubject",

                name:
                  "subject",

                label:
                  "Subject",

                type:
                  "text",

                placeholder:
                  "Enter subject",

                icon:
                  "fa-regular fa-pen-to-square",

                value:
                  service.title,
              })}

              <div
                class="service-form-group service-full-field"
              >

                <label
                  for="serviceMessage"
                >
                  Message
                  <span>*</span>
                </label>

                <div
                  class="service-input-wrapper textarea-wrapper"
                >

                  <textarea
                    id="serviceMessage"
                    name="message"
                    placeholder="Tell us about your requirements"
                  ></textarea>

                  <i
                    class="fa-regular fa-message"
                    aria-hidden="true"
                  ></i>

                </div>

                <small
                  class="service-form-error"
                ></small>

              </div>

            </div>

            <button
              type="submit"
              class="service-submit-button"
            >

              <span>
                Send Mail
              </span>

              <i
                class="fa-solid fa-paper-plane"
                aria-hidden="true"
              ></i>

            </button>

            <div
              class="service-form-status"
              role="alert"
              aria-live="polite"
            ></div>

          </form>

        </div>

      </div>

    </section>
  `;
}

function renderFormField(field) {
  return `
    <div class="service-form-group">

      <label for="${field.id}">
        ${field.label}
        <span>*</span>
      </label>

      <div class="service-input-wrapper">

        <input
          type="${field.type}"
          id="${field.id}"
          name="${field.name}"
          placeholder="${field.placeholder}"
          value="${field.value || ""}"
          ${
            field.autocomplete
              ? `
                autocomplete="${field.autocomplete}"
              `
              : ""
          }
        >

        <i
          class="${field.icon}"
          aria-hidden="true"
        ></i>

      </div>

      <small
        class="service-form-error"
      ></small>

    </div>
  `;
}

/* =========================================================
   FORM VALIDATION
========================================================= */
function initializeServiceForm() {
  const form =
    document.getElementById(
      "serviceEnquiryForm"
    );

  if (!form) {
    return;
  }

  const fields = {
    name:
      form.querySelector(
        '[name="name"]'
      ),

    email:
      form.querySelector(
        '[name="email"]'
      ),

    phone:
      form.querySelector(
        '[name="phone"]'
      ),

    subject:
      form.querySelector(
        '[name="subject"]'
      ),

    message:
      form.querySelector(
        '[name="message"]'
      ),
  };

  const submitButton =
    form.querySelector(
      ".service-submit-button"
    );

  const status =
    form.querySelector(
      ".service-form-status"
    );

  const pageUrlField =
    form.querySelector(
      '[name="page_url"]'
    );

  if (
    !submitButton ||
    !status
  ) {
    return;
  }

  if (pageUrlField) {
    pageUrlField.value =
      window.location.href;
  }

  function clearStatus() {
    status.className =
      "service-form-status";

    status.textContent = "";
  }

  function clearError(field) {
    if (!field) {
      return;
    }

    const group =
      field.closest(
        ".service-form-group"
      );

    if (!group) {
      return;
    }

    group.classList.remove(
      "is-invalid"
    );

    const error =
      group.querySelector(
        ".service-form-error"
      );

    if (error) {
      error.textContent = "";
    }
  }

  function showError(
    field,
    message
  ) {
    if (!field) {
      return;
    }

    const group =
      field.closest(
        ".service-form-group"
      );

    if (!group) {
      return;
    }

    group.classList.add(
      "is-invalid"
    );

    const error =
      group.querySelector(
        ".service-form-error"
      );

    if (error) {
      error.textContent =
        message;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
      email
    );
  }

  function isValidPhone(phone) {
    const digits =
      phone.replace(/\D/g, "");

    return (
      /^[+\d\s()-]+$/.test(
        phone
      ) &&
      digits.length >= 10 &&
      digits.length <= 15
    );
  }

  Object.values(fields).forEach(
    (field) => {
      if (!field) {
        return;
      }

      field.addEventListener(
        "input",
        () => {
          clearError(field);
          clearStatus();
        }
      );
    }
  );

  form.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      clearStatus();

      Object.values(fields)
        .forEach(clearError);

      let valid = true;

      const name =
        fields.name?.value.trim() || "";

      const email =
        fields.email?.value.trim() || "";

      const phone =
        fields.phone?.value.trim() || "";

      const subject =
        fields.subject?.value.trim() || "";

      const message =
        fields.message?.value.trim() || "";

      if (name.length < 2) {
        showError(
          fields.name,
          "Please enter at least 2 characters."
        );

        valid = false;
      }

      if (!email) {
        showError(
          fields.email,
          "Please enter your email address."
        );

        valid = false;
      } else if (
        !isValidEmail(email)
      ) {
        showError(
          fields.email,
          "Please enter a valid email address."
        );

        valid = false;
      }

      if (!phone) {
        showError(
          fields.phone,
          "Please enter your phone number."
        );

        valid = false;
      } else if (
        !isValidPhone(phone)
      ) {
        showError(
          fields.phone,
          "Please enter a valid phone number."
        );

        valid = false;
      }

      if (subject.length < 3) {
        showError(
          fields.subject,
          "Please enter at least 3 characters."
        );

        valid = false;
      }

      if (message.length < 10) {
        showError(
          fields.message,
          "Please enter at least 10 characters."
        );

        valid = false;
      }

      if (!valid) {
        status.className =
          "service-form-status error";

        status.textContent =
          "Please correct the highlighted fields.";

        form
          .querySelector(
            ".service-form-group.is-invalid input, " +
            ".service-form-group.is-invalid textarea"
          )
          ?.focus();

        return;
      }

      const originalContent =
        submitButton.innerHTML;

      submitButton.disabled = true;

      submitButton.innerHTML = `
        <span>Sending...</span>

        <i
          class="fa-solid fa-spinner fa-spin"
          aria-hidden="true"
        ></i>
      `;

      try {
        if (pageUrlField) {
          pageUrlField.value =
            window.location.href;
        }

        const response =
          await fetch(
            "submit-form.php",
            {
              method: "POST",

              body:
                new FormData(form),

              headers: {
                Accept:
                  "application/json",
              },
            }
          );

        let result;

        try {
          result =
            await response.json();
        } catch {
          throw new Error(
            "Invalid response received from server."
          );
        }

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
            "Unable to send your message."
          );
        }

        status.className =
          "service-form-status success";

        status.textContent =
          result.message ||
          "Thank you! Your message has been sent successfully.";

        const serviceValue =
          form.querySelector(
            '[name="service"]'
          )?.value || "";

        const subjectValue =
          fields.subject.value;

        form.reset();

        const serviceField =
          form.querySelector(
            '[name="service"]'
          );

        if (serviceField) {
          serviceField.value =
            serviceValue;
        }

        if (pageUrlField) {
          pageUrlField.value =
            window.location.href;
        }

        fields.subject.value =
          subjectValue;

        Object.values(fields)
          .forEach(clearError);
      } catch (error) {
        console.error(
          "Service form submission error:",
          error
        );

        status.className =
          "service-form-status error";

        status.textContent =
          error.message ||
          "Unable to submit your message. Please try again.";
      } finally {
        submitButton.disabled =
          false;

        submitButton.innerHTML =
          originalContent;
      }
    }
  );
}
/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initializeReveal() {
  const elements =
    document.querySelectorAll(
      ".service-detail-page .reveal"
    );

  if (!elements.length) {
    return;
  }

  if (
    !(
      "IntersectionObserver" in
      window
    )
  ) {
    elements.forEach(
      (element) => {
        element.classList.add(
          "is-visible"
        );
      }
    );

    return;
  }

  const observer =
    new IntersectionObserver(
      (
        entries,
        revealObserver
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

            revealObserver.unobserve(
              entry.target
            );
          }
        );
      },
      {
        threshold: 0.1,

        rootMargin:
          "0px 0px -35px 0px",
      }
    );

  elements.forEach(
    (element) => {
      observer.observe(element);
    }
  );
}

/* =========================================================
   IMAGE ERRORS
========================================================= */

function initializeImageErrors() {
  const images =
    document.querySelectorAll(
      ".service-detail-page img"
    );

  images.forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        const wrapper =
          image.parentElement;

        wrapper?.classList.add(
          "image-error"
        );

        image.style.display =
          "none";
      }
    );
  });
}

/* =========================================================
   NOT FOUND
========================================================= */

function renderNotFound(root) {
  document.title =
    "Service Not Found | UpTrendTek";

  root.innerHTML = `
    <section class="service-not-found">

      <div class="container">

        <h1>
          Service not found
        </h1>

        <p>
          The requested service page is unavailable.
        </p>

        <a
          href="services.html"
          class="service-primary-button"
        >
          View Services
        </a>

      </div>

    </section>
  `;
}