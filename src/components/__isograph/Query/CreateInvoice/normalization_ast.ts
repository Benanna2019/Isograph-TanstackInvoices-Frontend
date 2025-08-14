import type {NormalizationAst} from '@isograph/react';
const normalizationAst: NormalizationAst = {
  kind: "NormalizationAst",
  selections: [
    {
      kind: "Linked",
      fieldName: "createInvoiceOptions",
      arguments: null,
      concreteType: "CreateInvoiceOptions",
      selections: [
        {
          kind: "Scalar",
          fieldName: "id",
          arguments: null,
        },
      ],
    },
  ],
};
export default normalizationAst;
