export class Definition {
    public id: string;
    public term: string;
    public definition: string;

    public constructor(id: string, term: string, definition: string) {
        this.id = id;
        this.term = term;
        this.definition = definition;
    }

    public firstLetter = () => this.term[0];
}

export interface IDefinitionDTO {
    id: string;
    term: string;
    definition: string;
}