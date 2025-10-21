import { twMerge } from 'tailwind-merge'

const TwoColumn = ({
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

const ThreeColumn = ({
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

export {TwoColumn, ThreeColumn}