import { styled } from "styled-components";
import OsLogoSvg from "../../assets/images/os_logo.svg";
import { useUser } from "../../context/user-context";
import LogoutImg from "../../assets/images/logout.svg";
import { Image } from "../Image/Image";
import { useWindowsState } from "../../context/windows-state";
import { theme } from "../../helpers/theme";
import { OsWindow } from "../../constants/Windows";

export interface NavbarProps {
  onAppClick?: (window: OsWindow) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAppClick }) => {
  const [, setUser] = useUser();
  const [windowsState] = useWindowsState();

  const onLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Container>
      <OsLogo source={OsLogoSvg} />
      <Apps>
        {windowsState.map((state) => (
          <OpenedAppContainer
            onClick={() => onAppClick?.(state.name as OsWindow)}
          >
            <Image
              source={state.logo}
              style={{ width: 25, height: 25, objectFit: "contain" }}
            />
          </OpenedAppContainer>
        ))}
      </Apps>
      <LogoutButton onClick={onLogout}>
        <Logout source={LogoutImg} />
      </LogoutButton>
    </Container>
  );
};

const OsLogo = styled(Image)`
  height: 80%;
  margin-right: 20px;
`;

const OpenedAppContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: ${theme.colors.primaryFaded};

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const LogoutButton = styled.div`
  cursor: pointer;
  border: 2px #33322e solid;
  border-radius: 12px;
  padding: 10px;
  background-color: ${theme.colors.orange};

  height: 47px;
  width: 47px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 100%;
  height: 70px;
  padding: 5px 20px;
  background-color: #fff;
  border-bottom: 3px solid #212122;
`;

const Apps = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
  flex-direction: row;
`;

const Logout = styled(Image)`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
