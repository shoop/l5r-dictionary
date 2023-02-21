import * as React from 'react';

import './App.scss';

import { Definition, IDefinitionDTO } from './Definition';
import { DefinitionList } from './DefinitionList';

interface IAppState {
    loading: boolean;
    definitions: Definition[];
}

class App extends React.Component<{}, IAppState> {
    private listRef: React.RefObject<HTMLDivElement>;
    private hashedRef: React.RefObject<HTMLDivElement>;

    public constructor(props: {}) {
        super(props);
        
        this.state = { loading: true, definitions: [] };
        this.listRef = React.createRef<HTMLDivElement>();
        this.hashedRef = React.createRef<HTMLDivElement>();

        this.startFetchData();
    }
    
    public startFetchData = () => {
        fetch('dictionary.php/dictionary.json')
            .then(this.onReceiveData);
    }
    
    public onReceiveData = (response: Response) => {
        response.json().then(val => {
            const newDefinitions = (val.definitions as IDefinitionDTO[])
                .map((v) => new Definition(v.id, v.term, v.definition));
            newDefinitions.sort((a, b) => {
                return a.term.localeCompare(b.term);
            })
            this.setState({ loading: false, definitions: newDefinitions });
        });
    }
    
    public render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }
        
        return <DefinitionList definitions={this.state.definitions} listRef={this.listRef} hashedRef={this.hashedRef}/>;
    }

    public componentDidUpdate = () => {
        if (this.listRef.current != null) {
            const promises: Array<Promise<void>> = [];
            const imgs = Array.from(this.listRef.current.getElementsByTagName("img"));
            imgs.forEach((img) => {
                promises.push(new Promise<void>((resolve, reject) => {
                    if (!img.complete) {
                        img.onload = () => {
                            resolve();
                        }
                    }
                }));
            });

            Promise.all(promises)
                .then((v) => {
                    if (this.hashedRef.current !== null) {
                        this.hashedRef.current.scrollIntoView();
                    }            
                });
        }
    }
}

export default App;
