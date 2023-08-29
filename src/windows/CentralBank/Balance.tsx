import { styled } from "styled-components";
import { formatCoins } from "../../helpers/formatCoins";
import { theme } from "../../helpers/theme";

interface BalanceProps {
  coins: number;
}

export const Balance: React.FC<BalanceProps> = ({ coins }) => {
  return (
    <BalanceRow>
      <BalanceLabel>Saldo</BalanceLabel>
      <CoinsAmount>{formatCoins(coins)} MC</CoinsAmount>
    </BalanceRow>
  );
};

const BalanceRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 12px;
  background-color: #fff;
  width: 100%;
  border: 2px solid ${theme.colors.dark};
  border-radius: 12px;
`;

const BalanceLabel = styled.span`
  font-size: 14px;
  font-weight: bold;
`;

const CoinsAmount = styled.span`
  color: ${theme.colors.green};
  font-size: 18px;
  font-weight: bold;
`;
