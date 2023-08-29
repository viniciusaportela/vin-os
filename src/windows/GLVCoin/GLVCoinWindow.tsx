import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Window } from "../../components/Window/Window";
import { useUser } from "../../context/user-context";
import { ComputersApi } from "../../core/api/ComputersApi";
import { MiningApi } from "../../core/api/MiningApi";
import { formatCoins } from "../../helpers/formatCoins";
import { formatPercent } from "../../helpers/formatPercent";
import { theme } from "../../helpers/theme";
import { ComputerType } from "../../typings/enums";
import { BlockSummary } from "./BlockSummary";

interface GlvCoinWindowProps {
  isOpen?: boolean;
  isVisible?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
}

export const GlvCoinWindow: React.FC<GlvCoinWindowProps> = ({
  isOpen,
  isVisible,
  onClose,
  onMinimize,
}) => {
  const [user] = useUser();
  const [minersCount, setMinersCount] = useState(0);
  const [miningStats, setMiningStats] = useState<any>({});

  useEffect(() => {
    if (isOpen) {
      fetchMiners();
      fetchMiningStats();
    }
  }, [isOpen]);

  const fetchMiners = async () => {
    const computers = await ComputersApi.listComputers(user.id);

    const miners = computers.filter(
      (computer) => computer.type === ComputerType.Miner
    );
    setMinersCount(miners.length);
  };

  const fetchMiningStats = async () => {
    const miningStats = await MiningApi.getStats(user.id);
    console.log(miningStats);
    setMiningStats(miningStats);
  };

  const calcMinedPercent = () => {
    const { currentBlockMinings = [], miningsPerBlock = 1 } = miningStats;

    const minedPercent = currentBlockMinings.length / miningsPerBlock;

    return minedPercent;
  };

  return (
    <>
      {isOpen && (
        <Window
          title="GLV Coin"
          onClose={onClose}
          onMinimize={onMinimize}
          style={{ visibility: isVisible ? "unset" : "hidden" }}
        >
          <Inner>
            <Row>
              <Text>Moedas Mineradas</Text>
              <TextSeparator></TextSeparator>
              <Text style={{ color: theme.colors.green }}>
                {formatCoins(miningStats?.minedCoins ?? 0)}MC
              </Text>
            </Row>
            <Row>
              <Text>Taxa de Sucesso</Text>
              <TextSeparator></TextSeparator>
              <Text>{formatPercent(miningStats?.successRate ?? 0)}</Text>
            </Row>
            <Row>
              <Text>Mineradoras</Text>
              <TextSeparator></TextSeparator>
              <Text>{minersCount}</Text>
            </Row>
            <BlockSummary data={miningStats} />
            <MinedPercent>
              {formatPercent(calcMinedPercent())} Minerado
            </MinedPercent>
          </Inner>
        </Window>
      )}
    </>
  );
};

const MinedPercent = styled.span`
  color: ${theme.colors.orange};
  font-weight: bold;
`;

const Inner = styled.div`
  padding: 12px;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 6px;
`;

const Text = styled.span`
  font-weight: bold;
`;

const TextSeparator = styled.div`
  flex: 1;
`;
