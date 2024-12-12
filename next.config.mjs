/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.(wav)|\.(mp3)$/,
        type: "asset/resource",
        generator: {
          filename: "static/chunks/[path][name].[hash][ext]",
        },
      });
  
      return config;
    },
    basePath: '/gta-san-radio-stations',
    assetPrefix: '/gta-san-radio-stations
};

export default nextConfig;
