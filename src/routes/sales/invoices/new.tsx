import { createFileRoute } from '@tanstack/react-router'
import CreateInvoiceRoute from '../../../components/CreateInvoiceRoute';


export const Route = createFileRoute('/sales/invoices/new')({
  component: CreateInvoiceRoute,
})


