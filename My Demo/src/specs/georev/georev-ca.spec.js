'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-ca', function() {

  describe('Test Step ID: 657815', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/georev/georev_ca', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('georev-ca');
    });

    it('Waiting for reports to calculate', function() {
      // Waiting for loading icon to disappear
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if no any dialog is presented', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Composite Assets" report is highlighted in LHP', function() {
      PA3MainPage.getReports('Composite Assets').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Composite Assets" did not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" tile is presented in "GeoRev CA" header', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'GeoRev CA') {
          expect(false).customError('"Contribution" tile did not present in  "GeoRev CA" header');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if grouping hyperlink is "Composite Assets"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(text) {
        if (text !== 'Composite Assets') {
          expect(false).customError('Grouping hyperlink did not set to "Composite Assets"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var rowName = ['Direct', 'iShares MSCI EAFE Index Fund', 'SPDR S&P 500 ETF', '[Cash]'];

    rowName.forEach(function(name) {

      it('Verifying if "' + name + '" is at first level', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, name).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + name + '" did not present at first level');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 657816', function() {

    it('Should click on "Composite Assets" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').click().then(function() {}, function(err) {

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

    it('Should enter "GeoRev" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('GeoRev');

      // Verifying that "GeoRev" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'GeoRev') {
          expect(false).customError('"GeoRev" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    var arr = ['GeoRev Region', 'GeoRev Country'];

    arr.forEach(function(element) {
      it('Should double click on "' + element + '" from the Available section under FactSet > Country & Region > ' + 'FactSet', function() {
        browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', element)).perform();
      });
    });

    var arr1 = ['GeoRev Region - FactSet', 'GeoRev Country - FactSet'];

    arr1.forEach(function(element) {
      it('Verifying if "' + element + '" is moved in Selected section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(element).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + element + '" did not move in to the "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "OK" button from Tile Option Page', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Verifying if "Contribution" report is calculated', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Composite Assets" report is highlighted in LHP', function() {
      PA3MainPage.getReports('Composite Assets').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Composite Assets" did not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" tile is presented in "GeoRev CA" header', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'GeoRev CA') {
          expect(false).customError('"Contribution" tile did not present in  "GeoRev CA" header');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if grouping hyperlink is "Composite Assets"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(text) {
        if (text !== 'Composite Assets') {
          expect(false).customError('Grouping hyperlink did not set to "Composite Assets"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var rowName = ['Direct', 'iShares MSCI EAFE Index Fund', 'SPDR S&P 500 ETF', '[Cash]'];

    rowName.forEach(function(name) {

      it('Verifying if "' + name + '" is at first level', function() {
        PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, name).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + name + '" did not present at first level');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 657817', function() {

    var row = ['Direct', '[Cash]'];

    row.forEach(function(name) {

      it('Verifying if "' + name + '" is already expanded', function() {
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', name);
      });
    });

    var rowName = ['iShares MSCI EAFE Index Fund', 'SPDR S&P 500 ETF'];

    rowName.forEach(function(value) {

      it('Should click on "' + value + '" to expand the element', function() {
        PA3MainPage.expandTreeInCalculatedReport('Contribution', value);

        // Verifying if element tree is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', value);
      });
    });

    var firstGroupElement = ['Africa & Middle East', 'Americas', 'Asia/Pacific', 'Europe'];

    firstGroupElement.forEach(function(name) {

      it('Verifying if "' + name + '" is presented at second level under "Direct"', function() {
        PA3MainPage.getElementFromCalculatedTree('Contribution', 'Direct', name).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + name + '" did not present at second level under "Direct"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var secondGroupElement = ['Africa & Middle East', 'Americas', 'Asia/Pacific', '[Unassigned]'];

    secondGroupElement.forEach(function(name) {
      it('Verifying if "' + name + '" is presented at second level under "iShares MSCI EAFE Index Fund"', function() {
        PA3MainPage.getElementFromCalculatedTree('Contribution', 'iShares MSCI EAFE Index Fund', name).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + name + '" did not present at second level under "iShares MSCI EAFE ' + 'Index Fund"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var thirdGroupElement = ['Africa & Middle East', 'Americas', 'Asia/Pacific', '[Unassigned]'];

    thirdGroupElement.forEach(function(name) {
      it('Verifying if "' + name + '" is presented at second level under "SPDR S&P 500 ETF"', function() {
        PA3MainPage.getElementFromCalculatedTree('Contribution', 'SPDR S&P 500 ETF', name).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + name + '" did not present at second level under "SPDR S&P 500 ETF"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "[Cash]" is presented at second level under "[Cash]"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', '[Cash]', '[Cash]').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"[Cash]" did not present at second level under "[Cash]"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 657818', function() {

    it('Should click on " Direct > Africa & Middle East" to expand the element', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Direct|Africa & Middle East', 'Direct');

      // Verifying if "Direct|Africa & Middle East" tree is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Direct|Africa & Middle East');
    });

    it('Verifying if "[Unassigned]" is not presented at third level under "Direct|Africa & Middle East"', function() {
      PA3MainPage.getElementFromCalculatedTree('Contribution', 'Direct|Africa & Middle East', '[Unassigned]').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"[Unassigned]" presented at third level under "Direct|Africa & Middle East"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
