
import { Page } from "@playwright/test";
import { Config } from "../../config/config.example";
import { Button } from "./components/Button";
import { Fixtures } from "./Fixtures";
import { TiddlyInsides } from "./TiddlyInsides";
import { Search } from "./ui/Search";
import { TiddlerEditor } from "./ui/TiddlerEditor";
import { TiddlerViewer } from "./ui/TiddlerViewer";

interface TiddlyUIOptions {
    animationDuration: number;
    framedEditor: boolean;
}
const DefaultOptions: TiddlyUIOptions = {
    animationDuration: 0,
    framedEditor: false
}
export class Tiddly {
    private _page: Page;

    public readonly fixtures: Fixtures;
    public readonly search: Search;
    public readonly newTiddlerButton: Button<TiddlerEditor>;

    public constructor(page: Page) {
        this._page = page;
        this.fixtures = new Fixtures(page);
        this.search = new Search(page);
        this.newTiddlerButton = new Button(page, `.tc-page-controls button[aria-label="new tiddler"]`, {
            onClick: async () => {
                const title = await this.getTopmostTiddlerName();
                const draftOfTitle = title.replace(/^Draft of '(.+?)'$/, '$1');

                return new TiddlerEditor(page, draftOfTitle);
            }
        });
    }

    public async init(options: Partial<TiddlyUIOptions> = {}) {
        const finalOptions = {...DefaultOptions, ...options};

        await this._page.goto(Config.url);
        await TiddlyInsides.addTiddler(this._page, "$:/config/AnimationDuration", {text: finalOptions.animationDuration.toString()});
        await TiddlyInsides.addTiddler(this._page, "$:/config/TextEditor/EnableToolbar", {text: finalOptions.framedEditor ? "" : "no"});
    }

    public async getTopmostTiddlerName() {
        return this._page.locator('.tc-story-river .tc-tiddler-frame').first().getAttribute('data-tiddler-title');
    }

    public async openTiddler(title: string) {
        await this.search.input.clearAndType(title);
        await this.search.clickResult(title);

        return new TiddlerViewer(this._page, title);
    }
};