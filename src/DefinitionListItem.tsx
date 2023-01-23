import { marked } from 'marked';
import * as React from 'react';

import "./DefinitionListItem.css";

interface IProps {
    id: string;
    term: string;
    definition: string;
    refToSet?: React.RefObject<HTMLDivElement>;
}

export class DefinitionListItem extends React.Component<IProps> {
    public render() {
        marked.setOptions({ breaks: false });
        const definitionHtml = marked(this.props.definition);

        let term = <div className="DefinitionListItem_Term" id={this.props.id}>{this.props.term}</div>;
        if (this.props.refToSet) {
            term = <div className="DefinitionListItem_Term" id={this.props.id} ref={this.props.refToSet}>{this.props.term}</div>;
        }

        return (
            <div className="DefinitionListItem">
                {term}
                <div className="DefinitionListItem_Definition" dangerouslySetInnerHTML={{__html: definitionHtml}} />
            </div>
        )
    }    
}
