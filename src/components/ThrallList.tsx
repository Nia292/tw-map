import {Thrall} from "../model/Thrall";
import {ThrallListThrall} from "./ThrallListThrall";
import React from "react";

export interface ThrallListProps {
    selectedThrall?: Thrall;
    thralls: Thrall[];

    onSelectThrall(thrall: Thrall): void;
}

export const ThrallList = (props: ThrallListProps) => {
    return <div>
        {props.thralls
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(value => <ThrallListThrall key={value.id}
                                            selected={value.id === props.selectedThrall?.id}
                                            onSelect={props.onSelectThrall}
                                            thrall={value}/>)}
    </div>
}
