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

    // Generic check: confirms a named secret/variable is loaded, without exposing its value.
    // Usage: /api/check-secret?name=YOUR_VAR_NAME
    if (url.pathname === "/api/check-secret") {
      const name = url.searchParams.get("name");
      if (!name) {
        return new Response(JSON.stringify({ error: "Missing ?name= parameter" }), {
          status: 400,
          headers: { "content-type": "application/json" },
        });
      }
      const loaded = typeof env[name] !== "undefined";
      return new Response(JSON.stringify({ name, loaded }), {
        headers: { "content-type": "application/json" },
      });
    }

    return new Response("Not Found", { status: 404 });
  },
};
