import { styled } from "styled-components";
import { Window } from "../../components/Window/Window";
import { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";
import axios from "axios";
import { TransferPage } from "./TransferPage";
import { formatCoins } from "../../helpers/formatCoins";
import { Balance } from "./Balance";

interface CentralBankProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CentralBank: React.FC<CentralBankProps> = ({
  isOpen,
  onClose,
}) => {
  const [page, setPage] = useState("home");
  const [user, setUser] = useUser();
  const [transfers, setTransfers] = useState<any[]>([]);
  const [processedBlocks, setProcessedBlocks] = useState<any[]>([]);

  useEffect(() => {
    updateUser();
    updateTransfers();
    updateProcessedBlocks();
  }, []);

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
        <Window title="Banco Central" onClose={onClose}>
          {page === "home" && (
            <>
              <Balance coins={user?.coins} />
              <TransferButton onClick={goToTransfer}>
                Fazer Transferência
              </TransferButton>
              <TransfersTitle>Transações</TransfersTitle>
              <Transfers>
                {messages.length === 0 && (
                  <NoTransfers>Sem transações</NoTransfers>
                )}
                {messages.map((message) => (
                  <Transfer>{message}</Transfer>
                ))}
              </Transfers>
            </>
          )}
          {page === "transfer" && <TransferPage setPage={setPage} />}
        </Window>
      )}
    </>
  );
};

const NoTransfers = styled.span``;

const TransferButton = styled.div`
  width: 100%;
  cursor: pointer;
  margin-top: 8px;
  font-weight: 600;
  padding: 8px 10px;
  background-color: #7564e1;
  border: 1px solid #1f1d1d;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Transfer = styled.span`
  display: flex;
`;

const TransfersTitle = styled.span`
  margin-top: 8px;
  font-size: 16px;
  font-weight: bold;
`;

const Transfers = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
