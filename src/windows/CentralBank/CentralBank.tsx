import { styled } from "styled-components";
import { Window } from "../../components/Window/Window";
import { useEffect, useState } from "react";
import { useUser } from "../../context/user-context";
import axios from "axios";

interface CentralBankProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CentralBank: React.FC<CentralBankProps> = ({
  isOpen,
  onClose,
}) => {
  const [user, setUser] = useUser();
  const [transfers, setTransfers] = useState<any[]>([]);
  const [processedBlocks, setProcessedBlocks] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
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
    })();

    (async () => {
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
    })();

    (async () => {
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
    })();
  }, []);

  const getTransferMessage = (transfer: any) => {
    return `Player#${transfer.from_player} transferiu ${transfer.amount} MC para Player#${transfer.to_player}`;
  };

  const messages = [...transfers, ...processedBlocks]
    .sort(
      (a, b) =>
        new Date(b?.processedAt ?? b?.createdAt).getTime() -
        new Date(a?.processedAt ?? a?.createdAt).getTime()
    )
    .map((entity) => {
      if (entity.gainedCoins) {
        return `Player#${entity.winner} minerou ${entity.gainedCoins} MC`;
      } else {
        return getTransferMessage(entity);
      }
    });

  return (
    <>
      {isOpen && (
        <Window title="Banco Central" onClose={onClose}>
          <Row>
            <span>Sua Conta</span>
            <span>{user?.coins} MC</span>
          </Row>
          {/* <TransferButton>Transferir</TransferButton> */}
          <TransfersTitle>Suas Transferências:</TransfersTitle>
          <Transfers>
            {messages.map((message) => (
              <Transfer>{message}</Transfer>
            ))}
          </Transfers>
        </Window>
      )}
    </>
  );
};

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TransferButton = styled.div`
  width: 100%;
  cursor: pointer;
  margin-top: 8px;
  padding: 8px 10px;
  background-color: #75a7f8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Transfer = styled.span`
  display: flex;
`;

const TransfersTitle = styled.span`
  margin-top: 8px;
`;

const Transfers = styled.div`
  display: flex;
  flex-direction: column;
`;
