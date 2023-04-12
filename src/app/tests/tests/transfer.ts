import { Test, TestInput } from 'src/app/models/test-model';

export const transfer: Test = {
  title: 'Transfer 0.1 Tez',
  run: async ({ tezos }: TestInput) => {
    const op = await tezos.wallet
      .transfer({
        to: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
        amount: 0.1,
      })
      .send();
    await op.confirmation();
    return undefined;
  },
};
