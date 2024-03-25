import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";

const UserPages = () => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setUser(data?.user);
      } catch (error) {
        showToast("Error", error, "error");
        return;
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user && loading)
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );

  if (!user && !loading) return <h1>USER NOT FOUND !!! </h1>;
  return (
    <div>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={401}
        postImg={"/post1.png"}
        postTitle="Let's talk about threads."
      />{" "}
      <UserPost
        likes={451}
        replies={12}
        postImg={"/post2.png"}
        postTitle="Nice turtorial"
      />{" "}
      <UserPost
        likes={321}
        replies={989}
        postImg={"/post3.png"}
        postTitle="I love this guy."
      />
      <UserPost
        likes={212}
        replies={56}
        postTitle="This is my first threads."
      />
    </div>
  );
};

export default UserPages;
