'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-grp-level', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var arrOfTrackingErrorof2 = [];

  // Local function
  var compareFourColumnsOFTheReport = function(arrOfTrackingError, arrExpectedTracking1, arrExpectedTracking2, arrExpectedTracking3, arrExpectedTracking4) {
    var needScreenShot = 0;
    arrOfTrackingError.forEach(function(oocuurence, index) {
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          var value = parseFloat(eleRef[oocuurence]).toFixed(2);
          if (index === 0) {
            if (value !== arrExpectedTracking1[rowIndex]) {
              expect(false).customError('Values of "1" occurrence of "Contr. to Tracking Error" is not displayed as expected. ' +
                'Expected: "' + arrExpectedTracking1[rowIndex] + '" but found: "' + value + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          } else if (index === 1) {
            if (value !== arrExpectedTracking2[rowIndex]) {
              expect(false).customError('Values of "2" occurrence of "Contr. to Tracking Error" is not displayed as expected. ' +
                'Expected: "' + arrExpectedTracking2[rowIndex] + '" but found: "' + value + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          } else if (index === 2) {
            if (value !== arrExpectedTracking3[rowIndex]) {
              expect(false).customError('Values of "3" occurrence of "Contr. to Tracking Error" is not displayed as expected. ' +
                'Expected: "' + arrExpectedTracking3[rowIndex] + '" but found: "' + value + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          } else if (index === 3) {
            if (value !== arrExpectedTracking4[rowIndex]) {
              expect(false).customError('Values of "4" occurrence of "Contr. to Tracking Error" is not displayed as expected. ' +
                'Expected: "' + arrExpectedTracking4[rowIndex] + '" but found: "' + value + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }

        });
      });
    });
  };

  // Local function
  var getElementFromSelectedSectionByItsOccurrence = function(columnName, occurrenceNumber) {

    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var columnOccurence = 0;
    var colIndex;
    var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
    children.then(function(childArr) {
      for (var i = 0; i < childArr.length; ++i) {
        if (childArr[i].text === columnName) {
          columnOccurence++;
          if (columnOccurence === occurrenceNumber) {
            colIndex = i;
            defer.fulfill(colIndex);
            break;
          }
        }
      }
    });

    return promise;
  };

  describe('Test Step ID: 698666', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/pa3/risk/Standalone_Risk_Group_Level"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('standalone-risk-group-level');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if header displays "QRISK_BASE_MM_MLOT_GLOBAL.ACTM vs Composite Style Benchmark (QRISK_BASE_MM_MLOT_GLOBAL.ACTM)"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'QRISK_BASE_MM_MLOT_GLOBAL.ACTM vs Composite Style Benchmark (QRISK_BASE_MM_MLOT_GLOBAL.ACTM)') {
          expect(false).customError('Header of application is not showing "QRISK_BASE_MM_MLOT_GLOBAL.ACTM vs Composite Style Benchmark (QRISK_BASE_MM_MLOT_GLOBAL.ACTM)". ' +
            'Expected: "QRISK_BASE_MM_MLOT_GLOBAL.ACTM vs Composite Style Benchmark (QRISK_BASE_MM_MLOT_GLOBAL.ACTM)", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 698667', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Should enter "Contr." in the search field', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Contr.');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'Contr.') {
          expect(false).customError('" Text in search field is not Contr.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding extra time to appear the element
      browser.sleep(2000);
    });

    it('Should select "Contr. to Tracking Error" in available section', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Contr. to Tracking Error').then(function(item) {
        item.select();
      });

      // Verifying if 'Contr. to Tracking Error' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Contr. to Tracking Error').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Contr. to Tracking Error" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on right arrow button for 4 times', function() {
      for (var i = 0; i < 4; i++) {
        ThiefHelpers.sendElementToSelectedSection();
      }
    });

    it('Verifying that "Contr. to Tracking Error" is displayed 4 times in selected section', function() {
      var columnOccurence = 0;
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === 'Contr. to Tracking Error') {
            columnOccurence++;
          }
        }

        if (columnOccurence !== 4) {
          expect(false).customError('"Contr. to Tracking Error" is not displayed for 4 times in the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698668', function() {

    it('Select 2nd Contr. to Tracking Error column in selected section', function() {
      getElementFromSelectedSectionByItsOccurrence('Contr. to Tracking Error', 2).then(function(columnIndex) {
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(columnIndex);
        item.select();
      });

    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Multi-Manager Risk" from "Standalone Risk Method (Group-Level)" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Multi-Manager Risk', 'Standalone Risk Method (Group-Level)');

      // verifying if 'Multi-Manager Risk' is selected from "Standalone Risk Method (Group-Level)" section drop down
      ThiefHelpers.verifySelectedDropDownText('Multi-Manager Risk', 'Standalone Risk Method (Group-Level)');
    });

    it('Select 3nd Contr. to Tracking Error column in selected section', function() {
      getElementFromSelectedSectionByItsOccurrence('Contr. to Tracking Error', 3).then(function(columnIndex) {
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(columnIndex);
        item.select();
      });
    });

    it('Should select "Single-Benchmark Relative Risk" from "Standalone Risk Method (Group-Level)" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Single-Benchmark Relative Risk', 'Standalone Risk Method (Group-Level)');

      // verifying if 'Single-Benchmark Relative Risk' is selected from "Standalone Risk Method (Group-Level)" section drop down
      ThiefHelpers.verifySelectedDropDownText('Single-Benchmark Relative Risk', 'Standalone Risk Method (Group-Level)');
    });

    it('Select 4nd Contr. to Tracking Error column in selected section', function() {
      getElementFromSelectedSectionByItsOccurrence('Contr. to Tracking Error', 4).then(function(columnIndex) {
        var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(columnIndex);
        item.select();
      });
    });

    it('Should select "Group Relative Risk" from "Standalone Risk Method (Group-Level)" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Group Relative Risk', 'Standalone Risk Method (Group-Level)');

      // verifying if 'Group Relative Risk' is selected from "Standalone Risk Method (Group-Level)" section drop down
      ThiefHelpers.verifySelectedDropDownText('Group Relative Risk', 'Standalone Risk Method (Group-Level)');
    });

  });

  describe('Test Step ID: 698669', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on "Refresh" icon from application', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "QRISK_BASE_MM_MLOT_UK_COMP" and select "Show All Groups" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'QRISK_BASE_MM_MLOT_UK_COMP');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Show All Groups');
    });

    it('Wait for the report to load', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(
        SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);

      // Waiting for grid elements to load
      browser.sleep(2000);
    });

    var arrOfTrackingError = [];
    it('Should store the index of occurrence "Contr. to Tracking Error" column in "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(columnNames) {
        columnNames.forEach(function(name, index) {
          if (name === 'Contr. to Tracking Error') {
            arrOfTrackingError.push(index);
            arrOfTrackingErrorof2.push(index);
          }
        });
      });
    });

    var arrExpectedTracking1 = ['4.44', '0.76', '0.40', '0.36', '3.68', '0.59', '3.09'];
    var arrExpectedTracking2 = ['4.44', '6.66', '13.31', '5.75', '5.55', '6.94', '6.60'];
    var arrExpectedTracking3 = ['4.44', '12.60', '14.85', '13.92', '6.93', '8.48', '7.69'];
    var arrExpectedTracking4 = ['4.44', '6.66', '13.31', '5.75', '5.55', '6.94', '6.60'];

    it('Verifying if the values of 4 columns of "Contr. to Tracking Error" displays as expected', function() {
      compareFourColumnsOFTheReport(arrOfTrackingError, arrExpectedTracking1, arrExpectedTracking2, arrExpectedTracking3, arrExpectedTracking4);
    });

  });

  describe('Test Step ID: 698670', function() {

    it('Click on the "QRisk_Base_MM_MLOT_UK_PORT1" group collapse button', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'QRisk_Base_MM_MLOT_UK_PORT1');

      // Verifying that "QRISK_BASE_MM_MLOT_UK_COMP|QRisk_Base_MM_MLOT_UK_PORT1" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'QRisk_Base_MM_MLOT_UK_PORT1');
    });

    it('Verifying the Security level values for 3rd "Contr. to Traking Error" column displayed blank', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef, rowIndex) {
          if (eleRef.metadata.type !== 'group' && eleRef[0] !== 'Total') {

            // Get the 3rd occurrence of "Contr. to Traking Error".
            var value = arrOfTrackingErrorof2[2];
            if (eleRef[value] !== 'NA') {
              expect(false).customError('"' + eleRef[0] + '" security values of 3rd "Contr. to Traking Error" and not displayed as "--" but found: "' + eleRef[value] + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 698671', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying if the "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(reference) {
        if (reference.length !== 0) {
          expect(false).customError('"Selected" section did not get empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand FactSet >Sector & Industry > GICS > GICS - Multi-Sourced in available section', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'FactSet');

      // Verifying if tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced');

    });

    var availableSectionElement = ['Economic Sector', 'Industry Group'];

    availableSectionElement.forEach(function(elementName) {
      it('Should select the item "' + elementName + '" from "Available" container and clicking the right arrow button', function() {
        TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', elementName).click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
        TileOptionsGroupings.getArrowButton('Right').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    availableSectionElement.forEach(function(elementName) {
      it('Verifying that "' + elementName + ' - GICS - Multi-Sourced" is added to the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(elementName + ' - GICS - Multi-Sourced').isPresent().then(function(added) {
          if (!added) {
            expect(false).customError('"' + elementName + ' - GICS - Multi-Sourced" is not added to the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 698672', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Consumer Discretionary" and select "Show All Groups" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Consumer Discretionary');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Show All Groups');
    });

    it('Wait for the report to load', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(
        SlickGridFunctions.xpathSlickGridLoadingSpinner)), 40000);

      // Waiting for grid elements to load
      browser.sleep(2000);
    });

    var arrOfTrackingError = [];
    it('Should store the index of occurrence "Contr. to Tracking Error" column in "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(columnNames) {
        columnNames.forEach(function(name, index) {
          if (name === 'Contr. to Tracking Error') {
            arrOfTrackingError.push(index);
            arrOfTrackingErrorof2.push(index);
          }
        });
      });
    });

    var arrExpectedTracking1 = ['4.44', '1.85', '-0.00', '1.74', '0.12', '0.00', '0.00', '0.25', '0.25', '0.06', '0.03', '0.02', '0.89', '0.83', '0.06', '0.07', '0.07', '1.32', '1.32', '0.01', '0.01', '-0.00', '-0.00', 'NaN', 'NaN'];
    var arrExpectedTracking2 = ['4.44', '1.85', '-0.00', '1.74', '0.12', '0.00', '0.00', '0.25', '0.25', '0.06', '0.03', '0.02', '0.89', '0.83', '0.06', '0.07', '0.07', '1.32', '1.32', '0.01', '0.01', '-0.00', '-0.00', 'NaN', 'NaN'];
    var arrExpectedTracking3 = ['4.44', '10.82', '15.46', '12.97', '25.09', '22.66', '22.66', '51.29', '51.29', '21.08', '24.11', '22.69', '10.37', '11.86', '27.13', '14.16', '14.16', '22.37', '22.37', '16.68', '16.68', '12.82', '12.82', '13.89', '13.89'];
    var arrExpectedTracking4 = ['4.44', '11.13', 'NaN', 'NaN', 'NaN', '25.87', '25.87', 'NaN', 'NaN', '5.14', '4.66', 'NaN', '5.94', '5.38', 'NaN', 'NaN', 'NaN', '24.68', '24.68', '0.52', '0.52', '4.63', '4.63', 'NaN', 'NaN'];

    it('Verifying if the values of 4 columns of "Contr. to Tracking Error" displays as expected', function() {
      compareFourColumnsOFTheReport(arrOfTrackingError, arrExpectedTracking1, arrExpectedTracking2, arrExpectedTracking3, arrExpectedTracking4);
    });

  });

  describe('Test Step ID: 698673', function() {

    it('Should expand "Materials > Materials" in "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Materials|Materials', 'Materials');

      // Verifying that "Commercial Services|Advertising/Marketing Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Materials|Materials');

      //waiting for the elements to load in the browser.
      browser.sleep(3000);
    });

    it('Verifying the Security level values for 3rd "Contr. to Traking Error" column displayed blank', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(eleRef) {
          if (eleRef.metadata.type !== 'group' && eleRef[0] !== 'Total') {
            var value = arrOfTrackingErrorof2[2];
            if (eleRef[value] !== 'NA') {
              expect(false).customError('"' + eleRef[0] + '" security values of 3rd "Contr. to Traking Error" and not displayed as "--" but found: "' + eleRef[value] + '"');
              needScreenShot++;
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 698674', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying if the "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(reference) {
        if (reference.length !== 0) {
          expect(false).customError('"Selected" section did not get empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand FactSet>Sector & Industry > GICS > GICS - Multi-Sourced in available section', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'FactSet');

      // Verifying if tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced');

    });

    it('Should select the item "Economic Sector" from "Available" container and clicking the right arrow button', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|GICS|GICS - Multi-Sourced', 'Economic Sector').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand FactSet > Country & Region > MSCI in available section', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Country & Region|MSCI', 'FactSet');

      // Verifying if tree is expanded
      TileOptionsGroupings.checkIfExpanded('FactSet|Country & Region|MSCI');

    });

    it('Should select the item "Country" from "Available" container and clicking the right arrow button', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|MSCI', 'Country').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var selectedSectionElement = ['Economic Sector - GICS - Multi-Sourced', 'Country - MSCI'];

    selectedSectionElement.forEach(function(elementName) {
      it('Verifying that "' + elementName + ' - GICS - Multi-Sourced" is added to the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(elementName).isPresent().then(function(added) {
          if (!added) {
            expect(false).customError('' + elementName + ' is not added to the "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 698675', function() {

    it('Should Select the "Country - MSCI" from selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Country - MSCI').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying "Country - MSCI" is selected
      TileOptionsGroupings.getElementFromSelectedContainer('Country - MSCI').getAttribute('class').then(
        function(value) {
          if (value.indexOf('selected') === -1) {
            expect(false).customError('"Country - MSCI" is not  selected');
            CommonFunctions.takeScreenShot();
          }
        });

    });

    it('Should click on "cog" icon next to "Country - MSCI" in selected section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Country - MSCI').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Country - MSCI', true).isPresent()
        .then(function(found) {
          if (!found) {
            expect(false).customError('Error: Failed to open "Options" popup');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should select "Matrix" radio button', function() {
      ThiefHelpers.getRadioClassReference('Matrix').select();

      // Verifying if the "Matrix" radio button is selected
      ThiefHelpers.getRadioClassReference('Matrix').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Matrix" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('ok').click();

      // Verifying if options popup is disappeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('Region of Domicile - FactSet', true).isPresent()
        .then(function(found) {
          if (found) {
            expect(false).customError('Error: Failed to close "Options" popup');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying that "Matrix Country - MSCI" is present in the top in "Selected" section', function() {
      TileOptionsGroupings.getAllElements('Selected').get(0).getText().then(function(option) {
        if (option !== 'Matrix Country - MSCI') {
          expect(false).customError(' "Matrix Country - MSCI" is not present in the "Selected" section by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698676', function() {

    it('Should click on the "Columns" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Delete all the columns except "Security Name" and "Contr. to Tracking Error"', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        myArray.forEach(function(elementName) {
          if (elementName !== 'Ticker' && elementName !== 'Security Name' && elementName !== 'Contr. to Tracking Error') {
            var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(elementName);

            // Hover on "childArr[i].text" and click on remove button
            return action.getActions().then(function(remove) {
              return remove.triggerAction('remove');
            });
          }
        });
      });
    });

    it('Delete first 2 occurrences of "Contr. to Tracking Error"', function() {
      for (var i = 0; i < 2; i++) {
        var action2 = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Contr. to Tracking Error');

        action2.getActions().then(function(remove) {
          remove.triggerAction('remove');
        });
      }
    });

    it('Delete the 4th occurrence of "Contr. to Tracking Error"', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        var index = myArray.length - 1;
        var action2 = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByIndex(index);

        action2.getActions().then(function(remove) {
          remove.triggerAction('remove');
        });
      });
    });

    it('Select "Contr. to Tracking Error" from the selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Contr. to Tracking Error').select();

      // Verifying that "Contr. to Tracking Error" is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Contr. to Tracking Error').isSelected()
        .then(function(selected) {
          if (!selected) {
            expect(false).customError('"Contr. to Tracking Error" was not selected ');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Single-Benchmark Relative Risk" is selected from "Standalone Risk Method (Group-Level)" section drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Single-Benchmark Relative Risk', 'Standalone Risk Method (Group-Level)');
    });
  });

  describe('Test Step ID: 698677', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Consumer Discretionary" and select "Collapse All" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Consumer Discretionary');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Collapse All');
    });

    it('Should click on "Refresh" icon from application', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Weights" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(displayed) {
        expect(displayed).customError('"Weights" report is not displayed on the webpage.');
        if (!displayed) {
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

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrOfTrackingError = [];
    it('Should store the index of occurrence "Contr. to Tracking Error" column in "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(columnNames) {
        columnNames.forEach(function(name, index) {
          if (name === 'Contr. to Tracking Error') {
            arrOfTrackingError.push(index);
          }
        });
      });
    });

    var arrExpectedTracking1 = ['13.15', '25.09', '22.66', 'NaN', '21.08', '27.13', 'NaN', '22.37', 'NaN', '13.67', 'NaN'];
    var arrExpectedTracking2 = ['6.97', '10.03', 'NaN', '51.29', 'NaN', '11.86', '14.16', '13.89', '17.03', '13.89', 'NaN'];
    var arrExpectedTracking3 = ['13.07', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN', '18.61', 'NaN', '13.89'];
    var arrExpectedTracking4 = ['4.44', '10.82', '22.66', '51.29', '21.08', '10.37', '14.16', '22.37', '16.68', '12.82', '13.89'];

    it('Verifying if the values of 4 columns of "Contr. to Tracking Error" displays as expected', function() {
      compareFourColumnsOFTheReport(arrOfTrackingError, arrExpectedTracking1, arrExpectedTracking2, arrExpectedTracking3, arrExpectedTracking4);
    });
  });

  describe('Test Step ID: 698678', function() {

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    it('Select "Contr. to Tracking Error" from the selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Contr. to Tracking Error').select();

      // Verifying that "Contr. to Tracking Error" is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Contr. to Tracking Error').isSelected()
        .then(function(selected) {
          if (!selected) {
            expect(false).customError('"Contr. to Tracking Error" was not selected ');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should expand "Risk" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Risk').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Risk" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Group Relative Risk" from "Standalone Risk Method (Group-Level)" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Group Relative Risk', 'Standalone Risk Method (Group-Level)');

      // verifying if 'Group Relative Risk' is selected from "Standalone Risk Method (Group-Level)" section drop down
      ThiefHelpers.verifySelectedDropDownText('Group Relative Risk', 'Standalone Risk Method (Group-Level)');
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfTrackingError = [];
    it('Should store the index of occurrence "Contr. to Tracking Error" column in "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(columnNames) {
        columnNames.forEach(function(name, index) {
          if (name === 'Contr. to Tracking Error') {
            arrOfTrackingError.push(index);
          }
        });
      });
    });

    var arrExpectedTracking1 = ['6.59', 'NaN', '25.87', 'NaN', '5.14', 'NaN', 'NaN', '23.50', 'NaN', '10.22', 'NaN'];
    var arrExpectedTracking2 = ['5.59', '7.86', 'NaN', 'NaN', 'NaN', '5.38', 'NaN', '30.71', 'NaN', 'NaN', 'NaN'];
    var arrExpectedTracking3 = ['1.81', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN', 'NaN', '21.33', 'NaN', 'NaN'];
    var arrExpectedTracking4 = ['4.44', '11.13', '25.87', 'NaN', '5.14', '5.94', 'NaN', '24.68', '0.52', '4.63', 'NaN'];

    it('Verifying if the values of 4 columns of "Contr. to Tracking Error" displays as expected', function() {
      compareFourColumnsOFTheReport(arrOfTrackingError, arrExpectedTracking1, arrExpectedTracking2, arrExpectedTracking3, arrExpectedTracking4);
    });

  });
});

