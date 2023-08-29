import { styled } from "styled-components";
import { theme } from "../../helpers/theme";

interface BlockSummaryProps {
  data?: any; // TODO
}

export const BlockSummary: React.FC<BlockSummaryProps> = ({ data }) => {
  const lastBlockIndex = (data.currentBlockMinings ?? []).length - 1;

  return (
    <Container>
      <Blocks>
        {new Array(100).fill(undefined).map((_, index: number) => (
          <Block mined={index <= lastBlockIndex} />
        ))}
      </Blocks>
    </Container>
  );
};

const Container = styled.div`
  border: 2px solid ${theme.colors.dark};
  padding: 10px;
  border-radius: 12px;
  margin-top: 12px;
  margin-bottom: 10px;
`;

const Blocks = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 20px);
  justify-content: center;
  grid-gap: 4px;
`;

const Block = styled.div<{ mined?: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 6px;

  background-color: ${({ mined }) =>
    mined ? theme.colors.dark : "transparent"};
  border: 1px solid ${theme.colors.dark};
`;
