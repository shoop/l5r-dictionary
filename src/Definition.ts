export class Definition {
    public term: string;
    public definition: string;

    public constructor(term: string, definition: string) {
        this.term = term;
        this.definition = definition;
    }

    public firstLetter = () => this.term[0];
}

export interface IDefinitionDTO {
    term: string;
    definition: string;
}