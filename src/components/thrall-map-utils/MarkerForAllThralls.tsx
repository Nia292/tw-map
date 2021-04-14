import {Thrall} from "../../model/Thrall";
import React from "react";
import {ThrallLocation} from "../../model/ThrallLocation";
import {icon} from "leaflet";
import {Marker, Tooltip} from "react-leaflet";
import {ceCoordinateToLatLng} from "../../util/conversions";

interface MarkerLocation {
    x: number;
    y: number;
    z: number;
    names: string[];
}

function sharesLocation(location: MarkerLocation, tLocation: ThrallLocation): boolean {
    const dX = Math.abs(location.x - tLocation.x);
    const dY = Math.abs(location.y - tLocation.y);
    return dX <= 0.005 && dY <= 0.005;
}

function addLocationToList(locations: MarkerLocation[], tLocation: ThrallLocation, thrall: Thrall): void {
    const matchingLocation = locations.find(value => sharesLocation(value, tLocation))
    if (matchingLocation) {
        matchingLocation.names.push(thrall.name);
    } else {
        locations.push({
            x: tLocation.x,
            y: tLocation.y,
            z: tLocation.z,
            names: [thrall.name]
        })
    }
}

const locationIcon = icon({
    iconUrl: process.env.PUBLIC_URL + '/fc_assets/icon_camp.png',
    iconSize: [24, 24],
    tooltipAnchor: [0, 12],
});


function makeMarkerForLocation(location: MarkerLocation) {
    const latLng = ceCoordinateToLatLng(location);
    return <Marker key={latLng.lat + '_' + latLng.lng}
                   icon={locationIcon}
                   position={latLng}>
        <Tooltip direction="bottom">
            <div className="display-in-column">
                {location.names.map(name => <div key={name}>{name}</div>)}
            </div>
        </Tooltip>
    </Marker>
}

function gatherMarkerLocations(thralls: Thrall[]): MarkerLocation[] {
    const result: MarkerLocation[] = [];
    thralls.forEach(thrall => {
        thrall.locations.forEach(loc => addLocationToList(result, loc, thrall))
    })
    return result;
}

export function MarkerForAllThralls(props: {thralls: Thrall[], focused: boolean}) {
    if (props.focused) {
        return <React.Fragment/>;
    }
    const data = gatherMarkerLocations(props.thralls)
        .map(value => makeMarkerForLocation(value));
    return <React.Fragment>
        {data}
    </React.Fragment>
}
