import ps3Icon from "@/assets/psn/icons/ps3Icon.png";
import ps4Icon from "@/assets/psn/icons/ps4Icon.png";
import ps5Icon from "@/assets/psn/icons/ps5Icon.png";
import psVitaIcon from "@/assets/psn/icons/psVitaIcon.png";

interface IPsPlatformIconProps {
  width?: number;
  height?: number;
}

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

// PS3 Icon
export const Ps3PlatformIcon = ({
  width = 30,
  height = 13,
}: IPsPlatformIconProps) => (
  <img
    alt="Level"
    src={ps3Icon}
    width={width}
    height={height}
    style={{
      borderRadius: "5%",
    }}
  />
);

// PS Vita Icon
export const PsVitaPlatformIcon = ({
  width = 30,
  height = 13,
}: IPsPlatformIconProps) => (
  <img
    alt="Level"
    src={psVitaIcon}
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
  if (platfrom.toLowerCase().startsWith("ps5"))
    return <Ps5PlatformIcon width={width} height={height} />;
  if (platfrom.toLowerCase().startsWith("ps4"))
    return <Ps4PlatformIcon width={width} height={height} />;
  if (platfrom.toLowerCase().startsWith("ps3"))
    return <Ps3PlatformIcon width={width} height={height} />;
  if (
    !platfrom.toLowerCase().startsWith("ps3") &&
    platfrom.toLowerCase().includes("vita")
  )
    return <PsVitaPlatformIcon width={width} height={height} />;
};
