/* =========================================================
   GET SHARED HEADER AND FOOTER PLACEHOLDERS
========================================================= */

const sharedHeaderPlaceholder =
  document.getElementById("shared-header");

const sharedFooterPlaceholder =
  document.getElementById("shared-footer");

/* =========================================================
   COMPANY DETAILS

   NOTE:
   Mee actual company details change cheyyali ante
   ee object lo matrame update cheyyandi.
========================================================= */

const companyDetails = {
  companyName: "UpTrendTek",

  address:
    "Suite 600, Germantown, MD 208",

  email:
    "hr@uptrendtllc.com",

  phoneDisplay:
    "+1 430 221 2038",

  phoneLink:
    "+14302212038",

  whatsappNumber:
    "14302212038",
};

/* =========================================================
   SERVICES DROPDOWN DATA

   Ee names header dropdown, mobile dropdown and
   footer services section lo automatic ga display avutayi.
========================================================= */

const serviceLinks = [
  {
    name: "Application Development",
    href: "application-development.html",
  },
  {
    name: "Software Development",
    href: "software-development.html",
  },
  {
    name: "Web Development",
    href: "web-development.html",
  },
  {
    name: "Mobile Application Development",
    href: "mobile-application-development.html",
  },
  {
    name: "IT Consulting",
    href: "it-consulting.html",
  },
  {
    name: "IT Staffing",
    href: "it-staffing.html",
  },
  {
    name: "UI/UX Design",
    href: "ui-ux-design.html",
  },
  {
    name: "Digital Marketing",
    href: "digital-marketing.html",
  },
];

/* =========================================================
   SOCIAL MEDIA LINKS

   Pinterest remove chesi LinkedIn pettamu.
   Mee actual social links vachaka URLs replace cheyyandi.
========================================================= */

const socialLinks = {
  twitter:
    "https://www.twitter.com/",

  facebook:
    "https://www.facebook.com/",

  linkedin:
    "https://www.linkedin.com/",

  instagram:
    "https://www.instagram.com/",
};

/* =========================================================
   CREATE DESKTOP SERVICES DROPDOWN LINKS
========================================================= */

const desktopServiceLinks = serviceLinks
  .map(
    (service) => `
      <a
        class="simple-dropdown-link"
        href="${service.href}"
      >
        ${service.name}
      </a>
    `
  )
  .join("");

/* =========================================================
   CREATE MOBILE SERVICES DROPDOWN LINKS
========================================================= */

const mobileServiceLinks = serviceLinks
  .map(
    (service) => `
      <a
        class="mobile-submenu-link"
        href="${service.href}"
      >
        <span>
          ${service.name}
        </span>

        <i
          class="fa-solid fa-arrow-right"
          aria-hidden="true"
        ></i>
      </a>
    `
  )
  .join("");

/* =========================================================
   HEADER TEMPLATE
========================================================= */

const siteHeaderTemplate = `
  <header
    class="site-header"
    id="siteHeader"
  >

    <!-- =============================================
         TOP HEADER
    ============================================== -->

    <div class="top-header">

      <div
        class="lares-container top-header-inner"
      >

        <!-- Top Header Contact Information -->

        <div class="top-header-contact">

          <!-- Address -->

          <a
            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              companyDetails.address
            )}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open UpTrendTek location in Google Maps"
          >
            <i
              class="fa-solid fa-location-dot"
              aria-hidden="true"
            ></i>

            <span>
              ${companyDetails.address}
            </span>
          </a>

          <!-- Email -->

          <a
            href="mailto:${companyDetails.email}"
            aria-label="Send email to ${companyDetails.email}"
          >
            <i
              class="fa-solid fa-envelope"
              aria-hidden="true"
            ></i>

            <span>
              ${companyDetails.email}
            </span>
          </a>

        </div>

        <!-- Top Header Social Links -->

        <div
          class="top-header-socials"
          aria-label="Social media links"
        >

          <!-- Twitter / X -->

          <a
            href="${socialLinks.twitter}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Twitter"
          >
            <i
              class="fa-brands fa-x-twitter"
              aria-hidden="true"
            ></i>
          </a>

          <!-- Facebook -->

          <a
            href="${socialLinks.facebook}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Facebook"
          >
            <i
              class="fa-brands fa-facebook-f"
              aria-hidden="true"
            ></i>
          </a>

          <!-- LinkedIn -->

          <a
            href="${socialLinks.linkedin}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on LinkedIn"
          >
            <i
              class="fa-brands fa-linkedin-in"
              aria-hidden="true"
            ></i>
          </a>

          <!-- Instagram -->

          <a
            href="${socialLinks.instagram}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Instagram"
          >
            <i
              class="fa-brands fa-instagram"
              aria-hidden="true"
            ></i>
          </a>

        </div>

      </div>

    </div>

    <!-- =============================================
         MAIN HEADER
    ============================================== -->

    <div class="main-header">

      <div
        class="lares-container header-container"
      >

        <!-- =========================================
             LEFT SIDE LOGO
        ========================================== -->

        <a
          class="brand-logo"
          href="index.html"
          aria-label="${companyDetails.companyName} home page"
        >
          <img
            src="assets/logo.jpg"
            alt="${companyDetails.companyName} Logo"
          >
        </a>

        <!-- =========================================
             MIDDLE DESKTOP NAVIGATION
        ========================================== -->

        <nav
          class="desktop-navigation"
          aria-label="Primary navigation"
        >

          <!-- Home -->

          <a
            class="desktop-nav-link"
            href="index.html"
          >
            Home
          </a>

          <!-- Company -->

          <a
            class="desktop-nav-link"
            href="about.html"
          >
            Company
          </a>

          <!-- Services Dropdown -->

          <div class="nav-dropdown">

            <a
              class="desktop-nav-link services-main-link"
              href="services.html"
              aria-haspopup="true"
              aria-label="Open Services page"
            >
              Services

              <i
                class="fa-solid fa-chevron-down dropdown-chevron"
                aria-hidden="true"
              ></i>
            </a>

            <div
              class="simple-dropdown services-dropdown-menu"
              aria-label="Services submenu"
            >
              ${desktopServiceLinks}
            </div>

          </div>

          <!-- Industries -->

          <a
            class="desktop-nav-link industries-main-link"
            href="industries.html"
          >
            Industries
          </a>

          <!-- Contact Us -->

          <a
            class="desktop-nav-link"
            href="contact.html"
          >
            Contact Us
          </a>

        </nav>

        <!-- =========================================
             RIGHT SIDE PHONE CARD
        ========================================== -->

        <a
          class="header-phone-card"
          href="tel:${companyDetails.phoneLink}"
          aria-label="Call ${companyDetails.companyName} at ${companyDetails.phoneDisplay}"
        >

          <span class="header-phone-icon">
            <i
              class="fa-solid fa-phone"
              aria-hidden="true"
            ></i>
          </span>

          <span class="header-phone-content">

            <small>
              Have Any Questions?
            </small>

            <strong>
              ${companyDetails.phoneDisplay}
            </strong>

          </span>

        </a>

        <!-- =========================================
             MOBILE MENU BUTTON
        ========================================== -->

        <button
          class="mobile-menu-button"
          id="mobileMenuButton"
          type="button"
          aria-label="Open navigation menu"
          aria-expanded="false"
          aria-controls="mobileNavigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

    </div>

    <!-- =============================================
         MOBILE MENU OVERLAY
    ============================================== -->

    <div
      class="mobile-menu-overlay"
      id="mobileMenuOverlay"
    ></div>

    <!-- =============================================
         MOBILE NAVIGATION
    ============================================== -->

    <aside
      class="mobile-navigation"
      id="mobileNavigation"
      aria-label="Mobile navigation"
    >

      <!-- Mobile Navigation Header -->

      <div class="mobile-navigation-header">

        <a
          class="mobile-brand-logo"
          href="index.html"
          aria-label="${companyDetails.companyName} home page"
        >
          <img
            src="assets/logo.jpg"
            alt="${companyDetails.companyName} Logo"
          >
        </a>

        <button
          class="mobile-close-button"
          id="mobileCloseButton"
          type="button"
          aria-label="Close navigation menu"
        >
          <i
            class="fa-solid fa-xmark"
            aria-hidden="true"
          ></i>
        </button>

      </div>

      <!-- Mobile Navigation Body -->

      <div class="mobile-navigation-body">

        <!-- Mobile Home -->

        <a
          class="mobile-nav-link"
          href="index.html"
        >
          <span>
            Home
          </span>

          <i
            class="fa-solid fa-arrow-right"
            aria-hidden="true"
          ></i>
        </a>

        <!-- Mobile Company -->

        <a
          class="mobile-nav-link"
          href="about.html"
        >
          <span>
            Company
          </span>

          <i
            class="fa-solid fa-arrow-right"
            aria-hidden="true"
          ></i>
        </a>

        <!-- Mobile Services Group -->

        <div class="mobile-menu-group">

          <div class="mobile-menu-row">

            <a
              class="mobile-nav-link mobile-services-main"
              href="services.html"
            >
              <span>
                Services
              </span>
            </a>

            <button
              class="mobile-submenu-toggle"
              id="mobileServicesToggle"
              type="button"
              aria-expanded="false"
              aria-controls="mobileServicesList"
              aria-label="Open services submenu"
            >
              <i
                class="fa-solid fa-chevron-down"
                aria-hidden="true"
              ></i>
            </button>

          </div>

          <div
            class="mobile-submenu-list"
            id="mobileServicesList"
          >
            ${mobileServiceLinks}
          </div>

        </div>

        <!-- Mobile Industries -->

        <a
          class="mobile-nav-link mobile-industries-main"
          href="industries.html"
        >
          <span>
            Industries
          </span>

          <i
            class="fa-solid fa-arrow-right"
            aria-hidden="true"
          ></i>
        </a>

        <!-- Mobile Contact -->

        <a
          class="mobile-nav-link"
          href="contact.html"
        >
          <span>
            Contact Us
          </span>

          <i
            class="fa-solid fa-arrow-right"
            aria-hidden="true"
          ></i>
        </a>

      </div>

      <!-- =========================================
           MOBILE NAVIGATION FOOTER
      ========================================== -->

      <div class="mobile-navigation-footer">

        <!-- Mobile Footer Email -->

        <a
          href="mailto:${companyDetails.email}"
          aria-label="Send email to ${companyDetails.email}"
        >
          <i
            class="fa-solid fa-envelope"
            aria-hidden="true"
          ></i>

          <span>
            ${companyDetails.email}
          </span>
        </a>

        <!-- Mobile Footer Phone -->

        <a
          href="tel:${companyDetails.phoneLink}"
          aria-label="Call ${companyDetails.phoneDisplay}"
        >
          <i
            class="fa-solid fa-phone"
            aria-hidden="true"
          ></i>

          <span>
            ${companyDetails.phoneDisplay}
          </span>
        </a>

        <!-- Mobile Social Links -->

        <div
          class="mobile-social-links"
          aria-label="Mobile social media links"
        >

          <!-- Twitter -->

          <a
            href="${socialLinks.twitter}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Twitter"
          >
            <i
              class="fa-brands fa-x-twitter"
              aria-hidden="true"
            ></i>
          </a>

          <!-- Facebook -->

          <a
            href="${socialLinks.facebook}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Facebook"
          >
            <i
              class="fa-brands fa-facebook-f"
              aria-hidden="true"
            ></i>
          </a>

          <!-- LinkedIn -->

          <a
            href="${socialLinks.linkedin}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on LinkedIn"
          >
            <i
              class="fa-brands fa-linkedin-in"
              aria-hidden="true"
            ></i>
          </a>

          <!-- Instagram -->

          <a
            href="${socialLinks.instagram}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Instagram"
          >
            <i
              class="fa-brands fa-instagram"
              aria-hidden="true"
            ></i>
          </a>

        </div>

      </div>

    </aside>

  </header>
`;

/* =========================================================
   FOOTER TEMPLATE
========================================================= */

const siteFooterTemplate = `
  <footer class="site-footer">

    <div
      class="lares-container footer-main-grid"
    >

      <!-- =========================================
           FOOTER COMPANY COLUMN
      ========================================== -->

      <div class="footer-company-column">

        <a
          href="index.html"
          class="footer-logo-box"
          aria-label="${companyDetails.companyName} home page"
        >
          <img
            class="footer-logo"
            src="assets/logo.jpg"
            alt="${companyDetails.companyName} Logo"
          >
        </a>

        <p class="footer-description">
          UpTrendTek delivers reliable technology solutions,
          software development, application development,
          IT consulting, staffing and digital services that
          help businesses grow and succeed.
        </p>

        <!-- Footer Social Links -->

        <div
          class="footer-social-links"
          aria-label="Footer social media links"
        >

          <!-- Twitter -->

          <a
            href="${socialLinks.twitter}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Twitter"
          >
            <i
              class="fa-brands fa-x-twitter"
              aria-hidden="true"
            ></i>
          </a>

          <!-- Facebook -->

          <a
            href="${socialLinks.facebook}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Facebook"
          >
            <i
              class="fa-brands fa-facebook-f"
              aria-hidden="true"
            ></i>
          </a>

          <!-- LinkedIn -->

          <a
            href="${socialLinks.linkedin}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on LinkedIn"
          >
            <i
              class="fa-brands fa-linkedin-in"
              aria-hidden="true"
            ></i>
          </a>

          <!-- Instagram -->

          <a
            href="${socialLinks.instagram}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit UpTrendTek on Instagram"
          >
            <i
              class="fa-brands fa-instagram"
              aria-hidden="true"
            ></i>
          </a>

        </div>

      </div>

      <!-- =========================================
           FOOTER QUICK LINKS
      ========================================== -->

      <div class="footer-column">

        <h3>
          Quick Links
        </h3>

        <ul class="footer-links-list">

          <li>
            <a href="index.html">
              Home
            </a>
          </li>

          <li>
            <a href="about.html">
              Company
            </a>
          </li>

          <li>
            <a href="services.html">
              Services
            </a>
          </li>

          <li>
            <a href="industries.html">
              Industries
            </a>
          </li>

          <li>
            <a href="contact.html">
              Contact Us
            </a>
          </li>

        </ul>

      </div>

      <!-- =========================================
           FOOTER SERVICES
      ========================================== -->

      <div class="footer-column">

        <h3>
          Services
        </h3>

        <ul
          class="footer-links-list footer-services-list"
        >

          ${serviceLinks
            .map(
              (service) => `
                <li>
                  <a href="${service.href}">
                    ${service.name}
                  </a>
                </li>
              `
            )
            .join("")}

        </ul>

      </div>

      <!-- =========================================
           FOOTER CONTACT
      ========================================== -->

      <div
        class="footer-column footer-contact-column"
      >

        <h3>
          Contact
        </h3>

        <!-- Footer Address -->

        <div class="footer-address-row">

          <span class="footer-address-icon">
            <i
              class="fa-solid fa-location-dot"
              aria-hidden="true"
            ></i>
          </span>

          <a
            class="footer-address"
            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              companyDetails.address
            )}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open UpTrendTek address in Google Maps"
          >
            ${companyDetails.address}
          </a>

        </div>

        <!-- Footer Phone And Email -->

        <ul class="footer-contact-list">

          <li>

            <i
              class="fa-solid fa-phone"
              aria-hidden="true"
            ></i>

            <a
              href="tel:${companyDetails.phoneLink}"
              aria-label="Call ${companyDetails.phoneDisplay}"
            >
              ${companyDetails.phoneDisplay}
            </a>

          </li>

          <li>

            <i
              class="fa-solid fa-envelope"
              aria-hidden="true"
            ></i>

            <a
              href="mailto:${companyDetails.email}"
              aria-label="Send email to ${companyDetails.email}"
            >
              ${companyDetails.email}
            </a>

          </li>

        </ul>

      </div>

    </div>

    <!-- =============================================
         FOOTER BOTTOM
    ============================================== -->

    <div class="footer-bottom">

      <div
        class="lares-container footer-bottom-inner"
      >

        <p>
         Copyright © 2024
          <span id="currentYear"></span>
          ${companyDetails.companyName}
           | Designed by Heights.
        </p>

        <div class="footer-bottom-links">

          <a href="privacy-policy.html">
            Privacy Policy
          </a>

          <a href="terms-conditions.html">
            Terms &amp; Conditions
          </a>

        </div>

      </div>

    </div>

  </footer>
`;

/* =========================================================
   INSERT HEADER AND FOOTER INTO HTML
========================================================= */

if (sharedHeaderPlaceholder) {
  sharedHeaderPlaceholder.innerHTML =
    siteHeaderTemplate;
}

if (sharedFooterPlaceholder) {
  sharedFooterPlaceholder.innerHTML =
    siteFooterTemplate;
}

/* =========================================================
   GET ELEMENTS AFTER HEADER INSERTION
========================================================= */

const siteHeader =
  document.getElementById("siteHeader");

const mobileMenuButton =
  document.getElementById(
    "mobileMenuButton"
  );

const mobileCloseButton =
  document.getElementById(
    "mobileCloseButton"
  );

const mobileNavigation =
  document.getElementById(
    "mobileNavigation"
  );

const mobileMenuOverlay =
  document.getElementById(
    "mobileMenuOverlay"
  );

const mobileServicesToggle =
  document.getElementById(
    "mobileServicesToggle"
  );

const mobileServicesList =
  document.getElementById(
    "mobileServicesList"
  );

/* =========================================================
   ACTIVE PAGE FILE GROUPS
========================================================= */

const servicePageFiles = [
  "services.html",
  "application-development.html",
  "software-development.html",
  "web-development.html",
  "mobile-application-development.html",
  "it-consulting.html",
  "it-staffing.html",
  "ui-ux-design.html",
  "digital-marketing.html",
];

const industryPageFiles = [
  "industries.html",
];

/* =========================================================
   GET CURRENT PAGE FILE NAME
========================================================= */

function getCurrentFileName() {
  const currentPath =
    window.location.pathname;

  let currentFile = currentPath
    .split("/")
    .pop()
    .split("?")[0]
    .split("#")[0]
    .toLowerCase();

  if (!currentFile) {
    currentFile = "index.html";
  }

  return currentFile;
}

/* =========================================================
   SET ACTIVE NAVIGATION
========================================================= */

function setActiveNavigation() {
  const currentFile =
    getCurrentFileName();

  document
    .querySelectorAll(
      ".desktop-nav-link, .mobile-nav-link"
    )
    .forEach((link) => {
      const linkHref =
        link.getAttribute("href");

      if (!linkHref) {
        return;
      }

      const hrefFile = linkHref
        .split("?")[0]
        .split("#")[0]
        .toLowerCase();

      if (hrefFile === currentFile) {
        link.classList.add("active");
      }
    });

  /* Service detail page open ayithe
     main Services menu active avutundi */

  if (
    servicePageFiles.includes(currentFile)
  ) {
    document
      .querySelector(
        ".services-main-link"
      )
      ?.classList.add("active");

    document
      .querySelector(
        ".mobile-services-main"
      )
      ?.classList.add("active");
  }

  /* Industry page open ayithe
     Industries menu active avutundi */

  if (
    industryPageFiles.includes(currentFile)
  ) {
    document
      .querySelector(
        ".industries-main-link"
      )
      ?.classList.add("active");

    document
      .querySelector(
        ".mobile-industries-main"
      )
      ?.classList.add("active");
  }
}

/* =========================================================
   STICKY HEADER SHADOW
========================================================= */

function handleHeaderScroll() {
  if (!siteHeader) {
    return;
  }

  siteHeader.classList.toggle(
    "scrolled",
    window.scrollY > 10
  );
}

window.addEventListener(
  "scroll",
  handleHeaderScroll,
  {
    passive: true,
  }
);

/* =========================================================
   OPEN MOBILE MENU
========================================================= */

function openMobileMenu() {
  mobileNavigation?.classList.add(
    "open"
  );

  mobileMenuOverlay?.classList.add(
    "show"
  );

  mobileMenuButton?.classList.add(
    "active"
  );

  mobileMenuButton?.setAttribute(
    "aria-expanded",
    "true"
  );

  document.body.classList.add(
    "menu-open"
  );
}

/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu() {
  mobileNavigation?.classList.remove(
    "open"
  );

  mobileMenuOverlay?.classList.remove(
    "show"
  );

  mobileMenuButton?.classList.remove(
    "active"
  );

  mobileMenuButton?.setAttribute(
    "aria-expanded",
    "false"
  );

  document.body.classList.remove(
    "menu-open"
  );
}

/* =========================================================
   MOBILE MENU BUTTON EVENT
========================================================= */

mobileMenuButton?.addEventListener(
  "click",
  () => {
    const isMenuOpen =
      mobileNavigation?.classList.contains(
        "open"
      );

    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }
);

/* =========================================================
   MOBILE CLOSE BUTTON EVENT
========================================================= */

mobileCloseButton?.addEventListener(
  "click",
  closeMobileMenu
);

/* =========================================================
   MOBILE OVERLAY CLICK EVENT
========================================================= */

mobileMenuOverlay?.addEventListener(
  "click",
  closeMobileMenu
);

/* =========================================================
   CLOSE MOBILE MENU AFTER LINK CLICK
========================================================= */

document
  .querySelectorAll(
    ".mobile-nav-link, .mobile-submenu-link"
  )
  .forEach((link) => {
    link.addEventListener(
      "click",
      closeMobileMenu
    );
  });

/* =========================================================
   CLOSE MOBILE MENU WITH ESCAPE KEY
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  }
);

/* =========================================================
   MOBILE ACCORDION COMMON FUNCTION
========================================================= */

function setupMobileAccordion(
  toggleButton,
  submenuList
) {
  if (
    !toggleButton ||
    !submenuList
  ) {
    return;
  }

  toggleButton.addEventListener(
    "click",
    () => {
      const isOpen =
        submenuList.classList.toggle(
          "open"
        );

      toggleButton.classList.toggle(
        "active",
        isOpen
      );

      toggleButton.setAttribute(
        "aria-expanded",
        String(isOpen)
      );

      toggleButton.setAttribute(
        "aria-label",
        isOpen
          ? "Close services submenu"
          : "Open services submenu"
      );
    }
  );
}

/* =========================================================
   ACTIVATE MOBILE SERVICES ACCORDION
========================================================= */

setupMobileAccordion(
  mobileServicesToggle,
  mobileServicesList
);

/* =========================================================
   AUTO OPEN MOBILE SERVICES FOR SERVICE DETAIL PAGE
========================================================= */

function openActiveMobileSubmenu() {
  const currentFile =
    getCurrentFileName();

  if (
    !servicePageFiles.includes(currentFile)
  ) {
    return;
  }

  mobileServicesList?.classList.add(
    "open"
  );

  mobileServicesToggle?.classList.add(
    "active"
  );

  mobileServicesToggle?.setAttribute(
    "aria-expanded",
    "true"
  );

  mobileServicesToggle?.setAttribute(
    "aria-label",
    "Close services submenu"
  );
}

/* =========================================================
   CLOSE MOBILE MENU ON DESKTOP RESIZE
========================================================= */

window.addEventListener(
  "resize",
  () => {
    if (window.innerWidth > 1100) {
      closeMobileMenu();
    }
  }
);

/* =========================================================
   WHATSAPP FLOATING BUTTON
========================================================= */

const whatsappButton =
  document.createElement("a");

whatsappButton.className =
  "whatsapp-chat-button";

whatsappButton.href =
  `https://wa.me/${companyDetails.whatsappNumber}` +
  `?text=${encodeURIComponent(
    "Hello UpTrendTek, I would like to discuss a business or technology requirement."
  )}`;

whatsappButton.target =
  "_blank";

whatsappButton.rel =
  "noopener noreferrer";

whatsappButton.setAttribute(
  "aria-label",
  "Chat with UpTrendTek on WhatsApp"
);

whatsappButton.innerHTML = `
  <span class="floating-tooltip">
    Chat with us
  </span>

  <span class="whatsapp-icon-ring">
    <i
      class="fa-brands fa-whatsapp"
      aria-hidden="true"
    ></i>
  </span>
`;

document.body.appendChild(
  whatsappButton
);

/* =========================================================
   UP AND DOWN SCROLL BUTTON
========================================================= */

const scrollDirectionButton =
  document.createElement("button");

scrollDirectionButton.className =
  "scroll-direction-button";

scrollDirectionButton.type =
  "button";

scrollDirectionButton.dataset.direction =
  "down";

scrollDirectionButton.setAttribute(
  "aria-label",
  "Scroll down"
);

scrollDirectionButton.innerHTML = `
  <i
    class="fa-solid fa-arrow-down"
    aria-hidden="true"
  ></i>
`;

document.body.appendChild(
  scrollDirectionButton
);

/* =========================================================
   UPDATE SCROLL BUTTON DIRECTION
========================================================= */

function updateScrollDirectionButton() {
  const documentHeight =
    document.documentElement.scrollHeight;

  const currentBottomPosition =
    window.innerHeight +
    window.scrollY;

  const nearBottom =
    currentBottomPosition >=
    documentHeight - 150;

  const scrollIcon =
    scrollDirectionButton.querySelector(
      "i"
    );

  if (
    nearBottom ||
    window.scrollY > 500
  ) {
    scrollDirectionButton.dataset.direction =
      "up";

    scrollDirectionButton.setAttribute(
      "aria-label",
      "Scroll to top"
    );

    if (scrollIcon) {
      scrollIcon.className =
        "fa-solid fa-arrow-up";
    }
  } else {
    scrollDirectionButton.dataset.direction =
      "down";

    scrollDirectionButton.setAttribute(
      "aria-label",
      "Scroll down"
    );

    if (scrollIcon) {
      scrollIcon.className =
        "fa-solid fa-arrow-down";
    }
  }
}

/* =========================================================
   SCROLL BUTTON CLICK
========================================================= */

scrollDirectionButton.addEventListener(
  "click",
  () => {
    const direction =
      scrollDirectionButton.dataset.direction;

    if (direction === "up") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      return;
    }

    window.scrollBy({
      top: Math.max(
        window.innerHeight * 0.8,
        500
      ),

      behavior: "smooth",
    });
  }
);

/* =========================================================
   UPDATE SCROLL BUTTON ON PAGE SCROLL
========================================================= */

window.addEventListener(
  "scroll",
  updateScrollDirectionButton,
  {
    passive: true,
  }
);

/* =========================================================
   CURRENT YEAR
========================================================= */

const currentYearElement =
  document.getElementById(
    "currentYear"
  );

if (currentYearElement) {
  currentYearElement.textContent =
    new Date().getFullYear();
}

/* =========================================================
   INITIALIZE HEADER AND FOOTER
========================================================= */

setActiveNavigation();

openActiveMobileSubmenu();

handleHeaderScroll();

updateScrollDirectionButton();


