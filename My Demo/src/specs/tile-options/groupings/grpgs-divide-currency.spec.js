'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-divide-currency', function() {

  describe('Test Step ID: 517956', function() {

    // Open default document and un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfWidgetXpath = [PA3MainPage.xpathPortfolioWidget, PA3MainPage.xpathBenchmarkWidget];
    var arrOfWidgets = ['Portfolio', 'Benchmark'];
    var arrOfExpectedText = ['CLIENT:/PA3/TEST.ACCT', 'RUSSELL:1000'];

    arrOfWidgetXpath.forEach(function(xpathOfWidget, index) {
      it('Verifying if "' + arrOfWidgets[index] + '" widget is populated with "' + arrOfExpectedText[index] + '"', function() {
        ThiefHelpers.getTextBoxClassReference('', xpathOfWidget).getText().then(function(text) {
          if (text !== arrOfExpectedText[index]) {
            expect(false).customError(arrOfWidgets[index] + 'widget is not populated with "' + arrOfExpectedText[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

  });

  describe('Test Step ID: 695830', function() {

    // Click on "Economic Sector" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    var arrOfOptions = ['Divide'];

    // Click on the cog Wheel next to item and select required option from the options pop up
    CommonPageObjectsForPA3.clickOnCogIconNextToItemVerifyAndSelectRequiredOption('Industry - FactSet', arrOfOptions, 'Divide');

    it('Should drag "Currency" from "FactSet" and drop over "Advertising/Marketing Services" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Industry - FactSet', 'Advertising/Marketing Services');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('verifying if "Currency" is present under "Advertising/Marketing Services" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Currency', 'Advertising/Marketing Services').getText().then(function(name) {
        if (name !== 'Currency') {
          expect(false).customError('"Currency" is not present under "Advertising/Marketing Services" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfTopLevelItemInSelectedSection = [];
    it('Storing the Top level items of selected section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfTopLevelItemInSelectedSection.push(childArr[i].text);
        }
      });

    });

    var arrOfSelectedSectionElements = [];
    it('Storing the items in the selected section for future use', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Divide by Industry - FactSet');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfSelectedSectionElements.push(childArr[i].text);
        }
      });

    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Click on "Economic Sector" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('verifying if "Currency" is present under "Advertising/Marketing Services" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Currency', 'Advertising/Marketing Services').getText().then(function(name) {
        if (name !== 'Currency') {
          expect(false).customError('"Currency" is not present under "Advertising/Marketing Services" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if top level items are displayed as stored previously', function() {
      var needScreenShot = 0;
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrOfTopLevelItemInSelectedSection[i]) {
            expect(false).customError('Expected: "' + arrOfTopLevelItemInSelectedSection[i] + '" but Found: "' + childArr[i].text + '"');
            needScreenShot++;
            CommonFunctions.takeScreenShot();
          }
        }

      });

    });

    it('Verifying if items are displayed as stored previously', function() {
      var needScreenShot = 0;
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Divide by Industry - FactSet');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text !== arrOfSelectedSectionElements[i]) {
            expect(false).customError('Expected: "' + arrOfSelectedSectionElements[i] + '" but Found: "' + childArr[i].text + '"');
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });

    });

  });

  describe('Test Step ID: 517958', function() {

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

    it('Should expand "FactSet|Country & Region|FactSet" in "Available" section ', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'FactSet|Country & Region|FactSet', 'FactSet');
    });

    it('Double click on "Region of Domicile" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet',
        'Region of Domicile')).perform();
    });

    it('verifying if "Region of Domicile - FactSet" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Region of Domicile - FactSet').getText().then(function(name) {
        if (name !== 'Region of Domicile - FactSet') {
          expect(false).customError('"Region of Domicile - FactSet" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfRadioButtons = ['Divide', 'Matrix'];

    // Click on the cog Wheel next to item and verify the options in the options menu
    CommonPageObjectsForPA3.clickOnCogIconNextToItemVerifyAndSelectRequiredOption('Region of Domicile - FactSet', arrOfRadioButtons, undefined, true);

  });

  describe('Test Step ID: 517959', function() {

    // Select required option from the options pop up and click "OK"
    CommonPageObjectsForPA3.clickOnCogIconNextToItemVerifyAndSelectRequiredOption('Region of Domicile - FactSet', undefined, 'Divide', undefined, true);

    // As per Known issue RPD:35789331 and RPD:36591723 this both countries are not displayed in the report
    it('Verifying if "South America" and "Western Europe" are displayed in the selected section', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Divide by Region of Domicile - FactSet');
      var arrOfChildren;
      var arrOfColumns = [];
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }

        if (arrOfColumns.indexOf('South America') >= 0 || arrOfColumns.indexOf('Western Europe') >= 0) {
          expect(false).customError('Known issue with South America and Western Europe is resolved and are displayed in selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // As per Known issue RPD:35789331 and RPD:36591723 this both countries are not displayed in the report
    it('Should drag "Currency" from "FactSet" and drop over "North America" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Currency');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by Region of Domicile - FactSet', 'North America');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    // As per Known issue RPD:35789331 and RPD:36591723 this both countries are not displayed in the report
    it('verifying if "Currency" is present under "North America" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Currency', 'North America').getText().then(function(name) {
        if (name !== 'Currency') {
          expect(false).customError('"Currency" is not present under "North America" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 517957', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "North America" grouping and click "Show All Groups"', function() {
      SlickGridFunctions.getCellReference('Weights', 'North America', '', '').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Show All Groups');
        browser.sleep(2000);
      });
    });

    //verify the factors are in collapsed state in the group
    CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport('Weights', 'North America', 'is expanded', undefined);

    it('Verify if U.S. Dollar is displayed in under North America and it is not expanded', function() {
      SlickGridFunctions.getElementsFromTree('Weights', '', 'North America').then(function(arr) {
        if (arr.indexOf('U.S. Dollar') === -1) {
          expect(false).customError('"U.S. Dollar" is not displayed under "North America" in the report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 690838', function() {

    // Click on the "Exclusions" hyperlink and click on "Edit Groupings" hyper link in the info box
    CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Weights', 'Excluded: Finance', 'selectEditExclusions');

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getTransferBoxReference().target.clear();
    });

    var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
    var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

    it('Expand "North America > U.S. Dollar" and select "3M Company" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('North America');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('U.S. Dollar').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getItemByText('3M Company').then(function(item) {
                  item.select();

                  // Check if '3M Company' is selected
                  item.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError('"3M Company" is not selected from "Available" section');
                      CommonFunctions.takeScreenShot();
                    }
                  });

                });
              } else {
                expect(false).customError('"U.S. Dollar" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"North America" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button ', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying that "Price to Earnings" is added to the "Selected" section', function() {
      ThiefHelpers.getVirtualListBoxItem(xpathSelectedVirtualListBox, 'North America > U.S. Dollar > 3M Company', 'Region of Domicile');
    });
  });

  describe('Test Step ID: 690839', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Click on the "Exclusions" hyperlink and verify if info box appeared
    CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Weights', 'Excluded: 3M Company');

    it('Verify if "North America > U.S. Dollar > 3M Company" is displayed in exclusions pop up', function() {
      ThiefHelpers.getListBoxItem(undefined, 'North America > U.S. Dollar > 3M Company').getText().then(function(name) {
        if (name !== 'North America > U.S. Dollar > 3M Company') {
          expect(false).customError('"North America > U.S. Dollar > 3M Company" is not present in the info-box. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
