'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: return-method-transfers', function() {

  // Getting the xpath of the Selected section
  var xpathOfSelectedSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Selected');

  describe('Test Step ID: 559600', function() {

    // Should check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open "Client:/PA3/Columns/RETURN_TRANSFER" document', function() {
      PA3MainPage.switchToDocument('return-transfer');
    });

    it('Enter "Client:/pa3/test" in the "Portfolio" widget and select "TEST.ACCT | Client:/pa3/" from type ahead', function() {
      PA3MainPage.setPortfolio('Client:/pa3/test', 'TEST.ACCT | Client:/pa3/',
        'Client:/pa3/TEST.ACCT').then(function(selected) {
        if (!selected) {
          expect(false).customError('"TEST.ACCT | Client:/pa3/" is not selected from type ahead');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Waiting for reports to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg('Contribution'), 180000);

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Contribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
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

    it('Verifying the "Weights Report" calculates for "Client:/pa3/TEST.ACCT" in "Benchmark" widget', function() {
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(text) {
        if (text !== 'Client:/pa3/TEST.ACCT') {
          expect(false).customError('"Client:/pa3/TEST.ACCT" is not displayed "Portfolio" widget. Found "' + text + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Weights Report" calculates for "RUSSELL:1000" in "Benchmark" widget', function() {
      // Verifying value "RUSSELL:1000" in the "Benchmark" widget
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(option) {
        if (option !== 'RUSSELL:1000') {
          expect(false).customError('"RUSSELL:1000" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 559601', function() {

    it('Should click on the "Wrench" icon in the "Contribution" report workspace', function() {
      PA3MainPage.selectWrenchIcon('Contribution');
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Contribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Contribution') {
          expect(false).customError('"Tile Options - Contribution" view has not appeared. ' +
            'Expected: "Tile Options - Contribution" but Found: "' + value + '"');
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
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Purchase" From the Selected list', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('TBR Transactions Inputs');
      group.getItemByText('Purchase').then(function(value) {
        value.select(false, true);

        // Verifying if "Purchase" is selected
        value.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Purchase" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrOfAccordion = ['Format', 'Statistics', 'OUTLIERS', 'Additional Options'];

    arrOfAccordion.forEach(function(accordion) {
      it('Verifying if "' + accordion + '" is displayed in the RHS', function() {
        TileOptionsColumns.getExpandableSectionNames().each(function(element) {
          element.getAttribute('section-title').then(function(name) {
            if (name !== 'Conditional Formatting') {
              if (arrOfAccordion.indexOf(name) < -1) {
                console.log(name);
                expect(false).customError('"' + name + '" is not displayed in the RHS');
                CommonFunctions.takeScreenShot();
              }
            }

          });
        });
      });
    });

  });

  describe('Test Step ID: 559602', function() {

    it('Expand "Additional Options" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Additional Options" section from "Options" section has not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Cash Flows at Start of Day" from "Returns Methodology" drop down if not already selected', function() {
      ThiefHelpers.getDropDownSelectClassReference('Return Methodology').getSelectedText().then(function(selectedText) {
        if (selectedText !== 'Cash Flows at Start of day') {

          ThiefHelpers.selectOptionFromDropDown('Cash Flows at Start of day', 'Return Methodology');

          // verifying if 'Cash Flows at Start of day' is selected from "Additional Options" section dropdown
          ThiefHelpers.verifySelectedDropDownText('Cash Flows at Start of day', 'Return Methodology');
        }
      });
    });

    it('Should select "Transfers In at Start of Day, Transfers Out at End of Day" from "Transfers" drop down if not already selected',
      function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathAdditionalOptionsDropdown, 'Transfers');
        ThiefHelpers.getDropDownSelectClassReference(undefined, xpath).getSelectedText().then(function(selectedText) {
          if (selectedText !== 'Transfers In at Start of Day, Transfers Out at End of Day') {

            ThiefHelpers.selectOptionFromDropDown('Transfers In at Start of Day, Transfers Out at End of Day',
              undefined, xpath);

            // verifying if 'Transfers In at Start of Day, Transfers Out at End of Day' is selected from "Transfers" dropdown
            ThiefHelpers.verifySelectedDropDownText('Transfers In at Start of Day, Transfers Out at End of Day',
              undefined, xpath);
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

    it('Verifying if loading swirl is displayed', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();

      // Wait for the web element to load
      browser.sleep(3000);
    });

    it('Verifying if calculated data for "Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Contribution').then(function(displayed) {
        if (!displayed) {
          expect(!displayed).customError('"Contribution" report is not displayed on the webpage.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Contribution')).toBeTruthy();
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

  });

  describe('Test Step ID: 559603', function() {

    it('Should click on the "Wrench" icon in the "Contribution" report workspace', function() {
      PA3MainPage.selectWrenchIcon('Contribution');
    });

    it('Verifying if Wrench menu list appeared', function() {
      ThiefHelpers.isDropDownOpen().then(function(appeared) {
        if (!appeared) {
          expect(false).customError('Menu list did not appear after clicking on "Wrench" button from application toolbar.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Select "Options" from the wrench menu list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Options').then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if view changed to "Tile Options - Contribution" mode', function() {
      element(by.xpath(TileOptions.xpathTileOptionsTitle)).getText().then(function(value) {
        if (value !== 'Tile Options - Contribution') {
          expect(false).customError('"Tile Options - Contribution" view has not appeared. ' +
            'Expected: "Tile Options - Contribution" but Found: "' + value + '"');
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
      TileOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Columns') {
          expect(false).customError('"Columns" is not selected from LHP');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Purchase" From the Selected list', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfSelectedSection).getGroupByText('TBR Transactions Inputs');
      group.getItemByText('Purchase').then(function(value) {
        value.select(false, true);

        // Verifying if "Purchase" is selected
        value.isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Purchase" is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Expand "Additional Options" section from "Options" section', function() {
      TileOptionsColumns.expandSectionInOptionsPane('Additional Options').then(function(expanded) {
        if (!expanded) {
          expect(false).customError('"Additional Options" section from "Options" section has not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Cash Flows at Start of Day" from "Returns Methodology" drop down if not already selected', function() {
      ThiefHelpers.verifySelectedDropDownText('Cash Flows at Start of day', 'Return Methodology');
    });

    it('Should select "Transfers In at Start of Day, Transfers Out at End of Day" from "Transfers" drop down if not already selected',
      function() {
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathAdditionalOptionsDropdown, 'Transfers');

        ThiefHelpers.verifySelectedDropDownText('Transfers In at Start of Day, Transfers Out at End of Day', undefined, xpath);
      });
  });
});
