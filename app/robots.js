export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://ai-career-coach.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/resume/", "/interview/", "/ai-cover-letter/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
