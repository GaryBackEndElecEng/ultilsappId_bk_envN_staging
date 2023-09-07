import type { NextApiRequest, NextApiResponse } from "next";
import {type NextAuthOptions} from "next-auth";
import NextAuth from "next-auth";
import authOptions from "@context/options";


export default async function auth(req:NextApiRequest,res:NextApiResponse){
    // console.log(req.body.email)//does only on callback
    return await NextAuth(req,res,authOptions)
}


// const handler = NextAuth(authOptions)
// export  {handler as GET,handler as POST };