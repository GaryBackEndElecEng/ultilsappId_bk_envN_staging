import { NextResponse} from "next/server";

export function middleware(){
    //retrieves the current response
    const res=NextResponse.next();
    const req=NextResponse.next();
    //add the CORS headers to the response
    res.headers.append('Access-Control-Allow-Credentials', "true")
    res.headers.append('Access-Control-Allow-Origin', 'localhost:3000') // replace this your actual origin
    res.headers.append('Access-Control-Allow-Methods', 'GET,POST')
    res.headers.append(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    return res
}
//specify teh path regex to apply the middleware to what path

export const config={
    matcher:"/static/masterultils/:path*"
}