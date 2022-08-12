import { Link } from 'react-router-dom'
import { useCampaigns } from 'utils/contracts'

export default function Campaigns() {
  const [campaigns, loading] = useCampaigns()

  return (
    <div className="min-h-screen">
      <h1 className="font-bold text-3xl text-center mt-20">
        Available Campaigns On Our Network
      </h1>

      <div className="grid place-content-center">
        <div className="grid grid-cols-2 gap-10 w-[60rem] py-10">
          {loading ? (
            <div className="text-center col-span-2">Loading...</div>
          ) : (
            <>
              {campaigns.map(campaign => (
                <div
                  key={campaign.args[1]}
                  className="bg-black rounded-md text-white p-6 text-3xl font-extrabold"
                >
                  <h1 className="pb-4">{campaign.args[2]}</h1>
                  <br />
                  <div className="flex justify-end">
                    <Link
                      className="text-sm text-right uppercase"
                      to={`/campaigns/${campaign.args[1]}`}
                    >
                      Join
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
