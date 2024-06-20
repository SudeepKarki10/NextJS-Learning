import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import schema from "../schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
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
    const product = await prisma.product.findUnique({
      where: { id: parseInt(params.id) },
    });

    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 401 });

    const updatedProduct = {
      ...product,
      price: body.price,
      name: body.name,
    };

    const savedProduct = await prisma.product.update({
      where: { id: product.id },
      data: updatedProduct,
    });

    return NextResponse.json(savedProduct, { status: 200 });
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
  const product = await prisma.product.findUnique({
    where: { id: parseInt(params.id) },
  });

  console.log(product);

  if (!product) {
    return NextResponse.json({ error: "product not found" }, { status: 404 });
  }

  const deletedProduct = await prisma.product.delete({
    where: { id: product.id },
  });

  return NextResponse.json(deletedProduct, { status: 200 });
}
