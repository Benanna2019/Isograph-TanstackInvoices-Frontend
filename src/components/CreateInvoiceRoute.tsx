import { iso } from '@iso';
import { FragmentReader, useLazyReference } from '@isograph/react';
import { Suspense } from 'react';
import { ErrorBoundaryComponent } from './error-boundary';

export default function CreateInvoiceRoute() {
    const { fragmentReference } = useLazyReference(
        iso(`entrypoint Query.CreateInvoice`),
        {}
    );

    return (
        <ErrorBoundaryComponent>
            <Suspense fallback={<div>Loading customers...</div>}>
                <FragmentReader fragmentReference={fragmentReference} />
            </Suspense>
        </ErrorBoundaryComponent>
    );
}