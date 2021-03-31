import {Thrall, ThrallType} from "../../model/Thrall";
import React from "react";
import './ThrallDetails.css';
import {ThrallHeader} from "../thrall-header/ThrallHeader";

interface ThrallDetailsProps {
    focused: boolean;
    thrall?: Thrall;
    onDeSelect(): void;
}

export const ThrallDetails = (props: ThrallDetailsProps) => {
    const slideAnimationClass = props.focused ? 'thrall-details-sliding-in' : 'thrall-details-sliding-out'
    return <div className={"thrall-details-container " + slideAnimationClass}>
        <div className="thrall-details">
            <ThrallHeader thrall={props.thrall || {locations: [],name: '',type: ThrallType.ALCHEMIST, id: 'ada'}} icon={"chevron_left"} onSelect={props.onDeSelect}/>
            <div className="thrall-location-description">
                {props.thrall?.locationDescription}
            </div>
            <div className="thrall-location-list-container">
                <div className="thrall-location-list-header">
                    Locations
                </div>
                <div className="thrall-location-list-subheader">
                    Click a location to jump to it
                </div>
                {props.thrall?.locations.map(value => <div>{value.x + " " + value.y}</div>)}
            </div>
        </div>
    </div>
}
