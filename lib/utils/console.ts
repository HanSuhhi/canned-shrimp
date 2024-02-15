import { DEV } from "./env";

export function Debug(...messages: unknown[]) {
  if (!DEV) return;

  // eslint-disable-next-line no-console
  console.log("👻 DEBUG LOG / ", ...messages);
}
