import { expect } from '@playwright/test';

class SignUpUserPage {

/**
   * @param {Page} page - The Playwright page object for interacting with the web page.
   */
  constructor(page) {
    this.page = page;
    this.firstName = this.page.getByLabel('First name');
    this.lastName = this.page.getByLabel('Last name');
    this.workEmail = this.page.getByLabel('Work e-mail');
    this.phoneNumber = this.page.getByLabel('Phone number');
    this.userPassword = this.page.locator('//input[@id="textfield-:R2kmkmm:" and @name="password"]')
    this.companyName = this.page.getByLabel('Company name');
    this.countryDropDown = this.page.locator('#registration-country-input');
    this.informationMedia = this.page.getByLabel('How did you hear about us?');
    this.termsAndConditionCheck = this.page.locator('label:has(input[name="acceptTos"]) input[name="acceptTos"]');
    this.receiveUpdatesCheck = this.page.locator('label').filter({ hasText: 'I\'m happy to receive very' });
    this.createAccountButton = this.page.locator('text="Create an account"');
  }

  /**
 * Fills in the first name field on the sign-up form.
 *
 * This method enters the provided first name into the "First name" input field on the sign-up page.
 *
 * @param {string} firstName - The first name to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the first name has been filled in.
 */
  async addFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  /**
 * Fills in the last name field on the sign-up form.
 *
 * This method enters the provided last name into the "Last name" input field on the sign-up page.
 *
 * @param {string} lastName - The last name to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the last name has been filled in.
 */
  async addLastName(lastName) {
    await this.lastName.fill(lastName);
  }

  /**
 * Fills in the work email field on the sign-up form and logs the email to the console.
 *
 * This method enters the provided work email into the "Work e-mail" input field on the sign-up page.
 *
 * @param {string} workEmail - The work email to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the work email has been filled in and logged.
 */
  async addWorkEmail(workEmail) {
    await this.workEmail.fill(workEmail);
  }

  /**
 * Fills in the phone number field on the sign-up form.
 *
 * This method enters the provided phone number into the "Phone number" input field on the sign-up page.
 *
 * @param {string} phoneNumber - The phone number to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the phone number has been filled in.
 */
  async addPhoneNumber(phoneNumber) {
    await this.phoneNumber.fill(phoneNumber);
  }

  /**
 * Fills in the password field on the sign-up form.
 *
 * This method enters the provided password into the "Password" input field on the sign-up page.
 *
 * @param {string} passwordValue - The password to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the password has been filled in.
 */
  async addPassword(passwordValue) {
    await this.userPassword.fill(passwordValue);
  }
  /**
 * Fills in the company name field on the sign-up form.
 *
 * This method enters the provided company name into the "Company name" input field on the sign-up page.
 *
 * @param {string} companyName - The company name to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the company name has been filled in.
 */
  async addCompanyName(companyName) {
    await this.companyName.fill(companyName);
  }

  /**
 * Searches for a country in the dropdown and returns the text of the active option.
 *
 * This method interacts with a country dropdown by clicking it, clearing any existing text,
 * entering the search term, and simulating a keyboard action to select the first option. 
 * It then retrieves the `aria-activedescendant` attribute value, locates the active option,
 * and returns its text content.
 *
 * @param {string} country - The name of the country to search for in the dropdown.
 * @returns {Promise<string>} A promise that resolves with the text content of the active dropdown option.
 * @throws {Error} Throws an error if the `aria-activedescendant` attribute is not set.
 */
  async searchNewCountryValue(country) {
    await this.countryDropDown.click();
    await this.countryDropDown.fill('');
    await this.countryDropDown.fill(country);
    await this.page.keyboard.press('ArrowDown');
    const ariaActiveDescendant = await this.countryDropDown.getAttribute('aria-activedescendant');
    if (ariaActiveDescendant) {
      return await this.page.locator(`#${ariaActiveDescendant}`).textContent();
    } else {
      throw new Error('aria-activedescendant attribute is not set');
    }
  }

  /**
   * Selects a country from the dropdown by entering the country name.
   *
   * This method fills the country dropdown with the provided country name and then retrieves
   * the input value from the dropdown to confirm the selection.
   *
   * @param {string} country - The name of the country to select from the dropdown.
   * @returns {Promise<string>} A promise that resolves with the value of the country input field after selection.
   */
  async selectNewCountryValue(country) {
    await this.countryDropDown.click();
    await this.countryDropDown.fill('');
    await this.countryDropDown.fill(country);
    await this.page.keyboard.press('ArrowDown');
    await this.page.keyboard.press('Enter');
    return await this.countryDropDown.inputValue();
  }

  /**
 * Fills in the information media field on the sign-up form.
 *
 * This method enters the provided information media (e.g., how the user heard about the company) 
 * into the "How did you hear about us?" field on the sign-up page.
 *
 * @param {string} infoMedia - The information media to be entered in the input field.
 * @returns {Promise<void>} A promise that resolves when the information media has been filled in.
 */
  async addInformationMedia(infoMedia) {
    await this.informationMedia.fill(infoMedia);
  }

  /**
 * Checks the terms and conditions checkbox on the sign-up form.
 *
 * This method simulates the action of checking (selecting) the terms and conditions checkbox 
 * on the sign-up page. The `force: true` option is used to bypass any visibility checks and ensure
 * that the checkbox is checked even if it might be hidden or not interactable by default.
 *
 * @returns {Promise<void>} A promise that resolves when the checkbox has been successfully checked.
 */
  async checkTermsAndConditions() {
    await this.termsAndConditionCheck.check({ force: true });

  }

  /**
 * Clicks the "Receive updates" checkbox on the sign-up form.
 *
 * This method simulates a click action on the checkbox that indicates the user wants to receive updates. 
 * This action selects the checkbox on the sign-up page.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the checkbox has been successfully clicked.
 */
  async checkReceiveUpdates() {
    await this.receiveUpdatesCheck.click();
  }

  /**
 * Clicks the "Create an account" button on the sign-up form.
 *
 * This method simulates a click action on the "Create an account" button, which typically submits the 
 * form or triggers the account creation process on the sign-up page.
 *
 * @async
 * @returns {Promise<void>} A promise that resolves when the button has been successfully clicked.
 */
  async clickCreateAccountButton() {
    await this.createAccountButton.click();
  }
}

module.exports = SignUpUserPage;
