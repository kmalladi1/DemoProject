'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: support-cols-lhp rpts', function() {

  // Variable(s)
  var arrFactsetWeightCategories = ['Portfolio', 'Benchmark', 'Variation', 'Valuation', 'Price Changes', 'High Low',
    'Prices', 'Estimates', 'GeoRev Data', 'Risk', 'Monte Carlo Risk','Historical Simulation Risk', 'MPT Risk', 'Historical Risk',
    'Stress Testing', 'Fixed Income', 'Derivatives', 'Equity Scenario Analysis', 'Liquidity', 'Security Exposures', 'Decision Analysis - Beta',
    'Analytics Data Feed', 'RBICS Revenue Data', 'Symbol', 'Analyst Performance Measurement - Beta',];

  var arrFactsetAttributionCategories = ['Portfolio', 'Benchmark', 'Variation', '3 Factor Attribution', '2 Factor Attribution',
    'Geometric Attribution', 'Top Down Attribution', 'Macro Attribution', 'Fixed Income Performance Attribution',
    'Fixed Income Return Attribution', 'Alpha-Beta Attribution', 'Balanced Attribution', 'Risk-Based Attribution', 'Factor Impact',
    'Valuation', 'Price Changes', 'High Low', 'Prices', 'Estimates', 'GeoRev Data', 'Risk', 'Monte Carlo Risk', 'Historical Simulation Risk',
    'MPT Risk', 'Historical Risk', 'Stress Testing', 'Fixed Income', 'Derivatives', 'Equity Scenario Analysis', 'Liquidity',
    'Security Exposures', 'Decision Analysis - Beta', 'Analytics Data Feed', 'RBICS Revenue Data', 'Symbol', 'Analyst Performance Measurement - Beta', 'Total Attribution - Beta',];

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 558418', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.switchToDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 558417', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', undefined, 'isSelected');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Verifying if categories under "FactSet" category', function() {
      // Variable(s)
      var j = 0;
      var flag = 0;
      var i = 0;
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet').getChildrenText();
      var myArray = [];

      var categories = function(j) {
        if (myArray.indexOf(arrFactsetWeightCategories[j]) === -1) {
          flag = flag + 1;
          expect(false).customError('"' + myArray[j] + '" is not matched with expected category ' +
            '"' + arrFactsetWeightCategories[j] + '" of index ' + j);
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      };

      children.then(function(childArr) {
        for (i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        // Verifying if column categories count under 'FactSet' category is not equal to '0'
        if (myArray.length !== 0) {
          for (j = 0; j < myArray.length; j++) {
            categories(j);
          }
        }

      });

    });

  });

  describe('Test Step ID: 558419', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`Cancel`, `Tile Options - Weights`);

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Attribution', true, 'isSelected');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Columns');

    it('Verifying categories under "FactSet" category', function() {

      // Variable(s)
      var j = 0;
      var flag = 0;
      var i = 0;
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet').getChildrenText();
      var myArray = [];

      var categories = function(j) {
        if (myArray.indexOf(arrFactsetAttributionCategories[j]) === -1) {
          flag = flag + 1;
          expect(false).customError('"' + myArray[j] + '" is not matched with expected category ' +
            '"' + arrFactsetAttributionCategories[i] + '"');
          if (flag === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      };

      children.then(function(childArr) {
        for (i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        // Verifying if column categories count under 'FactSet' category is not equal to '0'
        if (myArray.length !== 0) {
          for (j = 0; j < myArray.length; j++) {
            categories(j);
          }
        }

      });
    });

  });

  describe('Test Step ID: 642575', function() {

    it('Should type "3 Fact" in the "Available" search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('3 Fact');

      // Verifying that "3 Fact" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== '3 Fact') {
          expect(false).customError('"3 Fact" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search action to execute
      browser.sleep(3000);
    });

    it('Verify that results with "3 Fact" are displayed in the "Available" section', function() {
      TileOptionsColumns.getAllElementsFromAvailAfterSearch().each(function(element) {
        Utilities.makeElementVisible(element);
        element.getText().then(function(value) {
          if (value.indexOf('3 Fact') === -1) {
            expect(false).customError('This "' + value + '"results displayed in the "Available" section' +
              ' does not contain "3 Fact".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 558420', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`Cancel`, `Tile Options - Attribution`);

  });

});
