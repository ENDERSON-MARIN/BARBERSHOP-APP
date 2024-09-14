/** @type {import('next').NextConfig} */
const nextConfig = {
  /* PERMITIR EN NEXT IMAGENES DESDE SERVIDOR EXTERNO */
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
