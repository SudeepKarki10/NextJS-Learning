import { NextRequest, NextResponse } from "next/server";
import schema from "../../api/products/schema";
import prisma from "@/prisma/client";

// The handler for GET requests
export async function GET(req: NextRequest) {
  const users = await prisma.product.findMany();
  console.log(users);

  if (!users) {
    return NextResponse.json({ message: "No products found" }, { status: 402 });
  }
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const validation = schema.safeParse(body);
    if (!validation.success) {
      console.error("Validation Error:", validation.error.errors);
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    const existingProduct = await prisma.product.findFirst({
      where: { name: body.name },
    });

    if (existingProduct) {
      return NextResponse.json(
        { message: "Product already exists" },
        { status: 400 }
      );
    }

    const newProduct = {
      price: body.price,
      name: body.name,
    };

    const createdProduct = await prisma.product.create({
      data: newProduct,
    });

    return NextResponse.json(createdProduct, { status: 200 }); // Created
  } catch (error) {
    console.error("Error creating Product:", error);
    return NextResponse.json(
      { error: "Error creating Product" },
      { status: 500 }
    );
  }
}
