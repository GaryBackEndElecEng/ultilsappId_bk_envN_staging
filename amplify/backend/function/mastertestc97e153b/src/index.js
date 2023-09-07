/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	DATABASE_URL_heroku
	GOOGLE_client_ID
	GOOGLE_client_secret
	NEXTAUTH_SECRET
	CSRF_SECRET
	NEXTAUTH_CSRF
	adminpassword
	NEXT_PUBLIC_adminuser
	NEXT_PUBLIC_adminemail
	NEXT_PUBLIC_rawio
	NEXT_PUBLIC_finhubAPI
	NEXT_PUBLIC_rapidAip
	customKey
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};
