"use client";
import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import React from "react";

export default function DashboardCard() {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"100%"}
      maw={"350px"}
    >
      <Card.Section bg={"#FFFFFF"}>
        <Flex p={10} gap={10}>
          <div style={{ alignContent: "center" }}>💻</div>
          <Flex direction={"column"}>
            <Title fz={"20px"} c={"black"}>
              100
            </Title>
            <Text fz={"12px"} c={"black"}>
              Total Members
            </Text>
          </Flex>
        </Flex>
      </Card.Section>
    </Card>
  );
}
