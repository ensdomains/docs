import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

import { App } from './App';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  </StrictMode>
);
