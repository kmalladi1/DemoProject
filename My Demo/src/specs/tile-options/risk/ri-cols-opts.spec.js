'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-cols-opts', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 566882', function() {

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

  });

  describe('Test Step ID: 566883 ', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

  });

  describe('Test Step ID: 566884 ', function() {

    it('Should enter "risk" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('risk');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'risk') {
          expect(false).customError('" Text in the search field is not risk');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for element to appear
      browser.sleep(3000);
    });

    it('Should select " Port. MPT Value at Risk (Two Tailed) " in available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. MPT Value at Risk (Two Tailed)').then(function(item) {
        item.select();
      });

      // Verifying if 'Port. MPT Value at Risk (Two Tailed)' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. MPT Value at Risk (Two Tailed)').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Port. MPT Value at Risk (Two Tailed)" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on right arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Should clear "risk" text in search field', function() {
      TileOptionsColumns.getSearchClearButton().click();

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== '') {
          expect(false).customError('" Text in search field is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "barra" in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('barra');

      //Verifying the barra text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'barra') {
          expect(false).customError('" Text in the search field is not barra');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for element to appear
      browser.sleep(3000);
    });

    it('Should select "Barra- Value at Risk" in available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Barra- Value at Risk').then(function(item) {
        item.select();
      });

      // Verifying if 'Barra- Value at Risk' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Barra- Value at Risk').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Barra- Value at Risk" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "right arrow" button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Port. MPT Value at Risk (Two Tailed)" and "Barra- Value at Risk" are added to ' +
      'selected section', function() {
      var element = ['Port. MPT Value at Risk (Two Tailed)', 'Barra- Value at Risk'];

      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        for (var j = 0; j < element.length; j++) {
          if (myArray.indexOf(element[j]) === -1) {
            expect(false).customError('"' + element + '" is not added to the selected section');
            CommonFunctions.takeScreenShot();
          }
        }

      });

    });

  });

  describe('Test Step ID: 566885 ', function() {

    it('Should select "Port. MPT Value at Risk (Two Tailed)" from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. MPT Value at Risk (Two Tailed)').select();

      // Verify if 'Port. MPT Value at Risk (Two Tailed)' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Port. MPT Value at Risk (Two Tailed)').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Port. MPT Value at Risk (Two Tailed)" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "RISK" section in accordion pane', function() {
      TileOptionsColumns.expandSectionInOptionsPane('RISK').then(function(value) {
        if (!value) {
          expect(false).customError('"RISK" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "History" Spinbox is available in Risk Pane', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('History', undefined, false, false).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"History" Spinbox is not available in Risk Pane.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Year(s)" text in drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Year(s)', undefined, TileOptionsColumns.xpathYearsDropdown);
    });

    it('Verifying "Daily" option is selected in "Frequency" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Daily', undefined, TileOptionsColumns.xpathFrequencyDropdown);
    });

    it('Verifying "Sector" option is selected in "Fill NAs" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Sector', 'Fill NAs');
    });

    it('Verifying "99" option is selected in "Confidence %" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('99', 'Confidence %');
    });

    it('Verifying that "Days" Spinbox is available in Risk Pane', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('Days', undefined, false, false).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('"Days" Spinbox is not available in Risk Pane.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 566886 ', function() {

    it('Should select "Barra- Value at Risk" ratio from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Barra- Value at Risk').select();

      // Verify if 'Barra- Value at Risk' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Barra- Value at Risk').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Barra- Value at Risk" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying whether "RISK" section in accordion pane was expanded', function() {
      TileOptionsColumns.expandSectionInOptionsPane('RISK').then(function(value) {
        if (!value) {
          expect(false).customError('"RISK" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Multi-Lot Actual Weights" check box is Present and is unchecked by default in "Risk" section', function() {
      // Verifying if "Multi-Lot Actual Weights" check box is  checked
      ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').getElement().isDisplayed().then(function(bool) {
        if (bool) {
          ThiefHelpers.getCheckBoxClassReference('Multi-Lot Actual Weights').isChecked().then(function(flag) {
            if (flag) {
              expect(false).customError('"Multi-Lot Actual Weights" check box is checked off by default');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Multi-Lot Actual Weights" checkbox is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Standalone Risk Method (Group-Level)" is present in accordion and is set to "None"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathDropDown, 'Standalone Risk Method');
      ThiefHelpers.isPresent('Dropdown', undefined, xpath).then(function(isPresent) {
        if (isPresent) {
          ThiefHelpers.verifySelectedDropDownText('None', undefined, xpath);
        } else {
          expect(false).customError('"Standalone Risk Method (Group-Level)" drop down is not present in Risk accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "95.0000" value in "VaR Confidence Interval (%)" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('VaR Confidence Interval (%)', TileOptionsColumns.varConfidenceInterval).getText().then(function(option) {
        if (option !== '95.0000') {
          expect(false).customError('"95.0000" text in "VaR Confidence Interval (%)" textbox was not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "VaR Days" Spinbox is available in Risk Pane', function() {
      TileOptionsColumns.setOrGetValueInSpinBox('VaR Days', undefined, false, false).isPresent().then(function
        (value) {
        if (!value) {
          expect(false).customError('"VaR Days" Spinbox is not available in Risk Pane.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Trading Days" value selected in drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Trading Days', undefined, TileOptionsColumns.xpathTradingDaysDropdown);
    });

  });

  describe('Test Step ID: 566887 ', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
