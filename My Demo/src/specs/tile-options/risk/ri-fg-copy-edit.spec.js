'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-copy-edit', function() {

  describe('Test Step ID: 555356', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/PA3_factor_high_low_grouping"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('pa3-factor-high-low-grouping');
    });

    it('Verifying if "Calculation Error" dialog appeared', function() {
      browser.wait(function() {
        return ThiefHelpers.isDialogOpen('Calculation Error').then(function(visible) {
          return visible;
        });
      }, 30000).then(function() {
      }, function() {

        expect(false).customError('Waited for 30 seconds but Calculation Error Dialog not appeared');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "ok" button in Calculation Error dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('OK', 'Calculation Error');

    var arrOfWidgetXpath = [PA3MainPage.xpathPortfolioWidget, PA3MainPage.xpathBenchmarkWidget];
    var arrOfWidgets = ['Portfolio', 'Benchmark'];
    var arrOfExpectedText = ['MSCI_EM:AC_WORLD_FREE', 'FTAWI:ALL_WORLD_INDEX'];

    CommonPageObjectsForPA3.verifyWidgetBoxText(arrOfWidgetXpath, arrOfWidgets, arrOfExpectedText);

  });

  describe('Test Step ID: 555357', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Exposures', 'Risk Models', 'Risk');

    it('Should expand "Barra" from the Available container and click "Barra China Model (CHE2)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Barra');
      group.expand();

      // Verifying if "Barra" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Barra Global Long-Term Model (GEM3L)').then(function(element) {
            element.select();

            element.doubleClick();
          });
        } else {
          expect(false).customError('"Barra" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Verifying if "Barra Global Long-Term Model (GEM3L)" radio button is displayed in the selected section', function() {
      ThiefHelpers.isPresent('Radio', 'Barra Global Long-Term Model (GEM3L)').then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Barra Global Long-Term Model (GEM3L)" radio button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Barra Global Long-Term Model (GEM3L)" is added to selected container', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Barra Global Long-Term Model (GEM3L)') === -1) {
          expect(false).customError('"Barra Global Long-Term Model (GEM3L)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555358', function() {

    it('Should select "FactSet: Standard" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('FactSet: Standard', 'Factor Grouping');

      // verifying if 'FactSet: Standard' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard', 'Factor Grouping');
    });

    // Click on wrench icon next to Factor Grouping and select "Duplicate" from drop-down
    CommonPageObjectsForPA3.clickOnFactorGroupWrenchIconAndSelectOption('Duplicate');

    it('Verifying if "Create New Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Factor Grouping" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "Copy of Standard" is populated in the Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Copy of Standard') {
          expect(false).customError('"Copy of Standard" is not populated in "Name" field.Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555370', function() {

    it('Should select "Client" under Directory if it is not selected by default', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Client').select();

          ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"Client" radio button is not selected.');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    it('Click on "Save" button ', function() {
      var xpath = '//tf-dialog//tf-button[normalize-space(.)="Save"]';
      ThiefHelpers.getButtonClassReference('Save', xpath).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Save" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('verifying if Warning message is displayed as "The grouping name is already in use."', function() {
      element(by.xpath(CreateNewFactorGrouping.xpathOfWarningMessage)).getText().then(function(warningMessage) {
        if (warningMessage !== 'The grouping name is already in use.') {
          expect(false).customError('Warning message is not displayed as "The grouping name is already in use.". Found: "' + warningMessage + '"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

  });

  describe('Test Step ID: 555372', function() {

    it('Select the "Personal" radio button ', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Columns" dialog verify if loading icon is displayed with text "Saving factor grouping..."
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Create New Factor Grouping', undefined, undefined, undefined, 'Progress Indicator', 'Saving factor grouping...');

    it('Verifying if "Risk Models" is selected in the LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555367', function() {

    it('Should select "Personal: Copy of Standard" option from "Factor Grouping" dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal: Copy of Standard', 'Factor Grouping');

      // verifying if 'Personal: Copy of Standard' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('Personal: Copy of Standard', 'Factor Grouping');
    });

    // Click on wrench icon next to Factor Grouping and select "Edit" from drop-down
    CommonPageObjectsForPA3.clickOnFactorGroupWrenchIconAndSelectOption('Edit');

    it('Verifying if "Edit Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Edit Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Edit Factor Grouping" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "High/Low Group" button and click on the columns drop-down and expand Risk
    CommonPageObjectsForPA3.clickOnAddHighLowAndSelectOptionFromColumnDropdown(true, 'FactSet|Risk', 'FactSet');

    // Expand "Standard"
    CommonPageObjectsForPA3.expandGroup('FactSet|Risk|Standard', 'FactSet|Risk');

    // Expand "Asset Date" and select Raw Factor Exposure
    CommonPageObjectsForPA3.clickOnAddHighLowAndSelectOptionFromColumnDropdown(undefined, 'FactSet|Risk|Standard|Asset Data', 'FactSet|Risk|Standard', 'Raw Factor Exposure');

    it('Verifying that High/Low (Raw Factor Exposure) are displayed at the end in the Edit Grouping', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr[arr.length - 1] !== ('High/Low (Raw Factor Exposure)') && arr.indexOf('High/Low (No Column Selected)') > -1) {
          expect(false).customError('"High/Low (No Column Selected)" is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 555359', function() {

    // Click "+ Group" icon and Enter "Group A" into text box and click on "+Create" button
    CommonPageObjectsForPA3.clickOnAddGroupAndCreateNewGroup('Group A');

    it('Verifying that "Group A" is  displayed below High/Low (Raw Factor Exposure) in the Edit Grouping', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          if (childArr[i].text === 'High/Low (Raw Factor Exposure)') {
            if (childArr[i + 1].text !== 'Group A') {
              expect(false).customError('"Group A" is not displayed below High/Low (Raw Factor Exposure).');
              CommonFunctions.takeScreenShot();
            }
          }
        }

      });

    });
  });

  describe('Test Step ID: 555360', function() {

    it('Should expand "Industries" in "Edit Grouping" section select "GEM Airlines"', function() {
      ThiefHelpers.expandAndGetListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'GEM Airlines', 'Industries').select();
    });

    it('Should Drag the selected item "GEM Airlines" from grouping "Industries" and drop them in "High/Low (Raw Factor Exposure)" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping('Industries', 'GEM Airlines', undefined);

      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'High/Low (Raw Factor Exposure)', undefined);

      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();

      browser.sleep(2000);
    });

    it('Should click "GEM Steel" from "Industries" grouping', function() {
      ThiefHelpers.getListBoxItem(CreateNewFactorGrouping.xpathEditGroupingContainer, 'GEM Steel', 'Industries').select();
    });

    it('Should Drag the selected item "GEM Steel" from grouping "Industries" and drop them in "Group A" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping('Industries', 'GEM Steel', undefined);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Group A', true);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    var arrOfGroupNames = ['High/Low (Raw Factor Exposure)', 'Group A'];
    var arrOfItemNames = ['GEM Airlines', 'GEM Steel'];

    arrOfGroupNames.forEach(function(groupName, index) {
      it('Expand "' + groupName + '" if not already expanded to verify child elements', function() {
        var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText(groupName);
        group.isExpanded().then(function(expanded) {
          if (!expanded) {
            group.expand();
          }
        });
      });

      it('Verifying that "' + arrOfItemNames + '" is displayed under "' + arrOfGroupNames + '"', function() {
        var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText(groupName);
        var arrOfChildren;
        arrOfChildren = group.getChildrenText();
        arrOfChildren.then(function(childArr) {
          if (childArr[0].text !== arrOfItemNames[index]) {
            expect(false).customError('"' + arrOfItemNames + '" is not displayed under "' + arrOfGroupNames + '"');
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

  });

  describe('Test Step ID: 555361', function() {

    it('Should collapse "Group A" in "Edit Factor Grouping" dialog', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('Group A');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.collapse();

        }
      });

    });

    it('Click on the rename icon next to "Group A"', function() {
      ThiefHelpers.getListboxGroup(CreateNewFactorGrouping.xpathEditGroupingContainer, 'Group A').getActions().then(function(item) {
        item.triggerAction('rename');
      });
    });

    it('Should clear and enter "Group_B" in "Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, '//tf-listbox-item-handle//tf-textbox').setText('Group_B');
      browser.sleep(2000);
    });

    it('Should click outside of the cell to come out of edit mode', function() {
      element(by.xpath('//tf-dialog-body//*[normalize-space(.) = "Edit Grouping"]')).click();
    });

    it('Verifying that "Group A" has been changed to "Group_B" and is displayed at the end in the Edit Grouping section', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
        }

        if (arr.indexOf('Group A') > -1 && arr.indexOf('Group_B') === -1) {
          expect(false).customError('"Group A" is still displayed below High/Low (Raw Factor Exposure).');
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 555362', function() {

    it('Should Drag the selected group "Group_B" and drop them in "World" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Group_B', true);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'World', true);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Expand "World" if not already expanded to verify child elements', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('World');
      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          group.expand();
        }
      });
    });

    it('Verifying that "Group_B" is displayed in the second position under World', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('World');
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        if (childArr[1].text !== 'Group_B') {
          expect(false).customError('"Group_B" is not displayed in the second position.');
          CommonFunctions.takeScreenShot();
        }

      });

    });
  });

  describe('Test Step ID: 555364', function() {

    // Click on "+ High/Low" button
    CommonPageObjectsForPA3.clickOnAddHighLow();

  });

  describe('Test Step ID: 555363', function() {
    it('Select from the "High/Low (No Column Selected)" Edit Grouping container', function() {
      ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer).getGroupByText('High/Low (No Column Selected)').select();
    });

    it('Verifying that rename icon is not displayed', function() {
      CreateNewFactorGrouping.getRemoveOrRenameIconOfGroup('High/Low (No Column Selected)', 'rename').isDisplayed().then(function(displayed) {
        expect(false).customError('"Rename" icon is displayed');
        CommonFunctions.takeScreenShot();
      }, function() {
        expect(true).toBeTruthy();
      });
    });

    it('Verifying that only remove icon is displayed', function() {
      CreateNewFactorGrouping.getRemoveOrRenameIconOfGroup('High/Low (No Column Selected)', 'remove').isDisplayed().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Remove" icon is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555365', function() {

    it('Click on the remove icon next to "High/Low (No Column Selected)"', function() {
      ThiefHelpers.getListboxGroup(CreateNewFactorGrouping.xpathEditGroupingContainer, 'High/Low (No Column Selected)').getActions().then(function(item) {
        item.triggerAction('remove');
      });
    });

    it('Verifying that "High/Low (No Column Selected)" is not displayed in the Edit Grouping section', function() {
      var group = ThiefHelpers.getListboxClassReference(CreateNewFactorGrouping.xpathEditGroupingContainer);
      var arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(function(childArr) {
        var arr = [];
        for (var i = 0; i < childArr.length; ++i) {
          arr.push(childArr[i].text);
          if (childArr[i].text === 'High/Low (No Column Selected)') {
            expect(false).customError('"High/Low (No Column Selected)" is still displayed in the "Edit Grouping" section');
            CommonFunctions.takeScreenShot();
          }
        }
      });

    });
  });

  describe('Test Step ID: 555366', function() {

    // Click on "Save" button in "Create New Factor Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Create New Factor Grouping');

    it('Should select "Personal: Copy of Standard" option from "Factor Grouping" drop-down', function() {
      ThiefHelpers.selectOptionFromDropDown('Personal: Copy of Standard', 'Factor Grouping');

      // verifying if 'Personal: Copy of Standard' is selected from "Factor Grouping" section drop down
      ThiefHelpers.verifySelectedDropDownText('Personal: Copy of Standard', 'Factor Grouping');
    });

    var arrOfVisibleFactors = ['World', 'Risk Indices', 'Industries', 'Countries', 'Currencies', 'High/Low (Raw Factor Exposure)'];

    arrOfVisibleFactors.forEach(function(factorName) {
      it('Verify if "' + factorName + '" is displayed in "visible factor" section', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factorName).getText().then(function(item) {
          if (item !== factorName) {
            expect(false).customError('"' + factorName + '" is not displayed in "visible factor" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 555368', function() {

    var arrOfVisibleFactorGroups = [];
    it('Getting all the checkboxes present in visible factors section', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getChildrenText().then(function(valArray) {
        valArray.forEach(function(factorGroups) {
          arrOfVisibleFactorGroups.push(factorGroups.text);
        });
      });
    });

    it('Verifying the "High/Low (Raw Factor Exposure)" is displayed at last in the Visible Factors section', function() {
      if (arrOfVisibleFactorGroups[arrOfVisibleFactorGroups.length - 1] !== 'High/Low (Raw Factor Exposure)') {
        expect(false).customError('"High/Low (Raw Factor Exposure)" is not displayed second from the top under "World" grouping');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Should click on "+" button to expand "World"', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('World').expand();

      // Verifying if checklist is expanded
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('World').isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"World" checkbox is not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "+" button to expand "Group_B"', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('World');
      group.getGroupByText('Group_B').then(function(subGroup) {
        subGroup.expand();

        // Verifying if checklist is expanded
        subGroup.isExpanded().then(function(expanded) {
          if (!expanded) {
            expect(false).customError('"Group_B" checkbox is not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if "GEM Airlines" is displayed under "World > Group_B"', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('World');
      group.getGroupByText('Group_B').then(function(subGroup) {
        subGroup.expand();

        // Verifying if checklist is expanded
        subGroup.getItemByText('GEM Steel').then(function(item) {
          item.getText().then(function(text) {
            if (text !== 'GEM Steel') {
              expect(false).customError('"GEM Steel" factor is not displayed under "World > Group_B" groupings factor');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should click on "+" button to expand "High/Low (Raw Factor Exposure)"', function() {
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('High/Low (Raw Factor Exposure)').expand();

      // Verifying if checklist is expanded
      ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('High/Low (Raw Factor Exposure)').isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"High/Low (Raw Factor Exposure)" checkbox is not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify if "GEM Airlines" is displayed under "High/Low (Raw Factor Exposure"', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('High/Low (Raw Factor Exposure)');

      group.getItemByText('GEM Airlines').then(function(item) {
        item.getText().then(function(text) {
          if (text !== 'GEM Airlines') {
            expect(false).customError('"GEM Airlines" factor is not displayed under "High/Low (Raw Factor Exposure)" groupings factor');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfChildNames = [];

    it('Getting all the checkboxes under "World" grouping', function() {
      var group = ThiefHelpers.getVirtualChecklistClassReference().getGroupByText('World');
      group.getChildrenText().then(function(childArr) {
        childArr.forEach(function(element, index) {
          arrOfChildNames.push(element.text);
        });
      });

    });

    it('Verifying if "Group_B" is displayed second from the top under "World" grouping', function() {
      if (arrOfChildNames[1] !== 'Group_B') {
        expect(false).customError('"Group_B" is not displayed second from the top under "World" grouping');
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe('Test Step ID: 555373', function() {

    it('verifying if "Personal: Copy of Standard" is selected from "Factor Grouping" section drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Personal: Copy of Standard', 'Factor Grouping');
    });

    // Click on wrench icon next to Factor Grouping and select "Remove" from drop-down
    CommonPageObjectsForPA3.clickOnFactorGroupWrenchIconAndSelectOption('Remove');

    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Delete', 'Delete Factor Grouping');

    it('Click on "Factor Grouping" drop-down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping').open();
    });

    it('Verifying if the "wrench" drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Wrench" drop down did not appear');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Personal: Copy of Standard" option is not displayed in the Factor Grouping drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(options) {
        if (options.indexOf('Personal: Copy of Standard') >= 0) {
          expect(false).customError('"Personal: Copy of Standard" option is displayed in the Factor Grouping menu drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555369', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Exposures');
  });
});

