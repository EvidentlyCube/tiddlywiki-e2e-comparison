
import { Config } from "../../config/config";
import { EditTiddler } from "./EditTiddler";

interface TiddlyUIOptions {
    animationDuration: number;
    framedEditor: boolean;
}
const DefaultOptions: TiddlyUIOptions = {
    animationDuration: 0,
    framedEditor: false
}
export const TiddlyUI = {
    init(options: Partial<TiddlyUIOptions> = {}) {
        cy.visit(Config.url).get('.tc-story-river').window().then(win => {
            const $tw = (win as any).$tw;
            const finalOptions = {...DefaultOptions, ...options};

            TiddlyUI.setConfig("$:/config/AnimationDuration", finalOptions.animationDuration.toString(), $tw);
            TiddlyUI.setConfig("$:/config/TextEditor/EnableToolbar", finalOptions.framedEditor ? "" : "no", $tw);
        });
        cy.get('button[class*="tc-btn-%24%3A%2Fcore%2Fui%2FButtons%2Fclose"]').click();
    },
    setConfig(title: string, text: string, $tw:any) {
        $tw.wiki.addTiddler(new $tw.Tiddler({title, text}));
    },
    clickNewTiddler():EditTiddler {
        cy.get('button[class*="tc-btn-%24%3A%2Fcore%2Fui%2FButtons%2Fnew-tiddler"]').click();

        return new EditTiddler(`New Tiddler`);
    },
    openTiddlerByName(name: string) {
        cy.get('.tc-sidebar-search input[type="search"]').type(name);
        cy.get('.tc-search-results a').first().click();
    },
    search(name: string) {
        cy.get('.tc-sidebar-search input[type="search"]').clear().type(name);
    },
    withinSearchList(callback: () => void) {
        cy.get('.tc-sidebar-search .tc-search-drop-down').within(callback);
    },
    withinTiddler(tiddlerName: string, callback: () => void) {
        cy.get(`.tc-tiddler-frame[data-tiddler-title="${tiddlerName}"]`).within(callback);
    }
};