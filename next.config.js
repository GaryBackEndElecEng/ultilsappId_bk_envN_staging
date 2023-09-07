/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions:true,
        serverComponentsExternalPackages:["@prisma/client","bcryptjs"],
      },
      env:{
        DATABASE_URL_heroku:process.env.DATABASE_URL_heroku,
        DATABASE_URL_local:process.env.DATABASE_URL_local,
        GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
        adminpassword:process.env.adminpassword,
        CSRF_SECRET:process.env.CSRF_SECRET,
        NEXTAUTH_SECRET:process.env.NEXTAUTH_SECRET,
        NEXT_PUBLIC_aws:process.env.NEXT_PUBLIC_aws,
        NEXT_PUBLIC_aws_static:process.env.NEXT_PUBLIC_aws_static
       },
       async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "newmasterconnect.herokuapp.com,www.masterconnect.ca,ww.master-connect.ca,www.garymasterconnect.com,cdn.jsdelivr.net,compute-1.amazonaws.com,master-sale.herokuapp.com" },
                    
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version,XSRF-TOKEN" },
                ]
            },
            
            
            {
              // matching all API routes
              source: "/static/masterultils/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "false" },
                  { key: "Access-Control-Allow-Origin", value: "new-master.s3.ca-central-1.amazonaws.com" },
                  
                  { key: "Access-Control-Allow-Methods", value: "GET" },
                  { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
              ]
          },
        ]
      },
    images: {
          unoptimized:true,
          remotePatterns: [
            {
              protocol: 'https',
              hostname: 'new-master.s3.ca-central-1.amazonaws.com',
              port: '',
              // pathname: '/account123/**',
            },
            {
              protocol: 'http',
              hostname: 'localhost',
              port: '3000',
              // pathname: '/account123/**',
            },
            {
              protocol: 'https',
              hostname: 'masterultils.com',
              port: '',
              // pathname: '/account123/**',
            },
            {
              protocol: 'https',
              hostname: 'picsum.photos/200',
              port: '',
              // pathname: '/account123/**',
            },
            {
              protocol: 'https',
              hostname: 'cdn.weatherapi.com',
              port: '',
              // pathname: '/account123/**',
            },
            {
              protocol: 'https',
              hostname: 'webtoons-static.pstatic.net',
              port: '',
              // pathname: '/account123/**',
            },
            {
              protocol: 'https',
              hostname: 'media.rawg.io',
              port: '',
              // pathname: '/account123/**',
            },
          ],
      },
}

module.exports = nextConfig
