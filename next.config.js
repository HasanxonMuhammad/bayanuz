/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // iOS Universal Links: Apple faylni JSON sifatida kutadi
        // (kengaytmasiz fayl aks holda octet-stream bo'lib ketadi).
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};
module.exports = nextConfig;
