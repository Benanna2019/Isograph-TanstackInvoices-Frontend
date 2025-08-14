import type {ComponentReaderArtifact, ExtractSecondParam, ReaderAst } from '@isograph/react';
import { Query__CreateInvoice__param } from './param_type';
import { CreateInvoice as resolver } from '../../../CreateInvoice';
import CreateInvoiceOptions__CustomerSearch__entrypoint from '../../CreateInvoiceOptions/CustomerSearch/entrypoint';

const readerAst: ReaderAst<Query__CreateInvoice__param> = [
  {
    kind: "Linked",
    fieldName: "createInvoiceOptions",
    alias: null,
    arguments: null,
    condition: null,
    isUpdatable: false,
    selections: [
      {
        kind: "LoadablySelectedField",
        alias: "CustomerSearch",
        name: "CustomerSearch",
        queryArguments: null,
        refetchReaderAst: [
          {
            kind: "Scalar",
            fieldName: "id",
            alias: null,
            arguments: null,
            isUpdatable: false,
          },
        ],
        entrypoint: CreateInvoiceOptions__CustomerSearch__entrypoint,
      },
    ],
  },
];

const artifact: ComponentReaderArtifact<
  Query__CreateInvoice__param,
  ExtractSecondParam<typeof resolver>
> = {
  kind: "ComponentReaderArtifact",
  fieldName: "Query.CreateInvoice",
  resolver,
  readerAst,
  hasUpdatable: false,
};

export default artifact;
