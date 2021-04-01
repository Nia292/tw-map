import {Thrall} from "../../../model/Thrall";
import {CeCoordinate} from "../../../model/CeCoordinate";
import './ThrallDetailsLocations.css';
import React from "react";

interface ThrallDetailsLocationProps {
    location: CeCoordinate;
    onSelectLocation(location: CeCoordinate): void;
}

export interface ThrallDetailsLocationsProps {
    thrall?: Thrall;
    onSelectLocation(location: CeCoordinate): void;
}

const ThrallDetailsLocation = (props: ThrallDetailsLocationProps) => <div
    onClick={() => props.onSelectLocation(props.location)}
    className="thrall-detail-single-location">
    {props.location.x} / {props.location.y} / {props.location.z}
</div>

export const ThrallDetailsLocations = (props: ThrallDetailsLocationsProps) => {
    return  <div className="thrall-location-list-container">
        <div className="thrall-location-list-header">
            Locations
        </div>
        <div className="thrall-location-list-subheader">
            Click a location to jump to it
        </div>
        <div className="thrall-details-locations">
            {props.thrall?.locations.map((value, index) => <ThrallDetailsLocation
                onSelectLocation={props.onSelectLocation}
                key={index}
                location={value}/> )}
        </div>
    </div>
}
