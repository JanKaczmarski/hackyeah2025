import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { Header } from "./Header";

export function ProtectedLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
    </>
  );
}
