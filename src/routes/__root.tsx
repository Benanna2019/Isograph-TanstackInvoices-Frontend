import { createRootRoute } from "@tanstack/react-router";
import SideBar from "../components/sidebar";

export const Route = createRootRoute({
  component: () => (
    <>
      <SideBar />
    </>
  ),
});
