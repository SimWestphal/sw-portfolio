import { IconAbout } from "./IconAbout";
import { IconContact } from "./IconContact";
import { IconProjects } from "./IconProjects";
import { IconSkills } from "./IconSkills";
import { IconStations } from "./IconStations";

export type IconName = keyof typeof iconMap;

export const iconMap = {
  about: IconAbout,
  projects: IconProjects,
  skills: IconSkills,
  stations: IconStations,
  contact: IconContact,
} as const;
