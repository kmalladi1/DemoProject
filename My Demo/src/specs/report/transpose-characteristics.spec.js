'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: transpose-characteristics', function() {

  var multiheaderDates = [];
  var datesGroup = [];
  var multiHeaderDates1 = [];
  var multiHeaderDates2 = [];

  // Pass level number according to the requirement
  var getGroupValues = function(groupingName, level) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var parentID;
    var portfoliosArr = [];
    var groupFound = false;
    browser.driver.executeScript(function() {
      var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
      return slickObject.grid.getData().getItems();
    }).then(function(dataView) {
      if (dataView.length === 0) {
        CommonFunctions.takeScreenShot();
        defer.reject('Grid is Empty');
      } else {
        if (level === undefined) {
          dataView.forEach(function(rowRef) {
            if (rowRef[0] === groupingName && rowRef.hasChildren === true) {
              groupFound = true;
              parentID = rowRef.id;
              dataView.forEach(function(element) {
                if (parentID === element.parentId) {
                  portfoliosArr.push(element[0]);
                }
              });
            }
          });

        } else if (level === 3) {
          dataView.forEach(function(rowRef) {
            if (rowRef[0] === groupingName && rowRef.hasChildren === true) {
              dataView.forEach(function(element) {
                if (element[0] === groupingName && rowRef.hasChildren === true) {
                  groupFound = true;
                  parentID = rowRef.id;
                  dataView.forEach(function(elements) {
                    if (parentID === elements.parentId) {
                      portfoliosArr.push(elements[0]);
                    }
                  });
                }
              });
            }
          });
        } else if (level === 4) {
          dataView.forEach(function(rowRef) {
            if (rowRef[0] === groupingName && rowRef.hasChildren === true) {
              dataView.forEach(function(element) {
                if (element[0] === groupingName && rowRef.hasChildren === true) {
                  dataView.forEach(function(elements) {
                    if (elements[0] === groupingName && rowRef.hasChildren === true) {
                      groupFound = true;
                      parentID = rowRef.id;
                      dataView.forEach(function(elementName) {
                        if (parentID === elementName.parentId) {
                          portfoliosArr.push(elementName[0]);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }

        if (!groupFound) {
          CommonFunctions.takeScreenShot();
          defer.reject(groupingName + ' grouping is not displayed');
        } else {
          defer.fulfill(portfoliosArr);
        }
      }
    });
    return promise;

  };

  describe('Test Step ID: 559661', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/Transpose_Characteristics', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('transpose-characteristics');
    });

    it('Waiting for "Characteristics" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Characteristics" report appeared without any errors', function() {
      // Verifying that the "Weights" reports calculated
      PA3MainPage.isReportCalculated('Characteristics').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Characteristics" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Characteristics')).toBeTruthy();
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

    it('Verifying if "Characteristics" report is calculated', function() {
      PA3MainPage.isReportCalculated('Characteristics').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Portfolio widget is populated with "SPN:SP50"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathPortfolioWidget).getText().then(function(val) {
        if (val !== 'SPN:SP50') {
          expect(false).customError('Portfolio widget is not populated with "SPN:SP50"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Benchmark widget is populated with "RUSSELL:1000"', function() {
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).getText().then(function(val) {
        if (val !== 'RUSSELL:1000') {
          expect(false).customError('Benchmark widget is not populated with "RUSSELL:1000"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 559662', function() {

    it('Should click on the "Wrench" button from the "Characteristics" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics');

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

    it('Should Wait for "Characteristics" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should copy all first level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics', 1, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          multiheaderDates.push(text);
        });
      });
    });

    it('Should copy all second level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics', 2, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          multiHeaderDates1.push(text);
        });
      });
    });

    it('Verifying if first level copied values are not empty', function() {
      if (multiheaderDates.length === 0) {
        expect(false).customError('Values did not copy in array; found:' + multiheaderDates);
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if second level copied values are not empty', function() {
      if (multiHeaderDates1.length === 0) {
        expect(false).customError('Values did not copy in array; found:' + multiHeaderDates1);
        CommonFunctions.takeScreenShot();
      }
    });

    var portfolioArr = ['6/17/2014', '6/18/2014'];
    it('Verifying if Dates listed in the expanded groups', function() {
      multiheaderDates.forEach(function(headers) {
        getGroupValues(headers).then(function(portfolios) {
          if (portfolios.length === portfolioArr.length) {
            portfolioArr.forEach(function(portfolio) {
              if (portfolios.indexOf(portfolio) === -1) {
                expect(false).customError(portfolio + ' Dates are not displayed under ' + headers);
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    var portfolioArr1 = ['Weighted Average', 'Median', 'Weighted Median', 'Available', 'Weighted Harmonic Average'];
    it('Verifying if Options listed in the expanded Dates grouping', function() {
      multiHeaderDates1.forEach(function(headers) {
        getGroupValues(headers, 3).then(function(portfolios) {
          portfolioArr1.forEach(function(portfolio) {
            if (portfolios.indexOf(portfolio) === -1) {
              expect(false).customError(portfolio + ' Options are not displayed under ' + headers);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    var columnNames = ['S&P 500', 'Russell 1000'];

    columnNames.forEach(function(column) {
      it('Verifying if "' + column + '" values are not empty', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics', column).then(function(arr) {
          if (arr.length === 0) {
            expect(false).customError('"' + column + '" values are empty');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 559663', function() {

    it('Should click on the "Wrench" button from the "Characteristics" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics');

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

    it('Should click on "Columns" checkbox from Transpose menu drop down to check off', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).check();

      // Verifying if "Columns" is checked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" checkbox did not check off');
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

    it('Should Wait for "Characteristics" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    var roNames = ['6/17/2014', '6/18/2014'];
    it('Verifying if "Dates" is displayed in the left most column', function() {
      SlickGridFunctions.getColumnNames('Characteristics').then(function(arr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics', arr[0], '').then(function(rowNamesArr) {
          rowNamesArr.forEach(function(rowName) {
            if (roNames.indexOf(rowName) === -1) {
              expect(false).customError('Dates "' + roNames + '" did not display in the left most column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if groupings are displayed as multiheader', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Characteristics', 2).then(function(arrMultiheader) {
        multiheaderDates.forEach(function(multiheader) {
          if (arrMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"Groupings" did not display as multiheader');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 559664', function() {

    it('Should click on the "Wrench" button from the "Characteristics" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics');

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

    it('Verifying if "Columns" already checked', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" checkbox did not check off');
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

    it('Should Wait for "Characteristics" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    var roNames = ['S&P 500', 'Russell 1000'];
    it('Verifying if "Portfolio" is displayed in the left most column', function() {
      SlickGridFunctions.getColumnNames('Characteristics').then(function(arr) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Characteristics', arr[0], '').then(function(rowNamesArr) {
          rowNamesArr.forEach(function(rowName) {
            if (roNames.indexOf(rowName) === -1) {
              expect(false).customError('Portfolio "' + roNames + '" did not display in the left most column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if groupings are displayed as multiheader', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Characteristics', 2).then(function(arrMultiheader) {
        multiheaderDates.forEach(function(multiheader) {
          if (arrMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"Groupings" did not display as multiheader');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 559665', function() {

    it('Should click on the "Wrench" button from the "Characteristics" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics');

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

    it('Verifying if "Columns" already checked', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Portfolios" already checked', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Portfolios" checkbox did not check off');
          CommonFunctions.takeScreenShot();
        }
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

    it('Should Wait for "Characteristics" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should copy all first level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics', 1, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          datesGroup.push(text);
        });
      });
    });

    it('Verifying if first level copied values are not empty', function() {
      if (datesGroup.length === 0) {
        expect(false).customError('Values did not copy in array; found:' + datesGroup);
        CommonFunctions.takeScreenShot();
      }
    });

    var portfolioArr = ['S&P 500', 'Russell 1000'];
    it('Verifying if Portfolios listed in the expanded Dates grouping', function() {
      datesGroup.forEach(function(headers) {
        getGroupValues(headers).then(function(portfolios) {
          if (portfolios.length === portfolioArr.length) {
            portfolioArr.forEach(function(portfolio) {
              if (portfolios.indexOf(portfolio) === -1) {
                expect(false).customError(portfolio + ' portfolio is not displayed under ' + headers);
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    it('Verifying if groupings are displayed as multiheader', function() {
      PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Characteristics', 1).then(function(arrMultiheader) {
        multiheaderDates.forEach(function(multiheader) {
          if (arrMultiheader.indexOf(multiheader) < 0) {
            expect(false).customError('"Groupings" did not display as multiheader');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 559666', function() {

    it('Should click on the "Wrench" button from the "Characteristics" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics');

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

    it('Should click on "Columns" checkbox from Transpose menu drop down to uncheck', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Columns');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).uncheck();

      // Verifying if "Columns" is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (flag) {
          expect(false).customError('"Columns" checkbox did not uncheck');
          CommonFunctions.takeScreenShot();
        }
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

    it('Verifying if "Portfolios" already checked', function() {
      var porfoliosXpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, 'Portfolios');
      ThiefHelpers.getCheckBoxClassReference(undefined, porfoliosXpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Portfolios" checkbox did not check off');
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

    it('Should Wait for "Characteristics" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should copy all third level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics', 3, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          multiHeaderDates2.push(text);
        });
      });
    });

    it('Verifying if third level copied values are not empty', function() {
      if (multiHeaderDates2.length === 0) {
        expect(false).customError('Values did not copy in array; found:' + multiHeaderDates2);
        CommonFunctions.takeScreenShot();
      }
    });

    var portfolioArr = ['6/17/2014', '6/18/2014'];
    it('Verifying if Dates listed in the expanded groups', function() {
      multiheaderDates.forEach(function(headers) {
        getGroupValues(headers).then(function(portfolios) {
          if (portfolios.length === portfolioArr.length) {
            portfolioArr.forEach(function(portfolio) {
              if (portfolios.indexOf(portfolio) === -1) {
                expect(false).customError(portfolio + ' Dates are not displayed under ' + headers);
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });

    var portfolioArr1 = ['S&P 500', 'Russell 1000'];
    it('Verifying if Portfolios listed in the expanded Dates grouping', function() {
      multiHeaderDates1.forEach(function(headers) {
        getGroupValues(headers, 3).then(function(portfolios) {
          portfolioArr1.forEach(function(portfolio) {
            if (portfolios.indexOf(portfolio) === -1) {
              expect(false).customError(portfolio + ' portfolios are not displayed under ' + headers);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    var portfolioArr2 = ['Weighted Average', 'Median', 'Weighted Median', 'Available', 'Weighted Harmonic Average'];
    it('Verifying if options listed in the expanded Portfolio grouping', function() {
      multiHeaderDates2.forEach(function(headers) {
        getGroupValues(headers, 4).then(function(portfolios) {
          portfolioArr2.forEach(function(portfolio) {
            if (portfolios.indexOf(portfolio) === -1) {
              expect(false).customError(portfolio + ' options are not displayed under ' + headers);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
