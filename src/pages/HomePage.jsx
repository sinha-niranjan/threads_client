import { Button, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { BsTypeH1 } from "react-icons/bs";
import Post from "../components/Post";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      setPosts([])
      try {
        const res = await fetch("/api/post/feed");

        const data = await res.json();

        setPosts(data);
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
  }, [showToast, setPosts]);
  return (
    <>
      {!loading && posts.length === 0 && (
        <h1>
          {" "}
          Follow some users to see the feed. or your followed users has not
          posted yet anything.
        </h1>
      )}
      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
