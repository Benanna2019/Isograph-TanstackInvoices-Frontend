import { ApiContext } from "../domain/apis";
import { DueStatus } from "../domain/models";

export const typeDefs = /* GraphQL */ `
  enum DueStatus {
    paid
    overpaid
    overdue
    due
  }

  type ModifiedDeposit {
    id: ID!
    amount: Float!
    depositDateFormatted: String!
  }

  type Invoice {
    id: ID!
    number: Int!
    invoiceDate: String!
    dueDate: String!
    customerId: String!
    customer: Customer!
    lineItems: [LineItem!]!
    deposits: [Deposit!]!
    createdAt: String!
    updatedAt: String!
  }

  type LineItem {
    id: ID!
    description: String!
    quantity: Int!
    unitPrice: Float!
    invoiceId: String!
  }

  type InvoiceListItem {
    id: ID!
    name: String!
    number: Int!
    totalAmount: Float!
    totalDeposits: Float!
    daysToDueDate: Int!
    dueStatus: DueStatus!
    dueStatusDisplay: String!
  }

  type InvoiceSummary {
    invoiceListItems: [InvoiceListItem!]!
    dueSoonAmount: Float!
    overdueAmount: Float!
  }

  type InvoiceDetails {
    totalAmount: Float!
    dueStatus: DueStatus!
    dueDisplay: String!
    customerName: String!
    customerId: String!
    invoiceDateDisplay: String!
    lineItems: [LineItem!]!
    deposits: [ModifiedDeposit!]!
  }

  type InvoiceWithRelations {
    id: ID!
    number: Int!
    invoiceDate: String!
    dueDate: String!
    customer: CustomerRef!
    lineItems: [LineItem!]!
    deposits: [DepositRef!]!
  }

  type CustomerRef {
    id: ID!
    name: String!
  }

  type DepositRef {
    id: ID!
    amount: Float!
    depositDate: String!
  }

  input CreateInvoiceInput {
    dueDate: String!
    customerId: String!
    lineItems: [LineItemInput!]!
  }

  input LineItemInput {
    description: String!
    quantity: Int!
    unitPrice: Float!
  }

  extend type Query {
    invoices: [InvoiceListItem!]!
    invoice(id: ID!): Invoice
    invoiceDetails(id: ID!): InvoiceDetails
    invoiceSummary: InvoiceSummary!
    firstInvoice: Invoice
  }

  extend type Mutation {
    createInvoice(input: CreateInvoiceInput!): Invoice!
  }
`;

type LineItem = {
  totalAmount: number;
  totalDeposits: number;
  daysToDueDate: number;
  dueStatus: DueStatus;
  dueStatusDisplay: string;
  id: string;
  name: string;
  number: number;
};

type InvoiceLineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

export const resolvers = {
  Query: {
    invoices: async (_: any, _args: any, context: ApiContext) => {
      return context.apis.invoiceApi.getInvoiceListItems();
    },

    invoice: async (_: any, args: { id: string }, context: ApiContext) => {
      return context.dataloaders.invoiceByIdLoader.load(args.id);
    },

    invoiceDetails: async (
      _: any,
      args: { id: string },
      context: ApiContext
    ) => {
      const details = await context.apis.invoiceApi.getInvoiceDetails(args.id);
      if (!details) return null;

      // Transform the data to match GraphQL schema
      return {
        customerName: details.invoice.customer.name,
        customerId: details.invoice.customer.id,
        totalAmount: details.totalAmount,
        dueStatus: details.dueStatus,
        dueDisplay: details.dueStatusDisplay,
        invoiceDateDisplay:
          details.invoice.invoiceDate.toLocaleDateString(),
        lineItems: details.invoice.lineItems.map(
          (li: InvoiceLineItem) => ({
            id: li.id,
            description: li.description,
            quantity: li.quantity,
            unitPrice: li.unitPrice,
          })
        ),
          deposits: details.invoice.deposits.map(
          (deposit: { id: string; amount: number; depositDate: Date }) => ({
            id: deposit.id,
            amount: deposit.amount,
            depositDateFormatted: deposit.depositDate.toLocaleDateString(),
          })
        ),
      };
    },

    invoiceSummary: async (_: any, _args: any, context: ApiContext) => {
      return context.apis.invoiceApi.getInvoiceSummary();
    },

    firstInvoice: async (_: any, _args: any, context: ApiContext) => {
      return context.apis.invoiceApi.getFirstInvoice();
    },
  },

  Mutation: {
    createInvoice: async (
      _: any,
      args: { input: any },
      context: ApiContext
    ) => {
      // Parse date string to Date object
      const input = {
        ...args.input,
        dueDate: new Date(args.input.dueDate),
      };
      return context.apis.invoiceApi.createInvoice(input);
    },
  },

  Invoice: {
    customer: async (parent: any, _args: any, context: ApiContext) => {
      return context.dataloaders.customerByIdLoader.load(parent.customerId);
    },

    lineItems: async (parent: any, _args: any, context: ApiContext) => {
      // In a real implementation, you'd have a lineItemsByInvoiceIdLoader
      return context.clients.invoiceClient
        .findUnique({
          where: { id: parent.id },
          select: { lineItems: true },
        })
        .then((invoice: any) => invoice?.lineItems || []);
    },

    deposits: async (parent: any, _args: any, context: ApiContext) => {
      return context.dataloaders.depositsByInvoiceIdLoader.load(parent.id);
    },

    invoiceDate: (parent: any) => parent.invoiceDate.toISOString(),
    dueDate: (parent: any) => parent.dueDate.toISOString(),
    createdAt: (parent: any) => parent.createdAt.toISOString(),
    updatedAt: (parent: any) => parent.updatedAt.toISOString(),
  },
};

export const transformers = {};
