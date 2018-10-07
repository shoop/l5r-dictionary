import * as React from 'react';

import { Definition } from './Definition';
import { DefinitionListHeader } from './DefinitionListHeader';
import { DefinitionListItem } from './DefinitionListItem';

import "./DefinitionList.css";
import { DefinitionListItemHeader } from './DefinitionListItemHeader';

interface IProps {
    definitions: Definition[];
}

export class DefinitionList extends React.Component<IProps> {
    public render() {
        let items: JSX.Element[] = [];

        const groupedDefinitions = this.groupByFirstLetter(this.props.definitions);
        groupedDefinitions.forEach((definitions, key) => {
            items.push(<DefinitionListItemHeader key={`definition-${key}-header`} letter={key} />);
            const keyDefinitions = definitions
                .map((d, i) => <DefinitionListItem key={`definition-${key}-${i}`} term={d.term} definition={d.definition} />);
            items = items.concat(keyDefinitions);
        });
        
        return (
            <div>
                <DefinitionListHeader definitions={this.props.definitions} />
                {items}
            </div>
        )
    }

    private groupByFirstLetter(list: Definition[]): Map<string, Definition[]> {
        const map = new Map<string, Definition[]>();
        list.forEach((item) => {
            const key = item.firstLetter();
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
    }
}