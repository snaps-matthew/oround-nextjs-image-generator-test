export default {
  DOMAIN_API: process.env.NEXT_PUBLIC_DOMAIN_API || 'https://dev-api.oround.com',
  DOMAIN_RESOURCE: process.env.NEXT_PUBLIC_DOMAIN_RESOURCE || 'https://dev-cdn.oround.com',
  RESOURCE_CDN_URL: process.env.NEXT_PUBLIC_RESOURCE_CDN_URL || "https://oround-prd.s3.ap-northeast-2.amazonaws.com/artwork-editor/resource/product",
  API_V1: '/api/v1',
  ARTWORK_RESOURCE_SKIN: '/artwork-editor/resource/product/',
  ARTWORK_INFO: '/artwork/product/edit-info',
  ERROR_IMAGE_URL:'https://oround-prd.s3.ap-northeast-2.amazonaws.com/artwork-editor/resource/product/Texture/error.png',
};
