import { styled } from "styled-components";
import { useUser } from "../../context/user-context";

export const Navbar = () => {
  const [user] = useUser();

  return (
    <Container>
      <PlayerIcon src={`https://mc-heads.net/avatar/${user?.name}`} />
    </Container>
  );
};

const PlayerIcon = styled.img`
  height: 100%;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  padding: 5px 30px;
  background-color: #c7c2c2;
`;
