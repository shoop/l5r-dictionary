import * as React from 'react';

import "./DefinitionListItem.css";

interface IProps {
    term: string;
    definition: string;
}

export class DefinitionListItem extends React.Component<IProps> {
    public render() {
        return <div className="DefinitionListItem">
            <dt>{this.props.term}</dt>
            <dd>{this.props.definition}</dd>
        </div>
    }    
}