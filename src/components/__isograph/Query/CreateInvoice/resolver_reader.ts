import type {ComponentReaderArtifact, ExtractSecondParam, ReaderAst } from '@isograph/react';
import { Query__CreateInvoice__param } from './param_type';
import { CreateInvoice as resolver } from '../../../CreateInvoice';

const readerAst: ReaderAst<Query__CreateInvoice__param> = [
  {
    kind: "Linked",
    fieldName: "customers",
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
      {
        kind: "Scalar",
        fieldName: "email",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
    ],
    refetchQueryIndex: null,
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
