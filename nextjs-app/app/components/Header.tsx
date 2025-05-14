'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import SearchBox from '@/app/components/SearchBox'
import {authClient} from "@/lib/auth-client";
import { toast } from 'sonner';

export default function Navbar() {
  const router = useRouter()
  const session = authClient.useSession()
  const { data } = session

  const isLoggedIn = data && data.user

  const authAction = isLoggedIn ? 'Log Out' : 'Log In'

  const handleAuthAction = async () => {
    if (isLoggedIn) {
      try {
        await authClient.signOut()
        toast.success('Successfully logged out')
        router.refresh()
      } catch (error) {
        console.error('Logout error:', error)
        toast.error('Failed to log out')
      }
    } else {
      router.push('/sign-in')
    }
  }

  // todo: use sanity generated types
  // const menuItems = data?.menuItems || ([] as any[])
  return (
    <div className={'bg-white'}>
      <div className="m-auto sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white py-5 px-4 md:px-16 lg:px-40 max-w-[1600px] justify-between">
        <Link href="/nextjs-app/public">
          <Image
            src={'/geex_logo_500px.webp'}
            width={170}
            height={90}
            alt={'GEEX Glass Education Exchange'}
          />
        </Link>
        <div className={'flex gap-4 text-geexGrayDark'}>
          <SearchBox />
          <div
            className={'flex flex-col justify-between font-bold'}
          >
            <Image
              className={'m-auto h-12'}
              width={40}
              height={60}
              src={'/icons/login.svg'}
              alt={authAction}
            />
            <button
              className="text-sm text-center uppercase hidden md:inline"
              onClick={handleAuthAction}
            >{authAction}</button>
          </div>
          <div className={'flex flex-col justify-between font-bold'}>
            <Image
              className={'m-auto h-12'}
              height={60}
              width={50}
              src={'/icons/hamburger.svg'}
              alt=""
            />
            <span className="text-sm text-center uppercase hidden md:inline">Menu</span>
          </div>
        </div>
        {/*{menuItems &&*/}
        {/*  menuItems.map((menuItem: any, key: number) => {*/}
        {/*    const href = linkResolver(menuItem.slug)*/}
        {/*    if (!href) {*/}
        {/*      return null*/}
        {/*    }*/}
        {/*    return (*/}
        {/*      <Link*/}
        {/*        key={key}*/}
        {/*        className={`text-lg hover:text-black md:text-xl ${*/}
        {/*          menuItem?._type === 'home'*/}
        {/*            ? 'font-extrabold text-black'*/}
        {/*            : 'text-gray-600'*/}
        {/*        }`}*/}
        {/*        href={href}*/}
        {/*      >*/}
        {/*        {menuItem.title}*/}
        {/*      </Link>*/}
        {/*    )*/}
        {/*  })}*/}
      </div>
    </div>
  )
}
