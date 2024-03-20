import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import Comment from "../components/Comment";

const PostPages = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex>
        <Flex w={"full"} alignItems={"center"} gap={3}>
          <Avatar src="/zuck-avatar.png" size={"md"} name="Mark Zuckerberg" />
          <Flex>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              markzuckerberg
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>
            {" "}
            1d{" "}
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Let&apos;s talk about threads.</Text>
      <Box
        borderRadius={6}
        overflow={"hidden"}
        border={"1px solid"}
        borderColor={"gray.light"}
      >
        <Image src="/post1.png" w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} likes={100} replies={10} />
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment={"Looks really good !"}
        createdAt={"2d"}
        likes={100}
        username={"johndoe"}
        userAvatar={"https://bit.ly/prosper-baba"}
      />{" "}
      <Comment
        comment={"just  good !"}
        createdAt={"1w"}
        likes={45}
        username={"kentdodds"}
        userAvatar={"https://bit.ly/kent-c-dodds"}
      />{" "}
      <Comment
        comment={"Coding is amazing !!"}
        createdAt={"5d"}
        likes={565}
        username={"codebeast"}
        userAvatar={"https://bit.ly/code-beast"}
      />
    </>
  );
};

export default PostPages;
