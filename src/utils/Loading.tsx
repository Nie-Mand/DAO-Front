export default function Loading({ it }) {
  if (!it) return null

  return (
    <div className="animate-pulse z-50 fixed inset-0 bg-primary text-white text-7xl font-extrabold grid place-content-center">
      <h1>WAIT..</h1>
    </div>
  )
}
