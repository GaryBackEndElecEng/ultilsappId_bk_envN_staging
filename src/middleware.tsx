export {default} from "next-auth/middleware";//This protects the entire app

export const config={matcher:[
    "/dashboard",
    "/admin:path*",
    "/ultils/currency",
    "/ultils/techtool",
    "/ultils/scraper",
]}
