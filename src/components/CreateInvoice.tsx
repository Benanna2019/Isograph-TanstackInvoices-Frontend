
import { iso } from '@iso';
import { FragmentReader, useImperativeLoadableField, useImperativeReference } from '@isograph/react';
import { Suspense, useRef } from 'react';
// import { CreateInvoiceForm } from './CreateInvoiceForm';
import { createInvoiceSchema } from './forms/form-utils';
import { inputClasses, LabelText, submitButtonClasses } from '.';
import { LineItems } from './CreateInvoiceForm';
import { ErrorBoundaryComponent } from './error-boundary';
import { Button } from './ui/button';

// Type definition for the form data
type CreateInvoiceInput = {
    dueDate: string;
    customerId: string;
    lineItems: Array<{
        description: string;
        quantity: number;
        unitPrice: number;
    }>;
};

// This component handles the mutation state
export const CreateInvoice = iso(`
  field Query.CreateInvoice @component {
    createInvoiceOptions {
      CustomerSearch @loadable
    }
  }
`)(function CreateInvoiceComponent({ data }) {
    // The entrypoint is here, separate from the field definition
    const {
        fragmentReference: mutationRef,
        loadFragmentReference: loadMutation,
    } = useImperativeReference(iso(`entrypoint Mutation.CreateInvoice`));

    const { fragmentReference, loadField } = useImperativeLoadableField(
        data.createInvoiceOptions.CustomerSearch
    );
    return (
        <>
            {mutationRef === null ? (
                <CreateInvoiceFormWrapper
                    onSubmit={(formData: CreateInvoiceInput) => loadMutation({ input: formData })}
                >
                    <Suspense fallback={<p>Loading more...</p>}>
                        {fragmentReference !== null ? (
                            <FragmentReader fragmentReference={fragmentReference} />
                        ) : (
                            <Button onClick={() => loadField({ query: "" })}>
                                Load more content...
                            </Button>
                        )}
                    </Suspense>
                </CreateInvoiceFormWrapper>
            ) : (
                <Suspense fallback="Creating invoice...">
                    <FragmentReader
                        fragmentReference={mutationRef}
                        additionalProps={{}}
                    />
                </Suspense>
            )}
        </>
    );
});

// Form wrapper component that renders the form with the CustomerSelect component
function CreateInvoiceFormWrapper({
    children,
    onSubmit
}: {
    children: React.ReactNode;
    onSubmit: (formData: CreateInvoiceInput) => void;
}) {
    const invoiceFormRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        const formData = new FormData(event.target as HTMLFormElement);
        const rawData = createInvoiceSchema.parse(Object.fromEntries(formData));

        // Transform the data to match CreateInvoiceInput
        const transformedData: CreateInvoiceInput = {
            dueDate: rawData.invoiceDueDate,
            customerId: rawData.customerId,
            lineItems: rawData.invoiceLineItems.map(item => ({
                description: item.description,
                quantity: item.quantity,
                unitPrice: item.unitPrice
            }))
        };

        onSubmit(transformedData);
        invoiceFormRef.current?.reset();
    };

    return (
        <ErrorBoundaryComponent>
            <div className="relative p-10">
                <h2 className="font-display mb-4">New Invoice</h2>
                <form
                    onSubmit={handleSubmit}
                    ref={invoiceFormRef}
                    className="flex flex-col gap-4"
                >
                    <div className="relative">
                        <div className="flex flex-wrap items-center gap-1">
                            <label htmlFor="customerId">
                                <LabelText>Customer</LabelText>
                            </label>
                            {children}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-1">
                            <label htmlFor="dueDate">
                                <LabelText>Due Date</LabelText>
                            </label>
                        </div>
                        <input
                            id="dueDate"
                            name="invoiceDueDate"
                            className={inputClasses}
                            type="date"
                            required
                        />
                        <input hidden readOnly name="intent" value="create" />
                    </div>
                    <LineItems />
                    <div>
                        <button type="submit" className={submitButtonClasses}>
                            Create Invoice
                        </button>
                    </div>
                </form>
            </div>
        </ErrorBoundaryComponent>
    );
}