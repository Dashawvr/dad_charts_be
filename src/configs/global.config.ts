export const config = {
    SERVER_PORT: process.env.SERVER_PORT || '3000',
    DB_PORT: process.env.DB_PORT || '5432',
    HOST: process.env.HOST || 'http://localhost',
    FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3002',

    MORGAN_FORMAT: process.env.MORGAN_FORMAT || 'dev',

    DATABASE_USER: process.env.POSTGRES_USER,
    DATABASE_PASSWORD: process.env.POSTGRES_PASSWORD,
    DATABASE_NAME: process.env.DB_NAME,
    DATABASE_HOST: process.env.POSTGRES_HOST || 'localhost',
    DATABASE_DIALECT: process.env.DATABASE_DIALECT || 'postgres',

    EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
    EMAIL_USER: process.env.EMAIL_USER || 'test',
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'test'
};
