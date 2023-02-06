import * as React from 'react';

import "./DefinitionListHeader.scss";

import { Definition } from './Definition';

interface IProps {
    definitions: Definition[];
}

export class DefinitionListHeader extends React.Component<IProps> {
    public render() {
        const firstLetters: string[] = this.props.definitions
            .map(d => d.firstLetter())
            .filter((v, i, self) => self.indexOf(v) === i)
            .sort();
            
        return (
            <div className="DefinitionListHeader">
                {firstLetters.map(v => <span key={v} className="DefinitionListHeader_Item"><a href={`#header-${v.toLowerCase()}`}>{v}</a></span>)}
            </div>
        );
    }
}
