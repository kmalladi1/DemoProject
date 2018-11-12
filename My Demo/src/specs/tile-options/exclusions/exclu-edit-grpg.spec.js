'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-edit-grpg', function() {
  // Variable(s)
  var arrSectorsExclude = [];
  var groupNames = [];
  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  var xpathOfSelectedContainerEditGrouping = CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupings.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'Selected');
  var xpathOfAvailableContainerEditGrouping = element.all(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupings.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'Available'))).last();

  describe('Test Step ID: 544910', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    it('Verifying that "Weights" report does not calculate', function() {
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Verifying that "Weights" report is blank', function() {
      expect(PA3MainPage.isReportCalculated('Weights', true)).toBeFalsy();
    });

    it('Should verify that "Portfolio" widget shows "CLIENT:/PA3/TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(portfolio) {
        if (portfolio !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" widget is not shown as "CLIENT:/PA3/TEST.ACCT". Found: "' + portfolio + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that "Benchmark" widget shows "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(benchmart) {
        if (benchmart !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" widget is not shown as "RUSSELL:1000". Found: "' + benchmart + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544913', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    var arrOfSelectedSectionItems = ['Economic Sector - FactSet', 'Industry - FactSet'];

    arrOfSelectedSectionItems.forEach(function(itemName) {
      it('Verifying that "' + itemName + '" is present in the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(itemName).isPresent().then(function(option) {
          if (!option) {
            expect(option).customError('"' + itemName + '" column is not present in "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

  });

  describe('Test Step ID: 544911', function() {

    // Clicking on Exclusions LHP item to select.
    it('Should click on Exclusions LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Verifying that "Available" Section is loaded with sectors list', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(ele) {
        if (ele.length === 0) {
          expect(false).customError('"Available" Section is not loaded with sectors list');
          CommonFunctions.takeScreenShot();
        } else {
          // Collecting the names of the first 5 sectors for future use
          ele.forEach(function(element, index) {
            if (index < 5) {
              arrSectorsExclude.push(element.text);
            }
          });
        }
      });
    });

  });

  describe('Test Step ID: 544914', function() {

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    var arrButtons = ['Save', 'Cancel'];
    arrButtons.forEach(function(buttonName) {
      it('Verifying that "Save" button is displayed at the bottom of the dialog', function() {
        var xpathOfSelectedContainerlistbox = CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupings.xpathOfSaveOrCancelButton, buttonName);
        ThiefHelpers.isPresent('Button', buttonName, xpathOfSelectedContainerlistbox).then(function(option) {
          if (!option) {
            expect(false).customError('"' + buttonName + '" button is not displayed.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfSelectedSectionItems = ['Economic Sector - FactSet', 'Industry - FactSet'];

    arrOfSelectedSectionItems.forEach(function(itemName) {
      it('Verifying if "' + itemName + '" item is displayed in selected section', function() {
        ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, itemName).getText().then(function(name) {
          if (name !== itemName) {
            expect(false).customError('"' + itemName + '" is not present in the selected section. Found: "' + name + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Setp ID: 544915', function() {

    it('Should enter "P/E" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsExclusionsEditGroupings.xpathAvailableSectionSearchBox).setText('P/E');

      // Verifying that "P/E" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsExclusionsEditGroupings.xpathAvailableSectionSearchBox).getText().then(function(text) {
        if (text !== 'P/E') {
          expect(false).customError('"P/E" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Double click on "Price to Earnings" from "FactSet|Equity"', function() {
      ThiefHelpers.getListBoxItem(xpathOfAvailableContainerEditGrouping, 'Price to Earnings', 'FactSet|Equity').then(function(eleRef) {
        browser.actions().doubleClick(eleRef).perform();
      });
    });

    it('Verifying if "Price to Earnings" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, 'Price to Earnings').getText().then(function(name) {
        if (name !== 'Price to Earnings') {
          expect(false).customError('"Price to Earnings" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Economic Sector - FactSet" from "Selected" section and click on "X" button to delete it', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, 'Economic Sector - FactSet').getActions().then(function(item) {
        item.triggerAction('remove');
      });
    });

    it('Verifying that "Economic Sector - FactSet" is removed from the "Selected" section', function() {
      TileOptionsExclusionsEditGroupingsAddRemove.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent()
        .then(function(option) {
          if (option) {
            expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(true).toBeTruthy();
          }
        });
    });

    var arrOfSelectedSectionItems = ['Industry - FactSet', 'Price to Earnings'];
    it('Verifying that "Selected" container has "Industry - FactSet" and "Price to Earnings"', function() {
      var children = ThiefHelpers.getListboxClassReference(xpathOfSelectedContainerEditGrouping).getChildrenText();
      var arrOfColumns = [];
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }

        if (arrOfColumns.length === 2) {
          arrOfSelectedSectionItems.forEach(function(elementName) {
            if (arrOfColumns.indexOf(elementName) < 0) {
              expect(false).customError('"' + elementName + '" is not present in "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('More then 2 items are present in the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 544920', function() {

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    // Clicking on Hidden LHP item to select.
    it('Should click on Hidden LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Should enter "P/E" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsHiddenEditGroupingsAddRemove.xpathAvailableSectionSearchBox).setText('P/E');

      // Verifying that "P/E" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available', TileOptionsHiddenEditGroupingsAddRemove.xpathAvailableSectionSearchBox).getText().then(function(text) {
        if (text !== 'P/E') {
          expect(false).customError('"P/E" is not present in search field of "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Double click on "Price to Earnings" from "FactSet|Equity"', function() {
      ThiefHelpers.getListBoxItem(xpathOfAvailableContainerEditGrouping, 'Price to Earnings', 'FactSet|Equity').then(function(eleRef) {
        browser.actions().doubleClick(eleRef).perform();
      });
    });

    it('Verifying if "Price to Earnings" item is added to selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, 'Price to Earnings').getText().then(function(name) {
        if (name !== 'Price to Earnings') {
          expect(false).customError('"Price to Earnings" is not present in the selected section. Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Economic Sector - FactSet" from "Selected" section and click on "X" button to delete it', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, 'Economic Sector - FactSet').getActions().then(function(item) {
        item.triggerAction('remove');
      });
    });

    it('Verifying that "Economic Sector - FactSet" is removed from the "Selected" section', function() {
      TileOptionsExclusionsEditGroupingsAddRemove.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent()
        .then(function(option) {
          if (option) {
            expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(true).toBeTruthy();
          }
        });
    });

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

  });

  describe('Test Step ID: 544916', function() {

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrOfSelectedSectionItems = ['Economic Sector - FactSet', 'Industry - FactSet'];

    arrOfSelectedSectionItems.forEach(function(itemName) {
      it('Verifying that "' + itemName + '" is present in the "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(itemName).isPresent().then(function(option) {
          if (!option) {
            expect(option).customError('"' + itemName + '" column is not present in "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

  });

  describe('Test Step ID: 544918', function() {

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for report calculation to start
      browser.sleep(1000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Expand "Commercial Services" from the "Weights" calculated report', function() {
      browser.actions().doubleClick(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1,
        'Commercial Services')).perform();
    });

    it('Expand "Personnel Services" from "Commercial Services" of "Weights" calculated report', function() {
      browser.actions().doubleClick(PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services',
        'Personnel Services')).perform();
    });

    it('Verifying that "Commercial Services > Personnel Services" tree is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Personnel Services');
    });

    var screenShot = 0;
    var arrGroups = ['Advertising/Marketing Services', 'Financial Publishing/Services', 'Miscellaneous Commercial Services'];

    it('Verifying if "' + arrGroups + '" are present under "Commercial Services" in calculated report', function() {
      arrGroups.forEach(function(groupName) {
        PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services', groupName).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError(groupName + ' is not present under Commercial Services in calculated report.');
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var arrElements = ['ManpowerGroup Inc.', 'Robert Half International Inc.'];

    it('Verifying that "' + arrElements + '" are displayed under "Commercial Services > Personnel Services"', function() {
      arrElements.forEach(function(elementName) {
        PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services|Personnel Services', elementName).isPresent().then(function(present) {
          if (!present) {
            expect(false).customError(elementName + ' is not present under "Commercial Services > Personnel Services" in calculated report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 544917', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Select "Asset Class" from the "Available" container', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Asset Class" is selected
      expect(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class')
        .getAttribute('class')).toContain('selected');
    });

    it('Click "Right" arrow button to add "Asset Class" to the "Selected" container', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Asset Class" is added to the "Selected" container', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent()).toBeTruthy();
    });

    it('Hover over "Industry - FactSet" from "Selected" section and click on "X" button to delete it', function() {
      TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection('Industry - FactSet').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Industry - FactSet" is deleted from the "Selected" container', function() {
      // Verifying if "Industry - FactSet" is removed from Selected section
      TileOptionsGroupings.getElementFromSelectedContainer('Industry - FactSet').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Industry - FactSet" is not removed from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    // Clicking on Exclusions LHP item to select.
    it('Should click on Exclusions LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Hover over "Economic Sector - FactSet" from "Selected" section and click on "X" button to delete it', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, 'Economic Sector - FactSet').getActions().then(function(item) {
        item.triggerAction('remove');
      });
    });

    it('Verifying that "Economic Sector - FactSet" is removed from the "Selected" section', function() {
      TileOptionsExclusionsEditGroupingsAddRemove.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent()
        .then(function(option) {
          if (option) {
            expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(true).toBeTruthy();
          }
        });
    });

    it('Verifying that "Selected" container has only "Asset Class"', function() {
      var children = ThiefHelpers.getListboxClassReference(xpathOfSelectedContainerEditGrouping).getChildrenText();
      var arrOfColumns = [];
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }

        if (arrOfColumns.length === 1) {
          if (arrOfColumns.indexOf('Asset Class') < 0) {
            expect(false).customError('"Asset Class" is not present in "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('More then 1 item is present in the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 544912', function() {

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Expand "Equity" and double click on "Accenture Plc Class A" from "Equity" to add it to "Selected" container ' +
      'from the "Available" container', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Equity');
        group.expand();

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getItemByText('Accenture Plc Class A').then(function(subGroup) {
              subGroup.select();

              // Check if 'Accenture Plc Class A' is selected
              subGroup.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"Accenture Plc Class A" did not selected from "Available" section');
                  CommonFunctions.takeScreenShot();
                }
              });

              subGroup.doubleClick();
            });
          } else {
            expect(false).customError('"Equity" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    it('Verifying that "Accenture Plc Class A" is added to the "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Asset Class').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Equity > Accenture Plc Class A') {
          expect(false).customError('"Equity > Accenture Plc Class A" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clicking on Hidden LHP item to select.
    it('Should click on Hidden LHP item to select', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

      // Verifying if required tab is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Hidden" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Hover over "Economic Sector - FactSet" from "Selected" section and click on "X" button to delete it', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedContainerEditGrouping, 'Economic Sector - FactSet').getActions().then(function(item) {
        item.triggerAction('remove');
      });
    });

    it('Verifying that "Economic Sector - FactSet" is removed from the "Selected" section', function() {
      TileOptionsExclusionsEditGroupingsAddRemove.getElementFromSelectedContainer('Economic Sector - FactSet').isPresent()
        .then(function(option) {
          if (option) {
            expect(option).customError('"Economic Sector - FactSet" column was not deleted list.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(true).toBeTruthy();
          }
        });
    });

    it('Verifying that "Selected" container has only "Asset Class"', function() {
      var children = ThiefHelpers.getListboxClassReference(xpathOfSelectedContainerEditGrouping).getChildrenText();
      var arrOfColumns = [];
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }

        if (arrOfColumns.length === 1) {
          if (arrOfColumns.indexOf('Asset Class') < 0) {
            expect(false).customError('"Asset Class" is not present in "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('More then 1 item is present in the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

  });

  describe('Test Step ID: 544919', function() {

    // Click on the "Save" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
        .toBeTruthy();
    });

    it('Expand "Equity" and double click on "Aramark" from "Equity" to add it to "Selected" container from the "Available" container', function() {

      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

      var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Equity');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Aramark').then(function(subGroup) {
            subGroup.select();

            // Check if 'Aramark' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Aramark" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });

            subGroup.doubleClick();
          });
        } else {
          expect(false).customError('"Equity" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Aramark" is added to the "Selected" container', function() {
      var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

      ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Asset Class').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Equity > Aramark') {
          expect(false).customError('"Equity > Aramark" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "OK" button of header and verify if "options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Expand "Equity" from "Commercial Services" of "Weights" calculated report', function() {
      browser.actions().doubleClick(PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services',
        'Equity')).perform();
    });

    it('Verifying that "Economic Sector" hyperlink is displayed in the report', function() {
      // Verifying that Hyperlink name is "Economic Sector"
      expect(PA3MainPage.getGroupingsHyperLink('Weights').getText()).toEqual('Economic Sector');

    });

    it('Verifying that "Accenture Plc Class A" is not present under "Commercial Services > Equity"', function() {
      expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services|Equity', 'Accenture Plc Class A')
        .isPresent()).toBeFalsy();
    });

    it('Verifying that "Aramark" is not present under "Commercial Services > Equity"', function() {
      expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services|Equity', 'Aramark')
        .isPresent()).toBeFalsy();
    });

  });

  describe('Test Step ID: 734279', function() {

    CommonPageObjectsForPA3.clickOnExcludeExclusionsHyperlink('Weights', 'Excluded: Multiple Securities', 'selectEditExclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Should click on "Edit Groupings" button', function() {
      ThiefHelpers.getButtonClassReference('Edit Groupings', undefined).press();
    });

    it('Verifying if "Edit Groupings" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Edit Groupings').then(function(bool) {
        if (!bool) {
          expect(false).customError('"Edit Groupings" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Clear All/X" button to clear groupings in selected section of "Edit Groupings" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsExclusionsEditGroupingsAddRemove.xpathClearAllButton).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Clear All/X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickoutside', undefined);

    it('Should select "Sort Formula" tab', function() {
      ThiefHelpers.getTabsClassReference().selectTabByText('Sort Formula');

      // Verifying if selected tab is "SOrt Formula"
      ThiefHelpers.getTabsClassReference().getSelectedTabText().then(function(tabName) {
        if (tabName !== 'Sort Formula') {
          expect(false).customError('"Sort Formula" tab is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Sort Formula', 'LOOKUP_OFDB_COL("CLIENT:/PA3/Grouping/SORT_COUNTRY_TEST.OFDB",' +
      'LBC_COUNTRY(#SD),"COUNTRY","SORT")', undefined, undefined, 'X Close', undefined);

    it('Should select "Personal" radio button', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verifying if the "Personal" radio button is selected
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Test-exclu" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateEditCustomGroupings.xpathNameFIeld).setText('Test-exclu');

      // Verifying that "Name" field is set to "Test-exclu"
      ThiefHelpers.getTextBoxClassReference(undefined, CreateEditCustomGroupings.xpathNameFIeld).getText().then(function(text) {
        if (text !== 'Test-exclu') {
          expect(false).customError('"Name:" field did not set to "Test-exclu"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button in "Groupings" dialog box', function() {
      ThiefHelpers.getButtonClassReference('Save', '//tf-dialog[@style and descendant::*' +
        '//*[contains(.,"Groupings")]][2]//tf-button[contains(.,"Save")]').press().then(function() {
        }, function() {

          expect(false).customError('Unable to click on "Save" button.');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Groupings" dialog is closed', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, '//tf-dialog[@style and descendant::*//*[contains(.,"Groupings")]][2]').then(function(dialogStatus) {
        if (dialogStatus) {
          expect(false).customError('"Groupings" dialog is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Personal" from Available section', function() {
      TileOptionsGroupings.expandElementTree('Personal');
    });

    it('Verifying that "Personal" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Personal').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Personal" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Double click on "Test-exclu" from the "Available" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Test-exclu')).perform();

      // Verifying if "Test-exclu" is added to the "Selected" container
      TileOptionsGroupings.getElementFromSelectedContainer('Test-exclu').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Test-exclu" did not add to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Edit Groupings');

    it('Collecting group names', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(arrNames) {
        arrNames.forEach(function(objectRef) {
          groupNames.push(objectRef.text);
        });
      });
    });

    var takeScreenShot = 0;
    it('Verify that "Available" section reloads with decimal numbers ', function() {
      // Verifying first 10 groups for reference as per Dheeraj suggession.
      var regexp = /^[0-9]+\.[0-9]+$/;
      for (var i = 0; i < 15; i++) {
        if (!regexp.test(groupNames[i])) {
          expect(false).customError('Groups are not seen as decimal numbers. Found:' + groupNames[i]);
          takeScreenShot++;
          if (takeScreenShot === 1) {
            CommonFunctions.takeScreenShot();
          }
        }
      }
    });

  });

  describe('Test Step ID : 734280', function() {

    it('Should click on "Clear All/X" button to clear selected section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsExclusions.getClearSelectedItemsButton()).press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Clear All/X" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should double click on first group(say Value1) to add it to selected section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText(groupNames[0]);
      group.select();
      group.doubleClick();
    });

    it('Verifying if first group(value1) is added to the selected section', function() {
      var arrGroup = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Test-exclu');
      group.getChildrenText().then(function(children) {
        children.forEach(function(objRef) {
          arrGroup.push(objRef.text);
        });
      }).then(function() {
        if (arrGroup.indexOf(groupNames[0])) {
          expect(false).customError('First group(value1: "' + groupNames[0] + '") is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
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

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Should expand "Personal" from Available section', function() {
      TileOptionsGroupings.expandElementTree('Personal');
    });

    it('Verifying that "Personal" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Personal').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Personal" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Double click on "Test-exclu" from the "Available" container', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Test-exclu')).perform();

      // Verifying if "Test-exclu" is added to the "Selected" container
      TileOptionsGroupings.getElementFromSelectedContainer('Test-exclu').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"Test-exclu" did not add to the "Selected" container');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the groupings hyperlink is "Test-exclu"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Test-exclu') {
          expect(false).customError('Grouping hyperlink is not "Test-exclu"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying "Excluded:Value1" hyperlink is displayed in "Weights" report', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Excluded: ' + groupNames[0] + '') {
          expect(false).customError('"Excluded: ' + groupNames[0] + '" hyperlink did not display in the report; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Value1"(previously collected value) is not displayed in "Weights" report', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(cols) {
        if (cols.indexOf(groupNames[0]) > -1) {
          expect(false).customError('"' + groupNames[0] + '" is present in the calculated report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 734281', function() {

    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Test-exclu');

    it('Should expand "Personal" from Available section', function() {
      TileOptionsGroupings.expandElementTree('Personal');
    });

    it('Verifying that "Personal" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Personal').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Personal" did not get expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var countBeforeDelete;
    it('Should note the count before deleting the item', function() {
      // Get the number of elements in "Personal" the group
      TileOptionsGroupings.getAllElementsFromGroup('Personal').count().then(function(count) {
        countBeforeDelete = count;
      });
    });

    var countBeforeRemove;
    it('Should note of the number of the elements from "Selected" section', function() {
      TileOptionsGroupings.getAllElements('selected').count().then(function(count) {
        countBeforeRemove = count;
      });
    });

    it('Should click on X icon next to "Test-exclu" from Available section', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Test-exclu')).perform();

      // Creating reference using the xpath
      var ref = ThiefHelpers.buildReference(TileOptionsGroupings.getElementFromAvailableSection('Personal', 'Test-exclu'));
      ThiefHelpers.getActionsClassReference(ref).triggerAction('remove').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for dialog to appear
      browser.sleep(2000);
    });

    it('Verifying that "Delete Grouping" dialog saying "Are you sure you want to delete this grouping?" appeared', function() {
      //Verifying if "Delete Grouping" dialog appeared
      ThiefHelpers.verifyDialogTitle('Delete Grouping');

      //Verifying if dialog saying "Are you sure you want to delete this grouping?" is appeared
      ThiefHelpers.getDialogClassReference('Delete Grouping').getContent().getText().then(function(text) {
        if (text !== 'Are you sure you want to delete this grouping?') {
          expect(false).customError('"Delete Grouping" dialog saying "Are you sure you want to delete this' + ' grouping?" not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "OK" button in the confirmation dialog box', function() {
      ThiefHelpers.getDialogButton('Delete Grouping', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Test-exclu" is deleted from Available section', function() {
      // Get the number of elements in "Personal" the group
      TileOptionsGroupings.getAllElementsFromGroup('Personal').count().then(function(count) {
        if ((count) !== (countBeforeDelete - 1)) {
          expect(false).customError('"Test-Exclu" is not deleted in Available section. ' +
            'Count before delete is:' + countBeforeDelete + ', count after delete is:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Test-exclu" is deleted from Selected section', function() {
      TileOptionsGroupings.getAllElements('selected').count().then(function(count) {
        if (count !== (countBeforeRemove - 1)) {
          expect(false).customError('"Test-Exclu" is not deleted in Available section. ' +
            'Count before delete is:' + countBeforeRemove + ', count after delete is:' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

});
