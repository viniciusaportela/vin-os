import { CSSProperties } from "react";
import { theme } from "../../helpers/theme";

interface DividerProps {
  vertical?: boolean;
  size?: number;
  style?: CSSProperties;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  vertical,
  size,
  className,
  style,
}) => {
  return (
    <div
      style={{
        width: vertical ? size : "100%",
        height: vertical ? "100%" : size,
        margin: vertical ? "0 3px" : "3px 0",
        backgroundColor: theme.colors.dark,
        ...style,
      }}
      className={className}
    />
  );
};

Divider.defaultProps = {
  vertical: false,
  size: 2,
};
