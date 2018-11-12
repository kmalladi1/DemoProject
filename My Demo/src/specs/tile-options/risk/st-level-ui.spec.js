'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-level-ui', function() {

  describe('Test Step ID: Start Up', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 662160', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/ST_HIGH_LOW"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('st-high-low');
    });

    it('Verifying if "Calculation Error" not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog has appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying that report header displays "Dow Jones Industrials vs U.S. Dollar Index"', function() {
      PA3MainPage.getHeader().getText().then(function(header) {
        expect(header === 'Dow Jones Industrials vs U.S. Dollar Index').customError('Report header does not ' +
          'displays "Dow Jones Industrials vs U.S. Dollar Index"');
        if (header !== 'Dow Jones Industrials vs U.S. Dollar Index') {
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 662153', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click "Add" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Identifier" is selected form the Type drop down', function() {
      CreateNewStressTest.getDropDown('Type').getText().then(function(val) {
        if (val !== 'Identifier') {
          ThiefHelpers.selectOptionFromDropDown('Identifier', undefined, CreateNewStressTest.getDropDown('Type'));

          // Verifying if Identifier is selected form the drop down
          ThiefHelpers.verifySelectedDropDownText('Identifier', undefined, CreateNewStressTest.getDropDown('Type'));
        }
      });

    });

    it('Should click "Shock" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, CreateNewStressTest.getDropDown('Shock')).open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"History Limit" drop down of a date picker is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrIdentifierOptions = ['% Return', 'Level', 'Amount Change', 'Highest', 'Lowest', 'Standard Deviation',
      'Highest - Level', 'Lowest - Level',];
    it('Verifying the drop down options', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        Utilities.arrayCompare(options, arrIdentifierOptions);
      });
    });

  });

  describe('Test Step ID: 662386', function() {

    it('Should select "SPAR Series" from the "Type" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('SPAR Series', undefined, CreateNewStressTest.getDropDown('Type'));

      // Verifying if SPAR Series is selected form the Type drop down
      ThiefHelpers.verifySelectedDropDownText('SPAR Series', undefined, CreateNewStressTest.getDropDown('Type'));
    });

    it('Should click "% Return" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, CreateNewStressTest.getDropDown('Shock')).open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"History Limit" drop down of a date picker is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrSPAROptions = ['% Return', 'Highest', 'Lowest', 'Standard Deviation'];
    it('Verifying the drop down options', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        Utilities.arrayCompare(options, arrSPAROptions);
      });
    });

  });

  describe('Test Step ID: 662399', function() {

    it('Should select "Economic Series" from the "Type" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Economic Series', undefined, CreateNewStressTest.getDropDown('Type'));

      // Verifying if Economic Series is selected form the Type drop down
      ThiefHelpers.verifySelectedDropDownText('Economic Series', undefined, CreateNewStressTest.getDropDown('Type'));
    });

    it('Should click "% Return" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, CreateNewStressTest.getDropDown('% Return')).open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"History Limit" drop down of a date picker is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrEconomicOptions = ['% Return', 'Level', 'Amount Change', 'Highest', 'Lowest', 'Standard Deviation',
      'Highest - Level', 'Lowest - Level',];
    it('Verifying the drop down options', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        Utilities.arrayCompare(options, arrEconomicOptions);
      });
    });

  });

  describe('Test Step ID: 664911', function() {

    var shockOptions = ['Highest', 'Lowest', 'Highest - Level', 'Lowest - Level'];

    shockOptions.forEach(function(element) {
      it('Should click "' + element + '" from the "% Return" dropdown', function() {
        ThiefHelpers.selectOptionFromDropDown(element, undefined, CreateNewStressTest.getDropDown('Shock'));

        // Verifying the drop down option
        ThiefHelpers.verifySelectedDropDownText(element, undefined, CreateNewStressTest.getDropDown('Shock'));
      });

      it('Verifying if "Shock" text box is disabled', function() {
        CreateNewStressTest.getInputBox('Shock').getAttribute('class').then(function(classVal) {
          if (classVal.indexOf('disabled') === -1) {
            expect(false).customError('"Shock" text box is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 664913', function() {

    it('Should click "Standard Deviation" from the "% Return" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Standard Deviation', undefined, CreateNewStressTest.getDropDown('Shock'));

      // Verifying the drop down option
      ThiefHelpers.verifySelectedDropDownText('Standard Deviation', undefined, CreateNewStressTest.getDropDown('Shock'));
    });

    it('Verifying if "Shock" text box is enabled', function() {
      CreateNewStressTest.getInputBox('Shock').getAttribute('class').then(function(classVal) {
        if (classVal.indexOf('disabled') !== -1) {
          expect(false).customError('"Shock" text box is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 664914', function() {

    var shockOptions = ['Highest - Level', 'Lowest - Level'];

    shockOptions.forEach(function(element) {
      it('Should click "' + element + '" from the "% Return" dropdown', function() {
        ThiefHelpers.selectOptionFromDropDown(element, undefined, CreateNewStressTest.getDropDown('Shock'));

        // Verifying the drop down option
        ThiefHelpers.verifySelectedDropDownText(element, undefined, CreateNewStressTest.getDropDown('Shock'));
      });

      it('Verifying if "Currency" drop down is not present', function() {
        CreateNewStressTest.getDropDown('Pricing Currency').isDisplayed().then(function(isFound) {
          if (isFound) {
            expect(false).customError('"Currency" drop down is displayed');
            CommonFunctions.takeScreenShot();
          }
        }, function() {
        });
      });
    });

  });

  describe('Test Step ID: 664999', function() {

    it('Should select "Identifier" from the "Type" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Identifier', undefined, CreateNewStressTest.getDropDown('Type'));

      // Verifying if Identifier is selected form the Type drop down
      ThiefHelpers.verifySelectedDropDownText('Identifier', undefined, CreateNewStressTest.getDropDown('Type'));
    });

    var shockOptions = ['Highest - Level', 'Lowest - Level'];

    shockOptions.forEach(function(element) {
      it('Should click "' + element + '" from the "% Return" dropdown', function() {
        ThiefHelpers.selectOptionFromDropDown(element, undefined, CreateNewStressTest.getDropDown('Shock'));

        // Verifying the drop down option
        ThiefHelpers.verifySelectedDropDownText(element, undefined, CreateNewStressTest.getDropDown('Shock'));
      });

      it('Verifying if "Currency" drop down is present', function() {
        CreateNewStressTest.getDropDown('Pricing Currency').isDisplayed().then(function(isFound) {
          if (!isFound) {
            expect(false).customError('"Currency" drop down is not displayed');
            CommonFunctions.takeScreenShot();
          }
        }, function() {

        });
      });
    });

  });

  describe('Test Step ID: 662148', function() {

    it('Should click "Cancel" button from the "Create New Stress Test" dialog', function() {
      ThiefHelpers.getDialogButton('Create New Stress Test', 'Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Stress Test" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
