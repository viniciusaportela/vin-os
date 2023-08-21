import { PropsWithChildren } from "react";
import { styled } from "styled-components";

interface DesktopProps extends PropsWithChildren {}

export const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  flex-wrap: wrap;
  display: flex;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: #75a7f8;

  gap: 10px;
`;
