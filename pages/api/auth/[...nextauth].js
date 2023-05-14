// Models
import User from "@/models/User";
// Utils
import ConnectDb from "@/utils/ConnectDb";
import { verifyPassword } from "@/utils/functions";
// Next Auth
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        try {
          ConnectDb();
          console.log("Connect to DB");
        } catch (err) {
          throw new Error("Failed to connect DB");
        }
        if (req.method !== "POST") {
          throw new Error("Bad request");
        }
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("Invalid Data");
        }
        const existedUser = await User.findOne({ email });
        if (!existedUser) {
          throw new Error("You are not login");
        }
        if (!(await verifyPassword(password, existedUser.password))) {
          throw new Error("Email or Password wrong");
        }
        return { email };
      },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET_KEY,
};
export default NextAuth(authOption);
