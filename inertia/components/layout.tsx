import { Link, usePage } from '@inertiajs/react'

import type { ReactNode } from 'react'

export function Layout({ children }: { children: ReactNode }) {
  const { user }: any = usePage().props
  return (
    <>
      <header className="py-8 px-10">
        <nav className="flex flex-row justify-between items-center">
          <div>
            <Link href="/" className="text-xl primary-color">
              Coma News
            </Link>
          </div>
          {!user && (
            <div className="flex flex-row gap-4">
              <Link className=" hover:underline" href="/login">
                Login
              </Link>
              <Link className=" hover:underline" href="/register">
                Register
              </Link>
            </div>
          )}
          {user && (
            <>
              <div className="flex flex-col justify-end text-sm">
                <span>Hello {user.name}</span>
                <Link
                  className="flex justify-end hover:underline"
                  href="/logout"
                  method="post"
                  as="button"
                  type="button"
                >
                  Logout
                </Link>
              </div>
            </>
          )}
        </nav>
      </header>
      <hr />
      <div className="py-4">{children}</div>
    </>
  )
}
