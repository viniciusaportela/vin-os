import { styled } from "styled-components";
import { Window } from "../Window/Window";
import ErrorImg from "../../assets/images/error.svg";
import { theme } from "../../helpers/theme";
import { Image } from "../Image/Image";
import { Button } from "../Button/Button";

interface AlertProps {
  isOpen?: boolean;
  onClose?: () => void;
  text?: string;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, onClose, text }) => {
  if (!isOpen) return <></>;

  const preventDefault = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  return (
    <Window
      title="Erro"
      onClose={onClose}
      hideButtons
      customHeaderColor={theme.colors.redFaded}
      onClick={preventDefault}
      backdrop
      onBackdropClick={onClose}
    >
      <WindowInner>
        <Row>
          <Side>
            <AlertImage source={ErrorImg} />
          </Side>
          <Center>{text ?? `Um Erro Aconteceu!`}</Center>
          <Side />
        </Row>
        <AlertButton onClick={onClose} color={theme.colors.redFaded}>
          OK
        </AlertButton>
      </WindowInner>
    </Window>
  );
};

const AlertButton = styled(Button)`
  width: 90%;
  margin-bottom: 14px;
`;

const WindowInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  margin-top: 8px;
`;

const Side = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 3;
`;

const AlertImage = styled(Image)`
  margin-top: 8px;
  margin-bottom: 8px;
  width: 60px;
  height: 60px;
`;
