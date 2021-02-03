module.exports = {
  PORT: parseInt(process.env.PORT || 3300),
  SESSION_SECRET: process.env.SESSION_SECRET,
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  MONGO_DB_PATH: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}`
};