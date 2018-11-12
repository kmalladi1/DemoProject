'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: style-benchmarks', function() {

  var list = [];
  var count = 0;
  var PortWeightColumnData = [];
  var BenchWeightColumnData = [];
  var PortfolioWidget;

  describe('Test Step ID: 678438', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;pa3;accounts;Style_Benchmark" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('style-benchmark');
    });

    it('Verifying if "Calculation Error" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the Calculation Error dialog is thrown stating "Calculation Service: You must use a composite style' + ' benchmark with the blended floating benchmark definition in the composite component and composite asset groupings. Please' + ' change the benchmark option in the grouping definition or change the benchmark."', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).getContent().getText().then(function(content) {
        if (content !== 'Calculation Service: You must use a composite style benchmark with the blended' + ' floating benchmark definition in the composite component and composite asset groupings. Please' + ' change the benchmark option in the grouping definition or change the benchmark.') {
          expect(false).customError('Calculation Error is thrown with the following message "' + content + '" instead of ' + '"Calculation Service: You must use a composite style benchmark with the blended' + ' floating benchmark definition in the composite component and composite asset groupings. Please' + ' change the benchmark option in the grouping definition or change the benchmark."');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678448', function() {

    var temp = ['SB_ACTM', 'STYLE_BENCH_TEST'];

    it('Should click on "OK" button in "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Calculation Error" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should gets the all accounts from Portfolio Hamburger drop', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio').then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            list.push(text);
          });
        });
      });
    });

    it('Verifying if Portfolio Hamburger drop down is opened and has the "SB_ACTM" and "STYLE_BENCH_TEST" ACTM files', function() {
      for (var i = 0; i < temp.length; i++) {
        count = 0;
        for (var j = 0; j < list.length; j++) {
          if (list[j].indexOf(temp[i]) > -1) {
            count = count + 1;
          }
        }

        if (count !== 1) {
          expect(false).customError('"' + temp[i] + '" account is not available in Portfolio Hamburger drop down list');
          CommonFunctions.takeScreenShot();
        }
      }
    });
  });

  describe('Test Step ID: 678651', function() {

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add Style Benchmark" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Add Style Benchmark', 'Variation Type');
    });

    it('Verifying if "Add Style Benchmark" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Add Style Benchmark', 'Variation Type');
    });

    it('Should select "SB_TEST" under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'SB_TEST') {
              itemRef.click().then(function() {
              }, function() {
                expect(false).customError('Unable to select "SB_TEST" under the "Portfolios" section in the "Portfolio Variation" dialog');
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

    it('Verifying if "SB_TEST" is selected under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'SB_TEST') {
              itemRef.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"SB_TEST" is not selected under the "Portfolios" section in the "Portfolio Variation" dialog');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should gets the all accounts from Portfolio Hamburger drop down', function() {
      list = [];
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            list.push(text);
          });
        });
      });
    });

    it('Verifying if "Composite Style Benchmark (SB_TEST)" account is available in Portfolio Hamburger drop down list', function() {
      count = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i] === 'Composite Style Benchmark (SB_TEST)') {
          count = count + 1;
        }
      }

      if (count !== 1) {
        expect(false).customError('"Composite Style Benchmark (SB_TEST)" account is not available in Portfolio Hamburger drop down list');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if "Composite Style Benchmark (SB_TEST)" account is selected in Portfolio Hamburger drop down list', function() {
      list = [];
      PA3MainPage.getListFromAccountDropdown('Portfolio', false).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text.indexOf('Composite Style Benchmark (SB_TEST)') > -1) {
              ref.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"Composite Style Benchmark (SB_TEST)" account is not selected in Portfolio Hamburger drop down list');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 678652', function() {

    it('Should click on "Cancel" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Cancel" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should gets the all accounts from Portfolio Hamburger drop', function() {
      list = [];
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            list.push(text);
          });
        });
      });
    });

    it('Verifying if "Composite Style Benchmark (SB_TEST)" account is not available in Portfolio Hamburger drop down list', function() {
      count = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i] === 'Composite Style Benchmark (SB_ACTM)') {
          count = count + 1;
        }
      }

      if (count === 1) {
        expect(false).customError('"Composite Style Benchmark (SB_TEST)" account is available in Portfolio Hamburger drop down list');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 678492', function() {

    it('Should select "SB_ACTM" account from Portfolio Hamburger drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text === 'SB_ACTM') {
              ref.click().then(function() {
              }, function() {
                expect(false).customError('Unable to select "SB_ACTM" account from Portfolio Hamburger drop down');
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

    it('Verifying if "SB_ACTM" account is selected in Portfolio Hamburger drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio').then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text.indexOf('SB_ACTM') > -1) {
              ref.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"SB_ACTM" account is not selected in Portfolio Hamburger drop down');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Calculation Error" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Calculation Error" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Benchmark Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Benchmark Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Benchmark Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Benchmark Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Benchmark hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Benchmark hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add Style Benchmark" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Add Style Benchmark', 'Variation Type');
    });

    it('Verifying if "Add Style Benchmark" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Add Style Benchmark', 'Variation Type');
    });

    it('Verifying if "SB_ACTM" is selected under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'SB_ACTM') {
              itemRef.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"SB_ACTM" is not selected under the "Portfolios" section in the "Portfolio Variation" dialog');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
        }
      });
    });

    it('Should gets the all accounts from Benchmark Hamburger drop down', function() {
      list = [];
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            list.push(text);
          });
        });
      });
    });

    it('Verifying if "Composite Style Benchmark (SB_ACTM)" account is available in Benchmark Hamburger drop down list', function() {
      count = 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i] === 'Composite Style Benchmark (SB_ACTM)') {
          count = count + 1;
        }
      }

      if (count !== 1) {
        expect(false).customError('"Composite Style Benchmark (SB_TEST)" account is not available in Benchmark Hamburger drop down list');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if "Composite Style Benchmark (SB_ACTM)" account is selected in Benchmark Hamburger drop down list', function() {
      list = [];
      PA3MainPage.getListFromAccountDropdown('Benchmark', false).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text.indexOf('Composite Style Benchmark (SB_ACTM)') > -1) {
              ref.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"Composite Style Benchmark (SB_ACTM)" account is not selected in Benchmark Hamburger drop down list');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 678496', function() {

    it('Should click on "Add Portfolio Variation"/"+" button in Benchmark hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Benchmark hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "SB_ACTM" item is not listed in "Portfolios" section', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'SB_ACTM') {
              expect(false).customError('"SB_ACTM" item is listed in "Portfolios" section');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 678497', function() {

    it('Should click on "Cancel" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('Cancel').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Cancel" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" icon next to "Composite Style Benchmark (SB_ACTM)" in Benchmark widget drop down', function() {
      PA3MainPage.getAccountDeleteButton('Benchmark', 'Composite Style Benchmark (SB_ACTM)').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "X" icon next to "Composite Style Benchmark (SB_ACTM)" in Benchmark widget drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Composite Style Benchmark (SB_ACTM)" account is removed from Benchmark widget drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Benchmark', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text === 'Composite Style Benchmark (SB_ACTM)') {
              expect(false).customError('"Composite Style Benchmark (SB_ACTM)" account is not removed from Benchmark widget drop down');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down', function() {
      element(by.xpath(PA3MainPage.xathAddPortfolioVarationButton)).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Add Portfolio Variation"/"+" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen(2).then(function(status) {
        if (!status) {
          expect(false).customError('"Portfolio Variation" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Add Style Benchmark" from the Variation Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Add Style Benchmark', 'Variation Type');
    });

    it('Verifying if "Add Style Benchmark" is set to the Variation Type drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Add Style Benchmark', 'Variation Type');
    });

    it('Should get all accounts from "Portfolios" section in the "Portfolio Variation" dialog', function() {
      list = [];
      count = 0;
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            list.push(value);
          });
        });
      });
    });

    it('Verifying if "SB_ACTM" is listed in the Portfolios section of the Portfolio Variation dialog', function() {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === 'SB_ACTM') {
          count = count + 1;
        }
      }

      if (count !== 1) {
        expect(false).customError('"SB_ACTM" is not listed in the Portfolios section of the Portfolio Variation dialog');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if "SB_ACTM" is selected under the "Portfolios" section in the "Portfolio Variation" dialog', function() {
      PA3MainPage.getListOfPortfoliosFromAddPortfolioVariations().then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(itemRef) {
          itemRef.getText().then(function(value) {
            if (value === 'SB_ACTM') {
              itemRef.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"SB_ACTM" is not selected under the "Portfolios" section in the "Portfolio Variation" dialog');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 678501', function() {

    it('Should click on "OK" button in "Add Portfolio Variation" drop down', function() {
      PA3MainPage.getOkOrCancelButtonInAddPortfolioVaration('OK').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Add Portfolio Variation" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Portfolio Variation" drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(2, false).then(function(status) {
        if (status) {
          expect(false).customError('"Portfolio Variation" drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in Benchmark hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in Benchmark hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Benchmark Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Benchmark Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Waiting for "Weights" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Weights'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        } else {
          // Close QA Info box if present
          PA3MainPage.closeQAInfoBox();
        }
      });
    });

    it('Verifying if "Weights" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Weights" report is not displayed');
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
    });

    it('Should get "Port. Weight" column data', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Weight').then(function(PortWeightColumnValues) {
        PortWeightColumnData = PortWeightColumnValues;
      });
    });

    it('Should get "Bench. Weight" column data', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Bench. Weight').then(function(BenchWeightcolumnValues) {
        BenchWeightColumnData = BenchWeightcolumnValues;
      });
    });

    it('Verifying if values in the "Bench. Weight" and "Port. Weight" are different', function() {
      var compare = function(i, j) {
        if (PortWeightColumnData[i] === BenchWeightColumnData[j]) {
          expect(false).customError('The values in the "' + i + '" row for "Port. Weight" and "Bench. Weight" columns' + ' are same and the value is "' + PortWeightColumnData[i] + '"');
          CommonFunctions.takeScreenShot();
        }
      };

      for (var i = 1; i < PortWeightColumnData.length; i++) {
        for (var j = 1; j < BenchWeightColumnData.length; j++) {
          if (i === j) {
            compare(i, j);
          }
        }
      }
    });
  });

  describe('Test Step ID: 678502', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Portfolio', 'Prices', 'document options');

    it('Should enter "bloomberg" in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).setText('bloomberg');
    });

    it('Verifyig if "bloomberg" is entered in the "Price - Available" section input box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, DocumentOptionsPricesPortfolio.getSearchField('Prices')).getText().then(function(value) {
        if (value !== 'bloomberg') {
          expect(false).customError('"bloomberg" is not entered in the "Price - Available" section input box, instead' + ' found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Fixed Income|Bloomberg Barclays" is expanded', function() {
      ThiefHelpers.getListboxGroup(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Fixed Income|Bloomberg Barclays').isExpanded().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Fixed Income|Bloomberg Barclays" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Bloomberg Barclays" under "Fixed Income > Bloomberg Barclays" in "Price - Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsPricesPortfolio.xpathPricesAvailableContainer, 'Bloomberg Barclays', 'Fixed Income|Bloomberg Barclays', 'Fixed Income|Bloomberg Barclays').select();
    });

    it('Should click on "Right" arrow button to move "Bloomberg Barclays" item to selected section in "Price - Available" section', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsPricesPortfolio.getArrowButton('prices'));
    });

    it('Verifying if "Bloomberg Barclays" is moved to "Selected" section in "Price - Available" section', function() {
      DocumentOptionsPricesPortfolio.getAllListElements('Prices', 'Selected').count().then(function(countOfReferences) {
        if (countOfReferences > 0) {
          DocumentOptionsPricesPortfolio.getElementFromPricesSelectedContainer('Bloomberg Barclays').isPresent().then(function(itemStatus) {
            if (!itemStatus) {
              expect(false).customError('"Bloomberg Barclays" is not moved to "Selected" section in "Price - Available" section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Bloomberg Barclays" is not moved to "Selected" section in "Price - Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    it('Verifying if "Exposures" report is selected in LHP ', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Weights', 'Exposures').then(function(elementReference) {
        elementReference.getAttribute('class').then(function(status) {
          if (status.indexOf('selected') === -1) {
            expect(false).customError('"Exposures" report is not selected in LHP');
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should get "Port. Weight" column data', function() {
      PortWeightColumnData = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Port. Weight').then(function(PortWeightColumnValues) {
        PortWeightColumnData = PortWeightColumnValues;
      });
    });

    it('Should get "Bench. Weight" column data', function() {
      BenchWeightColumnData = [];
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', 'Bench. Weight').then(function(BenchWeightcolumnValues) {
        BenchWeightColumnData = BenchWeightcolumnValues;
      });
    });

    it('Verifying if values in the "Bench. Weight" and "Port. Weight" are same', function() {
      var compare = function(i, j) {
        if (parseFloat(PortWeightColumnData[i]).toFixed(7) !== parseFloat(BenchWeightColumnData[j]).toFixed(7)) {
          expect(false).customError('The values in the "' + i + '" row for "Port. Weight" and "Bench. Weight" columns' + ' are different. The value in "Port. Weight" colun is "' + PortWeightColumnData[i] + '" and the value in ' + '"Bench. Weight" column is "' + BenchWeightColumnData[i] + '"');
          CommonFunctions.takeScreenShot();
        }
      };

      for (var i = 1; i < PortWeightColumnData.length; i++) {
        for (var j = 1; j < BenchWeightColumnData.length; j++) {
          if (i === j) {
            compare(i, j);
          }
        }
      }
    });
  });

  describe('Test Step ID: 678503', function() {

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "SB_TEST" account from Portfolio Hamburger drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text === 'SB_TEST') {
              ref.click().then(function() {
              }, function() {
                expect(false).customError('Unable to select "SB_TEST" account from Portfolio Hamburger drop down');
                CommonFunctions.takeScreenShot();
              });
            }
          });
        });
      });
    });

    it('Verifying if "SB_TEST" account is selected in Portfolio Hamburger drop down', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio').then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text.indexOf('SB_TEST') > -1) {
              ref.getAttribute('class').then(function(status) {
                if (status.indexOf('selected') < 0) {
                  expect(false).customError('"SB_TEST" account is not selected in Portfolio Hamburger drop down');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          });
        });
      });
    });

    it('Should click on "OK" button in Portfolio hamburger drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in Portfolio hamburger drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Portfolio Hamburger drop down is closed', function() {
      ThiefHelpers.isDropDownOpen(1, false).then(function(status) {
        if (status) {
          expect(false).customError('Portfolio Hamburger drop down is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Calculation Error" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Calculation Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the Calculation Error dialog is thrown stating "Calculation Service: The style benchmark name must match the portfolio name excluding the "SB" prefix. Please update the style benchmark accordingly."', function() {
      ThiefHelpers.getDialogClassReference('Calculation Error', 1).getContent().getText().then(function(content) {
        if (content !== 'Calculation Service: The style benchmark name must match the portfolio name excluding the \'SB\' prefix. Please update the style benchmark accordingly.') {
          expect(false).customError('Calculation Error is thrown with the following message "' + content + '" instead of ' + 'Calculation Service: The style benchmark name must match the portfolio name excluding the \'SB\' prefix. Please update the style benchmark accordingly.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in "Calculation Error" dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK', 1).click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button in "Calculation Error" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should copy the path in "Portfolio" widget and store it for future use', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(value) {
        PortfolioWidget = value;
      });
    });

    it('Should prepand "SB:" to the path copied from "Portfolio" widget and enter it in "Benchmark" widget and then hit enter', function() {
      var prepandText = 'SB:';
      var temp;
      temp = prepandText.concat(PortfolioWidget);

      // Entering the value to Banchmark Widget
      ThiefHelpers.getTextBoxClassReference('', PA3MainPage.xpathBenchmarkWidget).setText(temp);

      PA3MainPage.getWidgetBox('Benchmark').sendKeys(protractor.Key.ENTER);
    });

    it('Verifying if "Port. Weight" and "Bench. Weight" columns displays "100" for "Total" row', function() {
      var columns = ['Port. Weight', 'Bench. Weight'];
      columns.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', column).then(function(cellReference) {
          cellReference.getText().then(function(cellValue) {
            if (cellValue !== '100.00') {
              expect(false).customError('Total row value for "' + column + '" column is not matched with expected.' + ' Expected: "100" and found: "' + cellValue + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
