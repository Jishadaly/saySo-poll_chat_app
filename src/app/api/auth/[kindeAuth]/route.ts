// import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
// import { NextRequest, NextResponse } from "next/server";

// // export const GET = (req: NextRequest , res:NextResponse) => handleAuth()(req,res);
// export async function GET(req:NextRequest , {params}:any){
//     const endpoint = params.kindeAuth
//     return handleAuth(req , endpoint)
// }  

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export default function handler(req: any, res: any) {
  return handleAuth()(req, res);
}
