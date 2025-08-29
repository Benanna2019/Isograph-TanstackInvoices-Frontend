export * from "./customer.model";
export * from "./invoice.model";
// Re-export everything from deposit.model except Deposit and DepositSchema
// which are already exported from invoice.model
export {
  type CreateDeposit,
  CreateDepositSchema,
  type DepositDetails,
  DepositDetailsSchema,
  type DepositListItem,
  DepositListItemSchema,
} from "./deposit.model";
