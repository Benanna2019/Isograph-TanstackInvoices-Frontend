import type {NormalizationAst} from '@isograph/react';
const normalizationAst: NormalizationAst = {
  kind: "NormalizationAst",
  selections: [
    {
      kind: "Linked",
      fieldName: "createInvoice",
      arguments: [
        [
          "input",
          { kind: "Variable", name: "input" },
        ],
      ],
      concreteType: "Invoice",
      selections: [
        {
          kind: "Scalar",
          fieldName: "id",
          arguments: null,
        },
        {
          kind: "Linked",
          fieldName: "customer",
          arguments: null,
          concreteType: "Customer",
          selections: [
            {
              kind: "Scalar",
              fieldName: "id",
              arguments: null,
            },
            {
              kind: "Scalar",
              fieldName: "name",
              arguments: null,
            },
          ],
        },
        {
          kind: "Scalar",
          fieldName: "dueDate",
          arguments: null,
        },
        {
          kind: "Scalar",
          fieldName: "number",
          arguments: null,
        },
      ],
    },
  ],
};
export default normalizationAst;
