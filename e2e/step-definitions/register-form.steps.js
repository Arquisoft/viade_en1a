const {defineFeature, loadFeature}=require('jest-cucumber');
const feature = loadFeature('./e2e/features/register-form.feature');

defineFeature(feature, test => {
  
  beforeEach(async () => {
    await page.goto('http://localhost:3000')
  })

  test('The user is not registered in the site', ({given,when,then}) => {
    
    let email;

    given('An unregistered user', () => {
      email = "newuser@test.com"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFillForm('form[name="register"]', {
        email: email,
        remail: email,
      })
      await expect(page).toClick('button', { text: 'Submit' })
    });

    then('A welcome message should be shown in the screen', async () => {
      await expect(page).toMatchElement('span', { text: 'User '+email+' has been registered!' })
    });
  });

  test('The user is already registered in the site', ({ given, when, then }) => {
    
    let email;

    given('An already registered user', () => {
      email = "foo@test.com"
    });

    when('I fill the data in the form and press submit', async () => {
      await expect(page).toFillForm('form[name="register"]', {
        email: email,
        remail: email,
      })
      await expect(page).toClick('button', { text: 'Submit' })
    });

    then('An error message should be shown in the screen', async () => {
      await expect(page).toMatchElement('span', { text: 'ERROR: User '+email+' is already registered!' })
    });
    
  });
});