'use client';

import { useState, useEffect } from 'react';
import { 
  ConnectWallet, 
  Wallet, 
  WalletDropdown, 
  WalletDropdownDisconnect 
} from "@coinbase/onchainkit/wallet";
import { Name, Identity, Address, Avatar, EthBalance } from "@coinbase/onchainkit/identity";

export function WalletSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render wallet components on server
  if (!isClient) {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="px-3 py-2 bg-[var(--app-accent)] text-white rounded-lg text-sm font-medium">
          Conectar Wallet
        </div>
      </div>
    );
  }

  try {
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <Wallet className="z-10">
          <ConnectWallet className="px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base">
            <Name className="text-inherit" />
          </ConnectWallet>
          <WalletDropdown>
            <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownDisconnect />
          </WalletDropdown>
        </Wallet>
      </div>
    );
  } catch (error) {
    console.error('Wallet component error:', error);
    return (
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="px-3 py-2 bg-[var(--app-accent)] text-white rounded-lg text-sm font-medium">
          Conectar Wallet
        </div>
      </div>
    );
  }
}