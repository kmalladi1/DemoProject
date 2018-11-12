'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: portfolio-typeahead', function() {

  // Variable(s)
  var arrExpectedHeaderNames = [];
  var arrHeaderNames = [];
  var arrRowNames = [];
  var arrPortWeightValues = [];

  describe('Test Step ID: 549980', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with default_doc_auto', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 597364', function() {

    it('Should type "COMP.CSTM" in the portfolio widget', function() {
      PA3MainPage.getWidgetBox('portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('portfolio').sendKeys('COMP.CSTM', protractor.Key.ENTER).then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that error message comes up informing the user that "Error setting portfolio: .OFDB and .CSTM extensions are not ' + 'supported in PA3.  Please create an account, .ACCT."', function() {
      PA3MainPage.getDialogWithText('Error setting portfolio: .OFDB and .CSTM extensions are not supported in PA3.  ' + 'Please create an account, .ACCT.').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Error message has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549981', function() {

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

    it('Should type "demo" in the Portfolio widget box', function() {
      // Clear the default portfolio selected (if exists)
      PA3MainPage.getWidgetBox('portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('portfolio').sendKeys('demo').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the type ahead is displayed after typing "demo" in "Portfolio" widget box', function() {
      // Verify that type ahead appeared
      PA3MainPage.getTypeahead().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Type ahead does not appears');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 549983', function() {

    it('Should type "Client:/SPAR" in the Portfolio widget box', function() {
      // Clear the default portfolio selected (if exists)
      PA3MainPage.getWidgetBox('portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('portfolio').sendKeys('Client:/SPAR').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the type ahead is displayed after typing "Client:/SPAR" in "Portfolio" widget box', function() {
      // Verify that type ahead appeared
      PA3MainPage.getTypeahead().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Type ahead does not appears');
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

    arrExpectedHeaderNames = ['All', 'Portfolio'];

    arrExpectedHeaderNames.forEach(function(headerName, index) {
      it('Verifying that typeahead displays "' + headerName + '" header', function() {
        expect(arrHeaderNames[index] === headerName).customError('"' + headerName + '" header ' + 'is not found in the typeahead');
        if (arrHeaderNames[index] !== headerName) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that all the items from typeahead list is having a text "Client:/spar"', function() {
      PA3MainPage.getAllItemsFromTypeahead().each(function(reference) {
        reference.getText().then(function(text) {
          expect(text.split('\n')[2].indexOf('Client:/spar') > -1).customError('Found item in typeahed ' + 'which is not having path "Client:/spar". Found ' + text.split('\n')[2]);
          if (text.split('\n')[2].indexOf('Client:/spar') < 0) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 562878', function() {

    it('Should select "Portfolio" tab from the typeahead', function() {
      PA3MainPage.getHeaderFromTypeahead('Portfolio').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that all the items from typeahead list is having a text "Client:/spar"', function() {
      PA3MainPage.getAllItemsFromTypeahead().each(function(reference) {
        reference.getText().then(function(text) {
          expect(text.split('\n')[2].indexOf('Client:/spar') > -1).customError('Found item in typeahed ' + 'which is not having path "Client:/spar".');
          if (text.split('\n')[2].indexOf('Client:/spar') < 0) {
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 549985', function() {

    it('Should type "sp" in the Portfolio widget box', function() {
      // Clear the default portfolio selected (if exists)
      PA3MainPage.getWidgetBox('portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('portfolio').sendKeys('sp').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that the type ahead is displayed after typing "sp" in "Portfolio" widget box', function() {
      // Verify that type ahead appeared
      PA3MainPage.getTypeahead().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Type ahead does not appears');
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

  describe('Test Step ID: 510061', function() {

    it('Should type "SPN:SP50" in the "Portfolio" widget box', function() {
      // Clear the default "Portfolio" selected (if exists)
      PA3MainPage.getWidgetBox('Portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('SPN:SP50', protractor.Key.ENTER).then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

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

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Collect all row names and cell values for "Port. Weight" column', function() {
      // Get Row names
      PA3MainPage.getAllElementsFromCalculatedReport('Weights', 'slick-pane slick-pane-bottom slick-pane-left').each(function(eleRef) {
        eleRef.getText().then(function(text) {
          arrRowNames.push(text);
        });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      }).then(function() {
        // Get cell values from "Port. Weight" column
        PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(cellRefs) {
          cellRefs.forEach(function(cellReference) {
            cellReference.getText().then(function(text) {
              arrPortWeightValues.push(text);
            });
          });
        });
      });
    });
  });

  describe('Test Step ID: 510062', function() {

    it('Should type "S&P 5" in the "Portfolio" widget box', function() {
      // Clear the default "Portfolio" selected (if exists)
      PA3MainPage.getWidgetBox('Portfolio').clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Enter the Text in widget box
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('S&P 5').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

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

    it('Should select "S&P 500" from the typeahead', function() {
      PA3MainPage.getAllItemsFromTypeahead().filter(function(reference) {
        return reference.getText().then(function(text) {
          return text.split('\n')[0] === 'S&P 500';
        });
      }).then(function(optionReference) {
        optionReference[0].click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that application header displays "S&P 500"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        expect(text.indexOf('S&P 500') > -1).customError('"S&P 500" is not displayed in the application header.');
        if (text.indexOf('S&P 500') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Portfolio" widget displays "BENCH:SP50"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(value) {
        expect(value === 'BENCH:SP50').customError('"Portfolio" widget does not display "BENCH:SP50". Found: "' + value + '"');
        if (value !== 'BENCH:SP50') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var takeScreenShot = 0;

    it('Verifying that cell values of "Port. Weight" column for all rows is same as collected in previous step', function() {
      // Compare cell values from "Port. Weight" column
      PA3MainPage.getAllCellsOfGivenColumn('Weights', 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(cellRefs) {
        cellRefs.forEach(function(cellReference, index) {
          cellReference.getText().then(function(text) {
            if (text !== arrPortWeightValues[index]) {
              expect(false).customError('"Port. Weight" column value for "' + arrRowNames[index] + '" ' + 'is not matched with previous value.Expected: ' + arrPortWeightValues[index] + ', Found: ' + text);
              ++takeScreenShot;
              if (takeScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 549984', function() {

    it('Should close PA3 application', function() {
      expect(true).toBeTruthy();
    });
  });
});
