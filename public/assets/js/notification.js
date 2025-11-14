const socket = new WebSocket(`ws://${window.HOST_URL}/api/ws`);

socket.onopen = (ev) => {
  console.log("WebSocket connection opened");
};

socket.onmessage = (ev) => {
  const data = JSON.parse(ev.data);
  console.log(`Data recieved from server: ${data}`);
  switch (data.type) {
    case "control":
      try {
        window.handlesForNotifications[data.message]();
      } catch (err) {
        console.error("Failed to execute control notification: ", err);
      }
      break;
    case "notification":
      break;
    default:
      console.warn(`Invalid message type, ${data.type}`);
  }
};

socket.onclose = (ev) => {
  if (ev.wasClean) {
    console.log("WebSocket connection closed");
  } else {
    console.log("WebSocket died");
  }
};

socket.onerror = (ev) => {
  console.error(`WebSocket error: ${ev.code}`);
};
