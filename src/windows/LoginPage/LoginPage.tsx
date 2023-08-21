import { styled } from "styled-components";
import { useUser } from "../../context/user-context";
import axios from "axios";

export const LoginPage: React.FC = () => {
  const [, setUser] = useUser();

  const onLogin = async () => {
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
      setUser(user.data);
    }
  };

  return (
    <Container>
      <InputsContainer>
        <h1>Login</h1>
        <Input id="playerName" />
      </InputsContainer>
      <LoginButton onClick={onLogin}>Login</LoginButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  background-color: #75a7f8;
`;

const Input = styled.input`
  background-color: #d1d1d1;
  border: none;
  outline: none;
  padding: 10px;
  width: 250px;
`;

const InputsContainer = styled.div`
  margin-top: -60px;
`;

const LoginButton = styled.div`
  width: 250px;
  background-color: #525252;
  color: white;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
`;
