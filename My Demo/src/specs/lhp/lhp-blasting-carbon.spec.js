'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lhp-blasting-carbon', function() {

  describe('Test Step ID: 554423', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/lhp_blasting', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lhp-blasting');
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying if "Weights" report is highlighted in LHP', function() {
      PA3MainPage.getReports('Weights').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Weights" did not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554424', function() {

    var lhpAllOptions;
    it('Should copy all report name in lhpAllOptions for later verification', function() {
      PA3MainPage.getAllReportsFromGivenGroup('Reports', 'Reports').then(function(arr) {
        lhpAllOptions = arr;
      });
    });

    it('Should type "Client:/pa3/test" in Portfolio box and select "TEST.ACCT | Client:/pa3/" from drop down', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'TEST.ACCT | Client:/pa3/', 'Client:/pa3/TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "test" into "Portfolio"' + ' widget and select "Test.ACCT | Client:/pa3" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Client:/pa3/TEST.ACCT" is set in to the Portfolio text box', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(text) {
        if (text !== 'Client:/pa3/TEST.ACCT') {
          expect(false).customError('"Client:/pa3/TEST.ACCT" did not set to ' + '"Portfolio" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Format Options>Theme>Carbon" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Carbon"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Theme" is converted into "Carbon" mode', function() {
      browser.wait(function() {
        return element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
          return text.indexOf('carbon') >= 0;
        });
      }, 4000);

      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
        if (text.indexOf('carbon') < 0) {
          expect(false).customError('Theme did not change into the "Carbon" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');

    it('Should click on "Apply To Weights" button from Tile Options Page', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply To Weights" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report name in the blasting window is matched with LHP report name', function() {
      var temp = [];
      TileOptionsGroupings.getAllCheckBoxFromBlastingWindow().getText().then(function(arr) {

        // Removing "All" checkbox
        arr.splice(0, 1);

        // removing undefined value or empty value
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] === '' || arr[i] === undefined) {
            expect(true).customError('');
          } else {
            temp.push(arr[i]);
          }
        }

        // Verifying if lhp options and blasting window options are same
        temp.forEach(function(item, index) {
          if (item !== lhpAllOptions[index]) {
            expect(false).customError('Report name in blasting and report name in LHP did not match; Expected: ' + '"' + item + '"; Found: ' + lhpAllOptions[index]);
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying both array is equal
        if (temp.length !== lhpAllOptions.length) {
          expect(false).customError('Both array length not equal');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var checkbox = ['Weights', 'Characteristics - Summary'];

    checkbox.forEach(function(item) {

      it('Verifying if "' + item + '" checkbox is disabled', function() {
        ThiefHelpers.getCheckBoxClassReference(item).isDisabled().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + item + '" checkbox did not disable');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 554425', function() {

    it('Should click on "Cancel" button from blasting window', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('Cancel').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button from blasting window');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should hover on "Performance" report from LHP', function() {
      browser.actions().mouseMove(PA3MainPage.getReports('Performance')).perform();
    });

    it('Should click on wrench icon next to the "Performance", report', function() {
      PA3MainPage.selectWrenchIcon('Performance', true);
    });

    it('Should select "Duplicate" from the menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Duplicate').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Duplicate" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should hover on "Contribution" report from LHP', function() {
      browser.actions().mouseMove(PA3MainPage.getReports('Contribution')).perform();
    });

    it('Should click on wrench icon next to the "Contribution", report', function() {
      PA3MainPage.selectWrenchIcon('Contribution', true);
    });

    it('Should select "Rename" from the menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Rename').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Rename" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "Contribution - Edit" in rename text box from LHP', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathOfRenameTextBoxFromLHP).setText('Contribution - Edit');
    });

    it('Should click on "+/-" button from LHP', function() {
      ThiefHelpers.getNavepaneClassReference().addItem();
    });

    it('Verifying if "Edit Mode" page is opened', function() {
      PA3EditMode.isEditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Edit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Raw Factor Exposures" under "Equity Risk"', function() {
      browser.actions().doubleClick(PA3EditMode.getChartImageFromGroup('Equity Risk', 'Raw Factor Exposures')).perform();
    });

    it('Should click on "Done" button from Edit page', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button from report');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Mode" page is closed', function() {
      PA3EditMode.isEditMode().then(function(flag) {
        if (flag) {
          expect(false).customError('"Edit Mode" page did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Raw Factor Exposures');

    it('Verifying if "Performance" is two times in LHP', function() {
      var count = 0;
      PA3MainPage.getAllReportsFromGivenGroup('Reports', 'Reports').then(function(arr) {
        arr.forEach(function(text) {
          if (text === 'Performance') {
            count = count + 1;
          }
        });

        if (count !== 2) {
          expect(false).customError('"Performance" did not present two times in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution" report is not presented in LHP', function() {
      PA3MainPage.getReports('Contribution').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Contribution" report presented in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution - Edit" report is presented in LHP', function() {
      PA3MainPage.getReports('Contribution - Edit').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Contribution - Edit" report did not present in the LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var reports = ['Weights', 'Raw Factor Exposures'];

    reports.forEach(function(text, index) {
      it('Verifying if "Raw Factor Exposures" report is present under "Weights"', function() {
        PA3MainPage.getAllReportsFromGivenGroup('Reports', 'Reports').then(function(arr) {
          if (text !== arr[index]) {
            expect(false).customError('"Raw Factor Expo;,sures" report did not present under "Weights"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 554426', function() {

    it('Should hover on "Multi-Horizon Returns" report from LHP', function() {
      browser.actions().mouseMove(PA3MainPage.getReports('Multi-Horizon Returns')).perform();
    });

    it('Should click on wrench icon next to the "Multi-Horizon Returns", report', function() {
      PA3MainPage.selectWrenchIcon('Multi-Horizon Returns', true);
    });

    it('Should select "Remove" from the menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Remove" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if confirmation dialog is opened"', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, PA3MainPage.xpathConfirmationDialog).then(function(flag) {
        if (!flag) {
          expect(false).customError('Confirmation dialog did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Confirmation" dialog content is "Are you sure you want to delete the Multi-Horizon Returns report?"', function() {
      ThiefHelpers.getDialogClassReference(undefined, undefined, PA3MainPage.xpathConfirmationDialog).getContent().getText().then(function(text) {
        if (text !== 'Are you sure you want to delete the Multi-Horizon Returns report?') {
          expect(false).customError('"Confirmation" dialog content did not match with "Are you sure' + ' you want to delete the Multi-Horizon Returns report?"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Confirmation dialog', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
        press().then(function() { }, function() {

          expect(false).customError('Unable to click on "OK" button.');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Multi-Horizon Returns" report is removed from LHP', function() {
      PA3MainPage.getReports('Multi-Horizon Returns').isPresent().then(function(flag) {
        if (flag) {
          expect(false).customError('"Multi-Horizon Returns" report did not remove from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554427', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Valuation - Detail', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    it('Should click on wrench icon next to the "Valuation - Detail", report', function() {
      PA3MainPage.selectWrenchIcon('Valuation - Detail', true);
    });

    it('Should select "Rename" from the menu drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Rename').then(function() {
      }, function() {

        expect(false).customError('Unable to select "Rename" from the menu drop down');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "Valuation - Multi" in rename text box from LHP', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, PA3MainPage.xpathOfRenameTextBoxFromLHP).setText('Valuation - Multi');
    });

    it('Verifying if "Valuation - Multi" report is highlighted in LHP', function() {
      PA3MainPage.getReports('Valuation - Multi').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Valuation - Multi" did not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var tileNames = ['Estimates', 'Valuation - Detail'];

    tileNames.forEach(function(tile) {
      it('Verifying if "' + tile + '" report is presented', function() {
        PA3MainPage.isReportCalculated(tile).then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + tile + '" report did not present');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 554428', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var lhpAllOptions;
    it('Should copy all report name in lhpAllOptions for later verification', function() {
      PA3MainPage.getAllReportsFromGivenGroup('Reports', 'Reports').then(function(arr) {
        lhpAllOptions = arr;
      });
    });

    it('Verifying if "Contribution - Edit" is presented in the LHP', function() {
      PA3MainPage.getAllReportsFromGivenGroup('Reports', 'Reports').then(function(arr) {
        if (arr.indexOf('Contribution - Edit') < 0) {
          expect(false).customError('Contribution - Edit  did not present in blasting window');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Groupings');
    it('Should click on "Apply To Weights" button from Tile Options Page', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply To Weights" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if report name in the blasting window is matched with LHP report name', function() {
      var temp = [];
      var temp1 = [];

      TileOptionsGroupings.getAllCheckBoxFromBlastingWindow().getText().then(function(arr) {

        // Removing "All" checkbox
        arr.splice(0, 1);

        // removing undefined value or empty value or Contribution
        for (var i = 0; i < arr.length; i++) {

          // Known Issue: http://is.factset.com/rpd/summary.aspx?messageid=19329021
          // Contribution is not changing as "Contribution - Edit"
          if (arr[i] === '' || arr[i] === undefined || arr[i] === 'Contribution') {
            expect(true).customError('');
          } else {
            temp.push(arr[i]);
          }
        }

        // Removing "Contribution - Edit" from the lhp options
        lhpAllOptions.forEach(function(text) {
          if (text !== 'Contribution - Edit') {
            temp1.push(text);
          }
        });

        // Verifying if value for both lhp options and blasting window options are same
        temp.forEach(function(item, index) {
          if (item !== temp1[index]) {
            expect(false).customError('Report name in blasting and report name in LHP did not match;' + ' Expected: "' + item + '" Found: ' + temp1[index]);
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying both array is equal
        if (temp.length !== temp1.length) {
          expect(false).customError('Both array length not equal');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known Issue: http://is.factset.com/rpd/summary.aspx?messageid=19329021
    // Contribution is not changing as "Contribution - Edit"
    it('Verifying if "Contribution" is presented in the blasting window', function() {
      TileOptionsGroupings.getAllCheckBoxFromBlastingWindow().getText().then(function(arr) {
        if (arr.indexOf('Contribution') < 0) {
          expect(false).customError('Contribution did not present in blasting window');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution - Edit" is not presented in the blasting window', function() {
      TileOptionsGroupings.getAllCheckBoxFromBlastingWindow().getText().then(function(arr) {
        if (arr.indexOf('Contribution - Edit') >= 0) {
          expect(false).customError('Contribution - Edit  presented in blasting window');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554429', function() {

    it('Should click on "Cancel" button from blasting window', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('Cancel').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Cancel" button from blasting window');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Clear All" button from Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).target.clear();
    });

    it('Verifying if "Selected" section is empty', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(value) {
        if (value !== 0) {
          expect(false).customError('"Selected" section did not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Asset Class" from the Available section under "FactSet"', function() {
      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('FactSet', 'Asset Class')).perform();
    });

    it('Verifying if "Asset Class" is moved in Selected section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Asset Class').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Asset Class" did not move in to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554430', function() {

    it('Should click on "Apply To Weights" button from Tile Options Page', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Apply To Weights" button');
        CommonFunctions.takeScreenShot();
      });
    });

    var reports = ['Raw Factor Exposures', 'Valuation - Multi', 'Contribution'];

    reports.forEach(function(checkbox) {

      // Known Issue: http://is.factset.com/rpd/summary.aspx?messageid=19329021
      // Contribution is not changing as "Contribution - Edit"
      it('Should click on "' + checkbox + '" to check off', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).check();

        // Verifying if checkbox is checked now
        ThiefHelpers.getCheckBoxClassReference(checkbox).isChecked().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + checkbox + '" did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on "OK" button from blasting window', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from blasting window');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Apply to Weights" is changed as "Apply to Multiple Reports"', function() {
      TileOptionsGroupings.getApplyToButton().getText().then(function(text) {
        if (text !== 'Apply To Multiple Reports') {
          expect(false).customError('"Apply to Weights" did not change to "Apply To Multiple Reports"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554431', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Raw Factor Exposures', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Raw Factor Exposures');

    it('Verifying if "Grouping" hyperlink is "Asset Class"', function() {
      PA3MainPage.getGroupingsHyperLink('Raw Factor Exposures').getText().then(function(text) {
        if (text !== 'Asset Class') {
          expect(false).customError('"Asset Class" did not set to grouping hyperlink; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 554432', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Valuation - Multi', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Valuation - Detail');

    var tiles = ['Estimates', 'Valuation - Detail'];

    tiles.forEach(function(tileName) {
      it('Verifying if "Grouping" hyperlink is "Asset Class" for "' + tileName + '" tile', function() {
        PA3MainPage.getGroupingsHyperLink(tileName).getText().then(function(text) {
          if (text !== 'Asset Class') {
            expect(false).customError('"Asset Class" did not set to grouping hyperlink for "' + tileName + '" tile' + '; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 554433', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should select "Format Options>Theme>Quartz" from wrench drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click();
    });

    it('Verifying if "Theme" is converted into "Quartz" mode', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
        if (text.indexOf('carbon') >= 0) {
          expect(false).customError('Theme did not change into the "Quartz" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution - Edit', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if "Grouping" hyperlink is "Asset Class" for "Contribution" tile', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(text) {
        if (text !== 'Asset Class') {
          expect(false).customError('"Asset Class" did not set to grouping hyperlink for "Contribution" tile' + '; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
