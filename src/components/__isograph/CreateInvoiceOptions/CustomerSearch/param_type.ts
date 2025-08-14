import type { CreateInvoiceOptions__CustomerSearch__parameters } from './parameters_type';

export type CreateInvoiceOptions__CustomerSearch__param = {
  readonly data: {
    readonly searchCustomers: ReadonlyArray<{
      readonly email: string,
      readonly id: string,
      readonly name: string,
    }>,
  },
  readonly parameters: CreateInvoiceOptions__CustomerSearch__parameters,
};
