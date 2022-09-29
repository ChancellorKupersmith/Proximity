import React, { Component } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';

const convertAddressToGeoCode = async (address)=>{
    console.log(address);
    const results = await getGeocode({ address: address });
    if(results.length > 0){
        const position = await getLatLng(results[0]);
        return position;
    }
}
class SearchBar extends Component {
    constructor(props) {
        super(props);
        
    }
    render(){
        return (
            <div id="search-container-address" className="search">
            <div className="search-input">
                <input 
                    typeof="text" 
                    placeholder="Address" 
                    onChange={ async (value)=>{
                        const pos = await convertAddressToGeoCode(value.target.value);
                        this.props.findAddress(pos);
                    }} 
                />
            </div>
        </div>
        );
    }
}

export class StaysPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stays: []
        }
    }
    render (){
        return (
            <div id='stays-page' className='stays-page' >
                <div className='menu-page'>
                    <SearchBar findAddress={(pos)=> {
                            let stays = [...this.state.stays];
                            this.setState({
                                ...this.state,
                                stays: stays
                            });
                        }}
                    />
                </div>
            </div>
        )
    }
}

export class GosPage extends Component {
    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div id='gos-page' className='gos-page' >
                <div className='menu-page'>

                </div>
            </div>
        )
    }
}

export class FavsPage extends Component {
    constructor(props) {
        super(props);
    }

    render (){
        return (
            <div id='favs-page' className='favs-page' >
                <div className='menu-page'>

                </div>
            </div>
        )
    }
}
