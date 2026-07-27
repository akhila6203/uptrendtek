document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const contactForm =
    document.getElementById("contactForm");

  const formStatus =
    document.getElementById("contactFormStatus");

  if (!contactForm || !formStatus) {
    return;
  }

  const pageUrlField =
    document.getElementById("contactPageUrl");

  if (pageUrlField) {
    pageUrlField.value =
      window.location.href;
  }

  const fields = {
    name:
      document.getElementById(
        "contactName"
      ),

    email:
      document.getElementById(
        "contactEmail"
      ),

    phone:
      document.getElementById(
        "contactPhone"
      ),

    subject:
      document.getElementById(
        "contactSubject"
      ),

    service:
      document.getElementById(
        "contactService"
      ),

    message:
      document.getElementById(
        "contactMessage"
      ),
  };

  function showFieldError(
    field,
    message
  ) {
    if (!field) {
      return;
    }

    const formGroup =
      field.closest(".form-group");

    const errorElement =
      formGroup?.querySelector(
        ".form-error"
      );

    if (
      !formGroup ||
      !errorElement
    ) {
      return;
    }

    formGroup.classList.add(
      "is-invalid"
    );

    errorElement.textContent =
      message;
  }

  function clearFieldError(field) {
    if (!field) {
      return;
    }

    const formGroup =
      field.closest(".form-group");

    const errorElement =
      formGroup?.querySelector(
        ".form-error"
      );

    if (
      !formGroup ||
      !errorElement
    ) {
      return;
    }

    formGroup.classList.remove(
      "is-invalid"
    );

    errorElement.textContent = "";
  }

  function showFormStatus(
    type,
    message
  ) {
    formStatus.className =
      `contact-form-status ${type}`;

    formStatus.textContent =
      message;
  }

  function clearFormStatus() {
    formStatus.className =
      "contact-form-status";

    formStatus.textContent = "";
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
      email
    );
  }

  function isValidPhone(phone) {
    const digitsOnly =
      phone.replace(/\D/g, "");

    return (
      /^[+\d\s()-]+$/.test(
        phone
      ) &&
      digitsOnly.length >= 10 &&
      digitsOnly.length <= 15
    );
  }

  function validateForm() {
    let isValid = true;

    Object.values(fields).forEach(
      (field) => {
        clearFieldError(field);
      }
    );

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
      showFieldError(
        fields.name,
        "Please enter at least 2 characters."
      );

      isValid = false;
    }

    if (!email) {
      showFieldError(
        fields.email,
        "Please enter your email address."
      );

      isValid = false;
    } else if (
      !isValidEmail(email)
    ) {
      showFieldError(
        fields.email,
        "Please enter a valid email address."
      );

      isValid = false;
    }

    if (!phone) {
      showFieldError(
        fields.phone,
        "Please enter your phone number."
      );

      isValid = false;
    } else if (
      !isValidPhone(phone)
    ) {
      showFieldError(
        fields.phone,
        "Please enter a valid phone number."
      );

      isValid = false;
    }

    if (subject.length < 3) {
      showFieldError(
        fields.subject,
        "Please enter at least 3 characters."
      );

      isValid = false;
    }

    if (message.length < 10) {
      showFieldError(
        fields.message,
        "Please enter at least 10 characters."
      );

      isValid = false;
    }

    return isValid;
  }

  Object.values(fields).forEach(
    (field) => {
      if (!field) {
        return;
      }

      const eventName =
        field.tagName === "SELECT"
          ? "change"
          : "input";

      field.addEventListener(
        eventName,
        () => {
          clearFieldError(field);
          clearFormStatus();
        }
      );
    }
  );

  contactForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();

      clearFormStatus();

      if (!validateForm()) {
        showFormStatus(
          "error",
          "Please correct the highlighted fields and submit again."
        );

        const firstInvalidField =
          contactForm.querySelector(
            ".form-group.is-invalid input, " +
            ".form-group.is-invalid select, " +
            ".form-group.is-invalid textarea"
          );

        firstInvalidField?.focus();

        return;
      }

      const submitButton =
        contactForm.querySelector(
          ".contact-submit-button"
        );

      if (!submitButton) {
        return;
      }

      const originalButtonContent =
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
                new FormData(
                  contactForm
                ),

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

        showFormStatus(
          "success",
          result.message ||
          "Thank you! Your message has been sent successfully."
        );

        contactForm.reset();

        if (pageUrlField) {
          pageUrlField.value =
            window.location.href;
        }

        Object.values(fields).forEach(
          (field) => {
            clearFieldError(field);
          }
        );
      } catch (error) {
        console.error(
          "Contact form submission error:",
          error
        );

        showFormStatus(
          "error",
          error.message ||
          "Unable to submit your message. Please try again."
        );
      } finally {
        submitButton.disabled =
          false;

        submitButton.innerHTML =
          originalButtonContent;
      }
    }
  );
});