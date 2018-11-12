'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-add-opts', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 565164', function() {

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Verifying that "Calculation Error" popup is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // un-check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

  });

  describe('Test Step ID: 565165', function() {

    // To dismiss the wrench menu
    it('Should select "Weights" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Weights').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Weights" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

  });

  describe('Test Step ID: 565166', function() {

    it('Should click on the "Other Options" tab under "Risk" category on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Other Options', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Other Options', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Other Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Risk - Other Options" ', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Risk - Other Options') {
          expect(false).customError(' "Risk -> Other Options" was not selected from LHP ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Covariance Date" datepicker button is disabled', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskOtherOptions.xpathDatePickerButton, 'Convariance Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).isDisabled().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Covariance Date" date picker button is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Covariance Date" datepicker textbox is disabled', function() {
      TileOptionsRiskOtherOptions.getDatePickerTextbox('Convariance Date').getAttribute('class').then(function(attr) {
        if (attr.indexOf('disabled') < 0) {
          expect(false).customError('The "Covariance Date" date picker textbox is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrRadio = ['Report', 'Model'];
    arrRadio.forEach(function(radio) {

      it('Verifying if "' + radio + '" radio button is disabled', function() {
        ThiefHelpers.getRadioClassReference(radio, undefined).isDisabled().then(function(bool) {
          if (!bool) {
            expect(false).customError('The "' + radio + '" radio button is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 565167', function() {

    it('Should select "Same as Report" from "Model Date" drop down', function() {
      ThiefHelpers.getTextBoxClassReference('Model Date').selectOptionByText('Same as Report').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Same as Report" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Model Date').getText().then(function(text) {
        if (text !== 'Same as Report') {
          expect(false).customError('"Same as Report" is not set in "Model Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Convariance Date" text box to enable', function() {
      browser.wait(function() {
        return TileOptionsRiskOtherOptions.getDatePickerTextbox('Convariance Date').getAttribute('class').then(function(value) {
          if (value.indexOf('disabled') > 0) {
            return false;
          } else {
            return true;
          }
        }, function() {
          return false;
        });
      }, 5000, '"Convariance Date"" is disabled even after waiting for 5 seconds').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Covariance Date" date picker button is enabled', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskOtherOptions.xpathDatePickerButton, 'Convariance Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).isDisabled().then(function(bool) {
        if (bool) {
          expect(false).customError('The "Covariance Date" date picker button is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Covariance Date" datepicker textbox is enabled', function() {
      TileOptionsRiskOtherOptions.getDatePickerTextbox('Convariance Date').getAttribute('class').then(function(attr) {
        if (attr.indexOf('disabled') > 0) {
          expect(false).customError('The "Covariance Date" date picker textbox is not enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565169', function() {

    it('Should select "Same as Relative" from "Convariance Date" drop down and verify', function() {
      ThiefHelpers.getTextBoxClassReference('Convariance Date').selectOptionByText('Same as Relative').then(function() {
        // Adding delay to process the date request to enable the dependent elements
        browser.sleep(1000);
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Same as Relative" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Convariance Date').getText().then(function(text) {
        if (text !== 'Same as Relative') {
          expect(false).customError('"Same as Relative" is not set in "Convariance Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrRadio = ['Report', 'Model'];
    arrRadio.forEach(function(radio) {

      it('Verifying if "' + radio + '" radio button is enabled', function() {
        ThiefHelpers.getRadioClassReference(radio, undefined).isDisabled().then(function(bool) {
          if (bool) {
            expect(false).customError('The "' + radio + '" radio button is not enabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });

  describe('Test Step ID: 565170', function() {

    it('Should click on "Covariance Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskOtherOptions.xpathDatePickerButton, 'Convariance Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "8/20/2014" in "Covariance Date" textbox', function() {
      ThiefHelpers.setDateInCalendar('8/20/2014', 2);
    });

    it('Verifying if "Covariance Date" datepicker textbox is set to "8/20/2014"', function() {
      TileOptionsRiskOtherOptions.getDatePickerTextbox('Convariance Date').getAttribute('value').then(function(text) {
        if (text !== '8/20/2014') {
          expect(false).customError('The "Covariance Date" date picker textbox is not set to "8/20/2014"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 565171', function() {

    it('Should click on the "Exclusions" tab on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Exclude from Report" from "Assets not covered by the risk model" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Exclude from Report', 'Assets not covered by the risk model', undefined, undefined);
    });

    it('Verifying if "Assets not covered by the risk model" dropdown is set to "Exclude from Report"', function() {
      ThiefHelpers.verifySelectedDropDownText('Exclude from Report', 'Assets not covered by the risk model', undefined);

    });

  });

  describe('Test Step ID: 565172', function() {

    it('Should click on the "Other Options" tab under "Risk" category on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Other Options', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Other Options', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Other Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Risk - Other Options" ', function() {
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Risk - Other Options') {
          expect(false).customError(' "Risk -> Other Options" was not selected from LHP ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to open "Risk Column Header Display Order" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Risk Column Header Display Order', undefined).open();
    });

    var arrDropdownOptions = ['Model, Factor, Column', 'Model, Column, Factor', 'Column, Model, Factor'];
    var arrOptions = [];
    it('Should read all options from dropdown', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        arrOptions = options;
      });
    });

    arrDropdownOptions.forEach(function(option, index) {
      it('verifying if "Risk Column Header Display Order" dropdown contains "' + option + '"', function() {
        if (option !== arrOptions[index]) {
          expect(false).customError('The "Risk Column Header Display Order" dropdown does not contains "' + option + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565173', function() {

    it('Should open and select "Model, Column, Factor" from "Risk Column Header Display Order" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Model, Column, Factor', 'Risk Column Header Display Order', undefined, undefined);
    });

    it('Verifying if "Risk Column Header Display Order" dropdown is set to "Model, Column, Factor"', function() {
      ThiefHelpers.verifySelectedDropDownText('Model, Column, Factor', 'Risk Column Header Display Order', undefined);
    });

  });

  describe('Test Step ID: 565181', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
