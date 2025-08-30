import { Link } from "@tanstack/react-router";
import { iso } from "@iso";
import { currencyFormatter } from "../../utils";
// import { Customer } from "@/types";
import { FilePlusIcon } from ".";
import { InvoiceListItem } from "../../utils/types";

type InvoiceListData = {
  invoiceListItems: InvoiceListItem[];
}

export const InvoiceList = iso(`
  field InvoiceSummary.InvoiceList @component {
    invoiceListItems {
      id
      name
      number
      totalAmount
      totalDeposits
      daysToDueDate
      dueStatus
      dueStatusDisplay
    }
  }
`)(function InvoiceListComponent({ data }, props) {

  const { invoiceListItems } = data as InvoiceListData;

  return (
    <div className="flex overflow-hidden rounded-lg border border-gray-100">
      <div className="w-1/2 border-r border-gray-100">
        {/* Modal for adding a new Invoice using query params */}
        <div
          className={
            "block border-b-4 border-gray-100 py-3 px-4 hover:bg-gray-50"
          }
        >
          <Link to="/sales/invoices/new">
            <span className="flex gap-1">
              <FilePlusIcon /> <span>Create new invoice</span>
            </span>
          </Link>
        </div>
        <div className="max-h-96 overflow-y-scroll">
          {invoiceListItems.map((invoice: InvoiceListItem) => (
            <Link
              key={invoice.id}
              to="/sales/invoices/$invoiceId"
              params={{ invoiceId: invoice.id }}
              preload="intent"
              activeProps={{
                className: "bg-gray-100",
              }}
              className="block border-b border-gray-50 py-3 px-4 hover:bg-gray-50"
            >
              <div className="flex justify-between text-[length:14px] font-bold leading-6">
                <div>{invoice.name}</div>
                <div>{currencyFormatter.format(invoice.totalAmount)}</div>
              </div>
              <div className="flex justify-between text-[length:12px] font-medium leading-4 text-gray-400">
                <div>{invoice.number}</div>
                <div
                  className={
                    "uppercase" +
                    " " +
                    (invoice.dueStatus === "paid"
                      ? "text-green-brand"
                      : invoice.dueStatus === "overdue"
                        ? "text-red-brand"
                        : "")
                  }
                >
                  {invoice.dueStatusDisplay}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-1/2">{props.children}</div>
    </div>
  );
});

