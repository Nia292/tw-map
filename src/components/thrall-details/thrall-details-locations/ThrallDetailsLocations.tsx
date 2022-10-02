import {Thrall} from "../../../model/Thrall";
import {ThrallLocation} from "../../../model/ThrallLocation";
import './ThrallDetailsLocations.css';
import React from "react";
import {HoveredThrallLocation} from "../../../model/HoveredThrallLocation";

interface ThrallDetailsLocationProps {
    location: ThrallLocation;
    isHovered: boolean;
    onSelectLocation(location: ThrallLocation): void;
}

export interface ThrallDetailsLocationsProps {
    thrall?: Thrall;
    hoveredLocation?: HoveredThrallLocation;
    onSelectLocation(location: ThrallLocation): void;
}

const ThrallDetailsLocation = (props: ThrallDetailsLocationProps) => {
    let classNames = 'thrall-detail-single-location';
    if (props.isHovered) {
        classNames += ' thrall-details-single-location__highlight';
    }
    return <div
        onClick={() => props.onSelectLocation(props.location)}
        className={classNames}>
        <div className="display-in-row display-in-center ">
            <div style={{marginRight: '16px'}}>
                <img alt="icon camp" src={process.env.PUBLIC_URL + "/fc_assets/icon_camp.png"}/>
            </div>
            <div style={{marginRight: 'auto'}}>
                <div style={{fontSize: '14pt'}}>{props.location.location}</div>
                <div style={{fontSize: '11pt'}}>Spawns at the {props.location.spawnSpot} spot.</div>
                <div style={{fontSize: '9pt'}}>{props.location.spawnSpotDetail}</div>
                <div style={{fontSize: '9pt'}}>Coordiantes: {props.location.x} / {props.location.y} / {props.location.z}</div>
            </div>
        </div>
    </div>
}

function isLocationHovered(thrallLocation: ThrallLocation, hoveredLocation?: HoveredThrallLocation, thrall?: Thrall): boolean {
    if (!hoveredLocation || !thrall) {
        return false;
    }
    const {x, y, z} = hoveredLocation.location;
    return thrall.id === hoveredLocation.thrall.id && thrallLocation.x === x && thrallLocation.y === y && thrallLocation.z === z;
}

export const ThrallDetailsLocations = (props: ThrallDetailsLocationsProps) => {
    return  <div className="thrall-location-list-container">
        <div>
            <div className="thrall-location-list-header">
                Locations
            </div>
            <div className="thrall-location-list-subheader">
                Click a location to jump to it
            </div>
            <div className="thrall-details-locations">
                {props.thrall?.locations.map((value, index) => <ThrallDetailsLocation
                    onSelectLocation={props.onSelectLocation}
                    isHovered={isLocationHovered(value, props.hoveredLocation, props?.thrall)}
                    key={index}
                    location={value}/> )}
            </div>
        </div>
    </div>
}
