'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: universe-blasting-etf', function() {

  var portEndingMarketValueDirect;
  var portEndingValueDirectReport1;
  var portEndingValueCashReport1;
  var portEndingValueDirectReport2;
  var portEndingValueCashReport2;
  var direct;
  var ultraShort;
  var cash;

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 470727', function() {

    it('Should launch the PA3 application with "Client:/PA3/Universe/Uni_Blasting_2" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('uni-blasting-2');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    it('Should make a note of "Port. Ending Market Value" for "Direct" grouping for later verification', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', 'Direct', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          portEndingMarketValueDirect = value;
        });
      });
    });
  });

  describe('Test Step ID: 470728', function() {

    it('Should click "Weights(Asset Type)-2" report from LHP', function() {
      PA3MainPage.getReports('Weights(Asset Type)-2').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Weights(Asset Type)-2 is selected in LHP
      PA3MainPage.getReports('Weights(Asset Type)-2').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Weights(Asset Type)-2" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if the report is loaded with 2 tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('Report is not loaded with two reports; Found: ' + count);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var tileNames = ['Weights2', 'Weights(Asset Type)'];

    it('Verifying if the "Weights2 and Weights(Asset Type)" tiles are present in the report', function() {
      PA3MainPage.getAllTilesFromReport().then(function(references) {
        references.forEach(function(ref) {
          ref.getText().then(function(text) {
            if (tileNames.indexOf(text) < 0) {
              expect(false).customError('"Weights2 and Weights(Asset Type)" tiles are not present in the report');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should make a note of "Port. Ending Market Value" for "Direct" grouping of "Weights2" report for later verification', function() {
      SlickGridFunctions.getCellReference('Weights2', 'Direct', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          portEndingValueDirectReport1 = value;
        });
      });
    });

    it('Should make a note of "Port. Ending Market Value" for "Cash" grouping of "Weights2" report for later verification', function() {
      SlickGridFunctions.getCellReference('Weights2', '[Cash]', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          portEndingValueCashReport1 = value;
        });
      });
    });

    it('Should make a note of "Port. Ending Market Value" for "Direct" grouping of "Weights(Asset Type)" report for later verification', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', 'Direct', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          portEndingValueDirectReport2 = value;
        });
      });
    });

    it('Should make a note of "Port. Ending Market Value" for "Direct" grouping of "Weights(Asset Type)" report for later verification', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', '[Cash]', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          portEndingValueCashReport2 = value;
        });
      });
    });
  });

  describe('Test Step ID: 470737', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    it('Should click on "Universe" tab from LHP to select', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Universe is selected in LHP
      TileOptions.getLHPOption('Universe').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Universe" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Universe' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Universe') < 0) {
          expect(false).customError('"Universe" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Funds" from the "Available" section', function() {
      TileOptionsUniverse.getElement('Funds', 'Available').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Funds is selected in the Available section.
      TileOptionsUniverse.checkIfSelected('Funds', 'Available');
    });

    it('Should click on right arrow to add "Funds" to Selected section', function() {
      TileOptionsUniverse.getArrowButton('Right').click().then(function() {}, function(err) {
        expect(false).CustomError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verify that "Funds" is added to Selected section.
      TileOptionsUniverse.getElement('Funds', 'Selected').isPresent().then(function(bool) {
        if (!bool) {
          expect(false).CustomError('"Funds" is not added to the Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Funds" is added to Selected section at the top of the list', function() {
      TileOptionsUniverse.getIndex('Funds', 'Selected').then(function(index) {
        if (index !== 0) {
          expect(false).CustomError('"Funds" is not added to the Selected section at the top of the list');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 470741', function() {

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights(Asset Type)');

    it('Verifying if the report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights(Asset Type)'), 20000);

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights(Asset Type)').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights(Asset Type)" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    it('Verifying if the "Port. Ending Market Value" for "Direct" group is decreased', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', 'Direct', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          if (parseInt(value) >= parseInt(portEndingValueDirectReport2)) {
            expect(false).customError('"Port. Ending Market Value" for "Direct" group is not decreased; ' + '"Previous value: ' + portEndingValueDirectReport2 + '"; "Present value: ' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the "Port. Ending Market Value" for "Cash" group is increased', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', '[Cash]', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          if (parseInt(value) <= parseInt(portEndingValueCashReport2)) {
            expect(false).customError('"Port. Ending Market Value" for "Cash" group is not increased; ' + '"Previous value: ' + portEndingValueCashReport2 + '"; "Present value: ' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 470743', function() {

    it('Should click on "wrench" icon in the report', function() {
      PA3MainPage.selectWrenchIcon('Weights(Asset Type)');
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Universe" tab from LHP to select', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Universe is selected in LHP
      TileOptions.getLHPOption('Universe').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Universe" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Universe' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Universe') < 0) {
          expect(false).customError('"Universe" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights(Asset Type)" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights(Asset Type)').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "Apply To Weights(Asset Type)" hyperlink');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsUniverse.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Weights(Asset Type)-2" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights(Asset Type)-2').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights(Asset Type)-2').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Weights(Asset Type)-2"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should check "Weights2" item under "Weights(Asset Type)-2" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights2').toggle();

      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights2').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights2" item under "Weights(Asset Type)-2" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
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

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button from "Tile Options" page', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights2'), 20000);

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights2').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights2" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights2" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights2').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights2" report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights2')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Port. Ending Market Value" for "Direct" group is decreased', function() {
      SlickGridFunctions.getCellReference('Weights2', 'Direct', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          if (parseInt(value) >= parseInt(portEndingValueDirectReport1)) {
            expect(false).customError('"Port. Ending Market Value" for "Direct" group is not decreased; ' + '"Previous value: ' + portEndingValueDirectReport1 + '"; "Present value: ' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the "Port. Ending Market Value" for "Cash" group is increased', function() {
      SlickGridFunctions.getCellReference('Weights2', '[Cash]', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          if (parseInt(value) <= parseInt(portEndingValueCashReport1)) {
            expect(false).customError('"Port. Ending Market Value" for "Cash" group is not increased; ' + '"Previous value: ' + portEndingValueCashReport1 + '"; "Present value: ' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 470746', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    it('Should click on "Universe" tab from LHP to select', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Universe is selected in LHP
      TileOptions.getLHPOption('Universe').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Universe" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Universe' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Universe') < 0) {
          expect(false).customError('"Universe" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Expand Composite Assets:" drop down and select "All Levels"', function() {
      ThiefHelpers.selectOptionFromDropDown('All Levels', 'Expand Composite Assets:');
    });

    it('Verifying if "All Levels" is selected in the drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('All Levels', 'Expand Composite Assets:');
    });

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights(Asset Type)');

    it('Verifying if the report is recalculated', function() {
      Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg('Weights(Asset Type)'), 20000);

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights(Asset Type)').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights(Asset Type)" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');

    var groups = ['Direct', 'UltraShort Health Care ProShares', '[Cash]'];
    var columnData;

    it('Should collect groups for verification', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights(Asset Type)', '').then(function(columnGroup) {

        // As it includes Total row also
        columnGroup.splice(0, 1);
        columnData = columnGroup;
      });
    });

    groups.forEach(function(grouping, index) {

      it('Verifying if the "Weights(Asset Type)" contains "' + grouping + '" group in the slick grid', function() {
        if (columnData[index] !== grouping) {
          expect(false).customError('"' + grouping + '" group is not present in the slick grid in "Weights(Asset Type)" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Weights(Asset Type)" contains 3 groups in the slick grid', function() {
      if (columnData.length !== 3) {
        expect(false).customError('"' + columnData.length + '"groups are present in the slick grid in "Weights(Asset Type)" report; Expected: "3"');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should make a note of "Port. Ending Market Value" for "Direct" grouping for later verification', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', 'Direct', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          direct = value;
        });
      });
    });

    it('Should make a note of "Port. Ending Market Value" for "UltraShort Health Care ProShares" grouping for later verification', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', 'UltraShort Health Care ProShares', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          ultraShort = value;
        });
      });
    });

    it('Should make a note of "Port. Ending Market Value" for "[Cash]" grouping for later verification', function() {
      SlickGridFunctions.getCellReference('Weights(Asset Type)', '[Cash]', '', 'Port. Ending Market Value').then(function(reference) {
        reference.getText().then(function(value) {
          cash = value;
        });
      });
    });
  });

  describe('Test Step ID: 470747', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    it('Should click on "Universe" tab from LHP to select', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Universe is selected in LHP
      TileOptions.getLHPOption('Universe').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Universe" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Universe' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Universe') < 0) {
          expect(false).customError('"Universe" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Weights(Asset Type)" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights(Asset Type)').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "Apply To Weights(Asset Type)" hyperlink');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsUniverse.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Weights(Asset Type)-2" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights(Asset Type)-2').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights(Asset Type)-2').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Weights(Asset Type)-2"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should check "Weights2" item under "Weights(Asset Type)-2" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights2').toggle();

      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights2').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights2" item under "Weights(Asset Type)-2" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
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

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if Spinner Icon with with text "Applying Settings" is visible', function() {

      // Verify if the loading icon appears
      ThiefHelpers.getLoadingIconClassReference().getProgress().then(function() {

        // 'Verify if "Applying Settings" is displayed along with loading icon'
        ThiefHelpers.getLoadingIconClassReference().getContent().getText().then(function(text) {
          if (text !== 'Applying Settings') {
            expect(false).customError('Expected: "Applying Settings" but Found: "' + text + '".');
            CommonFunctions.takeScreenShot();
          }else {
            // Waiting for spinner to load
            ThiefHelpers.waitUntilSpinnerDisappears(ThiefHelpers.getLoadingIconClassReference(), 6000);
          }
        });
      }, function() {
      });
    });

    it('Should verify "Tile Options - Weights(Asset Type)" mode is closed', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights(Asset Type)').then(function(found) {
        if (found) {
          expect(false).customError('View is still displayed as "Tile Options - Weights(Asset Type)".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the report is recalculated', function() {

      // Verifying report is recalculating
      PA3MainPage.getReportCalculationDlg('Weights2').isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Weights2" report did not recalculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights2');
  });

  describe('Test Step ID: 470748', function() {

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights(Asset Type)', 'Options');

    it('Should click on "Universe" tab from LHP to select', function() {
      TileOptions.getLHPOption('Universe').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Universe is selected in LHP
      TileOptions.getLHPOption('Universe').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Universe" did not get selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });

      // Checking if 'Universe' item is opened.
      TileOptions.getOptionTitle().getText().then(function(text) {
        if (text.indexOf('Universe') < 0) {
          expect(false).customError('"Universe" tile did not get opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Disable asset type adjustments" check box', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, TileOptionsUniverse.xpathDisableAssetTypeAdjustmentsCheckBox).check();
    });

    it('Should click on "Apply To Weights(Asset Type)" hyperlink', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights(Asset Type)').press().then(function() {}, function() {
        expect(false).customError('Unable to click on "Apply To Weights(Asset Type)" hyperlink');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsUniverse.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Weights(Asset Type)-2" if not already expanded', function() {
      ThiefHelpers.getChecklistClassRef().getGroupByText('Weights(Asset Type)-2').isExpanded().then(function(expanded) {
        if (!expanded) {
          ThiefHelpers.getChecklistClassRef().getGroupByText('Weights(Asset Type)-2').toggleExpandedState().then(function() {}, function() {
            expect(false).customError('Unable click on "+" button to expand "Weights(Asset Type)-2"');
            CommonFunctions.takeScreenShot();
          });
        }
      });
    });

    it('Should check "Weights2" item under "Weights(Asset Type)-2" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights2').toggle();

      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Weights2').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Weights2" item under "Weights(Asset Type)-2" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
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

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "OK" button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if Spinner Icon with with text "Applying Settings" is visible', function() {

      //Verify if the loading icon appears
      ThiefHelpers.getLoadingIconClassReference().getProgress().then(function() {

        //'Verify if "Applying Settings" is displayed along with loading icon'
        ThiefHelpers.getLoadingIconClassReference().getContent().getText().then(function(text) {
          if (text !== 'Applying Settings') {
            expect(false).customError('Expected: "Applying Settings" but Found: "' + text + '".');
            CommonFunctions.takeScreenShot();
          }else {
            // Waiting for spinner to load
            ThiefHelpers.waitUntilSpinnerDisappears(ThiefHelpers.getLoadingIconClassReference(), 6000);
          }
        });
      }, function() {
      });
    });

    var tiles = ['Weights2', 'Weights(Asset Type)'];

    tiles.forEach(function(tileName) {

      it('Verifying if the report is recalculated', function() {
        Utilities.waitUntilElementAppears(PA3MainPage.getReportCalculationDlg(tileName), 20000);

        // Verifying report is recalculating
        PA3MainPage.getReportCalculationDlg(tileName).isPresent().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + tileName + '" report did not recalculate');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights2');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights(Asset Type)');
  });
});
