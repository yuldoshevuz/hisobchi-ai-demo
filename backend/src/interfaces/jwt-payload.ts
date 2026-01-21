import { JwtPayload } from 'jsonwebtoken';
import { IUser } from 'src/interfaces/user';

export interface IJwtPayload extends JwtPayload {
  user: IUser;
}
