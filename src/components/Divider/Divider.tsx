import { CSSProperties } from "react";

interface DividerProps {
  vertical?: boolean;
  size?: number;
  style?: CSSProperties;
}

export const Divider: React.FC<DividerProps> = ({ vertical, size, style }) => {
  return (
    <div
      style={{
        width: vertical ? size : "100%",
        height: vertical ? "100%" : size,
        margin: vertical ? "0 8px" : "8px 0",
        backgroundColor: "#CBCBCB",
      }}
    />
  );
};

Divider.defaultProps = {
  vertical: false,
  size: 2,
};
