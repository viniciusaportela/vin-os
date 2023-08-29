import { styled } from "styled-components";
import { Image } from "../Image/Image";

interface AppIconProps {
  title: string;
  icon: string;
  onOpen?: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ title, icon, onOpen }) => {
  return (
    <Container onClick={onOpen}>
      <Icon source={icon} />
      <Text color="white">{title}</Text>
    </Container>
  );
};

const Text = styled.span``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-weight: bold;
  width: 100px;
  height: fit-content;
  padding: 8px 4px;
  user-select: none;
  cursor: pointer;
  border-radius: 12px;

  &:hover {
    outline: 2px solid #9d7c72;
  }
`;

const Icon = styled(Image)`
  width: 48px;
  height: 48px;
  margin-bottom: 6px;
  user-select: none;
`;
