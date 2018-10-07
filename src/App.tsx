import * as React from 'react';

import './App.css';

import { Definition } from './Definition';
import { DefinitionListHeader } from './DefinitionListHeader';
import { DefinitionListItem } from './DefinitionListItem';

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
    fetch('definitions.txt')
      .then(this.onReceiveData);
  }

  public onReceiveData = (response: Response) => {
    response.text().then(val => {
      const newDefinitions = this.parseDefinitions(val);
      this.setState({ definitions: newDefinitions });
    });
  }

  public parseDefinitions(text: string): Definition[] {
      // Parse definitions
      const lines = text.split(/\r?\n/) || [];

      const newDefinitions: Definition[] = [];
      let term: string = "";
      let definition: string = "";
      lines.forEach((line) => {
        if (line === "") {
          newDefinitions.push(new Definition(term, definition));
          term = "";
          definition = "";
          return;
        }

        if (term === "") {
          term = line;
          return;
        }

        definition += line;
      });

      if (term !== "" && definition !== "") {
        newDefinitions.push(new Definition(term, definition));
      }

      return newDefinitions;
  }

  public render() {
    if (this.state.definitions.length === 0) {
      return <div>Loading...</div>;
    }

    const definitions = this.state.definitions
      .map((d, i) => <DefinitionListItem key={`definition-${i}`} term={d.term} definition={d.definition} />);
    return (
      <div>
        <DefinitionListHeader definitions={this.state.definitions} />
        {definitions}
      </div>
    );
  }
}

export default App;
