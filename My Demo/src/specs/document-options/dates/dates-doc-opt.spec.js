'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dates-doc-opt', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 500777', function() {

    it('Should launch the PA3 application with "Client:;Pa3;Dates;DOC_OPTIONS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('doc-options');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Select and verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if the "Economic Sector" grouping is present in the Contribution report', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Economic Sector" grouping did not display in the Contribution report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the groupings hyperlink is "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError('Grouping hyperlink did not contain "Economic Sector"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 500778', function() {

    // Select Dates tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Dates');

    it('Should type "12/31/2010" into the "Start Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('Start Date:').setText('12/31/2010');

      // Verifying that "12/31/2010" is typed into the "Start Date" field
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== '12/31/2010') {
          expect(false).customError('"12/31/2010" did not present in the "Start Date" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "12/31/2014" into the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('12/31/2014');

      // Verifying that "12/31/2014" is typed into the "End Date" field
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== '12/31/2014') {
          expect(false).customError('"12/31/2014" did not present in the "End Date" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Frequency" drop down and select "Fiscal Yearly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').open();

      // Selecting Fiscal Yearly
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').selectItemByText('Fiscal Yearly');
    });

    it('Verifying if the "Report Frequency" drop down is set to "Fiscal Yearly"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Report Frequency:').getSelectedText().then(function(text) {
        if (text !== 'Fiscal Yearly') {
          expect(false).customError('"Report Frequency" drop down did not set to "Fiscal Yearly"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Date Order" drop down and select "Latest to Earliest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').open();

      // Selecting Latest to Earliest
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').selectItemByText('Latest to Earliest');
    });

    it('Verifying if the "Date Order" drop down is set to "Latest to Earliest"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').getSelectedText().then(function(text) {
        if (text !== 'Latest to Earliest') {
          expect(false).customError('"Date Order" drop down did not set to "Latest to Earliest"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var dateRanges = ['12/31/2013 to 12/31/2014', '12/31/2012 to 12/31/2013', '12/30/2011 to 12/31/2012',
      '12/31/2010 to 12/30/2011', 'Total',];

    dateRanges.forEach(function(date, index) {

      it('Verifying if Contribution report is calculated with date range "' + date + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Contribution').then(function(multiheaderNames) {
          if (multiheaderNames[index] !== date) {
            expect(false).customError('Contribution report did not calculate with date ' +
              'range "' + date + '"; Found: ' + multiheaderNames[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 500784', function() {

    // Select Date Options from Document Options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Date Options', 'Dates', 'Document Options');

    it('Should click on "Calendar" drop down and select "Five Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).open();

      // Selecting Five Day
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown)
        .selectItemByText('Five Day');
    });

    it('Verifying if the "Calendar" drop down is set to "Five Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'Five Day') {
            expect(false).customError('"Calendar" drop down did not set to "Five Day"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click "Date Format" drop down and select "M/DD/YYYY" if not already selected', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathDateFormatDropDown).getSelectedText()
        .then(function(dateFormat) {
          if (dateFormat !== 'M/DD/YYYY') {
            ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathDateFormatDropDown).open();

            // Selecting M/DD/YYYY
            ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathDateFormatDropDown)
              .selectItemByText('M/DD/YYYY');
          }
        });
    });

    it('Verifying if the "Date Format" drop down is set to "M/DD/YYYY"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathDateFormatDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'M/DD/YYYY') {
            expect(false).customError('"Date Format" drop down did not set to "M/DD/YYYY"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Fiscal Year End Month" drop down and select "June"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathFiscalYearEndMonthDropDown).open();

      // Selecting June
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathFiscalYearEndMonthDropDown)
        .selectItemByText('June');
    });

    it('Verifying if the "Fiscal Year End Month" drop down is set to "June"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathFiscalYearEndMonthDropDown)
        .getSelectedText().then(function(text) {
        if (text !== 'June') {
          expect(false).customError('"Fiscal Year End Month" drop down did not set to "June"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Holdings As Of" drop down and select "End of Period"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathHoldingsAsOfDropDown).open();

      // Selecting End of Period
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathHoldingsAsOfDropDown)
        .selectItemByText('End of Period');
    });

    it('Verifying if the "Holdings As Of" drop down is set to "End of Period"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathHoldingsAsOfDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'End of Period') {
            expect(false).customError('"Holdings As Of" drop down did not set to "End of Period"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Calculation Frequency" drop down and select "Weekly"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown).open();

      // Selecting Weekly
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown)
        .selectItemByText('Weekly');
    });

    it('Verifying if the "Calculation Frequency" drop down is set to "Weekly"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown)
        .getSelectedText().then(function(text) {
        if (text !== 'Weekly') {
          expect(false).customError('"Calculation Frequency" drop down did not set to "Weekly"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var dateRanges = ['6/27/2014 to 12/31/2014', '6/28/2013 to 6/27/2014', '6/29/2012 to 6/28/2013',
      '6/24/2011 to 6/29/2012', '12/31/2010 to 6/24/2011', 'Total',];

    dateRanges.forEach(function(date, index) {

      it('Verifying if Contribution report is calculated with date range "' + date + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Contribution').then(function(multiheaderNames) {
          if (multiheaderNames[index] !== date) {
            expect(false).customError('Contribution report did not calculate with date range ' +
              '"' + date + '"; Found: ' + multiheaderNames[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 580632', function() {

    // Select Date Options from Document Options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Date Options', 'Dates', 'Document Options');

    it('Should check "Include End of Month" checkbox', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying if the "Include End of Month" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include End of Month" check box did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Calculation Frequency" drop down and select "Daily"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown).open();

      // Selecting Daily
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown)
        .selectItemByText('Daily');
    });

    it('Verifying if the "Calculation Frequency" drop down is set to "Daily"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalculationFrequencyDropDown)
        .getSelectedText().then(function(text) {
        if (text !== 'Daily') {
          expect(false).customError('"Calculation Frequency" drop down did not set to "Daily"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    var dateRanges = ['6/30/2014 to 12/31/2014', '6/30/2013 to 6/30/2014', '6/30/2012 to 6/30/2013',
      '6/30/2011 to 6/30/2012', '12/31/2010 to 6/30/2011', 'Total',];

    dateRanges.forEach(function(date, index) {

      it('Verifying if Contribution report is calculated with date range "' + date + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Contribution').then(function(multiheaderNames) {
          if (multiheaderNames[index] !== date) {
            expect(false).customError('Contribution report did not calculate with date range' +
              ' "' + date + '"; Found: ' + multiheaderNames[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 582836', function() {

    it('Should type "MLH0A0" in the "Portfolio" widget and select "ICE BofAML US High Yield Index" from the .' +
      'type ahead', function() {
      PA3MainPage.setPortfolio('MLH0A0', 'ICE BofAML US High Yield Index', 'BENCH:MLH0A0').then(
        function(option) {
          if (!option) {
            expect(false).customError('"CLIENT:/PA3/TEST.ACCT" is not selected from type ahead.');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Portfolio', 'Prices', 'Document Options');

    it('Should click on "X" button in the selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, DocumentOptionsPricesPortfolio.getButtonFromSelectedSection('Prices',
        'remove')).press();
    });

    it('Should type "BofA" in the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.xpathPricesSearchField)
        .setText('BofA').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if the search field contains "BofA" in the "Available" section
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.xpathPricesSearchField).getText()
        .then(function(text) {
        if (text !== 'BofA') {
          expect(false).customError('Search field did not set to "BofA" in the "Available" section; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should collapse "ICE BofAML" group inside "Fixed Income" in the "Available" section', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Fixed Income|ICE BofAML')
        .collapse();
    });

    it('Should double click "ICE BofAML" in the "Available" section', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Fixed Income|ICE BofAML')
        .then(function(group) {
          browser.actions().doubleClick(group).perform();
        });
    });

    var array = ['ICE BofAML', 'ICE BofAML - FactSet'];

    array.forEach(function(value) {

      it('Verifying if "' + value + '" is displayed in selected section of prices', function() {
        ThiefHelpers.getListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesSelectedContainer, value).getText().then(function(text) {
          if (text !== value) {
            expect(false).customError('"' + value + '" is not shown in the "Selected" container of "PRICES" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + value + '." is not found in the "Selected" container of "PRICES" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      });

    });

  });

  describe('Test Step ID: 582837', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if the "Total Return" value for "6/30/2014 to 12/31/2014" multiheader is "-2.96"', function() {
      PA3MainPage.getCellValueForMultiHeaderColumn('Contribution', 'Total', '6', 'slick-pane slick-pane-top slick-pane-left',
        'slick-pane slick-pane-top slick-pane-right').then(function(text) {
        if (text !== '-2.96') {
          expect(false).customError('"Total Return" value for "6/30/2014 to 12/31/2014" multiheader did not ' +
            'set to "-2.96"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 771404', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Account menu drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Use Multiple Portfolios" check box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying that "Use Multiple Portfolios" check box is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is un-checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > -1) {
          expect(false).customError('"Accounts" drop down is not closed even after clicking on "OK" button');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Dates');

    it('Should select "One Week Ago" from the End Date dropdown and verify the same', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').selectOptionByText('One Week Ago').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "One Week Ago" is set in End Date input box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(text) {
        if (text !== 'One Week Ago') {
          expect(false).customError('"One Week Ago" is not set in "End Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Latest to Earliest" from "Date Order:" and verify the same', function() {
      // Selecting Latest to Earliest
      ThiefHelpers.getDropDownSelectClassReference('Date Order:').selectItemByText('Latest to Earliest');

      ThiefHelpers.getDropDownSelectClassReference('Date Order:').getSelectedText().then(function(text) {
        if (text !== 'Latest to Earliest') {
          expect(false).customError('"Date Order" drop down did not set to "Latest to Earliest"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 771409', function() {

    it('Should click on "refresh" button', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 477302', function() {

    it('Should enter "Bench:SP50" in "Portfolio" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).setText('Bench:SP50');

      // Verifying that "Bench:SP50" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'BENCH:SP50') {
          expect(false).customError('"BENCH:SP50" is not entered in "Portfolio" widget, Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "refresh" button', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
