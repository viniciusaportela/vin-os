import { styled } from "styled-components";
import { formatCoins } from "../../helpers/formatCoins";

interface BalanceProps {
  coins: number;
}

export const Balance: React.FC<BalanceProps> = ({ coins }) => {
  return (
    <BalanceRow>
      <span>Saldo</span>
      <CoinsAmount>{formatCoins(coins)} MC</CoinsAmount>
    </BalanceRow>
  );
};

const BalanceRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background-color: #f6f6f6;
  margin-top: 4px;
`;

const CoinsAmount = styled.span`
  color: #49c89a;
  font-weight: bold;
`;
