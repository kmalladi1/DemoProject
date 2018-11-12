'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpg-cat-create-edit', function() {

  var xpathOfAvailableContainerEditGrouping = element.all(by.xpath(CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupings.xpathOfAvailableOrSelectedContainerItemsAndGroups, 'Available'))).last();

  describe('Test Step ID: 493672', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Type "Client:/pa3/test" into the "Portfolio" widget box and select "Client:/pa3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'Client:/pa3/TEST.ACCT', 'CLIENT:/PA3/TEST.ACCT').then(function(value) {
        if (!value) {
          expect(false).customError('"Client:/pa3/TEST.ACCT" is not found/selected from typeahead.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');

    it('Verifying that Weights report is calculated for "Large Cap Core Test vs Russell 1000"', function() {
      PA3MainPage.getHeader().getText().then(function(text) {
        if (text !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('Weights report is not calculated for "Large Cap Core Test vs Russell 1000"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 493670', function() {

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      // Verifying if the grouping link name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError('Grouping link name is not "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Should click on "Economic Sector" hyperlink in the report
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' option is selected.
      TileOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Groupings') {
          expect(false).customError('"Groupings" option is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Folder" icon near to available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathFolderIconFromAvailableSection).press();
    });

    it('Verifying if "Add New Category" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Category Name field" is present', function() {
      ThiefHelpers.isPresent('TextBox', 'Category Name:').then(function(option) {
        if (!option) {
          expect(false).customError('"Category Name field" is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var directoryArray = ['Client', 'Personal', 'Super Client'];

    directoryArray.forEach(function(radioButton) {
      it('Verifying if "Directory" section has radio button for "' + radioButton + '"', function() {
        ThiefHelpers.isPresent('Radio', radioButton, undefined).then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"Directory" section does not have radio button for "' + radioButton + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Sub directory" drop down appear', function() {
      ThiefHelpers.isPresent('Drop Down', 'Sub directory', undefined).then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Sub-directory:" drop down is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var buttonArray = ['OK', 'Cancel'];

    buttonArray.forEach(function(buttonName) {
      it('Verifying if "' + buttonName + '" button exists', function() {
        ThiefHelpers.isPresent('Button', buttonName, undefined).then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"' + buttonName + '" is not present.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 493671', function() {

    it('Should click on "Cancel" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should expand "Client" from Available container and delete "Cat_new" if present under "Client"', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Client');
      group.expand();

      // Getting children of Client group
      group.getChildrenText().then(function(children) {
        children.forEach(function(childrenText, index) {
          if (childrenText.text === 'Cat_new' && childrenText.group === true) {
            console.log(childrenText.text + 'childrenText.text');
            console.log(childrenText.group + 'childrenText.group');

            //var subGroup = group.getGroupByText('Cat_new');
            var subGroup = ThiefHelpers.getListboxGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Client|Cat_new');

            //return item.then(function (remove) {
            subGroup.select();

            return subGroup.getActions().then(function(val) {
              return val.triggerAction('remove').then(function() {

                // Verifying the content of Error dialog box
                ThiefHelpers.getDialogClassReference('Delete Grouping Category').getContent().getText().then(function(content) {
                  content = content.replace(/\n/g, ' ');
                  if (content !== 'Are you sure you want to delete this category and all of its groupings?') {
                    expect(false).customError('Expected dialog box content: "Are you sure you want to delete this ' +
                      'category and all of its columns?"but Found: "' + content + '"');
                    CommonFunctions.takeScreenShot();
                  }
                });

                // Click "OK" on the "Confirmation" dialog
                ThiefHelpers.getDialogButton('Delete Grouping Category', 'OK').click().then(function() {
                }, function(err) {
                  expect(false).customError(err);
                  CommonFunctions.takeScreenShot();
                });

                // Waiting for action to be completed
                Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
              });
            });

            //});

          }
        });
      });
    });

    var arrItems = [];
    it('Verifying if "Cat_new" is not present under "Client" directory', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Client');

      //group.expand();

      group.getChildrenText().then(function(arrObject) {
        arrObject.forEach(function(element) {
          arrItems.push(element.text);
        });
        if (arrItems.indexOf('Cat_new') > -1) {
          expect(false).customError('"Cat_new" is present under "Client"');
          CommonFunctions.takeScreenShot();
        }
      });

      arrItems.length = 0;
    });

    it('Should click on "Folder" icon near to available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathFolderIconFromAvailableSection).press();
    });

    it('Verifying if "Add New Category" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Cat_new" in the "Category Name:" textbox ', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).setText('Cat_new');

      //Verifying if "Category Name:" textbox contains "Cat_new"
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).getText().then(function(text) {
        if (text !== 'Cat_new') {
          expect(false).customError('"Category Name:" textbox does not contains "Cat_new".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client" radio button is selected by default in "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Client', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Client" radio button is not selected by default in "Directory" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sub directory" drop down is set to "Client" by default', function() {
      ThiefHelpers.verifySelectedDropDownText('Client', 'Sub directory', undefined);
    });

    it('Should click on "OK" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('verify "Cat_new" is present under "Client" directory', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Client');

      //group.expand();

      group.getChildrenText().then(function(arrObject) {
        arrObject.forEach(function(element) {
          arrItems.push(element.text);
        });
        if (arrItems.indexOf('Cat_new') === -1) {
          expect(false).customError('"Cat_new" is not present under "Client"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 493669', function() {

    it('Should click on "Folder" icon near to available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathFolderIconFromAvailableSection).press();
    });

    it('Verifying if "Add New Category" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Cat_sub" in the "Category Name:" textbox ', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).setText('Cat_sub');

      //Verifying if "Category Name:" textbox contains "Cat_sub"
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).getText().then(function(text) {
        if (text !== 'Cat_sub') {
          expect(false).customError('"Category Name:" textbox does not contains "Cat_sub".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client" radio button is selected by default in "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Client', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Client" radio button is not selected by default in "Directory" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Client/Cat_new" from "Sub directory" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Client/Cat_new', 'Sub directory', undefined, undefined);
    });

    it('Verifying if "Sub directory" drop down is set to "Client/Cat_new" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Client/Cat_new', 'Sub directory', undefined);
    });

    it('Should click on "OK" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(AddNewCategory.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying if "Cat_sub" is present under "Client|Cat_new" directory', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Client|Cat_new', 'Client').getGroupByText('Cat_sub').getText().then(function(text) {
        if (text !== 'Cat_sub') {
          expect(false).customError('"Cat_sub" inside "Client|Cat_new" is not added to available ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Cat_sub" inside "Client|Cat_new" is not added to available section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe('Test Step ID: 493668', function() {

    it('Should click on "New" button and select New/Reference', function() {
      TileOptionsGroupings.getNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('New/Reference').click();
    });

    it('Verifying if "Groupings" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Groupings').then(function(bool) {
        if (!bool) {
          expect(false).customError('"Groupings" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "New" radio button is selected by default', function() {
      ThiefHelpers.getRadioClassReference('New', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "New" radio button is not selected by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomGroupings.getTab('Formula').click();

      // Verifying that "Formula" tab is selected
      CreateEditCustomGroupings.getTab('Formula').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickOutside');

    it('Verifying if "Client" radio button is selected by default in "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Client', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Client" radio button is not selected by default in "Directory" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Client/Cat_new/Cat_sub" from "Sub directory" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Client/Cat_new/Cat_sub', 'Sub directory', undefined, undefined);
    });

    it('Verifying if "Sub directory" drop down is set to "Client/Cat_new/Cat_sub" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Client/Cat_new/Cat_sub', 'Sub directory', undefined);
    });

    it('Should clear and enter "grpg_new" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('grpg_new');

      //Verifying if "Name" textbox is set to "grpg_new"
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(value) {
        if (value !== 'grpg_new') {
          expect(false).customError('The "Name" textbox is not set to "grpg_new"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying if "grpg_new" is present under "Client|Cat_new|Cat_sub" directory', function() {
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'grpg_new', 'Client|Cat_new|Cat_sub', 'Client|Cat_new')
        .getText().then(function(text) {
        if (text !== 'grpg_new') {
          expect(false).customError('"grpg_new" inside "Client|Cat_new|Cat_sub" is not added to available ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"grpg_new" inside "Client|Cat_new|Cat_sub" is not added to available section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 493673', function() {

    it('Should click on Exclusions LHP item to select', function() {
      TileOptions.getLHPOption('Exclusions').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Exclusions' option is selected.
      TileOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Exclusions') {
          expect(false).customError('"Exclusions" option is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Edit Grouping" button next to Available section
    CommonPageObjectsForPA3.clickOnEditGroupingButtonAndVerify();

    it('Should expand "Client|Cat_new" in "Available" section ', function() {
      ThiefHelpers.expandGroup(xpathOfAvailableContainerEditGrouping, 'Client|Cat_new', undefined);
    });

    it('Should hover over on "Cat_sub" under "Client|Cat_new" directory', function() {
      ThiefHelpers.getListboxGroup(xpathOfAvailableContainerEditGrouping, 'Client|Cat_new|Cat_sub').getActions().then(function(actions) {
        actions.triggerAction('rename');
      });

    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(AddNewCategory.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should clear and enter "Cat_edited" on rename box', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsExclusionsEditGroupingsAddRemove.xpathRenameTextbox, 'Cat_sub');

      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('Cat_edited', protractor.Key.ENTER);
    });

    // Click on the "Cancel" button of "Edit Grouping" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Cancel', 'Edit Groupings');

    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' option is selected.
      TileOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Groupings') {
          expect(false).customError('"Groupings" option is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Cat_edited" is present under "Client|Cat_new" directory', function() {
      ThiefHelpers.getListboxGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Client|Cat_new|Cat_edited')
        .getText().then(function(text) {
        if (text !== 'Cat_edited') {
          expect(false).customError('"Cat_edited" inside "Client|Cat_new" is not added to available ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Cat_edited" inside "Client|Cat_new" is not added to available section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 493694', function() {

    it('Should clear and enter "edited" in "Available" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, TileOptionsGroupings.xpathAvailableSearchBox).setText('edited');
      browser.sleep(2000);
    });

    it('Verifying if "Cat_edited" is present under "Client|Cat_new" in the search result', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Client|Cat_new', 'Cat_edited').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Cat_edited" is not present under "Client|Cat_new" directory');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(false).customError('"Cat_edited" is not present under "Client|Cat_new" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 493697', function() {

    it('Should double click on if "Cat_edited" under "Client|Cat_new" in the search result', function() {
      //Click to highlight
      TileOptionsGroupings.getElementFromAvailableSection('Client|Cat_new', 'Cat_edited').click();

      browser.actions().doubleClick(TileOptionsGroupings.getElementFromAvailableSection('Client|Cat_new', 'Cat_edited')).perform();
      browser.sleep(2000);
    });

    it('Should hover over on "grpg_new" in the selected section', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromSelectedContainer('grpg_new')).perform();

      // Verifying if tooltip appeared
      ThiefHelpers.getToolTipClassReference().isOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Tooltip has not appeared when hovered on "grpg_new".');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if the tooltip name is "Personal"
      ThiefHelpers.getToolTipClassReference().getContent().getText().then(function(name) {
        if (name !== 'Client/Cat_new/Cat_edited') {
          expect(false).customError('"Personal" is not display as tooltip when hover over "Market Value".' + ' Expected: "Personal" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the tooltip for "grpg_new" displays Client/Cat_new/Cat_edited', function() {
      // Verifying if tooltip appeared
      ThiefHelpers.getToolTipClassReference().isOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Tooltip has not appeared when hovered on "grpg_new".');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if the tooltip name is "Client/Cat_new/Cat_edited"
      ThiefHelpers.getToolTipClassReference().getContent().getText().then(function(name) {
        if (name !== 'Client/Cat_new/Cat_edited') {
          expect(false).customError('"Client/Cat_new/Cat_edited" is not display as tooltip when hover over "grpg_new".' + ' Expected: "Client/Cat_new/Cat_edited" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 493698', function() {

    it('Should click on "OK" button in "Tile Options - Weights" page', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptions.xpathHeaderButton, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {
        expect(false).customError('"Hamburger" icon next to "Portfolio" widget is not clicked ' + err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('Account window is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Edit/Pencil" icon beside to "Large Cap Core Test"', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'Large Cap Core Test').click().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('"Edit/Pencil" icon beside to "Large Cap Core Test" is not clicked ' + err);
      });
    });

    it('Verify if "Modify Account(New)" dialog box appeared', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Modify Account(New)" dialog box does not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "PA" from LHP in "Modify Account(New)" page', function() {
      ThiefHelpers.expandGroup(undefined, 'PA', undefined, 'optionspane');
    });

    it('Should click on the "Groupings" tab on the LHP of tile options view', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').select();

      // Verifying if "Groupings" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Groupings', 'PA').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Groupings" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Client" in Available section', function() {
      // Expand "Client"
      ModifyAccountNewPaGroupings.expandElementTree('Client');

      // Check if "Client" is expanded
      ModifyAccountNewPaGroupings.checkIfExpanded('Client');
      browser.sleep(2000);
    });

    it('Should hover hover on "Cat_new" under "Client', function() {
      browser.actions().mouseMove(ModifyAccountNewPaGroupings.getElementFromAvailableSection('Client', 'Cat_new')).perform();
    });

    it('Should click on remove icon in "Cat_new"', function() {
      ModifyAccountNewPaGroupings.getIconFromList('Remove', 'Available', 'Cat_new', 'Client').click();
    });

    it('Verifying that "Delete Grouping Category" dialog box saying "Are you sure you want to delete this category and all of ' + 'its groupings?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Grouping Category');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Grouping Category').getContent().getText().then(function(content) {
        content = content.replace(/\n/g, ' ');
        if (content !== 'Are you sure you want to delete this category and all of its groupings?') {
          expect(false).customError('"Delete Grouping Category" dialog box saying "Are you sure you want to delete ' + 'this category and all of its groupings?" has not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Grouping Category" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(ModifyAccountNewPaGroupings.xpathButtonFromDialogBox, 'OK');
      ThiefHelpers.getButtonClassReference(undefined, xpath).press();

      // Waiting for action to be completed
      Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
    });

    // Doing xit since Known issue "RPD:21787594" is resolved
    xit('Verifying if loading Icon is present for longer(Known issue "RPD:21787594")', function() {
      element(by.xpath(ModifyAccountNewPaGroupings.xpathLoadingBox)).isPresent().then(function(bool) {
        if (!bool) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('Known issue "RPD:21787594" is resolved');
        }
      });
    });

    // Not verifying the expected result because of known issue.
    it('Verifying if "Cat_new" under "Client is deleted', function() {
      ModifyAccountNewPaGroupings.getElementFromAvailableSection('Client', 'Cat_new').isPresent().then(function(boolean) {
        if (boolean) {
          CommonFunctions.takeScreenShot();
          expect(false).customError('"Cat_new" under "Client is not deleted');
        }
      });
    });
  });

  describe('Test Step ID: 567056', function() {

    it('Should click on "Cancel" button in "Modify Account(New)" page', function() {
      ModifyAccountNew.getButtonFromRHP('Cancel').click();
    });

    it('Should click on "Economic Sector" hyperlink in the report', function() {
      // Verifying if the grouping link name is "Economic Sector"
      PA3MainPage.getGroupingsHyperLink('Weights').getText().then(function(text) {
        if (text !== 'Economic Sector') {
          expect(false).customError('Grouping link name is not "Economic Sector"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Should click on "Economic Sector" hyperlink in the report
      PA3MainPage.getGroupingsHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Weights" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Weights') {
          expect(false).customError('"Tile Options - Weights" view has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Groupings LHP item to select', function() {
      TileOptions.getLHPOption('Groupings').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Checking if 'Groupings' option is selected.
      TileOptions.getOptionTitle().getText().then(function(title) {
        if (title !== 'Groupings') {
          expect(false).customError('"Groupings" option is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Super_Client" from Available container and delete "new-cat-1" if present under "Super_Client"', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Super_Client');
      group.expand();

      // Getting children of Client group
      group.getChildrenText().then(function(children) {
        children.forEach(function(childrenText, index) {
          if (childrenText.text === 'new-cat-1' && childrenText.group === true) {
            console.log(childrenText.text + 'childrenText.text');
            console.log(childrenText.group + 'childrenText.group');
            var subGroup = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Super_Client').getGroupByText('new-cat-1');
            subGroup.select();

            return subGroup.getActions().then(function(val) {
              return val.triggerAction('remove').then(function() {

                // Verifying the content of Error dialog box
                ThiefHelpers.getDialogClassReference('Delete Grouping Category').getContent().getText().then(function(content) {
                  content = content.replace(/\n/g, ' ');
                  if (content !== 'Are you sure you want to delete this category and all of its groupings?') {
                    expect(false).customError('Expected dialog box content: "Are you sure you want to delete this ' +
                      'category and all of its groupings?"but Found: "' + content + '"');
                    CommonFunctions.takeScreenShot();
                  }
                });

                // Click "OK" on the "Confirmation" dialog
                ThiefHelpers.getDialogButton('Delete Grouping Category', 'OK').click().then(function() {
                }, function(err) {
                  expect(false).customError(err);
                  CommonFunctions.takeScreenShot();
                });

                // Waiting for action to be completed
                Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
              });
            });
          }
        });
      });
    });

    var arrItems = [];
    it('Verifying if "new-cat-1" is not present under "Super_Client" directory', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Super_Client');

      //group.expand();

      group.getChildrenText().then(function(arrObject) {
        arrObject.forEach(function(element) {
          arrItems.push(element.text);
        });
        if (arrItems.indexOf('Cat_new') !== -1) {
          expect(false).customError('"Cat_new" is present under "Client"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Folder" icon near to available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathFolderIconFromAvailableSection).press();
    });

    it('Verifying if "Add New Category" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "new-cat-1" in the "Category Name:" textbox ', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).setText('new-cat-1');

      //Verifying if "Category Name:" textbox contains "new-cat-1"
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).getText().then(function(text) {
        if (text !== 'new-cat-1') {
          expect(false).customError('"Category Name:" textbox does not contains "new-cat-1".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Super Client" radio button from "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Super Client', undefined).select();

      //Verifying if "Super Client" radio button is selected from "Directory" section
      ThiefHelpers.getRadioClassReference('Super Client', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Super Client" radio button is not selected in "Directory" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sub directory" drop down is set to "Super_Client"', function() {
      ThiefHelpers.verifySelectedDropDownText('Super_Client', 'Sub directory', undefined);
    });

    it('Should click on "OK" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying that "Super_Client" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Super_Client').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Super_Client" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "new-cat-1" is present under "Super_Client" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Super_Client', 'new-cat-1').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"new-cat-1" is not present under "Super_Client" directory');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(false).customError('"new-cat-1" is not present under "Super_Client" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 567057', function() {

    var arrSubDirectory = ['new-sub-1', 'new-sub-2'];

    it('While "Super_Client" is expanded from "Available" container,hover over "' + arrSubDirectory + '" and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Super_Client');
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          // Getting children of Client group
          group.getChildrenText().then(function(children) {
            children.forEach(function(childrenText, index) {
              arrSubDirectory.forEach(function(elementName) {
                if (childrenText.text === elementName && childrenText.group === true) {
                  console.log(childrenText.text + 'childrenText.text');
                  console.log(childrenText.group + 'childrenText.group');
                  var subGroup = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer)
                    .getGroupByText('Super_Client').getGroupByText(elementName);
                  return subGroup.then(function(remove) {
                    remove.select();

                    return remove.getActions().then(function(val) {
                      return val.triggerAction('remove').then(function() {

                        // Verifying the content of Error dialog box
                        ThiefHelpers.getDialogClassReference('Delete groupings Category').getContent().getText().then(function(content) {
                          content = content.replace(/\n/g, ' ');
                          if (content !== 'Are you sure you want to delete this category and all of its groupings?') {
                            expect(false).customError('Expected dialog box content: "Are you sure you want to delete this ' +
                              'category and all of its groupings?"but Found: "' + content + '"');
                            CommonFunctions.takeScreenShot();
                          }
                        });

                        // Click "OK" on the "Confirmation" dialog
                        ThiefHelpers.getDialogButton('Delete groupings Category', 'OK').click().then(function() {
                        }, function(err) {
                          expect(false).customError(err);
                          CommonFunctions.takeScreenShot();
                        });

                        // Waiting for action to be completed
                        Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsGroupings.xpathLoadingBox)), 180000);
                      });
                    });
                  });

                }
              });
            });
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrSubDirectory.forEach(function(directory) {

      it('Should click on "Folder" icon near to available section', function() {
        ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathFolderIconFromAvailableSection).press();
      });

      it('Verifying if "Add New Category" dialog opens', function() {
        ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
          if (!bool) {
            expect(false).customError('"Add New Category" dialog does not opens.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should type "' + directory + '" in the "Category Name:" textbox ', function() {
        ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).setText(directory);

        //Verifying if "Category Name:" textbox contains "'+ directory +'"
        ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).getText().then(function(text) {
          if (text !== directory) {
            expect(false).customError('"Category Name:" textbox does not contains "' + directory + '".');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "Super Client" radio button from "Directory" section', function() {
        ThiefHelpers.getRadioClassReference('Super Client', undefined).select();

        //Verifying if "Super Client" radio button is selected from "Directory" section
        ThiefHelpers.getRadioClassReference('Super Client', undefined).isSelected().then(function(boolean) {
          if (!boolean) {
            expect(false).customError('"Super Client" radio button is not selected in "Directory" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should open and select "Super_Client/new-cat-1" from "Sub directory" drop down', function() {
        ThiefHelpers.selectOptionFromDropDown('Super_Client/new-cat-1', 'Sub directory', undefined, undefined);
      });

      it('Verifying if "Sub directory" drop down is set to "Super_Client/new-cat-1" ', function() {
        ThiefHelpers.verifySelectedDropDownText('Super_Client/new-cat-1', 'Sub directory', undefined);
      });

      it('Should click on "OK" button', function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

        ThiefHelpers.getButtonClassReference(undefined, xpath).press();
      });
    });

    it('Expand "Super_Client|new-cat-1" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Super_Client|new-cat-1', 'Super_Client');
    });

    it('Verifying that "Super_Client|new-cat-1" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Super_Client|new-cat-1').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Super_Client|new-cat-1" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    arrSubDirectory.forEach(function(directory) {

      it('Verifying if "' + directory + '" is present under "Super_Client|new-cat-1" directory', function() {
        TileOptionsGroupings.getElementFromAvailableSection('Super_Client|new-cat-1', directory).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"' + directory + '" is not present under "Super_Client|new-cat-1" directory');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(false).customError('"' + directory + '" is not present under "Super_Client|new-cat-1" directory');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 567058', function() {

    it('Should click on "New" button and select New/Reference', function() {
      TileOptionsGroupings.getNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('New/Reference').click();
    });

    it('Verifying if "Groupings" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Groupings').then(function(bool) {
        if (!bool) {
          expect(false).customError('"Groupings" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "New" radio button is selected by default', function() {
      ThiefHelpers.getRadioClassReference('New', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "New" radio button is not selected by default');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', undefined, undefined, 'clickOutside');

    it('Should select "Super Client" radio button from "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Super Client', undefined).select();

      //Verifying if "Super Client" radio button is selected from "Directory" section
      ThiefHelpers.getRadioClassReference('Super Client', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Super Client" radio button is not selected in "Directory" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should open and select "Super_Client/new-cat-1/new-sub-1" from "Sub directory" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Super_Client/new-cat-1/new-sub-1', 'Sub directory', undefined, undefined);
    });

    it('Verifying if "Sub directory" drop down is set to "Super_Client/new-cat-1/new-sub-1" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Super_Client/new-cat-1/new-sub-1', 'Sub directory', undefined);
    });

    it('Should clear and enter "grpg-1" in the "Name" textbox', function() {
      ThiefHelpers.getTextBoxClassReference('Name', undefined).setText('grpg-1');

      //Verifying if "Name" textbox is set to "grpg-1"
      ThiefHelpers.getTextBoxClassReference('Name', undefined).getText().then(function(value) {
        if (value !== 'grpg-1') {
          expect(false).customError('The "Name" textbox is not set to "grpg-1"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Expand "Super_Client|new-cat-1|new-sub-1" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Super_Client|new-cat-1|new-sub-1', 'Super_Client|new-cat-1');
    });

    it('Verifying that "Super_Client|new-cat-1|new-sub-1" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Super_Client|new-cat-1|new-sub-1').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Super_Client|new-cat-1|new-sub-1" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "grpg-1" is present under "Super_Client|new-cat-1|new-sub-1" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Super_Client|new-cat-1|new-sub-1', 'grpg-1').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"grpg-1" is not present under "Super_Client|new-cat-1|new-sub-1" directory');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(false).customError('"grpg-1" is not present under "Super_Client|new-cat-1|new-sub-1" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 567059', function() {

    it('Should click on "New" button and select "Lot Grouping"', function() {
      TileOptionsGroupings.getNewButton().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "Lot Grouping" option from the drop down.
      TileOptionsGroupings.getNewDropDownItem('Lot Grouping').click();
    });

    it('Should clear and enter "LOT_PURCHASE_DATE" in the "Column:" textbox', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathLotGroupingDialogTextbox, 'Column:');

      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('LOT_PURCHASE_DATE');

      //Verifying if "Column:" textbox is set to "LOT_PURCHASE_DATE"
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== 'LOT_PURCHASE_DATE') {
          expect(false).customError('The "Column:" textbox is not set to "LOT_PURCHASE_DATE"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should clear and enter "grpg-2" in the "Name:" textbox', function() {
      // Getting the xpath of the text box
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathLotGroupingDialogTextbox, 'Name:');

      ThiefHelpers.getTextBoxClassReference(undefined, xpath).setText('grpg-2');

      //Verifying if "Name:" textbox is set to "grpg-2"
      ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
        if (value !== 'grpg-2') {
          expect(false).customError('The "Name:" textbox is not set to "grpg-2"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Super Client" radio button from "Directory" section', function() {
      ThiefHelpers.getRadioClassReference('Super Client', undefined).select();

      //Verifying if "Super Client" radio button is selected from "Directory" section
      ThiefHelpers.getRadioClassReference('Super Client', undefined).isSelected().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Super Client" radio button is not selected in "Directory" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying that "Super_Client" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Super_Client').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Super_Client" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "grpg-2" is present under "Super_Client" directory', function() {
      TileOptionsGroupings.getElementFromAvailableSection('Super_Client', 'grpg-2').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"grpg-2" is not present under "Super_Client" directory');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'Index out of bound') {
          expect(false).customError('"grpg-2" is not present under "Super_Client" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 567061', function() {

    it('Should hover over on "grpg-2" under "Super_Client" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('Super_Client', 'grpg-2')).perform();
    });

    it('Should click on Edit icon in "grpg-2"', function() {
      TileOptionsGroupings.getIconFromList('Edit', 'Available', 'grpg-2', 'Super_Client').click();
    });

    it('Should open and select "Super_Client/new-cat-1/new-sub-1" from "Sub directory" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Super_Client/new-cat-1/new-sub-1', 'Sub directory', undefined, undefined);
    });

    it('Verifying if "Sub directory" drop down is set to "Super_Client/new-cat-1/new-sub-1" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Super_Client/new-cat-1/new-sub-1', 'Sub directory', undefined);
    });

    it('Should click on "Save" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying that "Super_Client|new-cat-1|new-sub-1" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Super_Client|new-cat-1|new-sub-1').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Super_Client|new-cat-1|new-sub-1" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrElement = ['grpg-1', 'grpg-2'];

    arrElement.forEach(function(element) {
      it('Verifying if "' + element + '" is present under "Super_Client|new-cat-1|new-sub-1" directory', function() {
        TileOptionsGroupings.getElementFromAvailableSection('Super_Client|new-cat-1|new-sub-1', element).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"' + element + '" is not present under "Super_Client|new-cat-1|' + 'new-sub-1" directory');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(false).customError('"' + element + '" is not present under "Super_Client|new-cat-1|' + 'new-sub-1" directory');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 567065', function() {

    it('Should hover over on "grpg-1" under "Super_Client|new-cat-1|new-sub-1" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('Super_Client|new-cat-1|new-sub-1', 'grpg-1')).perform();
    });

    it('Should click on Edit icon in "grpg-1"', function() {
      TileOptionsGroupings.getIconFromList('Edit', 'Available', 'grpg-1', 'Super_Client|new-cat-1|new-sub-1').click();
    });

    it('Should open and select "Super_Client/new-cat-1/new-sub-2" from "Sub directory" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Super_Client/new-cat-1/new-sub-2', 'Sub directory', undefined, undefined);
    });

    it('Verifying if "Sub directory" drop down is set to "Super_Client/new-cat-1/new-sub-2" ', function() {
      ThiefHelpers.verifySelectedDropDownText('Super_Client/new-cat-1/new-sub-2', 'Sub directory', undefined);
    });

    it('Should click on "Save As" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save As');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Verifying that "Super_Client|new-cat-1|new-sub-1" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('Super_Client|new-cat-1|new-sub-1').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"Super_Client|new-cat-1|new-sub-1" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Expand "Super_Client|new-cat-1|new-sub-2" from "Available" container', function() {
      TileOptionsGroupings.expandElementTree('Super_Client|new-cat-1|new-sub-2', 'Super_Client|new-cat-1');
    });

    it('Verifying that "new-sub-2" is expanded', function() {
      TileOptionsGroupings.checkIfExpanded('new-sub-2').getAttribute('class').then(function(value) {
        if (value.indexOf('expanded') === -1) {
          expect(false).customError('"new-sub-2" is not expanded from "Available" container.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrDirectory = ['new-sub-1', 'new-sub-2'];

    arrDirectory.forEach(function(directory) {
      it('Verifying if "grpg-1" is present under "Super_Client|new-cat-1|' + directory + '" directory', function() {
        TileOptionsGroupings.getElementFromAvailableSection('Super_Client|new-cat-1|' + directory, 'grpg-1').isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"grpg-1" is not present under "Super_Client|new-cat-1|' + directory + '" directory');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {
          if (error.name === 'Index out of bound') {
            expect(false).customError('"grpg-1" is not present under "Super_Client|new-cat-1|' + directory + '" directory');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 567128', function() {

    it('Should hover over on "grpg-2" under "Super_Client|new-cat-1|new-sub-1" directory', function() {
      browser.actions().mouseMove(TileOptionsGroupings.getElementFromAvailableSection('Super_Client|new-cat-1|new-sub-1', 'grpg-2')).perform();
    });

    it('Should click on Edit icon in "grpg-2"', function() {
      TileOptionsGroupings.getIconFromList('Edit', 'Available', 'grpg-2', 'Super_Client|new-cat-1|new-sub-1').click();
    });

    var radioButtons = ['New', 'Reference'];

    radioButtons.forEach(function(radio) {

      it('Verifying if the "' + radio + '" radio button is disabled', function() {
        ThiefHelpers.getRadioClassReference(radio, undefined).isDisabled().then(function(bool) {
          if (!bool) {
            expect(false).customError('The "' + radio + '" radio button is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var radioButtons2 = ['Client', 'Personal', 'Super Client'];

    // As directory section contains these radio buttons.
    radioButtons2.forEach(function(radio) {
      it('Verifying if the "' + radio + '" radio button is enabled', function() {
        ThiefHelpers.getRadioClassReference(radio, undefined).isDisabled().then(function(bool) {
          if (bool) {
            expect(false).customError('The "' + radio + '" radio button is disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 567066', function() {

    it('Should click on "Cancel" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    it('Should click on "Folder" icon near to available section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsGroupings.xpathFolderIconFromAvailableSection).press();
    });

    it('Verifying if "Add New Category" dialog opens', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog did not open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "Cat_New" in the "Category Name:" textbox ', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).setText('Cat_New');

      //Verifying if "Category Name:" textbox contains "new-cat-1"
      ThiefHelpers.getTextBoxClassReference('Category Name:', undefined).getText().then(function(text) {
        if (text !== 'Cat_New') {
          expect(false).customError('"Category Name:" textbox does not contains "Cat_New". Found ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsGroupings.xpathButtonFromDialogBox, 'OK');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Error', 'Category already exists');

  });

  describe('Test Step ID: 493701', function() {

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

    it('Should click on "Refresh" Button in app tool bar', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.xpathRefreshBtn).press().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for the reports to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Should expand "Commercial Services|Personnel Services" in "Weights" report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Personnel Services');

      // Verifying that "Commercial Services|Personnel Services" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Personnel Services');

      //waiting for the elements to load in the browser.
      browser.sleep(2000);
    });

    //Not verifying expected result because of Known Issue: RPD:20826752
    var arrSecurities = ['Robert Half International Inc.', 'ManpowerGroup Inc.'];
    arrSecurities.forEach(function(securities) {

      it('Verifying that "' + securities + '" is not displayed under "Commercial Services > Personnel Services"', function() {
        PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services|Personnel Services', securities).isPresent().then(function(boolean) {
          if (boolean) {
            expect(false).customError(securities + ' is displayed under "Commercial Services > ' + 'Personnel Services (Known Issue: RPD:20826752 resolved)');
          }
        });
        browser.sleep(2000); // Waiting for report to calculate
      });
    });
  });
});
