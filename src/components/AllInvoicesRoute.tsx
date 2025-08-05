import { iso } from '@iso';
import { useLazyReference, useResult } from '@isograph/react';

export default function AllInvoicesRoute() {
    const { fragmentReference } = useLazyReference(
        iso(`entrypoint Query.AllInvoices`),
        {},
    );
    const AllInvoices = useResult(fragmentReference);
    return <AllInvoices />;
}