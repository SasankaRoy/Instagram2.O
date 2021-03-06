import { Session } from "inspector";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// import EmailProvider from "next-auth/providers/email";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      
    }),
    // ...add more providers here
  ],
  // providers: [
  //   EmailProvider({
  //     server: {
  //       host: process.env.EMAIL_SERVER_HOST,
  //       port: process.env.EMAIL_SERVER_PORT,

  //       auth: {
  //         user: process.env.EMAIL_SERVER_USER,
  //         pass: process.env.EMAIL_SERVER_PASSWORD,
  //       },
  //     },
  //     from: process.env.EMAIL_FROM,
  //   }),
  //   // ...add more providers here
  // ],

  pages: {
    signIn: "/auth/signin",
  },
  callbacks:{
    async session({session,token,user}){
      session.user.Uid = token.sub;
      return session;
    },
  },
  secret:process.env.SECRET
});
