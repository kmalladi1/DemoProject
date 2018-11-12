'use strict';
require(__dirname + '/../../index.js');

describe('Test Case: transpose-multiport', function() {

  var secondLevelGroupElement = [];
  var thirdLevelGroupElement = [];

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

  describe('Test Step ID: 684011', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Columns;csteifel_transissuefull_multiport"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('transpose-multiport');
    });

    it('Verifying if the "Characteristics - Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Characteristics - Summary" report is not calculated');
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

      // Verifying if any calculation error appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Characteristics - Summary" report calculated with date "30-NOV-2016"', function() {
      PA3MainPage.getDateHyperLink('Characteristics - Summary').getText().then(function(value) {
        if (value !== '30-NOV-2016') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Characteristics - Summary" report did not calculate with date "30-NOV-2016": Found: ' + value);
        }
      });
    });

    it('Should copy all second level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics - Summary', 2, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          secondLevelGroupElement.push(text);
        });
      });
    });

    it('Verifying if second level copied values are not empty', function() {
      if (secondLevelGroupElement.length === 0) {
        expect(false).customError('Values did not copy in array; found:' + secondLevelGroupElement);
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should copy all third level group name for later use', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics - Summary', 3, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          thirdLevelGroupElement.push(text);
        });
      });
    });

    it('Verifying if third level copied values are not empty', function() {
      if (thirdLevelGroupElement.length === 0) {
        expect(false).customError('Values did not copy in array; found:' + thirdLevelGroupElement);
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 684012', function() {

    it('Should click on the "Wrench" button from the "Characteristics - Summary" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics - Summary');

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

    it('Should check "Columns" checkbox from Transpose drop down', function() {
      ThiefHelpers.setCheckBox('Columns', PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, true);
    });

    it('Should uncheck "Portfolios" checkbox from Transpose drop down', function() {
      ThiefHelpers.setCheckBox('Portfolios', PA3MainPage.xpathCheckboxFromTransposeMenuDropDown);
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.clickOnButton('Apply');
    });

    it('Should Wait for "Characteristics - Summary" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics - Summary').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics - Summary" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics - Summary" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    var multiportfolios = ['S&P 500 vs. Russell 1000', 'S&P 500 vs. DEFAULT'];

    multiportfolios.forEach(function(name, index) {
      it('Verifying if ' + name + ' are displayed as  first level multiheader', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Characteristics - Summary', 1).then(function(arrMultiheader) {
          if (arrMultiheader[index] !== name) {
            expect(false).customError('"' + name + '"  is not displayed as  first level multiheader; Found: ' + arrMultiheader[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var portfolioBenchmark = ['S&P 500', 'Russell 1000', 'S&P 500', 'DEFAULT'];

    portfolioBenchmark.forEach(function(name, index) {
      it('Verifying if ' + name + ' are displayed as  second level multiheader', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Characteristics - Summary', 2).then(function(arrMultiheader) {
          if (arrMultiheader[index] !== name) {
            expect(false).customError('"' + name + '"  is not displayed as  second level multiheader; Found: ' + arrMultiheader[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if  all third level elements are present as column in the report', function() {
      SlickGridFunctions.getAllColumnFieldValue('Characteristics - Summary').then(function(arrColumns) {
        thirdLevelGroupElement.forEach(function(name) {
          if (arrColumns.indexOf(name) < 0) {
            expect(false).customError('"' + name + '"  is not displayed as column; Found: ' + arrColumns);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 684013', function() {

    it('Should click on hamburger icon next to Portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying if portfolio widget Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should uncheck "Use Multiple Portfolios" check box', function() {
      ThiefHelpers.setCheckBox('Use Multiple Portfolios', PA3MainPage.xptahCheckboxFromAccountsDropdown);
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "OK" button from Portfolio drop down', function() {
      ThiefHelpers.clickOnButton('OK');
    });

    it('Should Wait for "Characteristics - Summary" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics - Summary').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics - Summary" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    var portfolioBenchmark = ['S&P 500', 'Russell 1000'];

    portfolioBenchmark.forEach(function(name, index) {
      it('Verifying if ' + name + ' are displayed as  first level multiheader', function() {
        PA3MainPage.getAllMultiHeaderNamesOfSpecifiedLevel('Characteristics - Summary', 1).then(function(arrMultiheader) {
          if (arrMultiheader[index] !== name) {
            expect(false).customError('"' + name + '"  is not displayed as  first level multiheader; Found: ' + arrMultiheader[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if  all third level elements are present as column in the report', function() {
      SlickGridFunctions.getAllColumnFieldValue('Characteristics - Summary').then(function(arrColumns) {
        thirdLevelGroupElement.forEach(function(name) {
          if (arrColumns.indexOf(name) < 0) {
            expect(false).customError('"' + name + '"  is not displayed as column; Found: ' + arrColumns);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 684015', function() {

    it('Should click on the "Wrench" button from the "Characteristics - Summary" report', function() {
      PA3MainPage.selectWrenchIcon('Characteristics - Summary');

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

    it('Should check "Portfolios" checkbox from Transpose drop down', function() {
      ThiefHelpers.setCheckBox('Portfolios', PA3MainPage.xpathCheckboxFromTransposeMenuDropDown, true);
    });

    it('Should uncheck "Columns" checkbox from Transpose drop down', function() {
      ThiefHelpers.setCheckBox('Columns', PA3MainPage.xpathCheckboxFromTransposeMenuDropDown);
    });

    it('Disabling wait for Angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should select "Apply" button to close the "Menu" drop down', function() {
      ThiefHelpers.clickOnButton('Apply');
    });

    it('Should Wait for "Characteristics - Summary" report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Characteristics - Summary'), 180000);

      PA3MainPage.getReportCalculationDlg('Characteristics - Summary').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics - Summary" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for "Characteristics - Summary" report to calculate', function() {
      // Waiting for "Weights" report to finish calculation
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if all elements at second level is "S&P 500" and "Russell 1000" element', function() {
      var allRef = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Characteristics - Summary', 2, 'grid-canvas grid-canvas-top grid-canvas-left expandable');
      allRef.each(function(ref) {
        Utilities.scrollElementToVisibility(ref);
        ref.getText().then(function(text) {
          if (text !== 'S&P 500' && text !== 'Russell 1000') {
            expect(false).customError('Second level element is not "S&P 500" or "Russell 1000": Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var portfolioAndBenchMark = ['S&P 500', 'Russell 1000'];

    portfolioAndBenchMark.forEach(function(group) {
      it('Verifying if all column names display under the "' + group + '" group', function() {
        getGroupValues(group, 3).then(function(name) {
          thirdLevelGroupElement.forEach(function(value) {
            if (name.indexOf(value) === -1) {
              expect(false).customError(value + ' Options are not displayed under ' + group);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });
});
