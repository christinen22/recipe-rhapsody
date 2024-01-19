import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { toast } from "react-toastify";


export async function POST(request: Request) {
    const saved = await request.json();

    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies });

    // get current user session
    const { data: { session } } = await supabase.auth.getSession();

    // check if the recipe is already saved
    const existingRecipe = await supabase
        .from('recipes')
        .select('*')
        .eq('user_email', session?.user.email)
        .eq('recipe_id', saved.recipe_id)
        .single();

    if (existingRecipe.data) {
        // Recipe already saved
        toast.success('Recipe is already saved:', existingRecipe.data);
        return NextResponse.json({ error: 'Recipe is already saved.' });
    }

    // insert the data
    const { data, error } = await supabase.from('recipes')
        .insert({
            ...saved,
            user_email: session?.user.email,
        });

    if (error) {
        toast.error('Error adding recipe to Supabase');
        return NextResponse.json({ error: 'Could not add the new recipe.' });
    }

    return NextResponse.json({ data });
}

export async function GET(request: Request) {

    // get supabase instance
    const supabase = createRouteHandlerClient({ cookies });

    // get current user session
    const { data: { session } } = await supabase.auth.getSession();

    // fetch saved recipes for the current user
    const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('user_email', session?.user.email);

    if (error) {
        return NextResponse.json({ error: 'Failed to fetch saved recipes.' });
    }
}