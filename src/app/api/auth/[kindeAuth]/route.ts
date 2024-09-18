// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextRequest, NextResponse } from "next/server";


// export async function GET(req:NextRequest , {params}:any){
//     const endpoint = params.kindeAuth
//     return handleAuth(req , endpoint)
// }  

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    const endpoint = params.kindeAuth;
    console.log("API Route Called with Endpoint:", endpoint);

    try {
        const response = await handleAuth(req, endpoint);
        console.log("handleAuth Response:", response);
        return response;
    } catch (error) {
        console.error("Error in handleAuth:", error);
        return new Response(JSON.stringify({ error: "Authentication failed" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
