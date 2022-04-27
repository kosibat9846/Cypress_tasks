import LoginPage from "../pages/login_spec";

const correctPassword = 'pwd'
const incorrectPassword = 'wrongPwd'

const loginPage = new LoginPage();

describe('Succesfull login', () => {
    before(() => {
        loginPage.visit()
      })

    afterEach(() => {
        loginPage.clickLogOutButton()
      })
      

    const providedUserNames = [
        generateRandomAlphabetic(),
        '1234444',
        `!@#$%&*())){}|`,
        generateRandomAlphabetic() + '1234',
        '${' + generateRandomAlphabetic() + '}',
        '${' + generateRandomAlphabetic() + '123}',
        'a b c d',
        'a b c d 1 2',
        '# a b c d ^ (',
        '# 1 a b c d ^ ( 3 }'
        // ' ',
        // '       ',
        // ' abcd',
        // 'abcd ',
        // '       abcd   '
    ]

    providedUserNames.forEach(($type) => {
        const providedUserName = $type

        specify('User should be able to login with user name [${providedUserName}]',  () => {
            // When
            loginPage.elements.usernameInput().type(providedUserName, {
                parseSpecialCharSequences: false,
              })
            loginPage.typePassword(correctPassword)
            loginPage.clickLogInButton()
      
            // Then
            loginPage.containsSuccessfulLoggedInStatus(providedUserName)
          });
      })

    const providedUserNamesWithWhitespaces = [
        [' ', ''],
        ['       ', ''],
        [' abcd', 'abcd'],
        ['abcd ', 'abcd '],
        ['       abcd   ', `abcd `]
    ]

    providedUserNamesWithWhitespaces.forEach(($type) => {
        const [providedUserNameWithWhitespaces, expectedUserNameAtLoginStatusMessage] = $type

        specify('User should be able to login with user name with white spaces [${providedUserNameWithWhitespaces}]',  () => {
            // When
            loginPage.login(providedUserNameWithWhitespaces, correctPassword)
      
            // Then
            loginPage.containsSuccessfulLoggedInStatus(expectedUserNameAtLoginStatusMessage)
          });
      })
});

describe('Unsuccessful login', () => {
    before(() => {
        loginPage.visit()
      })

    afterEach(() => {
        loginPage.clearUsername()
        loginPage.clearPassword()
      })

    specify('User should not be able to login with wrong password',  () => {    
        // When
        loginPage.login(generateRandomAlphabetic(), incorrectPassword)

        // Then
        loginPage.containsUnsuccessfulLoginStatus()
      });

    specify('User should not be able to login without login and password',  () => {    
        // When
        loginPage.clickLogInButton()

        // Then
        loginPage.containsUnsuccessfulLoginStatus()
      });

    specify('User should not be able to login without password',  () => {    
        // When
        loginPage.typeUsername(generateRandomAlphabetic())
        loginPage.clickLogInButton()

        // Then
        loginPage.containsUnsuccessfulLoginStatus()
      });

    specify('User should not be able to login without user name',  () => {    
        // When
        loginPage.typePassword(correctPassword)
        loginPage.clickLogInButton()

        // Then
        loginPage.containsUnsuccessfulLoginStatus()
      });
});

describe('Succesfull log out', () => {

  beforeEach(() => {
      loginPage.visit()
      loginPage.login(generateRandomAlphabetic(), correctPassword)
    })

      specify('Should log out user with success after click log out button',  () => {
          // When
          loginPage.clickLogOutButton()

          // Then
          loginPage.containsSuccessfulLoggedOutStatus()
        });

      specify('Should log out user when page reload',  () => {
          // When
          loginPage.visit()

          // Then
          loginPage.containsSuccessfulLoggedOutStatus()
        });

    specify('Should log out user when page reload with cache',  () => {
        // When
        cy.reload()

        // Then
        loginPage.containsSuccessfulLoggedOutStatus()
      });

    specify('Should log out user when page reload without cache',  () => {
        // When
        cy.reload(true)

        // Then
        loginPage.containsSuccessfulLoggedOutStatus()
      });
});

function generateRandomAlphabetic() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }