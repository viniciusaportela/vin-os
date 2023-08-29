import React, { PropsWithChildren, useRef } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";

import Draggable from "react-draggable";
import { theme } from "../../helpers/theme";
import { Modal } from "../Modal/Modal";

interface WindowProps extends PropsWithChildren {
  title: string;
  customInitialWidth?: number;
  onClose?: () => void;
  onMinimize?: () => void;
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
  onMinimize,
  hideButtons,
  customHeaderColor,
}) => {
  const id = useRef(v4());

  return (
    <Modal>
      <Draggable
        defaultPosition={{
          x:
            document.documentElement.clientWidth / 2 -
            (customInitialWidth ?? 400) / 2,
          y: document.documentElement.clientHeight / 2 - 200,
        }}
        handle={`.handle-${id.current}`}
        cancel=".cancel"
        bounds="body"
      >
        <Container onClick={onClick}>
          <CardOuterWrapper>
            <Content>
              <Header
                className={`handle-${id.current}`}
                customHeaderColor={customHeaderColor}
              >
                <HeaderSide />
                <Title>{title}</Title>
                {!hideButtons && (
                  <HeaderSide style={{ justifyContent: "flex-end" }}>
                    <HeaderButton
                      color={theme.colors.yellow}
                      style={{ paddingTop: 4 }}
                      onClick={onMinimize}
                    >
                      -
                    </HeaderButton>
                    <HeaderButton onClick={onClose} color={theme.colors.orange}>
                      x
                    </HeaderButton>
                  </HeaderSide>
                )}
              </Header>
              <Children>{children}</Children>
            </Content>
            <Shadow />
          </CardOuterWrapper>
        </Container>
      </Draggable>
    </Modal>
  );
};

const Title = styled.span`
  margin-top: -6px;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding-top: 4px;
  overflow-y: hidden;
  overflow-x: hidden;
`;

const HeaderSide = styled.div`
  display: flex;
  flex: 1;
  gap: 4px;
`;

const Children = styled.div`
  flex: 1;
`;

const CardOuterWrapper = styled.div`
  position: relative;
`;

const Shadow = styled.div`
  background-color: ${theme.colors.dark};
  position: absolute;
  z-index: -1;
  left: 12px;
  top: 12px;
  right: -11px;
  bottom: -11px;
  border-radius: 12px;
`;

const Container = styled.div`
  width: 450px;
  height: fit-content;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 3px solid ${theme.colors.dark};
  background-color: white;

  position: absolute;
  left: 0;
  top: 0;
`;

const Header = styled.div<{ customHeaderColor?: string }>`
  width: 100%;
  flex-basis: 30px;
  flex-shrink: 0;
  font-weight: bold;
  font-size: 16px;
  display: flex;
  align-items: center;
  padding: 4px 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 2px solid ${theme.colors.dark};
`;

const HeaderButton = styled.div<{ color: string }>`
  border-radius: 8px;
  width: 30px;
  height: 30px;
  padding: 8px;
  padding-top: 2px;
  background-color: ${({ color }) => color};
  cursor: pointer;

  border: 2px solid ${theme.colors.dark};

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
  vertical-align: middle;
`;
