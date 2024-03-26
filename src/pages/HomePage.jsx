import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const HomePage = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/feed");

        const data = await res.json();
        console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
        }
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, []);
  return (
    <Link to={`/${user.username}`}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visit Profile Page</Button>
      </Flex>
    </Link>
  );
};

export default HomePage;
