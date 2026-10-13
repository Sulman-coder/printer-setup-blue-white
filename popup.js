
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("hpModelForm");
  const input = document.getElementById("printerModel");

  const modal = document.getElementById("driverModal");
  const closeBtn = document.getElementById("driverClose");

  const modelName = document.getElementById("driverModelName");
  const progressView = document.getElementById("driverProgressView");
  const errorView = document.getElementById("driverErrorView");

  const progressFill = document.getElementById("driverProgressFill");
  const progressNumber = document.getElementById("driverProgressNumber");
  const statusText = document.getElementById("driverStatusText");

  const chatButton = document.getElementById("driverChatButton");

  // Check required HTML elements
  if (
    !form || !input || !modal || !closeBtn ||
    !modelName || !progressView || !errorView ||
    !progressFill || !progressNumber || !statusText ||
    !chatButton
  ) {
    console.error("Popup error: One or more HTML IDs are missing.");
    return;
  }

  let progressTimer = null;
  let errorTimer = null;

  // Open installation popup
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const model = input.value.trim();

    if (!model) {
      input.focus();
      return;
    }

    clearInterval(progressTimer);
    clearTimeout(errorTimer);

    modelName.textContent = model;

    progressFill.style.width = "0%";
    progressNumber.textContent = "0%";
    statusText.textContent = "Preparing installation preview...";

    progressView.hidden = false;
    errorView.hidden = true;

    modal.classList.add("driver-modal-open");
    modal.setAttribute("aria-hidden", "false");

    console.log("INSTALLATION POPUP OPENED");

    let progress = 0;

    progressTimer = setInterval(function () {
      progress = Math.min(progress + 2, 80);

      progressFill.style.width = progress + "%";
      progressNumber.textContent = progress + "%";

      if (progress >= 80) {
        clearInterval(progressTimer);

        statusText.textContent =
          "Installation preview interrupted.";

        errorTimer = setTimeout(function () {
          if (modal.classList.contains("driver-modal-open")) {
            progressView.hidden = true;
            errorView.hidden = false;
          }
        }, 1000);
      }
    }, 200);
  });

  // Close popup
  function closePopup() {
    clearInterval(progressTimer);
    clearTimeout(errorTimer);

    modal.classList.remove("driver-modal-open");
    modal.setAttribute("aria-hidden", "true");
  }

  closeBtn.addEventListener("click", closePopup);

  // Close popup when background is clicked
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closePopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closePopup();
    }
  });

  // Open chatbot on the same page
//   chatButton.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (
//       typeof onWebChat !== "undefined" &&
//       typeof onWebChat.set === "function"
//     ) {
//       onWebChat.set("open", true);
//     } else if (
//       typeof onWebChat_ !== "undefined" &&
//       typeof onWebChat_.set === "function"
//     ) {
//       onWebChat_.set("open", true);
//     } else {
//       console.error(
//         "Chat widget is not ready. Check the OnWebChat script."
//       );
//     }
//   });


  // Open OnWebChat on the same page
//   chatButton.addEventListener("click", function (event) {
//     event.preventDefault();

//     if (
//       typeof onWebChat !== "undefined" &&
//       typeof onWebChat.set === "function"
//     ) {
//       onWebChat.set("open", true);

//       console.log("OnWebChat open request sent.");
//     } else {
//       console.error("OnWebChat script is not loaded.");
//     }
//   });




  // Open OnWebChat when the error popup button is clicked
  chatButton.addEventListener("click", function (event) {
    event.preventDefault();

    if (
      typeof onWebChat !== "undefined" &&
      typeof onWebChat.set === "function"
    ) {
      onWebChat.set("show", 1);
      onWebChat.set("max", 1);
    } else {
      console.error("OnWebChat has not loaded.");
    }
  });

  // Support links: return to printer model input
  document.querySelectorAll(".support-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      input.focus();

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });

  // Subscribe form
  const subscribeForm = document.getElementById("subscribeForm");

  if (subscribeForm) {
    subscribeForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("emailAddress");

      if (emailInput && emailInput.checkValidity()) {
        alert("Thank you for subscribing!");
        subscribeForm.reset();
      } else if (emailInput) {
        emailInput.reportValidity();
      }
    });
  }
});