"use client";
import IPostSchema, { PostSchema } from "@/schema/PostSchema";
import { Button, Flex, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/PostCard/PostCard";
import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const searchParams = useSearchParams();
  const personId = searchParams.get("personId"); // Get personId from query params\
   const router = useRouter()

  const session = useSession()

  const { data: postData, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data } = await axios.get<IPost[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/owner/${session.data?.user?.id}`
      );
      return data;
    },
  });

  console.log({ id: session.data?.user?.id });
  // Initialize form with dynamic personId if available
  const form = useForm<IPostSchema>({
    validate: yupResolver(PostSchema),
    initialValues: {
      title: "",
      content: "",
      personId: personId || "", // Set personId from query params
    },
  });

  console.log({ss:session.data?.user?.id});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/create`,
        {...form.values,
          personId: session.data?.user?.id
        }
      );
      if (res.status === 200 || res.status === 201) {
        console.log("Post created successfully");
        form.reset();
        refetch();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  console.log(postData);

  return (
<>
<Button onClick={() => signOut({ callbackUrl: '/login' })}>
  Sign Out
</Button>


    
    <form onSubmit={handleSubmit}>
      <Flex
        direction={"column"}
        align={"center"}
        h={"100vh"}
        w={"100%"}
        bg={"#ffffff"}
        style={{ border: "2px solid red" }}
      >

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

             <Textarea
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
                  name={(session.data?.user?.name)?.toUpperCase() || '' }
                  commentClick={()=> {
                    router.push(`/thread?id=${v.id}`);

                    
                  }}
                />
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </form>
    </>
  );
}
