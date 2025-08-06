import { createFileRoute } from '@tanstack/react-router'
import AllInvoicesRoute from '../../../components/AllInvoicesRoute'

export const Route = createFileRoute('/sales/invoices')({
    component: RouteComponent,
})

function RouteComponent() {
    return <AllInvoicesRoute />
}
