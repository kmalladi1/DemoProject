'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-definition', function() {

  var colIndex1;
  var colIndex2;
  var oldValueNames = [];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 509038', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/symbol_name"', function() {
      PA3MainPage.switchToDocument('symbol-name');
    });

    it('Wait for "New Column Test" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('New Column Test'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the "New Column Test" report.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "New Column Test" report is calculated', function() {
      // Verifying "New Column Test" Report is calculated
      PA3MainPage.isReportCalculated('New Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "New Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Ticker" is present and get the index position of it from calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('New Column Test').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === 'Ticker') {
            colIndex1 = index;
          }
        });
      });
    });
  });

  describe('Test Step ID: 509039', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - New Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Ticker" from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ticker').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Ticker-Region" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Ticker-Region', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'Ticker-Region' is selected from "Definition" section drop down
      ThiefHelpers.verifySelectedDropDownText('Ticker-Region', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verify that the "Ticker-Region" is seen at the top of the "Selected" section', function() {
      expect(TileOptionsColumns.getIndexFromSelected('Ticker-Region')).toEqual(0);
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "New Column Test" report is calculated', function() {
      // Verifying "New Column Test" Report is calculated
      PA3MainPage.isReportCalculated('New Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "New Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Ticker Region" is present in the calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('New Column Test').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === 'Ticker-Region') {
            colIndex2 = index;
            if (colIndex2 !== colIndex1) {
              expect(false).customError('"Ticker" column is not changed to "Ticker-Region".' + ' Expected:  "Ticker Region" but Found: "' + name + '".');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var columnCellValue = [];
    it('Should get all cell values if "Ticker-Region" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('New Column Test', 'Ticker-Region').then(function(cellValues) {
        cellValues.forEach(function(value) {
          columnCellValue.push(value);
        });
      });
    });

    var i;
    var needScreenShot = 0;
    it('Verifying that "Tickers" are displayed as "Ticker Region" ', function() {
      for (i = 0; i < 30; i++) {
        if (columnCellValue[i] !== '') {
          if (!/^[@NAA-Z0-9-.]*$/.test(columnCellValue[i])) {
            expect(false).customError('"Tickers" are not displayed as "Ticker Region". ' +
              'Found "' + columnCellValue[i] + '" in' + i + ' row');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });
  });

  describe('Test Step ID: 509040', function() {

    it('Should right click on "Ticker-Region" in "New Column Test" report and select "Columns > Add Column..." ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('New Column Test').each(function(element) {
        Utilities.scrollElementToVisibility(element);
        element.getText().then(function(text) {
          var name = text.replace(/\n/g, ' ');
          if (name === 'Ticker-Region') {
            PA3MainPage.rightClickAndSelectOption(element, 'Columns|Add Column…');
          }
        });
      });
    });

    it('Verifying if view changed to "Tile Options - New Column Test" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared.' + ' Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test"', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that drop down that reads "Ticker-Region" is present in "Definition" Section', function() {
      ThiefHelpers.verifySelectedDropDownText('Ticker-Region', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should select "ISIN" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('ISIN', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'ISIN' is selected from "Definition" section drop down
      ThiefHelpers.verifySelectedDropDownText('ISIN', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verify that the "ISIN" is seen at the top of the "Selected" section', function() {
      expect(TileOptionsColumns.getIndexFromSelected('ISIN')).toEqual(0);
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "New Column Test" report is calculated', function() {
      // Verifying "New Column Test" Report is calculated
      PA3MainPage.isReportCalculated('New Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "New Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Ticker-Region" changes to "ISIN" is present', function() {
      var colIndex;
      PA3MainPage.getAllColumnOfCalculatedReport('New Column Test').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === 'ISIN') {
            colIndex = index;
            if (colIndex !== colIndex2) {
              expect(false).customError('"Ticker-Region" is not changed to "ISIN".' + ' Expected:  "ISIN" but Found: "' + name + '".');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var columnCellValue = [];
    it('Should get all cell values if "ISIN" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('New Column Test', 'ISIN').then(function(cellValues) {
        cellValues.forEach(function(value) {
          columnCellValue.push(value);
        });
      });
    });

    var i;
    var needScreenShot = 0;
    it('Verifying that "Ticker Region" are displayed as "ISIN" ', function() {
      for (i = 0; i < 30; i++) {
        if (columnCellValue[i] !== '') {
          if (!/^[@NAA-Z0-9]*$/.test(columnCellValue[i])) {
            expect(false).customError('"Tickers" are not displayed as "ISIN". ' +
              'Found "' + columnCellValue[i] + '" in' + i + ' row.');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });

  });

  describe('Test Step ID: 509043', function() {
    //Known Issue : RPD:22033117  'Cusip-Custom' option is missing in definitions drop down for ISIN Column
  });

  describe('Test Step ID: 509041', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - New Column Test" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared. ' + 'Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Security Name" from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Security Name').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that drop down that reads "Security Name" is present in "Definition" Section', function() {
      ThiefHelpers.verifySelectedDropDownText('Security Name', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should select "Ticker" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Ticker', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'Ticker' is selected from "Definition" section dropdown
      ThiefHelpers.verifySelectedDropDownText('Ticker', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verify that the "Ticker" is seen at the top of the "Selected" section', function() {
      expect(TileOptionsColumns.getIndexFromSelected('Ticker')).toEqual(1);
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "New Column Test" report is calculated', function() {
      // Verifying "New Column Test" Report is calculated
      PA3MainPage.isReportCalculated('New Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "New Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columnCellValue = [];
    it('Should get all cell values if "ISIN" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('New Column Test', 'ISIN').then(function(cellValues) {
        cellValues.forEach(function(value) {
          columnCellValue.push(value);
        });
      });
    });

    var i;
    var needScreenShot = 0;
    it('Verifying that "Security names" are displayed as "Tickers" ', function() {
      for (i = 0; i < 30; i++) {
        if (columnCellValue[i] !== '') {
          if (!/^[!@NAA-Z0-9]*$/.test(columnCellValue[i])) {
            expect(false).customError('"Tickers" are not displayed as "Security names". ' +
              'Found "' + columnCellValue[i] + '" in' + i + ' row.');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });

  });

  describe('Test Step ID: 509042', function() {

    it('Should click on the "Wrench" icon in the "New Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('New Column Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
    it('Verifying if view changed to "Tile Options - New Column Test" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - New Column Test') {
          expect(false).customError('"Tile Options - New Column Test" view has not appeared.' + ' Expected: "Tile Options - New Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - New Column Test"', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Ticker" from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ticker').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that drop down that reads "Ticker" is present in "Definition" Section', function() {
      ThiefHelpers.verifySelectedDropDownText('Ticker', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should select "Symbol" from "Definition" Section drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Symbol', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // verifying if 'Symbol' is selected from "Definition" section dropdown
      ThiefHelpers.verifySelectedDropDownText('Symbol', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verify that the "Symbol" is seen at the top of the "Selected" section', function() {
      expect(TileOptionsColumns.getIndexFromSelected('Symbol')).toEqual(1);
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "New Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "New Column Test" report is calculated', function() {
      // Verifying "New Column Test" Report is calculated
      PA3MainPage.isReportCalculated('New Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "New Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('New Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columnCellValue = [];
    it('Should get all cell values if "ISIN" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('New Column Test', 'ISIN').then(function(cellValues) {
        cellValues.forEach(function(value) {
          columnCellValue.push(value);
        });
      });
    });

    var i;
    var needScreenShot = 0;
    it('Verifying that "Tickers" are displayed as "Symbols" ', function() {
      for (i = 0; i < 30; i++) {
        if (columnCellValue[i] !== '') {
          if (!/^[@NAA-Z0-9]*$/.test(columnCellValue[i])) {
            expect(false).customError('"Tickers" are not displayed as "Symbols". ' +
              'Found "' + columnCellValue[i] + '" in' + i + ' row.');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });

  });

  describe('Test Step ID: 509092', function() {

    it('Should click on "Reference Column Test" in the LHP', function() {
      PA3MainPage.getReports('Reference Column Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Reference Column Test" reports to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "Reference Column Test" report is calculated', function() {
      // Verifying "Reference Column Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Reference Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Economic Sector" hyperlink in the report', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Reference Column Test').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Reference Column Test').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Reference Column Test" view', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Reference Column Test" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Ticker" from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Ticker').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "Show Column" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').check();
    });

    it('Verifying if the "Show Column" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Column').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Show Column" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that drop down that reads "Ticker" is present in "Definition" Section', function() {
      ThiefHelpers.verifySelectedDropDownText('Ticker', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should select "New..." from "Definition" Section drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('New...', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verifying that "Columns" dialog appeared', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathNewReference).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 509093', function() {

    it('Select the "New" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter formula into the section, select the option from type ahead and verify the text in the section
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', true, 'P_PRICE(NOW)', 'clickOutside', 'P_PRICE(#ED,#CU)');

    it('Select "Personal" under "Directory"', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verifying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "((Demo +!! &*))" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "((Demo +!! &*))" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('((Demo +!! &*))').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "((Demo +!! &*))" is typed into the "Name" field
      CreateEditCustomColumns.getNameField().getAttribute('value').then(function(name) {
        if (name !== '((Demo +!! &*))') {
          expect(false).customError();
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      CreateEditCustomColumns.isDialogPresent().then(function(open) {
        if (open) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // As per known issue(RPD:34752689) "((Demo +!! &*))" is not seen in the selected section.
    it('Verifying that the "((Demo +!! &*))" is seen at the top of the "Selected" section', function() {
      TileOptionsColumns.getIndexFromSelected('((Demo +!! &*))').then(function(index) {
        /*if (index !== 0) {
         expect(false).customError('"((Demo +!! &*))" is seen at the top of the "Selected" section.');
         CommonFunctions.takeScreenShot();
         }*/

        // Verifying if "((Demo +!! &*))" is present in selected section step should fail.
        if (index) {
          expect(false).customError('"((Demo +!! &*))" is seen in the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        // Verifying if "((Demo +!! &*))" is not present in selected section.
        if (err.indexOf('"((Demo +!! &*))" is not found in the "Selected" list.') !== -1) {
          expect(false).customError('"((Demo +!! &*))" is found in the "Selected" list.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Formula" section is grayed out and cannot be editable', function() {
      expect(TileOptionsColumns.getFormulaSection().getAttribute('class')).toContain('disabled');
    });
  });

  describe('Test Step ID: 509094', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "Reference Column Test" report is calculated', function() {
      // Verifying "Reference Column Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Reference Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand all the elements from calculated report', function() {
      // Get the reference of first element from calculated report
      var firstElement = PA3MainPage.getAllElementsFromCalculatedReport('Reference Column Test', 'grid-canvas grid-canvas-bottom grid-canvas-left').get(2);

      browser.sleep(3000);

      // Right click on the element and select "Expand|All"
      PA3MainPage.rightClickAndSelectOption(firstElement, 'Expand|All');
    });

    it('Verifying if "((Demo +!! &*))" column is present', function() {
      var colIndex;
      PA3MainPage.getAllColumnOfCalculatedReport('Reference Column Test').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === '((Demo +!! &*))') {
            colIndex = index;
            if (colIndex !== colIndex2) {
              expect(false).customError('"((Demo +!! &*))" column is not present in the calculated report.');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var columnCellValue = [];
    it('Should get all cell values if "((Demo +!! &*))" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Reference Column Test', '((Demo +!! &*))').then(function(cellValues) {
        cellValues.forEach(function(value) {
          columnCellValue.push(value);
        });
      });
    });

    var i;
    var needScreenShot = 0;
    it('Verifying if Price values are displayed under "((Demo +!! &*))" column', function() {
      for (i = 0; i < 30; i++) {
        if (columnCellValue[i] !== '') {
          if (!/^[NA0-9.]*$/.test(columnCellValue[i])) {
            expect(false).customError('Price values are not displayed under "((Demo +!! &*))" column.' +
              'Found "' + columnCellValue[i] + '" in' + i + ' row.');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      }
    });

  });

  describe('Test Step ID: 509095', function() {

    it('Should click on the "Wrench" icon in the "Reference Column Test" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Reference Column Test').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Reference Column Test" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Reference Column Test" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "((Demo +!! &*))" is selected by default from "Selected" section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('((Demo +!! &*))');
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"((Demo +!! &*))" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValueNames = ['Directory', 'Sub-Directory'];

    arrValueNames.forEach(function(valueName) {
      it('Should store the values of "' + valueName + '" under "Formula" section', function() {
        TileOptionsColumns.getFormulaInfo(valueName).getText().then(function(nameValue) {
          oldValueNames.push(nameValue);
        });
      });
    });

    it('Should click on the "edit" icon next to "Formula" Section', function() {
      TileOptionsColumns.getEditOrRemoveFormulaButton('edit').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Columns" dialog appeared', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathNewReference).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a', protractor.Key.DELETE)).perform();

      element(by.xpath(CreateEditCustomColumns.xpathClick)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_DATE(#SD)', undefined, undefined, 'clickOutside');

    it('Type "Date" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Date" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Date').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Date" is typed into the "Name" field
      CreateEditCustomColumns.getNameField().getAttribute('value').then(function(name) {
        if (name !== 'Date') {
          expect(false).customError('Expect "Name" field to contain: "P_Date(#SD)" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Columns" mode is no more displayed', function() {
      expect(CreateEditCustomColumns.isDialogPresent()).toBeFalsy();
    });

    it('Verifying if "Definition" section is updated as "P_Date(#SD)"', function() {
      TileOptionsColumns.getFormulaSectionTextArea().getAttribute('value').then(function(value) {
        if (value !== 'P_DATE(#SD)') {
          expect(false).customError('"Definition" section is not updated as "P_Date(#SD)".' + ' Expected: "P_Date(#SD)" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Formula" section is grayed out and cannot be editable', function() {
      expect(TileOptionsColumns.getFormulaSection().getAttribute('class')).toContain('disabled');
    });

    it('Verifying if Name of the data item changed to "Date"', function() {
      TileOptionsColumns.getFormulaInfo('name').getText().then(function(name) {
        if (name !== 'Date') {
          expect(false).customError('Name of the data item has not changed to "Date". ' + 'Expected: "Date" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrNamesOfDir = ['Directory', 'Sub-Directory'];

    arrNamesOfDir.forEach(function(valueName, index) {
      it('Verifying if value of "' + valueName + '" under "Formula" section has not changed', function() {
        TileOptionsColumns.getFormulaInfo(valueName).getText().then(function(name) {
          if (name !== oldValueNames[index]) {
            expect(false).customError('The values of "' + valueName + '" under "Formula" section has changed.' + 'Expected: "' + oldValueNames[index] + '" but Found: "' + name + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 509096', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Reference Column Test" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "Reference Column Test" report is calculated', function() {
      // Verifying "Reference Column Test" Report is calculated
      PA3MainPage.isReportCalculated('Reference Column Test').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Reference Column Test" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Reference Column Test')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columnCellValue = [];
    it('Should get all cell values if "Dates(Latest Dates)" column for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Reference Column Test', 'Date').then(function(cellValues) {
        cellValues.forEach(function(value) {
          columnCellValue.push(value);
        });
      });
    });

    var i;
    var needScreenShot = 0;
    var date;
    it('Verifying if current date is displayed under "Date" column', function() {
      Utilities.getCurrentDate('MMDDYYYY', '/').then(function(date) {
        for (i = 0; i < 30; i++) {
          if (columnCellValue[i] !== '') {
            if (date !== (columnCellValue[i].trim())) {
              expect(false).customError('The "Dates" column not displaying today\'s date. ' +
                '' + 'Expected: "' + date + '" Found: "' + columnCellValue[i].trim() + '"');
              ++needScreenShot;
              if (needScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          }
        }
      });

    });
  });

  describe('Test Step ID: 509099', function() {

    it('Click on "Economic Sector" hyperlink in the report', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Reference Column Test').getText().then(function(text) {
        if (text.indexOf('Economic Sector') > -1) {
          // Click on the "Economic Sector" Hyperlink
          PA3MainPage.getGroupingsHyperLink('Reference Column Test').click().then(function() {
          }, function(err) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Verifying if view changed to "Tile Options - Reference Column Test" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Reference Column Test') {
          expect(false).customError('"Tile Options - Reference Column Test" view has not appeared. ' + 'Expected: "Tile Options - Reference Column Test" but Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP in "Tile Options - Reference Column Test" view', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Security Name" from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Security Name').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Definition" in "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" is not expanded in "Options" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that drop down that reads "Security Name" is present in "Definition" Section', function() {
      ThiefHelpers.verifySelectedDropDownText('Security Name', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Should select "New..." from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('New...', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verifying that "Columns" dialog appeared', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathNewReference).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Columns" dialog has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 509102', function() {

    it('Select the "New" radio button', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter the formula, select the option from type ahead and verify the text entered
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_MKT_VALUE', true, 'FG_MKT_VALUE', 'X Close', 'FG_MKT_VALUE(#CU)');

    it('Select "Personal" under "Directory"', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Market Value" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Market Value" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Market Value').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Market Value" is typed into the "Name" field
      CreateEditCustomColumns.getNameField().getAttribute('value').then(function(name) {
        if (name !== 'Market Value') {
          expect(false).customError('Expected: "Market Value" but Found: "' + name + '" ');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known issue as per RPD:19855827: http://is.factset.com/rpd/summary.aspx?messageid=19855827
    it('Should verify if "Calculation Error" dialog appeared"', function() {
      ThiefHelpers.verifyDialogTitle('Calculation Error');
    });

    it('Should click on "OK" button of "Calculation Error" dialog', function() {
      PA3MainPage.getButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

});
