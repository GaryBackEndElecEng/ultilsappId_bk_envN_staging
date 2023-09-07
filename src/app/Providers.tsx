"use client"
import React from 'react'
import {SessionProvider} from "next-auth/react";
import type {Session} from "next-auth";

type providerType={
    children?:React.ReactNode
}
const Providers = ({children}:providerType)=>{
    return <SessionProvider>{children}</SessionProvider>
}
export default Providers

type providerType2={
    Component:any,
    pageProps:{
        session:Session,
        children?:React.ReactNode
    }
    
}

// export default function Providers({
//     Component,
//   pageProps: { session,...pageProps },
// }:providerType2) {
//   return (
//     <SessionProvider session={session}>
//       <Component pageProps={pageProps.children}/>
//     </SessionProvider>
//   )
// }