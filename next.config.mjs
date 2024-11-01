/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Permitir que los builds de producción se completen exitosamente
    // incluso si tu proyecto tiene errores de tipo.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
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
