import { Injectable } from '@angular/core';
import { TezosToolkit } from '@taquito/taquito';
import { ConnectionInfo, NetworkInfo, TezosNetworks } from '../models/tezos-models';
import { BeaconWallet } from '@taquito/beacon-wallet';

@Injectable({
  providedIn: 'root',
})
export class TezosService {
  constructor() {}

  private _tezos = new TezosToolkit('https://YOUR_PREFERRED_RPC_URL');
  private _connectionInfo: ConnectionInfo | undefined;

  getAvailableNetworks() {
    return TezosNetworks;
  }

  get connectionInfo() {
    return this._connectionInfo;
  }

  async connect({ network }: { network: NetworkInfo }) {
    this._tezos.setRpcProvider(network.RPCUrl);

    const options = {
      name: 'Taquito Test Dapp - Angular',
      iconUrl: 'https://tezostaquito.io/img/favicon.svg',
      preferredNetwork: network.type,
      eventHandlers: {
        PERMISSION_REQUEST_SUCCESS: {
          handler: async (data: any) => {
            console.log('permission data:', data);
          },
        },
      },
    };
    const wallet = new BeaconWallet(options);
    await wallet.requestPermissions({network});
    const address = await wallet.getPKH();
    console.log(`Your address: ${address}`);
    this._tezos.setWalletProvider(wallet);
    this._connectionInfo = {
      network,
      address
    }
  }
}
