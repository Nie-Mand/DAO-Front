import { ethers, ContractTransaction } from 'ethers'
import { useWeb3Context } from '../provider'
import { useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

export function useTx<F>(func: (...args: any[]) => Promise<F>) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [hash, setHash] = useState<string | null>(null)

  const call = useCallback(
    async (...args: any[]) => {
      if (!func) return null

      setLoading(true)
      const v = await func(...args)
        .then((tx: any) => {
          if (tx.hash) {
            setHash(tx.hash)
          }
          tx.wait!().then(_tx => {
            setLoading(false)
          })
        })
        .catch((e: any) => {
          setError(null)
          setLoading(false)
          console.log(e)
          if (
            e.error?.data?.message &&
            e.error.data.message.indexOf(':') !== -1
          )
            setError(e.error.data.message.split(':')[1].trim())
          else setError(e.message)
          return null
        })

      return v
    },
    [func]
  )

  return [call, loading, error, hash] as const
}

export function useReader<F>(func: (...args: any[]) => Promise<F>) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const call = useCallback(
    async (...args: any[]) => {
      if (!func) return null
      setLoading(true)
      const v = await func(...args).catch((e: any) => {
        setError(null)
        setLoading(false)
        console.log(e)
        if (e.error?.data?.message && e.error.data.message.indexOf(':') !== -1)
          setError(e.error.data.message.split(':')[1].trim())
        else setError(e.message)
        return null
      })

      return v
    },
    [func]
  )

  return [call, loading, error] as const
}

export function useContract(address: string, abi: ethers.ContractInterface) {
  const { web3, signer } = useWeb3Context()
  const [error, setError] = useState<string | null>(null)
  const [controller, setController] = useState<ethers.Contract | null>(null)

  async function initContract() {
    let contract = new ethers.Contract(address, abi, web3!)

    if (signer) {
      contract = await contract.connect(signer)
    }
    setController(contract)
  }

  useEffect(() => {
    if (web3 && address) {
      initContract()
    } else {
      if (!web3) setController(null)
    }
  }, [address, web3, signer])

  const exec = useCallback(
    async <F>(func: (...args: any[]) => Promise<F>, ...args: any[]) => {
      const v = await func(...args).catch((e: any) => {
        console.log()
        setError(null)
        if (e.errorArgs?.length) setError(e.errorArgs)
        else if (
          e.error?.data?.message &&
          e.error.data.message.indexOf(':') !== -1
        )
          setError(e.error.data.message.split(':')[1].trim())
      })

      return v
    },
    []
  )

  return {
    error,
    call: exec,
    contract: controller,
  }
}
