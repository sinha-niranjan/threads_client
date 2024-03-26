import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogout = async () => {
    try {
      //fetch
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = res.json();

      if (data.error) {
        showToast("Error", data.error, "erorr");
        return;
      }

      localStorage.removeItem("user-threads");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button
      position={"fixed"}
      top={{ md: "30px", sm: "50px" }}
      right={"30px"}
      size={"sm"}
      bg={colorMode === "dark" ? "gray.900" : "gray.300"}
      onClick={handleLogout}
    >
      <FiLogOut size={20} />
    </Button>
  );
};

export default LogoutButton;
