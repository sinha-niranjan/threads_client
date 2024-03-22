import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link as RouterLink } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  const [updating, setUpdating] = useState(false);
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom); // logged in user
  const [following, setFllowings] = useState(
    user?.followers.includes(currentUser?._id)
  );

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      showToast(
        "Url copied",
        "Profile link copied in your clipboard",
        "success"
      );
    });
  };

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      if (following) {
        showToast("Success", `Unfollow ${user.name}`, "success");
        user.followers.pop(); // simulate removing from followers only for client side
      } else {
        showToast("Success", `Follow ${user.name}`, "success"); // simulate adding from followers only for client side
        user?.followers.push(currentUser?._id);
      }
      setFllowings(!following);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"}>
        <Box>
          <Text
            fontSize={{
              base: "xl",
              md: "2xl",
            }}
            fontWeight={"bold"}
          >
            {user?.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user?.username}</Text>
            <Text
              fontSize={{
                base: "xs",
                md: "sm",
                lg: "md",
              }}
              bg={"gray.dark"}
              p={1}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        {user.profilePic ? (
          <Box>
            <Avatar
              name={user?.name}
              src={user?.profilePic}
              size={{
                base: "md",
                md: "lg",
                lg: "xl",
              }}
            />
          </Box>
        ) : (
          <Box>
            <Avatar
              name={user?.name}
              src={"https://bit.ly/broken-link"}
              size={{
                base: "md",
                md: "lg",
                lg: "xl",
              }}
            />
          </Box>
        )}
      </Flex>
      <Text>{user?.bio}</Text>
      {user._id === currentUser?._id && (
        <Link as={RouterLink} to={"/update"}>
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {user._id !== currentUser?._id && (
        <Button size={"sm"} onClick={handleFollowUnfollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex justifyContent={"space-between"} w={"full"}>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user?.followers?.length} followers</Text>
          <Box h={1} w={1} bg={"gray.light"} borderRadius={"full"}>
            {" "}
          </Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-container">
            <BsInstagram size={24} cursor={"pointer"} />
          </Box>

          <Menu>
            <MenuButton className="icon-container">
              <CgMoreO size={24} cursor={"pointer"} />
            </MenuButton>
            <Portal>
              <MenuList bg={"gray.dark"}>
                <MenuItem bg={"gray.dark"} onClick={copyURL}>
                  Copy link{" "}
                </MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
