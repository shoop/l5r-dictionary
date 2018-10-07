import * as React from 'react';

import './App.css';

import { Definition, IDefinitionDTO } from './Definition';
import { DefinitionList } from './DefinitionList';

interface IAppState {
    definitions: Definition[];
}

class App extends React.Component<{}, IAppState> {
    public constructor(props: {}) {
        super(props);
        
        this.state = { definitions: [] };
        
        this.startFetchData();
    }
    
    public startFetchData = () => {
        fetch('index.php/dictionary.json')
            .then(this.onReceiveData);
    }
    
    public onReceiveData = (response: Response) => {
        response.json().then(val => {
            const newDefinitions = (val.definitions as IDefinitionDTO[])
                .map((v) => new Definition(v.term, v.definition));
            newDefinitions.sort((a, b) => {
                return a.term.localeCompare(b.term);
            })
            this.setState({ definitions: newDefinitions });
        });
    }
    
    public render() {
        if (this.state.definitions.length === 0) {
            return <div>Loading...</div>;
        }
        
        return <DefinitionList definitions={this.state.definitions} />
    }
}

export default App;
