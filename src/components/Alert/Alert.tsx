import { styled } from "styled-components";
import { Window } from "../Window/Window";
import AlertImg from "../../assets/images/alert.png";
import { Modal } from "../Modal/Modal";

interface AlertProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return <></>;

  const preventDefault = (ev: React.MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    ev.stopPropagation();
  };

  return (
    <Modal>
      <Container onClick={onClose}>
        <Window
          title="Error"
          onClose={onClose}
          hideButtons
          customHeaderColor="#EE5253"
          onClick={preventDefault}
        >
          <WindowInner>
            <AlertImage src={AlertImg} />
            Um Erro Ocorreu!
            <AlertButton onClick={onClose}>OK</AlertButton>
          </WindowInner>
        </Window>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
`;

const WindowInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
`;

const AlertImage = styled.img`
  margin-top: 8px;
  margin-bottom: 8px;
  width: 60px;
  height: 60px;
`;

const AlertButton = styled.div`
  margin-top: 12px;
  width: 100%;
  cursor: pointer;
  background-color: #7564e1;
  color: white;
  border: 1px solid #1f1d1d;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
