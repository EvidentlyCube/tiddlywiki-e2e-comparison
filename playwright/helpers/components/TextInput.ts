import { Locator, Page } from "@playwright/test";

interface TextInputOptions {
    afterType: (text: string) => Promise<unknown>;
}

export class TextInput {
    private _locator: Locator;
    private _options: Partial<TextInputOptions>;

    public constructor(page: Page, selector: string|Locator, options: Partial<TextInputOptions> = {}) {
        this._locator = typeof selector === 'string'
            ? page.locator(selector)
            : selector;
        this._options = options;
    }

    public async type(text: string) {
        await this._locator.type(text);

        this._options.afterType?.(text);
    }

    public async clearAndType(text: string) {
        await this._locator.fill('');
        await this._locator.type(text);

        this._options.afterType?.(text);
    }

    public async fill(text: string) {
        await this._locator.fill(text);

        this._options.afterType?.(text);
    }
}