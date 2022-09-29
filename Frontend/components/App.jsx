import React, { Component } from 'react';
import Map from './Map.jsx';
import MenuContainer from './MenuContainer.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { map: null }
    }

    render(){
        return(
            // TODO: Explain why div container is needed?
            // Place react components inside div
            <div>
                <Map setMap={(newMap)=>{
                    this.setState({map: newMap});
                }}/>
                <MenuContainer></MenuContainer>
            </div>
        );
    }
}
export default App;