import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/sales/deposits/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/sales/deposits/"!</div>
}
