module.exports = {
    PAGINATE_SELECT_ALL: 0,
    PAGINATE_LIMIT_DEFAULT: 10,
    PAGINATE_FIRST_PAGE: 1,

    // Languages
    LANGUAGE_EN: 'en',
    LANGUAGE_VN: 'vn',
    LANGUAGE_KR: 'kr',

    // Role
    ROLE_SUPPLIER: 0,
    ROLE_BUYER: 1,

    // Status (API response status) 
    API_MESSAGE_SUCCESS: "Success",

    // Http code
    HTTP_CODE_OK: 200,
    HTTP_CODE_CREATED: 201,
    HTTP_CODE_ACCEPTED: 202,
    HTTP_CODE_BAD_REQUEST: 400,
    HTTP_CODE_UNAUTHORIZED: 401,
    HTTP_CODE_FORBIDDEN: 403,
    HTTP_CODE_NOT_FOUND: 404,
    HTTP_CODE_METHOD_NOT_ALLOW: 405,
    HTTP_CODE_UNPROCESSABLE_ENTITY: 422,
    HTTP_CODE_INTERNAL_SERVER_ERROR: 500,

    // Resize image
    RESIZE_IMAGE_320x320: {
        width: 320,
        height: 320,
    },

    // Storage path
    STORAGE_UPLOADS_PATH: 'storage/uploads',
    STORAGE_LOG_PATH: 'storage/logs/node.log',
    
    MAX_FILE_SIZE_UPLOAD: 1000000, // 1000000 Bytes = 1 MB

    SORT_ASC: 1,
    SORT_DESC: -1,
}
