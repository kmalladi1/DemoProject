'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: date-lagging-general', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsDatesDateLagging.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(DocumentOptionsDatesDateLagging.xpathOfSelectedOrAvailableSection, 'Available');

  var xpaths = [DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation + '/span[@tf-button]', DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation + '/span[@tf-button]'];
  var dropDown = ['Portfolio Return Calculation', 'Benchmark Return Calculation'];

  describe('Test Step ID: Startup Instructions', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 580808', function() {

    it('Should launch the PA3 application with "Client:/Pa3/Dates/DATE_LAGGING" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('date-lagging');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Country of Exchange" grouping is present in "Weights" report', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Country of Exchange" grouping did not present in "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Weights" report is grouped by "Country of Exchange"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text.indexOf('Country of Exchange') < 0) {
          expect(false).customError('"Weights" report did not group by "Country of Exchange"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Weights" report is displayed', function() {
      PA3MainPage.getDateHyperLink().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Weights" report is displayed as "05-JAN-2016"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '05-JAN-2016') {
          expect(false).customError('The date range in "Weights" report did not set to ' +
            '"05-JAN-2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 580811', function() {

    // Select "Date Lagging" from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Lagging', 'Dates', 'Document Options');

    var arrElements = ['Canada > Thomson Reuters Corporation', 'United States'];

    it('Verifying if the "selected" section of "Date Lagging" tab displays "Country of Exchange > Canada > Thomson ' +
      'Reuters Corporation" and "United States"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Country of Exchange');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(element, index) {
              if (arrElements[index] !== element.text) {
                expect(false).customError('"' + arrElements[index] + '" is not present under "Country of Exchange"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Country of Exchange" is not expanded in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var checkboxes = ['Port. Exch. Rates', 'Port. Prices/Shares'];

    checkboxes.forEach(function(checkbox) {

      it('Verifying if the "' + checkbox + '" checkbox is checked', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkbox + '" checkbox did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Verifying if the "Lagging Calendar" displays "Five Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').getSelectedText().then(function(text) {
        if (text !== 'Five Day') {
          expect(false).customError('"Lagging Calendar" did not display "Five Day"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfoilo Return Calculation" is disabled', function() {
      CommonFunctions.isElementEnabled('Drop down', 'Portfoilo Return Calculation',
        DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation).then(function(isEnabled) {
        if (isEnabled) {
          expect(false).customError('"Portfoilo Return Calculation" is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Benchmark Report Calculation" is disabled', function() {
      CommonFunctions.isElementEnabled('Drop down', 'Benchmark Return Calculation',
        DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation).then(function(isEnabled) {
        if (isEnabled) {
          expect(false).customError('"Benchmark Return Calculation" is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 580823', function() {

    it('Should select "Date Options" under "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if "Date Options" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Calendar" drop down and select "Seven Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).open();

      // Selecting Seven Day
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown)
        .selectItemByText('Seven Day');
    });

    it('Verifying if the "Calendar" drop down is set to "Seven Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'Seven Day') {
            expect(false).customError('"Calendar" drop down did not set to "Seven Day"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should select "Date Lagging" under "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Lagging', 'Dates').select();

      // Verifying if "Date Lagging" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Lagging', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Lagging" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Lagging Calendar" displays "Seven Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').getSelectedText().then(function(text) {
        if (text !== 'Seven Day') {
          expect(false).customError('"Lagging Calendar" did not display "Seven Day"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Lagging Calendar" drop down is greyed out', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDatesDateLagging.xpathDropdownButton, 'Lagging Calendar');
      CommonFunctions.isElementEnabled('Dropdown', undefined, xpath).then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Lagging Calendar" drop down did not grey out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Include End of Month" checkbox is greyed out', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      CommonFunctions.isElementEnabled('checkbox', undefined, xpath).then(function(enabled) {
        if (enabled) {
          expect(false).customError('"Include End of Month" checkbox did not grey out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    xpaths.forEach(function(xpath, index) {

      it('Verifying if "' + dropDown[index] + '" drop down is greyed out', function() {
        CommonFunctions.isElementEnabled('dropdown', undefined, xpath).then(function(boolean) {
          if (boolean) {
            expect(false).customError('"' + dropDown[index] + '" drop down did not grey out');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 581447', function() {

    it('Should select "Date Options" under "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Options', 'Dates').select();

      // Verifying if "Date Options" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Options', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Options" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Calendar" drop down and select "United States"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).open();

      // Selecting United States
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown)
        .selectItemByText('United States');
    });

    it('Verifying if the "Calendar" drop down is set to "United States"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathCalenderDropDown).getSelectedText()
        .then(function(text) {
          if (text !== 'United States') {
            expect(false).customError('"Calendar" drop down did not set to "United States"; Found:' + text);
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should check the "Include End of Month" checkbox', function() {
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

    it('Should select "Date Lagging" under "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Lagging', 'Dates').select();

      // Verifying if "Date Lagging" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Lagging', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Lagging" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Lagging Calendar" displays "United States"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').getSelectedText().then(function(text) {
        if (text !== 'United States') {
          expect(false).customError('"Lagging Calendar" did not display "United States"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Lagging Calendar" and select "Five Day"', function() {
      // Clicking on the Lagging Calendar drop down
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').open();

      // Selecting Five Day from the drop down
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').selectItemByText('Five Day');
    });

    it('Verifying if the "Lagging Calendar" displays "Five Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').getSelectedText().then(function(text) {
        if (text !== 'Five Day') {
          expect(false).customError('"Lagging Calendar" did not display "Five Day"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Lagging Calendar" drop down is enabled', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDatesDateLagging.xpathDropdownButton, 'Lagging Calendar');
      CommonFunctions.isElementEnabled('Dropdown', undefined, xpath).then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Lagging Calendar" drop down did not enable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Include End of Month" checkbox is greyed out', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      CommonFunctions.isElementEnabled('checkbox', undefined, xpath).then(function(enabled) {
        if (enabled) {
          expect(false).customError('"Include End of Month" checkbox did not grey out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Include End of Month" checkbox is checked', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include End of Month" check box did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    xpaths.forEach(function(xpath, index) {

      it('Verifying if "' + dropDown[index] + '" drop down is enabled', function() {
        CommonFunctions.isElementEnabled('dropdown', undefined, xpath).then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"' + dropDown[index] + '" drop down is grayed out');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var xpathDropdown = [DocumentOptionsDatesDateLagging.xpathPortolioReturnCalculation, DocumentOptionsDatesDateLagging.xpathBenchmarkReturnCalculation];
    var dropdownOptions = ['HPR', 'Compounding'];

    xpathDropdown.forEach(function(xpath, index) {

      it('Verifying if "' + dropDown[index] + '" drop down contains "HPR" and "Compounding" in its drop down', function() {
        // Opening the drop down
        ThiefHelpers.getDropDownSelectClassReference(undefined, xpath).open();

        // Verifying the options
        ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
          dropdownOptions.forEach(function(option) {
            if (array.indexOf(option) < 0) {
              expect(false).customError('"' + option + '" did not present in the drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });

        // Verifying the count of the drop down
        ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
          if (array.length !== 2) {
            expect(false).customError('The drop down did not contain "2" elements; Found: ' + array.length);
            CommonFunctions.takeScreenShot();
          }
        });

        // Closing the drop down
        ThiefHelpers.getDropDownSelectClassReference(undefined, xpath).open();
      });

    });

  });

  describe('Test Step ID: 582010', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on "+" before "United States" to expand', function() {
      // Scrolling element into view
      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });

      // Expanding required element
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'United States');
    });

    it('Verifying if the "United States" is expanded in the calculated report', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'United States');
    });

    it('Should scroll to make securities of United States visible', function() {
      // Scrolling to load all the elements
      SlickGridFunctions.scrollGridElements();

      // Scrolling back to United States to view its securities
      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    var colNames = ['Port. Ending Price', 'Bench. Ending Price']; var values1 = ['62.36', '63.34']; var values2 = ['42.93', '42.92'];

    colNames.forEach(function(value) {

      it('Verifying if the "United States > 3D Systems Corporation" is set to "9.69" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', '3D Systems Corporation', '', value, undefined, 'United States')
          .then(function(cellReference) {
            cellReference.getText().then(function(cellvalue) {
              if (parseFloat(cellvalue).toFixed(2) !== parseFloat(9.69).toFixed(2)) {
                expect(false).customError('"United States > 3D Systems Corporation" did not ' +
                  'contain "' + value + '" as "9.69"; Found: ' + cellvalue);
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });

    });

    colNames.forEach(function(value, index) {

      it('Verifying if the "United States > 58.com Inc. Sponsored ADR Class A" is set to "' + values1[index] + '" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', '58.com Inc. Sponsored ADR Class A', '', value, undefined, 'United States')
          .then(function(reference) {
            reference.getText().then(function(cellvalue) {
              if (parseFloat(cellvalue).toFixed(2) !== parseFloat(values1[index]).toFixed(2)) {
                expect(false).customError('"United States > 58.com Inc. Sponsored ADR Class A" did not ' +
                  'contain "' + value + '" as "' + values1[index] + '"; Found: ' + cellvalue);
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });

    });

    colNames.forEach(function(value, index) {

      it('Verifying if the "United States > Abbott Laboratories" is set to "' + values2[index] + '" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Abbott Laboratories', '', value, undefined, 'United States')
          .then(function(reference) {
            reference.getText().then(function(cellvalue) {
              if (parseFloat(cellvalue).toFixed(2) !== parseFloat(values2[index]).toFixed(2)) {
                expect(false).customError('"United States > Abbott Laboratories" did not ' +
                  'contain "' + value + '" as "' + values2[index] + '"; Found: ' + cellvalue);
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });

    });

  });

  describe('Test Step ID: 582015', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Weights > Canada', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var tree = ['11-JAN-2016|Canada', '07-JAN-2016|Canada']; var portEndingPrice = ['35.55', '36.96'];
    var benchEndingPrice = ['35.40', '35.40'];

    tree.forEach(function(parent, index) {

      it('Verifying if the "' + parent + '|Thomson Reuters Corporation" contains "' + portEndingPrice[index] + '" in ' +
        '"Port. Ending Price" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Thomson Reuters Corporation', '', 'Port. Ending Price',
          undefined, parent).then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(portEndingPrice[index]).toFixed(2)) {
              expect(false).customError('"' + tree + '|Thomson Reuters Corporation" did not ' +
                'contain "Port. Ending Price" as "' + portEndingPrice[index] + '"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    tree.forEach(function(parent, index) {

      it('Verifying if the "' + parent + '|Thomson Reuters Corporation" contains "' + benchEndingPrice[index] + '" in ' +
        '"Bench. Ending Price" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Thomson Reuters Corporation', '', 'Bench. Ending Price',
          undefined, parent).then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(benchEndingPrice[index]).toFixed(2)) {
              expect(false).customError('"' + tree + '|Thomson Reuters Corporation" did not ' +
                'contain "Bench. Ending Price" as "' + benchEndingPrice[index] + '"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 582012', function() {

    // Select "Date Lagging" from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights > Canada', 'Date Lagging', 'Dates', 'Document Options');

    var checkboxes = ['Port. Exch. Rates', 'Port. Prices/Shares'];

    checkboxes.forEach(function(checkbox) {

      it('Should uncheck the "' + checkbox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).uncheck();

        // Verifying if the checkbox is unchecked
        ThiefHelpers.getCheckBoxClassReference(checkbox).isChecked().then(function(checked) {
          if (checked) {
            expect(false).customError('"' + checkbox + '" checkbox did not get unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var checkboxes1 = ['Bench. Prices/Shares', 'Bench. Exch. Rates'];

    checkboxes1.forEach(function(checkbox) {

      it('Should check the "' + checkbox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).check();

        // Verifying if the checkbox is checked
        ThiefHelpers.getCheckBoxClassReference(checkbox).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkbox + '" checkbox did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var tree = ['11-JAN-2016|Canada', '08-JAN-2016|Canada']; var portEndingPrice = ['35.40', '35.55'];
    var benchEndingPrice = ['35.40', '35.55'];

    tree.forEach(function(parent, index) {

      it('Verifying if the "' + parent + '|Thomson Reuters Corporation" contains "' + portEndingPrice[index] + '" in ' +
        '"Port. Ending Price" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Thomson Reuters Corporation', '', 'Port. Ending Price',
          undefined, parent).then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(portEndingPrice[index]).toFixed(2)) {
              expect(false).customError('"' + tree + '|Thomson Reuters Corporation" did not ' +
                'contain "Port. Ending Price" as "' + portEndingPrice[index] + '"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    tree.forEach(function(parent, index) {

      it('Verifying if the "' + parent + '|Thomson Reuters Corporation" contains "' + benchEndingPrice[index] + '" in ' +
        '"Bench. Ending Price" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Thomson Reuters Corporation', '', 'Bench. Ending Price',
          undefined, parent).then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(benchEndingPrice[index]).toFixed(2)) {
              expect(false).customError('"' + tree + '|Thomson Reuters Corporation" did not ' +
                'contain "Bench. Ending Price" as "' + benchEndingPrice[index] + '"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 582014', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to make securities of United States visible', function() {
      // Scrolling to load all the elements
      SlickGridFunctions.scrollGridElements();

      // Scrolling back to United States to view its securities
      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    var colNames = ['Port. Ending Price', 'Bench. Ending Price']; var values = ['9.69', '9.83']; var values2 = ['63.34', '63.34'];

    values.forEach(function(value, index) {

      it('Verifying if the "United States > 3D Systems Corporation" is set to "' + value + '" ' +
        'in "' + colNames[index] + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', '3D Systems Corporation', '', colNames[index], undefined,
          'United States').then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(value).toFixed(2)) {
              expect(false).customError('"United States > 3D Systems Corporation" did not ' +
                'contain "' + colNames[index] + '" as "' + value + '"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    values2.forEach(function(value, index) {

      it('Verifying if the "United States > 58.com Inc. Sponsored ADR Class A" is set to "' + value + '" ' +
        'in "' + colNames[index] + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', '58.com Inc. Sponsored ADR Class A', '', colNames[index],
          undefined, 'United States').then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(value).toFixed(2)) {
              expect(false).customError('"United States > 58.com Inc. Sponsored ADR Class A" did not ' +
                'contain "' + colNames[index] + '" as "' + value + '"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 582931', function() {

    // Select "Date Lagging" from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Lagging', 'Dates', 'Document Options');

    it('Should click on "Egypt" group from the "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Egypt');
      group.select();

      // Check if 'Egypt' is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Egypt" did not selected from "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on > arrow button', function() {
      // Clicking right arrow to move Egypt to selected section
      DocumentOptionsDatesDateLagging.getArrowButton('Right').click();
    });

    var arrItems = [];
    it('Verifying if "Egypt" is moved to "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Country of Exchange');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            arrObject.forEach(function(element) {
              arrItems.push(element.text);
            });
            if (arrItems.indexOf('Egypt') === -1) {
              expect(false).customError('"Egypt" is not present under "Country of Exchange"');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Country of Exchange" is not expanded in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var checkboxes = ['Port. Exch. Rates', 'Port. Prices/Shares'];

    checkboxes.forEach(function(checkbox) {

      it('Should check the "' + checkbox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).check();

        // Verifying if the checkbox is checked
        ThiefHelpers.getCheckBoxClassReference(checkbox).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + checkbox + '" checkbox did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to make securities of United States visible', function() {
      // Scrolling to load all the elements
      SlickGridFunctions.scrollGridElements();

      // Scrolling back to United States to view its securities
      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    var colNames = ['Port. Ending Price', 'Bench. Ending Price'];

    colNames.forEach(function(value) {

      it('Verifying if the "United States > 3M Company" is set to "146.82" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', '3M Company', '', value, undefined, 'United States')
          .then(function(reference) {
            reference.getText().then(function(cellvalue) {
              if (parseFloat(cellvalue).toFixed(2) !== parseFloat(146.82).toFixed(2)) {
                expect(false).customError('"United States > 3M Company" did not ' +
                  'contain "' + value + '" as "146.82"; Found: ' + cellvalue);
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });

    });

    it('Should scroll to make securities of Egypt visible', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Egypt', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should click on "+" before "Egypt" to expand', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Egypt');
    });

    it('Verifying if the "Egypt" is expanded in the calculated report', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Egypt');
    });

    it('Should scroll to make securities of Egypt visible', function() {
      // Scrolling to load all the elements
      SlickGridFunctions.scrollGridElements();

      // Scrolling back to Egypt to view its securities
      SlickGridFunctions.getRowIndex('Weights', 'Egypt', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
          '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    colNames.forEach(function(value) {

      it('Verifying if the "Egypt > Commercial International Bank (Egypt) SAE" is set to "4.95" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Commercial International Bank (Egypt) SAE', '', value,
          undefined, 'Egypt')
          .then(function(reference) {
            reference.getText().then(function(cellvalue) {
              if (parseFloat(cellvalue).toFixed(2) !== parseFloat(4.95).toFixed(2)) {
                expect(false).customError('"Egypt > Commercial International Bank (Egypt) SAE" did not ' +
                  'contain "' + value + '" as "4.95"; Found: ' + cellvalue);
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });

    });

  });

  describe('Test Step ID: 582954', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Weights', 'Weights > Canada', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var colNames = ['Port. Ending Price', 'Bench. Ending Price'];

    colNames.forEach(function(value) {

      it('Verifying if the "11-JAN-2016 > Egypt > Commercial International Bank (Egypt) SAE" is set to "4.86" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Commercial International Bank (Egypt) SAE', '', value,
          undefined, '11-JAN-2016|Egypt').then(function(reference) {
          reference.getText().then(function(cellvalue) {
            if (parseFloat(cellvalue).toFixed(2) !== parseFloat(4.86).toFixed(2)) {
              expect(false).customError('"11-JAN-2016 > Egypt > Commercial International Bank (Egypt) SAE" did not ' +
                'contain "' + value + '" as "4.86"; Found: ' + cellvalue);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

    colNames.forEach(function(value) {

      it('Verifying if the "07-JAN-2016 > Egypt > Talaat Moustafa Group Holding" is set to "0.83" ' +
        'in "' + value + '" column', function() {
        SlickGridFunctions.getCellReference('Weights', 'Talaat Moustafa Group Holding', '', value, undefined, '07-JAN-2016|Egypt')
          .then(function(reference) {
            reference.getText().then(function(cellvalue) {
              if (parseFloat(cellvalue).toFixed(2) !== parseFloat(0.83).toFixed(2)) {
                expect(false).customError('"07-JAN-2016 > Egypt > Talaat Moustafa Group Holding" did not ' +
                  'contain "' + value + '" as "0.83"; Found: ' + cellvalue);
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });

    });

  });

  describe('Test Step ID: 581448', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'Document Options');

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

    it('Should uncheck the "Include End of Month" checkbox', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).uncheck();

      // Verifying if the "Include End of Month" check box is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Include End of Month" check box did not get uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Date Lagging" under "Dates" in LHP', function() {
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Lagging', 'Dates').select();

      // Verifying if "Date Lagging" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(DocumentOptions.xpathOptionsPane, 'Date Lagging', 'Dates').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Date Lagging" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Lagging Calendar" displays "Five Day"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').getSelectedText().then(function(text) {
        if (text !== 'Five Day') {
          expect(false).customError('"Lagging Calendar" did not display "Five Day"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Lagging Calendar" drop down does not display "United States"', function() {
      // Clicking on the Lagging Calendar drop down to open
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').open();

      // Verifying if the Lagging Calendar does not display United States
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        if (array.indexOf('United States') >= 0) {
          expect(false).customError('"United States" is present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });

      // Closing the Lagging Calendar drop down
      ThiefHelpers.getDropDownSelectClassReference('Lagging Calendar').open();
    });

    it('Verifying if the "Include End of Month" checkbox is greyed out', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      CommonFunctions.isElementEnabled('checkbox', undefined, xpath).then(function(enabled) {
        if (enabled) {
          expect(false).customError('"Include End of Month" checkbox did not grey out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known issue: RPD:22328132
    it('Verifying if the "Include End of Month" checkbox is not checked', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsDates.xpathCheckBox, 'Include End of Month');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Include End of Month" check box is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known issue: RPD:22331142
    xpaths.forEach(function(xpath, index) {

      it('Verifying if "' + dropDown[index] + '" drop down is greyed out', function() {
        CommonFunctions.isElementEnabled('dropdown', undefined, xpath).then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"' + dropDown[index] + '" drop down did not grey out');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    // Click on "Cancel" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document options');

  });

});
