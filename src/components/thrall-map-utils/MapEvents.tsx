import {useMapEvents} from "react-leaflet";
import {LatLngBoundsExpression} from "leaflet";
import {ZoomCenter} from "../../model/ZoomCenter";

export interface MapEventProps {
    mapBounds: LatLngBoundsExpression;
    onZoomCenterChange(center: ZoomCenter): void;
}

export function MapEvents(props: MapEventProps) {
    const map = useMapEvents({
        click: (event) => {
            console.log(event.latlng);
        },
        zoom: event => {
            props.onZoomCenterChange({
                zoom: map.getZoom(),
                center: map.getCenter(),
                preventPan: true
            })
            console.log(event.target._zoom);
        },
        drag: () => {
            map.panInsideBounds(props.mapBounds, {animate: false});
            props.onZoomCenterChange({
                zoom: map.getZoom(),
                center: map.getCenter(),
                preventPan: true
            })
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}
