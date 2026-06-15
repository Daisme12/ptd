const DEFAULT_TIMEOUT_MS = 8000;

export default async function handler(req, res) {
  const backendHealthUrl =
    process.env.BACKEND_HEALTH_URL ||
    (process.env.VITE_API_URL ? `${process.env.VITE_API_URL}/health` : null);

  if (!backendHealthUrl) {
    return res.status(500).json({
      ok: false,
      error: "Set BACKEND_HEALTH_URL or VITE_API_URL in Vercel env",
    });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(backendHealthUrl, {
      method: "GET",
      signal: controller.signal,
    });

    return res.status(200).json({
      ok: response.ok,
      status: response.status,
      pingedAt: new Date().toISOString(),
    });
  } catch (error) {
    return res.status(200).json({
      ok: false,
      error: error.message,
      pingedAt: new Date().toISOString(),
    });
  } finally {
    clearTimeout(timeoutId);
  }
}
