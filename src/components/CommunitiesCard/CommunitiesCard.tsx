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

const CommunitiesCard = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      w={"100%"}
      maw={"350px"}
    >
      <Card.Section bg={"#475569"}>
        <Flex p={10} gap={10}>
          <div style={{ alignContent: "center" }}>💻</div>
          <Flex direction={"column"}>
            <Title fz={"20px"} c={"#FFFFFF"}>
              Tech Professionals
            </Title>
            <Text fz={"12px"} c={"#FFFFFF"}>
              A community for technology professionals, developers, and...
            </Text>
          </Flex>
        </Flex>
      </Card.Section>
      <Flex direction={"row"} justify={"center"}>
        <Flex justify="space-between" mt="md" mb="xs" w={"80%"}>
          <Stack gap={0}>
            <Text fw={500} ta={"center"}>
              1.2k
            </Text>
            <Text fz={"12px"}>Members</Text>
          </Stack>
          <Stack gap={0}>
            <Text fw={500} ta={"center"}>
              257
            </Text>
            <Text fz={"12px"}>Posts</Text>
          </Stack>
          <Stack gap={0}>
            <Text fw={500} ta={"center"}>
              89
            </Text>
            <Text fz={"12px"}>Online</Text>
          </Stack>
        </Flex>
      </Flex>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text>

      <Button
        color="blue"
        variant="outline"
        fullWidth
        mt="md"
        radius="md"
        onClick={onClick}
      >
        # View
      </Button>
    </Card>
  );
};

export default CommunitiesCard;
