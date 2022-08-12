import Web3Context from './context'
import { useWalletConnect } from './use-wallet-connect'

export function Provider({ children }: { children: React.ReactNode }) {
  const web3 = useWalletConnect()
  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>
}
