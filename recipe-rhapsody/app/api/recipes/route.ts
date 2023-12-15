import { getRecipes } from "../../service/spoonacular";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") as string;

    const data = await getRecipes(query);

    return NextResponse.json({ data });
}