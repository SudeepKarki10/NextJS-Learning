import { NextRequest, NextResponse } from "next/server";
import schema from "../../api/products/schema";

// The handler for GET requests
export function GET(req: NextRequest) {
  return NextResponse.json(
    [
      {
        id: 1,
        name: "milk",
        price: 2.5,
      },
      {
        id: 2,
        name: "Bread",
        price: 3.5,
      },
    ],
    { status: 200 }
  );
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    console.log(validation.error.errors);
    return NextResponse.json(validation.error.errors), { status: 400 };
  }

  return NextResponse.json(
    { id: body.id, name: body.name, price: body.price },
    { status: 200 }
  );
}
