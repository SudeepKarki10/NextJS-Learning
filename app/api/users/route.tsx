import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

// export async function GET(request: NextRequest) {
//   try {
//     const users = await prisma.user.findMany();

//     if (!users || users.length === 0) {
//       return NextResponse.json({ error: "No users found" }, { status: 404 });
//     }

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany();

  if (!users || users.length === 0) {
    return NextResponse.json({ error: "No users found" }, { status: 404 });
  }
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const userExist = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (userExist) {
    return NextResponse.json(
      { Message: "User with this email already exist!" },
      { status: 402 }
    );
  }

  const user = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
    },
  });

  return NextResponse.json(user, { status: 201 });
}
