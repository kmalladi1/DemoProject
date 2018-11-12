'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: price-curr-change', function() {

  var getAllCellValuesOfColumn = function() {

    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var refIndex;
    var refIndex1;
    var rowslENGTH;
    browser.driver.executeScript(function() {
      var child = [];
      var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
      var rowItems = slickObject.grid.getData().getItems();
      var rowCount = slickObject.grid.getDataLength();
      for (var i = 1; i < rowItems.length; i++) {
        child.push(slickObject.grid.getDataItem(i)[4]);
      }

      return [child, rowCount];
    }).then(function(value) {
      rowslENGTH = value[1];
      refIndex = value[0].length;
      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
        '.grid.scrollRowIntoView( arguments[ 0 ] )', refIndex);
      browser.sleep(3000);

      var getItemsAfterScroll = function() {
        browser.driver.executeScript(function() {
          var child = [];
          var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
          var rowItems = slickObject.grid.getData().getItems();
          for (var i = 1; i < rowItems.length; i++) {
            child.push(slickObject.grid.getDataItem(i)[4]);
          }

          return child;
        }).then(function(value) {
          refIndex1 = value.length;
          if (refIndex1 + 1 === rowslENGTH) {
            defer.fulfill(value);
          }

          browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
            '.grid.scrollRowIntoView( arguments[ 0 ] )', refIndex1);
          browser.sleep(3000);

        });

        if (refIndex < rowslENGTH) {
          refIndex = refIndex + 300;
        }
      };

      while (refIndex < rowslENGTH) {
        getItemsAfterScroll();
      }
    });

    browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
      '.grid.scrollRowToTop(1)');
    return promise;
  };

  var arrValues = [];

  describe('Test Step ID: Start Up Instructions', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 574658', function() {

    it('Should open "Client:/Pa3/Accounts/PRICE-UPDATE-CURR-CHANGE" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('price-update-curr-change');
    });

    it('Waiting for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      browser.sleep(5000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Weights" report is not displayed on the web page.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
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

    it('Should note  all cell values for "Port. Ending Price" column', function() {
      getAllCellValuesOfColumn().then(function(columnValue) {
        arrValues = columnValue;
      });
    });

    it('Verify that "Weights" report gets calculated for "12/18/2015"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(value) {
        if (value !== '12/18/2015') {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Report was not grouped by date: "12/18/2015", Found:' + value);
        }
      });

    });

  });

  describe('Test Step ID: 575048', function() {

    it('Verify that Currency dropdown is selected with "Japanese Yen".', function() {
      ThiefHelpers.verifySelectedDropDownText('Japanese Yen', undefined, PA3MainPage.xpathCurrencyDropdown);
    });

    it('Should change the currency from "Japanese Yen" to "U.S. Dollar"', function() {
      ThiefHelpers.selectOptionFromDropDown('U.S. Dollar', undefined, PA3MainPage.xpathCurrencyDropdown, 1);

      // Verify "U.S. Dollar" is selected
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, PA3MainPage.xpathCurrencyDropdown);
    });

    it('Wait for weights report to finish calculation', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      //Verifying weights reports calculated
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

      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    it('Verify that the "Port. Ending Price" column values are not the same from the values noted in previous step', function() {
      getAllCellValuesOfColumn().then(function(columnValue) {
        if (arrValues === columnValue) {
          flag = flag + 1;
          expect(false).customError('"Port. Ending Price" column values are same as before');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

  });

  describe('Test Step ID: 624352', function() {

    it('Should enter "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT" in "Portfolio" widget', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).setText('CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT');

      //Verifying if "Portfolio" text is set to "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT"
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT') {
          expect(false).customError('"Portfolio" text box is not set to "CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT". ' +
            'Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that a dialog box saying "Error: CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT is not valid" appears', function() {
      ThiefHelpers.isDialogOpen('Error Setting portfolio');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Error Setting portfolio').getContent().getText().then(function(content) {
        if (content !== 'Error: CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT is not valid') {
          expect(false).customError('Expected dialog box content: "Error: CLIENT:/PA3/ACCOUNTS/EQUITY_ACCOUNT_PD.ACCT ' +
            'is not valid" but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getDialogButton('Error Setting portfolio', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

});
