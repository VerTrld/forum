"use client";
import { Card, Flex, Image, Paper, Text } from "@mantine/core";
import {
  IconClock,
  IconMessageCircle,
  IconPointFilled,
  IconThumbDown,
  IconThumbUp,
  IconUser,
} from "@tabler/icons-react";

interface IPostCard {
  title: string;
  content: string;
  person: string;
}

const PostCard = ({ person, title, content }: IPostCard) => {
  return (
    <>
      <Paper
        // shadow="xs"
        h={"100%"}
        withBorder
      >
        {/* <Card.Section>dalkdlakdladk</Card.Section> */}

        <Flex direction={"column"} p={15}>
          <Flex direction={"column"}>
            <Text fw={500} size="lg">
              {title}
            </Text>
            <Flex direction={"row"} align={"center"} gap={5}>
              <Flex align={"center"} gap={2}>
                <IconUser size={12} color="#868E96" />
                <Text fz={"10px"} c="dimmed">
                  Admin
                </Text>
              </Flex>
              <IconPointFilled size={10} color="#868E96" />
              <Flex align={"center"} gap={2}>
                <IconClock size={12} color="#868E96" />{" "}
                <Text fz={"10px"} c="dimmed">
                  2 hours ago
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Text>{person}</Text>

          <Text c="dimmed" size="sm">
            {content}
          </Text>
        </Flex>
        <Flex
          bg={"#f8fafc"}
          direction={"row"}
          p={15}
          align={"center"}
          justify={"space-between"}
          style={{ border: "2px solid yellow" }}
        >
          <Flex
            direction={"row"}
            style={{ border: "2px solid red" }}
            justify={"center"}
            w={"20%"}
            align={"center"}
            gap={15}
          >
            <IconThumbUp stroke={1.5} size={15} />
            <Text fz={"12px"}>15</Text>
            <IconThumbDown
              stroke={1.5}
              size={15}
              style={{ transform: "scaleX(-1)" }}
            />
            <Text fz={"12px"}>2</Text>
          </Flex>
          <Flex
            direction={"row"}
            align={"center"}
            style={{ border: "2px solid black" }}
            gap={15}
          >
            <IconMessageCircle stroke={1.5} size={15} />
            <Text fz={"12px"}>5 comments</Text>
          </Flex>
        </Flex>
      </Paper>
    </>
  );
};

export default PostCard;
