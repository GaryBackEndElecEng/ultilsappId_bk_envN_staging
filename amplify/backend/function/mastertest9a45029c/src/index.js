/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	DATABASE_URL_heroku
	GOOGLE_client_ID
	GOOGLE_client_secret
	GITHUB_SECRET
	GITHUB_ID
	CSRF_SECRET
	NEXTAUTH_CSRF
	adminpassword
	NEXT_PUBLIC_adminuser
	NEXT_PUBLIC_adminemail
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
