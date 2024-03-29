import {
  Avatar,
  Box,
  Flex,
  Image,
  Skeleton,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectedConversationAtom } from "../atoms/messagesAtom";
import userAtom from "../atoms/userAtom";
import { BsCheck2All } from "react-icons/bs";

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom);
  const [imgLoaded, setImgLoaded] = useState(false);
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {message.text && (
            <Flex
              bg={useColorModeValue("green.500", "green.800")}
              maxW={"350px"}
              p={1}
              borderRadius={"md"}
            >
              <Text color={"white"}>{message?.text}</Text>
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <BsCheck2All size={16} />
              </Box>
            </Flex>
          )}

          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                borderRadius={4}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="Message image"
                src={message.img}
              />
              <Skeleton w={"200px"} h={"300px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image borderRadius={4} alt="Message image" src={message.img} />
              <Box
                alignSelf={"flex-end"}
                ml={1}
                color={message.seen ? "blue.400" : ""}
                fontWeight={"bold"}
              >
                <BsCheck2All size={16} />
              </Box>
            </Flex>
          )}

          <Avatar src={user.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src={selectedConversation?.userProfilePic} w={7} h={7} />
          {message.text && (
            <Text
              maxW={"350px"}
              bg={useColorModeValue("gray.100", "gray.400")}
              p={1}
              borderRadius={"md"}
              color={"black"}
            >
              {message?.text}
            </Text>
          )}

          {message.img && !imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image
                borderRadius={4}
                hidden
                onLoad={() => setImgLoaded(true)}
                alt="Message image"
                src={message.img}
              />
              <Skeleton w={"200px"} h={"300px"} />
            </Flex>
          )}
          {message.img && imgLoaded && (
            <Flex mt={5} w={"200px"}>
              <Image borderRadius={4} alt="Message image" src={message.img} />
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default Message;
