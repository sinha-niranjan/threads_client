import { Avatar, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
            aecati libero, laborum ea dolores hic quam excepturi iste odit.
          </Text>
          <Avatar src="" w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w={7} h={7} />
          <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md" } color={"black"}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quaerat
            caecati libero, laborum ea dolores hic quam excepturi iste odit.
          </Text>
        </Flex>
      )}
    </>
  );
};

export default Message;
