import Input from 'utils/Input'
import { useWallet } from 'eth'
import { useCampaignCreator, CampaignoObject } from 'utils/contracts'

export default function Create() {
  const { symbol } = useWallet()

  const [fees, createCampaign, loading, error, hash] = useCampaignCreator()

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data: CampaignoObject = {
      reason: formData.get('reason')!.toString(),
      delay: Number(formData.get('delay')),
      period: Number(formData.get('period')),
      quorumPercentage: Number(formData.get('quorumPercentage')),
      tokenPrice: Number(formData.get('tokenPrice')),
      target: Number(formData.get('target')),
      maxTokensToBuy: Number(formData.get('maxTokensToBuy')),
    }
    createCampaign(data)
  }

  return (
    <div className="font-syne h-screen">
      <div className="grid place-content-center h-full">
        <h1 className="font-extrabold text-xl pb-10 text-center">
          Create Your Decentralized Campaign
          <br />
          {fees ? (
            <span className="text-xs font-bold">
              (Creation Fees Are {fees} {symbol})
            </span>
          ) : null}
        </h1>

        <h2>
          {hash ? (
            <div>
              Transaction initiated:{' '}
              <a
                href={`https://mumbai.polygonscan.com/tx/${hash}`}
                target="_blank"
                className="text-blue-500"
              >
                Polygon Scan
              </a>
            </div>
          ) : null}
        </h2>
        <form
          method="post"
          onSubmit={onSubmit}
          className="w-[720px] gap-4 grid grid-cols-6"
        >
          <Input
            label="Reason"
            type="text"
            name="reason"
            placeholder="Let's make a campaign to raise funds for the UCL"
            className="col-span-4"
            disabled={loading}
          />

          <Input
            label="Target"
            type="number"
            name="target"
            placeholder="10000"
            className="col-span-2"
            suffix={`$${symbol}`}
            disabled={loading}
          />

          <Input
            label="Delay"
            type="number"
            name="delay"
            placeholder="0"
            className="col-span-2"
            disabled={loading}
          />
          <Input
            label="Period"
            type="number"
            name="period"
            placeholder="2"
            disabled={loading}
            className="col-span-2"
          />
          <Input
            label="Quorum"
            type="number"
            name="quorumPercentage"
            placeholder="60"
            suffix="%"
            className="col-span-2"
            disabled={loading}
          />
          <Input
            label="Governace Token Price"
            type="number"
            name="tokenPrice"
            placeholder="0.001"
            suffix={`$${symbol}`}
            disabled={loading}
            className="col-span-3"
          />

          <Input
            label="Maxmimum Tokens to Buy"
            type="number"
            name="maxTokensToBuy"
            placeholder="100"
            suffix="$PRESTIGE"
            className="col-span-3"
            disabled={loading}
          />
          <div className="col-span-4 grid ">
            <p className="text-primary capitalize">{error}</p>
          </div>
          <button className="button col-span-2" disabled={loading}>
            {loading ? 'Signing Transaction...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  )
}
