import { ViewTiddler } from "./ViewTiddler";

export class EditTiddler {
    private _title: string;
    private _baseSelector: string;
    constructor(title: string) {
        const escapedName = title.replace(/("|')/g, "\\$1");
        this._title = title;
        this._baseSelector = `.tc-tiddler-frame[data-tiddler-title="Draft of '${escapedName}'"]`;
    }

    private getSelf(){
        return cy.get(`${this._baseSelector}`).first();
    }

    private within(callback: () => void) {
        this.getSelf().within(callback);

        return this;
    }
    setTitle(title: string) {
        this._title = title;

        return this.within(() => {
            cy.get('input.tc-titlebar').type(title, {parseSpecialCharSequences: false});
        });
    }
    setText(content: string) {
        return this.within(() => {
            cy.get('textarea.tc-edit-texteditor-body').clear().type(content, {parseSpecialCharSequences: false});
        });
    }
    addField(name: string, value: string) {
        return this.within(() => {
            cy.get('.tc-edit-field-add-name-wrapper input').clear().type(name, {parseSpecialCharSequences: false});
            cy.get('.tc-edit-field-add-value input').clear().type(value, {parseSpecialCharSequences: false});
            cy.get('.tc-edit-field-add-button button').click()
        });
    }
    setField(name: string, value: string) {
        return this.within(() => {
            cy.get('.tc-edit-field-name').contains(`${name}:`).parent().find('input').clear().type(value, {parseSpecialCharSequences: false});
        });
    }
    addTag(tag: string) {
        return this.within(() => {
            cy.get('.tc-add-tag-name input').type(tag, {parseSpecialCharSequences: false});
            cy.get('.tc-add-tag-button button').click();
            cy.get('.tc-tiddler-title').click();
        });
    }
    save() {
        this.within(() => {
            cy.get('.tc-tiddler-controls button[aria-label="ok"]').click();
        });

        return new ViewTiddler(this._title);
    }
}