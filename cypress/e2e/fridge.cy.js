import fridgeData from "../fixtures/fridge_location.json"

describe('Test Pantry View',() => {

  beforeEach(() => {
    Cypress.config("interceptions", {});
    cy.visit('http://localhost:3000/fridge');
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", fridgeData ).as("GetFridgeItems")
    cy.wait("@GetFridgeItems")
    // cy.visit('http://localhost:3000/fridge');
    cy.get(".title").contains("Waste Not, Want Not")
  });

  it('should have correct title', () => {
      cy.get("h3").contains("FRIDGE");
  });

  it('should have correct item card with buttons', () => {
    cy.get(".item-card").first().contains("Chicken");
    cy.get(".item-card").first().contains("Location: fridge");
    // cy.get(".expiration").first().contains("Expiration Date: Saturday, September 03, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE")
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE")
});

  it('should have another correct item card with buttons', () => {
    cy.get(".item-card").eq(1).contains("Corn");
    cy.get(".item-card").eq(1).contains("Location: fridge");
    // cy.get(".expiration").eq(1).contains("Expiration Date: Wednesday, September 07, 2022");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").contains("ATE");
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").contains("DONATE");
  });

  it('be able to eat item', () => {
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .ate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "deleteItem", {} );
    cy.get(".item-card-container").first().should("not.contain","Chicken");
  });

  it('be able to donate item', () => {
      const donationItem = {
      "data": {
        "getUserById": {
          "name": "Edward Schaden",
          "email": "joetta.adams@wolf-grimes.name",
          "donationItems": [ 
            {
              "id": 1,
              "expirationDate": "2022-05-11T00:00:00Z",
              "location": "fridge",
              "name": "Chicken",
              "forDonation": true
            }
          ]
        }
      }
    }
    cy.get(":nth-child(1) > .item-card > :nth-child(3) > .donate-button").click();
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "getUserById", donationItem)
    cy.interceptGQL("https://waste-not-be.herokuapp.com/graphql", "updateForDonation", {} )
    cy.get('button').eq(2).click()
    cy.contains('Chicken')
  });
});