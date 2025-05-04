"use client";
import { timeAgo } from "@/lib/utils";
import { Button, Flex, Paper, Text } from "@mantine/core";
import {
  IconClock,
  IconMessageCircle,
  IconPointFilled,
  IconThumbDown,
  IconThumbUp,
  IconTrash,
  IconUser,
} from "@tabler/icons-react";

interface IPostCard {
  title: string;
  content: string;
  // person: string;
  name: string;
  commentView?: boolean;
  commentCount?: string;
  threadView?: boolean;
  lineClampContent?: boolean;
  date: string;
  commentClick?: () => void;
  deleteClick?: () => void;
}

const PostCard = ({
  name,
  // person,
  commentView = true,
  commentCount,
  threadView = true,
  lineClampContent = true,
  title,
  content,
  date,
  commentClick,
}: IPostCard) => {
  return (
    <>
      <Paper
        withBorder
        radius="md"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Flex
          direction="column"
          justify="space-between"
          p="md"
          style={{ flex: 1 }}
        >
          <div>
            <Text fw={500} size="lg" lineClamp={2} mb="xs">
              {title}
            </Text>
            <Flex direction="row" align="center" gap={5} mb="sm">
              <Flex align="center" gap={2}>
                <IconUser size={12} color="#868E96" />
                <Text fz="xs" c="dimmed">
                  {name}
                </Text>
              </Flex>
              <IconPointFilled size={10} color="#868E96" />
              <Flex align="center" gap={2}>
                <IconClock size={12} color="#868E96" />
                <Text fz="xs" c="dimmed">
                  {timeAgo(date)}
                </Text>
              </Flex>
            </Flex>
          </div>

          <Text
            c="dimmed"
            size="sm"
            lineClamp={lineClampContent ? 3 : 0}
            mb="md"
          >
            {content}
          </Text>
        </Flex>

        <Flex
          direction="row"
          p="md"
          // pt={0}
          align="center"
          justify="space-between"
          style={{ borderTop: "1px solid var(--mantine-color-gray-2)" }}
        >
          <Flex direction="row" align="center" gap="md">
            {commentView && (
              <Flex align="center" gap={5}>
                <IconMessageCircle stroke={1.5} size={16} />
                <Text fz="xs">{commentCount} comments</Text>
              </Flex>
            )}

            <Flex align="center" gap={5}>
              <IconThumbUp stroke={1.5} size={16} />
              <Text fz="xs">{"2"}</Text>
            </Flex>
            <Flex align="center" gap={5}>
              <IconThumbDown stroke={1.5} size={16} />
              <Text fz="xs">{"2"}</Text>
            </Flex>
          </Flex>

          {threadView && (
            <Button variant="outline" size="xs" onClick={commentClick}>
              View Thread
            </Button>
          )}
        </Flex>
        <IconTrash />
      </Paper>
    </>
  );
};

export default PostCard;
