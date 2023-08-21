import React, { PropsWithChildren } from "react";
import { Rnd } from "react-rnd";
import { styled } from "styled-components";

import CloseImg from "../../assets/images/close.png";

interface WindowProps extends PropsWithChildren {
  title: string;
  customInitialWidth?: number;
  customInitialHeight?: number;
  onClose?: () => void;
}

export const Window: React.FC<WindowProps> = ({
  title,
  children,
  customInitialWidth,
  customInitialHeight,
  onClose,
}) => {
  return (
    <Rnd
      default={{
        x: 200,
        y: 200,
        width: customInitialWidth ?? 300,
        height: customInitialHeight ?? 250,
      }}
      cancel=".cancel"
    >
      <Container>
        <Header>
          {title}
          <CloseButton src={CloseImg} onClick={onClose} className="cancel" />
        </Header>
        <Content className="cancel">{children}</Content>
      </Container>
    </Rnd>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  flex-basis: 30px;
  flex-shrink: 0;
  background-color: #d1d1d1;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const CloseButton = styled.img`
  margin-left: auto;
  width: 30px;
  height: 30px;
  margin-right: -7px;
  margin-top: -1px;
  cursor: pointer;
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
