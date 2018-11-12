'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: fi-attribution', function() {

  describe('Test Step ID: 550395', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 550385', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Attribution', true, 'isSelected');

    it('Should clear "Portfolio" widget box', function() {
      PA3MainPage.getWidgetBox('Portfolio').sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE));

      // Verifying if Portfolio widget box is empty
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('');
    });

    it('Should type "CLIENT:PA3_TEST.ACCT" and select "Client:PA3_TEST.ACCT" from the drop down', function() {
      PA3MainPage.setPortfolio('CLIENT:PA3_TEST.ACCT', 'Client:PA3_TEST.ACCT', 'Client:PA3_TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"Client:/pa3/accounts/FIXED_INCOME_SETTINGS.ACCT" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'Client:PA3_TEST.ACCT');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Attribution');
  });

  describe('Test Step ID: 550386', function() {

    // Select Attribution tab from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Attribution', 'Fixed Income', 'Document Options');
  });

  describe('Test Step ID: 550387', function() {

    it('Should click on "Duration" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Duration').open();
    });

    var arrOptions = ['Effective', 'Partial', 'Modified', 'Modified (Float)', 'Coupon Curve', 'Coupon Curve Partial'];
    arrOptions.forEach(function(optionName, index) {

      it('Verifying if "Duration" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Duration" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should close on "Duration" drop down', function() {
      // Clicking open to close opened dropdown
      ThiefHelpers.getDropDownSelectClassReference('Duration').open();
    });
  });

  describe('Test Step ID: 550388', function() {

    it('Should click on "Treat Cash Return As" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Treat Cash Return As').open();
    });

    var arrOptions = ['Price Return', 'Income Return'];
    arrOptions.forEach(function(optionName, index) {

      it('Verifying if "Treat Cash Return As" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Treat Cash Return As" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 550389', function() {

    it('Should check off "Include All" checkbox in the Options box', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggle();

      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include All" group checklist is un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the "Include All" element', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggleExpandedState();
        }
      });
    });

    it('Should verify all checkboxes are checked under "Include All" from Shift Point Options Box', function() {
      var count = 0;
      DocumentOptionsFixedIncomeAttribution.getAllShiftPointCheckboxes('Include All').each(function(checkboxArr) {
        checkboxArr.getText().then(function(text) {
          // Verifying if the checkbox is checked
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(text).isChecked().then(function(checked) {
            if (!checked) {
              expect(false).customError('"' + text + '" item in the checklist is unchecked');
              count = count + 1;
            }
          });
        });
      });
      if (count < 0) {
        CommonFunctions.takeScreenShot();
      }
    });

    var arrOptions = ['3 Month', '6 Month', '1 Year', '2 Year', '3 Year', '4 Year', '5 Year', '6 Year', '7 Year', '8 Year', '9 Year', '10 Year', '11 Year', '12 Year', '13 Year', '14 Year', '15 Year', '20 Year', '25 Year', '30 Year'];

    arrOptions.forEach(function(optionName, index) {

      it('Should verify "Include All" tree contains "' + optionName + '" element ', function() {
        ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(optionName).getText().then(function(text) {
          if (text !== optionName) {
            expect(false).customError('Checklist item "' + optionName + '" is not listed under "Include All"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 550390', function() {

    it('Should click on "Shift Point" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Shift Point').open();
    });

    var arrOptions = ['Tenor', 'Portfolio', 'Benchmark'];
    arrOptions.forEach(function(optionName, index) {

      it('Verifying if "Shift Point" drop down has "' + optionName + '" option', function() {
        ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
          if (options.indexOf(arrOptions[index]) < 0) {
            expect(false).customError('The "Shift Point" drop down does not contains "' + arrOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should select "Portfolio" option in the Shift Point', function() {
      // Select 'Portfolio' from the drop down.
      ThiefHelpers.selectOptionFromDropDown('Portfolio', 'Shift Point');

      // Verifying if "Portfolio" option is selected
      ThiefHelpers.verifySelectedDropDownText('Portfolio', 'Shift Point');
    });

    var shiftptArr = ['Portfolio Effective Duration', 'Portfolio Modified Duration', 'Portfolio Modified Duration (Float)', 'Portfolio Coupon Curve Duration'];

    shiftptArr.forEach(function(optionName, index) {

      it('Should verify Portfolio contains "' + optionName + '" Shift Point in the Options box ', function() {
        expect(DocumentOptionsFixedIncomeAttribution.getAllRadioButtonLabels().get(index).getText()).toEqual(optionName);
      });
    });
  });

  describe('Test Step ID: 550391', function() {

    it('Should click on "Portfolio Effective Duration" radio button under Portfolio of Shift Point', function() {
      ThiefHelpers.getRadioClassReference('Portfolio Effective Duration').select();

      // Verifying if "Portfolio Effective Duration" radio button is selected
      ThiefHelpers.getRadioClassReference('Portfolio Effective Duration').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio Effective Duration" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var shiftptArr1 = ['Portfolio Modified Duration', 'Portfolio Modified Duration (Float)', 'Portfolio Coupon Curve Duration'];

    shiftptArr1.forEach(function(optionName) {
      it('Verifying if "' + optionName + '" radio button is not selected', function() {
        ThiefHelpers.getRadioClassReference(optionName).isSelected().then(function(selected) {
          if (selected) {
            expect(false).customError('"' + optionName + '" radio button is selected.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Portfolio Coupon Curve Duration" radio button under Portfolio of Shift Point', function() {
      ThiefHelpers.getRadioClassReference('Portfolio Coupon Curve Duration').select();

      // Verifying if "Portfolio Coupon Curve Duration" radio button is selected
      ThiefHelpers.getRadioClassReference('Portfolio Coupon Curve Duration').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio Coupon Curve Duration" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var shiftptArr2 = ['Portfolio Effective Duration', 'Portfolio Modified Duration', 'Portfolio Modified Duration (Float)'];

    shiftptArr2.forEach(function(optionName) {
      it('Verifying if "' + optionName + '" radio button is not selected', function() {
        ThiefHelpers.getRadioClassReference(optionName).isSelected().then(function(selected) {
          if (selected) {
            expect(false).customError('"' + optionName + '" radio button is selected.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 397601', function() {

    it('Should select "Benchmark" option in the Shift Point drop down', function() {
      // Select 'Benchmark' from the drop down.
      ThiefHelpers.selectOptionFromDropDown('Benchmark', 'Shift Point');

      // Verifying if "Benchmark" option is selected
      ThiefHelpers.verifySelectedDropDownText('Benchmark', 'Shift Point');
    });

    var shiftptArr = ['Benchmark Effective Duration', 'Benchmark Modified Duration', 'Benchmark Modified Duration (Float)', 'Benchmark Coupon Curve Duration'];

    shiftptArr.forEach(function(optionName, index) {

      it('Should verify if option box contains "' + optionName + '" radio button', function() {
        expect(DocumentOptionsFixedIncomeAttribution.getAllRadioButtonLabels().get(index).getText()).toEqual(optionName);
      });
    });

    it('Should click on "Benchmark Modified Duration" radio button to select', function() {
      ThiefHelpers.getRadioClassReference('Benchmark Modified Duration').select();

      // Verifying if "Benchmark Modified Duration" radio button is selected
      ThiefHelpers.getRadioClassReference('Benchmark Modified Duration').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Benchmark Modified Duration" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 550393', function() {

    it('Should select "Tenor" option from the dropdown', function() {
      // Select 'Tenor' from the drop down.
      ThiefHelpers.selectOptionFromDropDown('Tenor', 'Shift Point');

      // Verifying if "Tenor" option is selected
      ThiefHelpers.verifySelectedDropDownText('Tenor', 'Shift Point');
    });

    it('Verifying if "Include All" checkbox is still checked', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include All" group checklist is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the "Include All" element', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Include All"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should verify all checkboxes are still checked inside Tenor Options Box', function() {
      var count = 0;
      DocumentOptionsFixedIncomeAttribution.getAllShiftPointCheckboxes('Include All').each(function(checkboxArr) {
        checkboxArr.getText().then(function(text) {
          // Verifying if the checkbox is checked
          ThiefHelpers.getChecklistClassRef().getGroupByText('Include All').getItemByText(text).isChecked().then(function(checked) {
            if (!checked) {
              expect(false).customError('"' + text + '" item in the checklist is unchecked');
              count = count + 1;
            }
          });
        });
      });
      if (count < 0) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 550394', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');
  });
});
