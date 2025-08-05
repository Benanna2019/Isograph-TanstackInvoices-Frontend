import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/customers/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sales/customers/"!</div>
}
