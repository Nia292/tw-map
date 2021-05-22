import React, {MouseEvent} from "react";

interface TwGuideProps {
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

    if (!props.open) {
        return <React.Fragment/>
    }
    return <div className="dialog-container" onClick={props.onClose}>
        <div className="dialog" onClick={preventClose}>
            <div className="dialog-header">
                Thrall Wars Mini Guide
            </div>
            <div className="dialog-subheader">General</div>
            <div>Will come soon</div>
        </div>
    </div>
}
