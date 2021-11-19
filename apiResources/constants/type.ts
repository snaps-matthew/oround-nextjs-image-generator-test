export const TYPE  = {
  OBJECT_BACKGROUND: "background",
  OBJECT_IMAGE: "image",
  OBJECT_FORM_IMAGE: 'formImage',
  OBJECT_STICKER: "sticker",
  OBJECT_GRID_TABLE: 'gridTable',
  OBJECT_FORM_TEXT: 'formText',
  OBJECT_YEAR_TEXT: 'yearText',
  OBJECT_READ_ONLY_TEXT: 'readOnlyText',
  OBJECT_TEXT: "text",
  OBJECT_EXTERNAL_TEXT: "externalText",
  OBJECT_GROUP: "group",
  OBJECT_SCENE_MASK: "sceneMask",
  OBJECT_SCENE_CUT: "sceneCut",
  OBJECT_HOLE: "hole",
  OBJECT_LAYOUT: 'layout',

  // 툴바를 보여주기 위한 모바일 전용(textile, oneColorPrint)
  OBJECT_TEXTILE: "textile",
  OBJECT_ONE_COLOR_PRINT: "oneColorPrint",

  FORM_TEXT_WEEK: 'week',
  FORM_TEXT_DAY: 'day',
  FROM_TEXT_DAY_TITLE: 'dayTitle',

  BACKGROUND_IMAGE: "image",
  BACKGROUND_COLOR: "color",
  BACKGROUND_PDF: "pdf",

  IMAGE_IMAGE: "image", // 알단 사용 안함
  IMAGE_ARTWORK: "artwork",
  IMAGE_LOGO: "logo",
  IMAGE_PDF: "pdf",

  HOLE_IN: "in",
  HOLE_OUT: "out",

  BORDER_IMAGE: "borderImage",
  BORDER_COLOR: "singleColor",
  BORDER_MASK: "mask",

  TEXT_SPINE: "spine",            // 텍스트 책등

  SECTION_EDITOR: "editor",
  SECTION_PLATES: "plates",
  SECTION_OPTION: "option",
  SECTION_PREVIEW: "preview",

  SIDE_FRONT: "front",
  SIDE_BACK: "back",

  NEED_TO_UPDATE: "needToUpdate",
  NEED_TO_INIT: "needToInit",
  UPDATING: "updating",
  READY: "ready",
  COMPLETE: "complete",
  EMPTY: "empty",

  SOURCE_TEMPLATE: "template",
  SOURCE_USER: "user",
  SOURCE_RSRC: "rsrc",

  // SAVE, SAVE_TO_CART, SAVE_AS 값은 변경하면 안됨 (서버에서 처리하는 값)
  SAVE_BAG: "SAVE",
  SAVE_CART: "SAVE_TO_CART",
  SAVE_AS: "SAVE_AS",

  SAVE_QUICK: "SAVE_QUICK", // 단축키 저장시 팝업을 띄우지 않는다.

  SAVE_OUT: "out",

  SCENE_COVER: "cover",
  SCENE_TITLE: "title",
  SCENE_PAGE: "page",
  SCENE_HIDDEN: "hidden",
  SCENE_LOW_PAGE: "lowPage",

  SCENE_COVER_HARD: "hard",
  SCENE_COVER_SOFT: "soft",
  SCENE_COVER_LEATHER: "leather",

  SCENE_SUBTYPE_SPREAD: "spread",
  SCENE_SUBTYPE_PAGE: "page",

  SCENE_SUBTYPE_BLANK: "blank",
  SCENE_SUBTYPE_PREVIEW: "preview",
  SCENE_SUBTYPE_SUMMARY: "summary",

  MULTIFORM: "multiform",
  MULTIFORM_TEMPLATE: "multiformTemplate",

  POST_MESSAGE_GET_TOKEN: "getToken",
  POST_MESSAGE_GO_HOME: "goHome",
  POST_MESSAGE_GO_BACK: "goBack",
  POST_MESSAGE_GO_CART: "goMemberCart",
  POST_MESSAGE_GO_BAG: "goMemberBag",
  POST_MESSAGE_GO_FAQ: "goFAQ",
  POST_MESSAGE_OPEN_LOGO_MAKE: "openLogoMake",
  POST_MESSAGE_OPEN_CLIPART: "openClipart",
  POST_MESSAGE_OPEN_EXCEL: "openExcel",
  POST_MESSAGE_CHANGE_LOG: "changeLog",
  POST_MESSAGE_COMPLETED: "completed|",

  CALENDAR_GRID_TYPE_SQUARE: 'square',
  CALENDAR_GRID_TYPE_ROW1: 'row1',
  CALENDAR_GRID_TYPE_ROW2: 'row2',
  CALENDAR_GRID_TYPE_COL1: 'col1',
  CALENDAR_GRID_TYPE_COL2: 'col2',

  CALENDAR_OBJECT_WEEK_GRID: 'weekGrid',
  CALENDAR_OBJECT_DAY_GRID: 'dayGrid',

  CALENDAR_DAY_POS_UPPER: 'upper',
  CALENDAR_DAY_POS_LOWER: 'lower',

  YEAR_NUM: 'num',
  YEAR_NUM_SUF: 'numSuf',
  YEAR_HALF_NUM: 'halfNum',
  YEAR_HALF_NUM_SUF: 'halfNumSuf',
  YEAR_KO: 'ko',
  YEAR_KO_SUF: 'koSuf',
  YEAR_ZH_60: 'zh',
  YEAR_ZH_60_SUF: 'zhSuf',
  YEAR_KO_60: 'ko60',
  YEAR_KO_60_SUF: 'ko60Suf',

  WEEK_KO: 'ko',
  WEEK_ZH: 'zh',
  WEEK_ENG_1_UPPER: 'eng1Upper',
  WEEK_ENG_1_LOWER: 'eng1Lower',
  WEEK_ENG_3_UPPER: 'eng3Upper',
  WEEK_ENG_3_LOWER: 'eng3Lower',
  WEEK_ENG_FULL_UPPER: 'engFullUpper',
  WEEK_ENG_FULL_LOWER: 'engFullLower',

  DAY_TYPE_DIAGONAL: 'diagonal',
  DAY_TYPE_MULTI: 'multi',

  DAY_TITLE_TYPE_SLASH: 'slash',
  DAY_TITLE_TYPE_MULTI: 'multi',
}
