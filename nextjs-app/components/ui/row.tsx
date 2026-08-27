const Row = ({
  justify = 'justify-between',
  className,
  children,
}: {
  justify?: string
  className?: string
  children: React.ReactNode
}) => (
  <div className={`flex ${justify} gap-4 flex-wrap md:flex-nowrap ${className}`}>
    {children}
  </div>
)

export { Row }