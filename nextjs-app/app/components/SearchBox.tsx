'use client'
import Image from 'next/image'
import { useState } from 'react'

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className={'relative'}>
      <input
        className={`border border-4 border-geexGray p-3 px-4 font-bold h-full hidden md:block`}
        style={{ borderRadius: '20px' }}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearch}
      />
      <button
        className={`bg-white border-4 p-2 font-bold h-full md:hidden rounded-3xl`}
      >
        <Image src={'/icons/search.svg'} width={30} height={30} alt={''} />
      </button>
      <div className={'absolute top-3.5 right-4 hidden md:block'}>
        <Image src={'/icons/search.svg'} width={40} height={40} alt={''} />
      </div>
    </div>
  )
}

export default SearchBox
