'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: mv-currency', function() {

  var portEndingPrice = [];
  var portEndingPriceLocal = [];
  var portEndingCleanMarketValue = [];
  var portEndingCleanMarketValueLocal = [];
  var portEndingMarketValue = [];
  var portEndidngMarketValueLocal = [];
  var portEndingPrice1 = [];
  var portEndingCleanMarketValue1 = [];
  var portEndingMarketValue1 = [];
  var portEndingPriceLocal1 = [];
  var portEndingCleanMarketValueLocal1 = [];
  var portEndidngMarketValueLocal1 = [];
  var securities = [];

  describe('Test Step ID: 657739', function() {

    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:;Pa3;prices;MV_CURRENCY" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mv-currency');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Exposures Overview" is selected in LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Weights', 'Exposures Overview').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Exposures Overview" report from LHP is not selected');
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying that the header title is "Bloomberg Barclays World Govt Inflation-Linked"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Bloomberg Barclays World Govt Inflation-Linked') {
          expect(false).customError('Header title did not displayed as "Bloomberg Barclays World Govt Inflation-Linked"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "United States" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function(flag) {
        if (!flag) {
          expect(false).customError('"United States" did not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupIndex;
    it('Collecting index of "United States" grouping for future reference', function() {
      SlickGridFunctions.getRowIndex('Weights', 'United States', '', undefined).then(function(index) {
        groupIndex = index;
      });
    });

    it('Collecting first three Security names listed under "United States" group', function() {
      var securityNames = function(i) {
        SlickGridFunctions.getRowData('Weights', groupIndex + i, 'Ticker').then(function(data) {
          return data[0];
        }).then(function(value) {
          securities.push(value);
        });
      };

      for (var i = 1; i < 4; i++) {
        securityNames(i);
      }
    });

    it('Should copying value from "Port. Ending Price" column for first three Securities under "United States" group', function() {
      var portValues = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Price').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingPrice.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        portValues(i);
      }
    });

    it('Should copying value from "Port. Ending Price ( Local )" column for first three Securities under ' + '"United States" group', function() {
      var portLocalValues = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Price ( Local )').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingPriceLocal.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        portLocalValues(i);
      }
    });

    it('Should copying value from "Port. Ending Clean Market Value" column for first three Securities under ' + '"United States" group', function() {
      var portValues = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Clean Market Value').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingCleanMarketValue.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        portValues(i);
      }
    });

    it('Should copying value from "Port. Ending Clean Market Value ( Local )" column for first three Securities' + ' under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Clean Market Value ( Local )').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingCleanMarketValueLocal.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Market Value" column for first three Securities under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Market Value').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingMarketValue.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Market Value ( Local )" column for first three Securities under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Market Value ( Local )').then(function(ref) {
          ref.getText().then(function(value) {
            portEndidngMarketValueLocal.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Verifying if "Port. Ending Price" value is same  with "Port. Ending Price ( Local )"', function() {
      portEndingPrice.forEach(function(value, index) {
        if (value !== portEndingPriceLocal[index]) {
          expect(false).customError('"Port. Ending Price" value did not same  with "Port. Ending Price ( Local )"' + ' Expected "' + value + '"; Found :' + portEndingPriceLocal[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Clean Market Value" value is same  with "Port. Ending Clean Market Value ( Local )"', function() {
      portEndingCleanMarketValue.forEach(function(value, index) {
        if (value !== portEndingCleanMarketValueLocal[index]) {
          expect(false).customError('"Port. Ending Clean Market Value" value did not same  with "Port. Ending Clean Market Value ( Local )' + '" Expected "' + value + '"; Found :' + portEndingCleanMarketValueLocal[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Market Value" value is same  with "Port. Ending Market Value ( Local )"', function() {
      portEndingMarketValue.forEach(function(value, index) {
        if (value !== portEndidngMarketValueLocal[index]) {
          expect(false).customError('"Port. Ending Market Value" value did not same  with "Port. Ending Market Value ( Local )' + '" Expected "' + value + '"; Found :' + portEndidngMarketValueLocal[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 657776', function() {

    it('Verifying if Currency drop down is set to "U.S. Dollar" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('U.S. Dollar', undefined, PA3MainPage.xpathCurrencyDropdown);
    });

    it('Should click on "Currency" drop down and select "Japanese Yen"', function() {
      ThiefHelpers.selectOptionFromDropDown('Japanese Yen', undefined, PA3MainPage.xpathCurrencyDropdown, 1);
    });

    it('Verifying if Currency drop down is set to "Japanese Yen"', function() {
      ThiefHelpers.verifySelectedDropDownText('Japanese Yen', undefined, PA3MainPage.xpathCurrencyDropdown, 1);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Exposures Overview" is highlighted in LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Weights', 'Exposures Overview').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Exposures Overview" report from LHP is not selected');
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Verifying that the header title is "Bloomberg Barclays World Govt Inflation-Linked"', function() {
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Bloomberg Barclays World Govt Inflation-Linked') {
          expect(false).customError('Header title did not displayed as "Bloomberg Barclays World Govt Inflation-Linked";' + ' Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "United States" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function(flag) {
        if (!flag) {
          expect(false).customError('"United States" did not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should copying value from "Port. Ending Price" column for first three Securities under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Price').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingPrice1.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Price ( Local )" column for first three Securities under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Price ( Local )').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingPriceLocal1.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Clean Market Value" column for first three Securities under "United' + ' States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Clean Market Value').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingCleanMarketValue1.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Clean Market Value ( Local )" column for first three Securities ' + 'under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Clean Market Value ( Local )').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingCleanMarketValueLocal1.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Market Value" column for first three Securities under "United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Market Value').then(function(ref) {
          ref.getText().then(function(value) {
            portEndingMarketValue1.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Should copying value from "Port. Ending Market Value ( Local )" column for first three Securities under ' + '"United States" group', function() {
      var values = function(i) {
        SlickGridFunctions.getCellReference('Weights', securities[i], 'Ticker', 'Port. Ending Market Value ( Local )').then(function(ref) {
          ref.getText().then(function(value) {
            portEndidngMarketValueLocal1.push(value);
          });
        });
      };

      for (var i = 0; i < 3; i++) {
        values(i);
      }
    });

    it('Verifying if "Port. Ending Price" value is not same  with previous copied "Port. Ending Price" value', function() {
      portEndingPrice.forEach(function(value, index) {
        if (value === portEndingPrice1[index]) {
          expect(false).customError('"Port. Ending Price" value is same  with previous copied value' + ' Expected "' + value + '"; Found :' + portEndingPrice1[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Clean Market Value" value is not same  with previous copied "Port. Ending Clean ' + 'Market Value" value', function() {
      portEndingCleanMarketValue.forEach(function(value, index) {
        if (value === portEndingCleanMarketValue1[index]) {
          expect(false).customError('"Port. Ending Clean Market Value" value is same  with previous copied value' + ' Expected "' + value + '"; Found :' + portEndingCleanMarketValue1[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Market Value" value is not same  with previous copied "Port. Ending Market Value" value', function() {
      portEndingMarketValue.forEach(function(value, index) {
        if (value === portEndingMarketValue1[index]) {
          expect(false).customError('"Port. Ending Market Value" value is same  with previous copied value' + ' Expected "' + value + '"; Found :' + portEndingMarketValue1[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Price ( Local )" value is same  with previous copied "Port. Ending Price ( Local )', function() {
      portEndingPriceLocal.forEach(function(value, index) {
        if (value !== portEndingPriceLocal1[index]) {
          expect(false).customError('"Port. Ending Price ( Local )" value is not same  with previous copied value' + ' Expected "' + value + '"; Found :' + portEndingPriceLocal1[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Clean Market Value ( Local )" value is same  with previous copied "Port. Ending Clean' + ' Market Value ( Local )" value', function() {
      portEndingCleanMarketValueLocal.forEach(function(value, index) {
        if (value !== portEndingCleanMarketValueLocal1[index]) {
          expect(false).customError('"Port. Ending Clean Market Value ( Local )" value is not same  with previous copied value' + ' Expected "' + value + '"; Found :' + portEndingCleanMarketValueLocal1[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Port. Ending Market Value ( Local )" value is same  with previous copied "Port. Ending ' + 'Market Value ( Local )" value', function() {
      portEndidngMarketValueLocal.forEach(function(value, index) {
        if (value !== portEndidngMarketValueLocal1[index]) {
          expect(false).customError('"Port. Ending Market Value ( Local )" value is not same  with previous copied value' + ' Expected "' + value + '"; Found :' + portEndidngMarketValueLocal1[index]);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
