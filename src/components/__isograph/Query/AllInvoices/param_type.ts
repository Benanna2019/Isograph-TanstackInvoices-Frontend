
export type Query__AllInvoices__param = {
  readonly data: {
    readonly invoiceSummary: {
      readonly dueSoonAmount: number,
      readonly overdueAmount: number,
      readonly invoiceListItems: ReadonlyArray<{
        readonly id: string,
        readonly name: string,
        readonly number: number,
        readonly totalAmount: number,
        readonly totalDeposits: number,
        readonly dueStatusDisplay: string,
        readonly dueStatus: string,
        readonly daysToDueDate: number,
      }>,
    },
  },
  readonly parameters: Record<PropertyKey, never>,
};
