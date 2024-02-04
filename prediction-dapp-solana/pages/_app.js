import { useEffect, useMemo, useState } from "react";
import { RPC_ENDPOINT } from "../utils/constants";
import { ConnectionProvider , WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter , GlowWalletAdapter , MathWalletAdapter , SkyWalletAdapter , NekoWalletAdapter , NufiWalletAdapter , OntoWalletAdapter } from "@solana/wallet-adapter-wallets";
import { GlobalState } from "../state/global";
import "@solana/wallet-adapter-react-ui/styles.css"
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  const [mounted , setMounted] =useState(false);
  const wallets = useMemo(
    ()=>[
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new MathWalletAdapter(),
      new NekoWalletAdapter(),
      new NufiWalletAdapter(),
      new SkyWalletAdapter(),
      new OntoWalletAdapter(),
    ],[]
  );

  useEffect(()=>{
    setMounted(true)
  },[])

  return (
    <ConnectionProvider 
    endpoint={RPC_ENDPOINT}
    config ={{commitment:"confirmed"}}>
      <WalletProvider 
      wallets={wallets}
      autoConnect
      >
        <WalletModalProvider>
          {mounted && (
            <GlobalState>
              <Component {...pageProps} />
            </GlobalState>
          )} 
    </WalletModalProvider>
    </WalletProvider>
    </ConnectionProvider>
  );
}

export default MyApp;
