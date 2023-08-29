import { CSSProperties, PropsWithChildren } from "react";
import { styled } from "styled-components";
import { theme } from "../../helpers/theme";

interface ButtonProps extends PropsWithChildren {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  style,
  className,
  color,
}) => {
  return (
    <ButtonElement
      onClick={onClick}
      style={style}
      className={className}
      color={color}
    >
      {children}
    </ButtonElement>
  );
};

const ButtonElement = styled.div<{ color?: string }>`
  background-color: ${({ color }) => color ?? theme.colors.primary};
  font-weight: bold;
  padding: 10px;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  border-radius: 12px;
  border: 2px solid ${theme.colors.dark};
`;
