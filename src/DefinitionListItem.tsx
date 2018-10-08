import * as marked from 'marked';
import * as React from 'react';

import "./DefinitionListItem.css";

interface IProps {
    id: string;
    term: string;
    definition: string;
}

export class DefinitionListItem extends React.Component<IProps> {
    public render() {
        marked.setOptions({ breaks: false });
        const definitionHtml = marked(this.props.definition);
        return (
            <div className="DefinitionListItem">
                <div className="DefinitionListItem_Term" id={this.props.id}>{this.props.term}</div>
                <div className="DefinitionListItem_Definition" dangerouslySetInnerHTML={{__html: definitionHtml}} />
            </div>
        )
    }    
}