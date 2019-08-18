import { User } from "./entity/User";
import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "hi",
    me: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      return User.findOne(req.session.userId);
    }
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      User.create({
        email,
        password: hashedPassword
      }).save();
      return true;
    },
    login: async (_, { email, password }, { req }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }
      const valid = await bcrypt.compare(password, user!.password);
      if (!valid) {
        return null;
      }

      // save user id to cookie
      req.session.userId = user.id;

      return user;
    }
  }
};
