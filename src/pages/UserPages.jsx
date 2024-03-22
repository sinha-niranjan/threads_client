import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPages = () => {
  const showToast = useShowToast();
  const [user, setUser] = useState(null);

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
      }
    };

    getUser();
  }, [username, showToast]);

  if (!user) return null;
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
