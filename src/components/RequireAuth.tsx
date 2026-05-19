import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: ReactNode;
  requireSubscription?: boolean;
  requireRole?: "client" | "attorney" | "admin";
};

const RequireAuth = ({ children, requireSubscription, requireRole }: Props) => {
  const { user, loading, isSubscribed, roles } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[1.6rem] text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/auth?redirect=${encodeURIComponent(location.pathname)}`} replace />;
  }

  if (requireRole && !roles.includes(requireRole) && !roles.includes("admin")) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requireSubscription && !isSubscribed && !roles.includes("admin")) {
    return <Navigate to="/pricing?subscribe=1" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
