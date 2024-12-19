import {
  getSignInUrl,
 
  
 
  signOut,
 
  withAuth,
} from '@workos-inc/authkit-nextjs';

import Link from 'next/link';

export default async function Header() {
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  
  return (
    <header>
      
      <div className="container flex items-center justify-between  mx-auto my-4">
        <Link href={'/'} className="font-bold text-xl">Job Board</Link>
        <nav className="flex gap-2 ">
          {!user && (
            <Link className="bg-gray-200 rounded-md p-2 px-4 transition-transform duration-300 ease-in-out hover:scale-105" href={signInUrl}>Login</Link>
          )}
          {
            user && (
              <form action={async () => {
                'use server';
                await signOut();
              }}>
                <button type="submit" className="bg-gray-200 rounded-md p-2 px-4 transition-transform duration-300 ease-in-out hover:scale-105" >
                Logout, {user.firstName}
              </button>
              </form>
              
            )
          }
          
          <Link className="bg-blue-600 text-white rounded-md p-2 px-4 transition-transform duration-300 ease-in-out hover:scale-105" href={'/new-listing'}>Post a job</Link>
          {
            user && (
              
              <Link className="bg-gray-800 text-white rounded-md p-2 px-4 transition-transform duration-300 ease-in-out hover:scale-105" href={'/companies'}>Your Jobs</Link>
              
              
            )
          }
        </nav>
      </div>

    </header>
  )

}