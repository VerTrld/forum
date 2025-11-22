"use client";

import IPostSchema, { PostSchema } from "@/schema/PostSchema";
import {
  Button,
  Flex,
  Grid,
  Modal,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

import Nav from "@/components/Nav/Nav";
import CommunitiesCard from "@/components/CommunitiesCard/CommunitiesCard";
import PostCard from "@/components/PostCard/PostCard";
import DashboardCard from "@/components/DashboardCard/DashboardCard";

export default function Home() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const session = useSession();

  const { data: postData, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<IPost[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/all`
      );
      return data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    },
    enabled: !!session.data?.user?.id,
  });

  const form = useForm<IPostSchema>({
    validate: yupResolver(PostSchema),
    initialValues: {
      title: "",
      content: "",
      personId: "",
    },
  });

  const handleSubmit = form.onSubmit(async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
        form.values
      );
      if (res.status === 200 || res.status === 201) {
        refetch();
        form.reset();
        close();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  });

  useEffect(() => {
    form.setFieldValue("personId", session.data?.user?.id || "");
  }, [opened]);

  return (
    <>
      {/* Create Post Modal */}
      <Modal
        opened={opened}
        size={500}
        onClose={close}
        title="Create New Thread"
      >
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={20} p={10}>
            <TextInput
              placeholder="Post Title"
              {...form.getInputProps("title")}
            />
            <Textarea
              placeholder="What's on your mind?"
              {...form.getInputProps("content")}
            />
            <Button type="submit" color="#020817">
              Post
            </Button>
          </Flex>
        </form>
      </Modal>

      {/* Main Page Layout */}
      <Flex direction="column" h="100vh" w="100%" bg="#ffffff">
        <Nav
          open={open}
          person={session.data?.user?.name || ""}
          onClick={() =>
            signOut({
              callbackUrl:
                process.env.NEXT_PUBLIC_APP_URL ||
                "https://forum.univerapp.site",
            })
          }
          profileClick={() =>
            router.push(`/profile?id=${session.data?.user?.id}`)
          }
        />

        {/* Scrollable Content Area */}
        <Flex
          direction="column"
          flex={1}
          w="100%"
          align="center"
          style={{ overflow: "auto" }}
          gap={20}
        >
          <Flex direction={"column"} w={"100%"} maw={"900px"}>
            <Title>Communities</Title>
            <Text>Discover and join communities that match your interests</Text>
          </Flex>

          <Flex justify="center" align="center" w="100%" maw="900px" mx="auto">
            <Grid w="100%" gutter="md">
              {Array.from({ length: 3 }).map((_, index) => (
                <Grid.Col
                  key={index}
                  span={{ base: 12, sm: 6, lg: 4 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <DashboardCard />
                </Grid.Col>
              ))}
            </Grid>
          </Flex>

          {/* Centered Grid Container */}
          <Flex justify="center" align="center" w="100%" maw="900px" mx="auto">
            <Grid w="100%" gutter="md">
              {[...Array(6)].map((_, index) => (
                <Grid.Col
                  key={index}
                  span={{ base: 12, sm: 6, lg: 4 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <CommunitiesCard
                    onClick={() => router.push("/communities")}
                  />
                </Grid.Col>
              ))}
            </Grid>
          </Flex>

          {/* Uncomment this to show Post Cards */}
          {/* 
          <Flex direction="column" w="100%" maw="900px" gap={30} p={10}>
            {postData?.map((post, index) => (
              <PostCard
                key={index}
                date={post.createdAt}
                title={post.title || ""}
                content={post.content || ""}
                name={upperFirst(post.owner?.name) || "Unknown"}
                commentClick={() => router.push(`/thread?id=${post.id}`)}
                commentCount={post._count?.comments}
              />
            ))}
          </Flex> 
          */}
        </Flex>
      </Flex>
    </>
  );
}
