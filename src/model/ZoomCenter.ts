import {LatLngLiteral} from "leaflet";

export interface ZoomCenter {
    zoom?: number;
    center?: LatLngLiteral;
    // If we just change it to keep internal state in sync with the map
    preventPan?: boolean;
}
