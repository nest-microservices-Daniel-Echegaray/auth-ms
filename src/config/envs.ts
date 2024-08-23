import 'dotenv/config';

import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string;
  JWT_SECRET: string;
  DATABASE_URL: string;
}

const envSchema = joi
  .object<EnvVars>({
    PORT: joi.number().required(),
    NATS_SERVERS: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
const envVars: EnvVars = value;
export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  jwtSecret: envVars.JWT_SECRET,
  databaseUrl: envVars.DATABASE_URL,
};
