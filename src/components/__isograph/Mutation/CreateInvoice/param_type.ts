import type { Mutation__CreateInvoice__parameters } from './parameters_type';

export type Mutation__CreateInvoice__param = {
  readonly data: {
    readonly createInvoice: {
      readonly id: string,
      readonly number: number,
      readonly dueDate: string,
      readonly customer: {
        readonly id: string,
        readonly name: string,
      },
    },
  },
  readonly parameters: Mutation__CreateInvoice__parameters,
};
