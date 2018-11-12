'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lookup-acct-dropdown', function() {
  // Variable(s)
  var arrAddedAccounts;
  var posBeforeMoving;
  var noOfAccounts;
  var elementToMove;

  describe('Test Step ID: 549996', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });
  });

  describe('Test Step ID: 549994', function() {

    it('Should type "TMP_ACCT.ACCT" into portfolio widget and select "TMP_ACCT.ACCT | Client:/spar/composite_stat/" from type ahead', function() {
      PA3MainPage.setPortfolio('TMP_ACCT.ACCT', 'TMP_ACCT.ACCT | Client:/spar/composite_stat/', 'Client:/spar/composite_stat/TMP_ACCT.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "TESTING_ACCT.ACCT" into portfolio widget and select "TESTING_ACCT.ACCT | Client:/hema/" from type ahead', function() {
      PA3MainPage.setPortfolio('TESTING_ACCT.ACCT', 'TESTING_ACCT.ACCT | Client:/hema/', 'Client:/hema/TESTING_ACCT.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "MULTISTRAT_DEMO_ACCT.ACCT" into portfolio widget and select "MULTISTRAT_DEMO_ACCT.ACCT | Client:/pa3/accounts/" from type ahead', function() {
      PA3MainPage.setPortfolio('MULTISTRAT_DEMO_ACCT.ACCT', 'MULTISTRAT_DEMO_ACCT.ACCT | Client:/pa3/accounts/', 'Client:/pa3/accounts/MULTISTRAT_DEMO_ACCT.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "SP50_ACCT.ACCT" into portfolio widget and select "SP50_ACCT.ACCT | Client:/pa3/accounts/" from type ahead', function() {
      PA3MainPage.setPortfolio('SP50_ACCT.ACCT', 'SP50_ACCT.ACCT | Client:/pa3/accounts/', 'Client:/pa3/accounts/SP50_ACCT.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "CURR_ACCT.ACCT" into portfolio widget and select "CURR_ACCT.ACCT | Client:/pa3/accounts/" from type ahead', function() {
      PA3MainPage.setPortfolio('CURR_ACCT.ACCT', 'CURR_ACCT.ACCT | Client:/pa3/accounts/', 'Client:/pa3/accounts/CURR_ACCT.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on hamburger icon next to Portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrAddedAccounts = ['TMP_ACCT', 'TESTING_ACCT', 'MULTISTRAT_DEMO_ACCT', 'SP50_ACCT', 'CURR_ACCT'];
    arrAddedAccounts.forEach(function(value) {
      it('Verifying that \'' + value + '\' is added account to Account Drop Down', function() {
        PA3MainPage.getSingleAccountFromList('Portfolio', value).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('\'' + value + '\' is not added account to Account Drop Down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "CURR_ACCT" is highlighted by default in light blue color', function() {
      // Get element into visibility
      Utilities.scrollElementToVisibility(PA3MainPage.getSingleAccountFromList('Portfolio', 'CURR_ACCT'));

      PA3MainPage.getSingleAccountFromList('Portfolio', 'CURR_ACCT').$('tf-listbox-item-handle').getCssValue('background-color').then(function(value) {
        if (value !== 'rgba(177, 219, 234, 1)') {
          expect(false).customError('"CURR_ACCT" is not highlighted by default in light blue color' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549995', function() {

    it('Should click on the upward arrow once', function() {
      // Get the index of 'CURR_ACCT' from the account drop down before performing move action
      PA3MainPage.getAccountIndex('Portfolio', 'CURR_ACCT').then(function(index) {
        posBeforeMoving = index;
      });

      // Move the default selected account upward ('CURR_ACCT' should be default selected account here)
      PA3MainPage.moveAccountsWithinAccountDropdown('Portfolio', undefined, undefined, 'up', 1).then(function(moved) {
        if (!moved) {
          expect(false).customError();
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "CURR_ACCT" is moved to one position up', function() {
      PA3MainPage.getAccountIndex('Portfolio', 'CURR_ACCT').then(function(value) {
        if (value !== posBeforeMoving - 1) {
          expect(false).customError('"CURR_ACCT" is not moved to one position up');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "SP50_ACCT" is moved to one position down', function() {
      PA3MainPage.getAccountIndex('Portfolio', 'SP50_ACCT').then(function(value) {
        if (value !== posBeforeMoving) {
          expect(false).customError('"SP50_ACCT" is not moved to one position down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549998', function() {

    it('Should select 3rd account from the "Account Drop Down" and move upward twice', function() {
      // Get the 3rd element name from the drop down before moving
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).get(2 /* As indexing starts from '0'.*/).getText().then(function(elementName) {
        elementToMove = elementName;
      });

      PA3MainPage.moveAccountsWithinAccountDropdown('Portfolio', undefined, 3, 'up', 2).then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that element is moved to the top', function() {
      PA3MainPage.getAccountIndex('Portfolio', elementToMove).then(function(value) {
        if (value !== 1) {
          expect(false).customError('Element is not moved to the top');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550001', function() {

    it('Should select 3rd account from the top and move it downward once', function() {
      // Get the account name present at the bottom 3rd position
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).get(2).getText().then(function(elementName) {
        elementToMove = elementName;
      });

      PA3MainPage.moveAccountsWithinAccountDropdown('Portfolio', undefined, 3, 'down', 1).then(function(value) {
        expect(value).customError('3rd Account selected from the top is not moved to downward once.');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if selected account is now at 4th position from top', function() {
      PA3MainPage.getAccountIndex('Portfolio', elementToMove).then(function(value) {
        if (value !== 4) {
          expect(false).customError('Selected account is not at 4th position from top');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 550003', function() {

    it('Should get the total accounts present in the Account Drop Down', function() {
      // Get the total number of accounts in the drop down
      PA3MainPage.getListFromAccountDropdown('Portfolio').count().then(function(count) {
        noOfAccounts = count;
      });
    });

    it('Should select 3rd account from the bottom and move it downward twice', function() {
      // Get the account name present at the bottom 3rd position
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).get(noOfAccounts - 3).getText().then(function(elementName) {
        elementToMove = elementName;
      });

      PA3MainPage.moveAccountsWithinAccountDropdown('Portfolio', undefined, noOfAccounts - 2, 'down', 2).then(function(value) {
        expect(value).customError('3rd account from the bottom is not moved to two position downward.');
      }, function() {

        expect(false).customError('Not able to select 3rd account from the bottom and move it downward twice');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that the selected account is now displayed at the bottom of the list', function() {
      PA3MainPage.getAccountIndex('Portfolio', elementToMove).then(function(value) {
        if (value !== noOfAccounts) {
          expect(false).customError('The selected account is not displayed at the bottom of the list');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 550004', function() {

    it('Should click "OK" in the Account Drop Down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click();

      // Verifying that Account Drop Down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('class')).not.toContain('active');
    });

    it('Should type "TM-RUSSELL" into Benchmark widget and select "Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT" ' + 'from type ahead', function() {
      PA3MainPage.setBenchmark('TM-RUSSELL', true, false, 'Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT', 'Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        expect(false).customError('Not able to type "TM-RUSSELL" into "Benchmark" widget and select' + ' "Client:/data/accounts/scpf/A_BM_SCPF_TM-RUSSELL.ACCT" from type ahead');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "Russell" into Benchmark widget and select "Client:RUSSELL1000.ACCT" ' + 'from type ahead', function() {
      PA3MainPage.setBenchmark('Russell', true, false, 'Client:RUSSELL1000.ACCT', 'Client:RUSSELL1000.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        expect(false).customError('Not able to type "Russell" into Benchmark widget and select ' + '"Client:RUSSELL1000.ACCT" from type ahead');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "Russell" into Benchmark widget and select "Super_client:/pru/master/accounts/RUSSELL_CUSTOM.ACCT" ' + 'from type ahead', function() {
      PA3MainPage.setBenchmark('Russell', true, false, 'Super_client:/pru/master/accounts/RUSSELL_CUSTOM.ACCT', 'Super_client:/pru/master/accounts/RUSSELL_CUSTOM.ACCT').then(function() {
      }, function(error) {

        expect(false).customError(error);
        expect(false).customError('Not able to type "Russell" into Benchmark widget and select ' + '"Super_client:/pru/master/accounts/RUSSELL_CUSTOM.ACCT" from type ahead');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "Russell" into Benchmark widget and select "Client:/accounts/RUSSELL-CAP.ACTM" ' + 'from type ahead', function() {
      PA3MainPage.setBenchmark('Russell', true, false, 'Client:/accounts/RUSSELL-CAP.ACTM', 'Client:/accounts/RUSSELL-CAP.ACTM').then(function() {
      }, function(error) {

        expect(false).customError(error);
        expect(false).customError('Not able to type "Russell" into Benchmark widget and select ' + '"Client:/accounts/RUSSELL-CAP.ACTM" from type ahead');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "Russell" into Benchmark widget and select "Client:/accounts/RUSSELL-MID.ACTM" ' + 'from type ahead', function() {
      expect(PA3MainPage.setBenchmark('Russell', true, false, 'Client:/accounts/RUSSELL-MID.ACTM', 'Client:/accounts/RUSSELL-MID.ACTM')).toBeTruthy();
    });

    it('Should click on the Hamburger icon next to benchmark lookup', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Benchmark Account Drop Down is appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account Drop Down is no open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrAddedAccounts = ['Russell vs. Tactical Portfolio Selection BM', 'RUSSELL:1000', 'RUSSELL_CUSTOM', 'RUSSELL ACTM', 'RUSSELL MID ACTM'];
    arrAddedAccounts.forEach(function(value) {
      it('Verifying that \'' + value + '\' is added account to Account Drop Down', function() {
        PA3MainPage.getSingleAccountFromList('Benchmark', value).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('\'' + value + '\' is not added to Account Drop Down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "RUSSELL MID ACTM" is highlighted in light blue by default', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'RUSSELL MID ACTM').$('tf-listbox-item-handle').getCssValue('background-color').then(function(value) {
        if (value !== 'rgba(177, 219, 234, 1)') {
          expect(false).customError('"RUSSELL MID ACTM" is not highlighted in light blue by default' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550005', function() {

    it('Should click on the upward arrow once', function() {
      // Get the index of 'RUSSELL MID ACTM' from the account drop down
      PA3MainPage.getAccountIndex('Benchmark', 'RUSSELL MID ACTM').then(function(index) {
        posBeforeMoving = index;
      });

      // Move the default selected account upward
      PA3MainPage.moveAccountsWithinAccountDropdown('Benchmark', undefined, undefined, 'up', 1).then(function(value) {
        expect(value).customError('Selected account did not move to one position up.');
      }, function() {

        expect(false).customError('Not able to move the default selected account upward');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "RUSSELL MID ACTM" is moved to one position up', function() {
      PA3MainPage.getAccountIndex('Benchmark', 'RUSSELL MID ACTM').then(function(value) {
        if (value !== posBeforeMoving - 1) {
          expect(false).customError('"RUSSELL MID ACTM" is not moved to one position up');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "RUSSELL ACTM" is moved to one position down', function() {
      PA3MainPage.getAccountIndex('Benchmark', 'RUSSELL ACTM').then(function(value) {
        if (value !== posBeforeMoving) {
          expect(false).customError('"RUSSELL ACTM" is not moved to one position down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550006', function() {

    it('Should select 3rd account from the "Account Drop Down" and move upward twice', function() {
      // Get the 3rd element name from the drop down before moving
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).get(2 /* As indexing starts from '0'.*/).getText().then(function(elementName) {
        elementToMove = elementName;
      });

      PA3MainPage.moveAccountsWithinAccountDropdown('Benchmark', undefined, 3, 'up', 2).then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that element is moved to the top', function() {
      PA3MainPage.getAccountIndex('Benchmark', elementToMove).then(function(value) {
        if (value !== 1) {
          expect(false).customError('Element is not moved to the top');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550007', function() {

    it('Should select 3rd account from the top and move it downward once', function() {
      // Get the account name present at the bottom 3rd position
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).get(2).getText().then(function(elementName) {
        elementToMove = elementName;
      });

      PA3MainPage.moveAccountsWithinAccountDropdown('Benchmark', undefined, 3, 'down', 1).then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if selected account is now at 4th position from top', function() {
      PA3MainPage.getAccountIndex('Benchmark', elementToMove).then(function(value) {
        if (value !== 4) {
          expect(false).customError('Selected account is not at 4th position from top');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550008', function() {

    it('Should get the total accounts present in the Account Drop Down', function() {
      // Get the total number of accounts in the drop down
      PA3MainPage.getListFromAccountDropdown('Benchmark').count().then(function(count) {
        noOfAccounts = count;
      });
    });

    it('Should select 3rd account from the bottom and move it downward once', function() {
      // Get the account name present at the bottom 3rd position
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).get(noOfAccounts - 3).getText().then(function(elementName) {
        elementToMove = elementName;
      });

      PA3MainPage.moveAccountsWithinAccountDropdown('Benchmark', undefined, noOfAccounts - 2, 'down', 1).then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that the selected account is now last but one in the list', function() {
      PA3MainPage.getAccountIndex('Benchmark', elementToMove).then(function(value) {
        if (value !== noOfAccounts - 1) {
          expect(false).customError('Selected account is not last but one in the list');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 356841', function() {

    it('Should click "OK" in the Account Drop Down', function() {
      PA3MainPage.getOkOrCancelButton('Benchmark', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account Drop Down is closed
      expect(PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('class')).not.toContain('active');
    });

    it('Should close PA3 application without any issues', function() {
      expect(true).toBeTruthy();
    });
  });
});
