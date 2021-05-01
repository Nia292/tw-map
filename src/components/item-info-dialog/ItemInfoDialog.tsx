import React, {MouseEvent} from "react";
import {MapItem, MapItemSource, translateSources} from "../../model/MapItem";

export interface ItemInfoDialogProps {
    mapItem?: MapItem;
    onDeselectItem(): void;
}

const SourceText = (props: {sourceText?: string}) => {
    if (!props.sourceText) {
        return <React.Fragment/>
    }
    return <div>
        {props.sourceText}
    </div>
}

const SourceExplained = (props: {source: MapItemSource}) => {
    switch (props.source) {
        case "CUSTOM_LOOT":
            return <div>Custom loot. This item has to be set up by the server admins.</div>
        case "MINE":
            return <div>Mined from the Mining Station crafting station.</div>
        case "BOSS_LOOT":
            return <div>Part of the loot table of a Thrall Wars boss.</div>
        case "THRALL_CRAFT":
            return <div>Crafted by a Thrall Wars thrall.</div>
        case "TW_MERCHANT":
            return <div>Sold by one of the faction merchants.</div>
    }
}

export const ItemInfoDialog = (props: ItemInfoDialogProps) => {
    function preventClose(event: MouseEvent) {
        const name = (event.target as any).tagName;
        if (name !== "A") {
            event.preventDefault();
        }
        event.stopPropagation();
    }

    if (!props.mapItem) {
        return <React.Fragment/>
    }

    return <div className="dialog-container" onClick={props.onDeselectItem}>
        <div className="dialog" onClick={preventClose}>
            <div className="dialog-header">
                {props.mapItem.name}
            </div>
            <div className="dialog-subheader">
                Source
            </div>
            <div>
                <div className="display-in-column">
                    {props.mapItem.source.map(src => <SourceExplained key={src} source={src}/>)}
                </div>
            </div>
            <div className="dialog-subheader">
                Info
            </div>
            <SourceText sourceText={props.mapItem.sourceText}/>
        </div>
    </div>
}
