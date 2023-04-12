import { TezosToolkit } from '@taquito/taquito';

export type TestInput = {
  tezos: TezosToolkit;
};

export type Test = {
  title: string;
  run: (input: TestInput) => Promise<string | undefined>;
};
