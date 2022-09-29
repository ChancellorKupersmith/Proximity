import React, { Component } from 'react';
import Map from './Map.jsx';
import MenuContainer from './MenuContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            city: null,
            houses: []
         }
        
    }

    render(){
        return(
            // TODO: Explain why div container is needed?
            // Place react components inside div
            <div>
                <Map setCityGlobal={(newCity)=>{
                    this.setState({
                        ...this.state,
                        city: newCity
                    });
                }}
                houses={this.state.houses}
                />
                <MenuContainer state={this.state} setHouses={(houses)=>{
                    this.setState({
                        ...this.state,
                        houses: houses
                    })
                }}/>
            </div>
        );
    }
}
export default App;