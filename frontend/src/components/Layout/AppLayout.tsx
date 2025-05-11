"use client";

import { ReactNode } from "react";
import { Container, Box } from "@mui/material";
import MainNavigation from "./MainNavigation";
import { usePathname } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();

  // Full width for auth pages
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  return (
    <>
      <MainNavigation />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          py: 3,
          ...(isAuthPage ? {} : { pt: { xs: 8, sm: 9 } }), // Extra padding for pages with AppBar
        }}
      >
        {isAuthPage ? (
          children
        ) : (
          <Container maxWidth="lg">{children}</Container>
        )}
      </Box>
    </>
  );
}
