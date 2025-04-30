"use client";
import IPostSchema, { PostSchema } from "@/schema/PostSchema";
import { Button, Flex, Text, TextInput, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/PostCard/PostCard";
import { useSession } from "next-auth/react";
import { signOut } from "@/lib/auth";

export default function Home() {
  const searchParams = useSearchParams();
  const personId = searchParams.get("personId"); // Get personId from query params\

  const session = useSession()

  const { data: postData, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<IPost[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/all`
      );
      return data;
    },
  });

  console.log({ api: process.env.NEXT_PUBLIC_API_URL });
  // Initialize form with dynamic personId if available
  const form = useForm<IPostSchema>({
    validate: yupResolver(PostSchema),
    initialValues: {
      title: "",
      content: "",
      personId: personId || "", // Set personId from query params
    },
  });

  console.log({ss:session});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
        form.values
      );
      if (res.status === 200 || res.status === 201) {
        console.log("Post created successfully");
        refetch();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  console.log(postData);

  return (
    <form onSubmit={handleSubmit}>
      <Flex
        direction={"column"}
        align={"center"}
        h={"100vh"}
        w={"100%"}
        bg={"#ffffff"}
        style={{ border: "2px solid red" }}
      >
        <Button onClick={()=> {
            signOut({ redirect: true});
        }}>Signout</Button>
        <Flex
          direction={"column"}
          gap={20}
          w={"50%"}
          flex={1}
          // style={{ border: "2px solid red" }}
        >
          <Title>My Forum</Title>
          <Text>Share your thoughts and connect with others</Text>
          <Flex
            direction={"column"}
            gap={20}
            flex={1}
            p={20}
            style={{ border: "2px solid red" }}
          >
            <TextInput
              placeholder="Post Title"
              {...form.getInputProps("title")}
            />
            <TextInput
              placeholder="What's on your mind?"
              {...form.getInputProps("content")}
            />
            <Button type="submit">Post</Button>
          </Flex>

          {postData?.map((v, i) => {
            return (
              <Flex direction={"column"} key={i}>
                <PostCard
                  title={v?.title || ""}
                  content={v?.content || ""}
                  person={v.name}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </form>
  );
}
