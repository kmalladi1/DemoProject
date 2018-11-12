'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-show-hide2', function() {
  var xpathOfAllCheckbox = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckBox, 'All');

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 565136', function() {

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Verifying if "Weights" report appeared without any errors', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        // Verifying if any error dialog box appeared
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 565137', function() {

    // un-check automatic calculation from wrench menu
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSetAutomaticCalculation(false);

    // To dismiss the wrench menu
    it('Should select "Weights" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Reports', 'Weights').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Weights" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');
  });

  describe('Test Step ID: 565138', function() {

    it('Should enter "CANADA" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText('CANADA');

      // Verifying that "CANADA" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
        if (text !== 'CANADA') {
          expect(false).customError('"CANADA" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if search results are displayed relevant to "CANADA"', function() {
      TileOptionsRiskRiskModels.getAllElementsFromAvailAfterSearch().each(function(element) {
        Utilities.makeElementVisible(element);
        element.getText().then(function(value) {
          if (value.toUpperCase().indexOf('CANADA') === -1) {
            expect(false).customError('This "' + value + '" results displayed in the "Available" section' +
              ' does not contain "CANADA".');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 565182', function() {

    it('Should select on "APT Canada (CAD)" of "APT" group from search result', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(TileOptionsRiskRiskModels.xpathAvailableContainer, 'APT', 'APT Canada (CAD)').then(function(item) {
        item.select();
      });

      // Verifying if 'APT Canada (CAD)' is selected
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(TileOptionsRiskRiskModels.xpathAvailableContainer, 'APT', 'APT Canada (CAD)').then(function(item) {
        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"APT Canada (CAD)" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "APT Canada (CAD)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('APT Canada (CAD)') === -1) {
          expect(false).customError('"APT Canada (CAD)" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "APT Canada (CAD)" is highlighted in Selected section', function() {
      // Verify if 'APT Canada (CAD)' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('APT Canada (CAD)').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"APT Canada (CAD)" is not selected(highlighted)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for loading spinner to disappear', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        '//*[@data-qa-class="loading spinner"]//tf-progress-indicator'), 30000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Info box icon next to "APT Canada (CAD)" to open information drop down', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('APT Canada (CAD)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Verifying if information box display with information "APT Canada (CAD)"', function() {
      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(text) {
        if (text !== 'APT Canada (CAD)') {
          expect(false).customError('Information box did not display with information "APT Canada (CAD)": Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Risk Model" to close information box"', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();
    });

    it('Verifying if "None" option is selected in "Factor Grouping" dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).getSelectedText().then(function(selectedItem) {
        if (selectedItem !== 'None') {
          expect(false).customError('"Factor Grouping" drop down is not set to "None"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  var fieldValues = [];
  var fieldNames = ['Vendor', 'Universe Count', 'Base Currency', 'Frequency', 'Factors', 'Currencies', 'First Date', 'Latest Date'];

  describe('Test Step ID: 565144', function() {

    it('Should click on "X" icon on the search field to clear it', function() {
      element(by.xpath(TileOptionsRiskRiskModels.xpathSearchBoxDeleteIcon)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying nothing is displayed in search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
        if (text !== '') {
          expect(false).customError('Search field is not cleared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "Axioma" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText('Axioma');

      // Verifying that "Axioma" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
        if (text !== 'Axioma') {
          expect(false).customError('"Axioma" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(3000);
    });

    it('Should click on "Axioma Australia Fundamental Equity Risk Model SH 1" from search result', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Axioma');
      group.expand();
      group.getItemByText('Axioma Australia Fundamental Equity Risk Model SH 1').then(function(listItem) {
        listItem.select();

        // Check if 'Axioma Australia Fundamental Equity Risk Model SH 1' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Axioma Australia Fundamental Equity Risk Model SH 1" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on Info box next to "Axioma Australia Fundamental Equity Risk Model SH 1" to open information drop down', function() {
      ThiefHelpers.getElementFromAvailableSectionAfterSearch(TileOptionsRiskRiskModels.xpathAvailableContainer, 'Axioma', 'Axioma Australia Fundamental Equity Risk Model SH 1').then(function(item) {
        item.getIcons().then(function(icons) {
          icons.clickIcon('info');
          CommonFunctions.captureScreenShot('infoIcon');
        });
      });
    });

    it('Wait for loading spinner to disappear', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        '//*[@data-qa-class="loading spinner"]//tf-progress-indicator'), 30000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Information box populates "Axioma Australia Fundamental Equity Risk Model SH 1"', function() {
      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(value) {
        if (value !== 'Axioma Australia Fundamental Equity Risk Model SH 1') {
          expect(false).customError('"Axioma Australia Fundamental Equity Risk Model SH 1" is not populated in Information Box');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    fieldNames.forEach(function(name, index) {

      it('Recording "' + name + '" field in an array for later verification', function() {
        TileOptionsRiskRiskModels.getInfoBoxData(name).getText().then(function(value) {
          fieldValues[index] = value;
        });
      });

    });

    it('Verifying if information box display with information "Axioma Australia Fundamental Equity Risk Model SH 1" is saved', function() {
      if (fieldValues === undefined || fieldValues === '') {
        expect(false).customError('Information box data of "Axioma Australia Fundamental Equity Risk Model SH 1" is not saved');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should click on "Risk Model" to close information box"', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Axioma Australia Fundamental Equity Risk Model SH 1" from the "Axioma"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Axioma');
      group.expand();
      group.getItemByText('Axioma Australia Fundamental Equity Risk Model SH 1').then(function(listItem) {
        listItem.select();

        // Check if 'Axioma Australia Fundamental Equity Risk Model SH 1' is selected
        listItem.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Axioma Australia Fundamental Equity Risk Model SH 1" is not selected from "Selected" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Axioma Australia Fundamental Equity Risk Model SH 1" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Axioma Australia Fundamental Equity Risk Model SH 1') === -1) {
          expect(false).customError('"Axioma Australia Fundamental Equity Risk Model SH 1" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Axioma Australia Fundamental Equity Risk Model SH 1" is highlighted in Selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Axioma Australia Fundamental Equity Risk Model SH 1');

      // Verifying if "Axioma Australia Fundamental Equity Risk Model SH 1" is selected.
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Axioma Australia Fundamental Equity Risk Model SH 1" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 565183', function() {

    it('Should click on Info box next to "Axioma Australia Fundamental Equity Risk Model SH 1" to open information drop down', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Axioma Australia Fundamental Equity Risk Model SH 1');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Wait for loading spinner to disappear', function() {
      //Waiting for report to finish calculation
      ThiefHelpers.waitUntilSpinnerDisappears(PA3MainPage.getProgressIndicatorClassReference(undefined,
        '//*[@data-qa-class="loading spinner"]//tf-progress-indicator'), 30000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if information box display with information "Axioma Australia Fundamental Equity Risk Model SH 1"', function() {
      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(text) {
        if (text !== 'Axioma Australia Fundamental Equity Risk Model SH 1') {
          expect(false).customError('Information box did not display with information "Axioma Australia Fundamental Equity Risk Model SH 1": Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    fieldNames.forEach(function(name, index) {

      it('Verifying "' + name + '" field to equal previous values', function() {
        TileOptionsRiskRiskModels.getInfoBoxData(name).getText().then(function(value) {
          if (value !== fieldValues[index]) {
            expect(false).customError('"' + name + '" field is not matched with previously recorded values; Expected: "' + fieldValues[index] + '"; Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Risk Model" to close information box"', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 565146', function() {

    it('Should select "FactSet: Standard" option from "Factor Grouping" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Standard', 'Factor Grouping');
    });

    it('Verifying "FactSet: Standard" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard', 'Factor Grouping');
    });

    it('Should un-check check box next to "All" in the "Visible Factors" list', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).isChecked().then(function(checkBox) {
        if (checkBox === true) {
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).uncheck();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "All" checkbox is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).isChecked().then(function(selected) {
        if (selected) {
          expect(false).customError('"All" checkbox is not unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that all the checkboxes from "Visible Factors" section are not selected', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(ItemObject, index) {
          if (valArray[index].group !== false) {
            ThiefHelpers.getVirtualChecklistClassReference().getItemByText(valArray[index].text).isChecked().then(function(flag) {
              if (flag) {
                expect(false).customError(valArray[index].text + ' is checked off in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }else {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(valArray[index].text).isChecked().then(function(flag) {
              if (flag) {
                expect(false).customError(valArray[index].text + ' is checked off in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 565174', function() {

    it('Should select "FactSet: Style Breakout" option from "Factor Grouping" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Style Breakout', 'Factor Grouping');
    });

    it('Verifying "FactSet: Style Breakout" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Style Breakout', 'Factor Grouping');
    });

    it('Should check "All" check box in the "Visible Factors" list', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).isChecked().then(function(checkBox) {
        if (checkBox !== true) {
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).check();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "All" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"All" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that all the checkboxes from "Visible Factors" section are selected', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(ItemObject, index) {
          console.log(valArray[index].group + ' - ' + valArray[index].text);
          if (valArray[index].group === false) {
            ThiefHelpers.getVirtualChecklistClassReference().getItemByText(valArray[index].text).isChecked().then(function(flag) {
              if (!flag) {
                expect(false).customError('"' + valArray[index].text + '" factor is unchecked in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }else {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(valArray[index].text).isChecked().then(function(flag) {
              console.log(flag + ' elseBlock');
              if (!flag) {
                expect(false).customError('"' + valArray[index].text + '" factor group is unchecked in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 565175', function() {

    it('Should select "FactSet: Standard" option from "Factor Grouping" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Standard', 'Factor Grouping');
    });

    it('Verifying "FactSet: Standard" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard', 'Factor Grouping');
    });

    it('Verifying that all the checkboxes from "Visible Factors" section are selected', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(ItemObject, index) {
          if (valArray[index].group === false) {
            ThiefHelpers.getVirtualChecklistClassReference().getItemByText(valArray[index].text).isChecked().then(function(flag) {
              if (!flag) {
                expect(false).customError(valArray[index].text + ' is unchecked in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }else {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(valArray[index].text).isChecked().then(function(flag) {
              console.log(flag);
              if (!flag) {
                expect(false).customError(valArray[index].text + ' is unchecked in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  });

  describe('Test Step ID: 565176', function() {

    it('Should select "FactSet: Style Breakout" option from "Factor Grouping" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Style Breakout', 'Factor Grouping');
    });

    it('Verifying "FactSet: Style Breakout" option is selected from "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Style Breakout', 'Factor Grouping');
    });

    it('Verifying if the "All" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfAllCheckbox).isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"All" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that all the checkboxes from "Visible Factors" section are selected', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(ItemObject, index) {
          if (valArray[index].group === false) {
            ThiefHelpers.getVirtualChecklistClassReference().getItemByText(valArray[index].text).isChecked().then(function(flag) {
              if (!flag) {
                expect(false).customError(valArray[index].text + ' is unchecked in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }else {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(valArray[index].text).isChecked().then(function(flag) {
              if (!flag) {
                expect(false).customError(valArray[index].text + ' is unchecked in "Visible Factors" section.');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 565179', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');
  });
});
