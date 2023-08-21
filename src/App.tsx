import { styled } from "styled-components";
import { Navbar } from "./components/Navbar/Navbar";
import { Desktop } from "./components/Desktop/Desktop";
import { AppIcon } from "./components/AppIcon/AppIcon";

import BankImg from "./assets/images/bank.jpg";
// import CoinImg from "./assets/images/coin.png";
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
            {/* <AppIcon title="GLV Coin" icon={CoinImg} onOpen={onOpen("glv-coin")} /> */}
            {/* <AppIcon title="My Computers" icon={} /> */}

            <CentralBank
              isOpen={openWindows.includes("central-bank")}
              onClose={onClose("central-bank")}
            />
          </Desktop>
        </>
      ) : (
        <LoginPage />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default App;
