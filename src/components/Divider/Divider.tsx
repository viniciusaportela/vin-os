import { styled } from "styled-components";

interface DividerProps {
  vertical?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ vertical }) => {
  return <Container />;
};

const Container = styled.div``;
