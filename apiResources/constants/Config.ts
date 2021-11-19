export default {
  port: process.env.SERVER_PORT || 3000,
  apiDomain: process.env.SNAPS_API_DOMAIN || "https://kr-www-api.snaps.com",

  RESOURCE_CDN_URL: process.env.RESOURCE_CDN_URL || "https://oround-image-generator-resources.s3.ap-northeast-2.amazonaws.com",

  api: {
    prefix: '/api',
  },
};
