import {Thrall} from "../../model/Thrall";
import {ThrallListItem} from "./ThrallListItem";
import React from "react";
import {ThrallDetails} from "../thrall-details/ThrallDetails";
import './ThrallList.css';
import {ThrallLocation} from "../../model/ThrallLocation";
import {MapItem} from "../../model/MapItem";
import {HoveredThrallLocation} from "../../model/HoveredThrallLocation";

export interface ThrallListProps {
    selectedThrall?: Thrall;
    // For animation
    selectedThrallFocused: boolean;
    thralls: Thrall[];
    allItems: MapItem[];
    // For marking the thrall that is hovered in the map
    hoveredLocation?: HoveredThrallLocation;

    onSelectThrall(thrall: Thrall): void;
    onDeselectThrall(): void;
    onSelectItem(item: MapItem): void;
    onSelectLocation(location: ThrallLocation): void;
}

function isCraftedBy(item: MapItem, thrall: string) {
    return (item.sourceThrall || []).indexOf(thrall) >= 0;
}

export const ThrallList = (props: ThrallListProps) => {
    const additionalListClass = props.selectedThrallFocused ? 'thrall-list-sliding-out' : 'thrall-list-sliding-in';
    let craftedBySelectedThrall: MapItem[] = [];
    if (props.selectedThrall && props.selectedThrall.name) {
        const thrallName = props.selectedThrall.name;
        craftedBySelectedThrall = props.allItems.filter(value => isCraftedBy(value, thrallName));
    }
    return <React.Fragment>
        <ThrallDetails focused={props.selectedThrallFocused}
                       onSelectLocation={props.onSelectLocation}
                       hoveredLocation={props.hoveredLocation}
                       items={craftedBySelectedThrall}
                       thrall={props.selectedThrall}
                       onSelectItem={props.onSelectItem}
                       onDeSelect={props.onDeselectThrall}/>
        <div className={'thrall-list ' + additionalListClass}>
            {props.thralls
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(value => <ThrallListItem key={value.id}
                                              onSelect={props.onSelectThrall}
                                              thrall={value}/>)}
        </div>
    </React.Fragment>
}
