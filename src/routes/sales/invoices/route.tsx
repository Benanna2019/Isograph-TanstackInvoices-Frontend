import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import AllInvoicesRoute from "../../../components/AllInvoicesRoute";

const invoicesSearchSchema = z.object({
  modal: z.enum(["create"]).optional(),
});

export const Route = createFileRoute("/sales/invoices")({
  validateSearch: invoicesSearchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  return <AllInvoicesRoute />;
}
