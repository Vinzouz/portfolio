import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Désactive les source maps en développement (optionnel)
  productionBrowserSourceMaps: false,
  // Ignore les warnings de source map
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60, // 1 heure
  },
};

export default withNextIntl(nextConfig);
