"use client";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");

  const form = useForm<IPersonShcema>({
    validate: yupResolver(PersonSchema),
    initialValues: {
      email: "",
      hash: "",
    },
  });

  const handleSubmit = form.onSubmit(async () => {
    setError("");

    const res = await signIn("credentials", {
      email: form.values.email,
      hash: form.values.hash,
      redirect: false,
    });

    if (res?.error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login failed:", res.error);
    } else {
      router.push("/login");
    }
  });

  return (
    <Flex
      direction={"column"}
      h={"100vh"}
      w={"100%"}
      align="center"
      justify="center"
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <TextInput
          placeholder="Email"
          {...form.getInputProps("email")}
          mb="md"
        />
        <TextInput
          placeholder="Password"
          type="password"
          {...form.getInputProps("hash")}
          mb="md"
        />
        {error && (
          <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
        )}
        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </Flex>
  );
}
