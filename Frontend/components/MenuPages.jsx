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
        this.city = props.city;
        console.log(this.city);
        this.state = {
            stays: []
        }
        this.getHouses;
    }

    async getHouses(city){
        const getHousesUrl = `http://localhost:3000/houses/?lat=${city.lat}&lng=${city.lng}`;
        // const getHousesUrl = '/houses';
        console.log(getHousesUrl);
        try{
            const res = fetch(getHousesUrl)
            .then((res) => res.json())
            .then((results)=>{
                console.log(results);
                this.props.setHouses(results);
            }).catch((err) => console.log(err));
            // const results = await res.json();
            // console.log(results.length);
        } catch(err){
            console.log(err);
        }
    }

    render() {
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
                    <button id='getHouses' onClick={async ()=> await this.getHouses(this.props.city)}></button>
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
