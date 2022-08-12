import { useWallet } from 'eth'
import { useCopy } from 'utils/hooks'
export default function Top() {
  const { error, network, account, balance } = useWallet()
  const copy = useCopy()

  if (error)
    return (
      <div className="animate-pulse absolute top-0 w-screen bg-primary text-white text-center py-2">
        <span className="font-extrabold">{error}</span>
      </div>
    )

  return (
    <div className="absolute top-0 w-screen bg-primary text-white text-center py-2 flex items-center justify-between px-10">
      <span className="font-bold uppercase text-xs">@{network} </span>
      <button
        className="font-bold text-xs active:animate-"
        onClick={() => {
          copy(account)
        }}
      >
        {account}
      </button>
    </div>
  )
}
