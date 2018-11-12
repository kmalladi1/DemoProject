'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: col-char-display-bmark', function() {

  describe('Test Step ID: 641197', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/char-display-bmrk"', function() {
      PA3MainPage.switchToDocument('char-display-bmrk');
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Characteristics - Summary" report in LHP to select the report', function() {
      PA3MainPage.getReports('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Characteristics - Summary" is selected in LHP
      PA3MainPage.getReports('Characteristics - Summary').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Characteristics - Summary" report did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var multiheader = ['Large Cap Core Test', 'Russell 1000'];

    multiheader.forEach(function(value) {

      it('Verifying if "Data" is listed under "' + value + '" multiheader', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Characteristics - Summary', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Characteristics - Summary').then(function(arr) {
            if (arr[range[0]] !== 'Data') {
              expect(false).customError('"Data" did not present under' + ' "' + value + '" multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if "Available" is listed under "' + value + '" multiheader', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Characteristics - Summary', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Characteristics - Summary').then(function(arr) {
            if (arr[range[1]] !== 'Available') {
              expect(false).customError('"Available" did not present under' + ' "' + value + '" multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if "Available" column value is between 0 to 100 for "' + value + '"', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', value).then(function(arr) {
          arr.forEach(function(text, index) {
            if (arr[index] !== '' || arr[index] !== null) {
              expect(Number(arr[index])).toBeInBetween(0.00, 100.00);
            }
          });
        });
      });

      it('Verifying if "Available" column value is empty for expected column in "' + value + '" multiheader', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', value).then(function(arr) {
          SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', '', '').then(function(firstColumnValue) {
            firstColumnValue.forEach(function(text, index) {
              if (text === 'Weighted Average' || text === 'Median' || text === 'Weighted Median' || text === 'Weighted Harmonic Average') {
                expect(arr[index] === '').customError('"Available" column value did not empty for' + ' expected row in "' + value + '" multiheader; Found :' + arr[index]);
                if (arr[index] !== '') {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 641198', function() {

    it('Should right click on "Available" column from "Large Cap Core Test" multiheader and select "Column> Add Column..."', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Characteristics - Summary');
      SlickGridFunctions.getColumnIDValue('Characteristics - Summary', 'Available', 'Large Cap Core Test').then(function(id) {
        PA3MainPage.rightClickAndSelectOption(eleRefs.get(id - 1), 'Columns|Add Column…');
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Characteristics Display" drop down to open', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).open();
    });

    var dropDownOption = ['None', '# of Sec (%)', '# Available', 'Mkt Val (%)'];

    dropDownOption.forEach(function(option) {

      it('Verifying if "' + option + '" is presented in the drop down', function() {
        TileOptionsColumns.getDropDownOption(option).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + option + '" did not present in the drop down');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "# of Sec (%)" highlighted by default in the drop down', function() {
      TileOptionsColumns.getDropDownOption('# of Sec (%)').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"# of Sec (%)" did not highlight in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is presented and checkrd', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not present and check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 641199', function() {

    it('Should  select "# Available" from open drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).selectItemByText('# Available');

      // Verifying if drop down is set to "# Available"
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== '# Available') {
          expect(false).customError('Drop down did not set to "# Available"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Characteristics - Summary" report is calculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics - Summary').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Should wait until "Calculation" icon disappear', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 200000);
    });

    it('Verifying that "Characteristics - Summary" report is calculated', function() {
      // Verifying "Characteristics - Summary" Report is calculated
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Characteristics - Summary" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
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

      // Wait for the elements to load
      browser.sleep(3000);
    });

    var multiheader = ['Large Cap Core Test', 'Russell 1000'];

    multiheader.forEach(function(value) {

      it('Verifying if "Available" column value is in decimal for"' + value + '" multiheader', function() {
        // Wait until report get load
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', value).then(function(arr) {
          arr.forEach(function(text, index) {
            if (arr[index] === '' || arr[index] === null || arr[index] === undefined) {
              expect(true).customError('');
            } else {
              var temp = arr[index].toString();
              if (temp.indexOf('.') < 0) {
                expect(false).customError('"Available" column value is not in decimal ' + 'for "' + value + '" multiheader; Found: ' + temp);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });

        // wait for the web element to load
        browser.sleep(3000);
      });

      it('Verifying if "Available" column value is not in decimal place for "# of Securities" row in "' + value + '"' + ' multiheader', function() {
        SlickGridFunctions.getCellReference('Characteristics - Summary', '# of Securities', '', 'Available', value).then(function(ref) {
          ref.getText().then(function(text) {
            if (text.indexOf('.') >= 0) {
              expect(false).customError('Value is in decimal place for "# of Securities" row in Available column;' + ' Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if "Available" column value is empty for expected column in "' + value + '" multiheader', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', value).then(function(arr) {
          SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', '', '').then(function(firstColumnValue) {
            firstColumnValue.forEach(function(text, index) {
              if (text === 'Weighted Average' || text === 'Median' || text === 'Weighted Median' || text === 'Weighted Harmonic Average') {
                expect(arr[index] === '').customError('"Available" column value did not empty for' + ' expected row in "' + value + '" multiheader; Found :' + arr[index]);
                if (arr[index] !== '') {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 641200', function() {

    it('Should click on the "Wrench" icon in the "Characteristics - Summary" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click().then(function() {
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    it('Verifying if "Characteristics Display" drop down is set to "# Available" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== '# Available') {
          expect(false).customError('Drop down did not set to "# Available" by default; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should  select "Mkt Val (%)" from open drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).selectItemByText('Mkt Val (%)');

      // Verifying if drop down is set to "Mkt Val (%)"
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== 'Mkt Val (%)') {
          expect(false).customError('Drop down did not set to "Mkt Val (%)"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Characteristics - Summary" report is calculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics - Summary').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    var multiheaderName = ['Large Cap Core Test', 'Russell 1000'];

    multiheaderName.forEach(function(value) {

      it('Verifying if "Available" column value is between 0 to 100 for "' + value + '"', function() {
        // Wait until report get load
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', value).then(function(columnValue) {
          columnValue.forEach(function(text) {
            if (text !== '' || text !== null) {
              expect(Number(text)).toBeInBetween(0.00, 100.00);
            }
          });
        });
      });

      it('Verifying if "Available" column value is empty for expected column in "' + value + '" multiheader', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', value).then(function(arr) {
          SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', '', '').then(function(firstColumnValue) {
            firstColumnValue.forEach(function(text, index) {
              if (text === 'Weighted Average' || text === 'Median' || text === 'Weighted Median' || text === 'Weighted Harmonic Average') {
                expect(arr[index] === '').customError('"Available" column value did not empty for' + ' expected row in "' + value + '" multiheader; Found :' + arr[index]);
              }
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 641201', function() {

    it('Should click on "Excluded: Finance" hyperlink from the "Characteristics - Summary" report', function() {
      PA3MainPage.getExclusionsHyperLink('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Edit Exclusions" hyperlink in Exclusions Info Box to open Exclusions tab in the Options dialog', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    it('Verifying if "Characteristics Display" drop down is set to "Mkt Val (%)" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== 'Mkt Val (%)') {
          expect(false).customError('Drop down did not set to "Mkt Val (%)" by default; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should  select "None" from open drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).selectItemByText('None');

      // Verifying if drop down is set to "None"
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== 'None') {
          expect(false).customError('Drop down did not set to "None"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Characteristics - Summary" reports to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "Characteristics - Summary" report is calculated', function() {
      // Verifying "Characteristics - Summary" Report is calculated
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Characteristics - Summary" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
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

    var multiheader = ['Large Cap Core Test', 'Russell 1000'];

    multiheader.forEach(function(value) {

      it('Verifying if "Data" is listed under "' + value + '" multiheader', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Characteristics - Summary', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Characteristics - Summary').then(function(arr) {
            if (arr[range[0]] !== 'Data') {
              expect(false).customError('"Data" did not present under' + ' "' + value + '" multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if only one column is display for "' + value + '" multiheader', function() {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Characteristics - Summary', value).then(function(range) {
          if (range.length !== 1) {
            expect(false).customError('Only one column di not present for "' + value + '" multiheader;' + ' Found: ' + range.length);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 641202', function() {

    it('Should right click on "Data" column from "Russell 1000" multiheader and select "Column> Add Column..."', function() {
      var eleRefs = PA3MainPage.getAllColumnOfCalculatedReport('Characteristics - Summary');
      SlickGridFunctions.getColumnIDValue('Characteristics - Summary', 'Data', 'Russell 1000').then(function(id) {
        PA3MainPage.rightClickAndSelectOption(eleRefs.get(id - 1), 'Columns|Add Column…');
      });
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Columns" is selected in LHP', function() {
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.sleep(2000);
    });

    it('Verifying if "Characteristics Display" drop down is set to "None" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== 'None') {
          expect(false).customError('Drop down did not set to "None" by default; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should  select "# of Sec (%)" from open drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).selectItemByText('# of Sec (%)');

      // Verifying if drop down is set to "# of Sec (%)"
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== '# of Sec (%)') {
          expect(false).customError('Drop down did not set to "# of Sec (%)"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Include Benchmark Columns" check box to uncheck', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').uncheck();

      // Verifying if "Include Benchmark Columns" check box is  uncheckrd
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not  uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Characteristics - Summary" reports to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying that "Characteristics - Summary" report is calculated', function() {
      // Verifying "Characteristics - Summary" Report is calculated
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Characteristics - Summary" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics - Summary')).toBeTruthy();
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

    it('Verifying if "Russell 1000" multiheader is not presented in report', function() {
      SlickGridFunctions.getMultiHeaderNames('Characteristics - Summary').then(function(arr) {
        if (arr.indexOf('Russell 1000') >= 0) {
          expect(false).customError('"Russell 1000" multiheader presented in report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if only one multiheader is presented in report', function() {
      SlickGridFunctions.getMultiHeaderNames('Characteristics - Summary').then(function(arr) {
        if (arr.length !== 1) {
          expect(false).customError('Only one multiheader did not present in report; Found: ' + arr.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Available" column value is between 0 to 100 for "Large Cap Core Test"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', 'Large Cap Core Test').then(function(arr) {
        arr.forEach(function(text) {
          if (text !== '' || text !== null) {
            expect(Number(text)).toBeInBetween(0.00, 100.00);
          }
        });
      });
    });

    it('Verifying if "Available" column value is empty for expected column in "Large Cap Core Test" multiheader', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', 'Available', 'Large Cap Core Test').then(function(arr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics - Summary', '', '').then(function(firstColumnValue) {
          firstColumnValue.forEach(function(text, index) {
            if (text === 'Weighted Average' || text === 'Median' || text === 'Weighted Median' || text === 'Weighted Harmonic Average') {
              expect(arr[index] === '').customError('"Available" column value did not empty for' + ' expected row in "Large Cap Core Test" multiheader; Found :' + arr[index]);
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 641203', function() {

    it('Should click on "Performance" report in LHP to select the report', function() {
      PA3MainPage.getReports('Performance').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Performance" is selected in LHP
      PA3MainPage.getReports('Performance').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Performance" report did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Performance" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Performance').click().then(function() {
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Characteristics Display" drop down is disabled', function() {
      TileOptionsColumns.getCharacteristicsDisplayDropDown().getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('Characteristics Display drop down did not disable; Found' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is checkrd', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not present and check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is enabled', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isDisabled().then(function(flag) {
        if (flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not enable');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 641207', function() {

    it('Should click on "Cancel" button from the header', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Top/Bottom 5 Contributors" report in LHP to select the report', function() {
      PA3MainPage.getReports('Top/Bottom 5 Contributors').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Top/Bottom 5 Contributors" is selected in LHP
      PA3MainPage.getReports('Top/Bottom 5 Contributors').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Top/Bottom 5 Contributors" report did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Top/Bottom 5 Contributors" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Top/Bottom 5 Contributors').click().then(function() {
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Characteristics Display" drop down is disabled', function() {
      TileOptionsColumns.getCharacteristicsDisplayDropDown().getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') < 0) {
          expect(false).customError('Characteristics Display drop down did not disable; Found' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is checkrd', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not present and check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is disabled', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isDisabled().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not disable');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 641204', function() {

    it('Should click on "Cancel" button from the header', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Characteristics - Summary" report in LHP to select the report', function() {
      PA3MainPage.getReports('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Characteristics - Summary" is selected in LHP
      PA3MainPage.getReports('Characteristics - Summary').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Characteristics - Summary" report did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" icon in the "Characteristics - Summary" report ', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click().then(function() {
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

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if drop down is set to "# of Sec (%)"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Characteristics Display', TileOptionsColumns.xpathCharactersticsDisplayDropDown).getSelectedText().then(function(text) {
        if (text !== '# of Sec (%)') {
          expect(false).customError('Drop down did not set to "# of Sec (%)"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Characteristics Display" drop down is enabled', function() {
      TileOptionsColumns.getCharacteristicsDisplayDropDown().getAttribute('class').then(function(text) {
        if (text.indexOf('disabled') >= 0) {
          expect(false).customError('Characteristics Display drop down did not enable; Found' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Include Benchmark Columns" check box is enabled', function() {
      ThiefHelpers.getCheckBoxClassReference('Include Benchmark Columns').isDisabled().then(function(flag) {
        if (flag) {
          expect(false).customError('"Include Benchmark Columns" check box did not enable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cancel" button from the header', function() {
      TileOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });
});
