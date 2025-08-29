# Tanstack Router + Isograph

This is a little demo project I have adapted from Kent C Dodds Frontend Masters Remix workshop

The primary aim here is to get familiar with Isograph.

## Setup

First install packages with `pnpm i`

Then run `pnpm run setup`. This will push the schema to the sqlite db, seed it, and generate the prisma client

_Note: In the future there will be a .vsix file included for the isograph extension but if you are using vscode you can install the extension by searching for `isograph`_

### Isograph

The primary files that currently are using isograph are the following under `components/` and they specific files contain iso literals. The other primary file is `isograph.config.json`.

### App Overview

This is a simple invoices app. Click sales, then click invoices, then click on an invoice.

Mutations are not completely setup yet.

Also, the server file contains a setup for domain driven design. The heart of Isograph is the `schema.graphql` file at the root of the app.

If you look under `server/lib/graphql/schema.ts` you will see we are merging all of those schemas together and then we have a script that watches that file to update our root schema. Probably more room for optimizations and automated imports for new schemas but this is where we are.
