import React, {MouseEvent} from "react";
import {MapItem, MapItemSource} from "../../model/MapItem";
import './ItemInfoDialog.css';


export interface ItemInfoDialogProps {
    mapItem?: MapItem;

    onDeselectItem(): void;

    onSelectItem(name: string): void;

    onClickThrall(id: string): void;
}

const InfoText = (props: { mapItem: MapItem, onSelectItem(name: string): void }) => {
    return <div style={{width: '100%'}}>
        {props.mapItem.sourceText && <div>
            {props.mapItem.sourceText}
        </div>}
        {props.mapItem.unlockedBy && <div
            style={{width: '100%'}}>
            This item is unlocked by:
            <ul>
                {props.mapItem.unlockedBy.map(item => <li key={item}
                                                          onClick={() => props.onSelectItem(item)}
                                                          className="clickable-thrall">{props.mapItem.unlockedBy}</li>)}
            </ul>
        </div>
        }
    </div>
}

const SourceExplained = (props: { source: MapItemSource, item?: MapItem, thrallClick: (id: string) => void }) => {

    function makeClickableThrall(id: string) {
        return <li className="clickable-thrall"
                   key={id} onClick={() => props.thrallClick(id)}>{id}</li>
    }

    if (!props.item) {
        throw new Error('No item provided');
    }
    switch (props.source) {
        case "CUSTOM_LOOT":
            return <div>This item is commonly set up as custom loot by the server admins, e.g. for trading in Thrall
                Wars boss keys</div>
        case "MINE":
            return <div>Mined from the Mining Station crafting station.</div>
        case "BOSS_LOOT":
            return <div>
                <div>
                    This item can be looted from the following Thrall Wars bosses after defeating them:
                </div>
                <ul style={{marginTop: '2px', marginBottom: 0}}>
                    {props.item.sourceBoss?.map(value => <li key={value}>{value}</li>)}
                </ul>
            </div>
        case "THRALL_CRAFT":
            return <div>
                <div>
                    This item is crafted by the following thrall(s) at the {props.item.sourceStation}:
                </div>
                <ul style={{marginTop: '2px', marginBottom: 0}}>
                    {props.item.sourceThrall?.map(value => makeClickableThrall(value))}
                </ul>
            </div>
        case "TW_MERCHANT":
            return <div>Sold by one of the faction merchants.</div>
        case "CRAFT":
            return <div>This item can be made by a player after unlocking it's recipe. It is made at
                the {props.item.sourceStation}.</div>
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
                            <SourceExplained source={src} item={props.mapItem} thrallClick={props.onClickThrall}/>
                        </div>)}
                </div>
            </div>
            <div className="dialog-subheader">
                Info
            </div>
            <InfoText mapItem={props.mapItem} onSelectItem={props.onSelectItem}/>
        </div>
    </div>
}
