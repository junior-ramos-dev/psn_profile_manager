import psTrophyBronze from "@/assets/psn/icons/psTrohpyBronze.png";
import psTrophyGold from "@/assets/psn/icons/psTrophyGold.png";
import psTrophyLevel from "@/assets/psn/icons/psTrophyLevel.png";
import psTrophyPlat from "@/assets/psn/icons/psTrophyPlat.png";
import psTrophySilver from "@/assets/psn/icons/psTrophySilver.png";
import { TROPHY_TYPE_NAME } from "@/models/interfaces/trophy/ITrophy";

interface IPsTrophyIconProps {
  width?: number;
  height?: number;
}

// Level
export const PsTrophyLevel = ({
  width = 20,
  height = 20,
}: IPsTrophyIconProps) => (
  <img alt="Level" src={psTrophyLevel} width={width} height={height} />
);

// Platinum
export const PsTrophyPlatinum = ({
  width = 10,
  height = 16,
}: IPsTrophyIconProps) => (
  <img alt="Platinum" src={psTrophyPlat} width={width} height={height + 2} />
);

// Gold
export const PsTrophyGold = ({
  width = 10,
  height = 16,
}: IPsTrophyIconProps) => (
  <img alt="Gold" src={psTrophyGold} width={width} height={height} />
);

// Silver
export const PsTrophySilver = ({
  width = 10,
  height = 16,
}: IPsTrophyIconProps) => (
  <img alt="Silver" src={psTrophySilver} width={width} height={height} />
);

// Bronze
export const PsTrophyBronze = ({
  width = 10,
  height = 16,
}: IPsTrophyIconProps) => (
  <img alt="Bronze" src={psTrophyBronze} width={width} height={height} />
);

/**
 * Get trophy icon by trophy type
 *
 * @param trophyType
 * @param width
 * @param height
 * @returns JSX.Element
 */
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
