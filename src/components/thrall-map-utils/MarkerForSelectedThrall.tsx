import {Thrall} from "../../model/Thrall";
import {Marker, Tooltip, useMap} from "react-leaflet";
import React from "react";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {icon, LatLngLiteral} from "leaflet";

const locationIcon = icon({
    iconUrl: process.env.PUBLIC_URL + '/fc_assets/icon_camp.png',
    iconSize: [24, 24],
    tooltipAnchor: [0, 12],
});


function makeMarkerForLocation(thrall: Thrall, location: LatLngLiteral) {
    return <Marker key={location.lat + '_' + location.lng}
                   icon={locationIcon}
                   position={location}>
        <Tooltip direction="bottom">{thrall.name}</Tooltip>
    </Marker>
}

function makeMarkersForThrall(thrall: Thrall) {
    return thrall.locations.map(location => makeMarkerForLocation(thrall, ceCoordinateToLatLng(location)))
}

export function MarkerForSelectedThrall(props: {thrall?: Thrall, focused: boolean}): any {
    if (!props.focused) {
        return <React.Fragment/>;
    }
    const thrall = props.thrall;
    if (!thrall) {
        return <React.Fragment/>;
    }
    return thrall.locations.map(location => makeMarkerForLocation(thrall, ceCoordinateToLatLng(location)));
}

export function MarkerForAllThralls(props: {thralls: Thrall[], focused: boolean}) {
    if (props.focused) {
        return <React.Fragment/>;
    }
    const data = props.thralls
        .map(value => makeMarkersForThrall(value))
        .reduce((previousValue, currentValue) => [...previousValue, ...currentValue], []);
    return <React.Fragment>
        {data}
    </React.Fragment>
}
