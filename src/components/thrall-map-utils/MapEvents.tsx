import {useMapEvents} from "react-leaflet";
import {LatLngBoundsExpression} from "leaflet";

export function MapEvents(props: {mapBounds: LatLngBoundsExpression}) {
    const map = useMapEvents({
        click: (event) => {
            console.log(event.latlng);
        },
        zoom: event => {
            console.log(event.target._zoom);
        },
        drag: () => {
            map.panInsideBounds(props.mapBounds, {animate: false});
        },
        locationfound: (location) => {
            console.log('location found:', location)
        },
    })
    return null
}
