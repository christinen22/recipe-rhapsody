/* import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function DELETE(_, { params }) {
  const id = params.id

  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.from('tickets')
    .delete()
    .eq('id', id)

  return NextResponse.json({ error })
} */

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: Request) {
  const saved = await request.json();

  // get supabase instance
  const supabase = createRouteHandlerClient({ cookies });

  // get current user session
  const { data: { session } } = await supabase.auth.getSession();

  // insert the data
  const { data, error } = await supabase.from('recipes')
    .insert({
      ...saved,
      user_email: session?.user.email,
    });

  if (error) {
    console.error('Error adding recipe to Supabase:', error);
    return NextResponse.json({ error: 'Could not add the new recipe.' });
  }

  console.log('Recipe added successfully:', data);

  return NextResponse.json({ data });
}
