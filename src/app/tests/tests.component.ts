import { Component } from '@angular/core';
import { transfer } from './tests/transfer';
import { Test } from '../models/test-model';
import { TezosService } from '../services/tezos.service';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
})
export class TestsComponent {
  tests = [transfer];
  selectedTest: Test | undefined;

  constructor(private tezos: TezosService) {}

  async run() {
    if (!this.selectedTest || !this.tezos.tezos) {
      return;
    }
    await this.selectedTest.run({ tezos: this.tezos.tezos });
    console.log('Succeeded');
  }
}
