import { type CreateInvoiceOptions__CustomerSearch__output_type } from '../../CreateInvoiceOptions/CustomerSearch/output_type';
import { type LoadableField, type ExtractParameters } from '@isograph/react';
import { type CreateInvoiceOptions__CustomerSearch__param } from '../../CreateInvoiceOptions/CustomerSearch/param_type';

export type Query__CreateInvoice__param = {
  readonly data: {
    readonly createInvoiceOptions: {
      readonly CustomerSearch: LoadableField<
        CreateInvoiceOptions__CustomerSearch__param,
        CreateInvoiceOptions__CustomerSearch__output_type
      >,
    },
  },
  readonly parameters: Record<PropertyKey, never>,
};
