'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: grpg-ref-save', function() {

  var xpathOfFormulaTextArea = element(by.xpath(CreateEditCustomGroupings.xpathOfFormulaTextArea));

  describe('Test Step ID: 700873', function() {
    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:/Pa3/Grouping/ref-grpg-save" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ref-grpg-save');
    });

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should expand "Document" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Document');
    });

    var arrChildren = ['Ref group1', 'Ref lot'];

    it('Should verify if ' + arrChildren + ' is displayed under "Document" in the "Available" section', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Document').getChildrenText();
      var arrOfColumns = [];

      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(function() {
        arrChildren.forEach(function(elementName) {
          if (arrOfColumns.indexOf(elementName) < 0) {
            expect(false).customError('"' + elementName + '" is not present in "Available" section under "Document"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 700874', function() {

    // Click on the "+" icon next to available section and select the option from the drop-down
    CommonPageObjectsForPA3.clickOnAddButtonAndSelectOptionFromDropdown('New/Reference', 'Groupings');

    it('Should select the "Reference" radio button', function() {
      ThiefHelpers.getRadioClassReference('Reference').select();

      // Verifying if the "Reference" radio button is selected
      ThiefHelpers.getRadioClassReference('Reference').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Reference" radio button did not get selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should perform double click on "Col 1: Ending Price" from the "Formula" tab', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathOfFormulaTextArea).getItemByText('Col 1: Ending Price').doubleClick();
    });

    // Verify if Col 1 is present in the formula section
    CommonPageObjectsForPA3.sendTextOrVerifyTextInCodeMirror('Formula', undefined, 'COL1', true);

    it('Should type "Ref grpg2" into the "Name" field', function() {
      ThiefHelpers.getTextBoxClassReference('Name').setText('Ref grpg2');

      // Verifying that "Ref grpg2" is typed into the "Name" field
      ThiefHelpers.getTextBoxClassReference('Name').getText().then(function(text) {
        if (text !== 'Ref grpg2') {
          expect(false).customError('"Ref grpg2" is not present in the "Name" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on the "Save" button of "Groupings" dialog
    CommonPageObjectsForPA3.clickOnSaveOrCancelOrOKButtonAndVerify('Save', 'Groupings');

    it('Should verify if "Ref grpg2" is displayed under "Document" in the "Available" section', function() {

      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Document').getChildrenText();
      var arrOfColumns = [];

      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(function() {
        if (arrOfColumns.indexOf('Ref grpg2') < 0) {
          expect(false).customError('"Ref grpg2" is not present in "Available" section under "Document"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Document" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Document');
    });

    it('Should verify if "Ref grpg2" item is added to "selected" section', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathSelectedContainer).getChildrenText();
      children.then(function(name) {
        var arrOfColumns = [];
        children.then(function(childArr) {
          for (var i = 0; i < childArr.length; ++i) {
            arrOfColumns.push(childArr[i].text);
          }
        }).then(function() {
          if (arrOfColumns.indexOf('Ref grpg2') < 0) {
            expect(false).customError('"Ref grpg2" is not present in "Available" section under "Document"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 700895', function() {

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    it('Should click on folder icon from the application toolbar', function() {
      // Clicking on Folder Icon from application toolbar
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(error) {
        CommonFunctions.takeScreenShot();
        expect(false).customError(error);
      });
    });

    CommonPageObjectsForPA3.selectOptionFromFolderAndVerifyDialogBoxOpened('Save As…', 'Save Document As');

    // Select personal directory and enter the document name
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog('ref-grpg-test', undefined, true);

    it('Should click on "Discard Changes" button in the pop up if appears', function() {
      ThiefHelpers.isDialogOpen('PERSONAL:REF-GRPG-TEST').then(function(found) {
        if (found) {
          PA3MainPage.editOrDiscardReportChanges('Discard Changes');
        }
      });
    });

    it('Should verify if "Personal:ref-grpg-test" document is opened.', function() {
      browser.getTitle().then(function(title) {
        if (title.indexOf('Personal:ref-grpg-test') === -1) {
          expect(false).customError('"Personal:ref-grpg-test" is not opened, Found:' + title);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 700875', function() {

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('New');

    it('Should verify if "Document has changed" pop up is appeared on the screen and click on "Don\'t Save Changes" button', function() {
      PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
        if (found) {
          PA3MainPage.getButton('Don\'t Save Changes').click().then(function() {
          }, function(error) {

            CommonFunctions.takeScreenShot();
            expect(false).customError(error);
          });

          // Verifying that error pop-up is disappeared
          PA3MainPage.getDialog('Document has changed').isPresent().then(function(found) {
            if (found) {
              expect(false).customError('"Document has changed" dialog is not disappeared');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption('Open...');

    // Select the reuqired document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal('ref-grpg-test');

    // Click on "Economic Sector Hyperlink" and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Weights', 'Economic Sector');

    it('Should expand "Document" in "Available" section', function() {
      ThiefHelpers.expandGroup(TileOptionsGroupings.xpathOfAvailableContainer, 'Document');
    });

    var arrChildren = ['Ref group1', 'Ref lot', 'Ref grpg2'];

    it('Should verify if ' + arrChildren + ' is displayed under "Document" in the "Available" section', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfAvailableContainer).getGroupByText('Document').getChildrenText();
      var arrOfColumns = [];

      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(function() {
        arrChildren.forEach(function(elementName) {
          if (arrOfColumns.indexOf(elementName) < 0) {
            expect(false).customError('"' + elementName + '" is not present in "Available" section under "Document"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should verify if "Ref grpg2" item is added to "selected" section', function() {
      var children = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathSelectedContainer).getChildrenText();
      var arrOfColumns = [];
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          arrOfColumns.push(childArr[i].text);
        }
      }).then(function() {
        if (arrOfColumns.indexOf('Ref grpg2') < 0) {
          expect(false).customError('"Ref grpg2" is not present in "Available" section under "Document"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Weights');

  });

});
