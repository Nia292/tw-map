import {useMap} from "react-leaflet";
import {ZoomCenter} from "../../model/ZoomCenter";

export function SetViewOnClick(props: { location?: ZoomCenter }) {
    const map = useMap();
    if (props.location && !props.location.preventPan) {
        const zoom = props.location.zoom ? props.location.zoom : map.getZoom();
        const center = props.location.center ? props.location.center : map.getCenter()
        map.flyTo(center, zoom);
    }
    return null;
}
