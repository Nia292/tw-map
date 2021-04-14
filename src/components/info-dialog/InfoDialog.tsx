import React, {MouseEvent} from "react";
import './InfoDialog.css'

export interface InfoDialogProps {
    contributors: string[];
    open: boolean;
    onClose(): void;
}

export const InfoDialog = (props: InfoDialogProps) => {
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
                Information
            </div>
            <div className="dialog-subheader">
                About
            </div>
            <div>
                This map contains information about the thralls added by the&nbsp;<a target="_blank" href="https://steamcommunity.com/sharedfiles/filedetails/?id=1326031593" rel="noreferrer">Thrall Wars Dungeon Mod</a>.
                <br/>
                Check out the mod page for more information!<br/>
                You can find the source code over on <a target="_blank" href="https://github.com/Nia292/tw-map" rel="noreferrer">GitHub</a>.
            </div>
            <div className="dialog-subheader">
                 Privacy
            </div>
            <div>
                This site does not track your information. <br/>
                This site does not use cookies. <br/>
                This site does not store data on your local device aside from normal browser caching. <br/>
                Site provided by&nbsp;<a target="_blank" href="https://pages.github.com/" rel="noreferrer">GitHub pages</a>. Check out&nbsp;<a target="_blank" href="https://docs.github.com/en/github/site-policy/github-privacy-statement" rel="noreferrer">GitHub's privacy statement</a>
                &nbsp;to find out what data GitHub collects.
            </div>
            <div className="dialog-subheader">
                Contributing
            </div>
            <div>
                This map is far from completed. Head over to GitHub to find out how to contribute data!
            </div>
            <div className="dialog-subheader">
                More
            </div>
            <div>
                There is also the <a target="_blank" href="https://nia292.github.io/tw-dice-calc/index.html" rel="noreferrer">TW Dice Calculator</a> to plan your RP characters!
            </div>
            <div className="dialog-subheader">
                Credits
            </div>
            <div>
                Funcom for Conan Exiles and the map!<br/>
                Savage Wilds mod for the Savage Wilds map! <br/>
                Japata for helping me with the locations and general thrall information. 🐍
            </div>
            <div className="dialog-subheader">
                Contributors
            </div>
            <div className="display-in-column">
                {props.contributors.map(value => <div key={value}>{value}</div>)}
            </div>
        </div>
    </div>
}
