'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lot-level-general', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var getDataView = function() {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    browser.driver.executeScript('return $(".tf-slick-grid").data("$tfSlickGridController")' +
      '.grid.getData().getItems()').then(function(dataview) {
        defer.fulfill(dataview);
      });

    return promise;
  };

  var ComparingLotIDOfSecurity = function(security) {
    var lotIDs = [];
    getDataView().then(function(dataView) {
      dataView.forEach(function(dataObject) {
        if (dataObject[1] === security) {
          lotIDs.push(dataObject[2]);
        }
      });

      return lotIDs;
    }).then(function(lotIDs) {
      for (var i = 1; i < lotIDs.length; i++) {
        for (var k = 1; k < lotIDs.length; k++) {
          if (i !== k && lotIDs[i] === lotIDs[k]) {
            expect(false).customError(lotIDs[i] + ' and ' + lotIDs[k + 1] + ' are same');
            CommonFunctions.takeScreenShot();
          }
        }
      }
    });
  };

  describe('Test Step ID: Startup Instructions', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 534418', function() {

    it('Should launch the PA3 application with "Client:/Pa3/lot_detail/LOT_LEV_DET_1" document', function() {
      PA3MainPage.switchToDocument('lot-lev-det-1');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Ungrouped report is selected in LHP"', function() {
      PA3MainPage.getReports('Ungrouped').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Ungrouped" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Contribution to Return" report is displayed', function() {
      PA3MainPage.getDateHyperLink().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Contribution to Return" report did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Contribution to Return" report is displayed as "30-JAN-2015 - 25-FEB-2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '30-JAN-2015 - 25-FEB-2015') {
          expect(false).customError('The date range in "Contribution to Return" report did not set to ' +
            '"30-JAN-2015 - 25-FEB-2015"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Security Name" grouping is present in "Contribution to Return" report', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Security Name" grouping did not present in "Contribution to Return" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Contribution to Return" report is grouped by "Security Name"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').getText().then(function(text) {
        if (text.indexOf('Security Name') < 0) {
          expect(false).customError('"Contribution to Return" report did not group by "Security Name"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 534421', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Verifying if the "Expand Lot Level Data" checkbox is greyed out', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isDisabled().then(function(disabled) {
          if (!disabled) {
            expect(false).customError('"Expand Lot Level Data" check box did not disable');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 534422', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Should click on "Portfolio hamburger icon" from the application toolbar', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the drop down is opened', function() {
      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Drop down is not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "B&H" drop down and select "OMS" from the menu', function() {
      // Clicking on the drop down
      PA3MainPage.getDropdownFromAccountsDropdown('Portfolio', 'B&H').click();

      // Selecting OMS from the menu
      ThiefHelpers.getOptionFromDropdown('OMS').click();
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Verifying if the "Expand Lot Level Data" checkbox is enabled', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isDisabled().then(function(disabled) {
          if (disabled) {
            expect(false).customError('"Expand Lot Level Data" check box did not enable');
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 538528', function() {

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox).check();
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if the "EXPAND COMPOSITE ASSETS" drop down is greyed out', function() {
      CommonFunctions.isElementEnabled('dropdown', undefined, TileOptionsUniverse.xpathExpandCompositeAssetsDropDown)
        .then(function(boolean) {
          if (boolean) {
            expect(false).customError('"EXPAND COMPOSITE ASSETS" drop down did not disable');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if the "EXPAND COMPOSITE ASSETS" button is greyed out', function() {
      CommonFunctions.isElementEnabled('button', 'Search Order').then(function(boolean) {
        if (boolean) {
          expect(false).customError('"EXPAND COMPOSITE ASSETS" drop down did not disable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 538529', function() {

    it('Should click on "Columns" tab from LHP to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Columns').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Lot" into the "Search" field of "Available" section', function() {
      TileOptionsColumns.setSearchKeyword('Lot');

      // Wait for search to happen
      browser.sleep(3000);
    });

    it('Should click on "Lot ID" from search result', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Lot ID').then(function(item) {
        item.select();
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Lot ID" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Right" arrow button to add "Lot Purchase Date" to the "Selected" section', function() {
      TileOptionsColumns.getArrowButton('Right').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Lot Purchase Date" is added to the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Lot ID').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Lot ID" did not get added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the up arrow till the "Lot ID" is moved to "third" position', function() {

      var countOfElements;

      TileOptionsColumns.getAllElements('Selected').count().then(function(elements) {
        countOfElements = elements;
      }).then(function() {
        for (var i = 1; i < countOfElements - 2; i++) {
          TileOptionsColumns.getArrowButton('Up').click();
        }
      });

      // Verifying that "Lot ID" is on the third position of "Selected" section
      TileOptionsColumns.getAllElements('Selected').get(2).getText().then(function(text) {
        if (text !== 'Lot ID') {
          expect(false).customError('"Lot ID" did not present in third position of "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Ungrouped report is selected in LHP"', function() {
      PA3MainPage.getReports('Ungrouped').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Ungrouped" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Apple Inc.', 'Electronic Arts Inc.', 'General Electric Company'];

    arr.forEach(function(security) {

      it('Verifying if there are different Lot ID\'s for "' + security + '" security', function() {
        ComparingLotIDOfSecurity(security);
      });
    });

  });

  describe('Test Step ID: 559971', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    it('Should hover over "Lot ID" in the "Selected section" and click on "X" button', function() {
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Lot ID');

      item.getActions().then(function(actions) {
        actions.triggerAction('remove');
      });
    });

    var arrElements = [];
    it('Verifying if "Lot ID" is removed from "Selected" section', function() {
      // Get number of elements in 'Selected' list
      // Getting the xpath of the Selected section
      var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText().then(function(noOfElements) {
        // Check if 'Lot ID' is removed from 'Selected' list
        noOfElements.forEach(function(listItem) {
          arrElements.push(listItem.text);
        });
        if (arrElements.indexOf('Lot ID') > -1) {
          expect(false).customError('"Lot ID" is still present in the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Lot ID" column is not present in the report', function() {
      SlickGridFunctions.getColumnNames('Contribution to Return').then(function(arrColumnNames) {
        if (arrColumnNames.indexOf('Lot ID') >= 0) {
          expect(false).customError('"Lot ID" column is present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 559973', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('Lot Columns', 'Columns');

    it('Should select "Reference" radio button in window', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_ID', '#ED', 'Lot ID'];
    var fieldName = ['Column:', 'Date:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click the up arrow till the "Lot ID" is moved to "third" position', function() {

      var countOfElements;

      TileOptionsColumns.getAllElements('Selected').count().then(function(elements) {
        countOfElements = elements;
      }).then(function() {
        for (var i = 1; i < countOfElements - 2; i++) {
          TileOptionsColumns.getArrowButton('Up').click();
        }
      });

      // Verifying that "Lot ID" is on the third position of "Selected" section
      TileOptionsColumns.getAllElements('Selected').get(2).getText().then(function(text) {
        if (text !== 'Lot ID') {
          expect(false).customError('"Lot ID" did not present in third position of "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Ungrouped report is selected in LHP"', function() {
      PA3MainPage.getReports('Ungrouped').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Ungrouped" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arr = ['Apple Inc.', 'Electronic Arts Inc.', 'General Electric Company'];

    arr.forEach(function(security) {

      it('Verifying if there are different Lot ID\'s for "' + security + '" security', function() {
        ComparingLotIDOfSecurity(security);
      });

    });

  });

  describe('Test Step ID: 557354', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    it('Should expand "Document" from the "Available" section,hover over "Lot ID" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Document', 'Lot ID', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Document" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_PURCHASE_DATE', '#SD', 'Lot PD'];
    var fieldName = ['Column:', 'Date:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Save As" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save As').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Lot PD" column is present in the report', function() {
      SlickGridFunctions.getColumnNames('Contribution to Return').then(function(arrColumnNames) {
        if (arrColumnNames.indexOf('Lot PD') < 0) {
          expect(false).customError('"Lot PD" column did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Lot PD" column is displayed at the end of the report', function() {
      SlickGridFunctions.getColumnNames('Contribution to Return').then(function(arrColumnNames) {
        if (arrColumnNames[arrColumnNames.length - 1] !== 'Lot PD') {
          expect(false).customError('"Lot PD" column did not display at the end of the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544663', function() {

    it('Should click "RPC - L/S + Security Name" report from LHP', function() {
      PA3MainPage.getReports('RPC - L/S + Security Name').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that RPC - L/S + Security Name is selected in LHP
      PA3MainPage.getReports('RPC - L/S + Security Name').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"RPC - L/S + Security Name" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    it('Should type "Lot" into the "Search" field of "Available" section', function() {
      TileOptionsColumns.setSearchKeyword('Lot');

      // Wait for search to happen
      browser.sleep(3000);
    });

    it('Should click on "Lot ID" from search result', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(xpathOfAvailableSection, 'FactSet', 'Lot ID').then(function(item) {
        item.select();
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Lot ID"is not selected from the "Available" container.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "Right" arrow button to add "Lot ID" to the "Selected" section', function() {
      ThiefHelpers.getTransferBoxReference().transferToTarget();
    });

    it('Verifying that "Lot Purchase Date" is added to the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Lot ID').isPresent().then(function(added) {
        if (!added) {
          expect(false).customError('"Lot ID" did not get added to the "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click the up arrow till the "Lot ID" is moved to "third" position', function() {

      var countOfElements;

      TileOptionsColumns.getAllElements('Selected').count().then(function(elements) {
        countOfElements = elements;
      }).then(function() {
        for (var i = 1; i < countOfElements - 2; i++) {
          TileOptionsColumns.getArrowButton('Up').click();
        }
      });

      // Verifying that "Lot ID" is on the third position of "Selected" section
      TileOptionsColumns.getAllElements('Selected').get(2).getText().then(function(text) {
        if (text !== 'Lot ID') {
          expect(false).customError('"Lot ID" did not present in third position of "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if "RPC - L/S + Security Name" is selected in LHP', function() {
      PA3MainPage.getReports('RPC - L/S + Security Name').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"RPC - L/S + Security Name" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Contribution to Return" report is displayed', function() {
      PA3MainPage.getDateHyperLink().isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Contribution to Return" report did not display date range');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the date range of "Contribution to Return" report is displayed as "30-JAN-2015 - 25-FEB-2015"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '30-JAN-2015 - 25-FEB-2015') {
          expect(false).customError('The date range in "Contribution to Return" report did not set to ' +
            '"30-JAN-2015 - 25-FEB-2015"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Long/Short" grouping is present in "Contribution to Return" report', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Long/Short" grouping did not present in "Contribution to Return" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Contribution to Return" report is grouped by "Long/Short"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').getText().then(function(text) {
        if (text.indexOf('Long/Short') < 0) {
          expect(false).customError('"Contribution to Return" report did not group by "Long/Short"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if there are different Lot ID\'s for "Bank of America Corporation" security', function() {
      ComparingLotIDOfSecurity('Bank of America Corporation');
    });

  });

  describe('Test Step ID: 544963', function() {

    it('Should click "Client Cost" report from LHP', function() {
      PA3MainPage.getReports('Client Cost').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Client Cost is selected in LHP
      PA3MainPage.getReports('Client Cost').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Client Cost" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    // Known Issue: RPD:20873443
    var colNames = ['Purchase', 'Sale', 'Port. Realized Profit & Loss Client Cost', 'Port. Unrealized Profit & Loss Client Cost',
      'Port. Total Profit & Loss Client Cost',];
    var totalValues = ['255,878.90', '580,558.01', '-15,867', '7,128', '-8,739'];

    colNames.forEach(function(column, index) {

      it('Verifying if the "Total" row for "' + column + '" is set to "' + totalValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', column, '').then(function(ref) {
          ref.getText().then(function(value) {
            if (value !== totalValues[index]) {
              expect(false).customError('"' + column + '" column did not display "' + totalValues[index] + ' in "Total" row"; Found: ' + value);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

    });

  });

  describe('Test Step ID: 544964', function() {

    it('Should click "Returns" report from LHP', function() {
      PA3MainPage.getReports('Returns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Returns is selected in LHP
      PA3MainPage.getReports('Returns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Returns" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Universe');

    it('Should check "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
              .check();
          }
        });
    });

    it('Verifying if the "Expand Lot Level Data" check box is checked', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox)
        .isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"Expand Lot Level Data" check box did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Total" row for "Port. Total Return" is set to "20.70"', function() {
      SlickGridFunctions.getCellReference('Contribution to Return', 'Total', '', 'Port. Total Return', '').then(function(ref) {
        ref.getText().then(function(value) {
          if (value !== '20.70') {
            expect(false).customError('"Port. Total Return" column did not display "20.70 in "Total" row"; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 557355', function() {

    it('Should click "Ungrouped" report from LHP', function() {
      PA3MainPage.getReports('Ungrouped').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Ungrouped is selected in LHP
      PA3MainPage.getReports('Ungrouped').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Ungrouped" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('Lot Columns', 'Columns');

    it('Should select "New" radio button in window', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });

      // Verifying if the "New" radio button is selected
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_PURCHASE_DATE', '#SD', 'LPD'];
    var fieldName = ['Column:', 'Date:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should select "Client" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Client').select();
        }
      });

      // Verifying if the "Client" radio button is selected
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Client" in the "Available" section and double click on "LPD"', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'LPD', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(itemTODoubleClick) {
              itemTODoubleClick.select();
              itemTODoubleClick.doubleClick();
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "LPD" is added to the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('LPD').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"LPD" did not get added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "LPD" column is displayed in the Report', function() {
      SlickGridFunctions.getColumnNames('Contribution to Return').then(function(arrColumnNames) {
        if (arrColumnNames.indexOf('LPD') < 0) {
          expect(false).customError('"LPD" column did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557356', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    it('Should expand "Client" in the "Available" section,hover over "LPD" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'LPD', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_ID', '#ED', 'LID'];
    var fieldName = ['Column:', 'Date:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomColumns.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should select "Sub-directory" radio button if not already selected', function() {
      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').open();
    });

    it('Should select "Client/Test Column Category" from the drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Client/Test Column Category').click();
    });

    it('Verifying if "Client/Test Column Category" is selected in the "Sub-directory" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Client/Test Column Category') {
          expect(false).customError('"Client/Test Column Category" did not select in the "Sub-directory" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save As" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save As').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Client|Test Column Category" in the "Available" section and double click on "LID"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Test Column Category').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, undefined, 'LID', 'last', subGroup).then(function(indexOfElement) {
                  console.log('indexOfElement' + indexOfElement);
                  var item = subGroup.getItemByIndex(indexOfElement);

                  // Click on the "remove" icon
                  return item.then(function(itemTODoubleClick) {
                    itemTODoubleClick.select();
                    itemTODoubleClick.doubleClick();
                  });
                }, function(error) {
                  expect(false).toBe(error);
                });
              } else {
                expect(false).customError('"Test Column Category" group was not expanded.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "LID" is added to the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('LID').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"LID" did not get added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "LID" column is displayed in the Report', function() {
      SlickGridFunctions.getColumnNames('Contribution to Return').then(function(arrColumnNames) {
        if (arrColumnNames.indexOf('LID') < 0) {
          expect(false).customError('"LID" column did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "LID" column displays data in the report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Contribution to Return', 'LID').then(function(columnData) {
        if (columnData.indexOf('') >= 1) {
          expect(false).customError('"LID" column did not display data in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 557357', function() {

    var parentpath = ['Document', 'Client'];
    var child = ['Lot PD', 'LPD'];

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Columns');

    parentpath.forEach(function(parent, index) {

      it('Should expand "' + parent + '" from the "Available" section,hover over "' + child[index] + '" and click on the "X" button', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText(parent);
        group.expand();
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, parent, child[index], 'last').then(function(indexOfElement) {
              var item = group.getItemByIndex(indexOfElement);

              // Click on the "remove" icon
              return item.then(function(remove) {
                remove.select();
                return remove.getActions().then(function(val) {
                  return val.triggerAction('remove');
                });
              });
            }, function(error) {
              expect(false).toBe(error);
            });
          } else {
            expect(false).customError('"' + parent + '" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
        ThiefHelpers.verifyDialogTitle('Delete Column');

        // Verifying the content
        ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
          content = content.replace(/\n/g, ' ');
          if (content !== 'Are you sure you want to delete this column?') {
            expect(false).customError('"Delete Column" dialog box saying "Are you sure you want to delete ' +
              'this column?" did not appear');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Click "OK" on the "Delete Column" dialog', function() {
        ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Waiting for delete action to be completed', function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000);
      });

    });

    it('Should expand "Client|Test Column Category" from the "Available" section,hover over "LID" and click on the "X" button', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Test Column Category').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                if (expanded) {
                  return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, undefined, 'LID', 'last', subGroup).then(function(indexOfElement) {
                    var item = subGroup.getItemByIndex(indexOfElement);

                    // Click on the "remove" icon
                    return item.then(function(remove) {
                      remove.select();
                      return remove.getActions().then(function(val) {
                        return val.triggerAction('remove');
                      });
                    }, function(error) {
                      expect(false).toBe(error);
                    });
                  });
                } else {
                  expect(false).customError('"Test Column Category" group was not expanded.');
                  CommonFunctions.takeScreenShot();
                }
              } else {
                expect(false).customError('"Client" group was not expanded.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('Client is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('"Delete Column" dialog box saying "Are you sure you want to delete ' +
            'this column?" did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Column" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for delete action to be completed', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000);
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    child.forEach(function(column) {

      it('Verifying if the "' + column + '" column is not present in the report', function() {
        SlickGridFunctions.getColumnNames('Contribution to Return').then(function(arrColumnNames) {
          if (arrColumnNames.indexOf(column) >= 0) {
            expect(false).customError('"' + column + '" column is present in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

  });

  describe('Test Step ID: 557358', function() {

    it('Should click "RPC - L/S + Security Name" report from LHP', function() {
      PA3MainPage.getReports('RPC - L/S + Security Name').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that RPC - L/S + Security Name is selected in LHP
      PA3MainPage.getReports('RPC - L/S + Security Name').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"RPC - L/S + Security Name" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    it('Should click on "Remove All" from "Selected" section', function() {
      TileOptionsColumns.getClearListButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathNewButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Lot Grouping" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Lot Grouping').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "New" radio button in window', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('New').select();
        }
      });

      // Verifying if the "New" radio button is selected
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_PURCHASE_DATE', 'LPD'];
    var fieldName = ['Column:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should select "Client" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Client').select();
        }
      });

      // Verifying if the "Client" radio button is selected
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button to save the settings', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should expand "Client" in the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Client');

      // Verifying if the Client in the available section is expanded
      TileOptionsGroupings.checkIfExpanded('Client');
    });

    it('Should double click on "LPD" under "Client" from the "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Client', 'LPD')).perform();
    });

    it('Verifying that "LPD" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('LPD').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"LPD" did not get added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the data in the report is grouped by date', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element.hasChildren === true) {

            // [Cash] is an expected grouping
            if (element[1] !== '[Cash]') {
              Utilities.isDate(element[1]).then(function(flag) {
                if (!flag) {
                  expect(false).customError('"' + element[1] + '" grouping is not a valid date');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 557359', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    it('Should expand "Client" in the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Client');

      // Verifying if the Client in the available section is expanded
      TileOptionsGroupings.checkIfExpanded('Client');
    });

    it('Hover over "LPD" from "Client" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Client', 'LPD').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Waiting for the dialog to appear
      browser.sleep(2000);
    });

    var dialogText = ['LOT_ID', 'LID'];
    var fieldName = ['Column:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should select "Sub-directory" radio button if not already selected', function() {
      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').open();
    });

    it('Should select "Client/Test Column Category" from the drop down', function() {
      ThiefHelpers.getOptionFromDropdown('Client/Test Column Category').click();
    });

    it('Verifying if "Client/Test Column Category" is selected in the "Sub-directory" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Sub-directory:').getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'Client/Test Column Category') {
          expect(false).customError('"Client/Test Column Category" did not select in the "Sub-directory" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save As" button to save the settings', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save As');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should expand "Client|Test Column Category" in the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Client|Test Column Category', 'Client');

      // Verifying if the Client|Test Column Category in the available section is expanded
      TileOptionsGroupings.checkIfExpanded('Client|Test Column Category');
    });

    it('Should double click on "LID" under "Client/Test Column Category" from the "Available" section', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Client|Test Column Category', 'LID')).perform();
    });

    it('Verifying that "LID" is added to the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('LID').isPresent().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"LID" did not get added to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    // LotID's do not change
    var LotID = ['0108124AP1', '0108124AP10', '0108124AP11', '0108124AP12', '0108124AP13', '0108124AP14', '0108124AP15',
      '0108124AP2', '0108124AP3', '0108124AP4', '0108124AP5', '0108124AP6', '0108124AP7', '0108124AP8', '0108124AP9',];

    it('Verifying if the "Lot ID\'s" are displayed beneath "date" grouping', function() {
      var parentID;
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element[1] === '1/30/2015' && element.hasChildren === true) {
            parentID = element.id;
            dataView.forEach(function(element) {
              if (element.hasChildren === true && element.parentId === parentID) {
                if (LotID.indexOf(element[1]) < 0) {
                  expect(false).customError('"Lot ID\'s" did not display beneath "date" grouping');
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          }
        });
      });
    });

  });

  describe('Test Step ID: 557360', function() {

    var parentpath = ['Client', 'Client|Test Column Category'];
    var child = ['LPD', 'LID'];
    var excludeElements = [undefined, 'Client'];

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    parentpath.forEach(function(parent, index) {

      it('Should expand "' + parent + '" from the "Available" section', function() {
        TileOptionsGroupings.expandElementTree(parent, excludeElements[index]);

        // Verifying the element is expanded
        TileOptionsGroupings.checkIfExpanded(parent);
      });

      it('Hover over "' + child[index] + '" from "' + parent + '" and click on the "X" button', function() {
        TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection(parent, child[index]).click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying that "Delete Grouping" dialog box saying "Are you sure you want to delete this grouping?" appears', function() {
        ThiefHelpers.verifyDialogTitle('Delete Grouping');

        // Verifying the content
        ThiefHelpers.getDialogClassReference('Delete Grouping').getContent().getText().then(function(content) {
          content = content.replace(/\n/g, ' ');
          if (content !== 'Are you sure you want to delete this grouping?') {
            expect(false).customError('"Delete Column" dialog box saying "Are you sure you want to delete this grouping?' +
              '" did not appear');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Click "OK" on the "Delete Grouping" dialog', function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

        ThiefHelpers.getButtonClassReference(undefined, xpath).press();
      });

      it('Waiting for delete action to be completed', function() {
        Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
      });

    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Groupings" are not displayed in the report', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element.hasChildren === true) {
            expect(false).customError('"Groupings" are displayed in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 557361', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathNewButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Lot Grouping" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Lot Grouping').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Reference" radio button in window', function() {
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Reference').select();
        }
      });

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var dialogText = ['LOT_PURCHASE_DATE', 'LPD'];
    var fieldName = ['Column:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed ' +
              'into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Save" button to save the settings', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the data in the report is grouped by date', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element.hasChildren === true) {

            // [Cash] is an expected grouping
            if (element[1] !== '[Cash]') {
              Utilities.isDate(element[1]).then(function(flag) {
                if (!flag) {
                  expect(false).customError('"' + element[1] + '" grouping is not a valid date');
                  CommonFunctions.takeScreenShot();
                }
              });
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 557362', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    it('Should expand "Document" from the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Document');

      // Verifying that "Document" is expanded
      TileOptionsGroupings.checkIfExpanded('Document');
    });

    it('Hover over "LPD" from "Document" and click on the "Edit" icon', function() {
      TileOptionsGroupings.getEditIconForGroupingsInAvailableSection('Document', 'LPD').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Waiting for the dialog to appear
      browser.sleep(2000);
    });

    var dialogText = ['LOT_ID', 'LID'];
    var fieldName = ['Column:', 'Name:'];

    dialogText.forEach(function(text, index) {

      it('Should enter "' + text + '" in the "' + fieldName[index] + '" field', function() {
        // Entering text into the field
        var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathTextBoxFromCreateEditCustomLot,
          fieldName[index]);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText(text);

        // Verifying that requires text is typed into the field
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== text) {
            expect(false).customError('"' + text + '" did not get typed into "' + fieldName[index] + '" field; Found: ' + value);
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Save As" button to save the settings', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save As');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should expand "Document" in the "Available" section', function() {
      TileOptionsGroupings.checkIfExpanded('Document').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          TileOptionsGroupings.expandElementTree('Document');
        }
      });

      // Verifying if the Document in the available section is expanded
      TileOptionsGroupings.checkIfExpanded('Document');
    });

    it('Hover over "LPD" from "Document" and click on the "X" button', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Document', 'LPD').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Delete Grouping" dialog box saying "Are you sure you want to delete this grouping?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Grouping');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Grouping').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'Are you sure you want to delete this grouping?') {
          expect(false).customError('"Delete Column" dialog box saying "Are you sure you want to delete this grouping?' +
            '" did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Grouping" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Waiting for delete action to be completed', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    var LotID = ['0108124AP095', '0108124AP096', '0108124AP097', '0108124AP098', '0108124AP1', '0108124AP10',
      '0108124AP11', '0108124AP12', '0108124AP13', '0108124AP132', '0108124AP14', '0108124AP148', '0108124AP149',
      '0108124AP15', '0108124AP150', '0108124AP16', '0108124AP17', '0108124AP18', '0108124AP19', '0108124AP2', '0108124AP20',
      '0108124AP200', '0108124AP201', '0108124AP21', '0108124AP22', '0108124AP23', '0108124AP24', '0108124AP25',
      '0108124AP251', '0108124AP26', '0108124AP27', '0108124AP275', '0108124AP28', '0108124AP29', '0108124AP3', '0108124AP30',
      '0108124AP4', '0108124AP46', '0108124AP5', '0108124AP6', '0108124AP7', '0108124AP8', '0108124AP9', '0108124EQ93',];

    it('Verifying if the date in the report is grouped by "LOT ID\'s"', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {

          // [Cash] is an expected grouping
          if (element[1] !== '[Cash]' && element.hasChildren === true) {
            if (LotID.indexOf(element[1]) < 0) {
              expect(false).customError('Data in the report did not group by "LotID\'s"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe('Test Step ID: 557363', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution to Return', 'Groupings');

    it('Should expand "Document" from the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('Document');

      // Verifying that "Document" is expanded
      TileOptionsGroupings.checkIfExpanded('Document');
    });

    it('Hover over "LID" from "Document" and click on the "X" button', function() {
      TileOptionsGroupings.getRemoveIconForGroupingsInAvailableSection('Document', 'LID').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Delete Grouping" dialog box saying "Are you sure you want to delete this grouping?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Grouping');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Grouping').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'Are you sure you want to delete this grouping?') {
          expect(false).customError('"Delete Column" dialog box saying "Are you sure you want to delete this grouping?' +
            '" did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Grouping" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Waiting for delete action to be completed', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if the "Groupings" are not displayed in the report', function() {
      getDataView().then(function(dataView) {
        dataView.forEach(function(element) {
          if (element.hasChildren === true) {
            expect(false).customError('"Groupings" are displayed in the report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

});
