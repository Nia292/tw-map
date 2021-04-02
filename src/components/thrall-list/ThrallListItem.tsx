import {Thrall} from "../../model/Thrall";
import React from "react";
import {ThrallHeader} from "../thrall-header/ThrallHeader";

export interface ThrallListThrallProps {
    thrall: Thrall;

    onSelect(thrall: Thrall): void;
}

export const ThrallListItem = (props: ThrallListThrallProps) => {
    return <ThrallHeader onSelect={props.onSelect} thrall={props.thrall} icon={"chevron_right"}/>
}
