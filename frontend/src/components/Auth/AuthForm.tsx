"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "@/contexts/AuthContext";

// Schema for both login and signup
const loginSchema = z.object({
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Extended schema for signup that adds password confirmation
const signupSchema = loginSchema
  .extend({
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthFormProps {
  mode: "login" | "signup";
}

export default function AuthForm({ mode }: AuthFormProps) {
  const { login, signup } = useAuth();
  const [error, setError] = useState<string | null>(null);

  // Use the appropriate schema based on mode
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData | SignupFormData>({
    resolver: zodResolver(mode === "login" ? loginSchema : signupSchema),
    defaultValues: {
      email: "",
      password: "",
      ...(mode === "signup" ? { confirmPassword: "" } : {}),
    },
  });

  const onSubmit = async (data: LoginFormData | SignupFormData) => {
    try {
      setError(null);
      if (mode === "login") {
        await login(data.email, data.password);
      } else {
        // We know this is a SignupFormData when mode is 'signup'
        // TypeScript might not be able to infer this, but we know it's true
        await signup(data.email, data.password);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Typography component="h1" variant="h5" align="center" gutterBottom>
          {mode === "login" ? "Login to Task Manager" : "Create an Account"}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message?.toString()}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message?.toString()}
          />

          {mode === "signup" && (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              {...register("confirmPassword")}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message?.toString()}
            />
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : mode === "login" ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </Button>

          <Box textAlign="center">
            {mode === "login" ? (
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            ) : (
              <Link href="/login" variant="body2">
                {"Already have an account? Login"}
              </Link>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
