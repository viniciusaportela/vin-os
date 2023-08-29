import { styled } from "styled-components";
import { theme } from "../../helpers/theme";

export const InputLabel = styled.label`
  display: flex;
  margin-top: 12px;
  margin-bottom: 2px;
`;

export const Input = styled.input`
  margin-top: 4px;
  width: 100%;
  padding: 8px 10px;
  border-radius: 12px;
  border: 2px solid ${theme.colors.dark};
  outline: none;
  background-color: white;
`;
