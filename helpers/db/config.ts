export default () => ({
  portApp: process.env.PORT_APLICATION || 3000,
  secretKey: process.env.SECRET_KEY,
  durationToken: process.env.DURATION_TOKEN,
  salt: process.env.PASS_SALT,
  database: {
    host: process.env.DATA_BASE_HOST,
    dbName: process.env.DATA_BASE,
    user: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASSWORD,
    port: parseInt(process.env.PORT, 10)
  },
});