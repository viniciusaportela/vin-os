import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import { theme } from "../../helpers/theme";

interface DesktopProps extends PropsWithChildren {}

export const Desktop: React.FC<DesktopProps> = ({ children }) => {
  return (
    <Container>
      <Grid>{children}</Grid>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  position: relative;

  width: 100%;
  height: 100%;
  padding: 20px;

  background-color: ${theme.colors.orangeFaded};
`;

const Grid = styled.div`
  width: 100%;
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, 110px);
  grid-gap: 22px;
`;
