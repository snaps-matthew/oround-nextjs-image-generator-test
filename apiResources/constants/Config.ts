export default {
  DOMAIN_API: process.env.NEXT_PUBLIC_OROUND_API_DOMAIN || 'https://api.oround.com',
  DOMAIN_RESOURCE: 'https://cdn.oround.com/',
  RESOURCE_CDN_URL: process.env.RESOURCE_CDN_URL || "https://oround-image-generator-resources.s3.ap-northeast-2.amazonaws.com",
  API_V1: '/api/v1',
  ARTWORK_RESOURCE_SKIN: 'artwork-editor/resource/product/',
  ARTWORK_INFO: '/artwork/product/edit-info',
};
