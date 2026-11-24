import type { ComponentType } from "react";
import type { SiteTemplateProps } from "./types";
import CafeTemplate from "./cafe/Template";
import SalonTemplate from "./salon/Template";
import TradesTemplate from "./trades/Template";
import ConsultingTemplate from "./consulting/Template";
import FitnessTemplate from "./fitness/Template";
import PhotographyTemplate from "./photography/Template";
import RealEstateTemplate from "./realestate/Template";
import TutoringTemplate from "./tutoring/Template";
import ClinicTemplate from "./clinic/Template";
import RetailTemplate from "./retail/Template";
import LandscapingTemplate from "./landscaping/Template";
import AutoRepairTemplate from "./autorepair/Template";
import { TEMPLATE_METAS } from "./meta";

export const templateRegistry: Record<string, ComponentType<SiteTemplateProps>> = {
  cafe: CafeTemplate,
  salon: SalonTemplate,
  trades: TradesTemplate,
  consulting: ConsultingTemplate,
  fitness: FitnessTemplate,
  photography: PhotographyTemplate,
  realestate: RealEstateTemplate,
  tutoring: TutoringTemplate,
  clinic: ClinicTemplate,
  retail: RetailTemplate,
  landscaping: LandscapingTemplate,
  autorepair: AutoRepairTemplate,
};

export function getTemplateComponent(key: string): ComponentType<SiteTemplateProps> {
  return templateRegistry[key] ?? CafeTemplate;
}

export { TEMPLATE_METAS };
export type { SiteTemplateProps };
