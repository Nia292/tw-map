import {Thrall} from "../model/Thrall";

export interface ThrallListThrallProps {
    selected: boolean;
    thrall: Thrall;
    onSelect(thrall: Thrall): void;
}

export const ThrallListThrall = (props: ThrallListThrallProps) => {
    const nameClasses = `thrall-wars-thrall ${props.selected && 'thrall-selected'}`

    return <div className={nameClasses}>
        <div className="thrall-name" onClick={() => props.onSelect(props.thrall)}>{props.thrall.name}</div>
        <div className="thrall-type">
            {props.thrall.type}
        </div>
    </div>
}
