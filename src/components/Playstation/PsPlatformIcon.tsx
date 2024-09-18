import ps4Icon from "@/assets/psn/icons/ps4Icon.png";
import ps5Icon from "@/assets/psn/icons/ps5Icon.png";

interface IPsPlatformIconProps {
  width?: number;
  height?: number;
}

// PS4 Icon
export const Ps4PlatformIcon = ({
  width = 30,
  height = 13,
}: IPsPlatformIconProps) => (
  <img
    alt="Level"
    src={ps4Icon}
    width={width}
    height={height}
    style={{
      borderRadius: "5%",
    }}
  />
);

// PS5 Icon
export const Ps5PlatformIcon = ({
  width = 30,
  height = 12,
}: IPsPlatformIconProps) => (
  <img
    alt="Level"
    src={ps5Icon}
    width={width}
    height={height}
    style={{
      borderRadius: "5%",
    }}
  />
);

/**
 * Get trophy icon by trophy type
 *
 * @param trophyType
 * @param width
 * @param height
 * @returns
 */
export const getTrophyIconByPlatfrom = (
  platfrom: string,
  width?: number,
  height?: number
) => {
  if (platfrom.toLowerCase().includes("ps4"))
    return <Ps4PlatformIcon width={width} height={height} />;
  if (platfrom.toLowerCase().includes("ps5"))
    return <Ps5PlatformIcon width={width} height={height} />;
};
