export type Mutation__CreateInvoice__parameters = {
  readonly input: {
    readonly customerId: string,
    readonly dueDate: string,
    readonly lineItems: ReadonlyArray<{
          readonly description: string,
          readonly quantity: number,
          readonly unitPrice: number,
        }>,
  },
};
