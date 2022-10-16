import { Locator, Page } from "@playwright/test";
import { TextInput } from "../components/TextInput";

export class Search {
    private _page: Page;
    private _locator: Locator;

    public readonly input: TextInput;

    public constructor(page: Page) {
        this._page = page;
        this._locator = page.locator('.tc-sidebar-search');

        this.input = new TextInput(page, this._locator.locator(`input[type=search]`));
    }

    public async getResultCount() {
        const text = await this._locator.locator('button small', {hasText: " matches"}).innerText();

        return parseInt(text.replace(/^(\d+).+$/, '$1'));
    }

    public async clickResult(title: string) {
        await this._locator.locator(`.tc-search-results a:text("${title}")`).first().click();
    }
}