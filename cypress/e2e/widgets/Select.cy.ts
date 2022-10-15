import { Fixtures } from "../../helpers/Fixtures";
import { TWUI } from "../../helpers/TWUI";

describe('Select widget', () => {
  beforeEach(() => {
    TWUI.init();
  })

  it('Select updates field when changing option', () => {
    Fixtures.loadTiddler('tiddler', 'widgets/select/dynamic-class.tid')

    Fixtures.withinTiddler('tiddler', () => {
        cy.get('.field-value').should('be.empty');
        cy.get('select').select(1);
        cy.get('.field-value').should('contain', 'cls-1');
        cy.get('select').select(2);
        cy.get('.field-value').should('contain', 'cls-2');
        cy.get('select').select(0);
        cy.get('.field-value').should('be.empty');
    });
  });

  it('Select with a dynamic class updates the class when needed', () => {
    Fixtures.loadTiddler('tiddler', 'widgets/select/dynamic-class.tid')

    Fixtures.withinTiddler('tiddler', () => {
        cy.get('select')
            .select(1)
                .should('have.class', 'cls-1')
                .should('not.have.class', 'cls-2')
            .select(2)
                .should('not.have.class', 'cls-1')
                .should('have.class', 'cls-2')
            .select(0)
                .should('not.have.class', 'cls-1')
                .should('not.have.class', 'cls-2');
    });
  });
})