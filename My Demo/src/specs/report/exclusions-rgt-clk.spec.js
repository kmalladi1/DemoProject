'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: exclusions-rgt-clk', function() {
  // Variable(s)
  var communicationAverage;
  var attAverage;
  var communicationAverageAfterExclude;
  var commAvgWeightAfterCenturyHide;
  var pareference = null;

  describe('Test Step ID: 549967', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    // check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 549964', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', undefined, 'isSelected');

    it('Enter "spn" in the "Portfolio" widget and select ' + '"Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT" from type ahead', function() {
      // Selecting the value to portfolio widget
      PA3MainPage.setPortfolio('spn', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Russell:1000" in the "Benchmark" widget', function() {
      // Clear the widget if some text already exists
      PA3MainPage.getWidgetBox('Benchmark').clear();

      // Enter "Russell:1000" into the "Benchmark" widget
      PA3MainPage.getWidgetBox('Benchmark').sendKeys('Russell:1000', protractor.Key.ENTER);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 549965', function() {

    it('Select "Commercial Services" from the calculated report" ', function() {
      PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').click();

      // Verifying that "Commercial Services" is selected
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').getAttribute('class')).toContain('active');
    });

    it('Right click on the "Commercial Services" and select "Exclusions > Exclude Selected Rows"', function() {

      // Right click on "Commercial Services" and select "Exclusions > Exclude Selected Rows" from the menu
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services'), 'Exclusions|Exclude Selected Rows');

      // Wait for the report calculation load icon to display.
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verify that "Commercial Services" does not appear in the calculated report', function() {
      // Verifying that "Commercial Services" is disappeared from the report
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Commercial Services').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 549966', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Get the value of "Communications" for "Average Weight" column', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution', 'Communications', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(value) {
        communicationAverage = parseFloat(value);
      });
    });

    it('Double Click on "Communications" to expand it', function() {
      // Performing double click operation on "Communications" group to expand.
      var itemReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, 'Communications');
      browser.actions().doubleClick(itemReference).perform();

      // Verifying if "Communications" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Communications');
    });

    it('Get the value of "AT&T Inc." for "Average Weight" column" ', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution', 'AT&T Inc.', 'Average Weight').then(function(value) {
        attAverage = parseFloat(value);
      });
    });

    it('Right click on the "AT&T Inc." and select "Exclusions > Exclude Selected Rows"', function() {

      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 2, 'AT&T Inc.'), 'Exclusions|Exclude Selected Rows');

      // Wait for the report calculation load icon to display.
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('"AT&T Inc." should be excluded from the calculated report" ', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 2, 'AT&T Inc.').isPresent()).toBeFalsy();
    });

    it('Get "Communications" value for "Average Weight" column after excluding "AT&T Inc."', function() {
      // Note communicationAverage value after excluding and verifying
      PA3MainPage.getValueFromCalculatedReport('Contribution', 'Communications', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(value) {
        communicationAverageAfterExclude = parseFloat(value);
      });
    });

    it('Verifying that new "Communications" value = old "Communications" value - "AT&T Inc." value', function() {
      var cal = parseFloat(communicationAverage - attAverage);
      expect(communicationAverageAfterExclude).toBeInBetween(cal - 0.1, cal + 0.1);
    });
  });

  describe('Test Step ID: 549968', function() {

    it('Right click on "CenturyLink, Inc." and select "Exclusions > Hide Selected Rows" from menu', function() {
      PA3MainPage.rightClickAndSelectOption(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 2, 'CenturyLink, Inc.'), 'Exclusions|Hide Selected Rows');

      // Wait for the report calculation load icon to display.
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying that "CenturyLink, Inc." is not displayed in the calculated report" ', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 2, 'CenturyLink, Inc.').isPresent()).toBeFalsy();
    });

    it('Verifying that "Average Weight" value for "Communications" remains unchanged', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution', 'Communications', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(value) {
        commAvgWeightAfterCenturyHide = parseFloat(value);
      }).then(function() {
        // Verification of "Average Weight" value for "Communications" after performing "Hide Selected Rows" operation.
        expect(commAvgWeightAfterCenturyHide).toEqual(communicationAverageAfterExclude);
      });
    });
  });

  describe('Test Step ID: 549969', function() {
    // Variable(s)
    var itemReference;

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Groupings');

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathRemoveAll).press()
        .then(function() {
        }, function() {

          expect(false).customError('Unable to click on "X" button');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying that "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(reference) {
        if (reference.length !== 0) {
          expect(false).customError('"Selected" section did not get empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "FactSet > Equity" from "Available" section', function() {
      // Expanding tree path "FactSet > Equity"
      TileOptionsGroupings.expandElementTree('FactSet|Equity', 'FactSet');

      // Verifying if "FactSet > Equity" is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Equity');
    });

    it('Should double click on "Price to Book" to add it to "Selected" section', function() {

      // Obtain reference of "Factset > Equity > Price to Book".
      itemReference = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book');

      // Perform double click to add element to "Selected" section
      browser.actions().doubleClick(itemReference).perform();
    });

    it('Verifying if "Price to Book" is added to the "Selected" section', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Price to Book').isPresent()).toBeTruthy();
    });

    it('Should expand "Additional Options" section', function() {
      expect(TileOptionsGroupings.expandSectionInOptionsPane('Additional Options')).toBeTruthy();

      // Wait for "Additional Options" section to expand
      browser.sleep(3000);
    });

    it('Should select "Group before Exclusions" radio button in "Exclusions"', function() {
      TileOptionsGroupings.getSectionRadioBtn('Additional Options', 'Group before Exclusions', true);

      // Verifying "Group before Exclusions" radio button is checked
      TileOptionsGroupings.getSectionRadioBtn('Additional Options', 'Group before Exclusions', false).getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('"Group before Exclusions" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on the OK button to close Tile Options Mode
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying that report is grouped by "Price to Book"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Contribution').getText()).toEqual('Price to Book');
    });

    it('Should display "P/B Quintile " or "[N/A]" groups', function() {
      var eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
      eleRefs.each(function(element) {
        element.getText().then(function() {}, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRefs.then(function(reference) {
        reference.forEach(function(eleRef) {
          eleRef.getText().then(function(value) {
            if (value.indexOf('P/B Quintile ') > -1 || value.indexOf('N/A') > -1) {
              if (value.indexOf('P/B Quintile 1') > -1) {
                pareference = eleRef;
              }
            } else {
              expect(value).toContain('P/B Quintile ');
            }
          });
        });
      }).then(function() {
        expect(pareference).not.toBe(null);
      });
    });
  });

  describe('Test Step ID: 549970', function() {

    it('Should Exclude "P/B Quintile 1" group', function() {
      PA3MainPage.rightClickAndSelectOption(pareference, 'Exclusions|Exclude Selected Rows');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should not display "P/B Quintile 1" group after "Exclude" ', function() {
      var eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
      eleRefs.each(function(element) {
        element.getText().then(function() {}, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRefs.then(function(reference) {
        reference.forEach(function(eleRef) {
          eleRef.getText().then(function(value) {
            if (value.indexOf('P/B Quintile 1') > -1) {
              expect(eleRef.isPresent()).toBeFalsy();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 549972', function() {

    // Variable(s)
    var refernece;

    it('Verifying "P/B Quintile 3" group is displayed', function() {

      var eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
      eleRefs.each(function(element) {
        element.getText().then(function() {}, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Obtain the reference of "P/B Quintile 3" grouping
      eleRefs.then(function(reference) {
        reference.forEach(function(eleRef) {
          eleRef.getText().then(function(value) {
            if (value.indexOf('P/B Quintile 3') > -1) {
              refernece = eleRef;
            }
          });
        });
      }).then(function() {
        expect(refernece).not.toBe(null);
      });
    });

    it('Should Exclude "P/B Quintile 3" group', function() {
      PA3MainPage.rightClickAndSelectOption(refernece, 'Exclusions|Exclude Selected Rows');

      // Wait for the report calculation load icon to display.
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should not display "P/B Quintile 3" group after "Exclude" ', function() {
      var eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
      eleRefs.each(function(element) {
        element.getText().then(function() {}, function(error) {

          if (error.name === 'StaleElementReferenceError') {
            eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
          } else {
            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          }
        });
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          eleRefs = PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1);
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      eleRefs.then(function(reference) {
        reference.forEach(function(eleRef) {
          eleRef.getText().then(function(value) {
            if (value.indexOf('P/B Quintile 3') > -1) {
              expect(eleRef.isPresent()).toBeFalsy();
            }
          });
        });
      });
    });
  });
});
