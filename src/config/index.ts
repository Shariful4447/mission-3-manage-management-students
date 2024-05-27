import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT,
  db_url: process.env.DATABASE_URL,
  default_password: process.env.DEFAULT_PASSWORD,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
};
