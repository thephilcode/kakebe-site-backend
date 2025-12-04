// Function to generate preview pathname based on content type and document
const getPreviewPathname = (uid, { locale, document }): string => {
  const { slug } = document;
  
  // Handle different content types with their specific URL patterns
  switch (uid) {
    // Handle pages with predefined routes
    case "api::page.page":
      switch (slug) {
        case "homepage":
          return `/${locale}`; // Localized homepage
        case "pricing":
          return "/pricing"; // Pricing page
        case "contact":
          return "/contact"; // Contact page
        case "faq":
          return "/faq"; // FAQ page
      }
    // Handle product pages
    case "api::product.product": {
      if (!slug) {
        return "/products"; // Products listing page
      }
      return `/products/${slug}`; // Individual product page
    }
    // Handle blog articles
    case "api::article.article": {
      if (!slug) {
        return "/blog"; // Blog listing page
      }
      return `/blog/${slug}`; // Individual article page
    }
    default: {
      return null;
    }
  }
};

// Main configuration export
export default ({ env }) => {
  // Get environment variables
  const clientUrl = env("CLIENT_URL"); // Frontend application URL
  const previewSecret = env("PREVIEW_SECRET"); // Secret key for preview authentication

  return {
    // Other admin-related configurations go here
    // (see docs.strapi.io/cms/configurations/admin-panel)
    preview: {
      enabled: true, // Enable preview functionality
      config: {
        allowedOrigins: clientUrl, // Restrict preview access to specific domain
        async handler(uid, { documentId, locale, status }) {
          // Fetch the complete document from Strapi
          const document = await strapi.documents(uid).findOne({ documentId });
          
          // Generate the preview pathname based on content type and document
          const pathname = getPreviewPathname(uid, { locale, document });

          // Disable preview if the pathname is not found
          if (!pathname) {
            return null;
          }

          // Use Next.js draft mode passing it a secret key and the content-type status
          const urlSearchParams = new URLSearchParams({
            url: pathname,
            secret: previewSecret,
            status,
          });
          return `${clientUrl}/api/preview?${urlSearchParams}`;
        },
      },
    },
  };
};
