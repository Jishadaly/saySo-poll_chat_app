import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {


  const body = await req.json()
  const { email, name, picture }: { email: string, name: string, picture: string } = body;

  try {
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json('User already registerd.', { status: 201 })
    }

    const savedUser = new User({
      username: name,
      email: email,
      profile: picture,
    });

    await savedUser.save();
    return NextResponse.json('User registation completed', { status: 200 });

  } catch (error) {

    return NextResponse.json(error, { status: 400 });
  }
}