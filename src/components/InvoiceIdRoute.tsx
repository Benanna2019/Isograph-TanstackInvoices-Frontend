import { iso } from '@iso';
import { useLazyReference, useResult } from '@isograph/react';
import { useParams } from '@tanstack/react-router';

export default function InvoiceDetailsRoute() {
  const { invoiceId } = useParams({ from: '/sales/invoices/$invoiceId' });
  const { fragmentReference } = useLazyReference(
    iso(`entrypoint Query.InvoiceDetails`),
    { invoiceId: invoiceId },
  );
  const InvoiceDetails = useResult(fragmentReference);
  return <InvoiceDetails />;
}