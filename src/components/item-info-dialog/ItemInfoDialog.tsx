import React, {MouseEvent} from "react";
import {MapItem, MapItemSource} from "../../model/MapItem";

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

const SourceExplained = (props: {source: MapItemSource, sourceBoss?: string[]}) => {
    switch (props.source) {
        case "CUSTOM_LOOT":
            return <div>This item is commonly set up as custom loot by the server admins, e.g. for trading in Thrall Wars boss keys</div>
        case "MINE":
            return <div>Mined from the Mining Station crafting station.</div>
        case "BOSS_LOOT":
            return <div>
                <div>
                    This item can be looted from the following Thrall Wars bosses after defeating them:
                </div>
                <ul style={{marginTop: '2px', marginBottom:  0}}>
                    {props.sourceBoss?.map(value => <li key={value}>{value}</li>)}
                </ul>
            </div>
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
                    {props.mapItem.source.map(src =>
                        <div key={src} style={{marginBottom: '4px', marginTop: '4px'}}>
                            <SourceExplained source={src} sourceBoss={props.mapItem?.sourceBoss}/>
                        </div>)}
                </div>
            </div>
            <div className="dialog-subheader">
                Info
            </div>
            <SourceText sourceText={props.mapItem.sourceText}/>
        </div>
    </div>
}
