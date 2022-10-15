
export class EditTiddler {
    private _baseSelector: string;
    constructor(baseSelector: string) {
        this._baseSelector = baseSelector;
    }

    private within(callback: () => void) {
        cy.get(`${this._baseSelector}`).first().within(callback);

        return this;
    }
    setTitle(title: string) {
        return this.within(() => {
            cy.get('input.tc-titlebar').type(title);
        });
    }
    setText(content: string) {
        return this.within(() => {
            cy.get('textarea.tc-edit-texteditor-body').clear().type(content);
        });
    }
    addTag(tag: string) {
        return this.within(() => {
            cy.get('.tc-add-tag-name input').type(tag);
            cy.get('.tc-add-tag-button button').click();
        });
    }
    save() {
        return this.within(() => {
            cy.get('.tc-tiddler-controls button[aria-label="ok"]').click();
        })
    }
}