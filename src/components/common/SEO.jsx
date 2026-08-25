import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteMetadata } from '../../data/SEO/seoData';

const SEO = ({ title, description, keywords, canonicalUrl, image }) => {
    const fullTitle = title
        ? `${title} | ${siteMetadata.siteName}`
        : `${siteMetadata.siteName} | Find Your Dream Tech Job`;

    const metaDescription = description || siteMetadata.pages.home.description;
    const metaKeywords = keywords || siteMetadata.pages.home.keywords;
    const currentUrl = canonicalUrl ? `${siteMetadata.baseUrl}${canonicalUrl}` : siteMetadata.baseUrl;
    const metaImage = image ? `${siteMetadata.baseUrl}${image}` : `${siteMetadata.baseUrl}${siteMetadata.defaultImage}`;

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Social Media Preview */}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteMetadata.siteName} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
};

export default SEO;