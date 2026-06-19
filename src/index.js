export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World! 🎉 Your Worker is live.", {
      headers: { "content-type": "text/plain" },
    });
  },
};
