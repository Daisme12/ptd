import api from "./api";

const KEEP_ALIVE_INTERVAL_MS = 14 * 60 * 1000;

export function startBackendKeepAlive() {
  const ping = () => {
    api.get("/health", { timeout: 8000 }).catch(() => {});
  };

  ping();
  return setInterval(ping, KEEP_ALIVE_INTERVAL_MS);
}
