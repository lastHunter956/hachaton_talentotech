import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import Clients from "../../../../models/Client";
import mongo from "../../../../services/MongoDB";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Lucas@hotmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await mongo();
        const client = await Clients.findOne({ email: credentials?.email.toLowerCase() });

        if (!client) {
          throw new Error("Email no existente");
        }

        const verificacionPassword = await bcrypt.compare(credentials.password, client.password);
        if (!verificacionPassword) {
          throw new Error("Contraseña incorrecta");
        }
        return client;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        await mongo();

        let client = await Clients.findOne({ email: profile.email });

        if (!client) {
          client = new Clients({
            email: profile.email.toLowerCase(),
            name: profile.name,
            image: profile.picture, 
            googleId: profile.sub 
          });
          await client.save(); 
        }

        user._id = client._id; 
      }
      return true; 
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.saludo = "Hola Developer Beginner";
      }
      return session;
    },

    async redirect({ url, baseUrl }) {
      return `${process.env.REDIRECCION_LOGUEO}`;
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/login"
  }
});

export { handler as GET, handler as POST };
