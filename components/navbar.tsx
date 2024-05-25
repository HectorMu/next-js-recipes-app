'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenu
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { Input } from './ui/input'
import { useState } from 'react'
import {
  FileSpreadsheet,
  HomeIcon,
  LineChartIcon,
  MenuIcon,
  MountainIcon,
  PackageIcon,
  Sheet,
  ShoppingCartIcon,
  UsersIcon
} from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'

export default function Navbar({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(true)
  const { data } = useSession()
  return (
    <>
      <header className="flex fixed w-full bg-white h-14 items-center justify-between px-4 md:px-6 border-b bg-gray-100/40 dark:bg-gray-800/40">
        <Link className="flex items-center gap-2" href="#">
          <MountainIcon className="h-6 w-6" />
          <span className="font-semibold">Acme Inc</span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Input placeholder="Search recipes..." />
        </nav>
        <div className="flex items-center gap-3">
          {data?.user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <img
                    alt="Avatar"
                    className="rounded-full"
                    height="32"
                    src={`https://ui-avatars.com/api/?name=${String(
                      data?.user?.userName ?? ''
                    )}`}
                    style={{
                      aspectRatio: '32/32',
                      objectFit: 'cover'
                    }}
                    width="32"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="#">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="#">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <button onClick={() => signOut()}>Log out</button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button
            size={'xs'}
            className="rounded-full p-[3px] "
            onClick={() => setActive(!active)}
          >
            <MenuIcon />
          </Button>
        </div>
      </header>
      <div id="wrapper" className="flex min-h-screen">
        <aside
          className={`border-r h-[calc(100%-56px)] md:h-[calc(100vh-56px)] fixed md:sticky md:top-[56px] top-0 bg-white   mt-[56px] dark:bg-gray-800/40 w-64 shrink-0 transition-all ${
            active ? '-ml-0' : '-ml-64'
          }`}
        >
          <div className="flex h-full max-h-screen flex-col gap-2 ">
            <nav className="flex-1 overflow-auto py-2 ">
              <div className="grid gap-1 px-4 text-sm font-medium ">
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/dashboard"
                >
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="/recipes"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  My recipes
                </Link>

                {/* <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <ShoppingCartIcon className="h-4 w-4" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg bg-gray-100 px-3 py-2 text-gray-900 transition-all hover:text-gray-900 dark:bg-gray-800 dark:text-gray-50 dark:hover:text-gray-50"
                  href="#"
                >
                  <PackageIcon className="h-4 w-4" />
                  Products
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <UsersIcon className="h-4 w-4" />
                  Customers
                </Link>
                <Link
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  href="#"
                >
                  <LineChartIcon className="h-4 w-4" />
                  Analytics
                </Link> */}
              </div>
            </nav>
          </div>
        </aside>
        <main
          id="content"
          className="flex-1 mt-[54px] max-w-full px-3 text-balance lg:px-0 lg:max-w-[60%] mx-auto py-5"
        >
          {children}
        </main>
      </div>
    </>
  )
}
