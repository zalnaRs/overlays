const initClocks = () => {
  for (const clock of document.querySelectorAll("#hand-clock")) {
    const iframe = document.createElement("iframe");
    iframe.frameBorder = "0";
    iframe.src = `/components/hand-clock${clock.dataset["cellSize"] ? `?cell-size=${clock.dataset["cellSize"]}` : ""}${clock.dataset["fieldGap"] ? `&field-gap=${clock.dataset["fieldGap"]}` : ""}`;
    iframe.style.border = "0";
    iframe.style.height = "73px";

    clock.append(iframe);
  }

  for (const clock of document.querySelectorAll("#digital-clock")) {
    const time = "00:00:00";
    for (let i = 0; i < time.length; i++) {
      const digit = document.createElement("strong");
      digit.innerHTML = time[i];
      //    digit.style.letterSpacing =
      //     i == 2 || i == 1 || i == 5 || i == 4 ? "-6px" : "-4px";
      //digit.style.width = "8px";
      clock.append(digit);
    }

    clock.className += "flex gap-1 clock items-center";
    let lastTime = "00:00:00";
    setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
      const time = `${hours}:${minutes}:${seconds}`;
      for (let i = 0; i < time.length; i++) {
        if (time[i] != lastTime[i]) {
          setTimeout(() => {
            clock.childNodes[i].innerHTML = time[i];
            clock.childNodes[i].style.animation =
              "fade-in 200ms var(--ease-in-out-expo) forwards";
          }, 210);
          clock.childNodes[i].style.animation =
            "fade-out 200ms var(--ease-in-out-expo) forwards";
        }
      }

      lastTime = time;
    }, 1000);
  }

  const simpleClocks = document.querySelectorAll("#clock");

  for (const clock of simpleClocks) {
    clock.className += "clock";
  }

  if (simpleClocks.length != 0) {
    setInterval(() => {
      const now = new Date();

      simpleClocks.forEach((clock) => {
        clock.innerHTML = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      });
    }, 1000);
  }
};

window.addEventListener("load", initClocks);
