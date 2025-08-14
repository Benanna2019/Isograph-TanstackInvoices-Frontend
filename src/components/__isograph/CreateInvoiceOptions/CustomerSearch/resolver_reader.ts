import type {ComponentReaderArtifact, ExtractSecondParam, ReaderAst } from '@isograph/react';
import { CreateInvoiceOptions__CustomerSearch__param } from './param_type';
import { CustomerSearch as resolver } from '../../../CreateInvoiceForm';

const readerAst: ReaderAst<CreateInvoiceOptions__CustomerSearch__param> = [
  {
    kind: "Linked",
    fieldName: "searchCustomers",
    alias: null,
    arguments: [
      [
        "query",
        { kind: "Variable", name: "query" },
      ],
    ],
    condition: null,
    isUpdatable: false,
    selections: [
      {
        kind: "Scalar",
        fieldName: "email",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "id",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "name",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
    ],
  },
];

const artifact: ComponentReaderArtifact<
  CreateInvoiceOptions__CustomerSearch__param,
  ExtractSecondParam<typeof resolver>
> = {
  kind: "ComponentReaderArtifact",
  fieldName: "CreateInvoiceOptions.CustomerSearch",
  resolver,
  readerAst,
  hasUpdatable: false,
};

export default artifact;
