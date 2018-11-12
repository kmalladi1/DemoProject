'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: right-click-column', function() {

  var arrElements = [];
  var arrReports = ['MWR - One Day', 'MWR - Two Day'];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 509254', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/PA3/Right_click/RIGHT_CLICK_TEST" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('right-click-test');
    });

    it('Waiting that "Asset Type Grouping" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if "Asset Type Grouping" report is calculated
      // NOTE: The title name under "Asset Type Grouping" is named as "Weights". Thus, we are passing "Weights" as
      // argument to the function.
      expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
    });

    it('Verifying if "Asset Type Grouping" is selected by default in LHP', function() {
      // Verifying if "Asset Type Grouping" report is selected
      expect(PA3MainPage.getReports('Asset Type Grouping').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 509256', function() {

    it('Should right click on "Port. Weight" in "Weights" report and select "Columns > Add Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Port. Weight') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Add Column\u2026');
          }
        });
      });
    });

    it('Verifying if "Tile Options" View mode is appeared', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (!option) {
          expect(false).customError('"Tile Options" View mode has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Port" into the "Search" field from "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Port');

      // Verifying that "Port" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'Port') {
          expect(false).customError('"Port" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for search action to complete
      browser.sleep(2000);
    });

    it('Should double click on "Port. Ending Market Value" present under "FactSet" tree from "Available" section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Port. Ending Market Value').then(function(item) {
        item.select();
        item.doubleClick();
      });
    });

    it('Verifying that "Port. Ending Market Value" is added to the "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Port. Ending Market Value') === -1) {
          expect(false).customError('"Port. Ending Market Value" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options - Weights" header bar', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('"Tile Options - Weights" view should be closed after clicking on OK button', function() {
      expect(TileOptions.isTileOptionsMode()).toBeFalsy();
    });

    it('Waiting for "Weights" report to re-calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000);

      // Verifying if "Weights" report is calculated
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(present) {
        expect(!present).customError('"Calculation Error" dialog box is seen while report calculation.');
        if (present) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Collect the names of columns appeared in the calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Weights').each(function(element1) {
        Utilities.scrollElementToVisibility(element1);
        element1.getText().then(function(text1) {
          var name1 = text1.replace(/\n/g, ' ');
          arrElements.push(name1);
        });
      });
    });

    it('Verifying that column: "Port. Ending Market Value " is added to the report', function() {
      var index = arrElements.indexOf('Port. Ending Market Value');
      expect(index > 0).customError(509256, '"Port. Ending Market Value" column is not added to the calculated report');
      if (index <= 0) {
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 509257', function() {

    it('Should select "Security Name Grouping" fron LHP', function() {
      PA3MainPage.getReports('Security Name Grouping').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Security Name Grouping" is selected
      expect(PA3MainPage.getReports('Security Name Grouping').getAttribute('class')).toContain('selected');
    });

    it('Waiting for "Weights" report to calculate ', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Waiting for data to load
      browser.sleep(3000);
    });

    // Storing options to verify from right click menu into an array
    var arrOptions = ['Entity Structure', 'Expand All', 'Collapse All', 'Show All Groups', 'Exclusions', 'Groupings'];
    var checkOptions;

    it('Should right click on "Accenture Plc Class A" from calculated report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Accenture Plc Class A', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
        checkOptions = true;
      }, function(value) {

        if (!value) {
          expect(value).customError('Menu list did not appear after performing right click on "Accenture Plc Class A".');
          checkOptions = false;
          CommonFunctions.takeScreenShot();
        }
      });
    });

    if (checkOptions) {
      arrOptions.forEach(function(optionName) {
        it('Verifying that "' + optionName + '" option is present in the menu list', function() {
          expect(PA3MainPage.getOptionFromCustomMenu(optionName).isPresent()).toBeTruthy();
        });
      });
    }
  });

  describe('Test Step ID: 762050', function() {

    it('Should open "Client:;Pa3;General;CASH_USD MWR_Return" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('cash-usd-mwr_-return');
    });

    arrReports.forEach(function(reportName) {
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    var arrReportData = [{reportName: 'MWR - One Day', multiHeaderName: ''}, {reportName: 'MWR - Two Day', multiHeaderName: '03-JAN-2017 to 04-JAN-2017'}];

    // Column name is seen as Port. Money- Weighted Return in DOM
    arrReportData.forEach(function(reportData) {
      it('Verify cell value of "Port. Money-Weighted Return" row of "CASH_USD" row of "' + reportData.reportName + '" report', function() {
        SlickGridFunctions.scrollCellIntoView(reportData.reportName, 'CASH_USD', 'Ticker', 'Port. Money- Weighted Return', reportData.multiHeaderName);
        SlickGridFunctions.getCellReference(reportData.reportName, 'CASH_USD', 'Ticker', 'Port. Money- Weighted Return', reportData.multiHeaderName).then(function(reference) {
          reference.getText().then(function(text) {
            if (parseFloat(text) !== 0.000007) {
              expect(false).customError('Cell value of "Port. Money-Weighted Return" row of "CASH_USD" row of "' + reportData.reportName + '" report is not 0.000007, found ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if date hyperlink is set to "03-JAN-2017 - 04-JAN-2017" for "MWR - One Day" report', function() {
      PA3MainPage.getDateHyperLink('MWR - One Day').getText().then(function(text) {
        if (text !== '03-JAN-2017 - 04-JAN-2017') {
          expect(false).customError('Date hyperlink did not set to "03-JAN-2017 - 04-JAN-2017"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 762057', function() {
    it('Verifying if the "Total" row for "Port. Money- Weighted Return" column is "0.486685" for "MWR-One Day" report', function() {
      SlickGridFunctions.scrollCellIntoView('MWR - One Day', 'Total', '', 'Port. Money- Weighted Return');
      SlickGridFunctions.getCellReference('MWR - One Day', 'Total', '', 'Port. Money- Weighted Return').then(function(reference) {
        reference.getText().then(function(text) {
          if (parseFloat(text) !== 0.486685) {
            expect(false).customError('"Total" row for "Port. Money- Weighted Return" column is not set as "0.486685"; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 770456', function() {
    var arrMultiHeaders = ['03-JAN-2017 to 04-JAN-2017', 'Total'];
    var arrVales = [0.486685, 0.729534];
    arrVales.forEach(function(value, index) {
      it('Verifying if the "Total" row for "Port. Money-Weighted Return" column is "' + value + '" for "' + arrMultiHeaders[index] + '" "MWR-Two Day" report', function() {
        SlickGridFunctions.scrollCellIntoView('MWR - Two Day', 'Total', '', 'Port. Money- Weighted Return', arrMultiHeaders[index]);
        SlickGridFunctions.getCellReference('MWR - Two Day', 'Total', '', 'Port. Money- Weighted Return', arrMultiHeaders[index]).then(function(reference) {
          reference.getText().then(function(text) {
            if (parseFloat(text) !== value) {
              expect(false).customError('"Total" row for "Port. Money-Weighted Return" column is not set as "' + value + '"; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

});
