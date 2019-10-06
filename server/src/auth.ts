import { sign } from "jsonwebtoken";
import { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } from "./constants";
import { User } from "./entity/User";

export const createTokens = (user: User) => {
  const accessToken = sign(
    { userId: user.id, count: user.count },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15s"
    }
  );
  const refreshToken = sign({ userId: user.id }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d"
  });

  return { accessToken, refreshToken };
};
