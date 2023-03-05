import { Chain } from 'wagmi'

export const scroll = {
  id: 534351,
  name: 'Scroll L1 Testnet',
  network: 'scroll',
  nativeCurrency: {
    decimals: 18,
    name: 'Scroll',
    symbol: 'TSETH',
  },
  rpcUrls: {
    public: { http: ['https://prealpha-rpc.scroll.io/l1'] },
    default: { http: ['https://prealpha-rpc.scroll.io/l1'] },
  },
  blockExplorers: {
    etherscan: { name: 'l1scrollscan', url: 'https://l1scan.scroll.io/' },
    default: { name: 'l1scrollscan', url: 'https://l1scan.scroll.io/' },
  }
} as const satisfies Chain;