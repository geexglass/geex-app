import { twMerge } from "tailwind-merge"

const Chip = ({
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

const ChipSmall = ({
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

export {Chip, ChipSmall}