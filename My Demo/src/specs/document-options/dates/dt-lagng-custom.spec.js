'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: dt-lagng-custom', function() {

  var columnNames = ['Port. Ending Price', 'Bench. Ending Price'];

  var refOfSelectedContainer = CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupings.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'Selected');

  var refOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupings.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'Available');

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsDatesDateLagging.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(DocumentOptionsDatesDateLagging.xpathOfSelectedOrAvailableSection, 'Available');

  var scrollGridElementsToTop = function() {

    var totalNumberOfRows;

    browser.driver.executeScript(function() {

      var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');

      // Collecting length of total number of rows
      var totalRowCount = slickObject.grid.getDataLength();

      return totalRowCount;
    }).then(function(value) {

      totalNumberOfRows = value;

      while (totalNumberOfRows > 300) {

        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', totalNumberOfRows - 300);

        // Waiting for the elements to load
        browser.sleep(2000);

        if (totalNumberOfRows > 300) {
          totalNumberOfRows = totalNumberOfRows - 300;
        }
      }

      browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowToTop( arguments[ 0 ] )', 1);
    }).then(function() {
      browser.sleep(2000);
    });
  };

  describe('Test Step ID: 582082', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "date-lagging-custom" document from "Client:/Pa3/Dates/"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('date-lagging-custom');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "05-JAN-2016" date is displayed', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(date) {
        if (date !== '05-JAN-2016') {
          expect(false).customError('"05-JAN-2016" date hyperlink is not displayed instead "' + date + '" date is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Weights" report is grouped by "Country of Exchange"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(groupName) {
        if (groupName !== 'Country of Exchange') {
          expect(false).customError('"Weights" report is not grouped by "Country of Exchange" instead "' + groupName + '" is' + ' found');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 582083', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Lagging', 'Dates', 'document options');

    it('Disabiling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should wait until Securities is loading in the "Available" section', function() {
      Utilities.waitUntilElementDisappears(ThiefHelpers.buildReference(DocumentOptionsDatesDateLagging.xpathDataSpinner), 180000);
      browser.ignoreSynchronization = false;
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Verifying if "Country of Exchange - FactSet" item is highlighted in the selected section', function() {
      ThiefHelpers.getListBoxItem(refOfSelectedContainer, 'Country of Exchange - FactSet', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Country of Exchange - FactSet" is not selected from the Available section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 582450', function() {

    it('Should click on "Clear All/X" button to clear groupings in selected section of "Edit Groupings" dialog', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsExclusionsEditGroupings.xpathOfDialogTransferBox).target.clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Client" in "Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(refOfAvailableSection, 'Date_Lagging_Custom_Grouping', 'Client').select();
    });

    it('Should click "Right" arrow button to add "BofA Merrill Lynch" to "Selected" container', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsExclusionsEditGroupings.xpathOfDialogTransferBox);
    });

    it('Verifying if "Date_Lagging_Custom_Grouping" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(refOfSelectedContainer, 'Date_Lagging_Custom_Grouping').getText().then(function(name) {
        if (name !== 'Date_Lagging_Custom_Grouping') {
          expect(false).customError('"Date_Lagging_Custom_Grouping" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Verifying if view changed to "Document Options"', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });

      browser.ignoreSynchronization = true;
    });

    it('Should wait until Securities is loading in the "Available" section', function() {
      Utilities.waitUntilElementDisappears(ThiefHelpers.buildReference(DocumentOptionsDatesDateLagging.xpathDataSpinner), 180000);
      browser.ignoreSynchronization = false;
    });

    it('Verifying if the "Selected" section is empty', function() {
      DocumentOptionsDatesDateLagging.getAllListElements('Selected').then(function(elementsInSelectedSection) {
        if (elementsInSelectedSection > 0) {
          expect(false).customError('Selected" section is not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 582451', function() {

    var elements = ['AUSTRALIA > AGL Energy Limited', 'AUSTRALIA > Alumina Limited', 'UNITED STATES'];
    var elementsUnderAustraliaGroup = ['AGL Energy Limited', 'Alumina Limited'];

    it('Should expand "AUSTRALIA" and verifying if "AUSTRALIA" is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('AUSTRALIA');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"AUSTRALIA" grouping from available section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    elementsUnderAustraliaGroup.forEach(function(element) {

      it('Should select "' + element + '" in "Available" section', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('AUSTRALIA');

        group.getItemByText(element).then(function(subGroup) {
          subGroup.select();

          // Check if item is selected
          subGroup.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"' + element + '" did not selected from "Available" section');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Should click "Right" arrow button', function() {
        ThiefHelpers.sendElementToSelectedSection(DocumentOptionsDatesDateLagging.xpathTransferBox);
      });
    });

    it('Should collapse "Australia" from "Available" section and verify if the grouping is collapsed', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('AUSTRALIA');
      group.collapse();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          expect(false).customError('"AUSTRALIA" grouping from available section is not collapsed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "United States" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('UNITED STATES');
      group.select();

      // Verifying if "United States" is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"United States" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsDatesDateLagging.xpathTransferBox);
    });

    it('Verifying if "AGL Energy Limited", "Alumina Limited" is within "Date_Lagging_Custom_Grouping" in selected section', function() {
      var arrElements = [];
      var flag = 0;
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Date_Lagging_Custom_Grouping').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrElements.push(element.text);
        });
      }).then(function() {
        elements.forEach(function(element) {
          if (arrElements.indexOf(element) < 0) {
            flag = flag + 1;
            expect(false).customError(element + ' is not found in the selected section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 582452', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Should scroll to the top of the grid', function() {
      scrollGridElementsToTop();
    });

    it('Should bring "Australia" group into view in the grid', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Australia', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "Australia" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Australia');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Australia" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Australia" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should bring "Australia > AGL Energy Limited" into view in the grid', function() {
      SlickGridFunctions.getRowIndex('Weights', 'AGL Energy Limited', '', 'Australia').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Verifying if For "Australia>AGL Energy Limited" security, the "Port. Ending Price" is "12.94" and "Bench. Ending Price"' + ' is "12.75"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'AGL Energy Limited', '', column, '', 'Australia').then(function(cellReference) {
          cellReference.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(12.94).toFixed(2)) {
                expect(false).customError('For "Australia>AGL Energy Limited" security, the expected "Port. Ending Price"' + ' is "12.94" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(12.75).toFixed(2)) {
                expect(false).customError('For "Australia>AGL Energy Limited" security, the expected "Bench. Ending Price"' + ' is "12.75" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verifying if For "Australia>Alumina Limited" security, the "Port. Ending Price" is "0.81" and "Bench. Ending Price"' + ' is "0.78"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Alumina Limited', '', column, '', 'Australia').then(function(cellReference) {
          cellReference.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(0.81).toFixed(2)) {
                expect(false).customError('For "Australia>Alumina Limited" security, the expected "Port. Ending Price"' + ' is "0.81" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(0.78).toFixed(2)) {
                expect(false).customError('For "Australia>Alumina Limited" security, the expected "Bench. Ending Price"' + ' is "0.78" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verifying if For "Australia>Amcor Ltd" security, the "Port. Ending Price" and "Bench. Ending Price"' + ' is "9.30"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Amcor Ltd', '', column, '', 'Australia').then(function(cellReference) {
          cellReference.getText().then(function(value) {
            if (column === 'Port. Ending Price' || column === 'Bench. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(9.30).toFixed(2)) {
                expect(false).customError('For "Australia>Amcor Ltd" security, the expected "' + column + '" is "9.30"' + 'instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should collapse "Australia" group in the "Weights" report', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function(expandedStatus) {
        if (expandedStatus) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Australia');
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should scroll and bring "United States" group into view', function() {

      // Scroll to the bottom of the grid to load data in the grid
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid to load data in the grid
      scrollGridElementsToTop();

      // Scroll "United States" into view
      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowToTop( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "United States" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'United States');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "United States" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"United States" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if For "United States>Aaron\'s, Inc." security, the "Port. Ending Price" and "Bench. Ending Price"' + ' is "23.12"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Aaron&#39;s, Inc.', '', column, '', 'United States').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price' || column === 'Bench. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(23.12).toFixed(2)) {
                expect(false).customError('For "United States>Aaron\'s, Inc." security, the expected "' + column + '" is "23.12"' + 'instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Verifying if For "United States>ADT Corporation" security, the "Port. Ending Price" is "32.41" and "Bench. Ending Price"' + ' is "32.36"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'ADT Corporation', '', column, '', 'United States').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(32.41).toFixed(2)) {
                expect(false).customError('For "United States>ADT Corporation" security, the expected "Port. Ending Price"' + ' is "32.41" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(32.36).toFixed(2)) {
                expect(false).customError('For "United States>ADT Corporation" security, the expected "Bench. Ending Price"' + ' is "32.36" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 582981', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Lagging', 'Dates', 'document options');

    it('Dis-abiling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should wait until Securities is loading in the "Available" section', function() {
      Utilities.waitUntilElementDisappears(ThiefHelpers.buildReference(DocumentOptionsDatesDateLagging.xpathDataSpinner), 180000);
      browser.ignoreSynchronization = false;
    });

    it('Should select "EGYPT" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('EGYPT');
      group.select();

      // Verifying if "EGYPT" is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"EGYPT" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsDatesDateLagging.xpathTransferBox);
    });

    it('Should remove "UNITED STATES" in the "Selected" section by clicking on "X"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Date_Lagging_Custom_Grouping');
      group.getItemByText('UNITED STATES').then(function(item) {
        item.select();

        return item.getActions().then(function(actions) {
          return actions.triggerAction('remove');
        });
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid.
      scrollGridElementsToTop();
    });

    it('Should bring "Australia" group into view in the grid', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Australia', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "Australia" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Australia');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Australia" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Australia" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid to load elements
      scrollGridElementsToTop();

      // Bring "Australia" group into view
      SlickGridFunctions.getRowIndex('Weights', 'AGL Energy Limited', '', 'Australia').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Verifying if For "Australia>AGL Energy Limited" security, the "Port. Ending Price" is "12.94" and "Bench. Ending Price"' + ' is "12.75"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'AGL Energy Limited', '', column, '', 'Australia').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(12.94).toFixed(2)) {
                expect(false).customError('For "Australia>AGL Energy Limited" security, the expected "Port. Ending Price"' + ' is "12.94" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(12.75).toFixed(2)) {
                expect(false).customError('For "Australia>AGL Energy Limited" security, the expected "Bench. Ending Price"' + ' is "12.75" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should collapse "Australia" in the "Weights" report', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function(expandedStatus) {
        if (expandedStatus) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Australia');
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should scroll to the bottom of the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid to load data in the grid
      SlickGridFunctions.scrollRowToTop('Weights', 20);
    });

    it('Should bring "United States" group into view', function() {
      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "United States" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'United States');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "United States" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"United States" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if For "United States>3M Company" security, the "Port. Ending Price" and "Bench. Ending Price"' + ' is "147.46"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getRowData('Weights', '3M Company', '').then(function(rowData) {
          SlickGridFunctions.getColumnIndex('Weights', column).then(function(colIndex) {
            var value = rowData[colIndex];
            if (parseFloat(value).toFixed(2) !== parseFloat(147.46).toFixed(2)) {
              expect(false).customError('For "United States > 3M Company" security, "' + column + '" column is expected to display "147.46"' + 'instead "' + value + '" is displayed');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should collapse "United States" in the "Weights" report', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function(expandedStatus) {
        if (expandedStatus) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'United States');
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should scroll to the bottom of the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid.
      scrollGridElementsToTop();
    });

    it('Should bring "Egypt" group into view', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Egypt', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "Egypt" if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Egypt').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Egypt');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Egypt" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Egypt').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Egypt" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if For "Egypt>Talaat Moustafa Group Holding" security, the "Port. Ending Price"' + ' is "0.83" and "Bench. Ending Price" is "0.84"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Talaat Moustafa Group Holding', '', column, '', 'Egypt').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(0.83).toFixed(2)) {
                expect(false).customError('For "Egypt>Talaat Moustafa Group Holding" security, the expected "Port. Ending Price"' + ' is "0.83" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(0.84).toFixed(2)) {
                expect(false).customError('For "Egypt>Talaat Moustafa Group Holding" security, the expected "Bench. Ending Price"' + ' is "0.84" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 582982', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Weights by Date', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid
      scrollGridElementsToTop();
    });

    it('Should bring "08-JAN-2016" group into view in the grid', function() {
      SlickGridFunctions.getRowIndex('Weights', '08-JAN-2016', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowToTop( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "08-JAN-2016" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '08-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '08-JAN-2016', '', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "08-JAN-2016" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '08-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"08-JAN-2016" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid
      scrollGridElementsToTop();
    });

    it('Should bring "Egypt" group into view in the grid', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Egypt', '', '08-JAN-2016').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowToTop( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "Egypt" group under "08-JAN-2016" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '08-JAN-2016|Egypt', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '08-JAN-2016|Egypt', '11-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Egypt" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '08-JAN-2016|Egypt', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Egypt" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if For "Egypt>Commercial International Bank (Egypt) SAE" security, the "Port. Ending Price" and "Bench. Ending Price"' + ' is "4.86"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Commercial International Bank (Egypt) SAE', '', column, '', '08-JAN-2016|Egypt').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price' || column === 'Bench. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(4.86).toFixed(2)) {
                expect(false).customError('For "Egypt>Commercial International Bank (Egypt) SAE" security, the expected "' + column + '" is "4.86"' + 'instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should collapse "08-JAN-2016" in the "Weights" report', function() {
      PA3MainPage.isTreeExpanded('Weights', '08-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function(expandedStatus) {
        if (expandedStatus) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '08-JAN-2016', '', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "11-JAN-2016" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '11-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '11-JAN-2016', '', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "11-JAN-2016" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '11-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"11-JAN-2016" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Egypt" group under "11-JAN-2016" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '11-JAN-2016|Egypt', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', '11-JAN-2016|Egypt', '11-JAN-2016', 'grid-canvas grid-canvas-top grid-canvas-left expandable');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Egypt" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', '11-JAN-2016|Egypt', 'grid-canvas grid-canvas-top grid-canvas-left expandable').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Egypt" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // Scroll to the top of the grid
      scrollGridElementsToTop();
    });

    it('Should bring "Egypt" group into view in the grid', function() {
      browser.sleep(2000);
      SlickGridFunctions.getRowIndex('Weights', 'Egypt', '', '11-JAN-2016').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Verifying if For "Egypt>Talaat Moustafa Group Holding" security, the "Port. Ending Price" is "0.83" and "Bench. Ending Price"' + ' is "0.77"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Talaat Moustafa Group Holding', '', column, '11-JAN-2016|Egypt').then(function(cellReference) {
          cellReference.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(0.83).toFixed(2)) {
                expect(false).customError('For "Egypt>Talaat Moustafa Group Holding" security, the expected "Port. Ending Price"' + ' is "0.83" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(0.77).toFixed(2)) {
                expect(false).customError('For "Egypt>Talaat Moustafa Group Holding" security, the expected "Bench. Ending Price"' + ' is "0.77" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 583066', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on "U.S. Dollar" currency dropdown', function() {
      PA3MainPage.getCurrencyDropDown().click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "U.S. Dollar" Currency drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Japanese Yen" from "Currency" dropdown', function() {
      PA3MainPage.getDropDownItem('Japanese Yen').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Japanese Yen" from "Currency" dropdown');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Japanese Yen" is selected in "Currency" dropdown', function() {
      PA3MainPage.getCurrencyDropDown().getText().then(function(item) {
        if (item.indexOf('Japanese Yen') < 0) {
          expect(false).customError('"Japanese Yen" is not selected in "Currency" dropdown');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Should bring "Australia" group into view', function() {

      // Scroll to the top of the grid
      scrollGridElementsToTop();

      SlickGridFunctions.getRowIndex('Weights', 'Australia', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "Australia" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Australia');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Australia" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Australia" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if For "Australia>AGL Energy Limited" security, the "Port. Ending Price" is "1,543.87" and "Bench. Ending Price"' + ' is "1,519.09"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'AGL Energy Limited', '', column, '', 'Australia').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            value = value.replace(/\,/g, '');
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(1543.87).toFixed(2)) {
                expect(false).customError('For "Australia>AGL Energy Limited" security, the expected "Port. Ending Price"' + ' is "1543.87" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(1519.09).toFixed(2)) {
                expect(false).customError('For "Australia>AGL Energy Limited" security, the expected "Bench. Ending Price"' + ' is "1,519.09" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });

    it('Should collapse "Australia" in the "Weights" report', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Australia').then(function(expandedStatus) {
        if (expandedStatus) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Australia');
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();

      // scroll to the top of the grid
      scrollGridElementsToTop();
    });

    it('Should bring "Egypt" group into view', function() {
      SlickGridFunctions.getRowIndex('Weights', 'Egypt', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "Egypt" if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Egypt').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'Egypt');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Egypt" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'Egypt').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"Egypt" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if For "Egypt>Global Telecom Holding S.A.E." security, the "Port. Ending Price" is "30.77" and "Bench. Ending Price"' + ' is "30.74"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', 'Global Telecom Holding S.A.E.', '', column, '', 'Egypt').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(30.77).toFixed(2)) {
                expect(false).customError('For "Egypt>Global Telecom Holding S.A.E." security, the expected "Port. Ending Price"' + ' is "30.77" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(30.74).toFixed(2)) {
                expect(false).customError('For "Egypt>Global Telecom Holding S.A.E." security, the expected "Bench. Ending Price"' + ' is "30.74" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 583067', function() {

    var checkCheckBoxes = ['Bench. Prices/Shares', 'Bench. Exch. Rates'];
    var uncheckCheckBoxes = ['Port. Prices/Shares', 'Port. Exch. Rates'];

    it('Should click on "Japanese Yen" currency drop down', function() {
      PA3MainPage.getCurrencyDropDown().click().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Japanese Yen" Currency drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "U.S. Dollar" from "Currency" drop down', function() {
      PA3MainPage.getDropDownItem('U.S. Dollar').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "U.S. Dollar" from "Currency" drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "U.S. Dollar" is selected in "Currency" drop down', function() {
      PA3MainPage.getCurrencyDropDown().getText().then(function(item) {
        if (item.indexOf('U.S. Dollar') < 0) {
          expect(false).customError('"U.S. Dollar" is not selected in "Currency" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Lagging', 'Dates', 'document options');

    it('Should wait until Securities is loading in the "Available" section', function() {
      Utilities.waitUntilElementDisappears(ThiefHelpers.buildReference(DocumentOptionsDatesDateLagging.xpathDataSpinner), 180000);
      browser.ignoreSynchronization = false;
    });

    it('Should select "United States" in "Available" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('UNITED STATES');
      group.expand();

      // Verifying if "United States" is selected
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"United States" is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          group.getItemByText('3M Company').then(function(item) {
            item.select();

            // Check if item is selected
            item.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"3M Company" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsDatesDateLagging.xpathTransferBox);
    });

    it('Verifying if "3M Company", "Alumina Limited" is within "Date_Lagging_Custom_Grouping" in selected section', function() {
      var arrElements = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('Date_Lagging_Custom_Grouping').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrElements.push(element.text);
        });
      }).then(function() {
        if (arrElements.indexOf('UNITED STATES > 3M Company') < 0) {
          expect(false).customError('"3M Company" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    uncheckCheckBoxes.forEach(function(checkBox) {
      it('Should uncheck "' + checkBox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkBox).isChecked().then(function(status) {
          if (status) {
            ThiefHelpers.getCheckBoxClassReference(checkBox).uncheck();
          } else {
            expect(status).customError(checkBox + ' is already unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    checkCheckBoxes.forEach(function(checkBox) {
      it('Should check "' + checkBox + '" checkbox', function() {
        ThiefHelpers.getCheckBoxClassReference(checkBox).isChecked().then(function(status) {
          if (!status) {
            ThiefHelpers.getCheckBoxClassReference(checkBox).check();
          } else {
            expect(status).customError(checkBox + ' is already checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Should bring "United States" group into view in the grid', function() {

      // Scroll to the top of the grid
      scrollGridElementsToTop();

      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Should expand "United States" group if not already expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function() {
      }, function(err) {
        if (!err) {
          PA3MainPage.expandTreeInCalculatedReport('Weights', 'United States');
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "United States" group is expanded', function() {
      PA3MainPage.isTreeExpanded('Weights', 'United States').then(function() {
      }, function(err) {
        if (!err) {
          expect(false).customError('"United States" group is not expanded');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should scroll to the bottom of the grid to load data in the grid', function() {
      SlickGridFunctions.scrollGridElements();
    });

    it('Should bring "United States" group into view in the grid', function() {
      // Scroll to the top of the grid
      scrollGridElementsToTop();

      SlickGridFunctions.getRowIndex('Weights', 'United States', '').then(function(rowNum) {
        browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' + '.grid.scrollRowIntoView( arguments[ 0 ] )', rowNum - 1);
      });
    });

    it('Verifying if For "United States>3M Company" security, the "Port. Ending Price" is "147.46" and "Bench. Ending Price"' + ' is "146.82"', function() {
      columnNames.forEach(function(column) {
        SlickGridFunctions.getCellReference('Weights', '3M Company', '', column, '', 'United States').then(function(cellRef) {
          cellRef.getText().then(function(value) {
            if (column === 'Port. Ending Price') {
              if (parseFloat(value).toFixed(2) !== parseFloat(147.46).toFixed(2)) {
                expect(false).customError('For "United States>3M Company" security, the expected "' + column + '" is "147.46"' + 'instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            } else {
              if (parseFloat(value).toFixed(2) !== parseFloat(146.82).toFixed(2)) {
                expect(false).customError('For "Egypt>Global Telecom Holding S.A.E." security, the expected "Bench. Ending Price"' + ' is "146.82" instead "' + value + '" is displayed');
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 715382', function() {

    var temp = null;

    it('Should launch the PA3 application with "default_doc_auto"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Date Options', 'Dates', 'document options');

    it('Should click on "Fiscal Year End Month" drop down and select "December"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathFiscalYearEndMonthDropDown).open();

      // Selecting December
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathFiscalYearEndMonthDropDown).selectItemByText('December');
    });

    it('Verifying if the "Fiscal Year End Month" drop down is set to "December"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, DocumentOptionsDates.xpathFiscalYearEndMonthDropDown).getSelectedText().then(function(text) {
        if (text !== 'December') {
          expect(false).customError('"Fiscal Year End Month" drop down did not set to "December"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Dcoument Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not displayed as "Tile Options - Weights".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select Report frequency as "Fiscal Yearly",in "Tile Options - Weights" view', function() {
      // Select report frequency as 'Fiscal Yearly' from drop down
      ThiefHelpers.selectOptionFromDropDown('Fiscal Yearly', 'Report Frequency:', undefined, '');
    });

    it('Should click on the "Start Date" dropdown', function() {
      TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "End of Last Fiscal Year" from the Start Date dropdown', function() {
      TileOptionsDates.getOptionFromDateDropDown('End of Last Fiscal Year').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "End of Last Fiscal Year" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'End of Last Fiscal Year') {
          expect(false).customError('"End of Last Fiscal Year" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Fetching end date of last year and today\'s date for further verification', function() {
      Utilities.getEndDateYearsAgo(1).then(function(date1) {
        Utilities.getCurrentDate('MMDDYYYY', '/').then(function(todaysDate) {
          Utilities.getBusinessDate(todaysDate, '/').then(function(date2) {
            temp = date1 + ' - ' + date2;
          });
        });
      });
    });

    it('Verifying if "End of Last Year - today\'s date" is displayed as dates hyper link in the report', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(hyperLinkDate) {
        if (temp !== hyperLinkDate) {
          expect(false).customError('Dates hyperlink in the report is not displayed with "End of Last Year - today\'s date". Expected: ' + temp + ', Found: ' + hyperLinkDate);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying dates hyper link is displayed in the M/DD/YYYY format', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        var tempArr = date.split('-');
        tempArr.forEach(function(date, index) {
          Utilities.isValidMDDYYYY(date.trim());
        });
      });
    });
  });

  describe('Test Step ID: 715383', function() {

    var temp;

    it('Should launch the PA3 application with "default_doc_auto"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should type "Client:/pa3/dates" into "Portfolio" widget and select "TEST.ACCT | Client:/pa3/" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/dates', 'TEST.ACCT | Client:/pa3/dates/', 'Client:/pa3/dates/TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "Client:/pa3/dates" into "Portfolio"' + ' widget and select "TEST.ACCT | Client:/pa3/dates/" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError('"Hamburger" icon next to "Portfolio" widget is not clicked ' + err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('Account window is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Edit/Pencil" icon beside to "CLIENT:/PA3/DATES/TEST.ACCT"', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'CLIENT:/PA3/DATES/TEST.ACCT').click().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError('"Edit/Pencil" icon beside to "CLIENT:/PA3/DATES/TEST.ACCT" is not clicked ' + err);
      });
    });

    it('Verify if "Modify Account(New)" dialog box appeared', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Modify Account(New)" dialog box does not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select Dates tab in General category from LHP', function() {
      ModifyAccountNew.selectOptionsFromLHP('Dates', true);
    });

    it('Should click on "Fiscal Year End Month" drop down and select "March"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Fiscal Year End Month').open();

      // Selecting March
      ThiefHelpers.getDropDownSelectClassReference('Fiscal Year End Month').selectItemByText('March');
    });

    it('Verifying if the "Fiscal Year End Month" drop down is set to "March"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Fiscal Year End Month').getSelectedText().then(function(text) {
        if (text !== 'March') {
          expect(false).customError('"Fiscal Year End Month" drop down did not set to "March"; Found:' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button from "Modify Account(New) window"', function() {
      ModifyAccountNew.getButtonFromRHP('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying if "Save" dialog box appeared.
      ThiefHelpers.verifyDialogTitle('Save Account');
    });

    it('Verifying if "Save Account" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Save Account', undefined).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Save Account" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      ThiefHelpers.getDialogButton('Save Account', 'Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Save Account" dialog is closed', function() {
      ThiefHelpers.getDialogClassReference('Save Account', undefined).isOpen().then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Save Account" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FactSet Research Systems" Pop Up is appeared and click "OK" if Pop Up is present', function() {
      ModifyAccountNew.getDialog('FactSet Research Systems').isPresent().then(function(flag) {
        if (flag) {
          //Click on "OK" button
          ModifyAccountNew.getButtonFromFactsetPopUp('OK').click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"FactSet Research Systems" dialog did not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not displayed as "Tile Options - Weights".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select Report frequency as "Fiscal Yearly",in "Tile Options - Weights" view', function() {
      // Select report frequency as 'Fiscal Yearly' from drop down
      ThiefHelpers.selectOptionFromDropDown('Fiscal Yearly', 'Report Frequency:', undefined, '');
    });

    it('Should click on the "Start Date" dropdown', function() {
      TileOptionsDates.getDateDropDown('Start Date').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "End of Last Fiscal Year" from the Start Date dropdown', function() {
      TileOptionsDates.getOptionFromDateDropDown('End of Last Fiscal Year').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "End of Last Fiscal Year" is set in Start Date input box
      ThiefHelpers.getTextBoxClassReference('Start Date:').getText().then(function(text) {
        if (text !== 'End of Last Fiscal Year') {
          expect(false).customError('"End of Last Fiscal Year" is not set in "Start Date" input box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Fetching end date of march month of this year and today\'s date for further verification', function() {
      var d = new Date();
      var currentYear = d.getFullYear();
      Utilities.getEndOrStartDateOfMonthInAYear(currentYear, 3, false).then(function(date1) {
        Utilities.getCurrentDate('MMDDYYYY', '/').then(function(todaysDate) {
          Utilities.getBusinessDate(todaysDate, '/').then(function(date2) {
            temp = date1 + ' - ' + date2;
          });
        });
      });
    });

    it('Verifying if "End date of march month(current year) - today\'s date" is displayed as dates hyper link in the report', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(hyperLinkDate) {
        if (temp !== hyperLinkDate) {
          expect(false).customError('Dates hyperlink in the report is not displayed with "End date of march month(current year)". Expected: ' + temp + ', Found: ' + hyperLinkDate);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying dates hyper link is displayed in the M/DD/YYYY format', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        var tempArr = date.split('-');
        tempArr.forEach(function(date, index) {
          Utilities.isValidMDDYYYY(date.trim());
        });
      });
    });
  });
});
