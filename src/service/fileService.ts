const baseURL = import.meta.env.VITE_REST_BASE_URL;

export const getPreviewImage = (catalogId: string) => {
  if (!catalogId) {
    catalogId = "default-image-catalog-id";
  }
  return `${baseURL}${"transfer/v1/preview/"}${catalogId}${"?_t="}${new Date().getTime()}`;
};
