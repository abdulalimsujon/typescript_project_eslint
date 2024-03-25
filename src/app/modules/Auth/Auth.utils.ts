import Jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
  JwtPayload: { userId: string; role: string },
  secreate: string,
  expiresIn: string,
) => {
  return Jwt.sign(JwtPayload, secreate, {
    expiresIn,
  });
};

export const verifyToken = (token: string, secreate: string) => {
  const decode = Jwt.verify(token, secreate) as JwtPayload;

  return decode;
};
