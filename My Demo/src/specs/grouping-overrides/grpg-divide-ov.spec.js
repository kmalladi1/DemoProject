'use strict';

require(__dirname + '/../../index.js');

var verifyRHPOptions = function(identifierValue, nameValue, currentGroupingValue, level1Value, level2Value) {

  var rhpElements = [{name: 'Identifier:', value: identifierValue},{name: 'Name:', value: nameValue},
    {name: 'Current Grouping:', value: currentGroupingValue},];

  rhpElements.forEach(function(rhpElement) {
    it('Should verify if the "' + rhpElement.name + '" is set to "' + rhpElement.value + '"', function() {
      GroupingManager.getDataFromRHP(rhpElement.name).getText().then(function(value) {
        if (value !== rhpElement.value) {
          expect(false).customError(rhpElement.name + ' is expected to display ' + rhpElement.value + ', Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  it('Should verify if "Level 1" drop-down is set to "' + level1Value + '" and is enable', function() {
    ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).getText().then(function(val) {
      if (val !== level1Value) {
        expect(false).customError('"Level 1" drop-down is not set to "' + level1Value + '", Found: ' + val);
        CommonFunctions.takeScreenShot();
      }
    }).then(function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:')).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Level 1" drop-down button is disabled in Grouping Manager');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  it('Should verify if "Level 2" drop-down is set to "' + level2Value + '" and is enable', function() {
    ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 2:', true)).getText().then(function(val) {
      if (val !== level2Value) {
        expect(false).customError('"Level 2" drop-down is not set to "' + level2Value + '", Found: ' + val);
        CommonFunctions.takeScreenShot();
      }
    }).then(function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getLevelDropDown('Level 2:')).isDisabled().then(function(status) {
        if (status) {
          expect(false).customError('"Level 2" drop-down button is disabled in Grouping Manager');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
};

describe('Test Case: grpg-divide-ov', function() {

  describe('Test Step ID: 544549', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/pa3/grouping/GROUPING-OVERRIDES" document and verify if the given document opened', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('grouping-overrides');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrValues = [{name: 'Portfolio', val: 'CLIENT:/PA3/GOV_TEST.ACCT', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'Benchmark', val: 'RUSSELL:1000', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

  });

  describe('Test Step ID: 544550', function() {

    it('Should select "Contribution" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Contribution').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {
          expect(false).customError('Unable to select "Contribution" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should click on + next to "Commercial Services" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Commercial Services');

      // Verify if "Commercial Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Commercial Services');
    });

    it('Should right click on "Advertising/Marketing Services" from calculated report and select Groupings|Enable Grouping Overrides', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 2, 'Advertising/Marketing Services', 'grid-canvas grid-canvas-bottom grid-canvas-left');
      Utilities.scrollElementToVisibility(reference);
      PA3MainPage.rightClickAndSelectOption(reference, 'Groupings|Enable Grouping Overrides');
    });

    // Click wrench icon from application toolbar and select Grouping Overrides
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Grouping Overrides');

    it('Should verify if "Grouping Manager" dialog box opened', function() {
      // Verify that "Document Options" view appear.
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(found) {
        if (!found) {
          expect(false).customError('"Grouping Manager" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Advertising/Marketing Services" under "Commercial Services"', function() {
      GroupingManager.expandTree('Advertising/Marketing Services', 'Commercial Services');

      // Verifying if "Advertising/Marketing Services" is expanded
      GroupingManager.checkIfTreeExpanded('Commercial Services|Advertising/Marketing Services');
    });

    it('Should select "Interpublic Group of Companies, Inc." element under the grouping "Commercial Services|Advertising/Marketing Services" in "Grouping Manager" dialog box', function() {
      GroupingManager.getElementFromSpecifiedLevel(3, 'Interpublic Group of Companies, Inc.').click();
    });

    verifyRHPOptions('46069010', 'Interpublic Group of Companies, Inc.', 'Commercial Services/ Advertising/Marketing Services', 'Commercial Services', 'Advertising/Marketing Services');

    var datePickersOfDate = [{name: 'From', qaID: 'Left', value: 'earliest'}, {name: 'To', qaID: 'Right', value: 'latest'}];

    datePickersOfDate.forEach(function(datePicker) {
      it('Should verify if "' + datePicker.name + '" date picker of "Date:" is set to "' + datePicker.value + '"', function() {
        var xpathOfDatePicker = CommonFunctions.replaceStringInXpath(GroupingManager.xpathDatePickersOfDateOption, datePicker.qaID);
        ThiefHelpers.getDatepickerClassReference(undefined, xpathOfDatePicker).getDate().then(function(text) {
          if (text !== datePicker.value) {
            expect(false).customError(datePicker.name + ' date picker of "Date:" is expected to be ' + datePicker.value + ', Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "Save Location" drop down is set to "Personal"', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, GroupingManager.xpathOfSaveLocationDropdown, true).getSelectedText().then(function(text) {
        if (text !== 'Personal') {
          expect(false).customError('"Save Location:" drop down did not set to "Personal", Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544551', function() {

    it('Should hold "CTRL" key', function() {
      // Hold CTRL+F key
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    it('Should select "Omnicom Group Inc" element under the grouping "Commercial Services|Advertising/Marketing Services"', function() {
      GroupingManager.getElementFromSpecifiedLevel(3, 'Omnicom Group Inc').click();
    });

    it('Should release "CONTROL" key', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    verifyRHPOptions('46069010, 68191910', 'Interpublic Group of Companies, Inc., Omnicom Group Inc', 'Commercial Services/ Advertising/Marketing Services',
      'Commercial Services', 'Advertising/Marketing Services');
  });

  describe('Test Step ID: 544575', function() {

    it('Should click on "Remove All" button in "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('remove all')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Communications" option from "Level 1" drop-down in "Grouping Manager"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).selectOptionByText('Communications');

      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).getText().then(function(val) {
        if (val !== 'Communications') {
          expect(false).customError('"Communications" should be selected in "Level 1" drop-down in "Grouping Manager" but found "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Level 2" drop-down is set to "Level 2:" and is enable', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 2:', true)).getText().then(function(val) {
        if (val !== 'U.S. Dollar') {
          expect(false).customError('"Level 2" drop-down is not set to "U.S. Dollar", Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      }).then(function() {
        ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getLevelDropDown('Level 2:')).isDisabled().then(function(status) {
          if (!status) {
            expect(false).customError('"Level 2" drop-down button is not disabled in Grouping Manager');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 544552', function() {
    var gridObj;
    var compareTo = [{Identifier: '68191910',
      Name: 'Omnicom Group Inc',
      'Assigned Grouping': 'Communications',
      'Grouping Name': 'Economic Sector',
      'Start Date': 'earliest',
      'End Date': 'latest',
      'Save Location': 'Personal',},
      {Identifier: '46069010',
        Name: 'Interpublic Group of Companies, Inc.',
        'Assigned Grouping': 'Communications',
        'Grouping Name': 'Economic Sector',
        'Start Date': 'earliest',
        'End Date': 'latest',
        'Save Location': 'Personal',},];

    it('Should click on "Add" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('Add')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should fetch all the data from the bottom section of "Grouping Manager"', function() {
      ThiefGridHelpers.getRowData({
        gridSelector: 'tf-local-grid',
        columnWhitelist: ['Identifier', 'Name', 'Assigned Grouping', 'Grouping Name', 'Start Date', 'End Date', 'Save Location'],
        rows: 4,
        returnElement: false,
      }).then(function(values) {
        gridObj = values.nonFrozenRowData;
      });
    });

    it('Should verify if overrides section data is displayed with expected data which is stored in compareTo variable(screenShot in test step)', function() {
      // Should compare the excel data with the grid data
      Utilities.ObjectArrayCompare(compareTo, gridObj, _.keys(gridObj[0]));
    });
  });

  describe('Test Step ID: 544553', function() {

    it('Should expand "Communications|U.S. Dollar" in groupings manager dialog', function() {
      GroupingManager.expandTree('Communications|U.S. Dollar');

      // Verifying if "Communications|U.S. Dollar" is expanded
      GroupingManager.checkIfTreeExpanded('Communications|U.S. Dollar');
    });

    it('Should select "CenturyLink, Inc." element under the grouping "Communications|U.S. Dollar" in "Grouping Manager" dialog box', function() {
      GroupingManager.getElementFromSpecifiedLevel(3, 'CenturyLink, Inc.').click();
    });

    it('Should hold ctrl key', function() {
      // Hold CTRL+F key
      browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('f').perform();
    });

    it('Should select "Interpublic Group of Companies, Inc." element under the grouping "Commercial Services|Advertising/Marketing Services" in "Grouping Manager" dialog box', function() {
      GroupingManager.getElementFromSpecifiedLevel(3, 'Interpublic Group of Companies, Inc.').click();
    });

    it('Should release "CONTROL" key', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    // Note: As per RPD:21380484 the order of securities may not match with that of shown in expected results.Known Issue: RPD:21380661 The Level 2 drop down is auto populated.
    verifyRHPOptions('46069010, 15670010', 'Interpublic Group of Companies, Inc., CenturyLink, Inc.', 'Commercial Services/ Advertising/Marketing Services,Communications/ U.S. Dollar', '', 'Advertising/Marketing Services');
  });

  describe('Test Step ID: 544554', function() {

    it('Should select "Consumer Durables" option from "Level 1" drop-down in "Grouping Manager"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).selectOptionByText('Consumer Durables');

      ThiefHelpers.getTextBoxClassReference(undefined, GroupingManager.getLevelDropDown('Level 1:', true)).getText().then(function(val) {
        if (val !== 'Consumer Durables') {
          expect(false).customError('"Consumer Durables" should be selected in "Level 1" drop-down in "Grouping Manager" but found "' + val + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Level 2:" drop down is not present', function() {
      GroupingManager.getLevelDropDown('Level 2:', true).isPresent().then(function(isPresent) {
        if (isPresent) {
          expect(false).customError('"Level 2:" drop down is displayed under overrides');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544555', function() {

    var gridObj;
    var compareTo = [{Identifier: '15670010',
      Name: 'CenturyLink, Inc.',
      'Assigned Grouping': 'Consumer Durables',
      'Grouping Name': 'Economic Sector',
      'Start Date': 'earliest',
      'End Date': 'latest',
      'Save Location': 'Client',},
      {Identifier: '46069010',
        Name: 'Interpublic Group of Companies, Inc.',
        'Assigned Grouping': 'Consumer Durables',
        'Grouping Name': 'Economic Sector',
        'Start Date': 'earliest',
        'End Date': 'latest',
        'Save Location': 'Client',},
      {Identifier: '68191910',
        Name: 'Omnicom Group Inc',
        'Assigned Grouping': 'Communications',
        'Grouping Name': 'Economic Sector',
        'Start Date': 'earliest',
        'End Date': 'latest',
        'Save Location': 'Personal',},
      {Identifier: '46069010',
        Name: 'Interpublic Group of Companies, Inc.',
        'Assigned Grouping': 'Communications',
        'Grouping Name': 'Economic Sector',
        'Start Date': 'earliest',
        'End Date': 'latest',
        'Save Location': 'Personal',},];

    it('Should select "Client" from "Save Location:" drop down in "Grouping Manager" dialog', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, GroupingManager.xpathOfSaveLocationDropdown, true).selectItemByText('Client');

      // Verifying if "Client" is selected in the "Save Location:" dropdown
      ThiefHelpers.getDropDownSelectClassReference(undefined, GroupingManager.xpathOfSaveLocationDropdown, true).getSelectedText().then(function(text) {
        if (text !== 'Client') {
          expect(false).customError('"Client" option is not selected in Level 1: dropdown in Grouping Manager but found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, GroupingManager.getButton('Add')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // fyi: Adding this verification to check if client overrides is adding without any issue
    it('Should fetch all the data from the bottom section of "Grouping Manager"', function() {
      ThiefGridHelpers.getRowData({
        gridSelector: 'tf-local-grid',
        columnWhitelist: ['Identifier', 'Name', 'Assigned Grouping', 'Grouping Name', 'Start Date', 'End Date', 'Save Location'],
        rows: 4,
        returnElement: false,
      }).then(function(values) {
        gridObj = values.nonFrozenRowData;
      });
    });

    it('Should verify if overrides section data is displayed with rows of 2 client and 2 personal data', function() {
      // Should compare the excel data with the grid data
      Utilities.ObjectArrayCompare(compareTo, gridObj, _.keys(gridObj[0]));
    });

    it('Should click on "Apply & Close" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference('Apply & Close', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Grouping Manager" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (option) {
          expect(false).customError('"Grouping Manager" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Consumer Durables" grouping in "Contribution" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 1, 'Consumer Durables');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after performing right click on "Commercial Services".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select the "Groupings>Enable Grouping Overrides" option in the right click menu', function() {
      PA3MainPage.getOptionFromCustomMenu('Groupings|Enable Grouping Overrides').click();
    });

    it('Should click on "Refresh" button in application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verify if "Contribution" report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should expand "Consumer Durables" grouping', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Consumer Durables');

      // Verifying if "Consumer Durables" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Consumer Durables');
    });

    var arrOfRowNames = [];

    it('Should verify if "CenturyLink, Inc." is displayed and "Interpublic Group of Companies, Inc." is not displayed under "Consumer Durables" in the report', function() {
      SlickGridFunctions.getElementsFromTree('Contribution', '', 'Consumer Durables', '').then(function(childNames) {
        childNames.forEach(function(itemName) {
          arrOfRowNames.push(itemName);
        });
      }).then(function() {
        if (arrOfRowNames.indexOf('CenturyLink, Inc.') <= -1) {
          expect(false).customError('"CenturyLink, Inc." is not displayed under "Consumer Durables" in Contribution Report.');
          CommonFunctions.takeScreenShot();
        }
      }).then(function() {
        if (arrOfRowNames.indexOf('Interpublic Group of Companies, Inc.') > -1) {
          expect(false).customError('"Interpublic Group of Companies, Inc." is displayed under "Consumer Durables" in Contribution Report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544576', function() {

    it('Should expand "Communications|U.S. Dollar" grouping from the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Communications|U.S. Dollar');

      // Verifying if "Communications|U.S. Dollar" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Communications|U.S. Dollar');
    });

    it('Should verify if "Omnicom Group Inc" and "Interpublic Group of Companies, Inc." is displayed under "Communications|U.S. Dollar" in the report', function() {
      var arrOfRowNames = [];
      var expectedElements = ['Interpublic Group of Companies, Inc.', 'Omnicom Group Inc'];
      SlickGridFunctions.getElementsFromTree('Contribution', '', 'Communications|U.S. Dollar', '').then(function(childNames) {
        childNames.forEach(function(itemName) {
          arrOfRowNames.push(itemName);
        });
      }).then(function() {
        expectedElements.forEach(function(security) {
          if (arrOfRowNames.indexOf(security) <= -1) {
            expect(false).customError('"' + security + '" is not displayed under "Communications|U.S. Dollar" in Contribution Report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 544556', function() {
    var gridObj = [];

    it('Should right click on "Omnicom Group Inc" under "Communications|U.S. Dollar" grouping in "Contribution" report', function() {
      var reference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 3, 'Omnicom Group Inc');
      PA3MainPage.rightClickOnGivenElement(reference).then(function() {
      }, function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after performing right click on "Omnicom Group Inc');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select the "Assign Grouping…" option in the right click menu of "Omnicom Group Inc"', function() {
      PA3MainPage.getOptionFromCustomMenu('Assign Grouping…').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Grouping Manager" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (!option) {
          expect(false).customError('"Grouping Manager" dialog did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should fetch all the data from the bottom section of "Grouping Manager", select and remove overrides that are saved in "Personal" save location', function() {
      ThiefGridHelpers.getRowData({
        gridSelector: 'tf-local-grid',
        returnElement: false,
      }).then(function(values) {
        gridObj = values.nonFrozenRowData;
        ThiefGridHelpers.getRowData({
          gridSelector: 'tf-local-grid',
          returnElement: true,
        }).then(function(eleRefGrid) {
          eleRefGrid = eleRefGrid.nonFrozenRowData;
          gridObj.forEach(function(rowObject, index) {
            if (rowObject['Save Location'] === 'Personal') {
              eleRefGrid[index]['Save Location'].click().then(function() {
                eleRefGrid[index]['Save Location'].element(by.xpath('.//tf-actions//tf-act[@action="remove"]//*[contains(@class, "tf-icon")]')).click().then(function() {}, function() {});
              });
            }
          });
        });
      });
    });

    it('Should click on "Apply & Close" button in the "Grouping Manager" dialog', function() {
      ThiefHelpers.getButtonClassReference('Apply & Close', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify that "Grouping Manager" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Grouping Manager').then(function(option) {
        if (option) {
          expect(false).customError('"Grouping Manager" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Refresh" button in application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Consumer Durables" grouping', function() {
      PA3MainPage.isTreeExpanded('Contribution', 'Consumer Durables', '').then(function(flag) {
        if (!flag) {
          PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Consumer Durables');
        }
      });

      // Verifying if "Consumer Durables" was expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Consumer Durables');
    });

    it('Should verify if "CenturyLink, Inc." and "Interpublic Group of Companies, Inc." are displayed under "Consumer Durables" in the report', function() {
      var arrOfRowNames = [];
      var expectedElements = ['CenturyLink, Inc.', 'Interpublic Group of Companies, Inc.'];
      SlickGridFunctions.getElementsFromTree('Contribution', '', 'Consumer Durables', '').then(function(childNames) {
        childNames.forEach(function(itemName) {
          arrOfRowNames.push(itemName);
        });
      }).then(function() {
        expectedElements.forEach(function(security) {
          if (arrOfRowNames.indexOf(security) <= -1) {
            expect(false).customError('"' + security + '" is not displayed under "Consumer Durables" in Contribution Report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
});
