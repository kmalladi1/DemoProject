'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-divide-transfer', function() {

  describe('Test Step ID: 470423', function() {

    // Open default document and un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:;Pa3;Grouping;Divided_test" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('divided-test');
    });

    it('Should enter "pa3 testing" in "Portfolio" widget and select "PA3_TEST.ACCT | Client:" from type ahead', function() {
      PA3MainPage.setPortfolio('pa3 testing', 'PA3_TEST.ACCT | Client:', 'Client:PA3_TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"PA3_TEST.ACCT | Client:" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfWidgetXpath = [PA3MainPage.xpathBenchmarkWidget];
    var arrOfWidgets = ['Benchmark'];
    var arrOfExpectedText = ['RUSSELL:1000'];

    CommonPageObjectsForPA3.verifyWidgetBoxText(arrOfWidgetXpath, arrOfWidgets, arrOfExpectedText);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 470424', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    var arrOfGroupNames1 = ['Economic Sector - FactSet', 'Divide by Region of Domicile - FactSet'];

    it('Verifying if groups are displayed as expected', function() {
      var needScreenShot = 0;
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrOfGroupNames1[i]) {
            expect(false).customError('Expected: "' + arrOfGroupNames1[i] + '" but Found: "' + childArr[i].text + '"');
            needScreenShot++;
            CommonFunctions.takeScreenShot();
          }
        }

      });

    });

    var arrOfGroupNames2 = ['Divide by Region of Domicile - FactSet', 'North America', 'Pacific Rim', 'Advertising/Marketing Services'];
    var arrOfChildNames1 = ['North America', 'Pacific Rim', 'Western Europe'];
    var arrOfChildNames2 = ['Currency', 'Divide by Industry - FactSet', 'Currency'];

    arrOfGroupNames2.forEach(function(groupName, index) {
      it('Verifying if top level items are displayed as stored previously', function() {
        var needScreenShot = 0;
        var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText(groupName);
        var arrOfChildren;
        arrOfChildren = group.getChildrenText();
        arrOfChildren.then(function(childArr) {
          if (groupName === 'Divide by Region of Domicile - FactSet') {
            for (var i = 0; i < childArr.length; ++i) {
              if (childArr[i].text !== arrOfChildNames1[i]) {
                expect(false).customError('Expected: "' + arrOfChildNames1[i] + '" but Found: "' + childArr[i].text + '"');
                needScreenShot++;
                CommonFunctions.takeScreenShot();
              }
            }
          } else {
            if (childArr[0].text !== arrOfChildNames2[index - 1]) {
              expect(false).customError('Expected: "' + arrOfChildNames2[index - 1] + '" but Found: "' + childArr[0].text + '"');
              CommonFunctions.takeScreenShot();
            }
          }

        });

      });
    });

    var arrOfGroups = ['Advertising/Marketing Services', 'Aerospace & Defense', 'Agricultural Commodities/Milling', 'Air Freight/Couriers', 'Airlines', 'Alternative Power Generation', 'Aluminum'];

    arrOfGroups.forEach(function(groupName) {

      it('Verifying if "' + groupName + '" is displayed under "Divide by Industry - FactSet"', function() {
        TileOptionsGroupings.getDirectChildGroup('Divide by Industry - FactSet', groupName).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError('"' + groupName + '" is not displayed under "Divide by Industry - FactSet"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 470425', function() {

    var arrOfRadioButtons = ['Divide'];

    // Select required option from the options pop up and click "OK"
    CommonPageObjectsForPA3.clickOnCogIconNextToItemVerifyAndSelectRequiredOption('Currency', arrOfRadioButtons, 'Divide', false, false, 'North America');

    it('Verifying if "Divide by Currency" is displayed and "Currency" is not displayed below North America of Edit Grouping section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('North America');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr.indexOf('Currency') > -1 && arr.indexOf('Divide by Currency') === -1) {
          expect(false).customError('"Currency" is still displayed below North America.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 470426', function() {

    it('Should drag "Currency" from "Divide by Currency" and drop it under "North America" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet|North America|Divide by Currency', 'U.S. Dollar');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet', 'North America');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('Verifying if the item "U.S. Dollar" is selected', function() {
      ThiefHelpers.getListboxGroup(TileOptionsGroupings.xpathOfSelectedContainer, 'U.S. Dollar', 'Divide by Region of Domicile - FactSet|North America|Divide by Currency').
      isSelected().then(function(selected) {
        if (selected) {
          expect(false).customError('"U.S. Dollar" is selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "U.S. Dollar" is not displayed under "Divide by Industry - FactSet"', function() {
      TileOptionsGroupings.getDirectChildGroup('Divide by Currency', 'U.S. Dollar').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"U.S. Dollar" is not displayed under "Divide by Industry - FactSet"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 470427', function() {

    it('Should drag "Divide by Currency" from "North America" and drop it at top in Selected section', function() {
      var src = TileOptionsGroupings.getDirectChildItemAndActionButton('North America', 'Divide by Currency');
      var dest = element(by.xpath('//tf-transferbox-target-list//tf-listbox//*[normalize-space(.)="Economic Sector - FactSet"]/parent::*/tf-listbox-item-handle'));

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('Verifying that "Divide by Currency" is still displayed below North America.', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('North America');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr.indexOf('Divide by Currency') === -1) {
          expect(false).customError('"Divide by Currency" is not displayed below North America.');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 470429', function() {

    it('Select "Asset Type" in selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Asset Type', 'FactSet').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Asset Type', 'FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Asset Type" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Divide by Region of Domicile - FactSet" is displayed below "Asset Types" in the "Selected" section', function() {
      TileOptionsGroupings.getAllElements('Selected').get(1).getText().then(function(option) {
        if (option === 'Asset Type') {
          TileOptionsGroupings.getAllElements('Selected').get(2).getText().then(function(option) {
            if (option.slice(0, 38) !== 'Divide by Region of Domicile - FactSet') {
              expect(false).customError('"Divide by Region of Domicile - FactSet" is not displayed below "Asset Types" in the "Selected" section.');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

  });

  describe('Test Step ID: 470430', function() {

    it('Should type "Price" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('Price');

      // Verifying that "Price" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'Price') {
          expect(false).customError('Expected: "Price" but Found: "' + text + '" in the "Search" field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(2000);
    });

    it('Should click on "Price to Book" from "FactSet|Equity" in Edit grouping', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should hold "Control" key,', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    var arr = ['Price to Cash Flow', 'Price to Earnings'];

    arr.forEach(function(colName) {
      it('Should select "' + colName + '" from "FactSet|Equity" of Available section', function() {
        TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', colName).click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should drag "Price to Book" from "FactSet|Equity" and drop over "U.S. Dollar" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet|North America|Divide by Currency', 'U.S. Dollar');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('Should release "Control" key,', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "Commercial Services" grouping and click "Show All Groups"', function() {
      SlickGridFunctions.getCellReference('Weights', 'Commercial Services', '', '').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Show All Groups');
        browser.sleep(2000);
      });
    });

    it('Should expand "PE Quintile 1:" from "Commercial Services>Equity Common>U.S. Dollar>P/B Quintile 1:>Price to Cash Flow Quintile 1:" group in the report' +
      ' and verify if it is expanded without any issue', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '', '').then(function(rowdata) {
        PA3MainPage.expandTreeInCalculatedReport('Weights',
          rowdata[1] + '|' + rowdata[2] + '|' + rowdata[3] + '|' + rowdata[4] + '|' + rowdata[5] + '|' + rowdata[6] + '|' + rowdata[7],
          rowdata[1] + '|' + rowdata[2] + '|' + rowdata[3] + '|' + rowdata[4] + '|' + rowdata[5] + '|' + rowdata[6]);

        //Checking if required tree is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights',
          rowdata[1] + '|' + rowdata[2] + '|' + rowdata[3] + '|' + rowdata[4] + '|' + rowdata[5] + '|' + rowdata[6] + '|' + rowdata[7]);
      });
    });

  });

  describe('Test Step ID: 470432', function() {

    // Click on "Economic Sector" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should drag "Price to Book" from "U.S. Dollar" and drop over "Pacific Rim>Divide by Industry - FactSet>Airlines" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet|North America|Divide by Currency|U.S. Dollar', 'Price to Book');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet|Pacific Rim|Divide by Industry - FactSet', 'Airlines');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('Verifying that "Price to Book" is displayed under "Airlines" in the Edit Grouping section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Airlines');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {

        if (childArr[0].text !== 'Price to Book') {
          expect(false).customError('"Price to Book" is not displayed under "Airlines" in the Edit Grouping section');
          CommonFunctions.takeScreenShot();
        }

      });

    });

    it('Should drag "Asset Type" from "FactSet" and drop it between "Divide by Currency" and "U.S. Dollar" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Type');
      var dest = TileOptionsGroupings.getDirectChildItemAndActionButton('North America', 'Divide by Currency');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('Verifying that "Asset Type" is displayed under "North America" in the Edit Grouping section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('North America');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr.indexOf('Asset Type') === -1) {
          expect(false).customError('"Asset Type" is displayed under "North America" in the Edit Grouping section');
          CommonFunctions.takeScreenShot();
        }

      });
    });

  });

  describe('Test Step ID: 470433', function() {

    var arrOfRadioButtons = ['Undivide'];

    // Select required option from the options pop up and click "OK"
    CommonPageObjectsForPA3.clickOnCogIconNextToItemVerifyAndSelectRequiredOption('Divide by Industry - FactSet', arrOfRadioButtons, 'Undivide', false, false, 'Pacific Rim');

    it('verifying if "Industry - FactSet" is present under "Pacific Rim" in the selected section and it does not display industries under it', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Industry - FactSet', 'Divide by Region of Domicile - FactSet|Pacific Rim').getText().then(function(name) {
        if (name !== 'Industry - FactSet') {
          expect(false).customError('"Industry - FactSet" is not present under "Pacific Rim" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470434', function() {

    it('Click on the remove icon next to "Divide by Currency" present under "North America"', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getDirectChildItemAndActionButton('North America', 'Divide by Currency', 'remove')).perform();
      TileOptionsGroupings.getDirectChildItemAndActionButton('North America', 'Divide by Currency', 'remove').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Divide by Currency" is not displayed under "North America" in the Selected section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('North America');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr.indexOf('Divide by Currency') > -1) {
          expect(false).customError('"Divide by Currency" is displayed under "North America" in the Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should drag "Industry - FactSet" from "Pacific Rim" and drop over "Western Europe" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet|Pacific Rim', 'Industry - FactSet');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet', 'Western Europe');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('"Industry - FactSet" is displayed under "Western Europe" in the Selected section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Western Europe');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        if (childArr[0].text !== 'Industry - FactSet') {
          expect(false).customError('"Industry - FactSet" is not displayed under "Western Europe" in the Selected section.');
          CommonFunctions.takeScreenShot();
        }

      });

    });
  });

  describe('Test Step ID: 470435', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Industrial Services > Equity Common > North America" is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Industrial Services|Equity Common|North America');
    });

    // Known issue: RPD:36591723 "Western Europe" is not displayed under "North America"
    it('Verify if only Equity Common is displayed in under North America and it is not expanded', function() {
      SlickGridFunctions.getElementsFromTree('Weights', '', 'Industrial Services|Equity Common|North America').then(function(arr) {
        if (arr.length > 1) {
          expect(false).customError('More then one group is displayed under "North America". If Western Europe is displayed refer "RPD:36591723"' + arr);
          CommonFunctions.takeScreenShot();
        } else {
          arr.forEach(function(columnName) {
            if (columnName !== 'Equity Common') {
              expect(false).customError('"Equity Common" is not displayed in the report. Found: "' + columnName + '".');
              CommonFunctions.takeScreenShot();
            }
          });
        }

      });
    });

  });
});
