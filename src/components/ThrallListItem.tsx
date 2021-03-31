import {Thrall} from "../model/Thrall";
import React from "react";

export interface ThrallListThrallProps {
    thrall: Thrall;
    onSelect(thrall: Thrall): void;
}

export const ThrallListItem = (props: ThrallListThrallProps) => {
    return <div className="thrall-wars-thrall" onClick={() => props.onSelect(props.thrall)}>
        <div className="thrall-name">{props.thrall.name}</div>
        <div className="thrall-type">
            {props.thrall.type}
        </div>
    </div>
}
