'use client'

import Image from 'next/image'

import SearchBox from './SearchBox'
import {authClient} from "@/app/lib/auth-client";

export default function Navbar() {

  const session = authClient.useSession()
  const { data } = session

  const isLoggedIn = data && data.user

  const authAction = isLoggedIn ? 'Log Out' : 'Log In'

  // todo: use sanity generated types
  // const menuItems = data?.menuItems || ([] as any[])
  return (
    <div className={'bg-white'}>
      <div className="m-auto sticky top-0 z-10 flex flex-wrap items-center gap-x-5 bg-white py-5 px-4 md:px-16 lg:px-40 max-w-[1600px] justify-between">
        <Image
          src={'/geex_logo_500px.webp'}
          width={170}
          height={90}
          alt={'GEEX Glass Education Exchange'}
        />
        <div className={'flex gap-4 text-geexGrayDark'}>
          <SearchBox />
          <div
            className={
              'flex flex-col justify-between font-bold md:block'
            }
          >
            <Image
              className={'m-auto'}
              width={40}
              height={60}
              src={'/login.svg'}
              alt=""
            />
            <span className="uppercase hidden md:inline">{authAction}</span>
          </div>
          <div className={'flex flex-col justify-between font-bold'}>
            <Image
              className={'m-auto'}
              width={50}
              height={60}
              src={'/hamburger.svg'}
              alt=""
            />
            <span className="uppercase hidden md:inline">Menu</span>
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
