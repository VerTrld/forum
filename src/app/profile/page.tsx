// File: src/app/thread/page.js
"use client";
import PostCard from "@/components/PostCard/PostCard";
import ICommentSchema, { CommentSchema } from "@/schema/CommentSchema";
import { Button, Flex, Text, Textarea, Title } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

// Create a separate component that uses useSearchParams
function ProfileContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: profile, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axios.get<IPost[]>(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/owner/${id}`
      );
      return data;
    },
  });

  console.log(profile);

  const router = useRouter();

  const session = useSession();

  return (
    <Flex direction={"column"} w={"100%"} h={"100vh"} gap={20}>
      <Flex>
        <Button
          variant="outline"
          color="black"
          onClick={() => router.push("/")}
        >
          <IconArrowLeft color="black" />
          <Text c={"black"}>Back</Text>
        </Button>
      </Flex>
      <Flex direction={"column"} flex={1} p={10} style={{ overflowY: "auto" }}>
        <Flex direction={"column"} gap={30}>
          {profile?.map((v, index) => (
            <div key={index}>
              <PostCard
                date={v.createdAt}
                key={index}
                title={v.title}
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
  );
}

// Loading fallback component
function ProfileLoading() {
  return (
    <Flex direction={"column"} w={"100%"} h={"100vh"} gap={20} p={20}>
      <Text>Loading thread...</Text>
    </Flex>
  );
}

// Main Thread component that wraps the content in Suspense
export default function Profile() {
  return (
    <Suspense fallback={<ProfileLoading />}>
      <ProfileContent />
    </Suspense>
  );
}
