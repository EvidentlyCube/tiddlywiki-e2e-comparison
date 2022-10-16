import { Locator, Page } from "@playwright/test";
import { Button } from "../components/Button";
import { TextInput } from "../components/TextInput";
import { TiddlerViewer } from "./TiddlerViewer";

export class TiddlerEditor {
    private _page: Page;
    private _title: string;
    private _locator: Locator;

    public readonly titleInput: TextInput;
    public readonly tagNameInput: TextInput;
    public readonly addTagButton: Button;
    public readonly textInput: TextInput;
    public readonly newFieldNameInput: TextInput;
    public readonly newFieldValueInput: TextInput;
    public readonly newFieldAddButton: Button;

    public readonly saveChangesButton: Button<TiddlerViewer>;

    public constructor(page: Page, title: string) {
        const draftTitle = `Draft of '${title}'`;
        const escapedTitle = draftTitle.replace(/('|")/g, "\\$1");
        this._page = page;
        this._title = title;
        this._locator = page.locator(`.tc-tiddler-edit-frame[data-tiddler-title="${escapedTitle}"]`);

        this.titleInput = new TextInput(page, this._locator.locator('input.tc-titlebar'), {
            afterType: async text => this._title = text
        });
        this.tagNameInput = new TextInput(page, this._locator.locator('.tc-add-tag-name input'));
        this.addTagButton = new Button(page, this._locator.locator('.tc-add-tag-button button'));
        this.textInput = new TextInput(page, this._locator.locator('.tc-dropzone-editor textarea'));
        this.newFieldNameInput = new TextInput(page, this._locator.locator('.tc-edit-field-add-name-wrapper input'));
        this.newFieldValueInput = new TextInput(page, this._locator.locator('.tc-edit-field-add-value input'));
        this.newFieldAddButton = new Button(page, this._locator.locator('.tc-edit-field-add-button button'));

        this.saveChangesButton = new Button(page, this._locator.locator('.tc-tiddler-controls button[aria-label="ok"]'), {
            onClick: async () => new TiddlerViewer(this._page, this._title)
        });
    }

    public getFieldValueInput(fieldName: string) {
        return new TextInput(this._page, this._locator.locator(`.tc-edit-field-name:text("${fieldName}:")`).locator('..').locator('.tc-edit-field-value input'));
    }
}