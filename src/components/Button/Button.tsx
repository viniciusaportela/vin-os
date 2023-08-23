import { CSSProperties, PropsWithChildren } from "react";
import { styled } from "styled-components";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  style?: CSSProperties;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, style }) => {
  return (
    <ButtonElement onClick={onClick} style={style}>
      {children}
    </ButtonElement>
  );
};

const ButtonElement = styled.div`
  width: 250px;
  background-color: #525252;
  color: white;
  padding: 10px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
`;
