import {ImageOverlay, MapContainer, ZoomControl} from "react-leaflet";
import {CRS, LatLngLiteral,} from "leaflet";
import {ThrallList} from "./thrall-list/ThrallList";
import {Thrall} from "../model/Thrall";
import React, {MouseEvent, useState} from "react";
import {calculateBounds, ceCoordinateToLatLng, findCenter} from "../util/conversions";
import {ThrallLocation} from "../model/ThrallLocation";
import {ZoomCenter} from "../model/ZoomCenter";
import {SetViewOnClick} from "./thrall-map-utils/SetViewOnClick";
import {MarkerForLocations} from "./thrall-map-utils/MarkerForLocations";
import {MapEvents} from "./thrall-map-utils/MapEvents";
import {InfoDialog} from "./info-dialog/InfoDialog";
import {SettingsDialog} from "./settings-dialog/SettingsDialog";
import {MapType} from "../model/MapType";

const DEFAULT_ZOOM = -8.7;
const DEFAULT_CENTER: LatLngLiteral = {lat: 0, lng: 0};

// Coordiantes are [y,x]
// Teleport player locates them as [x, y, z]

// Left Side: TeleportPlayer -342934.09375 349993.78125 -17373.080078
// Right side: TeleportPlayer 474806.09375 329969.6875 -37927.75
// Bottom: TeleportPlayer 248194.171875 368872.59375 -10562.074219
// Top: TeleportPlayer 17492.65625 -445384.28125 15668.111328

// WEST SOUTH EAST NORTH
// -342934 368872 474806 -445384
// Latitude: bottom to top
// Longitude: left to right
// Left/West: -342934.00000
// Right: 474806.00000
// Top: -445384.00000
// Bottom: 368872.00000
// const southWest: LatLng = new LatLng(368872.00000, -342934.00000);

interface ThrallMapProps {
    data: Thrall[];
    mapLq: string;
    mapHq: string;
    north: number;
    south: number;
    west: number;
    east: number;
    minZoom: number;
    maxZoom: number;
    mapType: MapType;
}

export function ThrallMap(props: ThrallMapProps) {
    const [selectedThrall, setSelectedThrall] = useState(undefined as unknown as Thrall | undefined);
    // Use a separate focus flag to control whether the detail display or the list display is used
    // This avoids having an undefined name while the element with the details is sliding out
    const [thrallFocused, setThrallFocused] = useState(false);
    const [zoomCenter, setZoomCenter] = useState(undefined as unknown as ZoomCenter | undefined);
    const [infoDialogOpen, setInfoDialogOpen] = useState(false);
    const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [useHq, setUseHq] = useState(false);
    const [offset, setOffset] = useState({
        offsetTop: 0,
        offsetBot: 0,
        offsetLeft: 0,
        offsetRight: 0
    });

    function handleSelectThrall(thrall: Thrall) {
        let center = findCenter(thrall.locations);
        if (center) {
            setZoomCenter({zoom: -8, center});
        }
        setSelectedThrall(thrall)
        setThrallFocused(true)
    }

    function handleDeselectThrall() {
        // While animating, we still want the thrall details visible until
        // it has slide out.
        setThrallFocused(false)
        setZoomCenter({zoom: -8.7, center: DEFAULT_CENTER});
    }

    function handleSelectLocation(location: ThrallLocation): void {
        setZoomCenter({
            center: ceCoordinateToLatLng(location),
            zoom: -7,
        });
    }

    function handleHqClick(event: MouseEvent<HTMLInputElement>) {
        let target = event.target as HTMLInputElement;
        setUseHq(target.checked)
    }

    function otherMapUrl(mapType: MapType): string {
        if (mapType === 'exiled-lands') {
            return process.env.PUBLIC_URL + '?map=savage-wilds'
        }
        return process.env.PUBLIC_URL + '?map=exiled-lands'
    }

    function otherMapName(mapType: MapType): string {
        if (mapType === "exiled-lands") {
            return "Savage Wilds"
        }
        return "Exiled Lands"
    }

    const center = zoomCenter?.center ? zoomCenter.center : DEFAULT_CENTER;
    const zoom = zoomCenter?.zoom ? zoomCenter.zoom : DEFAULT_ZOOM
    const mapBounds = calculateBounds(props.south, props.west, props.north, props.east, offset);
    return <div className="thrall-map-wrapper">
        <div id="info-button" className={"display-in-center"} onClick={() => setInfoDialogOpen(true)}>
            <span className="material-icons" style={{fontSize: '18pt'}}>
                help_outline
            </span>
        </div>
        <div id="settings-button" className={"display-in-center"} onClick={() => setSettingsDialogOpen(true)}>
            <span className="material-icons" style={{fontSize: '18pt'}}>
                settings
            </span>
        </div>
        <div id="hq-checkbox-wrapper" className="display-in-center">
            <input id="hq-checkbox" type="checkbox" checked={useHq} onClick={handleHqClick}/>
            <label htmlFor="hq-checkbox">HQ Map (11mb)</label>
        </div>
        <div id="map-link" className="display-in-center">
            Switch to&nbsp;<a rel="noreferrer" href={otherMapUrl(props.mapType)} >{otherMapName(props.mapType)}</a>
        </div>
        <InfoDialog open={infoDialogOpen} onClose={() => setInfoDialogOpen(false)}/>
        <SettingsDialog open={settingsDialogOpen}
                        offset={offset}
                        onOffsetChange={setOffset}
                        onClose={() => setSettingsDialogOpen(false)}/>
        <MapContainer center={center}
                      style={{height: '100vh', width: 'calc(100vw - var(--sidebar-width))'}}
                      minZoom={props.minZoom}
                      maxZoom={props.maxZoom}
                      zoomSnap={0.1}
                      zoomDelta={0.1}
                      crs={CRS.Simple}
                      bounds={mapBounds}
                      maxBounds={mapBounds}
                      zoomControl={false}
                      zoom={zoom}>
            <ZoomControl/>
            {!useHq && <ImageOverlay url={process.env.PUBLIC_URL + props.mapLq} bounds={mapBounds} />}
            {useHq && <ImageOverlay url={process.env.PUBLIC_URL + props.mapHq} bounds={mapBounds}/>}
            <MapEvents mapBounds={mapBounds} onZoomCenterChange={setZoomCenter}/>
            <SetViewOnClick location={zoomCenter}/>
            <MarkerForLocations thrall={selectedThrall} focused={thrallFocused}/>
        </MapContainer>
        <div className="sidebar-right">
            <ThrallList thralls={props.data}
                        onSelectLocation={handleSelectLocation}
                        selectedThrallFocused={thrallFocused}
                        selectedThrall={selectedThrall}
                        onDeselectThrall={handleDeselectThrall}
                        onSelectThrall={handleSelectThrall}/>
        </div>
    </div>
}
