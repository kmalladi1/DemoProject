'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpgs-high-low', function() {
  // Variable(s)
  var arrowButton;
  var i;
  var arrColSelectedEle = [];
  var arrDDOptions = [];

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'Available');

  // Getting the xpath of the Selected section of groupings tab
  var xpathOfSelectedSectionOfGroupings = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathOfAvailableOrSelectedContainer, 'Selected');

  //Local function
  var verifyGroupsInCalculatedReport = function(arrOfGroups, arr5Highest, arr5Lowest) {
    arrOfGroups.forEach(function(groupName) {
      it('Verifying the groups displayed under "' + groupName + '"', function() {
        SlickGridFunctions.getElementsFromTree('Weights', '', groupName).then(function(items) {
          if (groupName === '5 Highest Groups') {
            items.forEach(function(itemName, index) {
              if (itemName !== arr5Highest[index]) {
                expect(false).customError('Expected "' + arr5Highest[index] + '" but Found "' + itemName + '" under "5 Highest Groups".');
                CommonFunctions.takeScreenShot();
              }
            });
          } else {
            items.forEach(function(itemName, index) {
              if (itemName !== arr5Lowest[index]) {
                expect(false).customError('Expected "' + arr5Lowest[index] + '" but Found "' + itemName + '" under "5 Lowest Groups".');
                CommonFunctions.takeScreenShot();
              }
            });
          }
        });
      });
    });
  };

  var fetchPortWeightValuesOfGroupings = function(arrOfGroups) {
    var valuesArr = [];
    var cellValuesArr = [];

    arrOfGroups.forEach(function(groupName) {
      SlickGridFunctions.getElementsFromTree('Weights', '', groupName).then(function(items) {
        items.forEach(function(subGroupName) {
          SlickGridFunctions.getCellReference('Weights', subGroupName, '', 'Port. Weight', undefined, groupName).then(function(cellRef) {
            cellRef.getText().then(function(cellValue) {
              cellValuesArr.push(cellValue);
            });
          });
        });
      }).then(function() {
        valuesArr.push({category: groupName, portWeightValues: cellValuesArr});
      }).then(function() {
        cellValuesArr = [];
      });
    });
    return valuesArr;
  };

  describe('Test Step ID: 551496', function() {

    // Open default document and uncheck automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 551493', function() {

    // Clicking on 'Weights' report from LHP to ensure 'Weights' report is selected
    it('Should click on "Weights" report from LHP to ensure "Weights" report is selected', function() {
      PA3MainPage.getReports('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on wrench Icon from 'Weights' report toolbar
    it('Should click on wrench Icon from "Weights" report toolbar', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking on 'Options' from Wrench Menu dropdown.
    it('Should click "Options" from dropdown menu', function() {
      PA3MainPage.getOptionFromWrenchMenuFromReportWorkspace('Options').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Checking if the 'Tile Options' mode has opened.
    it('Validating if "Tile Options" mode opened', function() {
      expect(TileOptions.isTileOptionsMode()).toBeTruthy();
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Groupings').customError('Failed to select "Groupings" item from "LHP"');
        if (title !== 'Groupings') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Expanding the tree from 'Available' container
    it('Should expand the tree from "Available" container for "FactSet > Other"', function() {
      TileOptionsGroupings.expandElementTree('FactSet|Other', 'FactSet');

      // Verifying if the tree is expanded through 'Factset->Other'
      TileOptionsGroupings.checkIfExpanded('FactSet|Other');
    });

    // Selecting the Item 'High/Low' from 'FactSet -> Other'
    it('Should Select the  Item "High/Low" from "FactSet -> Other"', function() {
      TileOptionsGroupings.getElementFromAvailableSection('FactSet|Other', 'High/Low').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Clicking 'Right' arrow button.
    it('Should click on the "Right" arrow button', function() {
      TileOptionsGroupings.getArrowButton('Right').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Verifying if 'High/Low' is added to 'Selected' container
    it('Verify if "High/Low" is added to "Selected" container', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('High/Low').isPresent().then(function(bol) {
        expect(bol).customError('"High/Low" is not added to the "Selected" container');
        if (!bol) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551597', function() {

    // Clicking on Columns LHP item to select.
    it('Should click on Columns LHP item to select', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Columns' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Columns').customError('Failed to select "Columns" from LHP');
        if (title !== 'Columns') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Get all the elements from "Selected" section of "Columns" option', function() {
      TileOptionsColumns.getAllElements('Selected').each(function(eleRef) {
        eleRef.getText().then(function(text) {
          arrColSelectedEle.push(text);
        });
      });
    });

    // Clicking on Groupings LHP item to select.
    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' item is opened.
      TileOptions.getOptionTitle().getText().then(function(title) {
        expect(title === 'Groupings').customError('Failed to select "Groupings" from LHP');
        if (title !== 'Groupings') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "High/Low" from the "Selected" section', function() {
      TileOptionsGroupings.getElementFromSelectedContainer('High/Low').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "High/Low" is selected
      TileOptionsGroupings.getElementFromSelectedContainer('High/Low').getAttribute('class').then(function(value) {
        expect(value.indexOf('selected') > -1).customError('"High/Low" element is not selected from ' + 'the "Selected" section');
        if (value.indexOf('selected') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Select High / Low Column" dropdown', function() {
      /*      TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Select High / Low Column').click().then(function() {
       }, function(err) {
       expect(false).customError(err);
       CommonFunctions.takeScreenShot();
       });*/
      ThiefHelpers.getButtonClassReference('Select High / Low Column:').press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    var screenShot = 0;
    it('Should verify that drop down contains column names found in the Column\'s selected section', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(optionRef) {
        console.log(optionRef);
        optionRef.forEach(function(optionName, index) {
          if (optionName !== arrColSelectedEle[index + 2]) {
            expect(false).customError('"Select High / Low Column" drop down did not contains expected value. ' +
              'Expected ' + arrColSelectedEle[index + 2] + ' found ' + optionName);
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 551494', function() {

    it('Should click on the "Select High / Low Column" dropdown to close it', function() {
      ThiefHelpers.getButtonClassReference('Select High / Low Column:').press().then(function() {
      }, function(err) {

        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    // Verifying if 'Select High/Low Column' dropdown is set to 'Ending Price' by default
    it('Verifying if "Select High/Low Column" dropdown is set to "Ending Price" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference('Select High / Low Column:', undefined).getSelectedText().then(function(text) {
        if (text !== 'Ending Price') {
          expect(false).customError('"Ending Price" is not found as selected text. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if 'Number' field is set to '5' by default
    it('Verifying if "Number" field is set to "5" by default', function() {
      TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Number').getAttribute('value').then(function(val) {
        expect(val === '5').customError('"Number" field is not set to "5". Found: "' + val + '"');
        if (val !== '5') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if 'Other' checkbox is checked by default
    it('Verifying if "Other" checkbox is checked by default', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Other'))).toBeTruthy();
    });

    // Verifying if 'Use Group Level Data' checkbox is not checked off by default
    it('Verifying if "Use Group Level Data" checkbox is not checked off by default', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Use Group Level Data'))).toBeFalsy();
    });

    // Verifying if 'Frequency' dropdown is set to 'Beginning of Period' by default
    it('Verifying if "Frequency" dropdown is set to "Beginning of Period" by default', function() {
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Frequency')).getSelectedText().then(function(text) {
        if (text !== 'Beginning of Period') {
          expect(false).customError('"Beginning of Period" is not found as selected text. Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551495', function() {

    // Clicking the 'Down Arrow' button four times
    it('Should click the "Down Arrow" button four times to decrease the value in the Number field', function() {
      arrowButton = TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Down Arrow Button');
      for (i = 0; i < 4; i++) {
        arrowButton.click();
      }
    });

    // Verifying if the Value is changed to '1'
    it('Verifying if the Value is changed to "1"', function() {
      TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Number').getAttribute('value').then(function(val) {
        expect(val === '1').customError('Value is not changed to "1". Found: "' + val + '"');
        if (val !== '1') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verifying if the 'Down Arrow' button is disabled
    it('Verifying if the "Down Arrow" button is disabled', function() {
      arrowButton.getAttribute('class').then(function(val) {
        expect(val.indexOf('disabled') > -1).customError('"Down Arrow" button is not disabled');
        if (val.indexOf('disabled') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551500', function() {

    // Entering the value '10000' into the 'Number' Field
    it('Should enter the value "10000" into "Number" Field', function() {
      var numberField = TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Number');
      numberField.clear();
      numberField.sendKeys('10000');

      // Verifying if the Value is changed to '10000'
      numberField.getAttribute('value').then(function(value) {
        expect(value === '10000').customError('"Number Field" value is not changed to "10000". Found:"' + value + '"');
        if (value !== '10000') {
          CommonFunctions.takeScreenShot();
        }
      });

      // Waiting for 'Up Arrow' button to get disabled
      browser.sleep(2000);
    });

    // Verifying if the 'Up Arrow' button is disabled
    it('Verifying if the "Up Arrow" button is disabled', function() {
      TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Up Arrow Button').getAttribute('class').then(function(value) {
        expect(value.indexOf('disabled') > -1).customError('"Up Arrow" button is not disabled');
        if (value.indexOf('disabled') < 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551502', function() {

    // Entering the value '5' into the 'Number' Field
    it('Should enter the value "5" into "Number" Field', function() {
      var numberField = TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Number');
      numberField.clear();
      numberField.sendKeys('5');

      // Verifying if the Value is changed to '5'
      numberField.getAttribute('value').then(function(value) {
        expect(value === '5').customError('Failed to enter "5" into the "Number" field. Found' + value);
        if (value !== '5') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "-" before 5 to check "-" is not accepted by number inout box', function() {
      browser.actions().sendKeys(protractor.Key.HOME).perform();

      TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Number').sendKeys('-');
    });

    it('Verifying if "5" is shown even after sending "-" previous to the digit', function() {
      TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Number').getAttribute('value').then(function(value) {
        expect(value === '5').customError('Failed to enter "5" into the "Number" field. Found' + value);
        if (value !== '5') {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551497', function() {

    // Checking off 'High' checkbox
    it('Should check off "High" checkbox', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'High', true))).toBeTruthy();
    });

    // Checking off 'Low' checkbox
    it('Should check off "Low" checkbox', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Low', true))).toBeTruthy();
    });

    // Unchecking the 'Other' checkbox
    it('Should uncheck "Other" checkbox', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Other', true))).toBeFalsy();
    });

    // Checking off 'Use Group Level Data' checkbox
    it('Should check off "Use Group Level Data" checkbox', function() {
      expect(Utilities.isCheckboxSelected(TileOptionsGroupings.getSectionCheckBox('Definition', 'Use Group Level Data', true))).toBeTruthy();
    });
  });

  describe('Test Step ID: 551498', function() {

    var flag;

    // Clicking on 'Frequency' dropdown to verify the list of options
    it('Should click on "Frequency" dropdown to verify the list of options', function() {
      var arrFrequencyOptions = ['Beginning of Period', 'End of Period', 'Daily', 'Weekly', 'Monthly', 'Quarterly', 'Semi-annually', 'Annually'];
      ThiefHelpers.getDropDownSelectClassReference(undefined, TileOptionsGroupings.getElementFromDefinitionSectionForHighLow('Frequency')).open().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        array.forEach(function(element, index) {
          if (element !== arrFrequencyOptions[index]) {
            flag = true;
            expect(false).customError('"' + arrFrequencyOptions[index] + '" did not present in the Frequency drop down; Found: ' + element);
          }
        });

        if (flag) {
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551501', function() {

    // Selecting the option 'Monthly' from dropdown
    it('Should select option "Monthly" from dropdown', function() {
      ThiefHelpers.getDropDownSelectClassReference('Frequency:', undefined).selectItemByText('Monthly');
    });
  });

  describe('Test Step ID: 658412', function() {

    var arrOfElements = ['Economic Sector - FactSet', 'Industry - FactSet'];

    arrOfElements.forEach(function(groupingName) {

      it('Should hover over "' + groupingName + '" from "Selected" section and click on "x" button to remove it', function() {
        // Verifying if "Economic Sector - FactSet" column is present in the "Selected" section
        TileOptionsGroupings.getElementFromSelectedContainer(groupingName).isPresent().then(function(option) {
          if (!option) {
            expect(option).customError('"' + groupingName + '" column is not present in "Selected" section.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });

        TileOptionsGroupings.getRemoveButtonOfElementInSelectedSection(groupingName).click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "' + groupingName + '" is removed from "Selected" section', function() {
        TileOptionsGroupings.getElementFromSelectedContainer(groupingName).isPresent().then(function(option) {
          if (option) {
            expect(option).customError('"' + groupingName + '" column was not deleted list.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(true).toBeTruthy();
          }
        });
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it(' Verifying that "Invalid Setting" dialog box saying "There must be a grouping below the High/Low grouping with "Use Group' + ' Level Data" options. Please add a grouping or uncheck the setting within the High/Low definition" appears. ', function() {
      ThiefHelpers.verifyDialogTitle('Invalid Setting');

      // Verifying the content of the "Invalid Setting' dialog
      ThiefHelpers.getDialogClassReference('Invalid Setting').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'There must be a grouping below the High/Low grouping with "Use Group Level Data" options.' + ' Please add a grouping or uncheck the setting within the High/Low definition.') {
          expect(false).customError('"Invalid Setting" dialog box saying "There must be a grouping below the' + ' High/Low grouping with "Use Group Level Data" options. Please add a grouping or uncheck the setting' + ' within the High/Low definition." has not appeared. Found: "' + content + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 658413', function() {

    it('Should click on "OK" button of "Invalid Setting" dialog', function() {
      ThiefHelpers.getDialogButton('Invalid Setting', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should type "Economic Sector" into the "Search" field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('Economic Sector');

      // Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError();
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for search to happen
      browser.sleep(4000);
    });

    it('Select "Economic Sector" from "FactSet > Sector & Industry > FactSet" in "Available" section', function() {
      var reference = TileOptionsGroupings.getElementFromAvailableSection('FactSet|Sector & Industry|FactSet', 'Economic Sector');
      browser.actions().doubleClick(reference).perform();
    });

    it(' Verifying if the "Economic Sector - FactSet" element is selected in the "Selected" section', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').getAttribute('class')).toContain('selected');
    });

    it('Should expand the section "Additional Options"', function() {
      TileOptionsGroupings.expandSectionInOptionsPane('Additional Options').then(function(expended) {
        if (!expended) {
          expect(false).customError('"Additional Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Group before Exclusions" radio button in "Exclusions"', function() {
      ThiefHelpers.getRadioClassReference('Group before Exclusions').select();

      // Verifying "Group before Exclusions" radio button is selected
      ThiefHelpers.getRadioClassReference('Group before Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Group before Exclusions" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it(' Verifying that "Invalid Setting" dialog box saying "When using the High/Low grouping with the "Use Group Level Data" ' + 'option, the High/Low grouping and the grouping below it must both be either "Group Before Exclusions" or ' + '"Group After Exclusions". Please change one of the groupings.', function() {
      ThiefHelpers.verifyDialogTitle('Invalid Setting');

      // Verifying the content of the "Invalid Setting' dialog
      ThiefHelpers.getDialogClassReference('Invalid Setting').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'When using the High/Low grouping with the "Use Group Level Data" option, the High/Low grouping and the ' + 'grouping below it must both be either "Group Before Exclusions" or "Group After Exclusions". ' + 'Please change one of the groupings.') {
          expect(false).customError('"Invalid Setting" dialog box saying "When using the High/Low grouping with the' + ' "Use Group Level Data" option, the High/Low grouping and the grouping below it must both be either' + ' "Group Before Exclusions" or "Group After Exclusions". Please change one of the groupings."  has not appeared. ' + 'Found: "' + content + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 658414', function() {

    it('Should click on "OK" button of "Invalid Setting" dialog', function() {
      ThiefHelpers.getDialogButton('Invalid Setting', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the section "Additional Options" is expanded', function() {
      TileOptionsGroupings.expandSectionInOptionsPane('Additional Options').then(function(expended) {
        if (!expended) {
          expect(false).customError('"Additional Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Group after Exclusions" radio button in "Exclusions"', function() {
      ThiefHelpers.getRadioClassReference('Group after Exclusions').select();

      // Verifying "Group after Exclusions" radio button is selected
      ThiefHelpers.getRadioClassReference('Group after Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Group after Exclusions" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Group Relative" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Relative').check();
    });

    it('Verifying if the "Group Relative" checkbox is selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Relative').isChecked().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Group Relative" checkbox is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it(' Verifying that "Invalid Setting" dialog box saying "When using the High/Low grouping with the "Use Group Level Data" ' + 'option, the grouping under the High/Low grouping cannot have the "Group Relative" option set. Please change the option.', function() {
      ThiefHelpers.verifyDialogTitle('Invalid Setting');

      // Verifying the content of the "Invalid Setting' dialog
      ThiefHelpers.getDialogClassReference('Invalid Setting').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'When using the High/Low grouping with the "Use Group Level Data" option, the grouping under the' + ' High/Low grouping cannot have the "Group Relative" option set. Please change the option.') {
          expect(false).customError('"Invalid Setting" dialog box saying "When using the High/Low grouping with the' + ' "Use Group Level Data" option, the grouping under the High/Low grouping cannot have the "Group Relative" option set.' + ' Please change the option."  has not appeared. Found: "' + content + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 551499', function() {

    it('Should click on "OK" button of "Invalid Setting" dialog', function() {
      ThiefHelpers.getDialogButton('Invalid Setting', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if the "Economic Sector - FactSet" element is selected in the "Selected" section', function() {
      expect(TileOptionsGroupings.getElementFromSelectedContainer('Economic Sector - FactSet').getAttribute('class')).toContain('selected');
    });

    it('Verifying if the section "Additional Options" is expanded', function() {
      TileOptionsGroupings.expandSectionInOptionsPane('Additional Options').then(function(expended) {
        if (!expended) {
          expect(false).customError('"Additional Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should de-select "Group Relative" checkbox.', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Relative').uncheck();
    });

    it('Verifying if the "Group Relative" checkbox is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Group Relative').isChecked().then(function(selected) {
        if (selected) {
          expect(false).customError('"Group Relative" checkbox is still selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "High/Low" in selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'High/Low').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'High/Low').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"High/Low" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the section "Definition:"', function() {
      TileOptionsGroupings.expandSectionInOptionsPane('Definition').then(function(expended) {
        if (!expended) {
          expect(false).customError('"Definition:" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter the value "5" into "Number" field', function() {
      ThiefHelpers.getNumberInputClassReference(TileOptionsGroupings.xpathNumberInput).setNumber(5);

      // Verifying if Number field is set to "5"
      ThiefHelpers.getNumberInputClassReference(TileOptionsGroupings.xpathNumberInput).getNumber().then(function(value) {
        if (value !== 5) {
          expect(false).customError('Failed to enter "5" into the "Number" field. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var hideSectionCheckboxes = ['High', 'Low'];
    hideSectionCheckboxes.forEach(function(checkboxName) {
      it('Unceck the checkboxes "' + checkboxName + '" under "Hide:" section.', function() {
        ThiefHelpers.setCheckBox(checkboxName, undefined, false);

        // Verifying if the checkbox is unchecked
        ThiefHelpers.verifyStatusOfCheckbox(checkboxName, undefined, 'isunchecked');
      });
    });

    it('Check "Other" checkbox under "Hide:" section', function() {
      ThiefHelpers.setCheckBox('Other', undefined, true);

      // Verifying if the checkbox is unchecked
      ThiefHelpers.verifyStatusOfCheckbox('Other', undefined, 'ischecked');
    });

    it('Verifying if "Select High/Low Column" dropdown is set to "Ending Price" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Ending Price', 'Select High / Low Column:');
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should click on date hyperlink in "Weights" report', function() {
      var xpathInfobox = PA3MainPage.getDateHyperLink('Weights');
      ThiefHelpers.getInfoboxLinkClassReference(xpathInfobox).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(err);
      });
    });

    it('Clear and Enter "10/05/2017" into "End Date" text box"', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('10/05/2017');

      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '10/05/2017') {
          expect(false).customError('"10/05/2017" option did not present in End Date text box.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Adding delay to process the date request
      browser.sleep(1000);
    });

    it('Should click on the OK button', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should right click on "5 Highest Groups" and select "Show All Groups" option', function() {
      var eleRef = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Weights', 1, '5 Highest Groups');

      PA3MainPage.rightClickAndSelectOption(eleRef, 'Show All Groups');

      // wait for the elements to load
      browser.sleep(3000);
    });

    var arrOfGroups = ['5 Highest Groups', '5 Lowest Groups'];
    var arr5Highest = ['Consumer Non-Durables', 'Consumer Services', 'Electronic Technology', 'Health Technology', 'Technology Services'];
    var arr5Lowest = ['Communications', 'Distribution Services', 'Industrial Services', 'Non-Energy Minerals', 'Transportation'];

    // Verifying the groups in the report
    verifyGroupsInCalculatedReport(arrOfGroups, arr5Highest, arr5Lowest);
  });

  describe('Test Step ID: 724463', function() {
    var valuesToVerify;

    it('Should click on "High/Low" hyperlink', function() {
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Groupings" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Groupings').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "High/Low" in selected section', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'High/Low').select();

      // Verifying if the item is selected
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'High/Low').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"High/Low" is not selected from the Selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Port. Ending Weight" from "Select High/Low Column" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Port. Ending Weight', 'Select High / Low Column:');

      // Verifying if "Select High/Low Column" dropdown is set to "Port. Ending Weight"
      ThiefHelpers.verifySelectedDropDownText('Port. Ending Weight', 'Select High / Low Column:');
    });

    it('Should un-check the "Other" checkbox under "Hide:" section', function() {
      ThiefHelpers.setCheckBox('Other', undefined, false);

      // Verifying if the checkbox is unchecked
      ThiefHelpers.verifyStatusOfCheckbox('Other', undefined, 'isunchecked');
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should perform double click on  "Port. Weight" column', function() {
      SlickGridFunctions.getHeaderCellReference('Weights', 'Port. Weight').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
      browser.sleep(3000);
    });

    var arrOfGroups = ['5 Highest Groups', 'Other', '5 Lowest Groups'];

    // Verifying the groups in the report
    it('Fetching values under groupings of "' + arrOfGroups + '" categories for future verification', function() {
      valuesToVerify = fetchPortWeightValuesOfGroupings(arrOfGroups);
    });

    it('Verifying if "Port .Weight" column values under the "' + arrOfGroups + '" groupings are displayed in descending order(Verify Group wise)', function() {
      var count = 0;
      valuesToVerify.forEach(function(grouping, groupingIndex) {
        if (grouping.category === arrOfGroups[groupingIndex]) {
          grouping.portWeightValues.forEach(function(value, valIndex) {
            if (valIndex < (grouping.portWeightValues.length - 1)) {
              if (Number(value) < Number(grouping.portWeightValues[valIndex + 1])) {
                expect(false).customError('Groupings values under "' + arrOfGroups + '" categories of "Port. Weight" column are not displayed in descending order');
                count = count + 1;
              }
            }
          });
        }
      });
      if (count >= 1) {
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying if value of last grouping under a category(say "5 Highest Groups") should be greater than the first grouping value under next category(say "Other") in the report', function() {
      var greaterValue;
      var lesserValue;
      var count = 0;
      arrOfGroups.forEach(function(element, index) {
        if (index !== (arrOfGroups.length - 1)) {
          if (valuesToVerify[index].category === element) {
            greaterValue = valuesToVerify[index].portWeightValues[valuesToVerify[index].portWeightValues.length - 1];
            valuesToVerify.forEach(function(grouping) {
              if (grouping.category === arrOfGroups[index + 1]) {
                lesserValue = grouping.portWeightValues[0];
                if (greaterValue < lesserValue) {
                  expect(false).customError('Last grouping value under "' + element + '" is less than the first value of grouping under "' + arrOfGroups[index + 1] + '"');
                  count = count + 1;
                }
              }
            });
          }
        }
      });
      if (count >= 1) {
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 751322', function() {

    it('Should open "Client:;pa3;grouping;Fractile%20Test" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fractile-test');
    });

    var arrReports = ['Group Before Exclusions', 'Group After Exclusions'];
    var arrGroupings = ['P/E (custom) Quartile 1', 'P/E (custom) Quartile 2', 'P/E (custom) Quartile 3', 'P/E (custom) Quartile 4', '[N/A]',];

    var flag = 0;
    arrReports.forEach(function(reportName) {
      // Wait and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

      it('Verify if "' + reportName + '" contains ' + arrGroupings, function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn(reportName, '', '').then(function(firstColumnValue) {
          for (var i = 0; i < firstColumnValue.length; i++) {
            if (firstColumnValue[i] !== 'Total') {
              if (firstColumnValue[i].indexOf(arrGroupings[i - 1]) === -1) {
                expect(false).customError('Expected: "' + arrGroupings[i - 1] + '" but Found: "' + firstColumnValue[i] + '"');
                flag++;
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            }
          }
        });
      });
    });

    var takeScreenShot = 0;
    var arrOfColumnNames = ['Port. Weight', 'Price to Earnings'];
    arrOfColumnNames.forEach(function(columnName) {
      it('Verify if values in "' + columnName + '" in both the reports are displayed same', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn(arrReports[0], columnName, '').then(function(firstReportValue) {
          SlickGridFunctions.getAllCellValuesFromSingleColumn(arrReports[1], columnName, '').then(function(secondReportValue) {
            firstReportValue.forEach(function(value, index) {
              if (value !== secondReportValue[index]) {
                expect(false).customError('In "' + columnName + '" "' + arrReports[0] + '" value is "' + value + '" and in "' + arrReports[1] + '"' +
                  ' value is "' + secondReportValue[index] + '".');
                takeScreenShot++;
                if (takeScreenShot === 1) {
                  CommonFunctions.takeScreenshot();
                }
              }
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 761742', function() {

    it('Should open "Client:/Pa3/Grouping/Exclusion_Hi_Low" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('exclusion-hi-low');
    });

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });

  describe('Test Step ID: 761743', function() {

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Weights').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Weights" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Exclusions" tab on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "10 Highest" from "Available section"', function() {
      // Select "10 Highest" from the Available Section.
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('10 Highest');
      group.select();

      // Verifying if "10 Highest" is selected
      group.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"10 Highest" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow button', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "10 Highest" is added to "Selected" section', function() {
      var myArray = [];
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('High/Low');
      var children = group.getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('10 Highest') === -1) {
          expect(false).customError('"10 Highest" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if "Weights" report is displayed with only "10 Lowest" group', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(columnData) {
        if (columnData.indexOf('10 Lowest') < 0) {
          expect(false).customError('"10 Lowest" group is not displayed in "Weights" report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the count of the row is "1"', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
        col.splice(0, 1);
        if (col.length !== 1) {
          expect(false).customError('Report is expected to display with 1 grouping, Found:' + col.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Excluded: 10 Highest" hyperlink is present in the report', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Excluded: 10 Highest') {
          expect(false).customError('"Excluded: 10 Highest" hyperlink did not display in the report; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 761744', function() {

    // Click on "High/Low" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'High/Low');

    it('verifying if "High/Low" is selected in selected section by default', function() {
      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'High/Low').select();

      ThiefHelpers.getListBoxItem(xpathOfSelectedSectionOfGroupings, 'High/Low').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"High/Low" is not selected from the Selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand the "Additional Options"', function() {
      TileOptionsGroupings.getExpandableSection('Additional Options').click();

      // Verifying if "Additional Options" is expanded
      TileOptionsGroupings.getExpandableSection('Additional Options').getAttribute('class').then(function(text) {
        if (text.indexOf('collapsed') >= 0) {
          expect(false).customError('Error: Failed to expand "Additional Options" ');
        }
      });
    });

    it('Verifying if the section "Additional Options" is expanded', function() {
      TileOptionsGroupings.expandSectionInOptionsPane('Additional Options').then(function(expended) {
        if (!expended) {
          expect(false).customError('"Additional Options" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Group after Exclusions" radio button in "Exclusions"', function() {
      ThiefHelpers.getRadioClassReference('Group after Exclusions').select();

      // Verifying "Group after Exclusions" radio button is selected
      ThiefHelpers.getRadioClassReference('Group after Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Group after Exclusions" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if the "Excluded: 10 Highest" hyperlink is present in the report', function() {
      PA3MainPage.getExclusionsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Excluded: 10 Highest') {
          expect(false).customError('"Excluded: 10 Highest" hyperlink did not display in the report; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var group = ['10 Highest', '10 Lowest'];

    group.forEach(function(value, index) {

      it('Verifying if "Weights" report is displayed with "' + value + '" group', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Weights', '').then(function(col) {
          col.splice(0, 1);
          if (value !== col[index]) {
            expect(false).customError('"' + value + '" group did not present in the slick grid; Found: ' + col[index]);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });
})
;
