import {useMapEvents} from "react-leaflet";
import {LatLngBoundsExpression} from "leaflet";
import {ZoomCenter} from "../../model/ZoomCenter";

export interface MapEventProps {
    mapBounds: LatLngBoundsExpression;
    onZoomCenterChange(center: ZoomCenter): void;
}

export function MapEvents(props: MapEventProps) {
    const map = useMapEvents({
        zoom: () => {
            props.onZoomCenterChange({
                zoom: map.getZoom(),
                center: map.getCenter(),
                preventPan: true
            })
        },
        drag: () => {
            map.panInsideBounds(props.mapBounds, {animate: false});
            props.onZoomCenterChange({
                zoom: map.getZoom(),
                center: map.getCenter(),
                preventPan: true
            })
        },
    })
    return null
}
