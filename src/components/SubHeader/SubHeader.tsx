import { styled } from "styled-components";
import { Image } from "../Image/Image";
import BackImg from "../../assets/images/back.svg";

interface SubHeaderProps {
  text: string;
  onBack?: () => void;
  className?: string;
}

export const SubHeader: React.FC<SubHeaderProps> = ({
  text,
  onBack,
  className,
}) => {
  return (
    <Container className={className}>
      <Side>
        <GoBackButton source={BackImg} onClick={onBack} />
      </Side>
      <Center>
        <Text>{text}</Text>
      </Center>
      <Side></Side>
    </Container>
  );
};

const GoBackButton = styled(Image)`
  width: 28px;
  height: 28px;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Side = styled.div`
  flex: 1;
`;

const Text = styled.span`
  display: flex;
  margin-top: -8px;
  font-size: 16px;
  font-weight: bold;
`;

const Center = styled.div``;
