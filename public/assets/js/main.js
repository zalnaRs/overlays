window.BASE_URL = location.origin;
window.HOST_URL = location.host;
const params = new URLSearchParams(location.search);

import("/assets/js/clock.js");

window.addEventListener("load", () => {
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{\s*puskas_1\s*}}/g,
    "Puskás Tivadar Távközlési és Informatikai Technikum",
  );
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{\s*puskas_2\s*}}/g,
    "BMSZC Puskás Tivadar Távközlési és Informatikai Technikum",
  );
  document.body.innerHTML = document.body.innerHTML.replace(
    /{{\s*puskas_3\s*}}/g,
    '<h2 class="text-xl">Budapesti Műszaki Szakképzési Centrum</h2>\n<h1>Puskás Tivadar Távközlési és Informatikai Technikum</h1>',
  );

  try {
    const slot = document.querySelector("#embed-slot");
    if (slot) {
      slot.src = decodeURI(params.get("embed-url"));
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
