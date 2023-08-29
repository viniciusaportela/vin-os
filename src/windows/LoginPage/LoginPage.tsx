import { styled } from "styled-components";
import { useUser } from "../../context/user-context";
import axios from "axios";
import { useLocalUser } from "../../helpers/useLocalUser";
import { useEffect, useState } from "react";
import OsLogoImg from "../../assets/images/os_logo.svg";
import { Alert } from "../../components/Alert/Alert";
import { Button } from "../../components/Button/Button";
import { theme } from "../../helpers/theme";
import { Input } from "../../components/Input/Input";

export const LoginPage: React.FC = () => {
  const user = useLocalUser();
  const [, setUser] = useUser();

  const [alertIsOpen, setAlertIsOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_API_URL}/players/get`,
        {
          params: {
            playerName: (
              document.getElementById("playerName") as HTMLInputElement
            ).value,
          },
        }
      );

      if (user.status === 200) {
        localStorage.setItem("user", JSON.stringify(user.data));
        setUser(user.data);
      }
    } catch (err) {
      console.log(err);
      setAlertIsOpen(true);
    }
  };

  return (
    <Container>
      <InputsContainer>
        <OSLogoBig src={OsLogoImg} />
        <NicknameLabel>Nickname:</NicknameLabel>
        <Input id="playerName" />
        <StyledButton onClick={onLogin}>Login</StyledButton>
      </InputsContainer>
      <Alert isOpen={alertIsOpen} onClose={() => setAlertIsOpen(false)} />
    </Container>
  );
};

const StyledButton = styled(Button)`
  width: 250px;
`;

const OSLogoBig = styled.img`
  width: 120px;
  height: 120px;
  user-select: none;
  -webkit-user-drag: none;
  align-self: center;
  margin-bottom: 6px;
`;

const NicknameLabel = styled.span`
  font-weight: 500;
  margin-bottom: 8px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background-color: ${theme.colors.primary};
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
`;
