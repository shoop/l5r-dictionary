import * as React from 'react';

import "./DefinitionListItemHeader.css";

interface IProps {
    letter: string;
}

export class DefinitionListItemHeader extends React.Component<IProps> {
    public render() {
        return (
            <div className="DefinitionListItemHeader"><a id={`header-${this.props.letter.toLowerCase()}`}>{this.props.letter}</a></div>
        )
    }
}
