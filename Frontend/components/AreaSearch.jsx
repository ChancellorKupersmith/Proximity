import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from "react-cool-onclickoutside";

const AreaSearchBar = ({ city, setCityLocation, setGlobalCity })=> {
    // Use places auto complete module to give suggestions of cities from google api
    const {
        value,
        suggestions: {data},
        setValue,
        clearSuggestions 
    } = usePlacesAutocomplete({
        requestOptions: {
            location: city,
            // 200 km
            radius: 200 * 1000,
        }
    });
    // Clear suggestions when clicking outside component
    const clearSuggests = useOnclickOutside(() => {
        clearSuggestions();
    })
    // As user types update google places suggestions
    const onInputValueChange = (event) => {
        setValue(event.target.value);
    }
    // When user selects a place suggestion
    const onSuggestionSelect = (description) => async () => {
            // Update place value and clear suggestions
            setValue(description, false);
            clearSuggestions();
            // Get lat and lng from getGeocode
            const results = await getGeocode({ address: description });
            const { lat, lng } = await getLatLng(results[0]);
            // and update city area
            setCityLocation({ lat, lng });
            setGlobalCity({lat, lng});
            
        }
    // Render list elements of suggestions, when list el clicked update city value
    const renderSuggestions = () =>{
        // console.log(data);
        return data.map(({place_id, description}) => {
            return (
                <li key={place_id} 
                    onClick={onSuggestionSelect(description)}
                    onKeyDown={onSuggestionSelect(description)}
                >
                    {description}
                </li>
            );
        });
    }



// Render Component
    return (
        <div id="search-container" className="search">
            <div className="search-input">
                <input 
                    typeof="text" 
                    placeholder="Area/City" 
                    onChange={onInputValueChange} 
                    value={value}
                />
            </div>
            <div className="search-suggestions">
                <ul>{ renderSuggestions() }</ul>
            </div>
        </div>
    )
}

export default AreaSearchBar;