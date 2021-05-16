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

const SourceExplained = (props: {source: MapItemSource, item?: MapItem}) => {
    if (!props.item) {
        throw new Error('No item provided');
    }
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
                    {props.item.sourceBoss?.map(value => <li key={value}>{value}</li>)}
                </ul>
            </div>
        case "THRALL_CRAFT":
            return <div>
                <div>
                    This item is crafted by the following thrall(s) at the {props.item.sourceStation}:
                </div>
                <ul style={{marginTop: '2px', marginBottom:  0}}>
                    {props.item.sourceThrall?.map(value => <li key={value}>{value}</li>)}
                </ul>
            </div>
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
                            <SourceExplained source={src} item={props.mapItem}/>
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
