import type { SVGProps } from "react";
import { IconAbout } from "./IconAbout";
import { IconContact } from "./IconContact";
import { IconNeArrow } from "./IconNeArrow";
import { IconProjects } from "./IconProjects";
import { IconSkills } from "./IconSkills";
import { IconSpinner } from "./IconSpinner";
import { IconStations } from "./IconStations";

export type IconProps = SVGProps<SVGSVGElement> & { size?: number };

export type IconName = keyof typeof iconMap;

export const iconMap = {
  about: IconAbout,
  projects: IconProjects,
  skills: IconSkills,
  stations: IconStations,
  contact: IconContact,
  spinner: IconSpinner,
  nearrow: IconNeArrow,
} as const;
