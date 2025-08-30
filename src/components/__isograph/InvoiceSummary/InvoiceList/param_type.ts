
export type InvoiceSummary__InvoiceList__param = {
  readonly data: {
    readonly invoiceListItems: ReadonlyArray<{
      readonly id: string,
      readonly name: string,
      readonly number: number,
      readonly totalAmount: number,
      readonly totalDeposits: number,
      readonly daysToDueDate: number,
      readonly dueStatus: string,
      readonly dueStatusDisplay: string,
    }>,
  },
  readonly parameters: Record<PropertyKey, never>,
};
