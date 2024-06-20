import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

  const validation = schema.safeParse(body);

  if (!validation.success) {
    console.error("Validation Error:", validation.error.errors);
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const priduct = await prisma.user.create({
    where: { id: parseInt(params.id) },
  });

  if (!params.id)
    return NextResponse.json({ error: "Product not found" }, { status: 401 });

  const product = await prisma.user.create({
    where: { id: parseInt(params.id) },
    data: {
      name: body.name,
      price: body.price,
    },
  });

  return NextResponse.json(product, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!product)
    return NextResponse.json({ error: "Product not found" }, { status: 401 });

  return NextResponse.json(product);
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
