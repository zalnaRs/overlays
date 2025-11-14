import { Elysia, t } from "elysia";
import { staticPlugin } from "@elysiajs/static";
import { MessageType } from "./types.d";

const app = new Elysia()
  .use(
    staticPlugin({
      prefix: "/",
      indexHTML: true,
    }),
  )
  .group("/api", (app) =>
    app.get("/", { version: "1", status: "OK" }).ws("/ws", {
      body: t.Object({
        type: t.Enum(MessageType),
        message: t.String(),
      }),
      open(ws) {
        ws.subscribe("message");
        console.log("Client connected to ws");
      },
      message(ws, { type, message }) {
        ws.send({ type, message, time: new Date().getTime() });
        ws.publish("message", { type, message, time: new Date().getTime() });
      },
    }),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
