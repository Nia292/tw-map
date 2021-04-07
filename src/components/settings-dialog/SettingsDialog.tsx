import React, {MouseEvent} from "react";
import {MapOffset} from "../../model/MapOffset";
import './SettingsDialog.css'


interface SettingsDialogProps {
    open: boolean;

    onClose(): void;

    offset: MapOffset;

    onOffsetChange(offset: MapOffset): void;
}


export const SettingsDialog = (props: SettingsDialogProps) => {
    function preventClose(event: MouseEvent) {
        const name = (event.target as any).tagName;
        if (name !== "A") {
            event.preventDefault();
        }
        event.stopPropagation();
    }

    function handleOffsetChange(offset: string, key: keyof MapOffset) {
        if (offset !== "") {
            const parsedOffset = Number.parseInt(offset, 10);
            props.onOffsetChange({
                ...props.offset,
                [key]: parsedOffset
            })
        }

    }

    if (!props.open) {
        return <React.Fragment/>
    }
    return <div className="dialog-container" onClick={props.onClose}>
        <div className="dialog" onClick={preventClose}>
            <div className="dialog-header">
                Settings
            </div>
            <div className="dialog-subheader">
                Map Offsets
            </div>
            <div>
                <p>
                    Used to correct initial reading errors.
                </p>
                <div className="settings-input">
                    <label htmlFor="offset-top">Offset Top</label>
                    <input id="offset-top" type="number"
                           onChange={event => handleOffsetChange(event.target.value, "offsetTop")}
                           value={props.offset.offsetTop}/>
                </div>
                <div className="settings-input">
                    <label htmlFor="offset-top">Offset Bottom</label>
                    <input id="offset-top" type="number"
                           onChange={event => handleOffsetChange(event.target.value, "offsetBot")}
                           value={props.offset.offsetBot}/>
                </div>
                <div className="settings-input">
                    <label htmlFor="offset-top">Offset Left</label>
                    <input id="offset-top" type="number"
                           onChange={event => handleOffsetChange(event.target.value, "offsetLeft")}
                           value={props.offset.offsetLeft}/>
                </div>
                <div className="settings-input">
                    <label htmlFor="offset-top">Offset Right</label>
                    <input id="offset-top" type="number"
                           onChange={event => handleOffsetChange(event.target.value, "offsetRight")}
                           value={props.offset.offsetRight}/>
                </div>
            </div>
        </div>
    </div>
}
