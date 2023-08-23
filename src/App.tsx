import { styled } from "styled-components";
import { Navbar } from "./components/Navbar/Navbar";
import { Desktop } from "./components/Desktop/Desktop";
import { AppIcon } from "./components/AppIcon/AppIcon";

import BankImg from "./assets/images/bank.png";
import { useState } from "react";
import { CentralBank } from "./windows/CentralBank/CentralBank";
import { useUser } from "./context/user-context";
import { LoginPage } from "./windows/LoginPage/LoginPage";

function App() {
  const [user] = useUser();
  const [openWindows, setOpenWindows] = useState<string[]>([]);

  const onOpen = (window: string) => {
    return () => {
      setOpenWindows([...openWindows, window]);
    };
  };

  const onClose = (window: string) => {
    return () => {
      setOpenWindows((openedWindows) =>
        openedWindows.filter((value) => value !== window)
      );
    };
  };

  return (
    <Container>
      {user ? (
        <>
          <Navbar />
          <Desktop>
            <AppIcon
              title="Banco Central"
              icon={BankImg}
              onOpen={onOpen("central-bank")}
            />

            <CentralBank
              isOpen={openWindows.includes("central-bank")}
              onClose={onClose("central-bank")}
            />
          </Desktop>
        </>
      ) : (
        <LoginPage />
      )}
      <AppVersion>beta-0.2.0</AppVersion>
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
