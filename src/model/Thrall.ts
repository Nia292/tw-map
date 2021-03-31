import {LatLngLiteral} from "leaflet";

export interface Thrall {
    id: string;
    name: string;
    type: ThrallType;
    locations: LatLngLiteral[];
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
