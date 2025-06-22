"use client";

import { Avatar, Button, Divider, Flex, Menu, Text } from "@mantine/core";
import {
  IconChevronDown,
  IconLogout2,
  IconMessageCircle,
  IconPhoto,
  IconPlus,
  IconSearch,
  IconSettings,
  IconTrash,
  IconArrowsLeftRight,
  IconUser,
} from "@tabler/icons-react";
import React, { useState } from "react";
import * as _ from "lodash";
import { useRouter } from "next/navigation";

interface INav {
  onClick?: () => void;
  profileClick?: () => void;
  open?: () => void;
  person: string;
}

const Nav = ({ onClick, open, person, profileClick }: INav) => {
  const initials = `${_.first(person)}${_.last(person)}`.toUpperCase();
  const [opened, setOpened] = useState(false);
  const router = useRouter();

  return (
    <Flex
      direction="column"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      <Flex
        direction="row"
        gap={10}
        // p={10}
        align="center"
        justify={"center"}
        // justify="space-between"
        bg="white"
      >
        <Flex
          direction={"row"}
          p={"5px 10px 5px 10px"}
          w={"100%"}
          maw={"900px"}
          justify={"space-between"}
        >
          <Text
            fw={600}
            size="xl"
            onClick={() => router.push("/")}
            style={{ cursor: "pointer" }}
          >
            Forum
          </Text>

          <Flex align="center" gap={20}>
            <Button
              onClick={open}
              variant="outline"
              color="black"
              radius="sm"
              w={35}
              h={30}
              p={0}
            >
              <IconPlus size={20} />
            </Button>

            <Menu opened={opened} onChange={setOpened} shadow="md" width={220}>
              <Menu.Target>
                <Flex
                  style={{
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Avatar color="cyan" radius="xl">
                    {initials}
                  </Avatar>

                  <Flex
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: "5px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  >
                    <IconChevronDown size={12} />
                  </Flex>
                </Flex>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>

                <Menu.Item
                  leftSection={<IconUser size={14} />}
                  onClick={profileClick}
                >
                  Profile
                </Menu.Item>
                <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                  Messages
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings size={14} />}>
                  Settings
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>Danger zone</Menu.Label>
                <Menu.Item leftSection={<IconArrowsLeftRight size={14} />}>
                  Transfer my data
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={onClick}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
      <Divider />
    </Flex>
  );
};

export default Nav;
