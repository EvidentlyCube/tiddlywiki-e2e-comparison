import { EditTiddler } from "./EditTiddler";
import { TiddlyUI } from "./TiddlyUI";

export class ViewTiddler {
    private _title: string;
    private _baseSelector: string;

    constructor(title: string) {
        const escapedName = title.replace(/("|')/g, "\\$1");
        this._title = title;
        this._baseSelector = `.tc-tiddler-frame[data-tiddler-title="${escapedName}"]`;
    }

    private within(callback: () => void) {
        cy.get(this._baseSelector).within(callback);

        return this;
    }

    public clickEdit() {
        this.within(() => {
            cy.get('.tc-tiddler-controls button[aria-label=edit]').click();
        });

        return new EditTiddler(this._title);
    }

    public shouldTitle(criteria: string, value?: string) {
        return this.within(() => {
            cy.get('.tc-title').should(criteria, value);
        });
    }

    public shouldTags(criteria: string, value?: string) {
        return this.within(() => {
            cy.get('.tc-tag-label').should(criteria, value);
        });
    }

    public shouldText(criteria: string, value?: string) {
        return this.within(() => {
            cy.get('.tc-tiddler-body').should(criteria, value);
        });
    }

    public clickDelete() {
        return this.within(() => {
            cy.get('.tc-tiddler-controls button[aria-label="more"]').click();
            cy.get('.tc-tiddler-controls button[aria-label="delete"]').click({force: true});
        });
    }
}