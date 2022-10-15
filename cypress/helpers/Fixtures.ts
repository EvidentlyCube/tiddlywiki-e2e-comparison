import { TiddlyInsides } from "./TiddlyInsides";
import { TWUI } from "./TWUI";

export const Fixtures = {
    loadTiddler(name: string, path: string, open: boolean = true) {
        return cy.fixture(path).then((data:string) => {
            const lines = data.replace(/\r\n/g, "\n").split("\n");

            const fields:any = {};
            let i = 0;
            for (i = 0; i < lines.length; i++) {
                const line = lines[i];

                if (line.trim() === "") {
                    break;
                }

                const colonIndex = line.indexOf(":");
                if (colonIndex === -1) {
                    throw new Error(`Failed to read field in fixture ${path} on line ${i+1}`);
                }

                const field = line.substring(0, colonIndex);
                const value = line.substring(colonIndex + 1).trim();

                fields[field] = value;
            }

            fields.text = lines.slice(i).join("\n");
            TiddlyInsides.addTiddler(fields.title, fields);
            cy.wrap(fields.title).as(name);

            if (open) {
                TWUI.openTiddlerByName(fields.title);
            }
        });
    },
    withinTiddler(fixtureName: string, callback: () => void) {
        cy.get(`@${fixtureName}`).then((name: any) => {
            TWUI.withinTiddler(name, callback);
        })
    }
}