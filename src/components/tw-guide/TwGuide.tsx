import React, {MouseEvent} from "react";
import {MapItem} from "../../model/MapItem";
import './TwGuide.css'

interface TwGuideProps {
    allItems: MapItem[];
    open: boolean
    onClose(): void;
}

export const TwGuide = (props: TwGuideProps) => {

    function preventClose(event: MouseEvent) {
        const name = (event.target as any).tagName;
        if (name !== "A") {
            event.preventDefault();
        }
        event.stopPropagation();
    }

    const customItems = props.allItems.filter(item => item.source.find(source => source === 'CUSTOM_LOOT'))
    const dropItems = props.allItems.filter(item => item.source.find(source => source === 'BOSS_LOOT'))
    const kitItems = props.allItems.filter(item => item.source.find(source => source === 'CUSTOM_LOOT'))

    if (!props.open) {
        return <React.Fragment/>
    }
    return <div className="dialog-container" onClick={props.onClose}>
        <div className="dialog" onClick={preventClose} style={{maxHeight: '50vh', overflow: 'auto'}}>
            <div className="dialog-header">
                Thrall Wars Mini Guide
            </div>
            <div className="dialog-subheader">General</div>
            <div>
                Just a small overview of what items there are. If you want detailed instructions on how to
                set things up, see the <a href="https://conanexilestwmod.fandom.com/wiki/Admin_Setup_Guide"
                                          rel="noreferrer"
                                          target="_blank">Admin Setup Guide</a>
            </div>
            <div className="dialog-subheader">Custom Items</div>
            <div>These are the items a server admin has to manually set up as loot somewhere.
                Recommendation is to add them as boss loot players can exchange for thrall wars boss keys.
            </div>
            <ul>
                {
                    customItems.map(item => <li key={item.name}>{item.name}</li>)
                }
            </ul>
            <div className="dialog-subheader">Boss Drops</div>
            <div>
                These items drop from the Thrall Wars bosses.
            </div>
            <ul>
                {
                    dropItems.map(item => <li key={item.name}>{item.name}</li>)
                }
            </ul>
            <div className="dialog-subheader">Trade-Ins</div>
            <div>
                These items are supposed to be exchangeable for boss keys. A boss key would give the player a loot kit,
                containing a randomized set of these items (and more).
            </div>
            <ul>
                {
                    kitItems.map(item => <li key={item.name}>{item.name}</li>)
                }
            </ul>
        </div>
    </div>
}
