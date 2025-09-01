import {
  createIsographEnvironment,
  createIsographStore,
  IsographEnvironmentProvider,
  IsographOperation,
  IsographPersistedOperation,
} from "@isograph/react";
import { Suspense, useMemo } from "react";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

function makeNetworkRequest<T>(
  query: IsographOperation | IsographPersistedOperation,
  variables: unknown
): Promise<T> {
  if (query.kind === "PersistedOperation") {
    throw new Error("Persisted Operations are not enabled in this project.");
  }

  const queryText = query.text;

  // replacing with my local host graphql api to see if I can get it to work
  const promise = fetch("http://localhost:8080/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: queryText, variables }),
  }).then(async (response) => {
    const json = await response.json();

    if (response.ok) {
      /**
       * Enforce that the network response follows the specification:: {@link https://spec.graphql.org/draft/#sec-Errors}.
       */
      if (Object.hasOwn(json, "errors")) {
        if (!Array.isArray(json.errors) || json.errors.length === 0) {
          throw new Error("GraphQLSpecificationViolationError", {
            cause: json,
          });
        }
        throw new Error("GraphQLError", {
          cause: json.errors,
        });
      }
      return json;
    }
    throw new Error("NetworkError", {
      cause: json,
    });
  });
  return promise;
}

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const environment = useMemo(
    () =>
      createIsographEnvironment(
        createIsographStore(),
        makeNetworkRequest,
        null,
        typeof window != "undefined" ? console.log : null
      ),
    []
  );
  return (
    <IsographEnvironmentProvider environment={environment}>
      <Suspense fallback={<div>Loading Pokemon...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </IsographEnvironmentProvider>
  );
}
