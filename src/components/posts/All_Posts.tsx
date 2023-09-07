"use client"
import React from 'react';
import CancelIcon from '@mui/icons-material/Cancel';
import { GeneralContext } from '../context/GeneralContextProvider';
import {GeneralProviderNoAccount} from "@component/context/GeneralContext";
import Link from "next/link";
import type { msgType,PostDataType,userType,DataType,userAccountType } from "@component/context/type";
import {getAccount} from "@component/context/ultils";
import AllSubPosts from "@/components/posts/AllSubPosts";
import {  signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { Inter, Montserrat, Chela_One } from 'next/font/google';
import httpUrl from "@component/context/httpUrl";

const chela = Chela_One({weight:"400",subsets:["latin"]});

type mainAllpostsType={
    imgSrc:string | null,
    getAccount:userAccountType | undefined,
    // isCSRF:boolean,

}

const All_Posts = ({imgSrc,getAccount}:mainAllpostsType) => {
    const url=httpUrl();
    const {setIsSignin,session,genMsg,setGenMsg,msg, setMsg,userId,setUserId,setAccount,allPosts,} = React.useContext(GeneralContext);

    React.useMemo(()=>{
        
        if(getAccount && getAccount.loaded && getAccount.data) {
            setAccount(getAccount);
            setUserId(getAccount.data.id);
            setIsSignin(true);
        }
       
    },[getAccount,setAccount,setUserId,setIsSignin]);

    
    

    return (
        <GeneralProviderNoAccount>
        <div className={`${chela.className} flex flex-col justify-center items-center w-full dark:bg-black dark:text-white text-site_blue_dark bg-orange md:bg-[whitesmoke]` }>
            <div className="flex flex-col  justify-center items-center gap-3">
                { imgSrc && <Image src={imgSrc} height={75} width={75} alt="www.masterconnect.ca" className="rounded-[50%]"/>}
                <div className="text-center text-5xl my-5">Community</div>
                <div className="text-center text-2xl my-2">comments</div>
                <div className="text-center text-2xl ">Q && A</div>
                { 
                genMsg.loaded ? 
                <div className="text-center text-xl text-black dark:text-white my-2 underline underline-offset-4">{genMsg.msg}</div>
                :
                <div className="text-center text-xl text-orange my-2 underline underline-offset-4">{genMsg.msg}</div>
                }
               
            </div>
            
            {msg.loaded ? 
            <div className="text-center text-lg my-5 text-blue-800">{msg.msg}</div>
            :
            <div className="text-center text-lg my-5 text-red-800">{msg.msg}</div>
            }
           
             <AllSubPosts
             chela={chela.className}
             userId={userId}
             />
            
        </div>
        </GeneralProviderNoAccount>
    )
}

export default All_Posts