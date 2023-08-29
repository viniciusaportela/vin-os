import { styled } from "styled-components";
import { Window } from "../../components/Window/Window";
import { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";
import axios from "axios";
import { TransferPage } from "./TransferPage";
import { formatCoins } from "../../helpers/formatCoins";
import { Balance } from "./Balance";
import { Button } from "../../components/Button/Button";
import { Divider } from "../../components/Divider/Divider";

interface CentralBankProps {
  isOpen?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
}

export const CentralBank: React.FC<CentralBankProps> = ({
  isOpen,
  isVisible,
  onClose,
  onMinimize,
}) => {
  const [page, setPage] = useState("home");
  const [user, setUser] = useUser();
  const [transfers, setTransfers] = useState<any[]>([]);
  const [processedBlocks, setProcessedBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (page === "home") {
      updateUser();
      updateTransfers();
      updateProcessedBlocks();
    }
  }, [page]);

  const updateUser = async () => {
    try {
      const userRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/players/get`,
        {
          params: {
            playerName: user.name,
          },
        }
      );

      if (userRes.status === 200) {
        setUser(userRes.data);
      }
    } catch (err) {}
  };

  const updateProcessedBlocks = async () => {
    try {
      const processedBlocks = await axios.get(
        `${process.env.REACT_APP_API_URL}/mining/listProcessedBlocksWithPlayer`,
        {
          params: {
            playerId: user.id,
          },
        }
      );

      if (processedBlocks.status === 200) {
        setProcessedBlocks(processedBlocks.data);
      }
    } catch (err) {}
  };

  const updateTransfers = async () => {
    try {
      const transfers = await axios.get(
        `${process.env.REACT_APP_API_URL}/transfers/listFromPlayer`,
        {
          params: {
            playerId: user.id,
          },
        }
      );

      if (transfers.status === 200) {
        setTransfers(transfers.data);
      }
    } catch (err) {}
  };

  const getTransferMessage = (transfer: any) => {
    return `Player#${transfer.from_player} transferiu ${transfer.amount}MC para Player#${transfer.to_player}`;
  };

  const messages = [...transfers, ...processedBlocks]
    .sort(
      (a, b) =>
        new Date(b?.processedAt ?? b?.createdAt).getTime() -
        new Date(a?.processedAt ?? a?.createdAt).getTime()
    )
    .map((entity) => {
      if (entity.gainedCoins) {
        return `Player#${entity.winner} minerou ${formatCoins(
          entity.gainedCoins
        )} MC`;
      } else {
        return getTransferMessage(entity);
      }
    });

  const goToTransfer = () => {
    setPage("transfer");
  };

  return (
    <>
      {isOpen && (
        <Window
          title="Banco Central"
          onClose={onClose}
          onMinimize={onMinimize}
          style={{ visibility: isVisible ? "unset" : "hidden" }}
        >
          {page === "home" && (
            <>
              <InnerPadding style={{ paddingBottom: 0 }}>
                <Balance coins={user?.coins} />
                <TransferButton onClick={goToTransfer}>
                  Fazer Transferência
                </TransferButton>
                <StyledDivider />
                <TransfersTitle>Suas Transações</TransfersTitle>
              </InnerPadding>
              <TransfersScrollContainer>
                {messages.length === 0 && (
                  <NoTransfers>Sem transações</NoTransfers>
                )}
                {messages.map((message) => (
                  <Transfer>{message}</Transfer>
                ))}
              </TransfersScrollContainer>
            </>
          )}
          {page === "transfer" && (
            <InnerPadding>
              <TransferPage setPage={setPage} />
            </InnerPadding>
          )}
        </Window>
      )}
    </>
  );
};

CentralBank.defaultProps = {
  isVisible: true,
};

const InnerPadding = styled.div`
  padding: 14px;
`;

const TransfersScrollContainer = styled.div`
  padding: 14px;
  margin-top: 6px;
  padding-top: 0px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  max-height: 250px;
  overflow: auto;
  flex: 1;
  gap: 4px;
`;

const NoTransfers = styled.span``;

const StyledDivider = styled(Divider)`
  margin-top: 12px !important;
  margin-left: -20px !important;
  width: calc(100% + 40px) !important;
`;

const TransferButton = styled(Button)`
  width: 100%;
`;

const Transfer = styled.span`
  display: flex;
`;

const TransfersTitle = styled.span`
  display: flex;
  margin-top: 12px;
  font-size: 16px;
  font-weight: 800;
`;
