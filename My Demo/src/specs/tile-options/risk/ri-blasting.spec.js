'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-blasting', function() {
  // Declaring array for future use
  var arr = []; var arr1 = [];

  describe('Test Step ID: 565139', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

  });

  describe('Test Step ID: 565180', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Attribution', true, 'isSelected');

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Attribution', 'Risk Models', 'Risk');

  });

  describe('Test Step ID: 565140', function() {

    it('Should click in Available search box', function() {
      element(by.xpath(TileOptionsRiskRiskModels.xpathSearch)).click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should expand "Barra" from the Available container and click "Barra China Model (CHE2)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Barra');
      group.expand();

      // Verifying if "Barra" is expanding
      group.isExpanded().then(function(expanded) {
        console.log(expanded);
        if (expanded) {
          group.getItemByText('Barra China Model (CHE2)').then(function(element) {
            console.log(element + ' eleRef');
            element.select();

            element.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Barra China Model (CHE2)" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Barra" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Barra China Model (CHE2)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          console.log(childArr[i].text);
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Barra China Model (CHE2)') === -1) {
          expect(false).customError('"Barra China Model (CHE2)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Barra China Model (CHE2)" is highlighted in Selected section', function() {
      // Verify if 'Barra China Model (CHE2)' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra China Model (CHE2)').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Barra China Model (CHE2)" is not selected(highlighted)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Info box next to "Barra China Model (CHE2)" to open information drop down', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra China Model (CHE2)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Verifying if information box display with information "Barra China Model (CHE2)"', function() {
      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(text) {
        if (text !== 'Barra China Model (CHE2)') {
          expect(false).customError('Information box did not display with information "Barra China Model (CHE2)": Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Risk Model" to close information box"', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();
    });

    it('Verifying if "Factor Grouping" drop down is enabled', function() {
      CommonFunctions.isElementEnabled('Dropdown', undefined, TileOptionsRiskRiskModels.xpathFactorGroupingButton).then(function(flag) {
        if (!flag) {
          expect(false).customError('"Factor Grouping" drop down did not enable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Visible Factor" is enable', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getVirtualChecklistClassReference()).isDisabled().then(function(disabled) {
        console.log(disabled);
        if (disabled) {
          expect(false).customError('"Visible Factor" is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565141', function() {

    it('Should expand "Axioma" from the Available container and click "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Axioma');
      group.expand();

      // Verifying if "Axioma" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          if (expanded) {
            group.getItemByText('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1').then(function(element) {
              element.select();

              element.isSelected().then(function(selected) {
                if (!selected) {
                  expect(false).customError('"Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is not selected');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"Axioma" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        }

      });
    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1') === -1) {
          expect(false).customError('"Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is highlighted in Selected section', function() {
      // Verify if 'Barra China Model (CHE2)' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" is not selected(highlighted)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Info box next to the "Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1" to open information drop down', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Verifying if information box display with information "Axioma Asia-Pacific Statistical Equity Risk Model MH 2.1"', function() {
      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(text) {
        if (text !== 'Axioma Asia-Pacific Fundamental Equity Risk Model MH 2.1') {
          expect(false).customError('Information box did not display with information "Axioma Asia-Pacific Statistical Equity Risk Model MH 2.1": Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Risk Model" to close information box"', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();
    });

    it('Verifying if "Factor Grouping" drop down is enabled', function() {
      CommonFunctions.isElementEnabled('Dropdown', undefined, TileOptionsRiskRiskModels.xpathFactorGroupingButton).then(function(flag) {
        if (!flag) {
          expect(false).customError('"Factor Grouping" drop down did not enable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Visible Factor" is enable', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getVirtualChecklistClassReference()).isDisabled().then(function(disabled) {
        console.log(disabled);
        if (disabled) {
          expect(false).customError('"Visible Factor" is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565142', function() {

    it('Should enter "APT" in the search field from Available section', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).setText('APT');

      // Verifying that "APT" is typed into the search box
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsRiskRiskModels.xpathSearch).getText().then(function(text) {
        if (text !== 'APT') {
          expect(false).customError('"APT" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "APT" from the Available container and click "APT United States (USD)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('APT');
      group.expand();

      // Verifying if "APT" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('APT United States (USD)').then(function(element) {
            element.select();

            element.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"APT United States (USD)" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"APT" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should click "Right arrow" button to move element from Available to Selected section', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it('Verifying if "APT United States (USD)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('APT United States (USD)') === -1) {
          expect(false).customError('"APT United States (USD)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "APT United States (USD)" is highlighted in Selected section', function() {
      // Verify if 'APT United States (USD)' is selected
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('APT United States (USD)').isSelected().then(function(seleted) {
        if (!seleted) {
          expect(false).customError('"APT United States (USD)" is not selected(highlighted)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Info box next to the "APT United States (USD)" to open information drop down', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('APT United States (USD)');

      item.getIcons().then(function(icons) {
        icons.clickIcon('info');
      });
    });

    it('Verifying if information box display with information "Axioma Asia-Pacific Statistical Equity Risk Model MH 2.1"', function() {
      TileOptionsRiskRiskModels.getInfoBoxHeader().getText().then(function(text) {
        if (text !== 'APT United States (USD)') {
          expect(false).customError('Information box did not display with information "Axioma Asia-Pacific Statistical Equity Risk Model MH 2.1": Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Risk Model" to close information box"', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();
    });

    it('Verifying if "Factor Grouping" drop down is enabled', function() {
      CommonFunctions.isElementEnabled('Dropdown', undefined, TileOptionsRiskRiskModels.xpathFactorGroupingButton).then(function(flag) {
        if (!flag) {
          expect(false).customError('"Factor Grouping" drop down did not enable');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Visible Factor" is enable', function() {
      ThiefHelpers.getDisableableClassReference(ThiefHelpers.getVirtualChecklistClassReference()).isDisabled().then(function(disabled) {
        console.log(disabled);
        if (disabled) {
          expect(false).customError('"Visible Factor" is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565143', function() {

    it('Verifying if "Apply To Attribution" button is present in the report', function() {
      var xpathOfApplyButton = CommonFunctions.getXpath('Button', 'Apply To Attribution');
      element(by.xpath(xpathOfApplyButton)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Apply To Attribution" button did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Attribution" button', function() {
      ThiefHelpers.getButtonClassReference('Apply To Attribution').press().then(function() {
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

    it('Should click on "Contribution" to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('Contribution').check();

      // Verifying if "Contribution" check box is checked
      ThiefHelpers.getCheckBoxClassReference('Contribution').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"Contribution" checkbox is un checked');
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

    it('Should copying all checked checkbox from selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        myArray.forEach(function(checkbox) {
          var xpathOfCheckBox = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, checkbox);
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckBox).isChecked().then(function(flag) {
            if (flag) {
              console.log(checkbox);
              arr.push(checkbox);
            }
          });
        });
      });
    });

    it('Verifying if "Apply To Attribution" button is changed to "Apply To Multiple Reports"', function() {
      var xpathOfApplyButton = CommonFunctions.getXpath('Button', 'Apply To Multiple Reports');
      element(by.xpath(xpathOfApplyButton)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Apply To Attribution" button did not change to "Apply to Multiple Reports"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 565145', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Attribution');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Risk Models', 'Risk');

    it('Verifying if all risk models that are added in the Attribution options dialog are displayed in the Contribution options dialog', function() {
      arr.forEach(function(item, index) {
        ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText().then(function(itemsArr) {
          console.log(itemsArr);
          if (itemsArr[index].text !== item) {
            expect(false).customError('"' + item + '" did not present in Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if Contribution report dialog and Attribution report dialog options are same', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText().then(function(itemsArr) {
        if (itemsArr.length !== arr.length) {
          expect(false).customError('Contribution report dialog and Attribution report dialog options did not same');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arr.forEach(function(checkbox) {
      it('Verifying if "' + checkbox + '" is check off in Selected section', function() {
        var xpathOfCheckBox = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, checkbox);
        ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckBox).isChecked().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + checkbox + '" did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 565147', function() {

    it('Verifying if "Apply To Contribution" button is present in the report', function() {
      var xpathOfApplyButton = CommonFunctions.getXpath('Button', 'Apply To Contribution');
      element(by.xpath(xpathOfApplyButton)).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Apply To Contribution" button did not present in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Apply To Contribution" button', function() {
      ThiefHelpers.getButtonClassReference('Apply To Contribution').press().then(function() {
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

    it('Should click on "All Tiles" to check off', function() {
      ThiefHelpers.getCheckBoxClassReference('All Tiles').check();

      // Verifying if "All Tiles" check box is checked
      ThiefHelpers.getCheckBoxClassReference('All Tiles').isChecked().then(function(isChecked) {
        if (!isChecked) {
          expect(false).customError('"All Tiles" checkbox is un checked');
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

    it('Should copying all checked checkbox from selected section', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText().then(function(itemsArr) {
        itemsArr.forEach(function(checkbox, index) {
          var xpathOfCheckBox = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, itemsArr[index].text);
          ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckBox).isChecked().then(function(flag) {
            if (flag) {
              console.log(itemsArr[index].text);
              arr1.push(itemsArr[index].text);
            }
          });
        });
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

  });

  describe('Test Step ID: 565148', function() {

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Weights', true, 'isSelected');

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Risk Models', 'Risk');

    it('Verifying if all models present in contribution options dialog present in Weights options dialog by items', function() {
      arr1.forEach(function(item, index) {
        ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText().then(function(itemsArr) {
          console.log(itemsArr[index].text);
          if (itemsArr[index].text !== item) {
            expect(false).customError('"' + item + '" did not present in Selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if Contribution report dialog and Attribution report dialog options are same by length', function() {
      ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText().then(function(itemsArr) {
        if (itemsArr.length !== arr1.length) {
          expect(false).customError('Contribution report dialog and Attribution report dialog options did not same, Expected: ' + arr1.length + ', Found: ' + itemsArr.length);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all the items present in selected container are checked off same as in contribution options dialog', function() {
      arr1.forEach(function(checkbox) {
        var xpathOfCheckBox = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, checkbox);
        ThiefHelpers.getCheckBoxClassReference(undefined, xpathOfCheckBox).isChecked().then(function(flag) {
          if (!flag) {
            expect(false).customError('"' + checkbox + '" did not check off');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 565149', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

  });

});
