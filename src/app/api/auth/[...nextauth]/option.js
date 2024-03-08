import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectToDB from "@/lib/connect";
export const dynamic = "force-dynamic";
export const authOptions = {
  pages: {
    signIn: "/",
  },

  callbacks: {
    async signIn({ user }) {
      try {
        const db = await connectToDB();
        const collection = db.collection("sellers");

        const findUser = await collection.findOne({
          $or: [
            { email: user.email },
            { phoneNumber: parseInt(user.phoneNumber, 10) },
          ],
        });

        console.log(findUser, "find user");
        if (findUser) {
          return true;
        }
      } catch (error) {
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        console.log("use token", user);
        token.sub = user._id;
        token.picture = user.avatar;
        token.phoneNumber = user.phoneNumber;
        token.status = user.status;
        token.address = user.address;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",

      credentials: {
        identity: {
          label: "identity",
          type: "text",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { identity, password } = credentials;

        const db = await connectToDB();
        const collection = db.collection("sellers");
        const seller = await collection.findOne({
          $or: [{ email: identity }, { phoneNumber: parseInt(identity, 10) }],
        });

        if (!seller) {
          throw new Error("Invalied credentials");
        }
        const ispasswordOk = await compare(password, seller.password);
        if (!ispasswordOk) {
          throw new Error("Invalied credentials");
        }

        return seller;
      },
    }),
  ],
};
