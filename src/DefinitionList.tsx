import * as React from 'react';

import { Definition } from './Definition';
import { DefinitionListHeader } from './DefinitionListHeader';
import { DefinitionListItem } from './DefinitionListItem';

import "./DefinitionList.css";

interface IProps {
    definitions: Definition[];
}

export class DefinitionList extends React.Component<IProps> {
    public render() {
        const definitions = this.props.definitions
            .map((d, i) => <DefinitionListItem key={`definition-${i}`} term={d.term} definition={d.definition} />);
        return (
            <div>
                <DefinitionListHeader definitions={this.props.definitions} />
                {definitions}
            </div>
        )
    }    
}