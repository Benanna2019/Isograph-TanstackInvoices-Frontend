import { type InvoiceSummary__InvoiceList__output_type } from '../../InvoiceSummary/InvoiceList/output_type';

export type Query__AllInvoices__param = {
  readonly data: {
    readonly invoiceSummary: {
      readonly dueSoonAmount: number,
      readonly overdueAmount: number,
      readonly InvoiceList: InvoiceSummary__InvoiceList__output_type,
    },
  },
  readonly parameters: Record<PropertyKey, never>,
};
