'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-spar-series', function() {

  var toolTipValues = [{field: 'Factor', value: 'RUSSELL:R.1000'}, {field: 'Shock Amount', value: '20'}, {field: 'Decay Rate Time', value: '0.5400'}, {
    field: 'Decay Rate Event',
    value: '0.3700',
  }, {field: 'Type', value: 'SPAR Series'}, {field: 'History Limit', value: '29-MAY-2012'},];

  describe('Test Step ID: Start Up', function() {
    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);
  });

  describe('Test Step ID: 555894', function() {

    it('Should open PA3 Application with "Client:;Pa3;Risk;PA3_Stress_Test"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-stress-test');
    });

    it('Verifying if "Calculation Error" dialog appeared', function() {
      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(found) {
        if (!found) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Calculation Error" popup was not appeared');
        }
      });
    });

    it('Should click on "OK" button to close "Calculation Error" dialog', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'MSCI_EM:AC_WORLD_FREE', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'FTAWI:ALL_WORLD_INDEX', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if "Weights" tile shows date from "06-MAY-2015"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(date) {
        if (date !== '06-MAY-2015') {
          expect(false).customError('Expected date: "06-MAY-2015", but displayed: ' + date);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 555895', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should type "War" in the Available search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).setText('War');
    });

    it('Verifying if "War" is typed in the Available search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskStressTests.xpathSearchBox).getText().then(function(text) {
        if (text !== 'War') {
          expect(false).customError('"War" is not typed in the Available search field instead "' + text + '" found');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if search results are displayed relevant to "War"', function() {
      TileOptionsRiskStressTests.getAllElementsFromAvailAfterSearch().each(function(element) {
        element.getText().then(function(value) {
          if (value.indexOf('War') === -1) {
            expect(false).customError('This "' + value + '" results displayed in the "Available" section' + ' does not contain "War".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 555896', function() {

    it('Should click on "X" icon in the "Available" search box', function() {
      element(by.xpath(TileOptionsRiskStressTests.xpathSearchBoxDeleteIcon)).click().then(function() {}, function() {
        expect(false).customError('Unable to click on "X" icon in the "Available" search box');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "Add" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press().then(function() {}, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "SPAR Series" is selected form the Type drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('SPAR Series', undefined, CreateNewStressTest.getDropDown('Type'));

      // Verifying if SPAR Series is selected form the drop down
      ThiefHelpers.verifySelectedDropDownText('SPAR Series', undefined, CreateNewStressTest.getDropDown('Type'));
    });

    it('Should enter "RUSSELL:R.1000" in the "Factor" field', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('RUSSELL:R.1000').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    it('Verifying if "RUSSELL:R.1000" is displayed in "Factor" field', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'RUSSELL:R.1000') {
          expect(false).customError('"RUSSELL:R.1000" is not typed into the Factor field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "New Stress Test" is displayed in "Name" field', function() {
      // Verifying that "New Stress Test" is typed into the Name field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'New Stress Test') {
          expect(false).customError('"New Stress Test" is not typed into the Name field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555897', function() {

    it('Should enter "-%" in the "Shock" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).setText('-%');
    });

    it('Verifying if the "Shock" text box is set to "-%"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (text !== '-%') {
          expect(false).customError('The "Shock" textbox is not set to "-%"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Shock" text box is displayed with red warning icon and click on it', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getErrors().then(function(text) {
        if (text.length === 0) {
          expect(false).customError('Warning icon is not displayed in "Portfolio" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "-%" in the "Shock" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).setText('20');
    });

    it('Verifying if the "Shock" text box is set to "20"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (text !== '20') {
          expect(false).customError('The "Shock" text box is not set to "20"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to expand "Advanced options" accordion section', function() {
      CreateNewStressTest.getAccordion('Advanced Options').click();
    });

    it('Should enter "0.54" in the "Decay Rate (For Time Weighted)" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Time Decay Rate', true)).setText('0.54');
    });

    it('Verifying if the "Decay Rate (For Time Weighted)" text box is set to "0.54"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Time Decay Rate', true)).getText().then(function(text) {
        if (text !== '0.54') {
          expect(false).customError('The "Decay Rate (For Time Weighted)" text box is not set to "0.54"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "0.37" in the "Decay Rate (For Event Weighted)" text box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Event Decay Rate', true)).setText('0.37');
    });

    it('Verifying if the "Decay Rate (For Event Weighted)" text box is set to "0.37"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Event Decay Rate', true)).getText().then(function(text) {
        if (text !== '0.37') {
          expect(false).customError('The "Decay Rate (For Event Weighted)" text box is not set to "0.37"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Force Return for Shocked Asset" check box of "Advanced Options" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathCheckBoxFromAccordian, 'Force Return for Shocked Asset');
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).check();

      // Verifying if "Force Return for Shocked Asset" check box is selected
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Force Return for Shocked Asset" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clear the text in the risk model and click on the dropdown expand the group and select option
    CreateNewStressTest.clearRiskModelTextBoxAndExpandGroupToSelectOption('Axioma', 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1');

  });

  describe('Test Step ID: 555899', function() {

    var columnNames = ['Date', 'New Stress Test', 'Time Weight', 'Event Weight'];

    var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathCurrencyDropdown, 'Currency');

    it('Should open "Currency" drop down and select "Japanese Yen"', function() {
      ThiefHelpers.selectOptionFromDropDown('Japanese Yen', undefined, xpath, 1);
    });

    it('Verifying if "Currency" drop down is set to "Japanese Yen"', function() {
      ThiefHelpers.verifySelectedDropDownText('Japanese Yen', undefined, xpath);
    });

    it('Should select "Report Start Date" from "Date" drop down ', function() {
      ThiefHelpers.getDatepickerClassReference('Report Date').selectShortcutByText('One Year Ago');

      ThiefHelpers.getDatepickerClassReference('Report Date').getDate().then(function(text) {
        if (text !== 'One Year Ago') {
          expect(false).customError('Expected:"One Year Ago" but Found: "' + text + '" in the "Report Date" text box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "History Limit" date picker button', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateNewStressTest.xpathHistoryLimitDatePickerButton).press();
    });

    it('Should set the date to "5/29/2012" in "Report Date" text box', function() {
      ThiefHelpers.setDateInCalendar('5/29/2012', 2);
    });

    it('Verifying if "History Limit" date picker text box is set to "29-May-2012"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatepickerTextbox, 'History Limit');
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '29-May-2012') {
          expect(false).customError('The "Report Date" text box is not set to "29-May-2012"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Report Date" calender button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(EditStressTest.xpathDatePickerButton, 'Report Date');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should set the date to "05/06/2015" in "Report Date" text-box', function() {
      ThiefHelpers.setDateInCalendar('05/06/2015', 2);
    });

    it('Verifying if "Report Date" date-picker text-box is set to "06-May-2015"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, EditStressTest.getInputBox('Report Date')).getText().then(function(text) {
        console.log(text);
        if (text !== '06-May-2015') {
          expect(false).customError('The "Report Date" text box is not set to "06-May-2015"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on Refresh icon
    EditStressTest.clickOnRefreshButton();

    it('Verifying if "' + columnNames + '" columns are present in the preview section', function() {
      CreateNewStressTest.getAllColumnNames().then(function(colDataArr) {
        columnNames.forEach(function(column) {
          if (colDataArr.indexOf(column) === -1) {
            expect(false).customError(column + ' column is not present in the Preview section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying All columns has data in the grid', function() {
      CreateNewStressTest.verifyAllColumnsInGridHasValues().then(function(bool) {
        if (bool !== true) {
          expect(false).customError('Grid in Preview section has some empty cells');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555898', function() {

    it('Should enter "SPAR-Series-Test1" in "Name" field', function() {
      // Enter "SPAR-Series-Test1" into the Name field
      ThiefHelpers.getTextBoxClassReference('Name').setText('SPAR-Series-Test1');
    });

    it('Verifying if "SPAR-Series-Test1" is displayed in "Name" field', function() {
      // Verifying that "SPAR-Series-Test1" is typed into the Name field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'SPAR-Series-Test1') {
          expect(false).customError('"SPAR-Series-Test1" is not typed into the Name field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal');

    // Disabling wait for angular to handle loading icon
    it('Disabling wait for angular', function() {
      browser.ignoreSynchronization = true;
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should wait for the spinner icon to Appear', function() {
      Utilities.waitUntilElementAppears(CreateNewStressTest.getSpinner(), 10000);
    });

    it('Verifying if "Saving stress test" loading icon appears', function() {
      CreateNewStressTest.getSpinner().isPresent().then(function(bool) {
        if (!bool) {
          expect(false).customError('Saving stress test loading icon is not appeared icon');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for the spinner icon to Disappear', function() {
      Utilities.waitUntilElementDisappears(CreateNewStressTest.getSpinner(), 30000);
    });

    it('Verifying if "Create New Stress Test" dialog disappeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Stress Test" dialog has not disappeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });
  });

  describe('Test Step ID: 555900', function() {

    it('Verifying if "Personal" from the Available section is expanded by default. If not, expand it', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    it('Should select "Personal > SPAR-Series-Test1" from the Available section and click on "info" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        console.log(expanded);
        if (expanded) {
          group.getItemByText('SPAR-Series-Test1').then(function(subGroup) {
            subGroup.select();

            // Check if 'SPAR-Series-Test1' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"SPAR-Series-Test1" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }else {
                subGroup.getIcons().then(function(icons) {
                  icons.clickIcon('info');
                });
              }
            });
          });
        } else {
          expect(false).customError('"SPAR-Series-Test1" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying Preview gets populated with properties of SPAR-Series-Test1 which are entered in previous steps
    toolTipValues.forEach(function(element) {
      it('Verifying if "' + element.field + '" is set to "' + element.value + '"', function() {
        TileOptionsRiskStressTests.getInfoBoxData(element.field, 'dialog').getText().then(function(value) {
          if (value !== element.value) {
            expect(false).customError('"SPAR-Series-Test1" Info box is displayed "' + element.field + '" as "' + value + '", Expected: ' + element.value);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 555902', function() {

    var menuOptions = ['Duplicate', 'Edit', 'Remove'];
    var optionsArr = [];

    it('Should click on "wrench" icon next to "SPAR-Series-Test1"', function() {
      TileOptionsRiskStressTests.getElementActionsFromAvailable('Personal', 'SPAR-Series-Test1')._openMenu().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if wrench drop down appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Fetching wrench menu options', function() {
      ThiefHelpers.getMenuClassReference()._menu.all(by.css('tf-menu-item')).then(function(eleRef) {
        eleRef.forEach(function(Ref) {
          Ref.getText().then(function(menuOption) {
            optionsArr.push(menuOption);
          });
        });
      });
    });

    menuOptions.forEach(function(option) {
      it('Verifying if "' + option + '" is displayed in wrench menu', function() {
        if (optionsArr.indexOf(option) === -1) {
          expect(false).customError('"' + option + '" is not displayed in "Wrench" menu');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555903', function() {

    it('Should select "Edit" from the wrench menu', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Edit').then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Edit Stress Test" dialog is displayed', function() {
      ThiefHelpers.getDialogClassReference('Edit Stress Test', 1).isOpen().then(function(dialogStatus) {
        if (!dialogStatus) {
          expect(false).customError('"Edit Stress Test" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click to expand "Advanced options" accordion section', function() {
      CreateNewStressTest.getAccordion('Advanced Options').click();
    });

    it('Verifying if the "Shock" text box is set to "20"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getText().then(function(text) {
        if (text !== '20.0000') {
          expect(false).customError('The "Shock" text box is not set to "20", found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "History Limit" date picker text box is set to "29-May-2012"', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathDatepickerTextbox, 'History Limit');
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(text) {
        if (text !== '29-May-2012') {
          expect(false).customError('The "Report Date" textbox is not set to "29-May-2012"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Decay Rate (For Time Weighted)" text box is set to "0.54"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Time Decay Rate', true)).getText().then(function(text) {
        if (text !== '0.5400') {
          expect(false).customError('The "Decay Rate (For Time Weighted)" text box is not set to "0.54", found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Decay Rate (For Event Weighted)" text box is set to "0.37"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Event Decay Rate', true)).getText().then(function(text) {
        if (text !== '0.3700') {
          expect(false).customError('The "Decay Rate (For Event Weighted)" text box is not set to "0.37", found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Force Return for Shocked Asset" check box of "Advanced Options" section if checked off', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathCheckBoxFromAccordian, 'Force Return for Shocked Asset');

      // Verifying if "Force Return for Shocked Asset" check box is selected
      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Force Return for Shocked Asset" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Cancel" button of "Edit Stress Test" dialog box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateNewStressTest.xpathButtonFromDialog, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');
  });

  describe('Test Step ID: 555904', function() {

    var arrColumnNames = ['Factor Stress Test Coverage Flag', 'Percent Return (Time Wght)', 'Percent Return (Event Wght)'];
    var cellValues = ['2,465', '14.7', '21.3'];
    var valuesOfPercentageReturnTime = ['14.2', '14.3', '14.4', '14.5', '14.6', '14.7', '14.8','14.9', '15', '15.1', '15.2'];
    var valuesOfPercentageReturnEvent = ['20.7', '20.8', '20.9', '21', '21.1', '21.2', '21.3', '21.4', '21.5', '21.6', '21.7', '21.8'];
    var takeScreenShot = 0;

    it('Should click on the "Wrench" button from the report workspace', function() {
      PA3MainPage.selectWrenchIcon('Weights');

      //Verifying wrench menu list is displayed in "Weights" report workspace'
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not displayed in "Weights" report workspace.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from menu drop down of "Weights" report workspace ', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {}, function() {

        expect(false).customError(' Not able to select "Options" option from "menu dropdown" of ' + '"Weights" report workspace');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Tile Options" page is opened', function() {
      //verifying tile options mode is opened
      TileOptions.isTileOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('Tile Options mode is Closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Risk Models" under "Risk" tab from LHP to select', function() {
      TileOptions.getLHPOption('Risk Models').click().then(function() {}, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Risk Models is selected in LHP
      TileOptions.getLHPOption('Risk Models').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Risk Models" is not selected in LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand and select "Axioma" and select "Axioma > Axioma World-Wide Fundamental Equity Risk Model MH 2.1" from the Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Axioma');
      group.expand();
      group.getItemByText('Axioma World-Wide Fundamental Equity Risk Model MH 2.1').then(function(listItem) {
        listItem.select();

        // Check if 'Axioma World-Wide Fundamental Equity Risk Model MH 2.1' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Axioma World-Wide Fundamental Equity Risk Model MH 2.1" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click "right arrow" from the Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsRiskRiskModels.xpathTransferBox);
    });

    it('Verifying if "Axioma World-Wide Fundamental Equity Risk Model MH 2.1" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Axioma World-Wide Fundamental Equity Risk Model MH 2.1') === -1) {
          expect(false).customError('"Axioma World-Wide Fundamental Equity Risk Model MH 2.1" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Risk > Stress Tests" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Stress Tests').click().then(function() {}, function() {

        expect(false).customError('"Stress Tests tab" is not clicked on LHP in tile options');
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Stress Tests"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Risk - Stress Tests') {
          expect(false).customError('Risk > Stress Tests is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Personal" from the Available section is expanded by default. If not, expand it', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        if (!expanded)  {
          group.expand();
        }
      });
    });

    it('Perform double click on "Personal > SPAR-Series-Test1" from the Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        console.log(expanded);
        if (expanded) {
          group.getItemByText('SPAR-Series-Test1').then(function(subGroup) {
            subGroup.select();

            // Check if 'SPAR-Series-Test1' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"SPAR-Series-Test1" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }else {
                subGroup.doubleClick();
              }
            });
          });
        } else {
          expect(false).customError('"SPAR-Series-Test1" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "SPAR-Series-Test1" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('SPAR-Series-Test1') === -1) {
          expect(false).customError('"SPAR-Series-Test1" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    var arrOfValues = [cellValues, valuesOfPercentageReturnTime, valuesOfPercentageReturnEvent];

    arrColumnNames.forEach(function(colName, index) {
      it('Verify that the Total value for "' + colName + '" column in the report displays "' + cellValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Weights', 'Total', '', colName, 'SPAR-Series-Test1').then(function(ref) {
          ref.getText().then(function(val) {
            if (arrOfValues[index].indexOf(val) < 0) {
              expect(false).customError('Expected to have "' + arrOfValues[index] + '" under "' + colName + '" of ' + '"Total" row but found "' + val + '" ');
              takeScreenShot++;
              if (takeScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555905', function() {

    //Select Risk > Stress Tests" on the LHP of tile options dialog
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click on X icon next to "SPAR-Series-Test1" from selected section to remove it', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getItemByText('SPAR-Series-Test1');

      item.getActions().then(function(val) {
        val.triggerAction('remove');
      });
    });

    it('Verifying if still "SPAR-Series-Test1" item is available in "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('SPAR-Series-Test1') !== -1) {
          expect(false).customError('"SPAR-Series-Test1" is not deleted from the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Personal" from the Available section is expanded by default. If not, expand it', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    it('Should click "SPAR-Series-Test1" wrench from the Available section and click on "Remove"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('SPAR-Series-Test1').then(function(item) {
            item.select();

            item.getActions().then(function(val) {
              val.triggerAction('remove');
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" group is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Delete Stress Test" appeared', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Delete Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Delete" in the Delete Stress Test dialog', function() {
      ThiefHelpers.getDialogButton('Delete Stress Test', 'Delete').click();
    });

    it('Verifying if "Delete Stress Test" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Delete Stress Test').then(function(option) {
        if (option) {
          expect(false).customError('"Delete Stress Test" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Personal > SPAR-Series-Test1" is removed from Available section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getChildrenText().then(function(childArr) {
        childArr.forEach(function(element) {
          if (element.text === 'Personal') {
            var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
            group.expand();

            group.isExpanded().then(function(expanded) {
              if (expanded) {
                group.getChildrenText().then(function(arrObject) {
                  arrObject.forEach(function(listItem) {
                    if (listItem.text === 'SPAR-Series-Test1') {
                      expect(false).customError('"SPAR-Series-Test1" is not deleted from "Personal" directory');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Personal" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 555901', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');
  });
});
