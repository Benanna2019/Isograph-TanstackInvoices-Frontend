import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/invoices/new')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sales/invoices/new"!</div>
}
