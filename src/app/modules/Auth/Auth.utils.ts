import Jwt from 'jsonwebtoken';

const createToken = (
  JwtPayload: { userId: string; role: string },
  secreate: string,
  expiresIn: string,
) => {
  return Jwt.sign(JwtPayload, secreate, {
    expiresIn,
  });
};

export default createToken;
