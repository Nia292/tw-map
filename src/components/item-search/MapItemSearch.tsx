import Autosuggest, {InputProps} from 'react-autosuggest';
import React, {useState} from 'react';
import './MapItemSearch.css';
import {MapItem, translateSources} from "../../model/MapItem";


interface MapItemSearchProps {
    items: MapItem[];

    itemSelect?(item: MapItem): void;
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

    function containsString(value: string, filterValue: string): boolean {
        return value.toLowerCase().includes(filterValue.toLowerCase());
    }

    function filterSuggestions(filterValue: string) {
        const suggestions = props.items.filter(item => containsString(item.name, filterValue));
        setSuggestions(suggestions.slice(0, 15));
    }

    function onSuggestionSelected(item: MapItem) {
        if (props.itemSelect) {
            props.itemSelect(item)
            setValue('')
        }
    }

    return <Autosuggest suggestions={suggestions}
                        getSuggestionValue={suggestion => suggestion.name}
                        inputProps={inputProps}
                        onSuggestionsFetchRequested={request => filterSuggestions(request.value)}
                        onSuggestionsClearRequested={() => setSuggestions([])}
                        onSuggestionSelected={(event, data) => onSuggestionSelected(data.suggestion)}
                        renderSuggestion={suggestion => <div className="single-suggestion">
                            <div>{suggestion.name}</div>
                            <div className="single-suggestion-source">{translateSources(suggestion.source)}</div>
                        </div>}>
    </Autosuggest>
}
