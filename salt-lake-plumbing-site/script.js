(() => {
  const menu = document.querySelector("#site-menu");
  const toggle = document.querySelector(".nav-toggle");

  if (menu && toggle) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    menu.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });

  const form = document.querySelector("[data-lead-form]");
  const feedback = document.querySelector("[data-form-feedback]");

  if (!form || !feedback) {
    return;
  }

  const ownerEmail = form.getAttribute("data-owner-email") || "hello@example.com";
  const safeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail) ? ownerEmail : "hello@example.com";

  const clean = (value) => value.replace(/\s+/g, " ").trim();

  const setInvalid = (field, invalid) => {
    field.setAttribute("aria-invalid", String(invalid));
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    feedback.textContent = "";

    const data = new FormData(form);
    if (clean(String(data.get("website") || ""))) {
      feedback.textContent = "Thanks. Your request is ready to send.";
      form.reset();
      return;
    }

    const requiredFields = [...form.querySelectorAll("[required]")];
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      const invalid = !clean(field.value);
      setInvalid(field, invalid);
      if (invalid && !firstInvalid) {
        firstInvalid = field;
      }
    });

    const phone = clean(String(data.get("phone") || ""));
    const phoneField = form.querySelector('[name="phone"]');
    if (phoneField && phone.replace(/[^\d]/g, "").length < 10) {
      setInvalid(phoneField, true);
      firstInvalid = firstInvalid || phoneField;
    }

    if (firstInvalid) {
      feedback.textContent = "Please complete the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    const name = clean(String(data.get("name") || ""));
    const service = clean(String(data.get("service") || ""));
    const area = clean(String(data.get("area") || "Not provided"));
    const message = clean(String(data.get("message") || ""));
    const subject = encodeURIComponent(`Plumbing request: ${service}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Service: ${service}`,
        `Neighborhood: ${area}`,
        "",
        "Issue:",
        message
      ].join("\n")
    );

    feedback.textContent = "Opening your email app with the request details.";
    window.location.href = `mailto:${safeEmail}?subject=${subject}&body=${body}`;
  });

  form.addEventListener("input", (event) => {
    if (event.target instanceof HTMLElement && event.target.matches("[aria-invalid='true']")) {
      event.target.setAttribute("aria-invalid", "false");
    }
  });
})();
