import {Thrall} from "../../../model/Thrall";
import {ThrallLocation} from "../../../model/ThrallLocation";
import './ThrallDetailsLocations.css';
import React from "react";

interface ThrallDetailsLocationProps {
    location: ThrallLocation;
    onSelectLocation(location: ThrallLocation): void;
}

export interface ThrallDetailsLocationsProps {
    thrall?: Thrall;
    onSelectLocation(location: ThrallLocation): void;
}

const ThrallDetailsLocation = (props: ThrallDetailsLocationProps) => <div
    onClick={() => props.onSelectLocation(props.location)}
    className="thrall-detail-single-location">
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
                    key={index}
                    location={value}/> )}
            </div>
        </div>
    </div>
}
