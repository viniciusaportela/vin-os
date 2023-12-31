import { styled } from "styled-components";
import { useUser } from "../../context/user-context";
import { useLocalUser } from "../../helpers/useLocalUser";
import { useEffect, useState } from "react";
import OsLogoImg from "../../assets/images/os_logo.svg";
import { Alert } from "../../components/Alert/Alert";
import { Button } from "../../components/Button/Button";
import { theme } from "../../helpers/theme";
import { Input } from "../../components/Input/Input";
import { PlayersApi } from "../../core/api/PlayersApi";

export const LoginPage: React.FC = () => {
  const localUser = useLocalUser();
  const [, setUser] = useUser();

  const [alertIsOpen, setAlertIsOpen] = useState(false);

  useEffect(() => {
    if (localUser) {
      setUser(localUser);
    }
  }, [localUser]);

  const onLogin = async () => {
    try {
      const user = await PlayersApi.get(
        (document.getElementById("playerName") as HTMLInputElement).value
      );

      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } catch (err) {
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
