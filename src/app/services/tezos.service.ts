import { Injectable } from '@angular/core';
import { TezosToolkit } from '@taquito/taquito';
import {
  ConnectionInfo,
  NetworkInfo,
  TezosNetworks,
} from '../models/tezos-models';
import { BeaconWallet } from '@taquito/beacon-wallet';
import { DAppClientOptions } from '@airgap/beacon-sdk';

@Injectable({
  providedIn: 'root',
})
export class TezosService {
  constructor() {}

  private _tezos: TezosToolkit | undefined;
  private _connectionInfo: ConnectionInfo | undefined;

  get availableNetworks() {
    return TezosNetworks;
  }

  get connectionInfo() {
    return this._connectionInfo;
  }

  get tezos() {
    return this._tezos;
  }

  async connect({ network }: { network: NetworkInfo }) {
    this._tezos = new TezosToolkit(network.RPCUrl);

    const options: DAppClientOptions = {
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
    await wallet.requestPermissions({ network });
    const address = await wallet.getPKH();
    console.log(`Your address: ${address}`);
    this._tezos.setWalletProvider(wallet);
    this._connectionInfo = {
      network,
      address,
    };
  }
}
