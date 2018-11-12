'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-cat-create-edit', function() {
  // Variable(s)
  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  var removeCategory = function(groupName, subGroupName, expand) {
    var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText(groupName);
    if (expand) {
      group.expand();
    }

    group.isExpanded().then(function(expanded) {
      console.log(expanded);
      if (expanded) {
        group.getChildrenText().then(function(children) {
          children.forEach(function(childrenText, index) {
            if (childrenText.text === subGroupName && childrenText.group === true) {
              var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText(groupName).getGroupByIndex(index);

              // Click on the "remove" icon
              return item.then(function(remove) {
                remove.select();
                CommonFunctions.captureScreenShot();
                return remove.getActions().then(function(val) {
                  return val.triggerAction('remove').then(function() {
                    // Verifying the content of Error dialog box
                    ThiefHelpers.getDialogClassReference('Delete Column Category').getContent().getText().then(function(content) {
                      content = content.replace(/\n/g, ' ');
                      if (content !== 'Are you sure you want to delete this category and all of its columns?') {
                        expect(false).customError('Expected dialog box content: "Are you sure you want to delete this ' +
                          'category and all of its columns?"but Found: "' + content + '"');
                        CommonFunctions.takeScreenShot();
                      }
                    });

                    // Click "OK" on the "Confirmation" dialog
                    ThiefHelpers.getDialogButton('Delete Column Category', 'OK').click().then(function() {
                    }, function(err) {
                      expect(false).customError(err);
                      CommonFunctions.takeScreenShot();
                    });

                    // Waiting for action to be completed
                    Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000);
                  }, function(error) {
                    expect(false).customError(error);
                    CommonFunctions.takeScreenShot();
                  });
                });
              });
            }
          });
        });
      } else {
        expect(false).customError('"' + groupName + '" group was not expanded.');
        CommonFunctions.takeScreenShot();
      }
    });
  };

  describe('Test Step ID: 570632', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:default_doc_OLD"', function() {
      PA3MainPage.switchToDocument('default-doc-old');
    });

    it('Enter "CLIENT:/PA3/TEST" in the "Portfolio" widget and select ' + '"CLIENT:/PA3/TEST.ACCT" from type ahead', function() {
      PA3MainPage.setPortfolio('CLIENT:/PA3/TEST', 'Client:/pa3/TEST.ACCT', 'Client:/pa3/TEST.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('"CLIENT:/PA3/TEST.ACCT" is not selected from type ahead.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 300000)).toBeTruthy();
    });

    it('Verifying Weights report calculated for "Large Cap Core Test and Russell 1000" ', function() {
      // Verifying that view changed to "Large Cap Core Test and Russell 1000"
      PA3MainPage.getHeader().getText().then(function(value) {
        if (value !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('"Large Cap Core Test vs Russell 1000" is not seen after report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 570633', function() {

    it('Should click on the Wrench icon in the "Weights" report', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if Wrench menu list appeared', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Weights', true).isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Wrench menu is not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
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

    it('Should select "Columns" from LHP in "Tile Options - Weights"', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Add a Category" button', function() {
      TileOptionsColumns.getFolderIconFromAvailableSection().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Add New Category" dialog opened', function() {
      Utilities.verifyDialogTitle('Add New Category');
    });

    it('Verifying that "Category Name field" is present', function() {
      ThiefHelpers.isPresent('TextBox', 'Category Name:').then(function(option) {
        if (!option) {
          expect(false).customError('"Category Name field" is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var directoryArray = ['client', 'personal', 'super-client'];

    directoryArray.forEach(function(radioButton) {
      it('Verifying if "Directory" section has radio button for "' + radioButton + '"', function() {
        AddNewCategory.getRadioButtonFromDirectorySection(radioButton).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"Directory" section does not have radio button for "' + radioButton + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if sub-directory drop down appear', function() {
      AddNewCategory.getSubDirectoryDropDown().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('Sub Directory is not present.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var buttonArray = ['OK', 'Cancel'];

    buttonArray.forEach(function(buttonName) {

      it('Verifying if "' + buttonName + '" button exists', function() {
        AddNewCategory.getFooterButton(buttonName).isPresent().then(function(option) {
          if (!option) {
            expect(false).customError('"' + buttonName + '" is not present.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 570634', function() {

    it('Should click on "Cancel" button in the "Add New Category" dialog', function() {
      ThiefHelpers.getButtonClassReference(undefined, AddNewCategory.getFooterButton('Cancel')).press();
    });

    it('Verifying if "Add New Category" dialog is closed', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (bool) {
          expect(false).customError('"Add New Category" dialog is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrListItems = ['EditTest', 'Demo2'];
    it('Expand "Client" from "Available" container,hover over "Demo1" and click on the "Remove" icon', function() {
      removeCategory('Client', 'Demo1', true);
    });

    //CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column Category', 'Are you ' +
    // 'sure you want to delete this category and all of its columns?');

    it('Verifying if "Demo1" is deleted from "Client"', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client').getChildrenText().then(function(childArray) {
        childArray.forEach(function(columnName) {
          if (columnName.text === 'Demo1') {
            expect(false).customError('"Demo1" is still present in Client.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('While "Client" is expanded from "Available" container,hover over "' + arrListItems + '" and click on the "Remove" icon', function() {
      arrListItems.forEach(function(subGroupName) {
        removeCategory('Client', subGroupName, false);
      });
    });

    it('Verifying if "' + arrListItems + '" is deleted from "Client"', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client').getChildrenText().then(function(childArray) {
        arrListItems.forEach(function(elementName) {
          childArray.forEach(function(columnName) {
            if (elementName === columnName.text && columnName.group === true) {
              expect(false).customError('"' + elementName + '" is still present in Client.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
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

    it('Verifying if "Client" is selected under "Directory" section', function() {
      AddNewCategory.getRadioButtonFromDirectorySection('client').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Client" is not selected under "Directory" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Demo1" in the "Category Name" field.', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:').setText('Demo1');

      // Verifying that "Demo1" is typed into the input box
      ThiefHelpers.getTextBoxClassReference('Category Name:').getText().then(function(text) {
        if (text !== 'Demo1') {
          expect(false).customError('"Demo1" is not typed into the "Category Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      AddNewCategory.getFooterButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(AddNewCategory.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should click on "Add a Category" button', function() {
      TileOptionsColumns.getFolderIconFromAvailableSection().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Add New Category" dialog opened', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client" is selected under "Directory" section', function() {
      AddNewCategory.getRadioButtonFromDirectorySection('client').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Client" is not selected under "Directory" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Demo2" in the "Category Name" field.', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:').setText('Demo2');

      // Verifying that "Demo2" is typed into the input box
      ThiefHelpers.getTextBoxClassReference('Category Name:').getText().then(function(text) {
        if (text !== 'Demo2') {
          expect(false).customError('"Demo2" is not typed into the "Category Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      AddNewCategory.getFooterButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(AddNewCategory.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    var group;
    it('Expand "Client" from "Available" container', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Client" is not expanded from "Available" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrElements = [];
    it('Getting child elements of "Client" directory and storing in an array', function() {
      group.getChildrenText().then(function(childArray) {
        childArray.forEach(function(columnName) {
          arrElements.push(columnName.text);
        });
      });
    });

    var elements = ['Demo1', 'Demo2'];

    elements.forEach(function(elements) {

      it('Verifying if "' + elements + '" is present under "Client" directory', function() {
        if (arrElements.indexOf(elements) === -1) {
          expect(false).customError('"' + elements + '" is not present under "client" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 570635', function() {

    it('Should expand "Personal" from "Available" container,hover over "Private" and click on the "Remove" icon', function() {
      removeCategory('Personal', 'Private', true);
    });

    it('Should click on "Add a Category" button', function() {
      TileOptionsColumns.getFolderIconFromAvailableSection().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Add New Category" dialog opened', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Private" in the "Category Name" field.', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:').setText('Private');

      // Verifying that "Private" is typed into the input box
      ThiefHelpers.getTextBoxClassReference('Category Name:').getText().then(function(text) {
        if (text !== 'Private') {
          expect(false).customError('"Private" is not typed into the "Category Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select the "Personal" radio button', function() {
      AddNewCategory.getRadioButtonFromDirectorySection('personal').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "OK" button', function() {
      AddNewCategory.getFooterButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(AddNewCategory.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Should click on "New" button and select New/Reference', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      Utilities.getOptionFromDropDown('New/Reference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "New" radio button', function() {
      CreateEditCustomColumns.getRadioButton('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "New" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('New').getAttribute('class')).not.toBeNull();
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter formula into the section, click on the X Close button and verify the formula
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_PRICE', true, 'FG_PRICE', 'X Close', 'FG_PRICE(#ED,#CU)');

    it('Should type "Verify1" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Verify1" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Verify1').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Verify1" is typed into the "Name" field
      expect(CreateEditCustomColumns.getNameField().getAttribute('value')).toEqual('Verify1');
    });

    it('Select "Personal" under directory', function() {
      CreateEditCustomColumns.getRadioButton('Personal').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Personal/Private" from "Sub-directory" drop down', function() {
      /*      // Click on "Sub-directory" drop down
       CreateEditCustomColumns.getSubDirectoryDropDown().click().then(function () {
       }, function (err) {
       expect(false).customError(err);
       CommonFunctions.takeScreenShot();
       });

       // Select "Personal/Private" from the drop down
       Utilities.getOptionFromDropDown('Personal/Private').click().then(function () {
       }, function (err) {
       expect(false).customError(err);
       CommonFunctions.takeScreenShot();
       });

       // Verifying that "Personal/Private" is selected
       expect(CreateEditCustomGroupings.getSubDirButton().getText()).toEqual('Personal/Private');*/
      ThiefHelpers.selectOptionFromDropDown('Personal/Private', 'Sub-directory:');

      // verifying if 'Personal/Private' is selected from "Sub-directory:" section drop down
      ThiefHelpers.verifySelectedDropDownText('Personal/Private', 'Sub-directory:');
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      CreateEditCustomColumns.isDialogPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var group;
    var arrElements = [];
    it('Expand "Personal>Private" from "Available" container', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Private').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(childArray) {
                  childArray.forEach(function(columnName) {
                    arrElements.push(columnName.text);
                  });
                });
              } else {
                expect(false).customError('"Private" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Verify1" is displayed in the "Personal > Private" directory', function() {
      if (arrElements.indexOf('Verify1') === -1) {
        expect(false).customError('"Verify1" is not displayed in the "Personal > Private" directory');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 570636', function() {

    it('Should click on "New" button and select "New/Reference"', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      Utilities.getOptionFromDropDown('New/Reference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "New" radio button', function() {
      CreateEditCustomColumns.getRadioButton('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "New" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('New').getAttribute('class')).not.toBeNull();
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter formula into the section, click on the X Close button and verify the formula
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_PRICE', true, 'FG_PRICE', 'X Close', 'FG_PRICE(#ED,#CU)');

    it('Type "Sample1" into the "Name" field', function() {
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      CreateEditCustomColumns.getNameField().sendKeys('Sample1').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Sample1" is typed into the "Name" field
      expect(CreateEditCustomColumns.getNameField().getAttribute('value')).toEqual('Sample1');
    });

    it('Select "Client" under directory', function() {
      CreateEditCustomColumns.getRadioButton('Client').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      CreateEditCustomColumns.isDialogPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "New" button and select "New/Reference"', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      Utilities.getOptionFromDropDown('New/Reference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "New" radio button', function() {
      CreateEditCustomColumns.getRadioButton('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "New" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('New').getAttribute('class')).not.toBeNull();
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_DATE(#ED)', undefined, undefined, 'clickOutside');

    it('Should type "Sample2" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Sample2" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Sample2').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Sample2" is typed into the "Name" field
      expect(CreateEditCustomColumns.getNameField().getAttribute('value')).toEqual('Sample2');
    });

    it('Select "Client" under directory', function() {
      CreateEditCustomColumns.getRadioButton('Client').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select "Client/Demo1" from sub-directory', function() {
      CreateEditCustomGroupings.getSubDirButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Client/Demo1" from the drop down
      Utilities.getOptionFromDropDown('Client/Demo1').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Client/Demo1" is selected
      CreateEditCustomGroupings.getSubDirButton().getText().then(function(value) {
        if (value !== 'Client/Demo1') {
          expect(false).customError('"Client/Demo1" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      CreateEditCustomColumns.isDialogPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var group;
    var arrElements = [];
    var arrElementsClient = [];
    it('Expand "Client > Demo1" from "Available" container', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          // saving elements under Client directory for future reference
          group.getChildrenText().then(function(childArray) {
            childArray.forEach(function(columnName) {
              arrElementsClient.push(columnName.text);
            });
          });
          group.getGroupByText('Demo1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                // saving elements under Demo1 directory for future reference
                subGroup.getChildrenText().then(function(childArray) {
                  childArray.forEach(function(columnName) {
                    arrElements.push(columnName.text);
                  });
                });
              } else {
                expect(false).customError('"Demo1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Sample1" is displayed in the "Client" directory', function() {
      if (arrElementsClient[arrElementsClient.length - 1] !== 'Sample1') {
        expect(false).customError('"Sample1" is not displayed under "Client" directory');
        CommonFunctions.takeScreenShot();
      }
    });

    it('Verifying that "Sample2" is displayed at the bottom in the "Client > Demo1" sub-directory', function() {
      if (arrElements[arrElements.length - 1] !== 'Sample2') {
        expect(false).customError('"Sample2" is not displayed under "Client > Demo1" directory');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 570637', function() {

    it('Should click on "New" button and select New/Reference', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      Utilities.getOptionFromDropDown('New/Reference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "New" radio button', function() {
      CreateEditCustomColumns.getRadioButton('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "New" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('New').getAttribute('class')).not.toBeNull();
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', true, 'P_PRICE(NOW)', 'clickOutside');

    it('Type "Sample3" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Sample3" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Sample3').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Sample3" is typed into the "Name" field
      expect(CreateEditCustomColumns.getNameField().getAttribute('value')).toEqual('Sample3');
    });

    it('Select "Client/Demo2" from sub-directory', function() {
      CreateEditCustomGroupings.getSubDirButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Client/Demo2" from the drop down
      Utilities.getOptionFromDropDown('Client/Demo2').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Client/Demo2" is selected
      CreateEditCustomGroupings.getSubDirButton().getText().then(function(value) {
        if (value !== 'Client/Demo2') {
          expect(false).customError('"Client/Demo2" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      CreateEditCustomColumns.isDialogPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displaying');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "New" button and select New/Reference', function() {
      TileOptionsColumns.getAddNewButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Selecting "New/Reference" option from the drop down.
      Utilities.getOptionFromDropDown('New/Reference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that dialog view is changed to "New/Reference" mode', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" mode is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "New" radio button', function() {
      CreateEditCustomColumns.getRadioButton('New').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "New" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('New').getAttribute('class')).not.toBeNull();
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter formula into the section, click on the X Close button and verify the formula
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_PRICE', true, 'FG_PRICE', 'X Close', 'FG_PRICE(#ED,#CU)');

    it('Type "Sample4" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Sample4" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Sample4').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Sample4" is typed into the "Name" field
      expect(CreateEditCustomColumns.getNameField().getAttribute('value')).toEqual('Sample4');
    });

    it('Select "Client/Demo2" from sub-directory', function() {
      CreateEditCustomGroupings.getSubDirButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Client/Demo2" from the drop down
      Utilities.getOptionFromDropDown('Client/Demo2').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Client/Demo2" is selected
      CreateEditCustomGroupings.getSubDirButton().getText().then(function(value) {
        if (value !== 'Client/Demo2') {
          expect(false).customError('"Client/Demo2" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      CreateEditCustomColumns.isDialogPresent().then(function(present) {
        if (present) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var group;
    var arrElements = [];
    it('Expand "Client > Demo2" from "Available" container', function() {
      group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Demo2').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(childArray) {
                  childArray.forEach(function(columnName) {
                    arrElements.push(columnName.text);
                  });
                });
              } else {
                expect(false).customError('"Demo2" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Sample4" is displayed in the "Client > Demo2" sub-directory', function() {
      if (arrElements[arrElements.length - 1] !== 'Sample4') {
        expect(false).customError('"Sample4" is not displayed in the "Client > Demo2" directory');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 570638', function() {

    it('Hover over "Sample1" from "Client" directory and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'Sample1', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "edit" icon
            return item.then(function(edit) {
              edit.select();
              return edit.getActions().then(function(val) {
                return val.triggerAction('edit');
              });
            });
          }, function(error) {

            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Client/Demo1" from sub-directory', function() {
      CreateEditCustomGroupings.getSubDirButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Client/Demo1" from the drop down
      Utilities.getOptionFromDropDown('Client/Demo1').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Client/Demo1" is selected
      CreateEditCustomGroupings.getSubDirButton().getText().then(function(value) {
        if (value !== 'Client/Demo1') {
          expect(false).customError('"Client/Demo1" is not selected from sub-directory dropdown');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    var arrElements = [];
    it('Expand "Client > Demo1" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Demo1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(childArray) {
                  childArray.forEach(function(columnName) {
                    arrElements.push(columnName.text);
                  });
                });
              } else {
                expect(false).customError('"Demo1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var listElements = ['Sample1', 'Sample2'];
    listElements.forEach(function(listItem) {
      it('Verifying if "Sample1" is displayed in the "Client > Demo1" sub-directory', function() {
        if (arrElements.indexOf(listItem) === -1) {
          expect(false).customError('"' + listItem + '" is not displayed in the "Client > Demo1" sub-directory.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Tese Step ID: 570639', function() {

    it('Expand "Client > Demo2", hover over "Sample3" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Demo2').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, undefined, 'Sample3', 'last', subGroup).then(function(indexOfElement) {
                  var item = subGroup.getItemByIndex(indexOfElement);

                  // Click on the "edit" icon
                  return item.then(function(edit) {
                    edit.select();
                    return edit.getActions().then(function(val) {
                      return val.triggerAction('edit');
                    });
                  });
                }, function(error) {

                  expect(false).toBe(error);
                });
              } else {
                expect(false).customError('"Demo2" group was not expanded.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Client/Demo1" from sub-directory', function() {
      CreateEditCustomGroupings.getSubDirButton().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Client/Demo1" from the drop down
      Utilities.getOptionFromDropDown('Client/Demo1').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Client/Demo1" is selected
      CreateEditCustomGroupings.getSubDirButton().getText().then(function(value) {
        if (value !== 'Client/Demo1') {
          expect(false).customError('"Client/Demo1" is not selected from sub-directory dropdown');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomGroupings.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    var arrElements = [];
    it('Expand "Client > Demo1" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Demo1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(childArray) {
                  childArray.forEach(function(columnName) {
                    arrElements.push(columnName.text);
                  });
                });
              } else {
                expect(false).customError('"Demo1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var listElements = ['Sample1', 'Sample2', 'Sample3'];
    listElements.forEach(function(listItem) {
      it('Verifying if "' + listItem + '" is displayed in the "Client > Demo1" sub-directory', function() {
        if (arrElements.indexOf(listItem) === -1) {
          expect(false).customError('"' + listItem + '" is not displayed in the "Client > Demo1" sub-directory.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 570640', function() {

    it('Should click on "Add a Category" button', function() {
      TileOptionsColumns.getFolderIconFromAvailableSection().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Add New Category" dialog opened', function() {
      ThiefHelpers.isDialogOpen('Add New Category', undefined, undefined).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Add New Category" dialog does not opens.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Subdir" in the category name field.', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:').setText('Subdir');

      // Verifying that "Subdir" is typed into the input box
      ThiefHelpers.getTextBoxClassReference('Category Name:').getText().then(function(text) {
        if (text !== 'Subdir') {
          expect(false).customError('"Subdir" is not typed into the "Category Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Client" is selected under Directory', function() {
      AddNewCategory.getRadioButtonFromDirectorySection('client').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Client" is not selected under "Directory" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client/Demo1" from "Sub-directory" drop down', function() {
      // Click on "Sub-directory" drop down
      AddNewCategory.getSubDirectoryDropDown().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Select "Client/Demo1" from the drop down
      Utilities.getOptionFromDropDown('Client/Demo1').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Client/Demo1" is selected
      expect(AddNewCategory.getSubDirectoryDropDown().getText()).toEqual('Client/Demo1');
    });

    it('Should click on "OK" button', function() {
      AddNewCategory.getFooterButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrElements = [];
    it('Expand "Client > Demo1" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Demo1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getChildrenText().then(function(childArray) {
                  childArray.forEach(function(columnName) {
                    arrElements.push(columnName.text);
                  });
                });
              } else {
                expect(false).customError('"Demo1" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Subdir" is displayed in the "Client > Demo1" sub-directory', function() {
      if (arrElements.indexOf('Subdir') === -1) {
        expect(false).customError('"Subdir" is not displayed under "Client > Demo1" directory. ' + 'Found:"' + arrElements[arrElements.length - 1] + '"');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 721517', function() {

    it('Should click on "+" icon in the "Available" section', function() {
      ThiefHelpers.getButtonClassReference(undefined, TileOptionsColumns.xpathAddNewButton).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "New/Reference" from the drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('New/Reference').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying "Columns" dialog is displayed', function() {
      ThiefHelpers.isDialogOpen('Columns').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Columns" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "New" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('New').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"New" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Enter formula into the section and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', true, 'P_PRICE(NOW)', 'clickOutside');

    it('Verifying if the "Client" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Client').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Client" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Client/Demo1/Subdir" from the "Sub-directory:" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Client/Demo1/Subdir', 'Sub-directory:');
    });

    it('Verifying if "Client/Demo1/Subdir" is set to "Sub-directory:" drop down', function() {
      ThiefHelpers.verifySelectedDropDownText('Client/Demo1/Subdir', 'Sub-directory:');
    });

    it('Should enter "Test" in Name field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Test');

      // Verifying that "Name" field is set to "Test"
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Test') {
          expect(false).customError('"Name" field did not set to "Test"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save" button in "Columns" dialog', function() {
      var xpath = CommonFunctions.replaceStringInXpath(CreateEditCustomGroupings.xpathButtonFromDialog, 'Save');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press();
    });

    var arrElements = [];
    it('Should expand "Client > Demo1 > Subdir" in the "Available" section', function() {
      // Getting the xpath of the Available section
      var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Demo1').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getGroupByText('Subdir').then(function(subGroup1) {
                  subGroup1.expand();
                  subGroup1.isExpanded().then(function(expanded) {
                    if (expanded) {
                      subGroup1.getChildrenText().then(function(childArray) {
                        childArray.forEach(function(element) {
                          arrElements.push(element.text);
                        });
                      });
                    } else {
                      expect(false).customError('"Subdir" group was not expanded.');
                      CommonFunctions.takeScreenShot();
                    }
                  });
                });
              } else {
                expect(false).customError('"Demo1" group was not expanded.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Test" is displayed in the "Client > Demo1 > Subdir" sub-directory', function() {
      if (arrElements.indexOf('Test') === -1) {
        expect(false).customError('"Test" is not displayed under "Client > Demo1 > Subdir" directory. ' + 'Found:"' + arrElements[arrElements.length - 1] + '"');
        CommonFunctions.takeScreenShot();
      }
    });
  });

  describe('Test Step ID: 570642', function() {

    it('Expand "Client" from "Available" container,hover over "Demo2" and click on the "Rename" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Client', 'Demo2', 'last').then(function(indexOfElement) {
            var item = group.getGroupByIndex(indexOfElement);

            // Click on the "rename" icon
            return item.then(function(rename) {
              rename.select();
              return rename.getActions().then(function(val) {
                return val.triggerAction('rename');
              });
            });
          }, function(error) {

            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "EditTest" and hit enter', function() {
      TileOptionsColumns.getColumnRenameFieldFromAvailableSection().sendKeys('EditTest', protractor.Key.ENTER);
    });

    it('Waiting for rename action to be completed', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    var elements = [];
    it('Expand "Client" from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Client');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getChildrenText().then(function(childArray) {
            childArray.forEach(function(columnName) {
              elements.push(columnName.text);
            });
          });
        } else {
          expect(false).customError('"Client" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var column = ['EditTest', 'Demo1'];

    column.forEach(function(column) {

      it('Verifying if "' + column + '" is present under "Client"', function() {
        if (elements.indexOf(column) === -1) {
          expect(false).customError('"' + column + '" column is not present under "Client" directory');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 768804', function() {

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

    it('Verifying if "Client" is selected under "Directory" section', function() {
      AddNewCategory.getRadioButtonFromDirectorySection('client').isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Client" is not selected under "Directory" section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Enter "Demo1" in the "Category Name" field.', function() {
      ThiefHelpers.getTextBoxClassReference('Category Name:').setText('Demo1');

      // Verifying that "Demo1" is typed into the input box
      ThiefHelpers.getTextBoxClassReference('Category Name:').getText().then(function(text) {
        if (text !== 'Demo1') {
          expect(false).customError('"Demo1" is not typed into the "Category Name" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button', function() {
      AddNewCategory.getFooterButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Error', 'Category already exists');

  });

  describe('Test Step ID: 570644', function() {

    it('Should click on "Cancel" button of "Tile Options" mode header', function() {
      ThiefHelpers.getButtonClassReference('Cancel').press();
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

});
