import { useId, useRef, useState } from "react";
import {
  inputClasses,
  LabelText,
  PlusIcon,
  MinusIcon,
  submitButtonClasses,
  // FilePlusIcon,
} from ".";
import { useNavigate } from "@tanstack/react-router";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "./ui/dialog";
import { ErrorBoundaryComponent } from "./error-boundary";
import { generateRandomId, createInvoiceSchema } from "./forms/form-utils";
import { iso } from "@iso";

// Type definitions matching the GraphQL schema
type CreateInvoiceInput = {
  dueDate: string;
  customerId: string;
  lineItems: Array<{
    description: string;
    quantity: number;
    unitPrice: number;
  }>;
};

// {
//   customers,
// }: {
//   customers: Pick < Customer, "id" | "name" | "email" > [];
// }

// This is the mutation result component - it shows what happens after the mutation completes
export const CreateInvoiceMutation = iso(`
  field Mutation.CreateInvoice($input: CreateInvoiceInput!) @component {
    createInvoice(input: $input) {
        id
        number
        dueDate
        customer {
          id
          name
        }
    }
  }`)(({ data }) => {
  const navigate = useNavigate();

  // Navigate to the created invoice after a short delay
  if (data.createInvoice?.id) {
    setTimeout(() => {
      navigate({ to: `/sales/invoices/${data.createInvoice.id}` });
    }, 1500);
  }

  return (
    <div className="p-4 bg-green-100 border border-green-300 rounded">
      <p className="text-green-800">
        ✅ Invoice #{data.createInvoice?.number} created successfully for {data.createInvoice?.customer?.name}!
      </p>
    </div>
  );
});

// This is the form component that accepts customers and onSubmit as props
export function CreateInvoiceForm({
  customers,
  onSubmit
}: {
  customers: Array<{ id: string; name: string; email: string }>;
  onSubmit: (formData: CreateInvoiceInput) => void;
}) {
  const invoiceFormRef = useRef<HTMLFormElement>(null);
  // const router = useRouter();
  // const navigate = useNavigate({ from: router.state.location.pathname });

  // Check if we're on the /new route
  // const [isOpen] = useState<boolean>(router.state.location.pathname === '/sales/invoices/new');

  // // Handle opening/closing the dialog via navigation
  // const handleOpenChange = (open: boolean) => {
  //   if (open) {
  //     navigate({ to: '/sales/invoices/new' });
  //   } else {
  //     navigate({ to: '/sales/invoices' });
  //   }
  // };

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

    // Call the parent's onSubmit handler
    onSubmit(transformedData);

    // Close the form
    invoiceFormRef.current?.reset();
    //   navigate({ search: {} });
    // }

    // navigate({
    //   to: "/sales/invoices/$invoiceId",
    //   params: { invoiceId: response?.data?.id },
    // });
  };

  return (
    <>
      {/* <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger>
              <span className="flex gap-1">
                <FilePlusIcon /> <span>Add Invoice</span>
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>*/}
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
                <select
                  name="customerId"
                  id="customerId"
                  className={inputClasses}
                  required
                >
                  <option value="">Select a customer...</option>
                  {customers?.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                      {customer.name} ({customer.email})
                    </option>
                  ))}
                </select>
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
                name="dueDateString"
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
      {/* </DialogContent>
      </Dialog> */}
    </>
  );
}

export function LineItems() {
  const firstId = useId();
  const [lineItems, setLineItems] = useState<string[]>(() => [firstId]);
  return (
    <div className="flex flex-col gap-2">
      {lineItems.map((lineItemClientId: string, index: number) => (
        <LineItemFormFields
          key={lineItemClientId}
          lineItemClientId={lineItemClientId}
          index={index}
          onRemoveClick={() => {
            setLineItems((lis: string[]) =>
              lis.filter((id: string) => id !== lineItemClientId)
            );
          }}
        />
      ))}
      <div className="mt-3 text-right">
        <button
          title="Add Line Item"
          type="button"
          onClick={() => setLineItems((lis: string[]) => [...lis, generateRandomId()])}
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

export function LineItemFormFields({
  lineItemClientId,
  index,
  onRemoveClick,
}: {
  lineItemClientId: string;
  index: number;
  onRemoveClick: () => void;
}) {
  return (
    <fieldset key={lineItemClientId} className="border-b-2 py-2">
      <div className="flex gap-2">
        <button type="button" title="Remove Line Item" onClick={onRemoveClick}>
          <MinusIcon />
        </button>
        <legend>Line Item {index + 1}</legend>
      </div>
      <input value={lineItemClientId} name="lineItemId" type="hidden" />
      <div className="flex flex-col gap-1">
        <div className="flex w-full gap-2">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1">
              <LabelText>
                <label htmlFor={`quantity-${lineItemClientId}`}>
                  Quantity:
                </label>
              </LabelText>
            </div>
            <input
              id={`quantity-${lineItemClientId}`}
              name="quantity"
              type="number"
              className={inputClasses}
            />
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-1">
              <LabelText>
                <label htmlFor={`unitPrice-${lineItemClientId}`}>
                  Unit Price:
                </label>
              </LabelText>
            </div>
            <input
              id={`unitPrice-${lineItemClientId}`}
              name="unitPrice"
              type="number"
              min="1"
              step="any"
              className={inputClasses}
            />
          </div>
        </div>
        <div>
          <LabelText>
            <label htmlFor={`description-${lineItemClientId}`}>
              Description:
            </label>
          </LabelText>
          <input
            id={`description-${lineItemClientId}`}
            name="description"
            className={inputClasses}
          />
        </div>
      </div>
    </fieldset>
  );
}


// CustomerSelect is a Query field since it needs to fetch all customers
export const CustomerSelect = iso(`
  field Query.CustomerSelect @component {
    customers {
      id
      name
      email
    }
  }
`)(({ data }) => {
  return (
    <select name="customerId" id="customerId" className={inputClasses} required>
      <option value="">Select a customer...</option>
      {data.customers?.map((customer) => (
        <option key={customer.id} value={customer.id}>
          {customer.name} ({customer.email})
        </option>
      ))}
    </select>
  );
});

export const CustomerSearch = iso(`
  field CreateInvoiceOptions.CustomerSearch($query: String!) @component {
    searchCustomers(query: $query) {
      email
      id
      name
    }
  }
`)(({ data }) => {

  return (
    <>
      {data.searchCustomers?.map((customer) => (
        <div key={customer.id}>
          {customer.name} ({customer.email})
        </div>
      ))}
    </>
  );
});