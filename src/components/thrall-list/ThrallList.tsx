import {Thrall} from "../../model/Thrall";
import {ThrallListItem} from "./ThrallListItem";
import React from "react";
import {ThrallDetails} from "../thrall-details/ThrallDetails";
import './ThrallList.css';
import {ThrallLocation} from "../../model/ThrallLocation";

export interface ThrallListProps {
    selectedThrall?: Thrall;
    // For animation
    selectedThrallFocused: boolean;
    thralls: Thrall[];
    onSelectThrall(thrall: Thrall): void;
    onDeselectThrall(): void;

    onSelectLocation(location: ThrallLocation): void;
}

export const ThrallList = (props: ThrallListProps) => {
    const additionalListClass = props.selectedThrallFocused ? 'thrall-list-sliding-out' : 'thrall-list-sliding-in';
    return <React.Fragment>
        <ThrallDetails focused={props.selectedThrallFocused}
                       onSelectLocation={props.onSelectLocation}
                       thrall={props.selectedThrall} onDeSelect={props.onDeselectThrall}/>
        <div className={'thrall-list ' + additionalListClass}>
            {props.thralls
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(value => <ThrallListItem key={value.id}
                                              onSelect={props.onSelectThrall}
                                              thrall={value}/>)}
        </div>
    </React.Fragment>
}
