'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: fi-crdt-rtg-dcml', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 656669', function() {

    // Open default document and check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/Pa3/Fixed_income/FI_CR_DEC_PT document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-cr-dec-pt');
    });

    it('Verifying if "Characteristics - Summary" report is calculated', function() {
      PA3MainPage.isReportCalculated('Characteristics - Summary').then(function(flag) {
        if (!flag) {
          expect(false).customError('"Characteristics - Summary report did not calculate');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if date hyperlink is "12-OCT-2016" in the report', function() {
      PA3MainPage.getDateHyperLink('Characteristics - Summary').getText().then(function(text) {
        if (text !== '12-OCT-2016') {
          expect(false).customError('Date hyperlink did not "12-OCT-2016" in the report');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var rowName = ['Barclays Capital Credit Rating', 'Moody\'s Credit Rating'];

    rowName.forEach(function(row) {

      it('Verifying if "' + row + '" row value is displayed only two decimal places for "Available" column in ' + '"PA3_FI_OVERRIDE_EX2" multiheader', function() {
        SlickGridFunctions.getCellReference('Characteristics - Summary', row, '', 'Available', 'PA3_FI_OVERRIDE_EX2').then(function(ref) {
          ref.getText().then(function(value) {
            var temp = value.split('.');
            if (temp[1].length !== 2) {
              expect(false).customError('"' + row + '" row value did not display only two decimal places for ' + '"Available" column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if "' + row + '" row value is displayed only two decimal places for "Available" column in ' + '"Barclays US Aggregate Government" multiheader', function() {
        SlickGridFunctions.getCellReference('Characteristics - Summary', row, '', 'Available', 'Barclays US Aggregate Government').then(function(ref) {
          ref.getText().then(function(value) {
            var temp = value.split('.');
            if (temp[1].length !== 2) {
              expect(false).customError('"' + row + '" row value did not display only two decimal places for ' + '"Available" column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 656670', function() {

    it('Should click on "Wrench" icon available in Workspace', function() {
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary').click();

      // Verifying if Wrench drop down is opened
      PA3MainPage.getWrenchIconFromReportWorkspace('Characteristics - Summary', true).isPresent().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Wrench drop down" did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Options" from wrench drop down', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options');
    });

    it('Verifying if "Tile Option" page is opened', function() {
      TileOptions.isTileOptionsMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Tile Option" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Columns" from the LHP', function() {
      TileOptions.getLHPOption('Columns').click();

      // Verifying if "Columns" is selected in LHP
      TileOptions.getLHPOption('Columns').getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Columns" did not select in LHP');
        }
      });
    });

    var arr = ['Bloomberg Barclays Capital Credit Rating', 'Moody\'s Credit Rating'];

    arr.forEach(function(columnName) {

      it('Should click on "' + columnName + '" to select in "Selected" section', function() {
        var objVirtualListbox = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName);

        objVirtualListbox.select(true, false);

        // Verify if element is selected
        ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getItemByText(columnName).isSelected().then(function(seleted) {
          if (!seleted) {
            expect(false).customError('"' + columnName + '" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should enter "4" in the "Decimal" search box', function() {
      //DOM is having data-qa-id as Decimals not Decimal
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals', '4');

      // Verifying that "4" is typed into the Decimal box
      TileOptionsColumns.setOrGetValueInSpinBox('Decimals').getAttribute('value').then(function(text) {
        if (text !== '4') {
          expect(false).customError('"4" did not type into the "Decimal" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the header', function() {
      TileOptions.getHeaderButton('OK').click();
    });

    it('Waiting for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    var rowName = ['Barclays Capital Credit Rating', 'Moody\'s Credit Rating'];

    rowName.forEach(function(row) {

      it('Verifying if "' + row + '" row value is displayed only four decimal places for "Available" column in ' + '"PA3_FI_OVERRIDE_EX2" multiheader', function() {
        SlickGridFunctions.getCellReference('Characteristics - Summary', row, '', 'Available', 'PA3_FI_OVERRIDE_EX2').then(function(ref) {
          ref.getText().then(function(value) {
            var temp = value.split('.');
            if (temp[1].length !== 4) {
              expect(false).customError('"' + row + '" row value did not display only four decimal places for ' + '"Available" column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });

      it('Verifying if "' + row + '" row value is displayed only four decimal places for "Available" column in ' + '"Bloomberg Barclays US Aggregate Government" multiheader', function() {
        SlickGridFunctions.getCellReference('Characteristics - Summary', row, '', 'Available', 'Bloomberg Barclays US Aggregate Government').then(function(ref) {
          ref.getText().then(function(value) {
            var temp = value.split('.');
            if (temp[1].length !== 4) {
              expect(false).customError('"' + row + '" row value did not display only four decimal places for ' + '"Available" column');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });
  });
});
