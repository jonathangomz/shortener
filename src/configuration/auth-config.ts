import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
  secret: process.env.SECRET,
  expirationTime: process.env.EXPIRATION_TIME,
  saltOrRounds: process.env.SALT_OR_ROUNDS,
}));