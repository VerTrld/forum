"use client";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Button, Flex, Stack, Text, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";

import axios from "axios";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const form = useForm<IPersonShcema>({
    validate: yupResolver(PersonSchema),
    initialValues: {
      name: "",
      email: "",
      hash: "",
    },
  });

  const handleSubmit = form.onSubmit(async () => {
    console.log(form.values);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/person/create`,
        form.values
      );

      if (res.status === 200 || res.status === 201) {
        console.log("success");
        router.push("/login");
      }
    } catch {}
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
        style={{ width: "100%", maxWidth: "400px", padding:'10px' }}
      >
        <TextInput
          placeholder="name"
          {...form.getInputProps("name")}
          mb={"md"}
        />
        <TextInput
          placeholder="email"
          {...form.getInputProps("email")}
          mb="md"
        />
        <TextInput
          placeholder="password"
          {...form.getInputProps("hash")}
          mb="md"
        />
        <Button type="submit" fullWidth mb="md">
          {" "}
          Register
        </Button>
        <Text onClick={() => router.push("/login")} c={"violet"}>
          login
        </Text>
      </form>
    </Flex>
  );
}
