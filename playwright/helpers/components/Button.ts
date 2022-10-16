import { Locator, Page } from "@playwright/test";

interface ButtonOptions<TClickReturn> {
    onBeforeClick: () => void;
    onClick: () => Promise<TClickReturn>;
}

export class Button<TClickReturn = undefined> {
    private _page: Page;
    private _locator:Locator;
    private _options: Partial<ButtonOptions<TClickReturn>>;

    public constructor(page: Page, selector: string|Locator, options: Partial<ButtonOptions<TClickReturn>> = {}) {
        this._page = page;
        this._locator = typeof selector === 'string'
            ? page.locator(selector)
            : selector;
        this._options = options;
    }

    public async click(): Promise<TClickReturn> {
        this._options.onBeforeClick?.();

        await this._locator.click();

        return this._options.onClick?.();
    }
}