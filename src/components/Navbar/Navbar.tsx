import { styled } from "styled-components";
import OsLogoSvg from "../../assets/images/os_logo.svg";
import { Divider } from "../Divider/Divider";
import { useUser } from "../../context/user-context";
import LogoutImg from "../../assets/images/logout.png";

export const Navbar = () => {
  const [, setUser] = useUser();

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Container>
      <OsLogo src={OsLogoSvg} />
      <Divider vertical />
      <Apps></Apps>
      <Logout onClick={onLogout} src={LogoutImg} />
    </Container>
  );
};

const OsLogo = styled.img`
  height: 100%;
  margin-right: 8px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 5px 20px;
  background-color: #fff;
  border-bottom: 2px solid #212122;
`;

const Apps = styled.div`
  flex: 1;
`;

const Logout = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
