import { Locator, Page } from "@playwright/test";
import { Button } from "../components/Button";
import { TiddlerEditor } from "./TiddlerEditor";

export class TiddlerViewer {
    private _page: Page;
    private _locator: Locator;

    public readonly editButton: Button<TiddlerEditor>;
    public readonly expandButton: Button;
    public readonly deleteButton: Button;

    public constructor(page: Page, title: string) {
        const escapedTitle = title.replace(/('|")/g, "\\$1");
        this._page = page;
        this._locator = page.locator(`.tc-tiddler-view-frame[data-tiddler-title="${escapedTitle}"]`);

        this.editButton = new Button(page, this.locator('.tc-tiddler-controls button[aria-label="edit"]'), {
            onClick: async () => new TiddlerEditor(page, title)
        });
        this.expandButton = new Button(page, this.locator('.tc-tiddler-controls button[aria-label="more"]'));
        this.deleteButton = new Button(page, this.locator('.tc-tiddler-controls button[aria-label="delete"]'), {
            onBeforeClick: () => page.on('dialog', dialog => dialog.accept())
        });
    }

    public async getTitle() {
        return this.locator('.tc-title').innerText();
    }

    public async getTags() {
        const locator = this.locator('.tc-tag-list-item');
        const tags = [];
        for (const tag of await locator.elementHandles()) {
            tags.push(await tag.innerText());
        }
        return tags;
    }

    public async getText() {
        return this.locator('.tc-tiddler-body').innerText();
    }

    public locator(selector: string, options?: {has?: Locator, hasText?: string|RegExp}) {
        return this._locator.locator(selector, options);
    }

    public locatorBody(selector: string, options?: {has?: Locator, hasText?: string|RegExp}) {
        return this.locator('.tc-tiddler-body').locator(selector, options);
    }
}