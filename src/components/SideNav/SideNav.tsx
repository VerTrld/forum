import { Button, Flex, Stack } from "@mantine/core";
import React from "react";

const SideNav = () => {
  const menu = ["Home", "Communities", "Private"];
  return (
    <Flex
      direction={"column"}
      bg={"blue"}
      w={"20%"}
      style={{ position: "sticky", top: 0 }}
    >
      <Stack flex={1} style={{ border: "2px solid red" }}>
        {menu.map((v, i) => (
          <div key={i}>
            <Flex flex={1} style={{ border: "2px solid red" }}>
              <Button flex={1}>{v}</Button>
            </Flex>
          </div>
        ))}
      </Stack>
    </Flex>
  );
};

export default SideNav;
