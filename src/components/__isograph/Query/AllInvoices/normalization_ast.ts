import type {NormalizationAst} from '@isograph/react';
const normalizationAst: NormalizationAst = {
  kind: "NormalizationAst",
  selections: [
    {
      kind: "Linked",
      fieldName: "invoiceSummary",
      arguments: null,
      concreteType: "InvoiceSummary",
      selections: [
        {
          kind: "Scalar",
          fieldName: "dueSoonAmount",
          arguments: null,
        },
        {
          kind: "Linked",
          fieldName: "invoiceListItems",
          arguments: null,
          concreteType: "InvoiceListItem",
          selections: [
            {
              kind: "Scalar",
              fieldName: "id",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "daysToDueDate",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "dueStatus",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "dueStatusDisplay",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "name",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "number",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "totalAmount",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "totalDeposits",
              arguments: null,
            },
          ],
        },
        {
          kind: "Scalar",
          fieldName: "overdueAmount",
          arguments: null,
        },
      ],
    },
  ],
};
export default normalizationAst;
