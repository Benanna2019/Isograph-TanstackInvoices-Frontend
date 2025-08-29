import { createFileRoute } from '@tanstack/react-router'
import InvoiceDetailsRoute from '../../../components/InvoiceIdRoute'

export const Route = createFileRoute('/sales/invoices/$invoiceId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <InvoiceDetailsRoute />
}
