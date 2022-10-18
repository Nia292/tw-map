import React from "react";
import {Thrall} from "../../model/Thrall";
import './ThrallHeader.css'


export interface ThrallHeaderProps {
    thrall: Thrall;
    icon: 'chevron_right' | 'chevron_left';
    onSelect(thrall: Thrall): void;
}

export const ThrallHeader = (props: ThrallHeaderProps) => {
    return <div className="thrall-header" onClick={() => props.onSelect(props.thrall)}>
        <div>
            <div className="thrall-header-name">{props.thrall.name}</div>
            <div className="thrall-header-type">
                {props.thrall.type}
            </div>
            <div className="thrall-header-type">
                {props.thrall.funcomId}
            </div>
        </div>
        <div style={{marginLeft: 'auto', marginRight: '16px'}}>
            <span className="material-icons" style={{fontSize: '20pt'}}>{props.icon}</span>
        </div>
    </div>
}
