import {Thrall, ThrallType} from "../../model/Thrall";
import React from "react";
import './ThrallDetails.css';
import {ThrallHeader} from "../thrall-header/ThrallHeader";
import {ThrallDetailsLocations} from "./thrall-details-locations/ThrallDetailsLocations";
import {ThrallLocation} from "../../model/ThrallLocation";
import {MapItem} from "../../model/MapItem";
import {ThrallDetailsItems} from "./thrall-details-items/ThrallDetailsItems";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";

interface ThrallDetailsProps {
    focused: boolean;
    thrall?: Thrall;
    // The items the thrall makes
    items: MapItem[];
    // Hovered thrall location for highlighting
    hoveredLocation?: HoveredThrallLocation;
    onDeSelect(): void;
    onSelectLocation(location: ThrallLocation): void;
    onSelectItem(item: MapItem): void;
}

export const ThrallDetails = (props: ThrallDetailsProps) => {
    const slideAnimationClass = props.focused ? 'thrall-details-sliding-in' : 'thrall-details-sliding-out'
    return <div className={"thrall-details-container " + slideAnimationClass}>
        <div className="thrall-details">
            <ThrallHeader thrall={props.thrall || {locations: [],name: '',type: ThrallType.ALCHEMIST, id: 'ada'}} icon={"chevron_left"} onSelect={props.onDeSelect}/>
            <div className="thrall-location-description">
                {props.thrall?.locationDescription}
            </div>
            <ThrallDetailsLocations hoveredLocation={props.hoveredLocation} thrall={props.thrall} onSelectLocation={props.onSelectLocation}/>
            <ThrallDetailsItems items={props.items} onSelectItem={props.onSelectItem}/>
        </div>
    </div>
}
