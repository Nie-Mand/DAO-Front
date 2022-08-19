import { useParams } from 'react-router-dom'
import { useCampaignMetadata } from 'utils/contracts'
import { useWallet } from 'eth'
import Loading from 'utils/Loading'
import Input from 'utils/Input'

export default function Campaign() {
  const { address } = useParams()
  const { symbol } = useWallet()
  const { error, loading, data, buyEquity, tokensPrice, holders } =
    useCampaignMetadata(address || '')

  if (loading) return <Loading it />

  console.log(error)

  if (error) return <Loading it msg={error} className="text-lg" />

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const price = tokensPrice(Number(formData.get('holds')))

    if (price < 0) {
      return alert('You can not buy more tokens than you have')
    }

    buyEquity[0](formData.get('holds'), {
      value: price,
    })
  }

  return (
    <div className="h-screen">
      <div className="h-full grid grid-cols-2">
        <div className="grid place-content-center gap-4">
          <div className="border p-10">
            <h1 className="font-bold">
              Address: <span className="font-normal"> {address}</span>
            </h1>
            <h1 className="font-bold">
              Reason: <span className="font-normal"> {data?.reason}</span>
            </h1>
            <h1 className="font-bold">
              Target: <span className="font-normal"> {data?.target}</span>{' '}
              <span className="text-xs font-bold text-primary/70">
                {symbol}
              </span>
            </h1>
          </div>
          <form
            method="post"
            onSubmit={onSubmit}
            className="gap-4 grid border rounded-md p-10"
          >
            <h2>
              {buyEquity[3] ? (
                <div>
                  Transaction initiated:{' '}
                  <a
                    href={`https://mumbai.polygonscan.com/tx/${buyEquity[3]}`}
                    target="_blank"
                    className="text-blue-500"
                  >
                    Polygon Scan
                  </a>
                </div>
              ) : null}
            </h2>
            <Input
              label={`Buy $PRESTIGE Tokens (1 $PRESTIGE = ${data?.tokenPrice} ${symbol})`}
              type="number"
              name="holds"
              placeholder={`Maximum of ${data?.maxTokensToBuy}`}
              className="col-span-4"
              suffix="$PRESTIGE"
              disabled={buyEquity[1]}
            />
            <div className="col-span-4 grid ">
              <p className="text-primary capitalize">{buyEquity[2]}</p>
            </div>
            <button className="button col-span-2" disabled={buyEquity[1]}>
              {buyEquity[1] ? 'Signing Transaction...' : 'Buy'}
            </button>
          </form>
        </div>

        <div className="grid place-content-center gap-4">
          <div className="border p-10 grid w-[700px] gap-10">
            {holders.map(holder => (
              <h1
                key={holder.address}
                className="text-xs font-bold border-2 border-primary px-4 py-2 rounded-md text-primary bg-primary/5"
              >
                <span>{holder.address}</span>
                <span>{holder.total}</span>
              </h1>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
