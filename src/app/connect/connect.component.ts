import { Component } from '@angular/core';
import { TezosService } from '../services/tezos.service';
import { NetworkInfo } from '../models/tezos-models';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent {
  networks: NetworkInfo[];
  selectedNetwork: NetworkInfo | undefined;

  constructor(private tezos: TezosService) {
    this.networks = tezos.getAvailableNetworks();
  }

  connect() {
    if (!this.selectedNetwork) {
      return;
    }
    this.tezos.connect({ network: this.selectedNetwork });
  }
}
