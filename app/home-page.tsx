import Link from 'next/link';
import { supabaseServer } from './lib/supabaseServer';

export default async function HomePage() {
  const supabase = supabaseServer();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main style={{ padding: 24 }}>
      <h1>Canteen Ordering</h1>
      {user ? (
        <>
          <p>Signed in as: {user.email}</p>
          <form action="/auth/signout" method="post">
            <button type="submit">Sign out</button>
          </form>
          <p>
            <Link href="/orders">Go to Orders</Link>
          </p>
        </>
      ) : (
        <p>
          <Link href="/auth">Sign in</Link>
        </p>
      )}
    </main>
  );
}
