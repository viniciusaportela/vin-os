import { styled } from "styled-components";

import HeadSkyLuck from "../../assets/images/head_Sky_Luck.png";
import HeadGabriel191 from "../../assets/images/head_Gabriel191.png";
import HeadViniccius007 from "../../assets/images/head_Viniccius007.png";

interface PlayerIconProps {
  player: string;
}

export const PlayerIcon: React.FC<PlayerIconProps> = ({ player }) => {
  const getImgFromName = () => {
    switch (player) {
      case "Sky_Luck":
        return HeadSkyLuck;
      case "Gabriel191":
        return HeadGabriel191;
      case "Viniccius007":
        return HeadViniccius007;
    }
  };

  return <Img src={getImgFromName()} />;
};

export const Img = styled.img`
  width: 50px;
  height: 50px;
`;
