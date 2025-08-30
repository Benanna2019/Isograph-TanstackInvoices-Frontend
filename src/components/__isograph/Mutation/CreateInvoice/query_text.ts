export default 'mutation CreateInvoice($input: CreateInvoiceInput!) {\
  createInvoice____input___v_input: createInvoice(input: $input) {\
    id,\
    customer {\
      id,\
      name,\
    },\
    dueDate,\
    number,\
  },\
}';