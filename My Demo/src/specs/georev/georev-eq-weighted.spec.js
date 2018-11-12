'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: georev-eq-weighted', function() {

  describe('Test Step ID: 592250', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Georev/GeoRev_Country" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('georev-eq-wghted');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('GeoRev');

    it('Verifying if portfolio is displays as "Equal Weight"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'Equal Weight') {
          expect(false).customError('Header of tile is not displayed "Equal Weight". ' + 'Expected: "Equal Weight", Found: "' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if different "Port. Ending Weight" weights are seen in each country grouping', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('GeoRev', 'Port. Ending Weight').then(function(columnValues) {
        columnValues.forEach(function(value, index) {
          for (var i = 0; i < columnValues.length; i++) {
            if (i !== index) {
              if (value === columnValues[i]) {
                expect(false).customError('value "' + value + '" at "' + index + '" is matching with "' + columnValues[i] + '" at "' + i + '".');
                needScreenShot++;
              }
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 592251', function() {

    // Click on report wrench icon and select "Options" from the menu and select Groupings tab
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('GeoRev', 'Groupings');

    it('Should click on "X(Clear All)" button to clear selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathRemoveAll).press().then(function() {}, function() {

        expect(false).customError('Unable to click on "X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').then(function(reference) {
        if (reference.length !== 0) {
          expect(false).customError('"Selected" section is not empty.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "FactSet|Country & Region|FactSet" in "Available" section ', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'FactSet|Country & Region|FactSet', 'FactSet');
    });

    it('Double click on "Currency" to add it to "Selected" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet|Country & Region|FactSet', 'GeoRev Region')).perform();
    });

    it('verifying if "GeoRev Region - FactSet" is present in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'GeoRev Region - FactSet').getText().then(function(name) {
        if (name !== 'GeoRev Region - FactSet') {
          expect(false).customError('"GeoRev Region - FactSet" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('GeoRev');

    it('Verifying if values are seen in the "GeoRev portfolio Exposure" column', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn('GeoRev', 'GeoRev Portfolio Exposure').then(function(columnValues) {
        columnValues.forEach(function(value, index) {
          if (value === '--' || value === '') {
            expect(false).customError('Value is not displayed in "' + index + '" row. Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 657689', function() {

    // Click on report wrench icon and select "Options" from the menu and select Groupings tab
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('GeoRev', 'Groupings');

    it('Should click on "cog" icon next to "GeoRev Region - FactSet" in "Selected" section', function() {
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('GeoRev Region - FactSet').click();

      // Verifying if options popup is appeared
      TileOptionsGroupings.getOptionsButtonOfElementInSelectedSection('GeoRev Region - FactSet', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('Error: Failed to open "Options" popup');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Divide" radio button in option popup', function() {
      TileOptionsGroupings.getRadioBtnFromOptionsPopup('Divide').click().then(function() {}, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button in options popup', function() {
      TileOptionsGroupings.getOkOrCancelButtonOptionsPopuop('OK').click();
    });

    it('Should expand "FactSet|Equity" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'FactSet|Equity', 'FactSet');
    });

    it('Should drag "Price to Book" from "FactSet|Equity" and drop over "Divide by GeoRev Region - FactSet > Americas" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Book');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by GeoRev Region - FactSet', 'Americas');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    it('Should drag "Price to Earnings" from "FactSet|Equity" and drop over "Divide by GeoRev Region - FactSet > Asia/Pacific" in Selected section', function() {
      var src = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Equity', 'Price to Earnings');
      var dest = TileOptionsGroupings.getElementFromSelectedSection('Divide by GeoRev Region - FactSet', 'Asia/Pacific');

      CommonPageObjectsForPA3.dragItemOrGroupFromSourceAndDropUnderTarget(src, dest);
    });

    var arrOfGroupsInSelectedSection = ['Africa & Middle East', 'Americas', 'Asia/Pacific', 'Europe', '[Unassigned]'];
    it('Verifying that "Selected" container is displayed as expected', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getGroupByText('Divide by GeoRev Region - FactSet');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          if (arrOfGroupsInSelectedSection[i] !== childArr[i].text) {
            expect(false).customError('Groups under "" are not displayed as expected. Expected"' + arrOfGroupsInSelectedSection[i] + '" but Found "' + childArr[i].text + '"');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    it('verifying if "Price to Book" is present under "Americas" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Price to Book', 'Americas').getText().then(function(name) {
        if (name !== 'Price to Book') {
          expect(false).customError('"Price to Book" is not present under "Americas" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('verifying if "Price to Earnings" is present under "Asia/Pacific" in the selected section', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Price to Earnings', 'Asia/Pacific').getText().then(function(name) {
        if (name !== 'Price to Earnings') {
          expect(false).customError('"Price to Earnings" is not present under "Asia/Pacific" in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 657691', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - GeoRev');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('GeoRev');

    var arrOfGroupsToBeExpanded = ['Americas', 'Asia/Pacific', 'Europe'];

    arrOfGroupsToBeExpanded.forEach(function(groupName) {
      it('Should expand "' + groupName + '" group in the report', function() {
        PA3MainPage.expandTreeInCalculatedReport('GeoRev', groupName);

        //Checking if required tree is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('GeoRev', groupName);
      });
    });

    var arrOfTotalGroupsInReport = [];
    var arrOfNonGroupItems = [];
    it('Getting group names and non-group names in the report for verification', function() {
      SlickGridFunctions.getAllRowsFromReport('GeoRev').then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef.metadata.type === 'group') {
            arrOfTotalGroupsInReport.push(rowRef[1]);
          } else {
            var str = rowRef[1].replace('&amp;', '&');
            arrOfNonGroupItems.push(str);
          }
        });
      });
    });

    var arrOfGroups = ['Americas', 'Asia/Pacific'];
    var arrOfSubGroups = ['P/B Quintile', 'PE Quintile'];
    arrOfGroups.forEach(function(groupName, index) {
      it('Verify if "' + arrOfSubGroups[index] + '" sub group is displayed under "' + groupName + '"', function() {
        var needScreenShots = 0;
        SlickGridFunctions.getElementsFromTree('GeoRev', '', groupName, '').then(function(childNames) {
          childNames.forEach(function(name) {
            if (name.indexOf(arrOfSubGroups[index]) === -1) {
              expect(false).customError('Expected "' + arrOfSubGroups[index] + '" under "' + groupName + '" but Found"' + name + '"');
              needScreenShots++;
            } else {
              if (arrOfTotalGroupsInReport.indexOf(name) === -1) {
                expect(false).customError('"' + name + '" is not displayed as sub-group under "' + groupName + '" group.');
                CommonFunctions.takeScreenShot();
              }
            }

            if (needScreenShots === 1) {
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Verifying if sub-Groups are not displayed under "Europe"', function() {
      SlickGridFunctions.getElementsFromTree('GeoRev', '', 'Europe', '').then(function(childNames) {
        childNames.forEach(function(itemName) {
          if (arrOfNonGroupItems.indexOf(itemName) === -1) {
            expect(false).customError('"' + itemName + '" is displayed as sub-group under "Europe".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
