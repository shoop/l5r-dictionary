import * as React from 'react';

import { Definition } from './Definition';
import { DefinitionListHeader } from './DefinitionListHeader';
import { DefinitionListItem } from './DefinitionListItem';

import "./DefinitionList.scss";
import { DefinitionListItemHeader } from './DefinitionListItemHeader';

interface IProps {
    definitions: Definition[];
    listRef: React.RefObject<HTMLDivElement>;
    hashedRef: React.RefObject<HTMLDivElement>;
}

export class DefinitionList extends React.Component<IProps> {

    public render() {
        let items: JSX.Element[] = [];

        const groupedDefinitions = this.groupByFirstLetter(this.props.definitions);
        const hashedId = window.location.hash.substr(1);
        groupedDefinitions.forEach((definitions, key) => {
            items.push(<DefinitionListItemHeader key={`definition-${key}-header`} letter={key} />);
            const keyDefinitions = definitions
                .map((d, i) => {
                    if (hashedId === d.id) {
                        return <DefinitionListItem key={`definition-${key}-${i}`} id={d.id} term={d.term} definition={d.definition} refToSet={this.props.hashedRef} />;    
                    }

                    return <DefinitionListItem key={`definition-${key}-${i}`} id={d.id} term={d.term} definition={d.definition} />;
                });
            items = items.concat(keyDefinitions);
        });
        
        return (
            <div className="DefinitionList" ref={this.props.listRef}>
                <DefinitionListHeader definitions={this.props.definitions} />
                <div className="DefinitionList_Content">
                {items}
                </div>
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
