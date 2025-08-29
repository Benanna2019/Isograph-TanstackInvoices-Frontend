import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/customers/$customerId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sales/customers/$customerId"!</div>
}
