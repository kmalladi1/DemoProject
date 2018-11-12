'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: fi-analytics-pill', function() {

  // Variables
  var checkBoxName = ['1 Month', '3 Month', '6 Month', '1 Year', '2 Year', '3 Year', '4 Year', '5 Year', '6 Year',
    '7 Year', '8 Year', '9 Year', '10 Year', '15 Year', '20 Year', '25 Year', '30 Year',];

  describe('Test Step ID: 541828', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 541815', function() {

    // Should select "Analytics" from "Fixed Income" in LHP from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Analytics', 'Fixed Income', 'Document Options');

  });

  describe('Test Step ID: 541816', function() {

    it('Verifying that "Analytics for Cash" shows default value as "Treat as N/A"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytics for Cash').getSelectedText().then(function(text) {
        if (text !== 'Treat as N/A') {
          expect(false).customError('"Analytics for Cash" is not set to "Treat as N/A"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Analytics for Cash" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytics for Cash').open();
    });

    // Verifying there are 3 options displayed in the drop down
    var arrOptions = ['Include Analytics', 'Treat as N/A', 'Treat as Zero'];

    arrOptions.forEach(function(optionName, index) {
      it('Should verify that "Analytics for Cash" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Analytics for Cash" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 541817', function() {

    it('Should select "Treat As Zero" from "Analytics for Cash" dropdown', function() {
      // Select 'Treat as Zero' from the droop down.
      ThiefHelpers.selectOptionFromDropDown('Treat as Zero', 'Analytics for Cash');

      // Verifying if drop down is set to "Treat as Zero"
      ThiefHelpers.verifySelectedDropDownText('Treat as Zero', 'Analytics for Cash');
    });

  });

  describe('Test Step ID: 541818', function() {

    it('Verifying that "Analytics for Forwards" shows default value as "Treat as N/A"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Analytics for Forwards').getSelectedText().then(function(text) {
        if (text !== 'Treat as N/A') {
          expect(false).customError('"Analytics for Forwards" is not set to "Treat as N/A"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Analytics for Forwards" dropdown', function() {
      // Click "Analytics for Forwards" dropdown.
      ThiefHelpers.getDropDownSelectClassReference('Analytics for Forwards').open();
    });

    // Verifying there are 3 options displayed in the drop down
    var arrOptions = ['Include Analytics', 'Treat as N/A', 'Treat as Zero'];

    arrOptions.forEach(function(optionName, index) {
      it('Should verify that "Analytics for Forwards" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Analytics for Forwards" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 541819', function() {

    it('Should select "Inculde Analytics" from "Analytics for Forwards" dropdown and verify', function() {
      // Select 'Treat as Zero' from the droop down.
      ThiefHelpers.selectOptionFromDropDown('Include Analytics', 'Analytics for Forwards');
    });

    // Verifying if "Include Analytics" is selected.
    it('Should verify if "Include Analytics" is selected', function() {
      ThiefHelpers.verifySelectedDropDownText('Include Analytics', 'Analytics for Forwards');
    });

  });

  describe('Test Step ID: 541820', function() {

    it('Verifying that "Mixed Currency Options" shows default value as "Show Per Currency"', function() {
      ThiefHelpers.verifySelectedDropDownText('Show per Currency', 'Mixed Currency Options');
    });

    it('Should click "Mixed Currency Options" dropdown', function() {
      // Click "Mixed Currency Options" drop down
      ThiefHelpers.getDropDownSelectClassReference('Mixed Currency Options').open();
    });

    // Verifying there are 3 options displayed in the drop down
    var arrOptions = ['Show per Currency', 'Show per Currency, Portfolio-Only Currencies', 'Show Consolidated'];

    arrOptions.forEach(function(optionName, index) {
      it('Should verify that "Mixed Currency Options" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Mixed Currency Options" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 541821', function() {

    it('Should select "Show Consolidated" from "Mixed Currency Options" drop down', function() {
      // Select 'show Consolidated' from drop down
      ThiefHelpers.selectOptionFromDropDown('Show Consolidated', 'Mixed Currency Options');
    });

    // Verifying if "Show Consolidated"  is selected
    it('Should Verify if "Show Consolidated is selected" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Show Consolidated', 'Mixed Currency Options');
    });

  });

  describe('Test Step ID: 541822', function() {

    it('Verifying that "Reference Curve" shows default value as "Government"', function() {
      ThiefHelpers.verifySelectedDropDownText('Government', 'Reference Curve');
    });

    it('Should click "Reference Curve" dropdown', function() {
      // Click "Reference Curve" drop down
      ThiefHelpers.getDropDownSelectClassReference('Reference Curve').open();
    });

    //Verifying there are 3 options displayed in the drop down
    var arrOptions = ['Government', 'LIBOR', 'Government (All Securities)'];

    arrOptions.forEach(function(optionName, index) {
      it('Should verify that "Reference Curve" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Reference Curve" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test step ID: 541823', function() {

    it('Should select "LIBOR" from "Reference Curve" dropdown', function() {
      // Select 'LIBOR' from drop down
      ThiefHelpers.selectOptionFromDropDown('LIBOR', 'Reference Curve');
    });

    // Verifying if "LIBOR" is selected
    it('Should Verify if "LIBOR" is selected', function() {
      ThiefHelpers.verifySelectedDropDownText('LIBOR', 'Reference Curve');
    });

  });

  describe('Test Step ID: 541824', function() {

    it('Should un-check the check box "Include All" in Partial Duration Points section', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggle();

      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Include All" group checklist is still checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkBoxName.forEach(function(optionName) {
      it('Should verify "' + optionName + '" is unchecked in  Partial Duration Points section', function() {
        // Verifying if the checkbox is checked
        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(optionName).isChecked().then(function(checked) {
          if (checked) {
            expect(false).customError('The checklist item "' + optionName + '" inside "Include All" group checklist is checked off');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 541825', function() {

    it('Clicking on the expand button of  "Include All" if it is not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Include All"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verify that "Include All" tree element expanded', function() {
      expect(DocumentOptionsFixedIncomeAnalytics.isTreeExpanded()).toBeTruthy();
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Include All" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var CheckBoxNameToBeSelected = ['3 Month', '1 Year', '7 Year'];
    CheckBoxNameToBeSelected.forEach(function(OptionName) {
      it('Should select  "' + OptionName + '" checkbox', function() {
        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(OptionName).toggle();

        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(OptionName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + OptionName + '" under "Include All" group is unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

  });

  describe('Test Step ID: 541826', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Analytics', 'Fixed Income', 'Document Options');

    // Verify whether new values and previous values are matching

    var dropDownAndOptionsToVerify = [{dropDown: 'Mixed Currency Options', valueToBeSet: 'Show Consolidated'}, {dropDown: 'Analytics for Forwards', valueToBeSet: 'Include Analytics'},
      {dropDown: 'Analytics for Cash', valueToBeSet: 'Treat as Zero'}, {dropDown: 'Reference Curve', valueToBeSet: 'LIBOR'},];

    dropDownAndOptionsToVerify.forEach(function(object) {
      it('Verifying if "' + object.dropDown + '" is set with "' + object.valueToBeSet + '" option', function() {
        ThiefHelpers.verifySelectedDropDownText(object.valueToBeSet, object.dropDown);
      });
    });

    it('Verifying if "Include All" is in Indeterminate state', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isIndeterminate().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include All" group checklist is not in "Indeterminate" state');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    checkBoxName.forEach(function(optionName) {
      if (optionName !== '3 Month' && optionName !== '1 Year' && optionName !== '7 Year') {
        it('Verifying that  "' + optionName + '" is unchecked', function() {
          // Verifying if the checkbox is checked
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(optionName).isChecked().then(function(checked) {
            console.log(checked);
            if (checked) {
              expect(false).customError('The checklist item "' + optionName + '" inside "Include All" group checklist is checked off');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      } else {
        it('Verifying that "' + optionName + '" checkbox is selected', function() {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(optionName).isChecked().then(function(checked) {
            console.log(checked);
            if (!checked) {
              expect(false).customError('The checklist item "' + optionName + '" inside "Include All" group checklist is unchecked');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      }
    });

  });

  describe('Test Step ID: 541827', function() {

    // Click on "Cancel" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document Options');

  });

});
