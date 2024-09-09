const { test, expect } = require('@playwright/test');
const SignUpUserPage = require('../src/pages/sign_up_page');
import { generateRandomString, generateRandomPassword } from "../src/utils/random_generator_util";
import { FIRST_NAME, LAST_NAME, EMAIL, COUNTRY_NAME, PASSWORD, PHONE_NUMBER, INFORMATION_MEDIA, COMPANY_NAME } from "../src/utils/constants";

/**
 * Test suite for the Sign-Up User Page.
 * Contains various tests to verify the functionality of the sign-up page.
 */
test.describe('SignUp User Page Tests', () => {
   let signUpPage;
   /**
      * Runs before each test case.
      * Navigates to the sign-up page and accepts cookies.
      * 
      * @param {object} testContext - Test context containing the page object.
      */
   test.beforeEach(async ({ page }) => {
      await page.goto('users/sign_up');
      await page.getByTestId('uc-accept-all-button').click();
      signUpPage = new SignUpUserPage(page);
   });

   /**
      * Verifies that the heading for the sign-up page is displayed.
      * 
      * @param {object} testContext - Test context containing the page object.
      */
   test('should display heading for sign-up page', async () => {
      const titleElement = signUpPage.page.locator('text=Start your free trial');
      await expect(titleElement).toBeVisible();
   });

   /**
      * Verifies that searching for a country in the dropdown shows the expected value, 
      * irrespective of case sensitivity.
      * 
      * @param {object} testContext - Test context containing the page object.
      */
   test('should display new value in the country registred drop-down irrespective of case sensitivity', async () => {
      expect(await signUpPage.searchNewCountryValue("sWe")).toMatch("Sweden");

   });

   /**
      * Verifies that selecting a country from the dropdown returns the correct value.
      * 
      * @param {object} testContext - Test context containing the page object.
      */
   test('should select new value in the country registred drop-down', async () => {
      
      expect(await signUpPage.selectNewCountryValue(COUNTRY_NAME)).toMatch(COUNTRY_NAME);
   });

   /**
      * Tests the complete sign-up process with valid input data.
      * 
      * Fills in the sign-up form, submits it, and verifies that the user is signed up successfully.
      * 
      * @param {object} testContext - Test context containing the page object.
      */
   test('should create an account with the new value selected in country registred drop-down', async () => {
      completeSignUp();
      await expect(signUpPage.page.locator('text=You signed up to Circula.')).toBeVisible();
   });

   /**
    * Tests the registration service request to ensure the correct country code is sent in the payload.
    * 
    * This test listens for the registration service request, completes the sign-up process, and checks 
    * that the correct country code ("SE") is included in the request payload.
    * 
    * @param {object} testContext - Test context containing the page object.
    */
   test('should send correct code in registration service', async () => {
      const requestPromise = signUpPage.page.waitForRequest('https://circula-qa-challange.vercel.app/api/ironbank/api/v0/registration/register');
      completeSignUp();
      const request = await requestPromise;
       expect(JSON.parse(request.postData()).country).toMatch("SE");


   });

   /**
      * Helper function to complete the sign-up process with predefined data.
      * 
      * @param {object} signUpPage - Sign up user page object contains page information.
      */
   async function completeSignUp() {
      await signUpPage.addFirstName(FIRST_NAME);
      await signUpPage.addLastName(LAST_NAME);
      await signUpPage.addWorkEmail(generateRandomString().concat("_").concat("user@facebook.com"));
      await signUpPage.addPhoneNumber(PHONE_NUMBER);
      await signUpPage.addPassword(generateRandomPassword(PASSWORD));
      await signUpPage.addCompanyName(COMPANY_NAME);
      await signUpPage.addInformationMedia(INFORMATION_MEDIA);
      await signUpPage.selectNewCountryValue(COUNTRY_NAME);
      await signUpPage.checkTermsAndConditions();
      await signUpPage.checkReceiveUpdates();
      await signUpPage.clickCreateAccountButton();
   }
});