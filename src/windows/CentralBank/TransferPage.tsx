import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { styled } from "styled-components";
import BackImg from "../../assets/images/back.png";
import { Balance } from "./Balance";
import { useUser } from "../../context/user-context";
import { Divider } from "../../components/Divider/Divider";
import axios from "axios";
import { Alert } from "../../components/Alert/Alert";

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
      <StyledButton onClick={goBack}>
        <BackImage src={BackImg} />
        Voltar
      </StyledButton>
      <Balance coins={user?.coins} />
      <StyledDivider />
      <Label>Quantidade</Label>
      <Input
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
      ></Input>
      <Label>Jogador</Label>
      <Players>
        {players.map((player) => (
          <Player
            onClick={onSelectPlayer(player)}
            selected={player.id === selectedPlayer?.id}
          >
            <Head src={`https://mc-heads.net/avatar/${player.name}`} />
            <PlayerName selected={player.id === selectedPlayer?.id}>
              {player.name}
            </PlayerName>
          </Player>
        ))}
      </Players>
      <CenterButton onClick={transfer}>Transferir</CenterButton>
      <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)} />
    </Container>
  );
};

const Input = styled.input`
  border: 1px solid black;
  padding: 10px;
  margin-top: 2px;
  margin-bottom: 8px;
  background-color: #d9d9d9;
`;

const Head = styled.img`
  width: 40px;
  height: 40px;
`;

const PlayerName = styled.span<{ selected?: boolean }>`
  text-align: center;
  color: ${({ selected }) => (selected ? "white" : "black")};
`;

const Players = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;

const Player = styled.div<{ selected?: boolean }>`
  width: 100px;
  display: flex;
  flex-direction: column;
  background-color: ${({ selected }) => (selected ? "#7564e1" : "transparent")};

  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-bottom: 8px;
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

const BackImage = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  object-fit: contain;
`;

const StyledDivider = styled(Divider)``;
