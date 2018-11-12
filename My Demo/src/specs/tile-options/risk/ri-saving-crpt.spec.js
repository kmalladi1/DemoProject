'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-saving-crpt', function() {

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 698905', function() {

    it('Should open "Create_Multi_Layer_Factor_Grouping" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ri-saving-crpt');
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if "Calculation Error" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog is appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that report header displays "Dow Jones Industrials vs MSCI World"', function() {
      PA3MainPage.getHeader().getText().then(function(header) {
        if (header !== 'Dow Jones Industrials vs MSCI World') {
          expect(false).customError('"Dow Jones Industrials vs MSCI World" is not displayed as report header; Found: ' + header);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698906', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Summary', 'Risk Models', 'Risk');

    it('Verifying if "R-Squared Daily Global Equity Model USD V2" is selected in the selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('R-Squared Daily Global Equity Model USD V2') === -1) {
          expect(false).customError('"R-Squared Daily Global Equity Model USD V2" is not present in the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "FactSet: Standard Multi Level" option is selected from the "Factor Grouping" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('FactSet: Standard Multi Level', 'Factor Grouping');
    });

  });

  describe('Test Step ID: 698907', function() {

    it('Should click "Wrench" and select "Duplicate" form the drop down', function() {
      TileOptionsRiskRiskModels.getWrenchActions().triggerAction('duplicate').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Create New Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Create New Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Create New Factor Grouping" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Group" button from the "Create New Factor Grouping" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateNewFactorGrouping.xpathGroupButton).press().then(function() {
      },
        function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Create Box" Drop down is opened', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Create Box" Drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Dummy Group" in the "Group Name" text box and clicking on "+Create" button', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, CreateNewFactorGrouping.xpathGroupNameTextBox).setText('Dummy Group');

      // Thief helpers will hit enter internally which hits the create button. Hence no need of clicking on the button again
    });

    it('Verifying if "Dummy Group" grouping is displayed in "Edit Grouping" list box of "Create New Factor Grouping" dialog', function() {
      CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Dummy Group', true).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"Dummy Group" grouping is not displayed in "Create New Factor Grouping" dialog');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698908', function() {

    it('Should click on "+" icon of "Regional" grouping to expand', function() {
      ThiefHelpers.expandGroup(CreateNewFactorGrouping.xpathEditGroupingListBox, 'Regional');
    });

    it('Should hold "CONTROL" key,', function() {
      browser.actions().keyDown(protractor.Key.CONTROL).perform();
    });

    var regions = ['Benelux', 'Italy', 'Iberian Region', 'Switzerland'];

    regions.forEach(function(element) {

      it('Should select "' + element + '" from "Regional" grouping', function() {
        CreateNewFactorGrouping.getElementFromEditGrouping('Regional', element).click();
      });

    });

    it('Should Drag the selected grouping from "Regional" grouping and drop them in "Dummy Group" grouping', function() {
      var source = CreateNewFactorGrouping.getElementFromEditGrouping('Regional', 'Italy', true);
      var target = CreateNewFactorGrouping.getElementFromEditGrouping(false, 'Dummy Group', true);
      browser.driver.actions().mouseDown(source).mouseMove(target).mouseUp(target).perform();
    });

    it('Should release "Control" key', function() {
      browser.actions().keyUp(protractor.Key.CONTROL).perform();
    });

    it('Should click on "+" icon of "Dummy Group" grouping to expand', function() {
      ThiefHelpers.expandGroup(CreateNewFactorGrouping.xpathEditGroupingListBox, 'Dummy Group');
    });

    regions.forEach(function(element) {

      it('Verifying if "' + element + '" is displayed in "Dummy Group"', function() {
        CreateNewFactorGrouping.getElementFromEditGrouping('Dummy Group', element).isPresent().then(function(found) {
          if (!found) {
            expect(false).customError('"' + element + '" is not displayed in "Dummy Group"');
            CommonFunctions.takeScreenShot();
          }
        });

      });

    });

  });

  describe('Test Step ID: 698909', function() {

    it('Should type "Delete Later" in the "Name" text box', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Delete Later');

      // Verifying if Delete Later is entered in the Name text box
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(val) {
        if (val !== 'Delete Later') {
          expect(false).customError('"Delete Later" is not entered in the Name text box; Found: ' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" radio button if not already selected', function() {
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getRadioClassReference('Personal').select();
        }
      });
    });

    it('Verifying if the "Personal" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Save" button from the "Create New Factor Grouping" dialog', function() {
      ThiefHelpers.getDialogButton('Create New Factor Grouping', 'Save').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the dialog to close', function() {
      Utilities.waitUntilElementDisappears(CreateNewFactorGrouping.getSpinner(), 30000);
    });

    it('Verifying if "Create New Factor Grouping" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Create New Factor Grouping').then(function(option) {
        if (option) {
          expect(false).customError('"Create New Factor Grouping" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Factor Grouping" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Factor Grouping" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Personal: Delete Later" is displayed in the drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        if (array.indexOf('Personal: Delete Later') < 0) {
          expect(false).customError('"Personal: Delete Later" option is not present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698910', function() {

    it('Should click on "Apply To Risk Summary" button', function() {
      ThiefHelpers.getButtonClassReference('Apply To Risk Summary').press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsRiskRiskModels.xpathBlastingWindow).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the "Risk Exposures" check box', function() {
      ThiefHelpers.getCheckBoxClassReference('Risk Exposures').check();

      // Verifying if "Risk Exposures" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Risk Exposures').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"Risk Exposures" checkbox is un checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from Blasting window', function() {
      var xpathOKButton = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathOkOrCancelButton, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpathOKButton).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is closed', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptionsRiskRiskModels.xpathBlastingWindow).then(function(blastWindow) {
        if (blastWindow) {
          expect(false).customError('"Blasting" widget is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Summary');

    it('Automation only: Should click on "Maximize button" from "Risk Summary" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathMaximizeOrMinimizeIcon, 'Risk Summary');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Waiting for the reports to appear', function() {
      expect(Utilities.waitUntilElementAppears(PA3MainPage.isReportCalculated('Risk Summary'), 300000)).toBeTruthy();
    });

    var arrOfRiskSummaryValues = [];

    it('Storing the values in "Factor Contribution(Variance)" grouping in "Risk Summary" report for verification', function() {
      SlickGridFunctions.getElementsFromTree('Risk Summary', '', 'Factor Contribution (Variance)').then(function(array) {
        array.forEach(function(rowVal) {
          SlickGridFunctions.getCellReference('Risk Summary', rowVal, '', 'Data', 'Dow Jones Industrials', 'Factor Contribution (Variance)').then(function(reference) {
            reference.getText().then(function(value) {
              arrOfRiskSummaryValues.push(value);
            });
          });
        });
      });
    });

    it('Automation only: Should click on minimize button from "Risk Summary" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathMaximizeOrMinimizeIcon, 'Risk Summary');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying if the values seen for "Factor Contribution(Variance)" grouping in "Risk Summary" report match with the values seen in "Factor Contribution(Variance)" column of "Risk Exposures" report', function() {
      SlickGridFunctions.getElementsFromTree('Risk Summary', '', 'Factor Contribution (Variance)').then(function(array) {
        array.forEach(function(rowVal, index) {
          SlickGridFunctions.getCellReference('Risk Exposures', rowVal, '', 'Factor Contribution (Variance)').then(function(reference1) {
            reference1.getText().then(function(colValue) {
              if (colValue !== arrOfRiskSummaryValues[index]) {
                expect(false).customError('The "' + colValue + '" value of "Factor Contribution(Variance)" column for "Risk Exposures" report did not match with the ' +
                  '"' + arrOfRiskSummaryValues[index] + '" value for "Factor Contribution(Variance)" grouping in "Risk Summary" report for the row "' + rowVal + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 698911', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Summary', 'Risk Models', 'Risk');

    it('Should click "Factor Grouping" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Factor Grouping" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal: Delete Later" from the drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).selectItemByText('Personal: Delete Later');
    });

    it('Verifying if "Personal: Delete Later" option is selected in the "Factor Grouping" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).getSelectedText().then(function(text) {
        if (text !== 'Personal: Delete Later') {
          expect(false).customError('"Personal: Delete Later" is not selected in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Wrench" and select "Remove" form the drop down', function() {
      TileOptionsRiskRiskModels.getWrenchActions().triggerAction('remove').then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Delete Factor Grouping" dialog appeared', function() {
      ThiefHelpers.isDialogOpen('Delete Factor Grouping').then(function(option) {
        if (!option) {
          expect(false).customError('"Delete Factor Grouping" dialog is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Delete" in the Delete Factor Grouping dialog', function() {
      ThiefHelpers.getDialogButton('Delete Factor Grouping', 'Delete').click();
    });

    it('Verifying if "Delete Factor Grouping" dialog closed', function() {
      ThiefHelpers.isDialogOpen('Delete Factor Grouping').then(function(option) {
        if (option) {
          expect(false).customError('"Delete Factor Grouping" dialog is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait until Visible Factors refreshes', function() {
      Utilities.waitUntilElementDisappears(TileOptionsRiskRiskModels.getSpinner(), 30000);
    });

    it('Should click "Factor Grouping" drop down', function() {
      ThiefHelpers.getDropDownSelectClassReference('Factor Grouping', undefined).open();

      // Verifying if drop down opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Factor Grouping" drop down is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Personal: Delete Later" is not displayed in the drop down', function() {
      ThiefHelpers.getAllOptionsFromDropdown().then(function(array) {
        if (array.indexOf('Personal: Delete Later') >= 0) {
          expect(false).customError('"Personal: Delete Later" option is present in the drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
