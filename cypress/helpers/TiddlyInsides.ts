
export const TiddlyInsides = {
    addTiddler(title: string, fields: Record<string, string>) {
        cy.window().then(win => {
            const $tw = (win as any).$tw;

            $tw.wiki.addTiddler(new $tw.Tiddler({title, ...fields}));
        });
    },
};