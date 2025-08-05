import { createFileRoute } from "@tanstack/react-router";
// import PokemonDetailsRoute from "../../components/pokemon-details/PokemonDetailsRoute";

export const Route = createFileRoute("/pokemons/$pokemonId")({
  // component: PokemonDetailsRoute,
  component: () => <div>PokemonDetailsRoute</div>,
});