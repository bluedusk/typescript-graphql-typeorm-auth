import { User } from "./entity/User";
import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import { stripe } from "./stripe";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "hi",
    me: (_, __, { req }) => {
      console.log(req.session.userId);
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
    },
    createSubscription: async (_, args, { req }) => {
      console.log(args);
      if (!req.session || !req.session.userId) {
        throw new Error("not authenticated");
      }
      const user = await User.findOne(req.session.userId);
      if (!user) {
        throw new Error();
      }
      const customer = await stripe.customers.create({
        email: user.email,
        source: args.source,
        plan: process.env.PLAN
      });
      user.stripeId = customer.id;
      user.type = "paid";
      await user.save();

      return user;
    }
  }
};
