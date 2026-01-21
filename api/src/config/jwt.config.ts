import { JwtModuleOptions } from '@nestjs/jwt';
import { JWT_EXPIRES_IN, JWT_SECRET } from './environments';

export const jwtConfig: JwtModuleOptions = {
  secret: JWT_SECRET,
  signOptions: { expiresIn: JWT_EXPIRES_IN },
};
