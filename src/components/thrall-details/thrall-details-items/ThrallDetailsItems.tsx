import './ThrallDetailsItems.css';
import React from "react";
import {MapItem} from "../../../model/MapItem";

interface ThrallDetailsItemProps {
    item: MapItem;

    onSelectItem(item: MapItem): void;
}

export interface ThrallDetailsItemsProps {
    items: MapItem[];

    onSelectItem(item: MapItem): void;
}

const ThrallDetailsItem = (props: ThrallDetailsItemProps) => <div
    onClick={() => props.onSelectItem(props.item)}
    className="thrall-detail-single-item">
    <div className="display-in-row display-in-center ">
        <div style={{marginRight: 'auto'}}>
            <div style={{fontSize: '12pt'}}>{props.item.name}</div>
            <div style={{fontSize: '9pt'}}>Crafted at the {props.item.sourceStation}</div>
        </div>
    </div>
</div>

export const ThrallDetailsItems = (props: ThrallDetailsItemsProps) => {
    return <div className="thrall-item-list-container">
        <div>
            <div className="thrall-item-list-header">
                Items
            </div>
            <div className="thrall-item-list-subheader">
                Click an item for more information
            </div>
            <div className="thrall-details-items">
                {props.items
                    .sort((iA, iB) => iA.name.localeCompare(iB.name))
                    .map((item, index) => <ThrallDetailsItem
                        onSelectItem={props.onSelectItem}
                        key={index}
                        item={item}/>)}
            </div>
        </div>
    </div>
}
