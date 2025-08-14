export default 'query CustomerSearch ($query: String!, $id: ID!) {\
  node____id___v_id: node(id: $id) {\
    ... on CreateInvoiceOptions {\
      __typename,\
      id,\
      searchCustomers____query___v_query: searchCustomers(query: $query) {\
        id,\
        email,\
        name,\
      },\
    },\
  },\
}';