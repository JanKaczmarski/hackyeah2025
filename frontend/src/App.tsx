import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { Home } from "./pages/Home";
import { MapPage } from "./pages/MapPage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Settings } from "./pages/Settings";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "map",
        element: <MapPage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
