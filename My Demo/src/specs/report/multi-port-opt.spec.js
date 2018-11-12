'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: multi-port-opt', function() {

  // Getting the xpath of the Selected section of columns tab
  var xpathOfSelectedSectionOfColumns = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Selected section of groupings tab
  var xpathOfSelectedSectionOfGroupings = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Selected');

  // Getting the xpath of the Selected section of exclusions tab
  var xpathOfSelectedSectionOfExclusions = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'selected');

  // Local function
  var verifyIfColumnsArePresentInSelectedSection = function(arrExpectedColumnNames) {

    it('Verifying is columns are displayed in the given order in selected section', function() {
      var arrOfColumns = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSectionOfColumns).getChildrenText();

      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }

        for (var j = 0; j < arrOfColumns.length; j++) {
          if (arrOfColumns[j] !== arrExpectedColumnNames[j]) {
            expect(false).customError('Columns are not displayed in the given order. Expected:"' + arrExpectedColumnNames[j] + '" but Found:"' + arrOfColumns[j] + '".');
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });

    var elementName = ['Ticker', 'Ending Price', 'Port. Ending Quantity Held', 'Bench. Ending Quantity Held'];
    it('Verifying "' + elementName + '" is present in gray color', function() {
      var needScreenShot;
      elementName.forEach(function(elementName) {
        element(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedSectionHiddenItem, elementName))).isPresent().
          then(function(grayedOut) {
            if (!grayedOut) {
              expect(false).customError('"' + elementName + '" is not present in grey color.');
              needScreenShot = needScreenShot + 1;
              if (needScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
      });
    });
  };

  describe('Test Step ID: 712510', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/mp_fix', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mp-fix');
    });

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on hamburger icon next to Portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click();

      // Verifying if portfolio widget Drop Down is opened
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Account drop down is not opened.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrAccounts1 = ['Large Cap Core Test', 'MOCK_UP'];
    var arrAccounts2 = [];
    it('Should gets the all accounts from Portfolio Hamburger drop', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio').then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref) {
          ref.getText().then(function(text) {
            arrAccounts2.push(text);
          });
        });
      });
    });

    it('Verifying if Portfolio Hamburger drop down is opened and has the "Large Cap Core Test" and "MOCK_UP', function() {
      for (var i = 0; i < arrAccounts1.length; i++) {
        var count = 0;
        for (var j = 0; j < arrAccounts2.length; j++) {
          if (arrAccounts2[j].indexOf(arrAccounts1[i]) > -1) {
            count = count + 1;
          }
        }

        if (count !== 1) {
          expect(false).customError('"' + arrAccounts1[i] + '" account is not available in Portfolio Hamburger drop down list');
          CommonFunctions.takeScreenShot();
        }

      }
    });

    it('Verifying that "MOCK_UP" account is selected by default', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'MOCK_UP').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"MOCK_UP" is not selected by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Use Multiple Portfolios" check box is checked', function() {
      var xpathOfCheckbox = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckbox).isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is not checked.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 712511', function() {

    it('Should select "OK" button from the "Account" drop down', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      expect(PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class')).not.toContain('active');
    });

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    var arrColumnNames = ['Ticker', 'Security Name', 'Ending Price', 'Port. Ending Quantity Held', 'Port. Ending Weight', 'Bench. Ending Quantity Held', 'Bench. Ending Weight', 'Variation in Ending Weight'];

    // Verifying if the columns are present in given order in selected section
    verifyIfColumnsArePresentInSelectedSection(arrColumnNames);
  });

  describe('Test Step ID: 712512', function() {

    it('Should click on the "Risk Models" tab under "Risk" category in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Large Cap Core Test" from "MOCK_UP" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Large Cap Core Test', undefined, TileOptionsRiskRiskModels.xpathHeaderDropdown);

      // verifying if 'Large Cap Core Test' is selected from "MOCK_UP" dropdown
      ThiefHelpers.verifySelectedDropDownText('Large Cap Core Test', undefined, TileOptionsRiskRiskModels.xpathHeaderDropdown);
    });

    it('Should click on the "Columns" tab in the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Variation in Ending Weight" from the "Selected" list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSectionOfColumns).getItemByText('Variation in Ending Weight').select();

      // Verify if 'Variation in Ending Weight' is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSectionOfColumns).getItemByText('Variation in Ending Weight').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Variation in Ending Weight" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Up arrow" button of selected section', function() {
      ThiefHelpers.getTransferBoxReference().target.up().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrColumnNames = ['Ticker', 'Security Name', 'Ending Price', 'Port. Ending Quantity Held', 'Port. Ending Weight', 'Bench. Ending Quantity Held', 'Variation in Ending Weight', 'Bench. Ending Weight'];

    // Verifying if the columns are present in the selected section
    verifyIfColumnsArePresentInSelectedSection(arrColumnNames);

  });

  describe('Test Step ID: 712513', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var multiHeaders = ['Large Cap Core Test vs. Russell 1000', 'MOCK_UP vs. DEFAULT'];
    var arrColumnNamesIndex = [];
    var arrColumnNames = [];

    multiHeaders.forEach(function(headerName, index) {

      it('Verifying if "Weights" report is calculated with date range "' + headerName + '"', function() {
        SlickGridFunctions.getMultiHeaderNames('Weights').then(function(multiheaderNames) {
          if (multiheaderNames[index] !== headerName) {
            expect(false).customError('"Weights" report did not calculate with date range "' + headerName + '"; Found: ' + multiheaderNames[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Get all the column names from the "Weights" report', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(arrOfColumnNames) {
        arrColumnNames = arrOfColumnNames;
        arrColumnNames.forEach(function(value, index) {
          arrColumnNamesIndex.push(index);
        });
      });
    });

    var arrOfColumns = ['Port. Weight', 'Difference', 'Bench. Weight'];
    multiHeaders.forEach(function(multiheaderName) {
      arrOfColumns.forEach(function(columnName) {
        it('Verify if "' + columnName + '" is present under "' + multiheaderName + '"', function() {
          SlickGridFunctions.getColumnIndex('Weights', columnName, multiheaderName).then(function(index) {
            if (arrColumnNamesIndex.indexOf(index) < 0) {
              expect(false).customError('Expected "' + columnName + '" but Found "' + arrColumnNames[index] + '" for "' + multiheaderName + '".');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 712516', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Columns');

    var arrColumnNames = ['Ticker', 'Security Name', 'Ending Price', 'Port. Ending Quantity Held', 'Port. Ending Weight', 'Bench. Ending Quantity Held', 'Variation in Ending Weight', 'Bench. Ending Weight'];

    // Verifying if the columns are present in the selected section
    verifyIfColumnsArePresentInSelectedSection(arrColumnNames);
  });

  describe('Test Step ID: 712514', function() {

    it('Should click on the "Groupings" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var selectedSectionItems = ['Economic Sector - FactSet', 'Industry - FactSet'];
    selectedSectionItems.forEach(function(itemName) {
      it('verifying if "' + itemName + '" is present in the selected section', function() {
        ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, itemName).getText().then(function(name) {
          if (name !== itemName) {
            expect(false).customError(itemName + 'is not present in the selected section. Found: "' + name + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('verifying if "Industry - FactSet" is selected in selected section by default', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Industry - FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Industry - FactSet" is not selected from the Selected section by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 712515', function() {

    it('Should click on the "Risk Models" tab under "Risk" category on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Large Cap Core Test" from "MOCK_UP" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Large Cap Core Test', undefined, TileOptionsRiskRiskModels.xpathHeaderDropdown);

      // verifying if 'Large Cap Core Test' is selected from from "MOCK_UP" dropdown
      ThiefHelpers.verifySelectedDropDownText('Large Cap Core Test', undefined, TileOptionsRiskRiskModels.xpathHeaderDropdown);
    });

    it('Should click on the "Groupings" tab in the LHP of tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Industry - FactSet" is selected in selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Industry - FactSet').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'Industry - FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Industry - FactSet" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on the Up arrow button of selected section', function() {
      ThiefHelpers.getTransferBoxReference().target.up().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying that "Weights" report is grouped by "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Industry') === -1) {
          expect(false).customError('"Weights" report is not grouped by "Industry".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 712517', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Groupings" tab on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on the Up arrow button of selected section', function() {
      ThiefHelpers.getTransferBoxReference().target.up().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var selectedSectionItems = ['Economic Sector - FactSet', 'Industry - FactSet'];
    selectedSectionItems.forEach(function(itemName) {
      it('verifying if "' + itemName + '" is present in the selected section', function() {
        ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, itemName).getText().then(function(val) {
          if (val !== itemName) {
            expect(false).customError(itemName + 'is not present in the selected section.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 712518', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Exclusions" tab on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if the selected section is blank', function() {
      TileOptionsExclusions.getElementsListFromSelectedSection().count().then(function(count) {
        if (count !== 0) {
          expect(false).customError('Selected section is not blank.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 712519', function() {

    it('Should click on the "Risk Models" tab under "Risk" category on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Large Cap Core Test" from "MOCK_UP" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Large Cap Core Test', undefined, TileOptionsRiskRiskModels.xpathHeaderDropdown);

      // verifying if 'Large Cap Core Test' is selected from from "MOCK_UP" dropdown
      ThiefHelpers.verifySelectedDropDownText('Large Cap Core Test', undefined, TileOptionsRiskRiskModels.xpathHeaderDropdown);
    });

    it('Should click on the "Exclusions" tab on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if the "Economic Sector > Industry" is present in the selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSectionOfExclusions).getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Economic Sector > Industry') {
          expect(false).customError('"Economic Sector > Industry" is not present in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if the "Finance" is present in the selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSectionOfExclusions).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Finance') {
          expect(false).customError('"Finance" is not present in "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 712520', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
