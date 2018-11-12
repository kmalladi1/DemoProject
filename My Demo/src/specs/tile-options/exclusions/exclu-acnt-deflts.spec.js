'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-acnt-deflts', function() {
  // Variable(s)
  var arrDefaultSelectItems = ['Advertising/Marketing Services', 'Aerospace & Defense', 'Agricultural Commodities/Milling', 'Air Freight/Couriers', 'Airlines', 'Aluminum', 'Apparel/Footwear', 'Apparel/Footwear Retail', 'Auto Parts: OEM', 'Automotive Aftermarket'];
  var arrExcludedItemsFromInfoBox = [];
  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 554934', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Verifying if "Weights" report is selected by default in LHP', function() {
      expect(PA3MainPage.getReports('Weights').getAttribute('class')).toContain('selected');
    });
  });

  describe('Test Step ID: 544943', function() {

    it('Should click on the "Wrench" button on the application toolbar', function() {
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appear
      expect(PA3MainPage.getWrenchIcon(true).isPresent()).toBeTruthy();
    });

    it('Should de-select "Automatic Calculation" option', function() {
      expect(PA3MainPage.setAutomaticCalculation(false)).toBeTruthy();
    });

    it('Type "Client:/pa3/test" into "Portfolio" widget box and select "Client:/pa3/TEST.ACCT" from type ahead', function() {
      expect(PA3MainPage.setPortfolio('Client:/pa3/test', 'Client:/pa3/TEST.ACCT', 'CLIENT:/PA3/TEST.ACCT')).toBeTruthy();

      // Checking for 'Error Setting portfolio' dialog box (if appear)
      expect(PA3MainPage.getDialog('Error Setting portfolio').isPresent()).toBeFalsy();
    });

    it('Verifying that "Portfolio" widget is displaying "CLIENT:/PA3/TEST.ACCT"', function() {
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('Client:/pa3/TEST.ACCT');
    });

    it('Verifying that "Benchmark" widget is displaying "RUSSELL:1000"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('RUSSELL:1000');
    });

    it('Verifying that "Excluded: Finance" is displayed next to the groupings hyperlink', function() {
      expect(PA3MainPage.getExclusionsHyperLink('Weights').getText()).toEqual('Excluded: Finance');
    });
  });

  describe('Test Step ID: 544944', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Verifying if "Finance" is present under "Economic Sector > Industry" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Finance') {
          expect(false).customError('"Finance" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544945', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click();

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(calculated) {
        if (!calculated) {
          expect(false).customError('Calculated data for "Weights" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if there was any "Calculation Error"
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Finance" sector is not displayed in the calculated report', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Finance').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 544935', function() {

    it('Enter "CLIENT:/PA3/EXCLUSIONS/SP50_EX_A.ACCT" in "Portfolio" widget', function() {
      // Clear the existing account
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Enter the account
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/PA3/EXCLUSIONS/SP50_EX_A.ACCT', protractor.Key.ENTER);
    });

    it('Verifying that "Portfolio" widget is displaying "CLIENT:/PA3/EXCLUSIONS/SP50_EX_A.ACCT"', function() {
      expect(PA3MainPage.getWidgetBox('Portfolio').getAttribute('value')).toEqual('CLIENT:/PA3/EXCLUSIONS/SP50_EX_A.ACCT');
    });

    it('Verifying that "Benchmark" widget is displaying "SPN:OEX"', function() {
      expect(PA3MainPage.getWidgetBox('Benchmark').getAttribute('value')).toEqual('SPN:OEX');
    });
  });

  describe('Test Step ID: 544936', function() {

    it('Click on "Excluded: Multiple Securities" hyperlink', function() {
      var excluHyperlink = PA3MainPage.getExclusionsHyperLink('Weights');
      excluHyperlink.getText().then(function(text) {
        if (text === 'Excluded: Multiple Securities') {
          excluHyperlink.click();
        }
      });

      // Get the list of excluded securities from InfoBox
      var excluList = PA3MainPage.getAllItemsFromExcludedInfoBox('Weights');
      excluList.each(function(element) {
        element.getText().then(function(value) {
          arrExcludedItemsFromInfoBox.push(value);
        });
      });
    });

    var counter = 0;
    arrDefaultSelectItems.forEach(function(eleName) {
      it('Verifying if "' + eleName + '" is present under excluded InfoBox', function() {
        expect(eleName).toEqual(arrExcludedItemsFromInfoBox[counter + 1]);
        counter++;
      });
    });
  });

  describe('Test Step ID: 544937', function() {

    it('Click on "Edit Exclusions" hyperlink from the excluded window', function() {
      PA3MainPage.getEditExclusionsHyperlinkFromInfoBox('Weights').click();
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Exclusions" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Verifying that "Exclude Cash from Universe" checkbox is selected by default', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Exclude Cash from Universe'))).toBeTruthy();
    });

    var flag = 0;

    it('Verifying the  under "Industry" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Industry').getChildrenText().then(function(elements) {
        elements.forEach(function(ele, index) {
          if (ele.text !== arrDefaultSelectItems[index]) {
            flag = flag + 1;
            expect(false).customError('"' + arrDefaultSelectItems[index] + '" is not added to "Selected" section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 544938', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Should click on "refresh" button in application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Should click on "Options" in the report wrench menu and navigate to "Exclusions" tab in "Tile Options-Weights"
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Should wait for data in "Available" container of "Tile Options - Weights" to load ', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Should double click on "Biotechnology" from the "Available" container of "Exclusions" pill', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Biotechnology');
      group.select();
      group.doubleClick();
    });

    it('Should verify if "Biotechnology" is added under "Industry" tree of "Selected" container in "Tile Options-Weights"', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Industry').getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Biotechnology') < 0) {
          expect(false).customError('"Biotechnology" is not added to "Selected" section of "Tile Options - Weights"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544939', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click();

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Click on "Excluded: Multiple Securities" hyperlink', function() {
      var excluHyperlink = PA3MainPage.getExclusionsHyperLink('Weights');
      excluHyperlink.getText().then(function(text) {
        if (text === 'Excluded: Multiple Securities') {
          excluHyperlink.click();
        }
      });
    });

    it('Verifying that "Biotechnology" is displayed in Excluded window', function() {
      expect(PA3MainPage.getItemFromExcludedInfoBox('Weights', 'Biotechnology').isPresent()).toBeTruthy();
    });
  });

  describe('Test Step ID: 544940', function() {

    it('Should enter "CLIENT:/PA3/EXCLUSIONS/RUS_1000_EX_WEST.ACCT" in "Portfolio" widget and press enter', function() {
      // Should clear the existing Portfolio text
      PA3MainPage.getWidgetBox('Portfolio').clear();

      // Should enter "CLIENT:/PA3/EXCLUSIONS/RUS_1000_EX_WEST.ACCT" text in Portfolio
      PA3MainPage.getWidgetBox('Portfolio').sendKeys('CLIENT:/PA3/EXCLUSIONS/RUS_1000_EX_WEST.ACCT', protractor.Key.ENTER);
    });

    it('Should click on "refresh" button in application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Should wait for the loading icon to disappear and verify if "Weights" report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrElements = [{widgetXpath: PA3MainPage.xpathPortfolioWidget, widgetName: 'Portfolio', widgetText: 'CLIENT:/PA3/EXCLUSIONS/RUS_1000_EX_WEST.ACCT'},
      {widgetXpath: PA3MainPage.xpathBenchmarkWidget, widgetName: 'Benchmark', widgetText: 'RUSSELL:TOP200'},];

    arrElements.forEach(function(element) {
      // Should verify Portfolio and Benchmark texts
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(element.widgetName, element.widgetXpath, element.widgetText);
    });

    it('Should verify if "Weights" report is grouped by "Region of Domicile"', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(refVal) {
        if (refVal.indexOf('Region of Domicile') === -1) {
          expect(false).customError('The "Weights" report is not grouped by "Region of Domicile"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544946', function() {

    it('Should right click on the "North America" and select "Exclusions > Edit Exclusions..." from the menu', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'North America');

      // Right click on "North America" and select "Exclusions > Edit Exclusions..." from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Exclusions|Edit Exclusions…');
    });

    it('Should verify if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Exclusions" is selected in the LHP in "Tile Options - Weights"', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP by default.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    // Known Issue: RPD:16425853 - Exclude Cash is deselected
    it('Should check off the "Exclude Cash from Universe" checkbox in "Exclusions" tab under "Tile Options - Weights"', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getCheckBoxClassReference('Exclude Cash from Universe').isChecked().then(function(checked) {
        if (!checked) {
          // Should select "Exclude Cash from Universe" checkbox manually until the issue gets fixed
          ThiefHelpers.getCheckBoxClassReference('Exclude Cash from Universe').check();
        }
      });
    });

    it('Should verify if "Exclude Cash from Universe" checkbox is checked in "Exclusions" tab under "Tile Options - Weights"', function() {
      ThiefHelpers.getCheckBoxClassReference('Exclude Cash from Universe').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Exclude Cash from Universe" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var flag = 0;
    var arrEle = [];
    it('Should verify all the elements under "Industry" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Industry').getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        arrDefaultSelectItems.forEach(function(val) {
          if (arrEle.indexOf(val) < 0) {
            flag = flag + 1;
            expect(false).customError(val + ' is not found in the Selected section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Should verify if "Biotechnology" is present under "Industry" tree of "Selected" container', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Industry').getChildrenText().then(function(elements) {
        elements.forEach(function(ele) {
          arrEle.push(ele.text);
        });
      }).then(function() {
        if (arrEle.indexOf('Biotechnology') < 0) {
          expect(false).customError('"Biotechnology" is not added to "Selected" section of "Tile Options - Weights"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544941', function() {

    it('Click on "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click();
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verifying that confirmation dialog box disappeared', function() {
      expect(TileOptionsExclusions.getDialog('FactSet Research Systems').isPresent()).toBeFalsy();
    });

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      expect(TileOptions.getDefaultsApplied().isPresent()).toBeTruthy();
    });

    it('Verifying that "Exclude Cash from Universe" checkbox is not selected now', function() {
      expect(TileOptionsExclusions.getCheckbox('Exclude Cash from Universe').getAttribute('data-checked')).toBeNull();
    });

    it('Verifying that "Selected" section displaying only "Western Europe" under "Region of Domicile"', function() {
      // Verifying that there are only two element in the "Selected" section
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Region of Domicile').getChildrenText().then(function(ele) {
        if (ele.length === 1) {
          if (ele[0].text !== 'Western Europe') {
            expect(false).customError('"Western Europe" is not present in Selected container');
            CommonFunctions.takeScreenShot();
          }
        } else {
          expect(false).customError('More than 1 element is present under "Region of Domicile" group');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 544942', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Click on "Refresh" icon from the application toolbar.', function() {
      PA3MainPage.getRefreshIcon().click();

      // Wait for report calculation to start
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying that report is grouped by "Region of Domicile"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Weights').getText()).toEqual('Region of Domicile');
    });

    it('Verifying that "Western Europe" industry is not displayed in the calculated report', function() {
      expect(PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, 'Western Europe').isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 544947', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
      browser.sleep(3000); // Waiting for other components to adjust
    });

    it('Select "Disable Exclusions" checkbox', function() {
      TileOptionsExclusions.getCheckbox('Disable Exclusions').click();

      // Verifying that "Disable Exclusions" checkbox is selected
      expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckbox('Disable Exclusions'))).toBeTruthy();
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Verifying that "Excluded" hyperlink is not displayed in the "Weights" report', function() {
      expect(PA3MainPage.getExclusionsHyperLink('Weights').getText()).toEqual('');
    });
  });

  describe('Test Step ID: 772475', function() {

    it('Should launch the PA3 application with "Client:;Pa3;Risk;Risk_Model_Exclusions" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('risk-model-exclusions');
    });

    // Click on "Wrench" icon and select "options" from the "wrench" menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

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

    it('Verifying if "Available" section contains elements', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(elements) {
        if (elements.length === 0) {
          expect(false).customError('Available Section is empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Selected" section is empty', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getChildrenText().then(function(elements) {
        if (elements.length !== 0) {
          expect(false).customError('Selected Section is not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Assets not covered by the risk model" dropdown is set to "Include in Report"', function() {
      ThiefHelpers.verifySelectedDropDownText('Include in Report', 'Assets not covered by the risk model', undefined);
    });

    it('Verifying if "Restore Defaults" button is displayed in "Tile Options - Weights" header', function() {
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

  describe('Test Step ID: 772477', function() {

    it('Should click "Restore Defaults" button', function() {
      TileOptions.getRestoreDefaultsButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    var arrItems = [];
    it('Verify if "Economic Sector|Finance" is added to the "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(arrObject) {
            if (arrObject.length === 1) {
              if (arrObject[0].text !== 'Finance') {
                expect(false).customError('"Finance" is not added to the "Selected" section. Found ' + arrObject[0].text);
                CommonFunctions.takeScreenShot();
              }
            } else {
              expect(false).customError('More than one child element is present in selected section');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Economic Sector" is not expanded in "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Assets not covered by the risk model" dropdown is set to "Exclude to Transaction Effect"', function() {
      ThiefHelpers.verifySelectedDropDownText('Exclude to Transaction Effect', 'Assets not covered by the risk model', undefined);
    });

    it('Verifying that "Restore Defaults" button is changed to "Defaults Applied"', function() {
      TileOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Restore Defaults" button is not changed to "Defaults Applied');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: Shut Down Instruction', function() {
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');
  });
});
