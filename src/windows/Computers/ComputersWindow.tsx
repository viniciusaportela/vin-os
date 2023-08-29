import { styled } from "styled-components";
import { Window } from "../../components/Window/Window";
import { useEffect, useState } from "react";
import { ComputersApi } from "../../core/api/ComputersApi";
import { useUser } from "../../context/user-context";
import { theme } from "../../helpers/theme";
import { Image } from "../../components/Image/Image";

import CommonComputerImg from "../../assets/images/computer_common.svg";
import MinerComputerImg from "../../assets/images/computer_miner.svg";
import ShopComputerImg from "../../assets/images/computer_shop.svg";
import { ComputerType } from "../../typings/enums";

interface ComputersWindowProps {
  isOpen?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
}

export const ComputersWindow: React.FC<ComputersWindowProps> = ({
  onClose,
  onMinimize,
  isOpen,
  isVisible,
}) => {
  const [user] = useUser();
  const [computers, setComputers] = useState<IComputer[]>([]);

  useEffect(() => {
    fetchComputers();
  }, []);

  const fetchComputers = async () => {
    try {
      const computers = await ComputersApi.listComputers(user.id);
      setComputers(computers);
    } catch (err) {
      // TODO alert user
    }
  };

  const getImageByType = (computer: IComputer) => {
    const bindings: Record<ComputerType, string> = {
      [ComputerType.Common]: CommonComputerImg,
      [ComputerType.Miner]: MinerComputerImg,
      [ComputerType.Shop]: ShopComputerImg,
    };

    return bindings[computer.type];
  };

  return (
    <>
      {isOpen && (
        <Window
          title="Meus Computadores"
          onClose={onClose}
          onMinimize={onMinimize}
          style={{ visibility: isVisible ? "unset" : "hidden" }}
        >
          <Computers>
            {computers.length === 0 && (
              <NoComputers>Sem computadores</NoComputers>
            )}
            {computers.map((computer) => (
              <Computer>
                <ComputerImage source={getImageByType(computer)} />
                <Col>
                  <ComputerId>Computer#{computer.id}</ComputerId>
                  <ComputerName>{computer.type}</ComputerName>
                </Col>
              </Computer>
            ))}
          </Computers>
        </Window>
      )}
    </>
  );
};

const ComputerImage = styled(Image)`
  width: 50px;
  height: 50px;
  margin-right: 12px;
`;

const ComputerId = styled.span`
  font-weight: bold;
`;

const ComputerName = styled.span`
  font-size: 14px;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-start;
`;

const NoComputers = styled.span`
  font-size: 14px;
  font-weight: 500;
  font-style: italic;
  padding: 40px 0;
`;

const Computers = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  overflow-y: auto;
  max-height: 400px;
  gap: 12px;
`;

const Computer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  border: 2px solid ${theme.colors.dark};
  padding: 12px;
  border-radius: 12px;
`;
