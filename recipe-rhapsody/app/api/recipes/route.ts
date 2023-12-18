import { getRecipes } from "../../../lib/spoonacular";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") as string;

    console.log('Query:', query);

    const data = await getRecipes(query);

    return NextResponse.json({ data });
}
