import type { PropsWithChildren } from "react";
import { AuthProvider } from "@features/auth/auth-context";
import { AppDataProvider } from "@shared/store/app-data-context";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <AppDataProvider>{children}</AppDataProvider>
    </AuthProvider>
  );
}
