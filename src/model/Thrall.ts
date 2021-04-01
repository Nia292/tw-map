import {ThrallLocation} from "./ThrallLocation";

export interface Thrall {
    id: string;
    name: string;
    type: ThrallType;
    locationDescription?: string;
    locations: ThrallLocation[];
}

export enum ThrallType {
    ALCHEMIST = 'ALCHEMIST',
    BLACKSMITH = 'BLACKSMITH',
    ARMORER = 'ARMORER',
    CARPENTER = 'CARPENTER',
    TASKMASTER = 'TASKMASTER',
    GROOMER = 'GROOMER',
    SMELTER = 'SMELTER  ',
}
