import { iso } from '@iso';
import { Link, useParams } from '@tanstack/react-router';
import { lineItemClassName, LineItemDisplay } from './deposits';
import { LabelText } from './label-text';
import { currencyFormatter } from '../../utils';

export const InvoiceDetails = iso(`
  field Query.InvoiceDetails($invoiceId: ID!) @component {
    invoiceDetails(id: $invoiceId) {
      dueStatus
        dueDisplay
        totalAmount
        customerId
        customerName
        deposits {
        amount
        id
        depositDateFormatted
        }
        invoiceDateDisplay
        lineItems {
        description
        id
        quantity
        unitPrice
        }
    }
  }
`)(function InvoiceDetailsComponent({ data: { invoiceDetails: invoice } }) {
    const { invoiceId } = useParams({ from: '/sales/invoices/$invoiceId' });
  if (!invoice) {
    return <div>Invoice not found</div>;
  }

  return (
    <div className="relative p-10">
          <Link
            to="/sales/customers/$customerId"
            params={{ customerId: invoice.customerId }}
            className="text-[length:14px] font-bold leading-6 text-blue-600 underline"
          >
            {invoice.customerName}
          </Link>
          <div className="text-[length:32px] font-bold leading-[40px]">
            {currencyFormatter.format(invoice.totalAmount)}
          </div>
          <LabelText>
            <span
              className={
                invoice.dueStatus === "paid"
                  ? "text-green-brand"
                  : invoice.dueStatus === "overdue"
                  ? "text-red-brand"
                  : ""
              }
            >
              {invoice.dueDisplay}
            </span>
            {` • Invoiced ${invoice.invoiceDateDisplay}`}
          </LabelText>
          <div className="h-4" />
          {invoice.lineItems.map((item: any) => (
            <LineItemDisplay
              key={item.id}
              description={item.description}
              unitPrice={item.unitPrice}
              quantity={item.quantity}
            />
          ))}
          <div className={`${lineItemClassName} font-bold`}>
            <div>Net Total</div>
            <div>{currencyFormatter.format(invoice.totalAmount)}</div>
          </div>
          <div className="h-8" />
          {/* <Deposits data={invoice.deposits as any} invoiceId={invoiceId} /> */}
        </div>
  );
});