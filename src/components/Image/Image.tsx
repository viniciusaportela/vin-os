import { styled } from "styled-components";

interface ImageProps {
  source?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  source,
  style,
  className,
  onClick,
}) => {
  return (
    <StyledImg
      src={source}
      alt=""
      style={style}
      className={className}
      onClick={onClick}
    />
  );
};

const StyledImg = styled.img`
  user-select: none;
  -webkit-user-drag: none;
`;
