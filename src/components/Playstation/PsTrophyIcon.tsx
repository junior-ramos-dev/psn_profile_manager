import psTrophyBronze from "@/assets/psn/icons/psTrohpyBronze.png";
import psTrophyGold from "@/assets/psn/icons/psTrophyGold.png";
import psTrophyPlat from "@/assets/psn/icons/psTrophyPlat.png";
import psTrophySilver from "@/assets/psn/icons/psTrophySilver.png";
import { TROPHY_TYPE_NAME } from "@/models/interfaces/trophy/ITrophy";

interface IPstrophyIconProps {
  width?: number;
  height?: number;
}

// Platinum
export const PsTrophyPlatinum = ({
  width = 12,
  height = 18,
}: IPstrophyIconProps) => (
  <img alt="Platinum" src={psTrophyPlat} width={width} height={height + 2} />
);

// Gold
export const PsTrophyGold = ({
  width = 12,
  height = 18,
}: IPstrophyIconProps) => (
  <img alt="Gold" src={psTrophyGold} width={width} height={height} />
);

// Silver
export const PsTrophySilver = ({
  width = 12,
  height = 18,
}: IPstrophyIconProps) => (
  <img alt="Silver" src={psTrophySilver} width={width} height={height} />
);

// Bronze
export const PsTrophyBronze = ({
  width = 12,
  height = 18,
}: IPstrophyIconProps) => (
  <img alt="Bronze" src={psTrophyBronze} width={width} height={height} />
);

export const getTrophyIconByType = (
  trophyType: string,
  width?: number,
  height?: number
) => {
  switch (trophyType.toLowerCase()) {
    case TROPHY_TYPE_NAME.PLATINUM:
      return <PsTrophyPlatinum width={width} height={height} />;
    case TROPHY_TYPE_NAME.GOLD:
      return <PsTrophyGold width={width} height={height} />;
    case TROPHY_TYPE_NAME.SILVER:
      return <PsTrophySilver width={width} height={height} />;
    case TROPHY_TYPE_NAME.BRONZE:
      return <PsTrophyBronze width={width} height={height} />;
  }
};
