import * as z from "zod";

export const generateRandomId = () => Math.random().toString(32).slice(2);

export const createInvoiceSchema = z.object({
  customerId: z.string(),
  invoiceDueDate: z.string(),
  invoiceLineItems: z.array(
    z.object({
      lineItemId: z.string(),
      description: z.string(),
      quantity: z.number(),
      unitPrice: z.number(),
    })
  ),
  intent: z.string(),
});
