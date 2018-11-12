'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: cols-ref-reorder', function() {

  var indexOfAllocate;
  var indexOfAllocationEffect;
  var indexOfTotalEffect;
  var indexOfPortTotalReturn;
  var indexOfAllocateTotal;
  var indexOfAllocationEffect2;
  var colIndex1;
  var colIndex2;
  var tempText;

  // Getting the xpath of Formula text field
  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomColumns.xpathOfFormulaTextArea));

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: 495959', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Columns/Adv_Col_Options"', function() {
      PA3MainPage.switchToDocument('adv-col-options');
    });

    it('Wait for "Attribution" report to finish calculation', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Attribution'), 180000).then(function(option) {
        if (!option) {
          expect(false).customError('Error while calculating the Attribution report.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Attribution" report is calculated', function() {
      // Verifying "Attribution" Report is calculated
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Attribution" report is selected in the LHP', function() {
      TileOptions.getLHPOption('Attribution').isPresent().then(function(selected) {
        if (selected) {
          expect(false).customError('"Attribution" report was not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 496692', function() {

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Columns') {
          expect(false).customError('The view has not changed to "Columns".');
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

    it('Verifying that "New/Reference" dialog appear', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" dialog is not displayed.');
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

    it('Select "Formula" tab from the "New/Reference" dialog', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      expect(CreateEditCustomColumns.getTab('Formula').getAttribute('class')).toContain('selected');
    });

    // Enter the formula into the section, select the option from typeahead and click outside
    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'P_PRICE', true, 'P_PRICE(NOW)', 'clickOutside');

    it('Select "Personal" under "Directory" section', function() {
      CreateEditCustomColumns.getRadioButton('Personal').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Type "Price column(!&*+}]&$" into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "Price column(!&*+}]&$" into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('Price column(!&*+}]&$').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Price column(!&*+}]&$" is typed into the "Name" field
      CreateEditCustomColumns.getNameField().getAttribute('value').then(function(name) {
        if (name !== 'Price column(!&*+}]&$') {
          expect(false).customError('Entered name is not valid. Expected: "Price column(!&*+}]&$", Found: "' + name + '".');
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Personal" from "Available" container and double click on Price column(!&*+}]&$ to add it to "Selected" section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      // Verifying if "Personal" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Price column(!&*+}]&$').then(function(element) {

            // Selecting the element before performing double click as double click function does not work by itself
            element.select();
            element.doubleClick();
          });
        } else {
          expect(false).customError('"Personal" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Price column(!&*+}]&$" is added to the "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Price column(!&*+}]&$') === -1) {
          expect(false).customError('"Price column(!&*+}]&$" is not added to the selected section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 502985', function() {

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

    it('Verifying that "New/Reference" dialog appear', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" dialog is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "Reference" radio button', function() {
      CreateEditCustomColumns.getRadioButton('Reference').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Reference" radio button is selected
      expect(CreateEditCustomColumns.getRadioButton('Reference').getAttribute('class')).not.toBeNull();
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

    it('Select "Col 6: Price column(!&*+}]&$" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 6: Price column(!&*+}]&$').select();

      // Verifying that "Col 6: Price column(!&*+}]&$" is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 6: Price column(!&*+}]&$').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Col 6: Price column(!&*+}]&$" was not selected from the' + ' "Formula" tab.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Add" button to add "Col 6: Price column(!&*+}]&$" to text area', function() {
      ThiefHelpers.getButtonClassReference('Add', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "COL6" is added to the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL6') {
          expect(false).customError('Expected: "COL6" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Pr Col)))((((@@$%" into the "Name" field', function() {
      // Type "Pr Col)))((((@@$%" into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').setText('Pr Col)))((((@@$%');

      // Verifying that "Pr Col)))((((@@$%" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(name) {
        if (name !== 'Pr Col)))((((@@$%') {
          expect(false).customError('Entered name is not valid. Expected: "Pr Col)))((((@@$%", Found: "' + name + '"');
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Pr Col)))((((@@$%" is added as the last item to the "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        myArray.forEach(function(columnName, index) {
          if (columnName === 'Pr Col)))((((@@$%') {
            if (myArray.length - 1 !== index) {
              expect(false).customError('"Pr Col)))((((@@$%" is not added as the last item');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 502990', function() {

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand all the elements from calculated report', function() {
      // Get the reference of first element from calculated report
      var firstElement = PA3MainPage.getAllElementsFromCalculatedReport('Attribution', 'grid-canvas grid-canvas-bottom grid-canvas-left').get(1);

      // Right click on the element and select "Expand All"
      PA3MainPage.rightClickAndSelectOption(firstElement, 'Expand All');
    });

    it('Verifying that cell values in "Price column(!&*+}]&$" column is matching with the cell values in ' +
      '"Pr Col)))((((@@$%" column', function() {
      var needScreenShot = 0;
      var arrPortValue;
      var arrRefVal;
      var arrPortVal;
      PA3MainPage.getAllCellsOfGivenColumn('Attribution', 'Price column(!&*+}]&$',
        'slick-pane slick-pane-bottom slick-pane-right').then(function(portCol) {
        Utilities.convertObjectArrayToStringArray(portCol, 30).then(function(array) {
          arrPortVal = array;
        });
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Attribution', 'Pr Col)))((((@@$%',
          'slick-pane slick-pane-bottom slick-pane-right').then(function(refCol) {
          Utilities.convertObjectArrayToStringArray(refCol, 30).then(function(array) {
            arrRefVal = array;
          });
        });
      }).then(function() {
        for (var i = 0; i < arrPortVal.length; i++) {
          if (arrPortVal[i] !== arrRefVal[i]) {
            expect(false).customError('The cell values in "Price column(!&*+}]&$" column is not matching with the cell ' +
              'values in "Pr Col)))((((@@$%" column');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 502994', function() {

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Columns') {
          expect(false).customError('The view has not changed to "Columns".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Document" from "Available" container and hover over "Pr Col)))((((@@$%" from "Document" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          var action = group.getItemByText('Pr Col)))((((@@$%');

          // Hover on "Pr Col)))((((@@$%" and click on the "Edit" icon
          return action.then(function(edit) {
            return edit.getActions().then(function(val) {
              return val.triggerAction('edit');
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "New/Reference" dialog appear', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"New/Reference" dialog has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Name" field displays "Pr Col)))((((@@$%"  ', function() {
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(name) {
        if (name !== 'Pr Col)))((((@@$%') {
          expect(false).customError(' "Name" field is not displayed as "Pr Col)))((((@@$%".' + ' Expected: "Pr Col)))((((@@$%", Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var formulaSectionarray = ['Col 1: Port. Total Return', 'Col 2: Price to Earnings', 'Col 3: Allocation Effect', 'Col 4: Selection + Interaction', 'Col 5: Total Effect', 'Col 6: Price column(!&*+}]&$', 'Col 7: Pr Col)))((((@@$%'];

    formulaSectionarray.forEach(function(colName, index) {
      it('Verifying that "' + (index + 1) + '" column displayed in "Formula" section is "' + colName + '"', function() {
        ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByIndex(index).getText(function(value) {
          if (value !== colName) {
            expect(false).customError('Columns under "Formula" sections are not displayed in order. ' + 'Expected: "' + colName + '" but Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Veifying that "COL6" is displayed in the RHS text field', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL6') {
          expect(false).customError('Expected: "COL6" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "No Reference Calculation at Group Level" option is selected', function() {
      ThiefHelpers.verifySelectedDropDownText('No Reference Calculation at Group Level', 'Reference Calculation:', undefined);
    });

  });

  describe('Test Step ID: 724294', function() {

    it('Click on "Cancel" button to close "Columns" dialog.', function() {
      CreateEditCustomColumns.getButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Price column(!&*+}]&$" in the selected section', function() {

      ThiefHelpers.getVirtualListBoxItem(xpathOfSelectedSection, 'Price column(!&*+}]&$').then(function(item) {
        item.select();

        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Price column(!&*+}]&$" is not selected in the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Up" arrow button to move "Price column(!&*+}]&$" above "Total Effect"', function() {

      ThiefHelpers.clickOnButton(undefined, TileOptionsColumns.getArrowButton('up'));

    });

    it('Verifying if "Price column(!&*+}]&$" is above "Total Effect"', function() {
      var arrElements = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrElements.push(childArr[i].text);
        }

        if (arrElements.indexOf('Price column(!&*+}]&$') > arrElements.indexOf('Total Effect')) {
          expect(false).customError('"Price column(!&*+}]&$" is not on top of "Total Effect". ' +
            'Price column(!&*+}]&$ found at ' + arrElements.indexOf('Price column(!&*+}]&$') + ' row.' +
            'Total Effect is found at ' + arrElements.indexOf('Total Effect'));
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('From "Available" hover over "Pr Col)))((((@@$%" from "Document" and click on the "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          var action = group.getItemByText('Pr Col)))((((@@$%');

          // Hover on "Pr Col)))((((@@$%" and click on the "Edit" icon
          return action.then(function(edit) {
            return edit.getActions().then(function(val) {
              return val.triggerAction('edit');
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that "New/Reference" dialog appear', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"New/Reference" dialog has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Col 5: Price column(!&*+}]&$" is displayed above "Col 6: Total Effect" in LHP tab', function() {
      var arrElements = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrElements.push(childArr[i].text);
        }

        if (arrElements.indexOf('Price column(!&*+}]&$') > arrElements.indexOf('Total Effect')) {
          expect(false).customError('"Price column(!&*+}]&$" is not on top of "Total Effect". ' +
            'Price column(!&*+}]&$ found at ' + arrElements.indexOf('Price column(!&*+}]&$') + ' row.');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that "COL5" is displayed in the RHS text field', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL5') {
          expect(false).customError('Expected: "COL5" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 495960', function() {

    it('Click on "Cancel" button to close "Columns" dialog.', function() {
      CreateEditCustomColumns.getButton('Cancel').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Price column(!&*+}]&$" in the selected section', function() {

      ThiefHelpers.getVirtualListBoxItem(xpathOfSelectedSection, 'Price column(!&*+}]&$').then(function(item) {
        item.select();

        item.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Price column(!&*+}]&$" is not selected in the selected section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    it('Should click on "Down" arrow button to move "Price column(!&*+}]&$" above "Total Effect"', function() {

      ThiefHelpers.clickOnButton(undefined, TileOptionsColumns.getArrowButton('down'));

    });

    it('Verifying if "Price column(!&*+}]&$" is below "Total Effect"', function() {
      var arrElements = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrElements.push(childArr[i].text);
        }

        if (arrElements.indexOf('Price column(!&*+}]&$') < arrElements.indexOf('Total Effect')) {
          expect(false).customError('"Price column(!&*+}]&$" is not below "Total Effect". ' +
            'Price column(!&*+}]&$ found at ' + arrElements.indexOf('Price column(!&*+}]&$') + ' row.' +
            'Total Effect is found at ' + arrElements.indexOf('Total Effect'));
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

    it('Verifying that "New/Reference" dialog appear', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(found) {
        if (!found) {
          expect(false).customError('"New/Reference" dialog is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference', undefined).select();

      // Verifying that "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference', undefined).isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Formula" tab from the "New/Reference" window', function() {
      CreateEditCustomColumns.getTab('Formula').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Formula" tab is selected
      Utilities.isElementSelected(CreateEditCustomColumns.getTab('Formula')).then(function(bool) {
        if (!bool) {
          expect(false).customError('"Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Col 3: Allocation Effect" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Allocation Effect').select();

      // Verifying that "Col3:Allocation Effect" is selected
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Allocation Effect').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Col3:Allocation Effect" from "Formula" tab is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Add" button to add "Col 3: Allocation Effect" to text area', function() {
      ThiefHelpers.getButtonClassReference('Add', undefined).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "COL3" is present in the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL3') {
          expect(false).customError('Expected: "COL3" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Reference Calculation at Group Level" from "Reference Calculation" drop down', function() {
      ThiefHelpers.selectOptionFromDropDown('Reference Calculation at Group Level', 'Reference Calculation:', undefined, undefined);

      // Verifying that "Reference Calculation at Group Level" option is selected
      ThiefHelpers.verifySelectedDropDownText('Reference Calculation at Group Level', 'Reference Calculation:', undefined);
    });

    it('Type "Allocate" into the "Name" field', function() {
      // Remove the existing text
      ThiefHelpers.getTextBoxClassReference('Name').setText('Allocate');

      // Verifying that "Allocate" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(name) {
        if (name !== 'Allocate') {
          expect(false).customError('Entered name is not valid. Expected: "Allocate", Found: "' + name + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to Save the settings', function() {
      CreateEditCustomColumns.getButton('Save').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Allocate" is added as last item to the "Selected" section', function() {
      TileOptionsColumns.getAllElements('Selected').last().getText().then(function(value) {
        if (value !== 'Allocate') {
          expect(false).customError('"Allocate" is not added as last item to the "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 495963', function() {

    it('Expand "Additional Options" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Additional Options" section from "Options" section has not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "In portfolio" is displayed above "Select an option" drop down.', function() {
      TileOptionsColumns.getCalculationOptionsDeleteIcon('In Portfolio').isPresent().then(function(present) {
        if (!present) {
          expect(false).customError('"In portfolio" is not displayed under "Additional Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform mouse hover on "In Portfolio" from "Additional Options" and Click "X" Icon', function() {
      var eleReference = TileOptionsColumns.getSelectedAdditionalOptions('In Portfolio');
      browser.actions().mouseMove(eleReference).perform();

      // Get the reference of delete icon
      TileOptionsColumns.getCalculationOptionsDeleteIcon('In Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Wait for the "In Portfolio" Additional Option to disappear
      browser.sleep(2000);
    });

    it('Verifying "In Portfolio" calculation option is removed from "Additional Options" ', function() {
      TileOptionsColumns.getSelectedAdditionalOptions('In Portfolio').isPresent().then(function(present) {
        if (present) {
          expect(false).customError('"In Portfolio" calculation option is not removed from "Additional Options"');
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

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Allocate" is present', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === 'Allocate') {
            colIndex1 = index;
          }
        });
      });
    });

    it('Verifying that cell values in "Allocate" column is matching with the cell values in ' +
      '"Allocation Effect - Annualized" column', function() {
      var needScreenShot = 0;
      var arrPortVal = [];
      var arrRefVal = [];
      PA3MainPage.getAllCellsOfGivenColumn('Attribution', 'Allocate',
        'slick-pane slick-pane-bottom slick-pane-right').then(function(portCol) {
        Utilities.convertObjectArrayToStringArray(portCol, 30).then(function(array) {
          arrPortVal = array;
        });
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Attribution', 'Allocation Effect - Annualized',
          'slick-pane slick-pane-bottom slick-pane-right').then(function(refCol) {
          Utilities.convertObjectArrayToStringArray(refCol, 30).then(function(array) {
            arrRefVal = array;
          });
        });
      }).then(function() {
        for (var i = 0; i < arrPortVal.length; i++) {
          if (arrPortVal[i] !== arrRefVal[i]) {
            expect(false).customError('The cell values in "Price column(!&*+}]&$" column is not matching with the ' +
              'cell values in "Pr Col)))((((@@$%" column');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 495964', function() {

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Columns') {
          expect(false).customError('The view has not changed to "Columns".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Allocation Effect" from the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Allocation Effect').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Getting the index value of the "Allocate" from selected section
      TileOptionsColumns.getIndexFromSelected('Allocate').then(function(index) {
        indexOfAllocate = index;
      });

      // Getting the index value of the "Allocate Effect" from selected section
      TileOptionsColumns.getIndexFromSelected('Allocation Effect').then(function(index) {
        indexOfAllocationEffect = index;
      });
    });

    it('Should move "Allocation Effect" below "Allocate" in the "Selected" section', function() {

      var diff = indexOfAllocate - indexOfAllocationEffect;

      for (var i = 0; i < diff; i++) {
        if (indexOfAllocate !== indexOfAllocationEffect - 1) {
          TileOptionsColumns.getArrowButton('down').click();
          indexOfAllocationEffect = indexOfAllocationEffect + 1;
        }
      }
    });

    it('Should select "Total Effect" from the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Total Effect').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Getting the index value of the "Total Effect" from selected section
      TileOptionsColumns.getIndexFromSelected('Total Effect').then(function(index) {
        indexOfTotalEffect = index;
      });

      // Getting the index value of the "Port. Total Return" from selected section
      TileOptionsColumns.getIndexFromSelected('Port. Total Return').then(function(index) {
        indexOfPortTotalReturn = index;
      });
    });

    it('Should move "Total Effect" below "Port. Total Return" in the "Selected" section', function() {

      var diff = indexOfTotalEffect - indexOfPortTotalReturn;

      for (var i = 0; i < diff; i++) {
        if (indexOfPortTotalReturn !== indexOfTotalEffect - 1) {
          TileOptionsColumns.getArrowButton('up').click();
          indexOfTotalEffect = indexOfTotalEffect - 1;
        }
      }
    });

    it('Expand "Document" from "Available" container hover over "Allocate" and click on "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          var action = group.getItemByText('Allocate');

          // Hover on "Allocate" and click on the "Edit" icon
          return action.then(function(edit) {
            return edit.getActions().then(function(val) {
              return val.triggerAction('edit');
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var formulaSectionarray = ['Col 1: Port. Total Return', 'Col 2: Total Effect', 'Col 3: Price to Earnings', 'Col 4: Selection + Interaction', 'Col 5: Price column(!&*+}]&$', 'Col 6: Pr Col)))((((@@$%', 'Col 7: Allocate', 'Col 8: Allocation Effect'];

    formulaSectionarray.forEach(function(colName, index) {
      it('Verifying that "' + (index + 1) + '" column displayed in "Formula" section is "' + colName + '"', function() {
        ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByIndex(index).getText(function(value) {
          if (value !== colName) {
            expect(false).customError('Columns under "Formula" sections are not displayed in order. ' + 'Expected: "' + colName + '" but Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 495965', function() {

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Double click on "Col 3: Price to Earnings" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 3: Price to Earnings').doubleClick();
    });

    it('Should add ":T" to "COL3" in the text area', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(':T').perform();
    });

    it('Verifying that "COL3:T" is present in the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL3:T') {
          expect(false).customError('Expected: "COL3:T" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Allocate Total" into the "Name" field', function() {
      // Type "Allocate Total" into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').setText('Allocate Total');

      // Verifying that "Allocate Total" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(name) {
        if (name !== 'Allocate Total') {
          expect(false).customError('Entered name is not valid. Expected: "Allocate Total", Found: "' + name + '".');
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
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

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Allocate" is changed to "Allocate Total"', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === 'Allocate Total') {
            colIndex2 = index;
            if (colIndex1 !== colIndex2 + 1) {
              expect(false).customError('"Allocate" is not changed to "Allocate Total"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying that cell values in "Allocate Total" column is matching with the Total value in ' +
      '"Price to Earnings - No In Portfolio" column', function() {
      var needScreenShot = 0;
      var PriceVal;
      var alltoVal = [];
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'Total', 'Price to Earnings - No In Portfolio',
        'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right').then(function(value) {
        PriceVal = value;
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Attribution', 'Allocate Total',
          'slick-pane slick-pane-bottom slick-pane-right').then(function(refCol) {
          Utilities.convertObjectArrayToStringArray(refCol, 30).then(function(array) {
            alltoVal = array;
          });
        });
      }).then(function() {
        for (var i = 0; i < alltoVal.length; i++) {
          if (PriceVal !== alltoVal[i]) {
            expect(false).customError('cell values in "Allocate Total" column is not matching with the Total value in ' +
              '"Price to Earnings - No In Portfolio" column');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });

  });

  describe('Test Step ID: 495967', function() {

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Columns') {
          expect(false).customError('The view has not changed to "Columns".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Allocate Total" from the "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Allocate Total').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Getting the index value of the "Allocate Total" from selected section
      TileOptionsColumns.getIndexFromSelected('Allocate Total').then(function(index) {
        indexOfAllocateTotal = index;
      });

      // Getting the index value of the "Allocate Effect" from selected section
      TileOptionsColumns.getIndexFromSelected('Allocation Effect').then(function(index) {
        indexOfAllocationEffect2 = index;
      });
    });

    it('Should move "Allocate Total" below "Allocation Effect" in the "Selected" section', function() {

      var diff = indexOfAllocationEffect2 - indexOfAllocateTotal;

      for (var i = 0; i < diff; i++) {
        if (indexOfAllocationEffect2 !== indexOfAllocateTotal - 1) {
          TileOptionsColumns.getArrowButton('down').click();
          indexOfPortTotalReturn = indexOfPortTotalReturn + 1;
        }
      }
    });

    it('Expand "Document" from "Available" container hover over "Allocate Total" and click on "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          var action = group.getItemByText('Allocate Total');

          // Hover on "Allocate Total" and click on the "Edit" icon
          return action.then(function(edit) {
            return edit.getActions().then(function(val) {
              return val.triggerAction('edit');
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "COL3:T" is present in the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL3:T') {
          expect(false).customError('Expected: "COL3:T" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 495966', function() {

    it('Should clear the text in the Formula section', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(protractor.Key.chord(protractor.Key.CONTROL, 'a',
        protractor.Key.DELETE)).perform();
    });

    it('Double click on "Col 2: Total Effect" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 2: Total Effect').doubleClick();
    });

    it('Verifying that "COL2" is present in the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL2') {
          expect(false).customError('Expected: "COL2" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should add ":G1" to "COL2" in the text area', function() {
      browser.actions().mouseMove(CreateEditCustomColumns.getTabTextArea('Formula', 'New')).click().sendKeys(':G1').perform();
    });

    it('Verifying that "COL2:G1" is present in the text area', function() {
      CreateEditCustomColumns.getTabTextArea().getText().then(function(name) {
        var text = name.trim();
        if (text !== 'COL2:G1') {
          expect(false).customError('Expected: "COL2:G1" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "Allocate G1" into the "Name" field', function() {
      // Type "Allocate G1" into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').setText('Allocate G1');

      // Verifying that "Allocate G1" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(name) {
        if (name !== 'Allocate G1') {
          expect(false).customError('Entered name is not valid. Expected: "Allocate G1", Found: "' + name + '".');
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
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

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Allocate Total" is changed to "Allocate G1"', function() {
      var column;
      PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(ref, index) {
        ref.getText().then(function(name) {
          if (name === 'Allocate G1') {
            column = index;
            if (column !== colIndex2 + 1) {
              expect(false).customError('"Allocate" is not changed to "Allocate Total"');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying that Grouping Total values under "Total Effect - No Total Column" column is displayed as all the securities under' +
      ' "Allocate G1" column', function() {
      var needScreenShot = 0;
      var PriceVal;
      var alltoVal = [];
      PA3MainPage.getValueFromCalculatedReport('Attribution', 'Commercial Services', 'Total Effect - No Total Column').then(function(value) {
        PriceVal = value;
      }).then(function() {
        PA3MainPage.getAllCellsOfGivenColumn('Attribution', 'Allocate G1',
          'slick-pane slick-pane-bottom slick-pane-right').then(function(refCol) {
          Utilities.convertObjectArrayToStringArray(refCol, 30).then(function(array) {
            alltoVal = array;
          });
        });
      }).then(function() {
        for (var i = 0; i < alltoVal.length; i++) {
          if (PriceVal !== alltoVal[i]) {
            expect(false).customError('Grouping Total Values under "Total Effect- No Total Column" are not ' +
              'displayed as values for all the securities under Allocation G1 column.');
            ++needScreenShot;
            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        }
      });
    });
  });

  describe('Test Step ID: 495968', function() {

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Columns') {
          expect(false).customError('The view has not changed to "Columns".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Expand "Document" from "Available" container hover over "Allocate G1" and click on "Edit" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {

        if (expanded) {
          var action = group.getItemByText('Allocate G1');

          // Hover on "Allocate G1" and click on the "Edit" icon
          return action.then(function(edit) {
            return edit.getActions().then(function(val) {
              return val.triggerAction('edit');
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Type "col//;;name;;/////1;;;;." into the "Name" field', function() {
      // Remove the existing text
      CreateEditCustomColumns.getNameField().clear().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Type "col//;;name;;/////1;;;;." into the "Name" field
      CreateEditCustomColumns.getNameField().sendKeys('col//;;name;;/////1;;;;.').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "col//;;name;;/////1;;;;." is typed into the "Name" field
      CreateEditCustomColumns.getNameField().getAttribute('value').then(function(name) {
        if (name !== 'col//;;name;;/////1;;;;.') {
          expect(false).customError('Entered name is not valid. Expected: "col//;;name;;/////1;;;;", Found: "' + name + '".');
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
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Create/Edit Custom Grouping" mode is no more displayed', function() {
      element(by.xpath(CreateEditCustomColumns.xpathNewReference)).isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Create/Edit Custom Grouping" mode is still displayed');
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

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCols = ['Port. Total Return - Cumulative', 'Total Effect - No Total Column', 'Price to Earnings - No In Portfolio', 'Selection + Interaction - Group Relative', 'Price column(!&*+}]&$', 'Pr Col)))((((@@$%', 'Allocation Effect - Annualized', 'col//;;name;;/////1;;;;.'];
    var arrAllCols = [];

    it('Collecting the Columns from the calculated report', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Attribution').each(function(ele) {
        ele.getText().then(function(text) {
          arrAllCols.push(text.replace(/\n/g, ' '));
        });
      });
    });

    arrCols.forEach(function(col, index) {
      it('Verifying if "' + col + '" column is present in the calculated report ', function() {
        if (arrAllCols.indexOf(col) < 0) {
          expect(false).customError('"' + arrCols[index] + '" is not present');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 496507', function() {

    it('Should click on wrench Icon from "Attribution" report workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Wrench menu list appeared
      PA3MainPage.getWrenchIconFromReportWorkspace('Attribution', true).isPresent().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Wrench menu has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from drop down menu', function() {
      Utilities.getOptionFromDropDown('Options').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Attribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(mode) {
        if (mode !== 'Tile Options - Attribution') {
          expect(false).customError('"Tile Options - Attribution" has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from LHP', function() {
      TileOptions.getLHPOption('Columns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that view changed to "Columns"
      TileOptions.getOptionTitle().getText().then(function(view) {
        if (view !== 'Columns') {
          expect(false).customError('The view has not changed to "Columns".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Hover over "Allocation Effect" from "Selected" section and click on the "Remove" icon', function() {
      var action = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Allocation Effect');

      // Hover on "Allocation Effect" and click on remove button
      return action.getActions().then(function(remove) {
        return remove.triggerAction('remove');
      });
    });

    it('Verifying that "Allocation Effect" column is deleted from "Selected" section', function() {
      TileOptionsColumns.getElementFromSelectedSection('Allocation Effect').isPresent().then(function(option) {
        if (option) {
          expect(option).customError('"Allocation Effect" column was not deleted from "Selected" section.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'Index out of bound') {
          expect(true).toBeTruthy();
        }
      });
    });

    it('Should click on the "Clear All(X)" icon in the selected section to remove all the Columns', function() {
      TileOptionsColumns.getRemoveIconForColumnsSelectedSection().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrcols = ['Ticker', 'Security Name'];
    it('Verifying that there are only two element "Ticker" and "Security Name" are present in the "Selected" section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.length === 2) {
          for (var j = 0; j < arrcols.length; j++) {
            if (myArray[j] !== arrcols[j]) {
              expect(false).customError('"' + arrcols[j] + '" is not found in the "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          }
        } else {
          expect(false).customError('More the two columns are present in the selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 498298', function() {

    it('Expand "Document" from "Available" container hover over "col//;;name;;/////1;;;;." and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {
        if (expanded) {

          if (expanded) {
            var action = group.getItemByText('col//;;name;;/////1;;;;.');

            // Hover on "col//;;name;;/////1;;;;." and click on the "remove" icon
            return action.then(function(remove) {
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          } else {
            expect(false).customError('"Document" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        }
      });
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    it('Verifying that "Document" is expanded and hover on "Pr Col)))((((@@$%" to click on "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Document');
      group.expand();

      // Verifying if "Document" is expanded
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var action = group.getItemByText('Pr Col)))((((@@$%');

          // Hover on "Pr Col)))((((@@$%" and click on the "remove" icon
          return action.then(function(remove) {
            return remove.getActions().then(function(val) {
              return val.triggerAction('remove');
            });
          });
        } else {
          expect(false).customError('"Document" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    it('Expand "Personal" from "Available" container and hover on "Price column(!&*+}]&$" to click on "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'Price column(!&*+}]&$', 'last').then(function(indexOfElement) {
            var action = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return action.then(function(remove) {
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Test Column Category" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Verify if dialog appears with expected text and title and click on OK button
    CommonPageObjectsForPA3.verifyAndClickOnOkButtonOfConfirmationDialog('Delete Column', 'Are you sure you want to delete this column?');

    it('Should click on "OK" button of "Tile Options" mode header', function() {
      TileOptions.getHeaderButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify "Tile Options" mode is closed', function() {
      TileOptions.isTileOptionsMode().then(function(option) {
        if (option) {
          expect(false).customError('"Tile Options" mode is not closed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for "Attribution" report to calculate', function() {
      // Wait for calculation to start
      browser.sleep(3000);

      // Wait for report calculation to finish
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Attribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(option) {
        if (!option) {
          expect(false).customError('Calculated data for "Attribution" report appeared with errors');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Attribution')).toBeTruthy();
        }
      });

      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(option) {
        if (option) {
          expect(false).customError('"Calculation Error" dialog appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('"Security Name"" column is displayed and no extra blank column appears in the report. ', function() {
      PA3MainPage.getAllColumnOfCalculatedReport('Attribution').count().then(function(count) {
        if (count > 1) {
          expect(false).customError('There is more then one column present in "Attribution" report.');
          CommonFunctions.takeScreenShot();
        } else {
          PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Attribution', 1, 'Commercial Services', 'grid-canvas grid-canvas-top grid-canvas-left').isPresent().then(function(boolean) {
            expect(boolean).customError('"Commercial Services" does not displayed in "Attribution" report');
            if (!boolean) {
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });
  });
});
