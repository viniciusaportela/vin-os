import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import { theme } from "../../helpers/theme";

interface DesktopProps extends PropsWithChildren {}

export const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  position: relative;

  flex-wrap: wrap;
  display: flex;

  width: 100%;
  height: 100%;
  padding: 20px;

  gap: 12px;

  background-color: ${theme.colors.orange};
`;
