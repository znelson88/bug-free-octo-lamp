export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Hello World! 🎉 Your Worker is live.");
    }

    if (url.pathname === "/api/status") {
      return new Response(JSON.stringify({ status: "ok", time: new Date().toISOString() }), {
        headers: { "content-type": "application/json" },
      });
    }

    if (url.pathname === "/api/check-secret") {
      const hasSecret = typeof env.TEST_SECRET !== "undefined";
      return new Response(JSON.stringify({ secretLoaded: hasSecret }), {
        headers: { "content-type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
