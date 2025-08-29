import { createFileRoute } from "@tanstack/react-router";
// import PockemonsRoute from "../../components/pokemons/PockemonsRoute";

// If you want to test this route you need to kill the server and make the
// poke-schema.graphql into the schema.graphql file
// this way isograph knows what schema to expect

export const Route = createFileRoute("/pokemons/")({
  // component: PockemonsRoute,
  component: () => <div>PockemonsRoute</div>,
});
