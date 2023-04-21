import { Component } from '@angular/core';
import { TezosService } from '../services/tezos.service';
import { NetworkInfo } from '../models/tezos-models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss'],
})
export class ConnectComponent {
  networks: NetworkInfo[];
  selectedNetwork: NetworkInfo | undefined;

  constructor(private tezos: TezosService, private router: Router) {
    this.networks = tezos.availableNetworks;
  }

  async connect() {
    if (!this.selectedNetwork) {
      return;
    }
    if (window && window.localStorage) {
      // finds the Beacon keys
      const beaconKeys = Object.keys(window.localStorage).filter((key) =>
        key.toLowerCase().includes("beacon")
      );
      // deletes the keys
      beaconKeys.forEach((key) => delete window.localStorage[key]);
    }
    await this.tezos.connect({ network: this.selectedNetwork });
    this.router.navigate(['tests']);
  }
}
