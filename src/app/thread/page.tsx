// File: src/app/thread/page.js
"use client";
import PostCard from "@/components/PostCard/PostCard";
import ICommentSchema, { CommentSchema } from "@/schema/CommentSchema";
import { Button, Flex, Text, Textarea, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { IconArrowLeft, IconChevronLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

// Create a separate component that uses useSearchParams
function ThreadContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: view } = useQuery({
    queryKey: ["view", id],
    queryFn: async () => {
      const { data } = await axios.get<IPost>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/one/${id}`
      );
      return data;
    },
  });
  const { data: comments, refetch: refetchComment } = useQuery({
    queryKey: ["comment"],
    queryFn: async () => {
      const { data } = await axios.get<IComment[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`
      );
      return data;
    },
  });

  const router = useRouter();
  const form = useForm<ICommentSchema>({
    validate: yupResolver(CommentSchema),
    initialValues: {
      content: "",
      postId: "",
    },
  });

  const session = useSession();

  console.log(view);

  return (
    <Flex direction={"column"} w={"100%"} h={"100vh"} >
      <Flex        direction={'row'} p={'5px 10px 5px 10px'} >
        <Button
          variant="outline"
          color="black"
          onClick={() => router.push("/")}
   
        >
          {/* <IconArrowLeft color="black" />
          <Text c={"black"}>Back</Text> */}
        <IconChevronLeft/>

        </Button>
      </Flex>
      <Flex direction={"column"} flex={1} align={'center'} p={10} style={{ overflowY: "auto" }}>
          <Flex direction={"column"} w={'100%'} maw={'900px'} >
            <PostCard
              date={view?.createdAt || ""}
              title={view?.title || ""}
              content={view?.content || ""}
              name={view?.owner?.name || ""}
              threadView={false}
              commentView={false}
              lineClampContent={false}
            />
          </Flex>
        <Flex direction={"column"} p={10} w={'100%'} maw={'900px'} >
          <Flex direction={"column"} gap={30}>
            <Flex direction={"column"} gap={10} justify={"end"}>
              <Title order={3}>Add a Comment</Title>
              <Textarea
                placeholder="Write your comment here"
                {...form.getInputProps("content")}
              />
              <Flex justify={'end'} p={0}>
                <Button
               
                  bg={"#020817"}
                  fz={'12px'}
                  onClick={async () => {
                    try {
                      const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/comments`,
                        {
                          ...form.values,
                          postId: id,
                          personId: session.data?.user?.id,
                        }
                      );

                      if (res.status === 200 || res.status === 201) {
                        refetchComment();
                        form.reset();
                      }
                    } catch {}
                  }}
                >
                  Post Comment
                </Button>
              </Flex>
            </Flex>
            {comments?.map((v, index) => (
              <div key={index}>
                <PostCard
                  date={v.createdAt}
                  key={index}
                  title=""
                  content={v.content}
                  name={v.owner.name}
                  commentView={false}
                  threadView={false}
                />
              </div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

// Loading fallback component
function ThreadLoading() {
  return (
    <Flex direction={"column"} w={"100%"} h={"100vh"} gap={20} p={20}>
      <Text>Loading thread...</Text>
    </Flex>
  );
}

// Main Thread component that wraps the content in Suspense
export default function Thread() {
  return (
    <Suspense fallback={<ThreadLoading />}>
      <ThreadContent />
    </Suspense>
  );
}
