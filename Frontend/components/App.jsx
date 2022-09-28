import React, { Component } from 'react';
import Map from './Map.jsx';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            // TODO: Explain why div container is needed?
            // Place react components inside div
            <Map />
        );
    }
}
export default App;