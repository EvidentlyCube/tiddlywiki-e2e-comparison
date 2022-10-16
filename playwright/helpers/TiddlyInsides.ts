import { Page } from "@playwright/test";

export const TiddlyInsides = {
    async addTiddler(page:Page,  title: string, fields: Record<string, string>) {
        page.evaluate(data => {
            const {title, fields} = data;
            const $tw = (window as any).$tw;

            $tw.wiki.addTiddler(new $tw.Tiddler({title, ...fields}));
        }, {title, fields})
    },
};