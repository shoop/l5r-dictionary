import * as React from 'react';

import "./DefinitionListItemHeader.scss";

interface IProps {
    letter: string;
}

export class DefinitionListItemHeader extends React.Component<IProps> {
    public render() {
        return (
            <div className="DefinitionListItemHeader" id={`header-${this.props.letter.toLowerCase()}`}>{this.props.letter}</div>
        )
    }
}
