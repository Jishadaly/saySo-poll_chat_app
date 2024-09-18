// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// // export const GET = (req: NextRequest , res:NextResponse) => handleAuth()(req,res);
// export async function GET(req:NextRequest , {params}:any){
//     const endpoint = params.kindeAuth
//     return handleAuth(req , endpoint)
// }  

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const response = await handleAuth()(req, NextResponse);
  return response;
}
