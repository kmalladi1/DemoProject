'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: universe-blasting', function() {

  var totalReturnFromAttribution1;
  var totalReturnFromAttribution2;
  var countOfSecurityGroups1 = 0;

  describe('Test Step ID: 470653', function() {

    it('Should open "Uni_Blasting" document from "Client:;pa3;universe;"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('uni-blasting');
    });

    it('Should wait for "Attribution" report to calculate', function() {
      // Waiting for "Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report loaded without any error', function() {

      // Verifying if "Attribution" report calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470709', function() {

    it('Should select "Attribution-Tile" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Attribution-Tile').then(function(reportRef) {
        reportRef.click().then(function() {}, function() {
          expect(false).customError('Unable to select "Attribution-Tile" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should wait for "Attribution" and ""Attribution 2" reports to calculate', function() {
      // Waiting for "Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution'), 60000);

      // Waiting for "Attribution 2" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution 2'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report loaded without any error', function() {

      // Verifying if "Attribution" report calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution 2" report loaded without any error', function() {

      // Verifying if "Attribution 2" report calculated
      PA3MainPage.isReportCalculated('Attribution 2').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution 2" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution 2')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution 2" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if there are two tiles "Attribution" and "Attribution 2" in the calculated report', function() {
      PA3MainPage.getAllTilesFromReport().then(function(tileArray) {
        tileArray.forEach(function(tileRef) {
          tileRef.getText().then(function(text) {
            if (text !== 'Attribution' && text !== 'Attribution 2') {
              expect(false).customError('Expected: "Attribution/Attribution 2" tiles instead "' + text + '" found');
            }
          });
        });
      });
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttribution1 = text;
              });
            });
          }
        });
      });
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution 2" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution 2', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution 2', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttribution2 = text;
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 470710', function() {

    var tempGroupsArray = [];
    var totalReturnFromAttributionReport1;

    it('Should click on wrench Icon in "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {}, function() {
        expect(false).customError('Unable to click on wrench Icon in "Attribution" report workspace');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from "Wrench" drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {}, function() {
        expect(false).customError('Unable to select "Options" from "Wrench" drop down menu');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('Tile Options mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Universe" tab from LHP', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function() {
        expect(false).customError('unable to select "Universe" tab from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Universe"', function() {
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Universe') {
          expect(false).customError('View not changed to "Universe" instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Expand Composite Assets:" drop down and select "All Levels"', function() {
      ThiefHelpers.selectOptionFromDropDown('All Levels', 'Expand Composite Assets:');
    });

    it('Verifying if "All Levels" drop down displays "Expand Composite Assets:"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Expand Composite Assets:').getSelectedText().then(function(drpDwnSelectedItem) {
        if (drpDwnSelectedItem !== 'All Levels') {
          expect(false).customError('"Expand Composite Assets:" drop down should displays "All Levels" inste' + 'ad "' + drpDwnSelectedItem + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button at the top corner', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button at the top');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" mode closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('Tile Options mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to calculate', function() {
      // Waiting for "Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report loaded without any error', function() {

      // Verifying if "Attribution" report calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Total" value of "Total Return" column from "Attribution" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          tempGroupsArray = group;
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttributionReport1 = text;
              });
            });
          }
        });
      });
    });

    it('Verifying if "Total" value of "Total Return" column displays different value as the values stored in the "totalReturnFromAttribution1"', function() {
      if (totalReturnFromAttribution1 === totalReturnFromAttributionReport1) {
        expect(false).customError('"Total" value of "Total Return" column not displayed different value as the values' +
          ' stored in the "' + totalReturnFromAttribution1 + '" instead "' + totalReturnFromAttributionReport1 + '" is found the same value');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 470711', function() {

    var totalReturnFromAttributionReport2;

    it('Should click on wrench Icon in "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {}, function() {
        expect(false).customError('Unable to click on wrench Icon in "Attribution" report workspace');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Options" from "Wrench" drop down menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {}, function() {
        expect(false).customError('Unable to select "Options" from "Wrench" drop down menu');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" mode opened', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('Tile Options mode is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Universe" tab from LHP', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function() {
        expect(false).customError('unable to select "Universe" tab from LHP');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Universe"', function() {
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Universe') {
          expect(false).customError('View not changed to "Universe" instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Atribution" button in the top right corner of the "Tile Options - Attribution"', function() {
      ThiefHelpers.getButtonClassReference('Apply To Attribution').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "Apply To Atribution" button in the top right corner of ' + 'the "Tile Options - Attribution"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" menu is displayed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsUniverse.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" menu is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Attribution-Tile" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Attribution-Tile').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Attribution-Tile').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Attribution-Tile"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should check "Attribution 2" item under "Attribution-Tile" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Attribution 2').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Attribution 2" item under "Attribution-Tile" group in "Blasting" menu ia already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getChecklistClassRef().getItemByText('Attribution 2').toggle();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsUniverse.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" menu is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsUniverse.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" menu is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the "Tile Options - Attribution" view at the top right corner', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button in the "Tile Options - Attribution" view at the top right corner');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" dialog is closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('"Tile Options" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution 2" report to calculate', function() {
      // Waiting for "Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution 2'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution 2" report loaded without any error', function() {

      // Verifying if "Attribution 2" report calculated
      PA3MainPage.isReportCalculated('Attribution 2').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution 2" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution 2')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution 2" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Total" value of "Total Return" column from "Attribution 2" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution 2', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution 2', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttributionReport2 = text;
              });
            });
          }
        });
      });
    });

    it('Verifying if "Total" value of "Total Return" column displays different values as the values stored in the "totalReturnFromAttribution2"', function() {
      if (totalReturnFromAttribution2 === totalReturnFromAttributionReport2) {
        expect(false).customError('"Total" value of "Total Return" column displays different values as the values stored' +
          ' in the "' + totalReturnFromAttribution2 + '" instead "' + totalReturnFromAttributionReport2 + '" found the same value');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(groupsArray) {
        countOfSecurityGroups1 = groupsArray.length - 1;
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttribution1 = text;
              });
            });
          }
        });
      });
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution 2" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution 2', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution 2', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttribution2 = text;
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 470712', function() {

    it('Should wait for "Attribution 2" report to calculate', function() {
      // Waiting for "Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution 2'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution 2" report loaded without any error', function() {

      // Verifying if "Attribution 2" report calculated
      PA3MainPage.isReportCalculated('Attribution 2').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution 2" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution 2')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution 2" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Economic Sector" hyperlink in the upper left of the "Attribution" tile', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(hyperLink) {
        if (hyperLink === 'Economic Sector') {
          PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {}, function() {
            expect(false).customError('Unable to click on "Economic Sector" hyperlink in the upper left of the "Attribution" tile');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Economic Sector" hyperlink is not displayed in the upper left of the' + ' "Attribution" tile instead "' + hyperLink + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options"', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('View is not changed to "Tile Options"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(optionTitle) {
        if (optionTitle !== 'Groupings') {
          expect(false).customError('Expected view: "Groupings", instead "' + optionTitle + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Economic Sector - MSCI" item is available in the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - MSCI').isPresent().then(function(itemStatus) {
        if (!itemStatus) {
          expect(itemStatus).customError('"Economic Sector - MSCI" item is not available in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Economic Sector - MSCI" item in the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - MSCI').click().then(function() {}, function(itemStatus) {
        expect(itemStatus).customError('Unable to select "Economic Sector - MSCI" item in the "Selected" section');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Economic Sector - MSCI" item is selected in the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - MSCI').getAttribute('class').then(function(itemStatus) {
        if (itemStatus.indexOf('selected') < 0) {
          expect(false).customError('"Economic Sector - MSCI" item is not selected in the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Left" arrow to remove "Economic Sector - MSCI" item from "Available" section', function() {
      ThiefHelpers.sendElementToAvailableSection();
    });

    it('Verifying if "Economic Sector - MSCI" item is not available in the "Selected" section', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(countOfElementsInSelectedSection) {
        if (countOfElementsInSelectedSection > 0) {
          TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - MSCI').isPresent().then(function(itemStatus) {
            if (itemStatus) {
              expect(itemStatus).customError('"Economic Sector - MSCI" item is still available in the "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });
  });

  describe('Test Step ID: 470713', function() {

    var totalReturnFromAttributionReport1;
    var countOfSecurityGroups2 = 0;

    it('Verifying if "FactSet" group is expanded in the "Available" section', function() {
      TileOptionsGroupings.checkIfExpanded('FactSet');
    });

    it('Should expand "Other" group under "FactSet" group in the "Available" section', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Other', 'FactSet');
    });

    it('Verifying if "FactSet|Other" groups is expanded in the "Available" section', function() {
      TileOptionsGroupings.checkIfExpanded('FactSet|Other');
    });

    it('Should select "Composite Assets" item under "FactSet > Other" in the "Available" section', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Composite Assets').isPresent().then(function(itemStatus) {
        if (itemStatus) {
          TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'Composite Assets').click().then(function() {}, function() {
            expect(false).customError('Unable to select "Composite Assets" item under "FactSet > Other" in the "Available" section');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Composite Assets" item is not available under "FactSet > Other" in the "Available" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Right" arrow to move "Composite Assets" item under "FactSet > Other" in the "Available" section' + ' to "Selected" section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Composite Assets" item is available in the "Selected" section', function() {
      TileOptionsGroupings.getAllElements('Selected').count().then(function(countOfElementsInSelectedSection) {
        if (countOfElementsInSelectedSection < 0) {
          expect(false).customError('No elements available in the "Selected" section');
          CommonFunctions.takeScreenShot();
        } else {
          TileOptionsGroupings.getElementFromSelectedContainer('Composite Assets').isPresent().then(function(itemStatus) {
            if (!itemStatus) {
              expect(false).customError('"Composite Assets" item is not available in the "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Should click on "OK" button at the top corner', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button at the top');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" mode closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('Tile Options mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution" report to calculate', function() {
      // Waiting for "Attribution" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report loaded without any error', function() {

      // Verifying if "Attribution" report calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Total" value of "Total Return" column from "Attribution" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(groupsArray) {
        countOfSecurityGroups2 = groupsArray.length - 1;
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttributionReport1 = text;
              });
            });
          }
        });
      });
    });

    it('Verifying if "Total" value of "Total Return" column displays same value as the values stored in the "totalReturnFromAttribution1"', function() {
      if (totalReturnFromAttribution1 !== totalReturnFromAttributionReport1) {
        expect(false).customError('"Total" value of "Total Return" column displays different value as the values' + ' stored in the "totalReturnFromAttribution1" instead "' + totalReturnFromAttributionReport1 + '" is found');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if count of "Securities" groups is different from the count stored in "countOfSecurityGroups1"', function() {
      if (countOfSecurityGroups1 === countOfSecurityGroups2) {
        expect(false).customError('count of "Securities" groups is same from the count stored in "countOfSecurityGroups1"');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 470723', function() {

    var securitiesGroupInAttribution = [];
    var securitiesGroupInAttribution2 = [];

    it('Should click on "Composite Assets" hyperlink in the upper left of the "Attribution" tile', function() {
      PA3MainPage.getGroupingsHyperLink('Attribution').getText().then(function(hyperLink) {
        if (hyperLink === 'Composite Assets') {
          PA3MainPage.getGroupingsHyperLink('Attribution').click().then(function() {}, function() {
            expect(false).customError('Unable to click on "Composite Assets" hyperlink in the upper left of the "Attribution" tile');
            CommonFunctions.takeScreenShot();
          });
        } else {
          expect(false).customError('"Composite Assets" hyperlink is not displayed in the upper left of the' + ' "Attribution" tile instead "' + hyperLink + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view changed to "Tile Options"', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (!status) {
          expect(false).customError('View is not changed to "Tile Options"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if view is "Groupings"', function() {
      TileOptions.getOptionTitle().getText().then(function(optionTitle) {
        if (optionTitle !== 'Groupings') {
          expect(false).customError('Expected view: "Groupings", instead "' + optionTitle + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Atribution" button in the top right corner of the "Tile Options - Attribution"', function() {
      ThiefHelpers.getButtonClassReference('Apply To Attribution').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "Apply To Atribution" button in the top right corner of ' + 'the "Tile Options - Attribution"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" menu is displayed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" menu is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Attribution-Tile" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Attribution-Tile').isExpanded().then(function(status) {
        if (!status) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Attribution-Tile').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Attribution-Tile"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should check "Attribution 2" item under "Attribution-Tile" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Attribution 2').isChecked().then(function(status) {
        if (status) {
          expect(false).customError('"Attribution 2" item under "Attribution-Tile" group in "Blasting" menu ia already checked');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getChecklistClassRef().getItemByText('Attribution 2').toggle();
        }
      });
    });

    it('Should click on "OK" button in "Blasting Menu"', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsUniverse.getOkOrCancelButtonFromBlastedWindow('OK')).press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button in "Blasting Menu"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" menu is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsGroupings.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" menu is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button in the "Tile Options - Attribution" view at the top right corner', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button in the "Tile Options - Attribution" view at the top right corner');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" dialog is closed', function() {
      TileOptions.isTileOptionsMode().then(function(status) {
        if (status) {
          expect(false).customError('"Tile Options" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Attribution 2" report to calculate', function() {
      // Waiting for "Attribution 2" report to calculate
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference('Attribution 2'), 60000);

      // Verifying if "Calculation Error" dialog appear
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(status) {
        if (status) {
          expect(false).customError('"Calculation Error" found while report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution 2" report loaded without any error', function() {

      // Verifying if "Attribution 2" report calculated
      PA3MainPage.isReportCalculated('Attribution 2').then(function(displayed) {
        if (displayed === false) {
          expect(false).customError('"Attribution 2" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution 2')).toBeTruthy();
        } else {
          expect(false).customError('Error found while calculating "Attribution 2" report: ' + error);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttribution1 = text;
              });
            });
          }
        });
      });
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution 2" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution 2', '', '').then(function(groupsArray) {
        groupsArray.forEach(function(group) {
          if (group === 'Total') {
            SlickGridFunctions.getCellReference('Attribution 2', group, '', 'Total Return', '81820').then(function(cellRef) {
              cellRef.getText().then(function(text) {
                totalReturnFromAttribution2 = text;
              });
            });
          }
        });
      });
    });

    it('Verifying if the "Total" values in the "Total Return" column of "Attribution" and "Attribution 2" tiles are same', function() {
      if (totalReturnFromAttribution1 !== totalReturnFromAttribution2) {
        expect(false).customError('"Total" values in the "Total Return" column of "Attribution" and "Attribution 2" tiles' + ' are different they are "' + totalReturnFromAttribution1 + '" and "' + totalReturnFromAttribution2 + '"');
      }
    });

    it('Should get security groups and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution', '', '').then(function(groupsArray) {
        securitiesGroupInAttribution = groupsArray;
      });
    });

    it('Should get "Total" value of the "Total Return" column from "Attribution 2" and store it for future use', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Attribution 2', '', '').then(function(groupsArray) {
        securitiesGroupInAttribution2 = groupsArray;
      });
    });

    it('Verifying if "Attribution" and "Attribution 2" tiles are having same security groups', function() {
      for (var i = 0; i < securitiesGroupInAttribution.length - 1; i++) {
        if (securitiesGroupInAttribution[i] !== securitiesGroupInAttribution2[i]) {
          expect(false).customError('"Attribution" and "Attribution 2" tiles are having different security groups they ' + ' are "' + securitiesGroupInAttribution[i] + '" and "' + securitiesGroupInAttribution2[i] + '"');
          CommonFunctions.takeScreenShot();
        }
      }
    });
  });
});
