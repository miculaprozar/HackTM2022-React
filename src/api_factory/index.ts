import { account } from './account/index.ts';

export const apiFactory = () => ({
  data: {
    account: () => account(),
  },
});

export type ApiFactory = ReturnType<typeof apiFactory>;
