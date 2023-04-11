import { NetworkType } from '@airgap/beacon-sdk';

export type NetworkInfo = {
  name: string;
  RPCUrl: string;
  type: NetworkType;
};

export const TezosNetworks: NetworkInfo[] = [
  {
    name: 'Ghostnet',
    RPCUrl: 'https://ghostnet.ecadinfra.com/',
    type: NetworkType.GHOSTNET,
  },
  {
    name: 'Mainnet',
    RPCUrl: 'https://mainnet.api.tez.ie/',
    type: NetworkType.MAINNET,
  },
];
