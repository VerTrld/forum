'use client'
import PostCard from '@/components/PostCard/PostCard';
import { Flex, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React from 'react'

export default function Thread() {

    const searchParams = useSearchParams();
    const id = searchParams.get('id');


    const { data: view, refetch } = useQuery({
        queryKey: ["view", id],
        queryFn: async () => {
          const { data } = await axios.get<IPost>(
            `${process.env.NEXT_PUBLIC_API_URL}/posts/one/${id}`
          );
          return data;
        },
      });


      console.log(view)
  return (
   

    <Flex direction={'column'} w={'100%'} h={'100vh'} >
   <PostCard
  title={view?.title || ''}
  content={view?.content || ''}
  person={view?.name || ''}
  name={view?.name || ''}
/>

    <Title>Comments</Title>

    <Flex direction={'column'} gap={20}>
    {Array.from({ length: 3 }).map((_, index) => (
  <PostCard
    key={index}
    title="TEST"
    content="DADADDADADAD"
    person="DD"
    name="ABC"
  />
))}</Flex>

    </Flex>
  
  )
}
