import { iso } from "@iso";
import { InvoiceList } from "./invoice-list";
import { Outlet } from "@tanstack/react-router";
import { InvoicesInfo } from "./invoices-info";
import { LabelText } from "./label-text";
import { InvoiceListItem } from "@/types";
import { Suspense } from "react";

export const AllInvoices = iso(`
  field Query.AllInvoices @component {
    invoiceSummary {
        dueSoonAmount
        overdueAmount
        invoiceListItems {
            id
            name
            number
            totalAmount
            totalDeposits
            dueStatusDisplay
            dueStatus
            daysToDueDate
        }  
    }
  }
`)(function AllInvoicesComponent({ data }) {
  const {
    invoiceSummary: { invoiceListItems, dueSoonAmount, overdueAmount },
  } = data;

  // need to build the data on the backend I think that would send it to the frontend
  // in the form at above. So I think I need to alter by graphql endpoint

  const hundo = dueSoonAmount + overdueAmount;
  const dueSoonPercent = Math.floor((dueSoonAmount / hundo) * 100);
  return (
    <div className="relative">
      <div className="flex items-center justify-between gap-4">
        <InvoicesInfo label="Overdue" amount={overdueAmount} />
        <div className="flex h-4 flex-1 overflow-hidden rounded-full">
          <div className="bg-yellow-brand flex-1" />
          <div
            className="bg-green-brand"
            style={{ width: `${dueSoonPercent}%` }}
          />
        </div>
        <InvoicesInfo label="Due Soon" amount={dueSoonAmount} right />
      </div>
      <div className="h-4" />
      <LabelText>Invoice List</LabelText>
      <div className="h-2" />
      <Suspense fallback={<div>Loading...</div>}>
        <InvoiceList invoiceListItems={invoiceListItems as InvoiceListItem[]}>
          <Outlet />
        </InvoiceList>
      </Suspense>
    </div>
  );
});
