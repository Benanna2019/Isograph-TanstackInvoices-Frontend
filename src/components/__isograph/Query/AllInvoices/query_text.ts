export default 'query AllInvoices {\
  invoiceSummary {\
    dueSoonAmount,\
    invoiceListItems {\
      id,\
      daysToDueDate,\
      dueStatus,\
      dueStatusDisplay,\
      name,\
      number,\
      totalAmount,\
      totalDeposits,\
    },\
    overdueAmount,\
  },\
}';