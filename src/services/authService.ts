import jwt from 'jsonwebtoken';
import { HTTPError } from '../errors/HTTPError';

const JWT_SECRET = process.env.JWT_SECRET!;

type JwtPayload = {
  id: number;
  role: string;
};

export class AuthService {
    createToken(data: JwtPayload) {
        return jwt.sign(data, JWT_SECRET, { expiresIn: '1h' });
    }

    decodeToken(token: string) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
            return decoded;
        } catch (error) {
            throw new HTTPError('Token inválido o expirado', 401);
        }
    }
}
