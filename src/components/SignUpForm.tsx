"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { UserPostValidation } from "@/validations/UserValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof UserPostValidation>>({
    resolver: zodResolver(UserPostValidation),
  });
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function handleSignup(data: z.infer<typeof UserPostValidation>) {
    setButtonDisabled(true);
    const userData = UserPostValidation.safeParse(data);
    if (!userData.success) {
      console.error("Error in form data");
      return;
    }
    console.log(userData.data);
    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData.data),
    });
    reset();
    router.push("/sign-up/success");
  }

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <Box
        className="m-auto"
        sx={{ display: "grid", maxWidth: "300px", gap: "10px" }}
      >
        <TextField
          type="email"
          placeholder="Email"
          helperText={errors.email?.message}
          {...register("email")}
        />

        <TextField
          type="password"
          placeholder="Password"
          helperText={errors.password?.message}
          {...register("password")}
        />
        <Button type="submit" variant="contained" disabled={buttonDisabled}>
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
