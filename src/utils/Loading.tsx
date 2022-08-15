export default function Loading({
  it,
  msg,
  className,
}: {
  it: boolean
  msg?: string
  className?: string
}) {
  if (!it) return null

  return (
    <div
      className={`animate-pulse z-50 fixed inset-0 bg-primary text-white text-7xl font-extrabold grid place-content-center ${className}`}
    >
      <h1>{msg ? msg : 'WAIT..'}</h1>
    </div>
  )
}
