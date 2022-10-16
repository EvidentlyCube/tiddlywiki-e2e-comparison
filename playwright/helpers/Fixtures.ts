import { Page } from '@playwright/test';
import * as fs from 'fs';
import { TiddlyInsides } from "./TiddlyInsides";

export class Fixtures {
    private _page: Page;

    public constructor(page: Page) {
        this._page = page;
    }

    async loadTiddler(path: string) {
        const data = fs.readFileSync(`${__dirname}/../fixtures/${path}`, {encoding: "utf8"});

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

        TiddlyInsides.addTiddler(this._page, fields.title, fields);

        return fields.title;
    }
}