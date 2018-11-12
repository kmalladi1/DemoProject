'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: sec-name-def', function() {

  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');
  var indexOfTest1InPersonalBefore;

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 690916', function() {

    it('Should open PA3 Application with "Client:/Pa3/sec_name_def"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('sec-name-def');
    });

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Top Positions', true, 'isSelected');

    it('Verifying if "Top Positions" report is displayed with two tiles', function() {
      PA3MainPage.getAllTilesFromReport().count().then(function(count) {
        if (count !== 2) {
          expect(false).customError('"Top Positions" report is not displayed two tiles');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var reports = ['Top 5 Positions', 'Top/Bottom Relative Positions'];

    reports.forEach(function(report) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(report);

    });

    it('Verifying if "Large Cap Core Test vs Russell 1000" header is displayed', function() {
      PA3MainPage.getHeader().getText().then(function(headerName) {
        if (headerName !== 'Large Cap Core Test vs Russell 1000') {
          expect(false).customError('"Large Cap Core Test vs Russell 1000" header is not displayed' +
            'instead "' + headerName + '" is displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 690917', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Top 5 Positions', 'Columns');

    it('Should select "Security Name" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Security Name');
      item.select();

      // Verifying if "Security Name" is selected in the selected section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Security Name" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "New..." from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('New...', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verifying that "Create/Edit Custom Column" dialog appeared', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathNewReference).then(function(appeared) {
        if (!appeared) {
          expect(false).customError('"Create/Edit Custom Column" dialog has not appeared.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Reference" radio button is disabled', function() {
      ThiefHelpers.getRadioClassReference('Reference').isDisabled().then(function(bool) {
        if (!bool) {
          expect(false).customError('The "Reference" radio button is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 690918', function() {

    CommonPageObjectsForPA3.sendTextIntoFormulaOrSortformulaSection('Formula', 'FG_COMPANY_NAME', true, 'FG_COMPANY_NAME', 'X Close', 'FG_COMPANY_NAME');

    it('Select "Personal" under "Directory"', function() {
      ThiefHelpers.getRadioClassReference('Personal').select();

      // Verfying if "Personal" is selected under "Directory"
      ThiefHelpers.getRadioClassReference('Personal').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Personal" radio button is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "NAME_TEST" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('NAME_TEST');

      // Verifying that "NAME_TEST" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'NAME_TEST') {
          expect(false).customError('"NAME_TEST" is not entered into the "Name" field; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click on "Save" button to save the settings', function() {
      ThiefHelpers.getButtonClassReference(undefined, CreateEditCustomColumns.getButton('Save')).press().then(function() {
      }, function(err) {
        CommonFunctions.takeScreenShot();
        expect(false).customError('Error found while clicking on "Save" button' + err);
      });
    });

    it('Waiting for changes to be saved', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(CreateEditCustomColumns.xpathLoadingBox)), 180000)).toBeTruthy();
    });

    it('Verifying that "Columns" dialog is no more displayed', function() {
      ThiefHelpers.isDialogOpen(undefined, undefined, CreateEditCustomColumns.xpathDialog).then(function(appeared) {
        if (appeared) {
          expect(false).customError('"Columns" dialog box is still displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Getting the number of columns before deleting in "Personal"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var arrOfChildren = group.getChildrenText();
          arrOfChildren.then(function(arr) {
            indexOfTest1InPersonalBefore = arr.length;
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that the drop down is displays "NAME_TEST" is present in "Definition" Section', function() {
      ThiefHelpers.verifySelectedDropDownText('NAME_TEST', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Verifying if the "Formula" tab displays "FG_COMPANY NAME"', function() {
      TileOptionsColumns.getFormulaSectionTextArea().getAttribute('value').then(function(name) {
        if (name !== 'FG_COMPANY_NAME') {
          expect(false).customError('"Formula" text area does not contain "FG_COMPANY_NAME"; ' +
            'Expected: "FG_COMPANY_NAME"; Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 690920', function() {

    it('Disabling wait for Angular to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Top 5 Positions');

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Top/Bottom Relative Positions', 'Columns');

    it('Should select "Security Name" from the selected section', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText('Security Name');
      item.select();

      // Verifying if "Security Name" is selected in the selected section
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Security Name" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Definition" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Definition').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Definition" section is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "NAME_TEST" from "Definition" Section dropdown', function() {
      ThiefHelpers.selectOptionFromDropDown('NAME_TEST', undefined, TileOptionsColumns.xpathDefinitionDropDown);

      // Verifying if "NAME_TEST" is selected from the drop down
      ThiefHelpers.verifySelectedDropDownText('NAME_TEST', undefined, TileOptionsColumns.xpathDefinitionDropDown);
    });

    it('Disabling wait for Angular to handle loading icon', function() {
      browser.ignoreSynchronization = true;
    });

    // Click on "OK" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

    it('Enabling wait for angular', function() {
      browser.ignoreSynchronization = false;
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Top 5 Positions');

    var arrTree = ['5 Highest', '5 Lowest'];

    it('Verifying if the "5 Highest" and "5 Lowest" groupings in "Top/Bottom Relative Positions" report', function() {
      PA3MainPage.getAllExpandCollapseButtonsFromCalculatedReport('Top/Bottom Relative Positions').then(function(ele) {
        ele.forEach(function(eleRef, index) {

          // Getting style values of all expands button
          var row = eleRef.element(by.xpath('ancestor::div[contains(@class,"slick-row" ) ]'));
          row.getAttribute('style').then(function(styleVal) {
            var val = styleVal.replace(/[;\s]/g, '');
            PA3MainPage.getRowNameHavingSpecifiedAttribute('Top/Bottom Relative Positions', 'slick-pane slick-pane-bottom slick-pane-left', 'style', val).then(function(rowName) {
              if (rowName !== arrTree[index]) {
                expect(false).customError('"' + arrTree[index] + '" grouping is not displayed; Found: ' + rowName);
                CommonFunctions.takeScreenShot();
              }
            }, function(error) {
              if (error.name === 'StaleElementReferenceError') {
                PA3MainPage.getRowNameHavingSpecifiedAttribute('Top/Bottom Relative Positions',
                  'slick-pane slick-pane-bottom slick-pane-left', 'style', val).then(function(rowName) {
                    expect(rowName).toContain(arrTree[index]);
                  });
              }
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 690921', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Top 5 Positions', 'Columns');

    it('Expand "Personal" from "Available" container, hover over "NAME_TEST" and click on the "Remove" icon', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          return ThiefHelpers.getElementByItsOccurrenceNumberFromAGroup(xpathOfAvailableSection, 'Personal', 'NAME_TEST', 'last').then(function(indexOfElement) {
            var item = group.getItemByIndex(indexOfElement);

            // Click on the "remove" icon
            return item.then(function(remove) {
              remove.select();
              return remove.getActions().then(function(val) {
                return val.triggerAction('remove');
              });
            });
          }, function(error) {
            expect(false).toBe(error);
          });
        } else {
          expect(false).customError('"Personal" is expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Delete Column" dialog box saying "Are you sure you want to delete this column?" appears', function() {
      ThiefHelpers.verifyDialogTitle('Delete Column');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('Delete Column').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete this column?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete this column? ' + 'but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "OK" on the "Delete Column" dialog', function() {
      ThiefHelpers.getDialogButton('Delete Column', 'OK').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "NAME_TEST" is deleted under "Personal" (by count)', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('Personal');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          var arrOfChildren = group.getChildrenText();
          arrOfChildren.then(function(arr) {
            if (indexOfTest1InPersonalBefore !== arr.length + 1) {
              expect(false).customError('"NAME_TEST" was not deleted.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"Personal" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile options');

  });

});
