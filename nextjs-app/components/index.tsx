import Image from 'next/image'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import React from 'react'

export const Row = ({
  justify = 'justify-between',
  children,
}: {
  justify?: string
  children: React.ReactNode
}) => (
  <div className={`flex ${justify} gap-4 flex-wrap md:flex-nowrap`}>
    {children}
  </div>
)

export const Card = ({
  className = '',
  fullHeight = true,
  children,
}: {
  className?: string
  fullHeight?: boolean
  children: React.ReactNode
}) => (
  <div
    style={{ borderRadius: '20px' }}
    className={twMerge(
      `bg-white p-4 md:p-5 ${fullHeight ? 'h-full' : ''} gap-4 flex flex-col`,
      className,
    )}
  >
    {children}
  </div>
)

export const Chip = ({
  className = '',
  large = false,
  children,
}: {
  className?: string
  large?: boolean
  children: React.ReactNode
}) => (
  <div
    className={twMerge(
      'p-3 rounded-[40px] aspect-square object-fill',
      className,
    )}
  >
    {children}
  </div>
)

export const ChipSmall = ({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div
    style={{ minWidth: '75px', width: '75px', height: '75px' }}
    className={twMerge('p-3 rounded-lg aspect-square', className)}
  >
    {children}
  </div>
)

export const TwoColumn = ({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={twMerge(
      'grid grid-cols-1 gap-5 grid-flow-row md:grid-flow-col pb-2 md:grid-cols-2',
      className,
    )}
  >
    {children}
  </div>
)

export const ThreeColumn = ({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div
    className={twMerge(
      'grid grid-flow-row sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:grid-flow-col pb-2',
      className,
    )}
  >
    {children}
  </div>
)

export const GeexButton = ({
  className = '',
  halfWidth = false,
  primary = false,
  children,
}: {
  className?: string
  halfWidth?: boolean
  primary?: boolean
  children: React.ReactNode
}) => (
  <button
    className={twMerge(
      `${halfWidth ? 'w-[50%]' : 'w-auto'} ${
        primary ? 'bg-geexRed' : 'bg-geexGrayDark'
      } text-geexGrayLight p-3 rounded-lg font-bold max-h-[80px]`,
      className,
    )}
  >
    {children}
  </button>
)

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
