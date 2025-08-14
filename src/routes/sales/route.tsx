import { createFileRoute, Link, useMatches, Outlet } from '@tanstack/react-router'
import { equals } from "ramda"
import { Suspense } from 'react';

export const Route = createFileRoute('/sales')({
    component: RouteComponent,
})

function RouteComponent() {
    const matches = useMatches();
    const indexMatches = matches.some((m) => equals(m.pathname, "/sales"));
    const invoiceMatches = matches.some((m) =>
        equals(m.pathname, "/sales/invoices")
    );
    const customerMatches = matches.some((m) =>
        equals(m.pathname, "/sales/customers")
    );
    return (
        <div className="relative h-full p-10">
            <h1 className="font-display text-d-h3 text-black">Sales</h1>
            <div className="h-6" />
            <div className="flex gap-4 border-b border-gray-100 pb-4 text-[length:14px] font-medium text-gray-400">
                <Link
                    to="/sales"
                    activeProps={{
                        className: indexMatches && !invoiceMatches && !customerMatches ? "font-bold text-black" : "",
                    }}
                >
                    Overview
                </Link>
                <Link preload="intent" to="/sales/subscriptions">
                    Subscriptions
                </Link>
                <Link
                    preload="intent"
                    to="/sales/invoices"
                    activeProps={{
                        className: invoiceMatches ? "font-bold text-black" : "",
                    }}
                >
                    Invoices
                </Link>
                <Link
                    preload="intent"
                    to="/sales/customers"
                    activeProps={{
                        className: customerMatches ? "font-bold text-black" : "",
                    }}
                >
                    Customers
                </Link>
                <Link preload="intent" to="/sales/deposits">
                    Deposits
                </Link>
            </div>
            <div className="h-4" />
            {/* I think here I would need to have some better loading state */}
            {/* Probably each component that has state could show that instead and that should work so that */}
            {/* I don't have to wait for the whole outlet area to load but just the data */}
            <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
            </Suspense>
        </div>
    )
}
