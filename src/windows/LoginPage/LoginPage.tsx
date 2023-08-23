import { styled } from "styled-components";
import { useUser } from "../../context/user-context";
import axios from "axios";
import { useLocalUser } from "../../helpers/useLocalUser";
import { useEffect, useState } from "react";
import OsLogoBigImg from "../../assets/images/os_logo_big.png";
import { Alert } from "../../components/Alert/Alert";
import { Button } from "../../components/Button/Button";

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
        <OSLogoBig src={OsLogoBigImg} />
        <NicknameLabel>Nickname:</NicknameLabel>
        <Input id="playerName" />
      </InputsContainer>
      <Button onClick={onLogin}>Login</Button>
      <Alert isOpen={alertIsOpen} onClose={() => setAlertIsOpen(false)} />
    </Container>
  );
};

const OSLogoBig = styled.img`
  width: 120px;
  height: 120px;
  user-select: none;
  -webkit-user-drag: none;
  align-self: center;
  margin-bottom: 6px;
`;

const NicknameLabel = styled.span`
  font-weight: bold;
  color: white;
  margin-bottom: 8px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background-color: #1f1d1d;
`;

const Input = styled.input`
  background-color: #403e3e;
  color: white;
  border: 1px solid #000;
  border: none;
  outline: none;
  padding: 10px;
  width: 250px;
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -60px;
`;
