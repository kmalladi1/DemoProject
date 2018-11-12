'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-univ-ofdb', function() {

  var arrRowNames = ['Total', 'International Business Machines Corporation', '@NA'];
  var verifyReportValuesForGivenMultiheader = function(multiHeaderName, arrValuesRow1, arrValuesRow2, arrValuesRow3) {
    PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', multiHeaderName).then(function(range) {
      arrRowNames.forEach(function(rowName) {
        range.forEach(function(index) {
          if (rowName === 'Total') {
            PA3MainPage.getCellValueForMultiHeaderColumn('Weights', rowName, index, 'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(totalValue) {
              SlickGridFunctions.getColumnNames('Weights').then(function(colNamesArr) {
                if (colNamesArr[index].indexOf('Port Wgt from Risk Engine') !== -1) {
                  if (totalValue !== arrValuesRow1[index - range[0]]) {
                    expect(false).customError('"' + rowName + '" value of "' + colNamesArr[index] + '" is displayed as "' + totalValue + '" but expected: "' + arrValuesRow1[index - range[0]] + '"');
                    CommonFunctions.takeScreenShot();
                  }
                } else {
                  if (totalValue !== arrValuesRow1[index - range[0]]) {
                    expect(false).customError('"' + rowName + '" value of "' + colNamesArr[index] + '" is displayed as "' + totalValue + '" but expected: "' + arrValuesRow1[index - range[0]] + '"');
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            });
          } else {
            PA3MainPage.getCellValueForMultiHeaderColumn('Weights', rowName, index, 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(totalValue) {
              if (rowName === 'International Business Machines Corporation') {
                if (totalValue !== arrValuesRow2[index - range[0]]) {
                  expect(false).customError('"' + rowName + '" value is displayed as "' + totalValue + '" but expected: "' + arrValuesRow2[index - range[0]] + '"');
                  CommonFunctions.takeScreenShot();
                }
              } else if (rowName === '@NA') {
                if (totalValue !== arrValuesRow3[index - range[0]]) {
                  expect(false).customError('"' + rowName + '" value is displayed as "' + totalValue + '" but expected: "' + arrValuesRow3[index - range[0]] + '"');
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          }
        });
      });
    });
  };

  var verifyOptionsInDocumentDialog = function() {

    it('Verifying if "Defaults Applied" is present in the top right corner', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Defaults Applied" is not present in the top right corner.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Use benchmark as the market portfolio" checkbox is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Use benchmark as the market portfolio').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Use benchmark as the market portfolio" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Market Risk Premium (Annual %)" is set to "6"', function() {
      var xpathOfMarketRiskSpinnerTextBox = CommonFunctions.replaceStringInXpath(DocumentOptionsRiskTab.xpathSpinnerTextBox, 'Market Risk Premium (Annual %)');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfMarketRiskSpinnerTextBox).getText().then(function(text) {
        if (text !== '6') {
          expect(false).customError('"Market Risk Premium (Annual %)" is not set to "6"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Deannualization Factor (Days)" is set to "365"', function() {
      var xpathOfMarketRiskSpinnerTextBox = CommonFunctions.replaceStringInXpath(DocumentOptionsRiskTab.xpathSpinnerTextBox, 'Deannualization Factor (Days)');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathOfMarketRiskSpinnerTextBox).getText().then(function(text) {
        if (text !== '365') {
          expect(false).customError('"Deannualization Factor (Days)" is not set to "365"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "On Append Error" drop down is set to "Return NA for Risk Data"', function() {
      ThiefHelpers.verifySelectedDropDownText('Return NA for Risk Data', 'On Append Error');
    });

    it('Verifying if "Risk Model" column contains "Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)"', function() {
      DocumentOptionsRiskTab.getColumnData('Risk Model').then(function(text) {
        if (text.indexOf('Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)') < 0) {
          expect(false).customError('"Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)" did not present in "Risk Model" column. ' + 'Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Appended Companies" column contains "Client:/Pa2_pa3_backup/Risk/BARRA_USE4L_APPEND.OFDB"', function() {
      DocumentOptionsRiskTab.getColumnData('Appended Companies').then(function(text) {
        if (text.indexOf('Client:/Pa3/Risk/RI_DOC_OPT_APPEND_GEMLTL.OFDB') < 0) {
          expect(false).customError('"Client:/Pa2_pa3_backup/Risk/BARRA_USE4L_APPEND.OFDB" did not present in ' + '"Appended Companies" column. Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Append File" button is enabled', function() {
      ThiefHelpers.getButtonClassReference('Append File').isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Append File" button is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: Start Up', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 566892', function() {

    it('Should open PA3 Application with "Client:;Pa3;Risk;ri_doc_opt_append"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ri-doc-opt-append');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaderDates = ['28-FEB-2017', '31-MAR-2017'];
    multiheaderDates.forEach(function(date, index) {
      it('Verifying if "' + date + '" is displayed as multi-header', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderNames) {
          if (date !== multiheaderNames[index]) {
            expect(false).customError('Expected: "' + date + '" to be displayed as multi-header but found "' + multiheaderNames + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfTotal = ['', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation = ['--', '--', '--', '--'];
    var arrOfNA = ['--', '--', '--', '--'];
    it('Verifying the report values for "28-FEB-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('28-FEB-2017', arrOfTotal, arrofInternationalBusinessMachinesCorporation, arrOfNA);
    });

    var arrOfTotal2 = ['100.00', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation2 = ['50.00', '12.56', '11.05', '16.73'];
    var arrOfNA2 = ['50.00', '10.00', '11.05', '14.91'];
    it('Verifying the report values for "31-MAR-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('31-MAR-2017', arrOfTotal2, arrofInternationalBusinessMachinesCorporation2, arrOfNA2);
    });
  });

  describe('Test Step ID: 566890', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Risk', undefined, 'Document Options');

    // Verify Document dialog options
    verifyOptionsInDocumentDialog();
  });

  describe('Test Step ID: 566891', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaderDates = ['28-FEB-2017', '31-MAR-2017'];
    multiheaderDates.forEach(function(date, index) {
      it('Verifying if "' + date + '" is displayed as multi-header', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderNames) {
          if (date !== multiheaderNames[index]) {
            expect(false).customError('Expected: "' + date + '" to be displayed as multi-header but found "' + multiheaderNames + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfTotal = ['', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation = ['--', '--', '--', '--'];
    var arrOfNA = ['--', '--', '--', '--'];
    it('Verifying the report values for "28-FEB-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('28-FEB-2017', arrOfTotal, arrofInternationalBusinessMachinesCorporation, arrOfNA);
    });

    var arrOfTotal2 = ['100.00', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation2 = ['50.00', '12.56', '11.05', '16.73'];
    var arrOfNA2 = ['50.00', '10.00', '11.05', '14.91'];
    it('Verifying the report values for "31-MAR-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('31-MAR-2017', arrOfTotal2, arrofInternationalBusinessMachinesCorporation2, arrOfNA2);
    });
  });

  describe('Test Step ID: 566889', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk', undefined, 'Document Options');

    it('Should select "Ignore Append Data" from "On Append Error" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Ignore Append Data', 'On Append Error');

      // Verify if 'Ignore Append Data' is selected from 'On Append Error' drop down
      ThiefHelpers.verifySelectedDropDownText('Ignore Append Data', 'On Append Error');
    });

    it('Verifying if the "Restore Defaults" button is displayed in right corner of "Document Options" window', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(enabled) {
        if (!enabled) {
          expect(false).customError('The "Restore Defaults" button is not displayed in right corner of "Document Options" window.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 566888', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaderDates = ['28-FEB-2017', '31-MAR-2017'];
    multiheaderDates.forEach(function(date, index) {
      it('Verifying if "' + date + '" is displayed as multi-header', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderNames) {
          if (date !== multiheaderNames[index]) {
            expect(false).customError('Expected: "' + date + '" to be displayed as multi-header but found "' + multiheaderNames + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfTotal = ['100.00', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation = ['50.00', '12.98', '11.67', '17.46'];
    var arrOfNA = ['--', '--', '--', '--'];
    it('Verifying the report values for "28-FEB-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('28-FEB-2017', arrOfTotal, arrofInternationalBusinessMachinesCorporation, arrOfNA);
    });

    var arrOfTotal2 = ['100.00', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation2 = ['50.00', '12.56', '11.05', '16.73'];
    var arrOfNA2 = ['50.00', '10.00', '11.05', '14.91'];
    it('Verifying the report values for "31-MAR-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('31-MAR-2017', arrOfTotal2, arrofInternationalBusinessMachinesCorporation2, arrOfNA2);
    });
  });

  describe('Test Step ID: 719333', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk', undefined, 'Document Options');

    it('Should click on the "Restore Defaults" button in the top right corner', function() {
      DocumentOptions.getRestoreDefaultsButton().click().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying that "Restore Defaults" button is not displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(displayed) {
        if (displayed) {
          expect(false).customError('"Restore Defaults" button is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify Document dialog options
    verifyOptionsInDocumentDialog();
  });

  describe('Test Step ID: 719334', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiheaderDates = ['28-FEB-2017', '31-MAR-2017'];
    multiheaderDates.forEach(function(date, index) {
      it('Verifying if "' + date + '" is displayed as multi-header', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderNames) {
          if (date !== multiheaderNames[index]) {
            expect(false).customError('Expected: "' + date + '" to be displayed as multi-header but found "' + multiheaderNames + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfTotal = ['', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation = ['--', '--', '--', '--'];
    var arrOfNA = ['--', '--', '--', '--'];
    it('Verifying the report values for "28-FEB-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('28-FEB-2017', arrOfTotal, arrofInternationalBusinessMachinesCorporation, arrOfNA);
    });

    var arrOfTotal2 = ['100.00', '', '', ''];
    var arrofInternationalBusinessMachinesCorporation2 = ['50.00', '12.56', '11.05', '16.73'];
    var arrOfNA2 = ['50.00', '10.00', '11.05', '14.91'];
    it('Verifying the report values for "31-MAR-2017" multi-header', function() {
      verifyReportValuesForGivenMultiheader('31-MAR-2017', arrOfTotal2, arrofInternationalBusinessMachinesCorporation2, arrOfNA2);
    });
  });
});
