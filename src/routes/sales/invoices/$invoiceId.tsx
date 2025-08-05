import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/invoices/$invoiceId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sales/invoices/$invoiceId"!</div>
}
