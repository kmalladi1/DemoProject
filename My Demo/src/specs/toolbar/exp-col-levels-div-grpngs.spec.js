'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: exp-col-levels-div-grpngs', function() {

  var countries = ['North America', 'South America', 'Western Europe', '[Unassigned]'];

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 678987', function() {

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should type "spn" in the "Portfolio" widget text box and select "SPN_SP50_ACCT.ACCT|Client/new_pa_test_suite/pricing/" from the type ahead', function() {
      PA3MainPage.setPortfolio('spn', 'SPN_SP50_ACCT.ACCT | Client:/new_pa_test_suite/pricing/', 'Client:/new_pa_test_suite/pricing/SPN_SP50_ACCT.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"SPN_SP50_ACCT.ACCT|Client/new_pa_test_suite/pricing/" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "RUSSELL:1000" in "Benchmark" widget and hit Enter key.', function() {
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).setText('RUSSELL:1000');

      // Verifying that "RUSSELL:1000" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(text) {
        if (text !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not entered in "Benchmark" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying if header displays "SPN_SP50_ACCT vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'SPN_SP50_ACCT vs Russell 1000') {
          expect(false).customError('Header of application is not displayed as expected. Expected: "SPN_SP50_ACCT vs Russell 1000", ' + 'Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678989', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Select "Asset Class" from "FactSet" in "Available" section', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Asset Class" is selected
      TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('"Asset Class" is not selected from the Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow button to add "Asset Class" to the "Selected" section', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Asset Class" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Asset Class" is not added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should expand "Equity" from the "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Equity');
    });

    it('Verifying if the "Equity" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Equity');
    });
  });

  describe('Test Step ID: 678993', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Asset Class');

    it('Should expand "Country & Region > Factset" from the "Available" section', function() {
      // Expanding element tree
      TileOptionsGroupings.expandElementTree('FactSet|Country & Region|FactSet', 'FactSet');

      // Verifying if tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Country & Region|FactSet');
    });

    it('Should select "Region of Domicile" from the "Available" section', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'Region of Domicile').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Region of Domicile" is selected
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'Region of Domicile').getAttribute('class').then(function(value) {
        if (value.indexOf('selected') < 0) {
          expect(false).customError('"Region of Domicile" is not selected from the Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Should click on "cog" icon next to "Region of Domicile - FactSet" in selected section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Options" popup is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Divide" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Divide').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Options" popup is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying if "Equity" is present in the first level of report', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'slick-pane slick-pane-bottom slick-pane-left').then(function(reference) {
        reference.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (text !== 'Equity') {
              expect(false).customError('"Equity" is not present in the first level of report; Found: ' + text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if the "Equity" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Equity');
    });

    var elementsoflevel2 = [];

    it('Recording the groups present in level 2', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataObjects) {
        dataObjects.forEach(function(rowref) {
          if (rowref.level === 1) {
            elementsoflevel2.push(rowref[0]);
          }
        });
      });
    });

    // As per Known issue RPD:35789331 and RPD:36591723 this both countries are not displayed in the report
    var countries = ['South America', 'Western Europe'];

    countries.forEach(function(country, index) {
      it('Verifying if the "' + country + '" country is present in level 2', function() {
        if (country === elementsoflevel2[index]) {
          expect(false).customError('"' + country + '" is present in the second level of report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    //var countries1 = ['North America', 'South America', 'Western Europe'];
    var countries1 = ['North America'];

    countries1.forEach(function(country, index) {

      it('Verifying if the "' + country + '" country is present in level 2', function() {
        if (country !== elementsoflevel2[index]) {
          expect(false).customError('"' + country + '" is not present in the second level of report; Found: ' + elementsoflevel2[index]);
          CommonFunctions.takeScreenShot();
        }
      });

      it('Verifying if the "' + country + '" country is expanded', function() {
        SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataObjects) {
          dataObjects.forEach(function(rowref) {
            if (rowref.level === 1 && rowref[0] === country) {
              if (rowref.expanded !== true) {
                expect(false).customError('"' + country + '" grouping is not expanded');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 678996', function() {

    // As per Known issue RPD:35789331 and RPD:36591723 this both countries are not displayed in the report
    //var countries1 = ['North America', 'South America', 'Western Europe'];
    var countries1 = ['North America'];
    countries1.forEach(function(country) {

      it('Should click on minus next to "' + country + '" grouping', function() {
        PA3MainPage.expandTreeInCalculatedReport('Weights', 'Equity|' + country, 'Equity', 'pane');

        // Verifying if the element is collapsed
        PA3MainPage.isTreeExpanded('Weights', country, 'slick-pane slick-pane-bottom slick-pane-left').then(function(expandedStatus) {
          if (expandedStatus) {
            expect(false).customError('"' + country + '" grouping is not collapsed');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(true).customError('');
        });
      });
    });

    it('Should right click on "Equity" grouping and hover over "Expand" option', function() {
      SlickGridFunctions.getCellReference('Weights', 'Equity', '', '').then(function(reference) {
        PA3MainPage.rightClickOnGivenElement(reference);
      });

      // Clicking over "Expand"
      PA3MainPage.getOptionAfterRightClickOnReport('Expand').click();
    });

    var options = ['All', 'Level 1', 'Level 2'];
    var submenu = [];
    var options1 = ['All', 'Level 2'];

    it('Recording the options in the sub menu in an array for verification', function() {
      PA3MainPage.getAllOptionsAfterRightClickOnReport('Submenu').each(function(ref) {
        ref.getText().then(function(value) {
          submenu.push(value);
        });
      });
    });

    options.forEach(function(option, index) {

      it('Verifying if the "' + option + '" option is present in the submenu', function() {
        if (option !== submenu[index]) {
          expect(false).customError('"' + option + '" option is not present in the submenu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    options1.forEach(function(option) {

      it('Verifying if the "' + option + '" option is enabled in the submenu', function() {
        PA3MainPage.getOptionFromCustomMenu('Expand|' + option).getAttribute('data-disabled').then(function(flag) {
          if (flag !== null) {
            expect(false).customError('"Expand|' + option + '" option is disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the "Level 1" option is disabled in the submenu', function() {
      PA3MainPage.getOptionFromCustomMenu('Expand|Level 1').getAttribute('data-disabled').then(function(flag) {
        if (flag === null) {
          expect(false).customError('"Expand|Level 1" option is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 678997', function() {

    it('Should select "Level 2" from the drop down', function() {
      PA3MainPage.getOptionFromCustomMenu('Expand|Level 2').click();
      browser.sleep(3000);
    });

    countries.forEach(function(country) {

      it('Verifying if the "' + country + '" country is expanded', function() {
        SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataObjects) {
          dataObjects.forEach(function(rowref) {
            if (rowref.level === 1 && rowref[0] === country) {
              if (rowref.expanded !== true) {
                expect(false).customError('"' + country + '" grouping is not expanded');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 678998', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "cog" icon next to "Divide by Region of Domicile - FactSet" in selected section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Region of Domicile - FactSet').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Divide by Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Options" popup is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Undivide" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Undivide').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Options" popup is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Asset Class" from the selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').click();
    });

    it('Should click on "cog" icon next to "Asset Class" in selected section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Asset Class').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Asset Class', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Options" popup is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Matrix" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Matrix').click().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Options" popup is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    var columns = ['Port. Weight', 'Bench. Weight', 'Difference'];

    it('Verifying if 3 columns are present under "Equity" multiheader', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Equity').then(function(range) {
        range.forEach(function(colindex, index) {
          SlickGridFunctions.getColumnNames('Weights').then(function(colArray) {
            if (colArray[colindex] !== columns[index]) {
              expect(false).customError('Expected columns are not present under "Equity" multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if only three columns are present under "Equity" multiheader', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Equity').then(function(range) {
        if (range.length !== 3) {
          expect(false).customError('Three columns are not present under "Equity" multiheader; Found: ' + range.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if 3 columns are present under "Total" multiheader', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Total').then(function(range) {
        range.forEach(function(colindex, index) {
          SlickGridFunctions.getColumnNames('Weights').then(function(colArray) {
            if (colArray[colindex] !== columns[index]) {
              expect(false).customError('Expected columns are not present under "Total" multiheader');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if only three columns are present under "Total" multiheader', function() {
      PA3MainPage.getColumnNumberRangeForMultiHeader('Weights', 'Total').then(function(range) {
        if (range.length !== 3) {
          expect(false).customError('Three columns are not present under "Total" multiheader; Found: ' + range.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the report is expanded', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataObjects) {
        dataObjects.forEach(function(rowref) {
          if (rowref.hasChildren !== undefined) {
            if (rowref.expanded !== true) {
              expect(false).customError('Report is not in expanded form');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
      browser.sleep(3000);
    });
  });

  describe('Test Step ID: 679003', function() {

    it('Should right click on "North America" grouping and click "Collapse All"', function() {
      SlickGridFunctions.getCellReference('Weights', 'North America', '', '').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Collapse All');
        browser.sleep(2000);
      });
    });

    it('Verifying if the report is Collapsed', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataObjects) {
        dataObjects.forEach(function(rowref) {
          if (rowref.hasChildren !== undefined) {
            if (rowref.expanded === true) {
              expect(false).customError('Report is not in collapsed form');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 679015', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should double click on "Currency" from the Available section under "FactSet"', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency')).perform();
    });

    it('Verifying that "Currency" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Currency').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Currency" is not added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    // As per Known issue RPD:35789331 and RPD:36591723 this both countries are not displayed in the report
    //var countries1 = ['North America', 'South America', 'Western Europe'];
    var countries1 = ['North America'];
    countries1.forEach(function(country) {
      it('Should expand "' + country + '" from the "Weights" report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Weights', country);
      });

      it('Verifying if the "' + country + '" is expanded', function() {
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', country);
      });
    });

    countries1.forEach(function(country, index) {
      it('Verifying that "U.S. Dollar" is displayed beneath the "' + country + '"', function() {
        PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).get(index).getText().then(function(value) {
          if (value.indexOf(country) === -1) {
            expect(false).customError('"' + country + '" is not found in the report');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });

        // Verifying that "U.S. Dollar" fall under "country"
        PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 2).get(0).getText().then(function(text) {
          if (text.indexOf('U.S. Dollar') === -1) {
            expect(false).customError('U.S. Dollar" is not under "' + country + '"');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });
  });

  describe('Test Step ID: 679105', function() {

    it('Should right click on "North America" grouping and hover over "Collapse"', function() {
      SlickGridFunctions.getCellReference('Weights', 'North America', '', '').then(function(reference) {
        PA3MainPage.rightClickOnGivenElement(reference);
      });

      // Clicking over "Collapse"
      PA3MainPage.getOptionAfterRightClickOnReport('Collapse').click();
    });

    var options = ['Level 1', 'Level 2'];
    var submenu = [];

    it('Recording the options in the sub menu in an array for verification', function() {
      PA3MainPage.getAllOptionsAfterRightClickOnReport('Submenu').each(function(ref) {
        ref.getText().then(function(value) {
          submenu.push(value);
        });
      });
    });

    options.forEach(function(option, index) {

      it('Verifying if the "' + option + '" option is present in the submenu', function() {
        if (option !== submenu[index]) {
          expect(false).customError('"' + option + '" option is not present in the submenu');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Level 1" option is enabled in the submenu', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').getAttribute('data-disabled').then(function(flag) {
        if (flag !== null) {
          expect(false).customError('"Collapse|Level 1" option is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Level 2" option is disabled in the submenu', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 2').getAttribute('data-disabled').then(function(flag) {
        if (flag === null) {
          expect(false).customError('"Collapse|Level 2" option is enabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 679167', function() {

    it('Should select "Level 1" from the drop down', function() {
      PA3MainPage.getOptionFromCustomMenu('Collapse|Level 1').click();
      browser.sleep(2000);
    });

    it('Verifying if the groupings in the report are collapsed', function() {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataObjects) {
        dataObjects.forEach(function(rowref) {
          if (rowref.expanded === true) {
            expect(false).customError('Groupings in the report are not collapsed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
