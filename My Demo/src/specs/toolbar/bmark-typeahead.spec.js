'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: bmark-typeahead', function() {

  // Variable(s)
  var arrExpectedHeaderNames = [];
  var arrHeaderNames = [];
  var errorDialgAppear = false;

  describe('Test Step ID: 549986', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 597368', function() {

    it('Should type "802.OFDB" in the benchmark widget', function() {
      PA3MainPage.getWidgetBox('benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('benchmark').sendKeys('802.OFDB', protractor.Key.ENTER).then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that error message comes up informing the user that "Error setting benchmark: .OFDB and .CSTM extensions are not ' + 'supported in PA3.  Please create an account, .ACCT."', function() {
      PA3MainPage.getDialogWithText('Error setting benchmark: .OFDB and .CSTM extensions are not supported in PA3.  ' + 'Please create an account, .ACCT.').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Error message has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549987', function() {

    it('Should click "OK" button to close error pop-up', function() {
      PA3MainPage.getButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that error pop-up is disappeared
      PA3MainPage.getDialog('Error Setting Portfolio').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('Error dialog still exist');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "russ" in the Benchmark widget box', function() {
      // Clear the default Benchmark selected (if exists)
      PA3MainPage.getWidgetBox('benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('benchmark').sendKeys('russ').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the type ahead is displayed after typing "russ" in "Benchmark" widget box', function() {
      // Verifying that typeahead appears
      PA3MainPage.getTypeahead().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Type ahead is not displayed after typing "russ" in "Benchmark" widget box');
          CommonFunctions.takeScreenShot();
        } else {
          PA3MainPage.getAllHeadersFromTypeahead().each(function(ref) {
            ref.getText().then(function(name) {
              arrHeaderNames.push(name);
            });
          });
        }
      });
    });

    var counter = 0;
    arrExpectedHeaderNames = ['All', 'Portfolio', 'Composite', 'Index', 'Ownership'];

    arrExpectedHeaderNames.forEach(function(headerName) {
      it('Verifying that typeahead displays "' + headerName + '" header', function() {
        if (headerName !== 'Composite') {
          expect(arrHeaderNames[counter] === headerName).customError('"' + headerName + '" header ' + 'is not found in the typeahead');
          if (arrHeaderNames[counter] !== headerName) {
            CommonFunctions.takeScreenShot();
          }

          counter += 1;
        } else {
          expect(arrHeaderNames[counter] !== headerName).customError('As per known issue: RPD:21107269 "' + headerName + '" ' + 'header is not found in the typeahead');
          if (arrHeaderNames[counter] === headerName) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 549988', function() {

    it('Should type "world bal" in the benchmark widget box', function() {
      // Clear the default benchmark selected
      PA3MainPage.getWidgetBox('benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('benchmark').sendKeys('world bal').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the type ahead is displayed after typing "world bal" in "Benchmark" widget box', function() {
      // Verifying that typeahead appears
      PA3MainPage.getTypeahead().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Type ahead is not displayed after typing "world bal" in "Benchmark" widget box');
          CommonFunctions.takeScreenShot();
        } else {
          arrHeaderNames = [];
          PA3MainPage.getAllHeadersFromTypeahead().each(function(ref) {
            ref.getText().then(function(name) {
              arrHeaderNames.push(name);
            });
          });
        }
      });
    });

    var counter = 0;
    arrExpectedHeaderNames = ['All', 'Portfolio', 'Composite', 'Ownership'];

    arrExpectedHeaderNames.forEach(function(headerName) {
      it('Verifying that typeahead displays "' + headerName + '" header', function() {
        if (headerName !== 'Composite') {
          expect(arrHeaderNames[counter] === headerName).customError('"' + headerName + '" header ' + 'is not found in the typeahead');
          if (arrHeaderNames[counter] !== headerName) {
            CommonFunctions.takeScreenShot();
          }

          counter += 1;
        } else {
          expect(arrHeaderNames[counter] !== headerName).customError('As per known issue: RPD:21107269 "' + headerName + '" ' + 'header is not found in the typeahead');
          if (arrHeaderNames[counter] === headerName) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });
  });

  describe('Test Step ID: 549990', function() {

    it('Should type "super_client:/factset" in the benchmark widget box', function() {
      // Clear the default benchmark selected (if exists)
      PA3MainPage.getWidgetBox('benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('benchmark').sendKeys('super_client:/factset').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the type ahead is displayed after typing "super_client:/factset" in "Benchmark" widget box', function() {
      // Verifying that typeahead appears
      PA3MainPage.getTypeahead().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Type ahead is not displayed after typing "super_client:/factset" in "Benchmark" widget' + ' box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "All" tab is selected in the type ahead', function() {
      PA3MainPage.getHeaderFromTypeahead('All').getAttribute('class').then(function(attrValue) {
        expect(attrValue.indexOf('selected') > -1).customError('"All" tab is not selected by default in the typeahead.');
        if (attrValue.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 568722', function() {

    it('Should select "Portfolio" tab from the typeahead', function() {
      PA3MainPage.getHeaderFromTypeahead('Portfolio').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that all the items from typeahead list is having a text "Super_client:/factset" ' + 'for "Portfolio" account type', function() {
      PA3MainPage.getAllItemsFromTypeahead().each(function(reference) {
        Utilities.scrollElementToVisibility(reference);
        reference.getText().then(function(text) {
          if (text.split('\n')[text.split('\n').length - 1] === 'Portfolio' || text.split('\n')[text.split('\n').length - 1] === 'Composite') {
            if (text.split('\n')[text.split('\n').length - 1] === 'Portfolio') {
              reference.element(by.xpath('//*[@data-qa-class="pa-typeahead-item"]')).getAttribute('data-value').then(function(attrValue) {
                expect(attrValue.indexOf('Super_client:/factset') > -1).customError('Found item in typeahed ' + 'which is not having path "Super_client:/factset" for "Portfolio" account type.');
                if (attrValue.indexOf('Super_client:/factset') < 0) {
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          } else {
            expect(false).customError('Account other than "Portfolio" or "Composite" is found in the type ahead.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 568723', function() {

    it('Verifying that all the items from typeahead list is having a text "Super_client:/factset" ' + 'for "Composite" account type', function() {
      PA3MainPage.getAllItemsFromTypeahead().each(function(reference) {
        Utilities.scrollElementToVisibility(reference);
        reference.getText().then(function(text) {
          if (text.split('\n')[text.split('\n').length - 1] === 'Portfolio' || text.split('\n')[text.split('\n').length - 1] === 'Composite') {
            if (text.split('\n')[text.split('\n').length - 1] === 'Composite') {
              reference.element(by.xpath('//*[@data-qa-class="pa-typeahead-item"]')).getAttribute('data-value').then(function(attrValue) {
                expect(attrValue.indexOf('Super_client:/factset') > -1).customError('Found item in typeahed ' + 'which is not having path "Super_client:/factset" for "Composite" account type.');
                if (attrValue.indexOf('Super_client:/factset') < 0) {
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          } else {
            expect(false).customError('Account other than "Portfolio" or "Composite" is found in the type ahead.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  var arrStepIDs = ['510063', '510064', '510065', '510067', '510069'];
  var arrBmarkNamesToType = ['Russell 10', '899902', 'MSCI E', 'All World', 'All global'];
  var arrBmarkToSelect = ['Russell 1000', 'MSCI All Country Americas', 'MSCI EAFE', 'FTSE All-World Index'];
  var arrBmarkNamesExpectedInWidget = ['BENCH:R.1000', 'BENCH:899902', 'BENCH:990300', 'BENCH:I00010'];
  var arrHeaderNamesExpected = ['Russell 1000', 'MSCI All Country Americas', 'MSCI EAFE', 'FTSE All-World Index'];

  arrStepIDs.forEach(function(stepID, index) {

    describe('Test Step ID: ' + stepID, function() {

      it('Should type "' + arrBmarkNamesToType[index] + '" in the benchmark widget box', function() {
        // Clear the default benchmark selected (if exists)
        PA3MainPage.getWidgetBox('benchmark').clear().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Enter the Text in widget box
        PA3MainPage.getWidgetBox('benchmark').sendKeys(arrBmarkNamesToType[index]).then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verify that the type ahead is displayed after typing "' + arrBmarkNamesToType[index] + '" in ' + '"Benchmark" widget box', function() {
        // Verifying that typeahead appears
        PA3MainPage.getTypeahead().isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('Type ahead is not displayed after typing "' + arrBmarkNamesToType[index] + '" in ' + '"Benchmark" widget box');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      if (stepID === '510063') {
        it('Should select "Index" tab from the typeahead', function() {
          PA3MainPage.getHeaderFromTypeahead('Index').click().then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });

          // Verifying that "Index" tab is selected
          PA3MainPage.getHeaderFromTypeahead('Index').getAttribute('class').then(function(attrValue) {
            expect(attrValue.indexOf('selected') > -1).customError('"Index" tab is not selected after clicking on it.');
            if (attrValue.indexOf('selected') < 0) {
              CommonFunctions.takeScreenShot();
            }
          });
        });
      }

      if (stepID !== '510069') {
        it('Should select "' + arrBmarkToSelect[index] + '" from the typeahead', function() {
          PA3MainPage.getAllItemsFromTypeahead().filter(function(reference) {
            return reference.getText().then(function(text) {
              return text.split('\n')[0] === arrBmarkToSelect[index];
            });
          }).then(function(optionReference) {
            optionReference[0].click().then(function() {
            }, function(error) {

              expect(false).customError(error);
              CommonFunctions.takeScreenShot();
            });
          });
        });
      }

      if (stepID === '510063') {
        it('Should select "Automatic Calculation"', function() {
          // Click on the Wrench button from application toolbar
          PA3MainPage.getWrenchIcon().click().then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });

          // Select "Automatic Calculation" option
          PA3MainPage.setAutomaticCalculation(true).then(function(boolValue) {
            expect(boolValue).customError('"Automatic Calculation" is not selected.');
          });
        });
      } else if (stepID === '510069') {
        it('Should hit ENTER key for report calculcation', function() {
          PA3MainPage.getWidgetBox('Benchmark').sendKeys(protractor.Key.ENTER);
        });
      }

      it('Wait for "Weights" report to calculate', function() {
        Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Weights'), 180000).then(function() {
        }, function(error) {
          expect(false).customError(error);
        });
      });

      it('Verifying if "Weights" report is calculated', function() {
        PA3MainPage.isReportCalculated('Weights', true).then(function(present) {
          expect(present).customError('"Weights" report is calculated.');
          if (!present) {
            CommonFunctions.takeScreenShot();
          }
        });

        if (stepID !== '510069') {
          // Check if "Calculation Error" dialog appear
          PA3MainPage.getDialog('Calculation Error').isPresent().then(function(present) {
            expect(!present).customError('"Calculation Error" dialog box is seen while report calculation.');
            if (present) {
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });

      if (stepID !== '510069') {

        it('Verifying that application header displays "' + arrHeaderNamesExpected[index] + '"', function() {
          PA3MainPage.getHeader().getText().then(function(text) {
            expect(text.indexOf(arrHeaderNamesExpected[index]) > -1).customError('"' + arrHeaderNamesExpected[index] + '" ' + 'is not displayed in the application header.');
            if (text.indexOf(arrHeaderNamesExpected[index]) < 0) {
              CommonFunctions.takeScreenShot();
            }
          });
        });

        it('Verifying that "Benchmark" widget displays "' + arrBmarkNamesExpectedInWidget[index] + '"', function() {
          PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(value) {
            expect(value === arrBmarkNamesExpectedInWidget[index]).customError('"Benchmark" widget does not display "' + arrBmarkNamesExpectedInWidget[index] + '". ' + 'Found: "' + value + '"');
            if (value !== arrBmarkNamesExpectedInWidget[index]) {
              CommonFunctions.takeScreenShot();
            }
          });
        });
      }

      if (stepID === '510069') {
        it('Verify that a "Error Setting benchmark" pop up stating "Error : ALL GLOBAL is not valid" appears', function() {
          // Check if "Error Setting benchmark" dialog appear
          PA3MainPage.getDialogWithText('Error: ALL GLOBAL is not valid').isPresent().then(function(present) {
            expect(present).customError('"Error Setting benchmark" dialog box is did not ' + 'appear with text "Error: ALL GLOBAL is not valid".');
            if (!present) {
              CommonFunctions.takeScreenShot();
            } else {
              errorDialgAppear = true;
            }
          });
        });
      }
    });
  });

  describe('Test Step ID: 513133', function() {

    it('Should click "OK" button in "Error Setting benchmark" pop up', function() {
      if (errorDialgAppear) {
        PA3MainPage.getButton('OK').click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      }
    });

    it('Should delete "ALL GLOBAL" from the "Benchmark" widget', function() {
      // Clear the default benchmark selected (if exists)
      PA3MainPage.getWidgetBox('benchmark').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Benchmark" widget is empty
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(value) {
        expect(value === '').customError('"ALL GLOBAL" is not deleted from the "Benchmark" widget.');
        if (value !== '') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should ENTER "LION:EFA" into the "Portfolio" widget', function() {
      // Clear the default "Portfolio" selected (if exists)
      PA3MainPage.getWidgetBox('Portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('LION:EFA', protractor.Key.ENTER).then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that header displays the name "iShares MSCI EAFE ETF vs Benchmark"', function() {
      PA3MainPage.getHeader().getText().then(function(name) {
        expect(name === 'iShares MSCI EAFE ETF vs Benchmark').customError('Required name is not displayed in the header.');
        if (name !== 'iShares MSCI EAFE ETF vs Benchmark') {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549989', function() {

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
