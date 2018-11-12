'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: st-econ-series', function() {

  // Variables
  var arrTotalRows = ['Total', '-4.46', '30.79', '-3.13', '32.06', '119.15', '39.74', '', ''];

  describe('Test Step ID: Start Up Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 596866', function() {

    it('Should open PA3 Application with "Client:/Pa3/Risk/IDENTIFIER_STRESS_TEST"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('identifier-stress-test');
    });

    it('Verifying if "Calculation Error" appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (!option) {
          expect(false).customError('"Calculation Error" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "OK" in the Calculation Error dialog', function() {
      ThiefHelpers.getDialogButton('Calculation Error', 'OK').click();
    });

    it('Verifying if "Calculation Error" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog has not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'Benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });

    it('Verifying if Weights report is blank', function() {
      PA3MainPage.isReportCalculated('Weights', true).then(function(found) {
        if (found) {
          expect(false).customError('"Weights" report is not blank. Report is calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function() {
      });
    });
  });

  describe('Test Step ID: 596867', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click "Add" button next to Available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathAddButton).press();
    });

    it('Verifying if "Create New Stress Test" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Stress Test').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Stress Test" dialog has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 596868', function() {

    it('Should select "Economic Series" from the "Type" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Economic Series', undefined, CreateNewStressTest.getDropDown('Type'));

      // Verifying if Economic Series is selected form the Type drop down
      ThiefHelpers.verifySelectedDropDownText('Economic Series', undefined, CreateNewStressTest.getDropDown('Type'));
    });

    it('Clear the text in the text box', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).clear();

      // Verifying if "Name" filed is cleared
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== '') {
          expect(false).customError('The "Factor" textbox is not set to ""; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "FDS_ECON_DATA("BLSCES0000000001",#SD1,#ED1,#FRQ1,STEP,AVERAGE);" in the "Factor" textbox', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).sendKeys('FDS_ECON_DATA("BLSCES0000000001",#SD1,#ED1,#FRQ1,STEP,AVERAGE);').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Factor" textbox is set to "FDS_ECON_DATA("BLSCES0000000001",#SD1,#ED1,#FRQ1,STEP,AVERAGE);"', function() {
      element(by.xpath(EditStressTest.xpathOfFactorTextbox)).getAttribute('value').then(function(text) {
        if (text !== 'FDS_ECON_DATA("BLSCES0000000001",#SD1,#ED1,#FRQ1,STEP,AVERAGE);') {
          expect(false).customError('The "Factor" textbox is not set to "FDS_ECON_DATA("BLSCES0000000001",#SD1,#ED1,#FRQ1,STEP,AVERAGE);"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 596870', function() {

    it('Should enter "22" in the "Shock" text field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).setText('22');
    });

    it('Verifying if "Shock" input is having value "22"', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getInputBox('Shock')).getText().then(function(val) {
        if (val !== '22') {
          expect(false).customError('"22" is not entered into "Shock" input');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Advanced Options" section', function() {
      CreateNewStressTest.getAccordion('Advanced Options').click();
    });

    it('Verifying if "Advanced Options" section is expanded', function() {
      CreateNewStressTest.getAccordion('Advanced Options').element(by.xpath('.//tf-accordion-section-body')).isDisplayed().then(function(status) {
        if (!status) {
          expect(false).customError('"Advanced Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click "History Limit" drop down of a date picker', function() {
      CreateNewStressTest.getComboBoxDropDown('History Limit').click();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"History Limit" drop down of a date picker is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Risk model Inception" from the dropdown', function() {
      ThiefHelpers.getOptionFromDropdown('Risk Model Inception').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Risk Model Inception" is selected from the drop down
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewStressTest.getComboTextBox('History Limit')).getText().then(function(val) {
        if (val !== 'Risk Model Inception') {
          expect(false).customError('"Risk Model Inception" is not selected from the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Clear the text in the risk model and click on the dropdown expand the group and select option
    CreateNewStressTest.clearRiskModelTextBoxAndExpandGroupToSelectOption('Barra', 'Barra Global Long-Term Model (GEM3L)');

    it('Should enter "Econ_2" in the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Econ_2');

      // Verifying if Econ_2 is entered in the Name input
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(val) {
        if (val !== 'Econ_2') {
          expect(false).customError('"Econ_2" is not entered in the Name input');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.selectDirectoryAndSubDirectoryAndVerify('Personal', 'Personal');

    it('Should click "Save" button from the "Create New Stress Test" dialog', function() {
      browser.ignoreSynchronization = true;
      ThiefHelpers.getButtonClassReference(undefined, CreateNewStressTest.xpathSaveButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Saving Stress Test.. appears', function() {
      Utilities.waitUntilElementAppears(CreateNewStressTest.getSpinner(), 30000);

      CreateNewStressTest.getSpinner().getAttribute('loading-message').then(function(val) {
        if (val !== 'Saving stress test...') {
          expect(false).customError('Spinner with "Saving stress test..." not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 596869', function() {

    it('Should click on the "Risk > Risk Models" on the LHP of tile options', function() {
      browser.ignoreSynchronization = false;
      TileOptions.getLHPOption('Risk Models').click().then(function() {
      }, function() {

        expect(false).customError('"Risk Models" is not clicked on LHP in tile options');
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Risk Models"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Risk - Risk Models') {
          expect(false).customError('Risk > Risk Models is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "Barra Global Long-Term (GEM3L)" in the Search field', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText('Barra Global Long-Term (GEM3L)');

      // Verifying if Barra Global Long-Term (GEM3L) is entered
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(val) {
        if (val !== 'Barra Global Long-Term (GEM3L)') {
          expect(false).customError('"Barra Global Long-Term (GEM3L)" is not entered in the Search field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Risk > Stress Tests" on the LHP of tile options', function() {
      TileOptions.getLHPOption('Stress Tests').click().then(function() {
      }, function() {

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

    it('Should expand "Personal" and select "Personal > Econ_2" from the Available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        console.log(expanded);
        if (expanded) {
          group.getItemByText('Econ_2').then(function(subGroup) {
            subGroup.select();

            // Check if 'Major Telecommunications' is selected
            subGroup.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Econ_2" did not selected from "Available" section');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "right arrow" from the Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsRiskStressTests.xpathTransferBox);
    });

    it('Verifying if "Econ_2" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Econ_2') === -1) {
          expect(false).customError('"Econ_2" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying the "Total" rows', function() {
      SlickGridFunctions.getRowData('Weights', 'Total', '').then(function(data) {
        Utilities.arrayCompare(arrTotalRows, data);
      });
    });
  });

  describe('Test Step ID: 596874', function() {

    // Select stress tests tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Stress Tests', 'Risk');

    it('Should click "Clear All" button from the Stress Tests tab', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsRiskStressTests.xpathClearAllIcon).press().then(function() {
        },

        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if Selected List is empty', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        if (childArr.length !== 0) {
          expect(false).customError('Selected List is not Empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 686583', function() {

    it('Expand and verifying if "Personal" from the Available section is expanded', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Personal" group is not in expanded state by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click Econ_2 wrench from the Available section and click on "Remove"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Econ_2').then(function(item) {
            item.select();

            item.getActions().then(function(val) {
              val.triggerAction('remove');
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
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

    it('Expand "Personal" from "Available" container and verify that "Econ_2" is removed from "Available" section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getChildrenText().then(function(childArr) {
        childArr.forEach(function(element) {
          if (element.text === 'Personal') {
            var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskStressTests.xpathAvailableContainer).getGroupByText('Personal');
            group.expand();

            group.getChildrenText().then(function(arrObject) {
              arrObject.forEach(function(listItem) {
                if (listItem.text === 'Econ_2') {
                  expect(false).customError('"Econ_2" column is not deleted from "Personal" directory');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          }
        });
      });
    });
  });

  describe('Test Step ID: 596875', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');
  });
});
