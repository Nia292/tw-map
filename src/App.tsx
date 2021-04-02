import React from 'react';
import './css/variables.css'
import {ThrallMap} from "./components/ThrallMap";
import {Thrall} from "./model/Thrall";

interface AppState {
    data: Thrall[]
}

export class App extends React.Component<any, AppState> {

    constructor(props: any) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        fetch(window.location.href + '/data.json')
            .then(value => value.json())
            .then(data => this.setState({data}))
    }

    render() {
        return (
            <div>
                <ThrallMap data={this.state.data}/>
            </div>
        );
    }
}

export default App;
