export default () => ({
  isProduction: process.env.NODE_ENV.toLowerCase().includes('prod'),
  isHTTPS: process.env.HTTPS_ENABLED === 'true',
  database: {
    host: process.env.MONGO_DB,
    uri: process.env.MONGO_URI,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
  },
  salt_length: process.env.SALT_LENGTH,
  session_secret: process.env.SESSION_SECRET,
  minio: {
    domain: process.env.MINIO_DOMAIN,
    port: process.env.MINIO_PORT,
    access_key: process.env.MINIO_ROOT_USER,
    secret_key: process.env.MINIO_ROOT_PASSWORD,
    bucket: process.env.MINIO_DEFAULT_BUCKETS,
  },
  frontend: parseInt(process.env.CLIENT_PORT),
});
