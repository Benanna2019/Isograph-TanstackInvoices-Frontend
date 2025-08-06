import type {ComponentReaderArtifact, ExtractSecondParam, ReaderAst } from '@isograph/react';
import { Query__AllInvoices__param } from './param_type';
import { AllInvoices as resolver } from '../../../AllInvoices';
import InvoiceSummary__InvoiceList__resolver_reader from '../../InvoiceSummary/InvoiceList/resolver_reader';

const readerAst: ReaderAst<Query__AllInvoices__param> = [
  {
    kind: "Linked",
    fieldName: "invoiceSummary",
    alias: null,
    arguments: null,
    condition: null,
    isUpdatable: false,
    selections: [
      {
        kind: "Scalar",
        fieldName: "dueSoonAmount",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Scalar",
        fieldName: "overdueAmount",
        alias: null,
        arguments: null,
        isUpdatable: false,
      },
      {
        kind: "Resolver",
        alias: "InvoiceList",
        arguments: null,
        readerArtifact: InvoiceSummary__InvoiceList__resolver_reader,
        usedRefetchQueries: [],
      },
    ],
  },
];

const artifact: ComponentReaderArtifact<
  Query__AllInvoices__param,
  ExtractSecondParam<typeof resolver>
> = {
  kind: "ComponentReaderArtifact",
  fieldName: "Query.AllInvoices",
  resolver,
  readerAst,
  hasUpdatable: false,
};

export default artifact;
