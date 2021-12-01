export enum SceneType {
  page = '167001',
  front = '167002',
  cover = '167003',
  back = '167004'
}

export const sceneTypeName: { [key: string]: string } = {
  [SceneType.page]: 'page',
  [SceneType.front]: 'front',
  [SceneType.cover]: 'cover',
  [SceneType.back]: 'back'
};

export const sceneTypeCode: { [key: string]: string } = {
  'page': SceneType.page,
  'front': SceneType.front,
  'cover': SceneType.cover,
  'back': SceneType.back
};