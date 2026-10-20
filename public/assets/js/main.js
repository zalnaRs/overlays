window.BASE_URL = location.origin;
window.HOST_URL = location.host;
const main_params = new URLSearchParams(location.search);

const replaceTemplateValues = () => {
  const replacements = {
    puskas_1: "Puskás Tivadar Távközlési és Informatikai Technikum",
    puskas_2: "BMSZC Puskás Tivadar Távközlési és Informatikai Technikum",
    puskas_3:
      '<h2 class="text-xl">Budapesti Műszaki Szakképzési Centrum</h2>\n<h1>Puskás Tivadar Távközlési és Informatikai Technikum</h1>',
    puskas_4: "Budapesti Műszaki Szakképzési Centrum",
  };

  Object.entries(replacements).forEach(([key, value]) => {
    document.body.innerHTML = document.body.innerHTML.replace(
      new RegExp(`{{\\s*${key}\\s*}}`, "g"),
      value,
    );
  });

  document.body.innerHTML = document.body.innerHTML.replace(
    /{{\s*params_([\w-]+)\s*}}/g,
    (_, key) => {
      const value = main_params.get(key);
      return value ?? "";
    },
  );
};

import("/assets/js/clock.js");

window.addEventListener("load", () => {
  replaceTemplateValues();

  try {
    const slot = document.querySelector("#embed-slot");
    if (slot) {
      const embedUrl = main_params.get("embed-url");
      if (embedUrl) {
        slot.src = decodeURI(embedUrl);
      }
    }
  } catch (err) {
    console.error("Can't embed to slot: ", err);
  }
});

window.handlesForNotifications = {
  reload: () => location.reload(),
};

import("https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4");
import("/assets/js/notification.js");

window.addEventListener("DOMContentLoaded", () => {
  document.body.style.visibility = "visible";
});

window.addEventListener("obsSourceActiveChanged", (event) => {
  const active = event.detail.active;

  if (!active) {
    document.body.style.visibility = "hidden";
  } else {
    document.querySelectorAll(".fade-in-blur").forEach((el) => {
      el.classList.remove("fade-in-blur");
      void el.offsetWidth;
      el.classList.add("fade-in-blur");
    });

    setTimeout(() => {
      document.body.style.visibility = "visible";
    }, 200);
  }
});

window.delay = async (ms) =>
  await new Promise((resolve, _) => {
    setTimeout(() => resolve(null), ms);
  });
