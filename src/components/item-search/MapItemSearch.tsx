import Autosuggest, {InputProps} from 'react-autosuggest';
import React, {useState} from 'react';
import './MapItemSearch.css';
import {MapItem, MapItemSource} from "../../model/MapItem";



interface MapItemSearchProps {
    items: MapItem[];

    itemSelect?(item: MapItem): void;
}

const translateSource = (source: MapItemSource): string => {
    switch (source) {
        case "CUSTOM_LOOT":
            return "Custom Loot"
        case "MINE":
            return "Mined"
        case "THRALL_CRAFT":
            return "Thrall-Made"
        case "TW_MERCHANT":
            return "Faction Merchant"
        case "BOSS_LOOT":
            return "TW Boss Loot"
    }
}

const translateSources = (sources: MapItemSource[]): string => {
    return sources.map(translateSource).join(", ");
}

export const MapItemSearch = (props: MapItemSearchProps) => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState([] as MapItem[]);

    const inputProps: InputProps<MapItem> = {
        onChange: (event, params) => setValue(params.newValue),
        value,
        className: 'map-item-search-input',
        placeholder: 'Item Search'
    }

    function filterSuggestions(filterValue: string) {
        const suggestions = props.items.filter(item => item.name.toLowerCase().startsWith(filterValue.toLowerCase()));
        setSuggestions(suggestions);
    }

    function onRenderSuggestion(item: MapItem) {
        if (props.itemSelect) {
            props.itemSelect(item)
        }
    }

    return <Autosuggest suggestions={suggestions}
                        getSuggestionValue={suggestion => suggestion.name}
                        inputProps={inputProps}
                        onSuggestionsFetchRequested={request => filterSuggestions(request.value)}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        onSuggestionSelected={(event, data) => onRenderSuggestion(data.suggestion)}
                        renderSuggestion={suggestion => <div className="single-suggestion">
                            <div>{suggestion.name}</div>
                            <div className="single-suggestion-source">{translateSources(suggestion.source)}</div>
                        </div>}>
    </Autosuggest>
}
