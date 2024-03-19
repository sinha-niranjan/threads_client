import { Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import UserPages from "./pages/UserPages";
import PostPages from "./pages/PostPages";
import Header from "./components/Header";

function App() {
  return (
    <Container maxWidth={"620px"}>
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPages />} />
        <Route path="/:username/post/:pid" element={<PostPages />} />
      </Routes>
    </Container>
  );
}

export default App;
