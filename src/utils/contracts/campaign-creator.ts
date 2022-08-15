import { useWallet, useContract, ethers, useTx, useReader } from 'eth'
import campaignCreatorArtifacts from 'utils/abi/campaign-creator.json'
import { useState, useEffect, useMemo } from 'react'
import BN from 'bn.js'

export interface CampaignoObject {
  reason: string
  delay: number
  period: number
  quorumPercentage: number
  tokenPrice: number
  target: number
  maxTokensToBuy: number
}

export const useCampaigns = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])

  const { contract } = useContract(
    campaignCreatorArtifacts.address,
    campaignCreatorArtifacts.abi
  )

  useEffect(() => {
    if (contract) {
      ;(async () => {
        setLoading(true)
        await contract
          .queryFilter(contract.filters.CampainCreated(), 27628769)
          .then(x => {
            if (Array.isArray(x)) {
              setLoading(false)
              x.reverse()
              setData(x)
            }
          })
      })()
    }
  }, [contract])

  return [data, loading] as const
}

export function useCampaignCreator() {
  const [fees, setFees] = useState<number | null>(null)
  const [feesLoading, setFeesLoading] = useState<boolean>(false)

  const { contract } = useContract(
    campaignCreatorArtifacts.address,
    campaignCreatorArtifacts.abi
  )

  const campainCreationFee = useReader(contract?.campainCreationFee)

  const _createCampaign = useTx(contract?.createCampaign)

  async function callCreateCampaign(obj: CampaignoObject) {
    if (!contract) {
      return
    }

    await _createCampaign[0](
      obj.reason,
      obj.delay,
      obj.period,
      obj.quorumPercentage,
      ethers.utils.parseEther(obj.tokenPrice.toString()),
      obj.target,
      obj.maxTokensToBuy,
      {
        value: ethers.utils.parseEther('0.001'),
      }
    )
  }

  async function getCampaignCreationfee() {
    setFeesLoading(true)
    const fees: BN = await campainCreationFee[0]()
    if (fees) {
      setFees(Number(ethers.utils.formatEther(fees)))
      setFeesLoading(false)
    }
  }

  useEffect(() => {
    getCampaignCreationfee()
    const listener = contract?.on('CampainCreated', event => {
      console.log(event)
    })

    return () => {
      listener?.removeAllListeners()
    }
  }, [contract])

  return [
    fees,
    callCreateCampaign,
    _createCampaign[1] || feesLoading,
    _createCampaign[2],
    _createCampaign[3],
  ] as const
}
