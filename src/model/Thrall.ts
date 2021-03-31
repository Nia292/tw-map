import {CeCoordinate} from "./CeCoordinate";

export interface Thrall {
    id: string;
    name: string;
    type: ThrallType;
    locationDescription?: string;
    locations: CeCoordinate[];
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
