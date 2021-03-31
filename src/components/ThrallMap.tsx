import {Circle, ImageOverlay, MapContainer, Popup, useMapEvents} from "react-leaflet";
import {CRS, LatLng, LatLngBounds, LatLngBoundsExpression, LatLngLiteral} from "leaflet";
import {ThrallList} from "./thrall-list/ThrallList";
import {Thrall} from "../model/Thrall";
import React, {useState} from "react";
import {ceCoordinateToLatLng} from "../util/conversions";

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

// NOTE: Latitude needs the sign inverted.
// southwest teleport: TeleportPlayer -342673.59375 369398.8125 -15273.344727
const southWest: LatLng = new LatLng(-369398.00000, -342934.00000);
// TeleportPlayer 475140.4375 -444603.34375 27547.671875
const northEast: LatLng = new LatLng(444603.00000, 475140.00000);
const mapBounds: LatLngBoundsExpression = new LatLngBounds(
    southWest,
    northEast
);

function MapEvents() {
    const map = useMapEvents({
        click: (event) => {
            console.log(event.latlng);
        },
        zoom: event => {

            console.log(event.target._zoom);
        },
        drag: () => {
            map.panInsideBounds(mapBounds, {animate: false});
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}

function makeMarkerForLocation(thrall: Thrall, location: LatLngLiteral) {
    return <Circle key={location.lat + '_' + location.lng}
                   radius={1000}
                   center={{lat: location.lat, lng: location.lng}}>
        <Popup>
            {thrall.name}
        </Popup>
    </Circle>
}

function makeMarkerForLocations(thrall?: Thrall) {
    return thrall?.locations.map(location => makeMarkerForLocation(thrall, ceCoordinateToLatLng(location)));
}

interface ThrallMapProps {
    data: Thrall[];
}

export function ThrallMap(props: ThrallMapProps) {
    // console.log(JSON.stringify(data));
    //
    // const [thralls] = useState(data);
    const [selectedThrall, setSelectedThrall] = useState(undefined as unknown as Thrall | undefined);
    // Use a separate focus flag to control whether the detail display or the list display is used
    // This avoids having an undefined name while the element with the details is sliding out
    const [thrallFocused, setThrallFocused] = useState(false);

    function handleSelectThrall(thrall: Thrall) {
        setSelectedThrall(thrall)
        setThrallFocused(true)
    }

    function handleDeselectThrall() {
        // While animating, we still want the thrall details visible until
        // it has slide out.
        setThrallFocused(false)
    }

    return <div className="thrall-map-wrapper">
        <MapContainer center={[0, 0]}
                      style={{height: '100vh', width: 'calc(100vw - var(--sidebar-width))'}}
                      minZoom={-8.7}
                      maxZoom={-4}
                      zoomSnap={0.1}
                      zoomDelta={0.1}
                      crs={CRS.Simple}
                      maxBounds={mapBounds}
                      zoomControl={true}
                      zoom={-8.7}>
            <ImageOverlay url={process.env.PUBLIC_URL + "/fc_assets/full_map_low_quality.jpg"} bounds={mapBounds}/>
            <MapEvents/>
            {makeMarkerForLocations(selectedThrall)}
        </MapContainer>
        <div className="sidebar-right">
            <ThrallList thralls={props.data}
                        selectedThrallFocused={thrallFocused}
                        selectedThrall={selectedThrall}
                        onDeselectThrall={handleDeselectThrall}
                        onSelectThrall={handleSelectThrall}/>
        </div>
    </div>
}
