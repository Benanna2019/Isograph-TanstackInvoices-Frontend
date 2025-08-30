import type {ComponentReaderArtifact, ExtractSecondParam, ReaderAst } from '@isograph/react';
import { Mutation__CreateInvoice__param } from './param_type';
import { CreateInvoiceMutation as resolver } from '../../../CreateInvoiceForm';

const readerAst: ReaderAst<Mutation__CreateInvoice__param> = [
  {
    kind: "Linked",
    fieldName: "createInvoice",
    alias: null,
    arguments: [
      [
        "input",
        { kind: "Variable", name: "input" },
      ],
    ],
    condition: null,
    isUpdatable: false,
    selections: [
      {
        kind: "Scalar",
        fieldName: "id",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "number",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "dueDate",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Linked",
        fieldName: "customer",
        alias: null,
        arguments: null,
        condition: null,
        isUpdatable: false,
        selections: [
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
        refetchQueryIndex: null,
      },
    ],
    refetchQueryIndex: null,
  },
];

const artifact: ComponentReaderArtifact<
  Mutation__CreateInvoice__param,
  ExtractSecondParam<typeof resolver>
> = {
  kind: "ComponentReaderArtifact",
  fieldName: "Mutation.CreateInvoice",
  resolver,
  readerAst,
  hasUpdatable: false,
};

export default artifact;
