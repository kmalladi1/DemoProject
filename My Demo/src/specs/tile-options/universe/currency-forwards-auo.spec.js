'use strict';

require(__dirname + '/../../../index.js');

var callArray = [];
var putArray = [];

var verifyDropDownValuesSelected = function(array) {

  array.forEach(function(dropDown, index) {
    it('Verifying if "' + array[index].dropDown + '" drop down is set to "' + array[index].valueSet + '"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsAssetTypeAddRemove.xpathSelectedSectionDropdown, array[index].dropDown);
      ThiefHelpers.getDropDownSelectClassReference(array[index].dropDown, xpath).getSelectedText().then(function(text) {
        if (text !== array[index].valueSet) {
          expect(false).customError(array[index].dropDown + ' drop down did not set to "' + array[index].valueSet + '" option, Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
};

describe('Test Case: currency-forwards-auo', function() {

  describe('Test Step ID: 716884', function() {

    // Open default document and un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Universe/PV_FWD12" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pv-fwd12');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');

    it('Verifying if "Contribution" report is selected in LHP', function() {
      // Verifying if 'Contribution' is selected
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution').then(function(ele) {
        ele.getAttribute('class').then(function(val) {
          if (val.indexOf('selected') === -1) {
            expect(false).customError('"Contribution" report from LHP is not selected');
          }
        }, function(err) {

          expect(false).customError(err);
        });
      });
    });
  });

  describe('Test Step ID: 717001', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Add/Remove', 'Asset Types', 'Document Options');

    it('Should expand "Derivatives>Forwards >[Currency Forward]" and select "Value Currency Forwards" from available container', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathAvailableContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]', undefined).select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathAvailableContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Value Currency Forwards" is not selected from the "Derivatives > Forwards > [Currency Forward]" group from available container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on right arrow button to move element to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsAssetTypeAddRemove.xpathTransforBox);
    });

    it('Verifying if "Value Currency Forwards" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathSelectedContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]').getText().then(function(name) {
        if (name !== 'Value Currency Forwards') {
          expect(false).customError('"Value Currency Forwards" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Value Currency Forwards" under "Derivatives>Forwards >[Currency Forward]" from selected container', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathSelectedContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]', 'Derivatives|Forwards|[Currency Forward]').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathSelectedContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Value Currency Forwards" is not selected from the "Derivatives > Forwards > [Currency Forward]" group from available container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var array = [{dropDown: 'Computation Method', valueSet: 'Logarithmic Interpolation'}, {
      dropDown: 'Valuation Method',
      valueSet: 'Single Leg Interpolation',
    }, {dropDown: 'Apply Discount Factor', valueSet: 'Enable Discount Factor'}, {dropDown: 'Apply To Indirect', valueSet: 'Yes'},];

    verifyDropDownValuesSelected(array);
  });

  describe('Test Step ID: 717002', function() {

    var setDropDownValues = [{
      dropDown: 'Computation Method',
      valueSet: 'Linear Interpolation',
    }, {dropDown: 'Valuation Method', valueSet: 'Two Legs Interpolation'},];

    setDropDownValues.forEach(function(dropDown, index) {
      it('Should  select "' + setDropDownValues[index].valueSet + '" from "' + setDropDownValues[index].dropDown + '" drop down', function() {
        var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsAssetTypeAddRemove.xpathSelectedSectionDropdown, setDropDownValues[index].dropDown);
        ThiefHelpers.getDropDownSelectClassReference(setDropDownValues[index].dropDown, xpath).selectItemByText(setDropDownValues[index].valueSet);
      });
    });

    verifyDropDownValuesSelected(setDropDownValues);

    // Click on "OK" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document options');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution to Return');
  });

  describe('Test Step ID: 717003', function() {

    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Save As…');

    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('CURR_FWD', undefined, true);

    it('Verify that "PERSONAL:CURR_FWD" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:CURR_FWD') === -1) {
          expect(false).customError('"PERSONAL:CURR_FWD" is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 717004', function() {

    it('Should open "Personal:CURR_FWD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('curr-fwd');
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Add/Remove', 'Asset Types', 'Document Options');

    it('Should select "Value Currency Forwards" under "Derivatives>Forwards >[Currency Forward]" from selected container', function() {
      ThiefHelpers.expandAndGetListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathSelectedContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]', 'Derivatives|Forwards|[Currency Forward]').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(DocumentOptionsAssetTypeAddRemove.xpathSelectedContainer, 'Value Currency Forwards', 'Derivatives|Forwards|[Currency Forward]').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Value Currency Forwards" is not selected from the "Derivatives > Forwards > [Currency Forward]" group from available container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var array = [{dropDown: 'Computation Method', valueSet: 'Linear Interpolation'}, {
      dropDown: 'Valuation Method',
      valueSet: 'Two Legs Interpolation',
    }, {dropDown: 'Apply Discount Factor', valueSet: 'Enable Discount Factor'},];

    verifyDropDownValuesSelected(array);
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document options');

  });

  describe('Test Step ID: 811202', function() {

    it('Should open "Client:/Pa3/general/Warrant_Test" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('warrant-test');
    });

    //Check if the report is calculated and rasies an issue if not
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Percent of Total Holdings');

    it('Should click on Portfolio Hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on Portfolio Hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Portfolio Hamburger drop down is displayed', function() {
      ThiefHelpers.isDropDownOpen(1).then(function(status) {
        if (!status) {
          expect(false).customError('Portfolio Hamburger drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Warrant Test" portfolio is set to OMS Mode in B&H Dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('OMS', undefined, PA3MainPage.xpathBAndHDropDown);
    });

    it('Should click on Portfolio Hamburger icon to close the account dropdown', function() {
      PA3MainPage.getHamburgerIcon('portfolio').click().then(function() {
      }, function() {
        expect(false).customError('Cannot close Portfolio Hamburger dropdown');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should get indices for Call and Put values from "Put or Call" column for future reference', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Percent of Total Holdings', 'Call or Put')
        .then(function(values) {
          values.forEach(function(value, index) {
            if (value === 'Call') {
              callArray.push(index);
            }

            if (value === 'Put') {
              putArray.push(index);
            }
          });
        });
    });

    it('Should check if "Port Shares No Delta" column values will display 1000 and 500 for Call and Put asset types respectively', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Percent of Total Holdings', 'Port. Shares No Delta')
        .then(function(values) {
          values.forEach(function(value, index) {
            if (putArray.includes(index)) {
              if (value !== '500.0') {
                expect(false).customError('Value at Row No: ' + index + ' of Port. Shares No Delta is not 500; Found: ' + value);
                CommonFunctions.takeScreenShot();
              }
            } else if (callArray.includes(index)) {
              if (value !== '1000.0') {
                expect(false).customError('Value at Row No: ' + index + ' of Port. Shares No Delta is not 1000; Found: ' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
    });

    it('Should check if "Port Shares Delta" column values will not display 1000 and 500 for Call and Put asset types respectively', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Percent of Total Holdings', 'Port. Shares Delta')
        .then(function(values) {
          values.forEach(function(value, index) {
            if (putArray.includes(index)) {
              if (value === '500.0') {
                expect(false).customError('Value at Row No: ' + index + 'of Port. Shares Delta is 500; Found: ' + value);
                CommonFunctions.takeScreenShot();
              }
            }

            if (callArray.includes(index)) {
              if (value === '1000.0') {
                expect(false).customError('Value at Row No: ' + index + 'of Port. Shares Delta is 1000; Found: ' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
    });
  });

  describe('Test Step ID: 811203', function() {

    // Clicks on report's wrench icon then selects options then selects columns from LHP
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Percent of Total Holdings', 'Columns');
    var secondIndex;
    var referenceOfSelectedListbox = ThiefHelpers.getVirtualListboxClassReference(CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected'));
    it('Should calculate second "Port. Ending Quantity Held" index for future use', function() {
      var token = false;
      referenceOfSelectedListbox.getChildrenText().then(function(children) {
        children.forEach(function(child, index) {
          if (child.text === 'Port. Ending Quantity Held') {
            if (token === true) {
              secondIndex = index;
            } else {
              token = true;
            }
          }
        });
      });
    });

    it('Should select second "Port. Ending Quantity Held" column is the selected section', function() {
      referenceOfSelectedListbox.getItemByIndex(secondIndex).select();
    });

    it('Should verify if "Port. Ending Quantity Held" is present in selected section', function() {
      //Verifies if the "Port. Ending Quantity Held" is present in th selected section
      CommonPageObjectsForPA3.verifyIfElementIsPresentInSelectedSection('Port. Ending Quantity Held', CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected'));
    });

    it('Should expand "Additional Options" from "Select an Option" dropdown', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(value) {
        if (!value) {
          expect(false).customError('"Additional Options" section is not expanded in accordion pane');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Disable Delta Adjustment" option ', function() {
      ThiefHelpers.selectOptionFromDropDown('Disable Delta Adjustment', undefined, TileOptionsColumns.xpathSelectAnOptionDropdown);

    });

    it('Should verify if "Disable Delta Adjustment" is selected from "Select an option" Dropdown',  function() {

      TileOptionsColumns.getSelectedItemsOfSelectAnOptionDropdown()
        .then(function(itemsArray) {
          var items = [];
          itemsArray.forEach(function(item) {
            item.getText().then(text => items.push(text));
          });
          return items;
        })
        .then(function(items) {
          if (!items.includes('Disable Delta Adjustment')) {
            expect(false).customError('"Disable Delta Adjustment" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });

    });

    // Clicks on OK for 'Tile Options - Percent of Total Holdings' and checks if the 'Tile Options - Percent of Total Holdings' is exited
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', ' Tile Options - Percent of Total Holdings');

    // Verifies if the report is calculated successfully
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Percent of Total Holdings');

    it('Verifying that "Port Shares delta" column will display 1000 and 500 for Call and Put asset types repectively', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Percent of Total Holdings', 'Port. Shares Delta')
        .then(function(values) {
          values.forEach(function(value, index) {
            if (putArray.includes(index)) {
              if (value !== '500.0') {
                expect(false).customError('Value at Row No: ' + index + 'of Port. Shares Delta is not 500');
                CommonFunctions.takeScreenShot();
              }
            }

            if (callArray.includes(index)) {
              if (value !== '1000.0') {
                expect(false).customError('Value at Row No: ' + index + 'of Port. Shares Delta is not 1000');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
    });
  });
});
