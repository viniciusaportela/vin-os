import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";
import { Balance } from "./Balance";
import { useUser } from "../../context/user-context";
import axios from "axios";
import { Alert } from "../../components/Alert/Alert";
import { SubHeader } from "../../components/SubHeader/SubHeader";
import { Input, InputLabel } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { PlayerIcon } from "../../components/PlayerIcon/PlayerIcon";

interface TransferPageProps {
  setPage: Dispatch<SetStateAction<string>>;
}

export const TransferPage: React.FC<TransferPageProps> = ({ setPage }) => {
  const [user, setUser] = useUser();

  const [quantity, setQuantity] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useEffect(() => {
    updatePlayers();
  }, []);

  useEffect(() => {
    setSelectedPlayer(players[0]);
  }, [players]);

  const updatePlayers = async () => {
    try {
      const playersRes = await axios.get(
        `${process.env.REACT_APP_API_URL}/players/list`
      );

      if (playersRes.status === 200) {
        setPlayers(
          playersRes.data.filter((player: any) => player.id !== user?.id)
        );
      }
    } catch (err) {}
  };

  const goBack = () => {
    setPage("home");
  };

  const transfer = async () => {
    try {
      const playersRes = await axios.post(
        `${process.env.REACT_APP_API_URL}/players/transferCoins`,
        {
          from: user?.name,
          to: selectedPlayer?.name,
          amount: quantity,
        }
      );

      if (playersRes.status === 200) {
        setUser((user: any) => ({ ...user, coins: user.coins - quantity }));
        goBack();
      }
    } catch (err) {
      console.error(err);
      setIsAlertOpen(true);
    }
  };

  const onSelectPlayer = (player: any) => {
    return () => {
      setSelectedPlayer(player);
    };
  };

  return (
    <Container>
      <StyledSubHeader text="Fazer Transferência" onBack={goBack} />
      <Balance coins={user?.coins} />
      <InputLabel>Quantidade</InputLabel>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
      ></Input>
      <InputLabel>Jogador</InputLabel>
      <Players>
        {players.map((player) => (
          <Player
            onClick={onSelectPlayer(player)}
            selected={player.id === selectedPlayer?.id}
          >
            <PlayerIcon player={player.name} />
            <PlayerName selected={player.id === selectedPlayer?.id}>
              {player.name}
            </PlayerName>
          </Player>
        ))}
      </Players>
      <Button onClick={transfer}>Transferir</Button>
      <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </Container>
  );
};

const StyledSubHeader = styled(SubHeader)`
  margin-top: -8px;
  margin-bottom: 10px;
`;

const PlayerName = styled.span<{ selected?: boolean }>`
  text-align: center;
  color: ${({ selected }) => (selected ? "white" : "black")};
  font-weight: 500;
`;

const Players = styled.div`
  margin-top: 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;

const Player = styled.div<{ selected?: boolean }>`
  display: flex;
  width: 100px;
  flex-direction: column;
  background-color: ${({ selected }) => (selected ? "#7564e1" : "transparent")};

  align-items: center;
  justify-content: center;
  border-radius: 12px;
  padding: 10px;

  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 4px;
`;

const StyledButton = styled.div`
  display: flex;
  align-items: center;
  background-color: #7564e1;
  padding: 10px;
  width: 100%;
  color: white;
  cursor: pointer;
  font-weight: bold;
  border: 1px solid black;
`;

const CenterButton = styled(StyledButton)`
  justify-content: center;
`;
