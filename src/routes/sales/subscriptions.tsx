import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/subscriptions')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sales/subscriptions"!</div>
}
