import { styled } from "styled-components";
import { Text } from "../Text/Text";

interface AppIconProps {
  title: string;
  icon: string;
  onOpen?: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ title, icon, onOpen }) => {
  return (
    <Container onClick={onOpen}>
      <Icon src={icon} draggable={false} />
      <Text color="white" withShadow={`#1F1D1D`} style={{ fontSize: 14 }}>
        {title}
      </Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-weight: bold;
  width: 84px;
  padding: 4px;
  height: fit-content;
  user-select: none;
  cursor: pointer;

  &:hover {
    outline: 2px solid #9d7c72;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 6px;
  user-select: none;
`;
