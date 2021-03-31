import {LatLngLiteral} from "leaflet";

// Coords from // TeleportPlayer x y z
export function ceCoordinateToLatLng(x: number, y: number): LatLngLiteral {
    return {
        lat: -1 * y,
        lng: x
    }
}
