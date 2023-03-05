import './App.css';
import {BrowserRouter as Router} from "react-router-dom"; 
import Navbar from './utils/Navbar';
import AppRoutes from "./components/Routes.js";

// Rainbowkit
import '@rainbow-me/rainbowkit/styles.css';
import {getDefaultWallets,RainbowKitProvider} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, goerli, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai, sepolia} from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public';
import { scroll } from './scroll.ts'

// Configure the chains
const { chains, provider } = configureChains(
  [mainnet,goerli, sepolia, polygon, polygonMumbai,scroll],
  [
    infuraProvider({ apiKey: "5bafc40913ae4a0ab7745f6fec51a04c",priority: 0,}), // Infura RPC is privileged
    
    publicProvider() // only for scroll
  ]
  
);

const { connectors } = getDefaultWallets({
  appName: 'ZKowl',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function App() {
  return (
    <div className="App">
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Router>
          <Navbar/>
          <AppRoutes />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
    </div>
  );
}

export default App;


 
