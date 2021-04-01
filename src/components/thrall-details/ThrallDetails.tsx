import {Thrall, ThrallType} from "../../model/Thrall";
import React from "react";
import './ThrallDetails.css';
import {ThrallHeader} from "../thrall-header/ThrallHeader";
import {ThrallDetailsLocations} from "./thrall-details-locations/ThrallDetailsLocations";
import {ThrallLocation} from "../../model/ThrallLocation";

interface ThrallDetailsProps {
    focused: boolean;
    thrall?: Thrall;
    onDeSelect(): void;
    onSelectLocation(location: ThrallLocation): void;
}

export const ThrallDetails = (props: ThrallDetailsProps) => {
    const slideAnimationClass = props.focused ? 'thrall-details-sliding-in' : 'thrall-details-sliding-out'
    return <div className={"thrall-details-container " + slideAnimationClass}>
        <div className="thrall-details">
            <ThrallHeader thrall={props.thrall || {locations: [],name: '',type: ThrallType.ALCHEMIST, id: 'ada'}} icon={"chevron_left"} onSelect={props.onDeSelect}/>
            <div className="thrall-location-description">
                {props.thrall?.locationDescription}
            </div>
            <ThrallDetailsLocations thrall={props.thrall} onSelectLocation={props.onSelectLocation}/>
        </div>
    </div>
}
