import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://saimansah.com.np";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicit permissions for AI Search Engines, Generative Agents & LLM Web Crawlers
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "Google-Extended",
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "Applebot",
          "Applebot-Extended",
          "cohere-ai",
          "Meta-ExternalAgent",
          "Diffbot",
          "DuckDuckBot",
        ],
        allow: ["/", "/assets/", "/llms.txt", "/llms-full.txt"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: "saimansah.com.np",
  };
}
