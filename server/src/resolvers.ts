import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { createTokens } from "./auth";
import { User } from "./entity/User";

export const resolvers: IResolvers = {
  Query: {
    me: (_, __, { req }) => {
      // get userId from JWT
      if (!req.userId) {
        return null;
      }

      return User.findOne(req.userId);
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword
      }).save();

      return true;
    },
    login: async (_, { email, password }, { res }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return null;
      }

      const { accessToken, refreshToken } = createTokens(user);

      console.log(accessToken, refreshToken);

      res.cookie("refresh-token", refreshToken, { expire: 60 * 60 * 24 * 7 });
      res.cookie("access-token", accessToken, { expire: 60 * 15 });

      return user;
    },
    invalidateTokens: async (_, __, { req }) => {
      if (!req.userId) {
        return false;
      }
      const user = await User.findOne(req.userId);
      if (!user) {
        return false;
      }
      user.count += 1;
      user.save();

      // res.clearCookie('access-token')

      return true;
    }
  }
};
