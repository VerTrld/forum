"use client";
import IPostSchema, { PostSchema } from "@/schema/PostSchema";
import {
  Button,
  Flex,
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
import PostCard from "@/components/PostCard/PostCard";
import { signOut, useSession } from "next-auth/react";
import { IconLogout2, IconPlus } from "@tabler/icons-react";
import { upperFirst, useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);

  const session = useSession();

  const { data: postData, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<IPost[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/all`
        // `${process.env.NEXT_PUBLIC_API_URL}/posts/owner/${session.data?.user?.id}`
      );

      return data;
    },

    enabled: !!session.data?.user?.id,
  });

  console.log(postData);

  // Initialize form with dynamic personId if available
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
        console.log("Post created successfully");
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
      <Modal
        opened={opened}
        size={500}
        onClose={close}
        title="Create New Thread"
      >
        {/* Modal content */}
        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} gap={20} flex={1} p={10}>
            <TextInput
              placeholder="Post Title"
              {...form.getInputProps("title")}
            />

            <Textarea
              placeholder="What's on your mind?"
              {...form.getInputProps("content")}
            />
            <Button type="submit">Post</Button>
          </Flex>
        </form>
      </Modal>
      <Flex
        direction={"column"}
        // align={"center"}
        h={"100vh"}
        w={"100%"}
        bg={"#ffffff"}
      >
        <Flex
          direction={"column"}
          gap={20}
          w={"100%"}
          h={"100%"}
          flex={1}
          style={{ overflowY: "auto" }}
        >
          <Flex>
            <Button
              onClick={() => signOut({ callbackUrl: "/login" })}
              bg={"gray"}
            >
              <IconLogout2 />
            </Button>
          </Flex>
          <Flex
            direction={"row"}
            // flex={1}
            // align={"center"}
            justify={"space-between"}
          >
            <Title>Forum Discussions</Title>

            <Button onClick={open} bg={"black"} w={150} radius={"md"}>
              <IconPlus size={20} />
              <Text style={{ whiteSpace: "nowrap" }}> New Thread</Text>
            </Button>
          </Flex>

          <Flex direction={"column"} flex={1} gap={30} p={10}>
            {postData?.map((post, index) => (
              <div key={index}>
                <PostCard
                  date={post.createdAt}
                  title={post.title || ""}
                  content={post.content || ""}
                  // person={post.owner?.name || "Unknown"} // the post's author
                  name={upperFirst(post.owner?.name) || "Unknown"} // current user
                  commentClick={() => {
                    router.push(`/thread?id=${post.id}`);
                  }}
                />
              </div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
