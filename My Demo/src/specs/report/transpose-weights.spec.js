'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: transpose-weights', function() {

  var multiheaderDates = [];
  var data = [];
  var totalValueForPortWeight = [];
  var totalValueForBenchWeight = [];
  var totalValueForDifference = [];

  describe('Test Step ID: 555791', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/Transpose_Weights', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('transpose-weights');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copy all first level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1);
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          multiheaderDates.push(text);
        });
      });
    });

    it('Should copying "Port. Weigh" column value  for all groups', function() {
      multiheaderDates.forEach(function(row) {
        SlickGridFunctions.getCellReference('Weights', row, '', 'Port. Weight').then(function(ref) {
          ref.getText().then(function(text) {
            totalValueForPortWeight.push(text);
          });
        });
      });
    });

    it('Should copying "Bench. Weigh" column value for "Total" row', function() {
      multiheaderDates.forEach(function(row) {
        SlickGridFunctions.getCellReference('Weights', row, '', 'Bench. Weight').then(function(ref) {
          ref.getText().then(function(text) {
            totalValueForBenchWeight.push(text);
          });
        });
      });
    });

    it('Should copying "Difference" column value for "Total" row', function() {
      multiheaderDates.forEach(function(row) {
        SlickGridFunctions.getCellReference('Weights', row, '', 'Difference').then(function(ref) {
          ref.getText().then(function(text) {
            totalValueForDifference.push(text);
          });
        });
      });
    });

    it('Should expand "Commercial Services > Commercial Printing/Forms" from the report', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Commercial Services').then(function(flag) {
        if (flag) {
          // If "Commercial Services" is already expanded
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Commercial Printing/Forms', 'Commercial Services');
        } else {
          // If "Commercial Services" is not already expanded
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Commercial Printing/Forms');
        }
      });
    });

    it('Verifying if "Commercial Services|Commercial Printing/Forms" is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Commercial Services|Commercial Printing/Forms').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Commercial Services|Commercial Printing/Forms" did not expand');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copying "R.R. Donnelley & Sons Company" row value', function() {
      SlickGridFunctions.getRowData('Weights', 'R.R. Donnelley & Sons Company', '').then(function(arr) {
        arr.forEach(function(text) {
          data.push(text);
        });
      });
    });
  });

  describe('Test Step ID: 555798', function() {

    it('Should click on the "Wrench" button from the "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Dates" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Dates" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Dates" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should expand "6/18/2014 > Commercial Services > Commercial Printing/Forms" from the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', '6/18/2014|Commercial Services|Commercial Printing/Forms', undefined, 'Top');
    });

    it('Verifying if "6/18/2014|Commercial Services|Commercial Printing/Forms" is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '6/18/2014|Commercial Services|Commercial Printing/Forms', 'grid-canvas grid-canvas-top grid-canvas-left').then(function(flag) {
        if (!flag) {
          expect(false).customError('"6/18/2014|Commercial Services|Commercial Printing/Forms" did not expand');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "R.R. Donnelley & Sons Company" row values are same as previous copied value', function() {
      SlickGridFunctions.getRowData('Weights', 'R.R. Donnelley & Sons Company', '').then(function(arr) {
        arr.forEach(function(text, index) {
          if (text !== data[index]) {
            expect(false).customError('"R.R. Donnelley & Sons Company" row values did not same as previous copied value');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 555799', function() {

    it('Should click on the "Wrench" button from the "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Dates" already checked', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Dates" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Groups" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Groups');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Groups" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Groups" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Weights" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is calculated', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var roNames = ['6/18/2014'];
    it('Verifying if "Dates" is displayed in the left most column', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(arr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', arr[0], '').then(function(rowNamesArr) {
          rowNamesArr.forEach(function(rowName) {
            if (roNames.indexOf(rowName) === -1) {
              expect(false).customError('Dates "' + roNames + '" did not display in the left most column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "groupings" are present as multiheader', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Weights', 1).then(function(arrMultiheader) {
        multiheaderDates.forEach(function(multiheader) {
          if (arrMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"Groupings" did not display as multiheader');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Column" is displayed under multiheader grouped', function() {
      multiheaderDates.forEach(function(value) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Weights').then(function(arr) {

            // Verifying "Port. Weight" column is present in grouped multiheader
            if (arr[range[0]] !== 'Port. Weight') {
              expect(false).customError('"Port. Weight" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }

            // Verifying "Bench. Weight" column is present in grouped multiheader
            if (arr[range[1]] !== 'Bench. Weight') {
              expect(false).customError('"Bench. Weight" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }

            // Verifying "Difference" column is present in grouped multiheader
            if (arr[range[2]] !== 'Difference') {
              expect(false).customError('"Difference" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Port. Weight" column value is same in "6/18/2014" for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '6/18/2014', '', 'Port. Weight', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForPortWeight[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Bench. Weight" column value is same in "6/18/2014" for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '6/18/2014', '', 'Bench. Weight', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForBenchWeight[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Difference" column value is same in "6/18/2014" for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '6/18/2014', '', 'Difference', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForDifference[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555801', function() {

    it('Should click on the "Wrench" button from the "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Dates" checkbox from Transpose menu drop down to uncheck', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).uncheck();

      // Verifying if "Dates" is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Dates" checkbox did not uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groups" checkbox is unchecked', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Groups');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Groups" checkbox did not uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Portfolios" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Portfolios" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Portfolios" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Groups" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Groups');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Groups" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Groups" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "groupings" are present as multiheader', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Weights', 1).then(function(arrMultiheader) {
        multiheaderDates.forEach(function(multiheader) {
          if (arrMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"Groupings" did not display as multiheader');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Column" is displayed under multiheader grouped', function() {
      multiheaderDates.forEach(function(value) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Weights').then(function(arr) {

            // Verifying "Port. Weight" column is present in grouped multiheader
            if (arr[range[0]] !== 'Port. Weight') {
              expect(false).customError('"Port. Weight" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }

            // Verifying "Bench. Weight" column is present in grouped multiheader
            if (arr[range[1]] !== 'Bench. Weight') {
              expect(false).customError('"Bench. Weight" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }

            // Verifying "Difference" column is present in grouped multiheader
            if (arr[range[2]] !== 'Difference') {
              expect(false).customError('"Difference" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Port. Weight" column value is same for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '', '', 'Port. Weight', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForPortWeight[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Bench. Weight" column value is same for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '', '', 'Bench. Weight', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForBenchWeight[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Difference" column value is same for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '', '', 'Difference', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForDifference[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555802', function() {

    it('Should click on the "Wrench" button from the "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Dates" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Dates');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Dates" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Dates" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Weights" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "groupings" are present as multiheader', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Weights', 1).then(function(arrMultiheader) {
        multiheaderDates.forEach(function(multiheader) {
          if (arrMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"Groupings" did not display as multiheader');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Column" is displayed under multiheader grouped', function() {
      multiheaderDates.forEach(function(value) {
        PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', value).then(function(range) {
          SlickGridFunctions.getColumnNames('Weights').then(function(arr) {

            // Verifying "Port. Weight" column is present in grouped multiheader
            if (arr[range[0]] !== 'Port. Weight') {
              expect(false).customError('"Port. Weight" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }

            // Verifying "Bench. Weight" column is present in grouped multiheader
            if (arr[range[1]] !== 'Bench. Weight') {
              expect(false).customError('"Bench. Weight" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }

            // Verifying "Difference" column is present in grouped multiheader
            if (arr[range[2]] !== 'Difference') {
              expect(false).customError('"Difference" column did not present under grouped multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Port. Weight" column value is same in "6/18/2014" for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '6/18/2014', '', 'Port. Weight', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForPortWeight[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Bench. Weight" column value is same in "6/18/2014" for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '6/18/2014', '', 'Bench. Weight', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForBenchWeight[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if "Difference" column value is same in "6/18/2014" for all multiheader', function() {
      multiheaderDates.forEach(function(multiheader, index) {
        SlickGridFunctions.getCellReference('Weights', '6/18/2014', '', 'Difference', multiheader).then(function(ref) {
          ref.getText().then(function(text) {
            if (text !== totalValueForDifference[index]) {
              expect(false).customError('"Port. Weight" column value did not same with copied value');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555803', function() {

    it('Should click on the "Wrench" button from the "Weights" report', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying menu drop down is appeared'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Menu drop down list did not display in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Transpose" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Transpose').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Groups" checkbox from Transpose menu drop down to uncheck', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Groups');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).uncheck();

      // Verifying if "Groups" is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Groups" checkbox did not uncheck');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.getButtonClassReference('Apply').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should Wait for "Weights" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights'), 180000);

      PA3MainPage.getReportCalculationDlg('Weights').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
      PA3MainPage.isReportCalculated('Weights').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Weights" report appeared with errors');
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

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "6/18/2014 > Commercial Services > Commercial Printing/Forms" from the report', function() {
      PA3MainPage.isTreeExpanded('Weights', '6/18/2014|Commercial Services|Commercial Printing/Forms', 'grid-canvas grid-canvas-top grid-canvas-left').then(function(flag) {
        if (!flag) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '6/18/2014|Commercial Services|Commercial Printing/Forms', undefined, 'Top');
        }
      });
    });

    it('Verifying if "6/18/2014|Commercial Services|Commercial Printing/Forms" is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '6/18/2014|Commercial Services|Commercial Printing/Forms', 'grid-canvas grid-canvas-top grid-canvas-left').then(function(flag) {
        if (!flag) {
          expect(false).customError('"6/18/2014|Commercial Services|Commercial Printing/Forms" did not expand');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "R.R. Donnelley & Sons Company" row values are same as previous copied value', function() {
      SlickGridFunctions.getRowData('Weights', 'R.R. Donnelley & Sons Company', '').then(function(arr) {
        arr.forEach(function(text, index) {
          if (text !== data[index]) {
            expect(false).customError('"R.R. Donnelley & Sons Company" row values did not same as previous copied value');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
