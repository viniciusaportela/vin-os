import React, { PropsWithChildren, useRef } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";

import CloseImg from "../../assets/images/close_btn.png";
import Draggable from "react-draggable";

interface WindowProps extends PropsWithChildren {
  title: string;
  customInitialWidth?: number;
  onClose?: () => void;
  onClick?: (ev: any) => void;
  hideButtons?: boolean;
  customHeaderColor?: string;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  customInitialWidth,
  onClick,
  onClose,
  hideButtons,
  customHeaderColor,
}) => {
  const id = useRef(v4());

  return (
    <Draggable
      defaultPosition={{
        x:
          document.documentElement.clientWidth / 2 -
          (customInitialWidth ?? 400) / 2,
        y: document.documentElement.clientHeight / 2 - 200,
      }}
      handle={`.handle-${id.current}`}
      cancel=".cancel"
    >
      <Container onClick={onClick}>
        <Header
          className={`handle-${id.current}`}
          customHeaderColor={customHeaderColor}
        >
          {title}
          {!hideButtons && (
            <CloseButton src={CloseImg} onClick={onClose} className="cancel" />
          )}
        </Header>
        <Content>{children}</Content>
      </Container>
    </Draggable>
  );
};

const Container = styled.div`
  width: 450px;
  height: fit-content;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border: 2px solid #1f1d1d;
`;

const Header = styled.div<{ customHeaderColor?: string }>`
  width: 100%;
  flex-basis: 30px;
  flex-shrink: 0;
  background-color: ${({ customHeaderColor }) =>
    customHeaderColor ?? "#536dfb"};
  color: white;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
`;

const CloseButton = styled.img`
  margin-left: auto;
  width: 30px;
  height: 30px;
  margin-right: -7px;
  margin-top: -1px;
  cursor: pointer;
  user-select: none;
  -webkit-user-drag: none;
`;

const Content = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  cursor: url("./assets/images/mouse.png"), auto;
  padding: 8px;
  padding-top: 4px;
  overflow-y: auto;
  overflow-x: hidden;
`;
