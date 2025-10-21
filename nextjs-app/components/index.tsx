import Image from 'next/image'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import React from 'react'
import { Chip, ChipSmall } from './ui/chip'



interface ObjectNodeProps {
  image?: string
  imageAlt?: string
  className?: ClassNameValue
  children: React.ReactNode
}

export const ObjectNode = ({
  image,
  imageAlt,
  className = '',
  children,
}: ObjectNodeProps) => (
  <div className={twMerge('flex flex-col gap-2', `${className}`)}>
    <Chip large className={'bg-geexGray p-4 mb-auto'}>
      {image ? <Image src={image} alt={imageAlt || ''} /> : <div>image</div>}
    </Chip>
    {children}
  </div>
)

interface ObjectNodeSmallProps {
  image?: string
  className?: string
  children: React.ReactNode
}

export const ObjectNodeSmall = ({
  image,
  className = '',
  children,
}: ObjectNodeSmallProps) => (
  <div className={twMerge('flex gap-5', `${className}`)}>
    <ChipSmall className={'bg-geexGray p-2'}>image</ChipSmall>
    {children}
  </div>
)
