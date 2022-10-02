import {Thrall} from "../../model/Thrall";
import {Marker, Tooltip} from "react-leaflet";
import React from "react";
import {ceCoordinateToLatLng} from "../../util/conversions";
import {icon} from "leaflet";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";
import {ThrallLocation} from "../../model/ThrallLocation";

const locationIcon = icon({
    iconUrl: process.env.PUBLIC_URL + '/fc_assets/icon_camp.png',
    iconSize: [24, 24],
    tooltipAnchor: [0, 12],
});

function makeMarkerForLocation(thrall: Thrall, location: ThrallLocation, onHoverChange: (location?: HoveredThrallLocation) => void) {
    const onMouseOver = () => {
        onHoverChange({location: location, thrall: thrall});
    }

    const onMouseOut = () => {
        onHoverChange(undefined);
    }
    const position = ceCoordinateToLatLng(location);
    return <Marker key={position.lat + '_' + position.lng}
                   eventHandlers={{mouseover: onMouseOver, mouseout: onMouseOut}}
                   icon={locationIcon}
                   position={position}>
        <Tooltip direction="bottom">{thrall.name}</Tooltip>
    </Marker>
}

export interface MarkerForSelectedThrallsProps {
    thrall?: Thrall;
    focused: boolean;
    onHoveredChange(location?: HoveredThrallLocation): void;
}

export function MarkerForSelectedThrall(props: MarkerForSelectedThrallsProps): any {
    if (!props.focused) {
        return <React.Fragment/>;
    }
    const thrall = props.thrall;
    if (!thrall) {
        return <React.Fragment/>;
    }
    return thrall.locations.map(location => makeMarkerForLocation(thrall, location, props.onHoveredChange));
}
