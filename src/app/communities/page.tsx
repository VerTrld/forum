"use client";
import CommunitiesCard from "@/components/CommunitiesCard/CommunitiesCard";
import DashboardCard from "@/components/DashboardCard/DashboardCard";
import Nav from "@/components/Nav/Nav";
import { Flex, Grid, Paper, Stack, Tabs, Text, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Communities() {
  const session = useSession();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Flex direction="column" h="100vh" w="100%" bg="#ffffff">
      <Nav
        open={open}
        person={session.data?.user?.name || ""}
        onClick={() => signOut()}
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
        <Flex
          direction="column"
          mt={30}
          w="100%"
          h="100%"
          maw="900px"
          mah="180px"
          style={{
            border: "2px solid red",
            padding: "16px",
            gap: "12px",
            borderRadius: "10px",
          }}
        >
          <Title>Communities</Title>
          <Text>Discover and join communities that match your interests</Text>
        </Flex>

        <Flex direction="row" w="100%" h="100%" maw="900px" gap={50}>
          <Grid flex={1} style={{ border: "2px solid red" }}>
            <Grid.Col span={{ base: 12, sm: 12, lg: 9 }}>
              <Tabs defaultValue="first" flex={1}>
                <Tabs.List grow>
                  <Tabs.Tab value="first">First tab</Tabs.Tab>
                  <Tabs.Tab value="second">Second tab</Tabs.Tab>
                  <Tabs.Tab value="third">Third tab</Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="first">
                  <Stack flex={1} gap={10}>
                    <Text fw={700}>Channels</Text>
                    <Paper h={"70px"} withBorder>
                      <Flex
                        justify={"space-between"}
                        p={10}
                        onClick={() => router.push("/channels")}
                      >
                        <Text>General</Text>
                        <Text>100 posts</Text>
                      </Flex>
                    </Paper>
                    <Paper h={"70px"} withBorder>
                      <Flex justify={"space-between"} p={10}>
                        <Text>Web develpment</Text>
                        <Text>50 posts</Text>
                      </Flex>
                    </Paper>
                    <Paper h={"70px"} withBorder>
                      <Flex justify={"space-between"} p={10}>
                        <Text>Announcement</Text>
                        <Text>12 posts</Text>
                      </Flex>
                    </Paper>
                  </Stack>
                </Tabs.Panel>
                <Tabs.Panel value="second">Messages tab content</Tabs.Panel>
                <Tabs.Panel value="third">Settings tab content</Tabs.Panel>
              </Tabs>
            </Grid.Col>

            <Grid.Col
              span={{ base: 12, sm: 7, lg: 3 }}
              style={{ display: "flex", justifyContent: "end" }}
            >
              <Stack maw="250px">
                <Paper shadow="xs" p="xl">
                  <Flex direction={"column"}>
                    <Text>Community Stats</Text>
                    <Text>Total Members 1,247</Text>
                    <Text>Online Now 89</Text>
                    <Text>Total Posts 257</Text>
                    <Text>Posts Today 23</Text>
                    <Text>Weekly Active 456</Text>
                  </Flex>
                </Paper>
                <Paper shadow="xs" p="xl">
                  <Text>Paper is the most basic UI component</Text>
                  <Text>
                    Use it to create cards, dropdowns, modals, and other
                    components that require background with shadow.
                  </Text>
                </Paper>
              </Stack>
            </Grid.Col>
          </Grid>
        </Flex>

        {/* <Flex justify="center" align="center" w="100%" maw="900px" mx="auto">
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
        </Flex> */}

        {/* Centered Grid Container */}
        {/* <Flex justify="center" align="center" w="100%" maw="900px" mx="auto">
          <Grid w="100%" gutter="md">
            {[...Array(6)].map((_, index) => (
              <Grid.Col
                key={index}
                span={{ base: 12, sm: 6, lg: 4 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <CommunitiesCard />
              </Grid.Col>
            ))}
          </Grid>
        </Flex> */}

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
  );
}
