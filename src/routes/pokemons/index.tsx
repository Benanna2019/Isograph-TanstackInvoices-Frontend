import { createFileRoute } from "@tanstack/react-router";
// import PockemonsRoute from "../../components/pokemons/PockemonsRoute";

export const Route = createFileRoute("/pokemons/")({
  // component: PockemonsRoute,
  component: () => <div>PockemonsRoute</div>,
});
