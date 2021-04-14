import {LatLng, LatLngBounds, LatLngBoundsExpression, LatLngLiteral, Polygon, Polyline} from "leaflet";
import {ThrallLocation} from "../model/ThrallLocation";
import {MapOffset} from "../model/MapOffset";

export interface CeCoordinateLiteral {
    x: number;
    y: number;
    z: number;
}

export function ceCoordinateToLatLng(ceCoordinate: CeCoordinateLiteral): LatLngLiteral {
    return {
        // Because coordinates are in pixel space, the y-axis goes from negative (bot) to positive (top),
        // where as in CE it goes from positive(bot) to negative(top)
        // So we need to invert it.
        lat: -1 * ceCoordinate.y,
        lng: ceCoordinate.x
    }
}

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
const invlerp = (x: number, y: number, a: number) => clamp((a - x) / (y - x));
const clamp = (a: number, min = 0, max = 1) => Math.min(max, Math.max(min, a));
const range = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    a: number
) => lerp(x2, y2, invlerp(x1, y1, a));

/**
 * Turns a zoom level into a marker size.
 */
export function zoomToIconSize(zoom: number): number {
    // Marker size at zoom -4 = 400
    // Marker size at zoom -8.7 = 3000
    //
    const r = range(400, 3000, -4, -8.7, zoom);
    console.log(zoom + ":" + r);
    return r;
}

export function ceCoordinate(x: number, y: number, z: number): ThrallLocation {
    return {x, y, z}
}

export function findCenter(locations: ThrallLocation[]): LatLngLiteral| null {
    if (locations.length <= 0) {
        return null;
    }
    if (locations.length <= 1) {
        return ceCoordinateToLatLng(locations[0])
    }
    if (locations.length <= 2) {
        const latLngs = locations.map(value => ceCoordinateToLatLng(value));
        return new Polyline(latLngs).getBounds().getCenter();
    }
    const latLngs = locations.map(value => ceCoordinateToLatLng(value));
    const polygon = new Polygon(latLngs);
    return polygon.getBounds().getCenter();
}


export function calculateBounds(south: number, west: number, north: number, east: number, offset: MapOffset): LatLngBoundsExpression {
    const southWest: LatLng = new LatLng(south - offset.offsetBot, west - offset.offsetLeft);
    const northEast: LatLng = new LatLng(north - offset.offsetTop, east - offset.offsetRight);
    return  new LatLngBounds(
        southWest,
        northEast
    );
}
