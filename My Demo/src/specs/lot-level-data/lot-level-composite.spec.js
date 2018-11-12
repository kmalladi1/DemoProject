'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lot-level-composite', function() {

  var screenShot = 0;

  describe('Test Step ID: Start Up Instructions', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 545008', function() {

    it('Should launch the PA3 application with document "Client:;Pa3;lot_detail;LOT_LEV_DET_2"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lot-lev-det-2');
    });

    it('Should wait for "Contribution to Return" report to calculate', function() {
      // Waiting for "Contribution to Return" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" found while report calculation.');
        }
      });
    });

    it('Verifying if "Contribution to Return" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution to Return" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "Wrench" icon in "Contribution to Return" report toolbar', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution to Return').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click "Wrench" icon in "Contribution to Return" report toolbar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if "Wrench" dropdown is opened and selecting "Options" from "Wrench" menu list', function() {
      ThiefHelpers.isDropDownOpen().then(function(open) {
        if (open) {

          // Wait time to open tile Wrench menu
          CommonFunctions.waitUntilElementAppears(PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options'), 3000);

          PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
            },
            function() {
              expect(false).customError('Unable to select "Options" from "Wrench" menu list');
              CommonFunctions.takeScreenShot();
            });
        } else {
          expect(false).customError('"Wrench" dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Tile Options" dialog is opened', function() {
      TileOptions.isTileOptionsMode().then(function(tileOptionMode) {
        if (!tileOptionMode) {
          expect(false).customError('"Tile Options" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Universe" tab from LHP in "Tile Options" dialog', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Universe" tab from LHP in "Tile Options" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Universe" tile option is opened', function() {
      TileOptions.getOptionTitle().getText().then(function(option) {
        if (option !== 'Universe') {
          expect(false).customError('"Universe" tile option is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the "Expand Lot Level Data" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('', TileOptionsUniverse.xpathExpandLotLevelDataCheckBox).isChecked().then(function(checkBox) {
        if (!checkBox) {
          ThiefHelpers.getCheckBoxClassReference('', TileOptionsUniverse.xpathExpandLotLevelDataCheckBox).check();
        } else {
          expect(false).customError('"Expand Lot Level Data" check box is already checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Should wait for "Contribution to Return" report to calculate', function() {
      // Waiting for "Contribution to Return" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Contribution to Return" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Contribution to Return" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Composite Components" grouping is displayed in the "Contribution to Return" report', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution to Return').getText().then(function(groupingText) {
        if (groupingText !== 'Composite Components') {
          expect(false).customError('"Composite Components" grouping is not displayed in the ' +
            '"Contribution to Return" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "30-JAN-2015 - 25-FEB-2015" date hyperlink is displayed', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(date) {
        if (date !== '30-JAN-2015 - 25-FEB-2015') {
          expect().customError('"30-JAN-2015 - 25-FEB-2015" date hyperlink is not displayed instead display' +
            'ed ' + date);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if there are different Lot ID\'s for same security', function() {
      browser.executeScript(function() {
        var lotIDs = [];
        var dataItems = $('.tf-slick-grid').data('$tfSlickGridController').grid.getData().getItems();
        dataItems.forEach(function(dataObject) {
          if (dataObject[1] === 'Council Of Europe Development Bank 2.625% 16-feb-2016' && dataObject[2] !== '@NA') {
            lotIDs.push(dataObject[2]);
          }
        });
        return lotIDs;
      }).then(function(lotIDs) {
        for (var i = 1; i < lotIDs.length; i++) {
          for (var k = 1; k < lotIDs.length; k++) {
            if (i !== k && lotIDs[i] === lotIDs[k]) {
              screenShot++;
              expect(false).customError(lotIDs[i] + ' and ' + lotIDs[k + 1] + ' are same');
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 545805', function() {

    it('Should click "Wrench" icon in "Contribution to Return" report toolbar', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Contribution to Return').click().then(function() {
      }, function() {
        expect(false).customError('Unable to click "Wrench" icon in "Contribution to Return" report toolbar');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if "Wrench" dropdown is opened and selecting "Options" from "Wrench" menu list', function() {
      ThiefHelpers.isDropDownOpen().then(function(drpDwn) {
        if (drpDwn) {
          PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
            },
            function() {
              expect(false).customError('Unable to select "Options" from "Wrench" menu list');
              CommonFunctions.takeScreenShot();
            });
        } else {
          expect(false).customError('"Wrench" dropdown is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Tile Options" dialog is opened', function() {
      TileOptions.isTileOptionsMode().then(function(tileOption) {
        if (!tileOption) {
          expect(false).customError('"Tile Options" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Universe" tab from LHP in "Tile Options" dialog', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {
      }, function() {
        expect(false).customError('"Universe" tab from LHP in "Tile Options" dialog is not selected');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Universe" tile option is opened', function() {
      TileOptions.getOptionTitle().getText().then(function(option) {
        if (option !== 'Universe') {
          expect(false).customError('"Universe" tile option is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Expand Lot Level Data" check box is checked', function() {
      TileOptionsUniverse.getCheckBox('Expand Lot Level Data').getAttribute('class').then(function(checkBoxStatus) {
        if (checkBoxStatus.indexOf('checked') === -1) {
          expect(false).customError('"Expand Lot Level Data" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Exclusions" tab from LHP in "Tile Options" dialog', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function() {
        expect(false).customError('Unable to select "Exclusions" tab from LHP in "Tile Options" dialog');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Exclusions" tile option is opened', function() {
      TileOptions.getOptionTitle().getText().then(function(option) {
        if (option !== 'Exclusions') {
          expect(false).customError('"Exclusions" tile option is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exclude Benchmark" check box is checked', function() {
      TileOptionsExclusions.getCheckbox('Exclude Benchmark').getAttribute('class').then(function(checkBoxStatus) {
        if (checkBoxStatus.indexOf('checked') === -1) {
          expect(false).customError('"Exclude Benchmark" check box is not checked');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Exclude Benchmark" check box is greyed out', function() {
      ThiefHelpers.getCheckBoxClassReference('Exclude Benchmark').isDisabled().then(function(checkBoxStatus) {
        if (checkBoxStatus) {
          expect(false).customError('"Exclude Benchmark" check box is not greyed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 593589', function() {

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press();
    });

    it('Should wait for "Contribution to Return" report to calculate', function() {
      // Waiting for "Contribution to Return" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" found while report calculation.');
        }
      });
    });

    it('Verifying if "Contribution to Return" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution to Return" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "FI_SEC_TYPE" into "Portfolio" widget box and select "Client:/pa3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.getWidgetBox('Portfolio').clear();
      PA3MainPage.setPortfolio('FI_SEC_TYPE', 'Client:/pa3/lot_detail/FI_SEC_TYPE.ACCT', 'Client:/pa3/lot_detail/FI_SEC_TYPE.ACCT')
        .then(function(select) {
          if (!select) {
            expect(false).customError('Error occurred while selecting "Client:/pa3/TEST.ACCT" from type ahead');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Should click on "Portfolio" hamburger icon', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
        ThiefHelpers.isDropDownOpen().then(function(portfolioHamburgerDropDownStatus) {
          if (!portfolioHamburgerDropDownStatus) {
            expect(false).customError('Portfolio hamburger dropdown is not displayed');
            CommonFunctions.takeScreenShot();
          } else {
            ThiefHelpers.getCheckBoxClassReference('Use Multiple Portfolios').check();
          }
        });
      }, function() {
        expect(false).customError('Unable to click on "Portfolio" hamburger icon');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Contribution to Return" report to calculate', function() {
      // Waiting for "Contribution to Return" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Contribution to Return'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" found while report calculation.');
        }
      });
    });

    it('Verifying if "Contribution to Return" report loaded without any error', function() {
      PA3MainPage.isReportCalculated('Contribution to Return').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('"Contribution to Return" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if still there are different Lot ID\'s for same security', function() {
      browser.executeScript(function() {
        var lotIDs = [];
        var dataItems = $('.tf-slick-grid').data('$tfSlickGridController').grid.getData().getItems();
        dataItems.forEach(function(dataObject) {
          if (dataObject[1] === 'Council Of Europe Development Bank 2.625% 16-feb-2016' && dataObject[2] !== '@NA') {
            lotIDs.push(dataObject[2]);
          }
        });
        return lotIDs;
      }).then(function(lotIDs) {
        for (var i = 1; i < lotIDs.length; i++) {
          for (var k = 1; k < lotIDs.length; k++) {
            if (i !== k && lotIDs[i] === lotIDs[k]) {
              screenShot++;
              expect(false).customError(lotIDs[i] + ' and ' + lotIDs[k + 1] + ' are same');
            }
          }
        }

        if (screenShot > 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 762525', function() {

    it('Should open "Client:/Pa3/Lot_detail/Lot_Level_test" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lot-level-test');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Verifying if the date range of "Contribution" report is displayed as "06/26/2017 - 06/27/2017"', function() {
      PA3MainPage.getDateHyperLink().getText().then(function(value) {
        if (value !== '06/26/2017 - 06/27/2017') {
          expect(false).customError('The date range in "Contribution" report did not set to ' +
            '"06/26/2017 - 06/27/2017"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Known issue is present RPD:39995174
    it('Verifying that "Contribution" report is grouped by "Acquisition"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(refVal) {
        if (refVal.indexOf('Acquisition') !== -1) {
          expect(false).customError('The "Contribution" report is grouped by "Acquisition". Known issue is resolved RPD:39995174.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 762528', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Universe');

    it('Should check "Expand Lot Level Data" checkbox', function() {
      ThiefHelpers.setCheckBox(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox, true);
    });

    it('Should click on the "Exclusions" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    var arrOfSelectedSectionItems = ['Acquisitions', 'Lot ID'];
    it('Verify if "Lot ID" is displayed under "Acquisitions"', function() {
      TileOptionsExclusionsEditGroupingsAddRemove.getAllElementsFromSelectedSection().each(function(element, index) {
        element.getText().then(function(name) {
          if (name !== arrOfSelectedSectionItems[index]) {
            expect(false).customError('Expected "' + arrOfSelectedSectionItems[index] + '" but Found: "' + name + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });

  describe('Test Step ID: 762529', function() {

    // Click on the "Cancel" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Cancel', 'Edit Groupings');

    it('Should click on the "Universe" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').select();

      // Verifying if "Universe" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Universe').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Universe" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check "Expand Lot Level Data" checkbox', function() {
      ThiefHelpers.setCheckBox(undefined, TileOptionsUniverse.xpathExpandLotLevelDataCheckBox, false);
    });

    it('Should click on the "Exclusions" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Verify if "Lot ID" is not displayed under "Acquisitions"', function() {
      TileOptionsExclusionsEditGroupingsAddRemove.getAllElementsFromSelectedSection().each(function(element, index) {
        element.getText().then(function(name) {
          if (name === 'Lot ID') {
            expect(false).customError('"Lot ID" is displayed under "Acquisitions".');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });
  });

});
