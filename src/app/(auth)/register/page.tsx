"use client";
import IPersonShcema, { PersonSchema } from "@/schema/PersonSchema";
import { Button, Flex, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React from "react";

import axios from "axios";
import { post } from "@/lib/api";

export default function Register() {
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
      const res = await post("/api/person/create", form.values);

      if (res.status === 200 || res.status === 201) {
        console.log("success");
      }
    } catch (error) {}
  });
  return (
    <Flex direction={"column"} h={"100vh"} w={"100%"}>
      <form onSubmit={handleSubmit}>
        <TextInput placeholder="name" {...form.getInputProps("name")} />
        <TextInput placeholder="email" {...form.getInputProps("email")} />
        <TextInput placeholder="password" {...form.getInputProps("hash")} />
        <Button type="submit"> Post</Button>
      </form>
    </Flex>
  );
}
