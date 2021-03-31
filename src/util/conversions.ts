import {LatLngLiteral} from "leaflet";
import {CeCoordinate} from "../model/CeCoordinate";

export function ceCoordinateToLatLng(ceCoordinate: CeCoordinate): LatLngLiteral {
    return {
        // Because coordinates are in pixel space, the y-axis goes from negative (bot) to positive (top),
        // where as in CE it goes from positive(bot) to negative(top)
        // So we need to invert it.
        lat: -1 * ceCoordinate.y,
        lng: ceCoordinate.x
    }
}

export function ceCoordinate(x: number, y: number, z: number): CeCoordinate {
    return {x, y, z}
}
