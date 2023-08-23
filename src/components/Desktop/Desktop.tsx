import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import BackgroundImg from "../../assets/images/background.png";

interface DesktopProps extends PropsWithChildren {}

export const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <Container>
      {children}
      <BackgroundImage src={BackgroundImg} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  flex-wrap: wrap;
  display: flex;

  width: 100%;
  height: 100%;
  padding: 20px;

  gap: 12px;
`;

const BackgroundImage = styled.img`
  position: absolute;
  z-index: -1;
  left: -3px;
  top: -3px;
  width: calc(100% + 6px);
  height: calc(100% + 6px);
  object-fit: cover;
`;
