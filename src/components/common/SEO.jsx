import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_IMAGE = "/Riva.png";
const SITE_NAME = "Riva Enterprise";

const getSiteUrl = () => {
  const configuredUrl = import.meta.env.VITE_SITE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "";
};

const setMetaTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const setLinkTag = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const SEO = ({
  title,
  description,
  keywords = [],
  image = DEFAULT_IMAGE,
  type = "website",
  structuredData,
}) => {
  const location = useLocation();

  useEffect(() => {
    const siteUrl = getSiteUrl();
    const canonicalUrl = `${siteUrl}${location.pathname}`;
    const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    setMetaTag('meta[name="description"]', {
      name: "description",
      content: description,
    });
    setMetaTag('meta[name="keywords"]', {
      name: "keywords",
      content: keywords.join(", "),
    });
    setMetaTag('meta[name="robots"]', {
      name: "robots",
      content: "index, follow",
    });

    setLinkTag('link[rel="canonical"]', {
      rel: "canonical",
      href: canonicalUrl,
    });

    setMetaTag('meta[property="og:site_name"]', {
      property: "og:site_name",
      content: SITE_NAME,
    });
    setMetaTag('meta[property="og:title"]', {
      property: "og:title",
      content: fullTitle,
    });
    setMetaTag('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    setMetaTag('meta[property="og:type"]', {
      property: "og:type",
      content: type,
    });
    setMetaTag('meta[property="og:url"]', {
      property: "og:url",
      content: canonicalUrl,
    });
    setMetaTag('meta[property="og:image"]', {
      property: "og:image",
      content: imageUrl,
    });

    setMetaTag('meta[name="twitter:card"]', {
      name: "twitter:card",
      content: "summary_large_image",
    });
    setMetaTag('meta[name="twitter:title"]', {
      name: "twitter:title",
      content: fullTitle,
    });
    setMetaTag('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    setMetaTag('meta[name="twitter:image"]', {
      name: "twitter:image",
      content: imageUrl,
    });

    const existingJsonLd = document.head.querySelector(
      'script[data-seo-json-ld="true"]',
    );
    existingJsonLd?.remove();

    if (structuredData) {
      const jsonLd = document.createElement("script");
      jsonLd.type = "application/ld+json";
      jsonLd.dataset.seoJsonLd = "true";
      jsonLd.textContent = JSON.stringify(structuredData(siteUrl, canonicalUrl));
      document.head.appendChild(jsonLd);
    }
  }, [description, image, keywords, location.pathname, structuredData, title, type]);

  return null;
};

export default SEO;
