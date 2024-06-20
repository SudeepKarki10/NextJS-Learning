import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 401 });

  return NextResponse.json(user);
}

interface Props {
  params: { id: number };
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const validation = schema.safeParse(body);
    if (!validation.success) {
      console.error("Validation Error:", validation.error.errors);
      return NextResponse.json(validation.error.errors, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 401 });

    const updatedUser = {
      ...user,
      email: body.email,
      name: body.name,
    };

    const savedUser = await prisma.user.update({
      where: { id: user.id },
      data: updatedUser,
    });

    return NextResponse.json(savedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: { error },
      },
      { status: 402 }
    );
  }
  // if (!user) {
  //   console.error("User Not Found:", params.id);
  //   return NextResponse.json(
  //     { message: "User to be edited doesn't exist" },
  //     { status: 404 }
  //   );
  // }

  // if (user) return NextResponse.json(user, { status: 200 });
  // return NextResponse.json({ error: "Error found" }, { status: 200 });
  // const updatedUser = await prisma.user.update({
  //   where: { id: params.id },
  //   data: {
  //     name: body.name,
  //     email: body.email,
  //   },
  // });

  // console.log("Updated User:", updatedUser);
  // return NextResponse.json(updatedUser, { status: 202 });
  // } catch (error) {
  //   console.error("Error in PUT request:", error);
  //   return NextResponse.json(
  //     { error: "Internal Server Error" },
  //     { status: 500 }
  //   );
  // }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  console.log(user);

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  });

  return NextResponse.json(deletedUser, { status: 200 });
}
