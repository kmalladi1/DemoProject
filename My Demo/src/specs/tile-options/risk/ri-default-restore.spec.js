'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-default-restore', function() {

  describe('Test Step ID: 678206', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/PA3/Risk/Select_Deselect_Default_Risk_Model"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('select-deselect-default-risk-model');
    });

    var reportNames = ['Default_Applied', 'Non_Default_Applied'];

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });
  });

  describe('Test Step ID: 678207', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Default_Applied', 'Risk Models', 'Risk');

    it('Verifying if "Defaults Applied" is checked by default', function() {
      TileOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is checked by default');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Barra US Long-Term Model (USE4L)" is checked by default in selected section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Barra US Long-Term Model (USE4L)');
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 678208', function() {

    it('Should enter "Axioma US Fundamental" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText('Axioma US Fundamental');

      // Verifying that "Axioma US Fundamental" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
        if (text !== 'Axioma US Fundamental') {
          expect(false).customError('"Axioma US Fundamental" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(4000);
    });

    it('Select "Axioma US Fundamental Equity Risk Model MH 2" from the Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Axioma');
      group.expand();

      group.getItemByText('Axioma US Fundamental Equity Risk Model MH 2').then(function(listItem) {
        listItem.select();

        // Check if 'Axioma US Fundamental Equity Risk Model MH 2' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Axioma US Fundamental Equity Risk Model MH 2" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on right arrow button to move "Axioma US Fundamental Equity Risk Model MH 2" to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Axioma US Fundamental Equity Risk Model MH 2" checkbox is added to the selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Axioma US Fundamental Equity Risk Model MH 2') === -1) {
          expect(false).customError('"Axioma US Fundamental Equity Risk Model MH 2" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('De-select "Barra US Long-Term Model (USE4L)" by un-checking it', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Barra US Long-Term Model (USE4L)');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).uncheck();

      // Verifying that "Barra US Long-Term Model (USE4L)" check box is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Restore Defaults" button is displayed in "Tile Options - Default_Applied" header', function() {
      TileOptions.getRestoreDefaultsButton().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Restore Defaults" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 678209', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Default_Applied');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Default_Applied');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Non_Default_Applied', 'Risk Models', 'Risk');

    it('Select "Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)');

      // Verifying if "Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)" is selected.
      item.isSelected().then(function(selected) {
        if (!selected) {
          item.select();
        }
      });
    });

    it('Verifying if "Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)" checked in the selected section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Barra Global Total Market Model for Long Term Investors - Stable Variant (GEMLTL)" is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Barra US Long-Term Model (USE4L)" is un-checked in the selected section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Barra US Long-Term Model (USE4L)');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Restore Defaults" button is displayed in "Tile Options - Non_Default_Applied" header', function() {
      TileOptions.getRestoreDefaultsButton().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Restore Defaults" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "FactSet: Risk Indices Breakout" option is selected in "Factor Grouping" dropdown', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Risk Indices Breakout', 'Factor Grouping', undefined);
    });

  });

  describe('Test Step ID: 678211', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Non_Default_Applied');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Non_Default_Applied');

    it('Should click on "Refresh" icon from application', function() {
      PA3MainPage.getRefreshIcon().click();
    });

    var reportNames = ['Default_Applied', 'Non_Default_Applied'];

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Default_Applied', 'Risk Models', 'Risk');

    it('Select "Barra US Long-Term Model (USE4L)" by checking it', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Barra US Long-Term Model (USE4L)');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying that "Barra US Long-Term Model (USE4L)" check box is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Barra US Long-Term Model (USE4L)" is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('De-select "Axioma US Fundamental Equity Risk Model MH 2" by un-checking it', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'Axioma US Fundamental Equity Risk Model MH 2');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).uncheck();

      // Verifying that "Axioma US Fundamental Equity Risk Model MH 2" check box is unchecked
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Axioma US Fundamental Equity Risk Model MH 2" is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Restore Defaults" button is displayed in "Tile Options - Default_Applied" header', function() {
      TileOptions.getRestoreDefaultsButton().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Restore Defaults" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 678212', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Non_Default_Applied');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Default_Applied');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Non_Default_Applied', 'Risk Models', 'Risk');

    it('Should click "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK');

    it('Verifying if "Defaults Applied" is displayed', function() {
      TileOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is checked by default');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 678213', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Non_Default_Applied');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Non_Default_Applied');

    it('Should click on "Refresh" icon from application', function() {
      PA3MainPage.getRefreshIcon().click();
    });

    it('Should wait for reports to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    var reportNames = ['Default_Applied', 'Non_Default_Applied'];

    reportNames.forEach(function(reportName) {
      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);
    });

    var arrOfDefaultsApplied = [];
    var arrOfNonDefaultsApplied = [];
    var columnIndex = [];

    it('Storing the column indexes from the report', function() {
      SlickGridFunctions.getColumnNames('Default_Applied').then(function(columnNames) {
        columnNames.forEach(function(name, index) {
          columnIndex.push(index);
        });
      });
    });

    it('Storing values of "Default_Applied" and "Non_Default_Applied" tiles', function() {
      columnIndex.forEach(function(columnIndex) {
        SlickGridFunctions.getAllRowsFromReport('Default_Applied').then(function(dataView) {
          dataView.forEach(function(eleRef1) {
            arrOfDefaultsApplied.push(eleRef1[columnIndex]);
          });
        });

        SlickGridFunctions.getAllRowsFromReport('Non_Default_Applied').then(function(dataView) {
          dataView.forEach(function(eleRef2) {
            arrOfNonDefaultsApplied.push(eleRef2[columnIndex]);
          });
        });
      });

    });

    it('Verify if both tiles "Default_Applied" and "Non_Default_Applied" are identical', function() {
      var needScreenShot = 0;
      for (var i = 0; i < arrOfDefaultsApplied.length; i++) {
        if (arrOfDefaultsApplied[i] !== arrOfNonDefaultsApplied[i]) {
          expect(false).customError('Tiles "Default_Applied" and "Non_Default_Applied" are not identical. "Default_Applied":"' + arrOfDefaultsApplied[i] + '" and "Non_Default_Applied": "' + arrOfNonDefaultsApplied[i] + '"');
          needScreenShot++;
        }

        if (needScreenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      }
    });
  });
});
