import { CSSProperties } from "react";

interface TextProps {
  children: any;
  withShadow?: string;
  color?: string;
  style?: CSSProperties;
}

export const Text: React.FC<TextProps> = ({
  children,
  style,
  color,
  withShadow,
}) => {
  return (
    <span
      style={{
        textShadow: withShadow ? `-1px 2px 0px ${withShadow}` : "none",
        ...style,
        color: color ?? "#1F1D1D",
      }}
    >
      {children}
    </span>
  );
};
