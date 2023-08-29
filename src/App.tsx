import { styled } from "styled-components";

import { useUser } from "./context/user-context";
import { LoginPage } from "./windows/LoginPage/LoginPage";
import { VinOsDesktop } from "./windows/VinOsDesktop/VinOsDesktop";

function App() {
  const [user] = useUser();

  return (
    <Container>
      {user ? <VinOsDesktop /> : <LoginPage />}
      <AppVersion>beta-0.2.0b</AppVersion>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const AppVersion = styled.div`
  position: absolute;
  bottom: 8px;
  left: 8px;
  user-select: none;
`;

export default App;
