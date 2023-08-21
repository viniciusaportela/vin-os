import { styled } from "styled-components";

interface AppIconProps {
  title: string;
  icon: string;
  onOpen?: () => void;
}

export const AppIcon: React.FC<AppIconProps> = ({ title, icon, onOpen }) => {
  return (
    <Container onClick={onOpen}>
      <Icon src={icon} draggable={false} />
      {title}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 60px;
  padding: 4px;
  height: fit-content;
  user-select: none;

  &:hover {
    border: 2px solid #d1d1d1;
  }
`;

const Icon = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 4px;
  user-select: none;
`;
