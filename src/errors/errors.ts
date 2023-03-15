export const errors = {
    // 400
    BAD_REQUEST_WRONG_PARAMS: {
        message: 'Bad request wrong params',
        code: 4000
    },
    BAD_REQUEST_USER_ALREADY_EXIST: {
        message: 'User already exist',
        code: 4001
    },

    // 401
    UNAUTHORIZED_WRONG_CREDENTIALS: {
        code: 4011,
        message: 'Wrong login or password'
    },

    // 403
    CORS_NOT_ALLOWED: {
        message: 'Cors not allowed',
        code: 4031
    },
    FORBIDDEN_NO_PERMISSION: {
        message: 'You don\'t have permission',
        code: 4032
    },

    // 404
    NOT_FOUND_ROUTE: {
        message: 'API route not found',
        code: 4041
    },
    NOT_FOUND_ENTITY_NOT_PRESENT: {
        message: 'Not found',
        code: 4042
    },

    // 500
    SERVER_UNKNOWN_ERROR: {
        message: 'Unknown error',
        code: 5001
    }
};
