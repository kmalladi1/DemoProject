'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: aoe-general', function() {

  // Variable(s)
  var valPortWeight;
  var valPortEndingFactor;
  var valPortEndingEffectiveDuration;
  var valPortEndingModifiedDuration;
  var val88579YAERow = [];
  var arrColumns;
  var arrVariables;
  var noRowsBeforeAdding1;
  arrColumns = ['Port. Weight', 'Port. Ending Factor', 'Port. Ending Effective Duration', 'Port. Ending Modified Duration'];
  arrVariables = [valPortWeight, valPortEndingFactor, valPortEndingEffectiveDuration, valPortEndingModifiedDuration];

  // Startup instruction actions
  describe('Test Step ID: Startup Instructions', function() {

    it('Should launch PA3 application', function() {
      PA3MainPage.goToURL('');

      // Verifying that PA3 is launched with expected title
      browser.getTitle().then(function(title) {
        expect(title === PA3Json.defaultDocument)
          .customError('Title of browser did not match. ' +
            'Expected: "' + PA3Json.defaultDocument + '", Found: "' + title + '"');
        if (title !== PA3Json.defaultDocument) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Automatic Calculation" if it is turned off', function() {
      // Click on the Wrench button
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appeared
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        expect(value).customError('Menu list did not appear after performing click on "Wrench" button from app toolbar.');
        if (!value) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Select "Automatic Calculation" is not already selected
      PA3MainPage.setOptionFromWrenchMenu(true, 'Automatic Calculation');
    });

  });

  describe('Test Step ID: 600821', function() {

    it('Should launch the document "Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2"', function() {
      PA3MainPage.switchToDocument('Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2');

      // Verifying that tile of browser matches the expected
      browser.getTitle().then(function(title) {
        expect(title === 'Portfolio Analysis 3.0 - Weights [Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2]')
          .customError('There is some problem launching the document. Expected title is: "Portfolio Analysis 3.0 ' +
            '- Weights [Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2]" but title Found: "' + title + '"');
        if (title !== 'Portfolio Analysis 3.0 - Weights [Client:/PA3/Fixed_income/PA3_FI_OVERRIDE_EX2]') {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Date hyperlink shows: "15-JUN-2015 - 26-JUN-2015"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(value) {
        if (value !== '15-JUN-2015 - 26-JUN-2015') {
          expect(false).customError('Calculated report does not show time period as "15-JUN-2015 - 26-JUN-2015".');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 600830', function() {

    it('Should select "Document Options" from app toolbar "Wrench" menu', function() {
      // Click on the "Wrench" button
      PA3MainPage.getWrenchIcon().click();

      // Select "Document Options" from the menu
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Verifying that view is changed to "Document Options"', function() {
      expect(DocumentOptions.isDocumentOptionsMode()).toBeTruthy();
    });

    it('Should select "Fixed Income > Analytics Sources" from LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(ref) {
        ref.click();
      });

      // Verifying that "Fixed Income - Analytics Sources" option is selected
      expect(DocumentOptions.getOptionTitle().getText()).toEqual('Fixed Income - Analytics Sources');
    });

    it('Verifying that "Apply Analytics Overrides" checkbox is selected', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').getAttribute('class')
        .then(function(attrValue) {
          if (attrValue.indexOf('checked') < 0) {
            expect(false).customError('"Apply Analytics Overrides" checkbox is not selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "Cancel" button to close "Document Options" view', function() {
      DocumentOptions.getHeaderButton('Cancel').click();

      // Verifying that "Document Options" view is closed
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        expect(!value).customError('"Document Options" view did not close.');
        if (value) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Port. Ending Spread Duration" column for "88579YAE" security ' +
      'and verify that "Override Security Value..." option is seen in custom menu', function() {
      // Get reference of "Port. Ending Spread Duration" from first multi-header ie., 15-JUN-2015
      PA3MainPage.getColumnIndexFromCalculatedReport('Weights', 'Port. Ending Spread Duration').then(function(colIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Weights', '88579YAE', colIndex,
          'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true)
          .then(function(reference) {
            // Perform right click on the cell
            PA3MainPage.rightClickOnGivenElement(reference).then(function() {
              // Get the reference of "Override Security Value..." from custom menu
              PA3MainPage.getOptionFromCustomMenu('Override Security Value…').isPresent().then(function(value) {
                if (!value) {
                  expect(false).customError('"Override Security Value…" option is not found in custom menu.');
                  CommonFunctions.takeScreenShot();
                }
              }, function(error) {

                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            }, function() {

              expect(false).customError('"Custom menu" did not appear after performing right click.');
              CommonFunctions.takeScreenShot();
            });
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 600831', function() {

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should un-check "Enable Overrides" under "Analytics Overrides" menu', function() {
      PA3MainPage.setOptionFromWrenchMenu(false, 'Analytics Overrides|Enable Overrides').then(function(value) {
        if (!value) {
          expect(false).customError('"Enable Overrides" is still checked.');
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if mode is changed to "Document Options"', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('View is not switched to "Document Options"');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Analytics Sources" under "Fixed Income"', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(reference) {
        reference.click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if workspace is switched to "Analytics Sources" view
      DocumentOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Fixed Income - Analytics Sources') {
          expect(false).customError('Workspace is not showing "Fixed Income - Analytics Sources" view.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Apply Analytics Overrides" checkbox is not selected', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').getAttribute('class')
        .then(function(attrValue) {
          if (attrValue.indexOf('checked') > -1) {
            expect(false).customError('"Apply Analytics Overrides" checkbox is selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying if "Override Hierarchy" section is disabled', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getOverrideHierarchySection().getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('disabled') < 0) {
          expect(false).customError('"Override Hierarchy" section is not disabled.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Client" checkbox is selected', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy('Client').isChecked().then(function(value) {
        if (!value) {
          expect(false).customError('"Client" checkbox is not checked.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 600832', function() {

    it('Select "Apply Analytics Overrides" checkbox', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').click()
        .then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });

      // Verifying if "Apply Analytics Overrides" checkbox is selected
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').getAttribute('class')
        .then(function(attrValue) {
          if (attrValue.indexOf('checked') < 0) {
            expect(false).customError('"Apply Analytics Overrides" checkbox is not selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "Cancel" button to close "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('Cancel').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Document Options" mode is not closed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on Wrench button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Enable Overrides" is still unchecked', function() {
      PA3MainPage.isOptionChecked('Analytics Overrides|Enable Overrides').then(function(value) {
        if (value) {
          expect(false).customError('"Enable Overrides" is checked.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on Wrench button from application toolbar to close menu', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if menu list disappear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (value) {
          expect(false).customError('Menu list still appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "Port. Ending Spread Duration" column for "88579YAE" security ' +
      'and verify that "Override Security Value..." option is not seen in custom menu', function() {
      // Get reference of "Port. Ending Spread Duration" from first multi-header ie., 15-JUN-2015
      PA3MainPage.getColumnIndexFromCalculatedReport('Weights', 'Port. Ending Spread Duration').then(function(colIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Weights', '88579YAE', colIndex,
          'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true)
          .then(function(reference) {
            // Perform right click on the cell
            PA3MainPage.rightClickOnGivenElement(reference).then(function() {
              // Get the reference of "Override Security Value..." from custom menu
              PA3MainPage.getOptionFromCustomMenu('Override Security Value…').isPresent().then(function(value) {
                if (value) {
                  expect(false).customError('"Override Security Value…" option is found in custom menu.');
                  CommonFunctions.takeScreenShot();
                }
              }, function(error) {

                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            }, function() {

              expect(false).customError('"Custom menu" did not appear after performing right click.');
              CommonFunctions.takeScreenShot();
            });
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 600833', function() {

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if mode is changed to "Document Options"', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('View is not switched to "Document Options"');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Analytics Sources" under "Fixed Income"', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(reference) {
        reference.click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if workspace is switched to "Analytics Sources" view
      DocumentOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Fixed Income - Analytics Sources') {
          expect(false).customError('Workspace is not showing "Fixed Income - Analytics Sources" view.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Select "Apply Analytics Overrides" checkbox', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').click()
        .then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });

      // Verifying if "Apply Analytics Overrides" checkbox is selected
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').getAttribute('class')
        .then(function(attrValue) {
          if (attrValue.indexOf('checked') < 0) {
            expect(false).customError('"Apply Analytics Overrides" checkbox is not selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    var arrCheckBoxes = ['SuperClient', 'Personal'];
    arrCheckBoxes.forEach(function(chkName) {
      it('Should select "' + chkName + '" checkbox from "Override Hierarchy" section', function() {
        DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy(chkName).toggle();
      });
    });

    arrCheckBoxes.forEach(function(chkName) {
      it('Verifying that "' + chkName + '" checkbox is selected from "Override Hierarchy" section', function() {
        DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy(chkName).isChecked()
          .then(function(value) {
            if (!value) {
              expect(false).customError('"' + chkName + '" checkbox is not selected.');
              CommonFunctions.takeScreenShot();
            }
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
      });
    });

    it('Should click on "OK" button to close "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Document Options" mode is not closed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Wrench button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Enable Overrides" is checked', function() {
      PA3MainPage.isOptionChecked('Analytics Overrides|Enable Overrides').then(function(value) {
        if (!value) {
          expect(false).customError('"Enable Overrides" is not checked.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on Wrench button from application toolbar to close the menu', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (value) {
          expect(false).customError('Menu list still appear after clicking on Wrench button to close it.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

  describe('Test Step ID: 600822', function() {

    arrColumns.forEach(function(colName, index) {
      it('Note value of "' + colName + '" column from "18-JUN-2015" header for "88579YAE" security', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', colName, '18-JUN-2015').then(function(cellRef) {
          cellRef.getText().then(function(text) {
            arrVariables[index] = text;
          });
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Should note all the values in a row for "88579YAE" security', function() {
      SlickGridFunctions.getRowData('Weights', '88579YAE', 'Symbol').then(function(rowData) {
        val88579YAERow = rowData;
      });
    });

    it('Should right click on "Port. Ending Spread Duration" column from "18-JUN-2015" for "88579YAE" security and ' +
      'select "Override Security Value…"', function() {
      // Get cell into visibility
      SlickGridFunctions.scrollCellIntoView('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', '18-JUN-2015');

      // Get cell value
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration',
        '18-JUN-2015').then(function(reference) {
        // Right click and select "Override Security Value…"
        PA3MainPage.rightClickAndSelectOption(reference, 'Override Security Value…');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Analytics Override Editor" dialog is opened', function() {
      Utilities.verifyDialogTitle('Analytics Override Editor');
    });

    it('Verifying that "Identifier" widget is showing "88579YAE" security', function() {
      AnalyticsOverrideEditor.getInputField('Identifier').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '88579YAE') {
          expect(false).customError('"88579YAE" is not seen in the "Identifier" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Analytic" drop down is showing value as "Spread Duration"', function() {
      AnalyticsOverrideEditor.getDropdown('Analytic').getSelectedText().then(function(text) {
        if (text !== 'Spread Duration') {
          expect(false).customError('"Spread Duration" is not the selected value for "Analytic" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Start Date" field is showing "Earliest" as value selected', function() {
      AnalyticsOverrideEditor.getInputField('Start Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== 'Earliest') {
          expect(false).customError('"Start Date" field is not showing "Earliest" as value selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "End Date" field is showing "Previous Close" as value selected', function() {
      AnalyticsOverrideEditor.getInputField('End Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== 'Previous Close') {
          expect(false).customError('"End Date" field is not showing "Previous Close" as value selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Save Location" drop down is showing value as "Client"', function() {
      AnalyticsOverrideEditor.getDropdown('Save Location').getSelectedText().then(function(text) {
        if (text !== 'Client') {
          expect(false).customError('"Client" is not the selected value for "Save Location" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 600823', function() {

    it('Should select "18-JUN-2015" for "Start Date" using calendar icon', function() {
      // NOTE: For creating date format, month indexing starts from "0"
      // Thus, for June we have to pass "05" instead of "06"
      AnalyticsOverrideEditor.setDateUsingCalendar('Start Date', new Date('2015', '05', '18'));
    });

    it('Verifying if "Start Date" shows "18-Jun-2015"', function() {
      AnalyticsOverrideEditor.getInputField('Start Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '18-Jun-2015') {
          expect(false).customError('"Start Date" field is not showing "18-Jun-2015".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "19-JUN-2015" for "End Date" using calendar icon', function() {
      // NOTE: For creating date format, month indexing starts from "0"
      // Thus, for June we have to pass "05" instead of "06"
      AnalyticsOverrideEditor.setDateUsingCalendar('End Date', new Date('2015', '05', '19'));
    });

    it('Verifying if "End Date" shows "19-Jun-2015"', function() {
      AnalyticsOverrideEditor.getInputField('End Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '19-Jun-2015') {
          expect(false).customError('"End Date" field is not showing "19-Jun-2015".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should type "999" in the "Value" field', function() {
      AnalyticsOverrideEditor.getInputField('Value').sendKeys('999');

      // Verifying if "999" is entered
      AnalyticsOverrideEditor.getInputField('Value').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '999') {
          expect(false).customError('"999" is not entered into "Value" field');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Get number of rows before adding new one', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        noRowsBeforeAdding1 = rowCount;
      });
    });

    it('Should click on "Add" button to add new row to grid below', function() {
      AnalyticsOverrideEditor.getButton('Add').click();
    });

    it('Verifying that new row is added to the grid', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        if (rowCount !== noRowsBeforeAdding1 + 1) {
          expect(false).customError('New row is not added to the grid.');

          // Scroll the last row into view before taking screenshot
          AnalyticsOverrideEditor.scrollToRowNumber(rowCount - 1);

          // Take ScreenShot
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that last row added is for "88579YAE" identifier. ' +
      'Also verify that "Value" field is showing "999.0000", "Save Location" as "Client".', function() {
      // Get the row count
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        // Scroll row into view
        AnalyticsOverrideEditor.scrollToRowNumber(rowCount - 1);

        // Get row data
        AnalyticsOverrideEditor.getRowData(rowCount - 1).then(function(rowData) {
          // Get the column index for "Identifier"
          AnalyticsOverrideEditor.getColumnIndex('Identifier').then(function(index) {
            if (rowData[index] !== '88579YAE') {
              expect(false).customError('"Identifier" value is not equal to "88579YAE".');
              CommonFunctions.takeScreenShot();
            }
          }).then(function() {
            AnalyticsOverrideEditor.getColumnIndex('Value').then(function(index) {
              if (rowData[index] !== '999.0000') {
                expect(false).customError('"Value" field is not showing "999.0000".');
                CommonFunctions.takeScreenShot();
              }
            }).then(function() {
              AnalyticsOverrideEditor.getColumnIndex('Save Location').then(function(index) {
                if (rowData[index] !== 'Client') {
                  expect(false).customError('"Save Location" column value is not equal to "Client".');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

    it('Verifying that last row is highlighted in "Pink" color', function() {
      // Get row count
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        // Get all column names
        AnalyticsOverrideEditor.getColumnNames().then(function(colNames) {
          // Get cell references
          colNames.forEach(function(name) {
            AnalyticsOverrideEditor.getCellReference(rowCount - 1, name).then(function(cellRef) {
              cellRef.getCssValue('background-color').then(function(cssValue) {
                if (cssValue !== 'rgba(254, 224, 224, 1)') {
                  expect(false).customError('Cell in "' + name + '" column is not highlighted in "Pink" color.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 600837', function() {

    it('Should click on "Analytic" drop down', function() {
      AnalyticsOverrideEditor.getDropdown('Analytic').open();

      // Verifying if menu list appear
      Utilities.isDropDownOpen().then(function(status) {
        if (!status) {
          expect(false).customError('Drop down menu did not appear after clicking on "Analytic" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Spread Duration" from the drop down', function() {
      Utilities.getOptionFromDropDown('Spread Duration').click();

      // Verifying if "Spread Duration" option is selected
      AnalyticsOverrideEditor.getDropdown('Analytic').getSelectedText().then(function(text) {
        if (text !== 'Spread Duration') {
          expect(false).customError('"Spread Duration" is not selected from "Analytic" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "888" into "Value" field', function() {
      // Clear the "value" field before entering new value
      AnalyticsOverrideEditor.getInputField('Value').clear();

      // Enter "888" into the field
      AnalyticsOverrideEditor.getInputField('Value').sendKeys('888');

      // Verifying if "Value" field shows "888"
      AnalyticsOverrideEditor.getInputField('Value').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '888') {
          expect(false).customError('"888" is not entered into the "Value" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "20-JUN-2015" for "Start Date" using calendar icon', function() {
      // NOTE: For creating date format, month indexing starts from "0"
      // Thus, for June we have to pass "05" instead of "06"
      AnalyticsOverrideEditor.setDateUsingCalendar('Start Date', new Date('2015', '05', '20'));
    });

    it('Verifying if "Start Date" shows "20-Jun-2015"', function() {
      AnalyticsOverrideEditor.getInputField('Start Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '20-Jun-2015') {
          expect(false).customError('"Start Date" field is not showing "20-Jun-2015".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "20-JUN-2015" for "End Date" using calendar icon', function() {
      // NOTE: For creating date format, month indexing starts from "0"
      // Thus, for June we have to pass "05" instead of "06"
      AnalyticsOverrideEditor.setDateUsingCalendar('End Date', new Date('2015', '05', '20'));
    });

    it('Verifying if "End Date" shows "20-Jun-2015"', function() {
      AnalyticsOverrideEditor.getInputField('End Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '20-Jun-2015') {
          expect(false).customError('"End Date" field is not showing "20-Jun-2015".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Location" drop down', function() {
      AnalyticsOverrideEditor.getDropdown('Save Location').open();

      // Verifying if menu list appear
      Utilities.isDropDownOpen().then(function(status) {
        if (!status) {
          expect(false).customError('Drop down menu did not appear after clicking on "Save Location" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "SuperClient" from the drop down', function() {
      Utilities.getOptionFromDropDown('SuperClient').click();

      // Verifying if "SuperClient" option is selected
      AnalyticsOverrideEditor.getDropdown('Save Location').getSelectedText().then(function(text) {
        if (text !== 'SuperClient') {
          expect(false).customError('"SuperClient" is not selected from "Save Location" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Get number of rows before adding new one', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        noRowsBeforeAdding1 = rowCount;
      });
    });

    it('Should click on "Add" button to add new row to grid below', function() {
      AnalyticsOverrideEditor.getButton('Add').click();
    });

    it('Verifying that new row is added to the grid', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        if (rowCount !== noRowsBeforeAdding1 + 1) {
          expect(false).customError('New row is not added to the grid.');

          // Scroll the last row into view before taking screenshot
          AnalyticsOverrideEditor.scrollToRowNumber(rowCount - 1);

          // Take ScreenShot
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that last two rows are highlighted in "Pink" color', function() {
      // Get row count
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        // Get all column names
        AnalyticsOverrideEditor.getColumnNames().then(function(colNames) {
          // Get cell references
          colNames.forEach(function(name) {
            AnalyticsOverrideEditor.getCellReference(rowCount - 2, name).then(function(cellRef) {
              cellRef.getCssValue('background-color').then(function(cssValue) {
                if (cssValue !== 'rgba(254, 224, 224, 1)') {
                  expect(false).customError('Cell in "' + name + '" column for last but one row is not highlighted ' +
                    'in "Pink" color.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });

            AnalyticsOverrideEditor.getCellReference(rowCount - 1, name).then(function(cellRef) {
              cellRef.getCssValue('background-color').then(function(cssValue) {
                if (cssValue !== 'rgba(254, 224, 224, 1)') {
                  expect(false).customError('Cell in "' + name + '" column for last row is not highlighted ' +
                    'in "Pink" color.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

    it('Verifying that last row added is for "88579YAE" identifier. ' +
      'Also verify that "Value" field is showing "888.0000", "Save Location" as "SuperClient".', function() {
      // Get the row count
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        // Scroll row into view
        AnalyticsOverrideEditor.scrollToRowNumber(rowCount - 1);

        // Get row data
        AnalyticsOverrideEditor.getRowData(rowCount - 1).then(function(rowData) {
          // Get the column index for "Identifier"
          AnalyticsOverrideEditor.getColumnIndex('Identifier').then(function(index) {
            if (rowData[index] !== '88579YAE') {
              expect(false).customError('"Identifier" value is not equal to "88579YAE" for last row.');
              CommonFunctions.takeScreenShot();
            }
          }).then(function() {
            AnalyticsOverrideEditor.getColumnIndex('Value').then(function(index) {
              if (rowData[index] !== '888.0000') {
                expect(false).customError('"Value" field is not showing "888.0000" for last row.');
                CommonFunctions.takeScreenShot();
              }
            }).then(function() {
              AnalyticsOverrideEditor.getColumnIndex('Save Location').then(function(index) {
                if (rowData[index] !== 'SuperClient') {
                  expect(false).customError('"Save Location" column value is not equal to "SuperClient" ' +
                    'for last row.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 600838', function() {

    it('Should click on "Analytic" drop down', function() {
      AnalyticsOverrideEditor.getDropdown('Analytic').open();

      // Verifying if menu list appear
      Utilities.isDropDownOpen().then(function(status) {
        if (!status) {
          expect(false).customError('Drop down menu did not appear after clicking on "Analytic" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Modified Duration" from the drop down', function() {
      Utilities.getOptionFromDropDown('Modified Duration').click();

      // Verifying if "Modified Duration" option is selected
      AnalyticsOverrideEditor.getDropdown('Analytic').getSelectedText().then(function(text) {
        if (text !== 'Modified Duration') {
          expect(false).customError('"Modified Duration" is not selected from "Analytic" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "777" into "Value" field', function() {
      // Clear the "value" field before entering new value
      AnalyticsOverrideEditor.getInputField('Value').clear();

      // Enter "777" into the field
      AnalyticsOverrideEditor.getInputField('Value').sendKeys('777');

      // Verifying if "Value" field shows "777"
      AnalyticsOverrideEditor.getInputField('Value').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '777') {
          expect(false).customError('"777" is not entered into the "Value" field.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "20-JUN-2015" for "Start Date" using calendar icon', function() {
      // NOTE: For creating date format, month indexing starts from "0"
      // Thus, for June we have to pass "05" instead of "06"
      AnalyticsOverrideEditor.setDateUsingCalendar('Start Date', new Date('2015', '05', '20'));
    });

    it('Verifying if "Start Date" shows "20-Jun-2015"', function() {
      AnalyticsOverrideEditor.getInputField('Start Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '20-Jun-2015') {
          expect(false).customError('"Start Date" field is not showing "20-Jun-2015".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "20-JUN-2015" for "End Date" using calendar icon', function() {
      // NOTE: For creating date format, month indexing starts from "0"
      // Thus, for June we have to pass "05" instead of "06"
      AnalyticsOverrideEditor.setDateUsingCalendar('End Date', new Date('2015', '05', '20'));
    });

    it('Verifying if "End Date" shows "20-Jun-2015"', function() {
      AnalyticsOverrideEditor.getInputField('End Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '20-Jun-2015') {
          expect(false).customError('"End Date" field is not showing "20-Jun-2015".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Save Location" drop down', function() {
      AnalyticsOverrideEditor.getDropdown('Save Location').open();

      // Verifying if menu list appear
      Utilities.isDropDownOpen().then(function(status) {
        if (!status) {
          expect(false).customError('Drop down menu did not appear after clicking on "Save Location" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from the drop down', function() {
      Utilities.getOptionFromDropDown('Personal').click();

      // Verifying if "Personal" option is selected
      AnalyticsOverrideEditor.getDropdown('Save Location').getSelectedText().then(function(text) {
        if (text !== 'Personal') {
          expect(false).customError('"Personal" is not selected from "Save Location" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Get number of rows before adding new one', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        noRowsBeforeAdding1 = rowCount;
      });
    });

    it('Should click on "Add" button to add new row to grid below', function() {
      AnalyticsOverrideEditor.getButton('Add').click();
    });

    it('Verifying that new row is added to the grid', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        if (rowCount !== noRowsBeforeAdding1 + 1) {
          expect(false).customError('New row is not added to the grid.');

          // Scroll the last row into view before taking screenshot
          AnalyticsOverrideEditor.scrollToRowNumber(rowCount - 1);

          // Take ScreenShot
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that last three rows are highlighted in "Pink" color', function() {
      // Get row count
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        // Get all column names
        AnalyticsOverrideEditor.getColumnNames().then(function(colNames) {
          // Get cell references
          colNames.forEach(function(name) {
            // Verifying the background color of 3rd row from last
            AnalyticsOverrideEditor.getCellReference(rowCount - 3, name).then(function(cellRef) {
              cellRef.getCssValue('background-color').then(function(cssValue) {
                if (cssValue !== 'rgba(254, 224, 224, 1)') {
                  expect(false).customError('Cell in "' + name + '" column for 3rd row from last is not highlighted ' +
                    'in "Pink" color.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });

            // Verifying the background color of 2nd row from last
            AnalyticsOverrideEditor.getCellReference(rowCount - 2, name).then(function(cellRef) {
              cellRef.getCssValue('background-color').then(function(cssValue) {
                if (cssValue !== 'rgba(254, 224, 224, 1)') {
                  expect(false).customError('Cell in "' + name + '" column for 2nd row from last is not highlighted ' +
                    'in "Pink" color.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });

            // Verifying the background color of last row
            AnalyticsOverrideEditor.getCellReference(rowCount - 1, name).then(function(cellRef) {
              cellRef.getCssValue('background-color').then(function(cssValue) {
                if (cssValue !== 'rgba(254, 224, 224, 1)') {
                  expect(false).customError('Cell in "' + name + '" column for last row is not highlighted ' +
                    'in "Pink" color.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

    it('Verifying that last row added is for "88579YAE" identifier. ' +
      'Also verify that "Value" field is showing "777.0000", "Save Location" as "Personal".', function() {
      // Get the row count
      AnalyticsOverrideEditor.getAllRows(true).then(function(rowCount) {
        // Scroll row into view
        AnalyticsOverrideEditor.scrollToRowNumber(rowCount - 1);

        // Get row data
        AnalyticsOverrideEditor.getRowData(rowCount - 1).then(function(rowData) {
          // Get the column index for "Identifier"
          AnalyticsOverrideEditor.getColumnIndex('Identifier').then(function(index) {
            if (rowData[index] !== '88579YAE') {
              expect(false).customError('"Identifier" value is not equal to "88579YAE" for last row.');
              CommonFunctions.takeScreenShot();
            }
          }).then(function() {
            AnalyticsOverrideEditor.getColumnIndex('Value').then(function(index) {
              if (rowData[index] !== '777.0000') {
                expect(false).customError('"Value" field is not showing "777.0000" for last row.');
                CommonFunctions.takeScreenShot();
              }
            }).then(function() {
              AnalyticsOverrideEditor.getColumnIndex('Save Location').then(function(index) {
                if (rowData[index] !== 'Personal') {
                  expect(false).customError('"Save Location" column value is not equal to "Personal" ' +
                    'for last row.');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

  });

  describe('Test Step ID: 600824', function() {

    it('Should click on "Apply & Close" button from "Analytics Override Editor" dialog', function() {
      AnalyticsOverrideEditor.getButton('Apply & Close').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for new changes to save', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(AnalyticsOverrideEditor.xpathProgressIndicator)), 60000)
        .then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for report to appear
      browser.sleep(3000);
    });

    arrColumns.forEach(function(colName, index) {
      it('Comparing value of "' + colName + '" column from "18-JUN-2015" header for "88579YAE" security ' +
        'with one collected in Test Step ID: 600822', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', colName, '18-JUN-2015').then(function(cellRef) {
          cellRef.getText().then(function(text) {
            if (text !== arrVariables[index]) {
              expect(false).customError('Value of "' + colName + '" column from "18-JUN-2015" for "88579YAE" ' +
                'not matched with previous value. Expected: "' + arrVariables[index] + '", Found: "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    var arrMultiHeaderDates = ['18-JUN-2015', '19-JUN-2015'];
    arrMultiHeaderDates.forEach(function(name) {
      it('Verifying that "Port. Ending Spread Duration" column value for "88579YAE" security under "' + name + '" ' +
        'is displaying "999.00" and is not highlighted in "Pink" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', name)
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== '999.00') {
                expect(false).customError('Expected: "999.00", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue === 'rgba(254, 224, 224, 1)') {
                expect(false).customError('Cell is highlighted in "Pink" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

    it('Verifying that "Port. Ending Modified Duration" column value for "88579YAE" security under "20-JUN-2015" ' +
      'is displaying "777.00" and is not highlighted in "Pink" color', function() {
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Modified Duration', '20-JUN-2015')
        .then(function(cellRef) {
          // Verifying cell text
          cellRef.getText().then(function(text) {
            if (text !== '777.00') {
              expect(false).customError('Expected: "777.00", Found: "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });

          // Verifying cell background color
          cellRef.getCssValue('background-color').then(function(cssValue) {
            if (cssValue === 'rgba(254, 224, 224, 1)') {
              expect(false).customError('Cell is highlighted in "Pink" color.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });

  });

  describe('Test Step ID: 600834', function() {

    it('Should un-check "Automatic Calculation"', function() {
      // Click on the Wrench button
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appeared
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        expect(value).customError('Menu list did not appear after performing click on "Wrench" button from app toolbar.');
        if (!value) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Un-check "Automatic Calculation"
      PA3MainPage.setOptionFromWrenchMenu(false, 'Automatic Calculation');
    });

    it('Should select "Weights - 1d" report from LHP', function() {
      PA3MainPage.getReports('Weights - 1d').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Weights - 1d" report is selected
      PA3MainPage.getReports('Weights - 1d').getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('selected') < 0) {
          expect(false).customError('"Weights - 1d" report is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Refresh" icon from application toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Weights" report from LHP', function() {
      PA3MainPage.getReports('Weights').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Weights" report is selected
      PA3MainPage.getReports('Weights').getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('selected') < 0) {
          expect(false).customError('"Weights" report is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    arrColumns.forEach(function(colName, index) {
      it('Comparing value of "' + colName + '" column from "18-JUN-2015" header for "88579YAE" security ' +
        'with one collected in Test Step ID: 600822', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', colName, '18-JUN-2015').then(function(cellRef) {
          cellRef.getText().then(function(text) {
            if (text !== arrVariables[index]) {
              expect(false).customError('Value of "' + colName + '" column from "18-JUN-2015" for "88579YAE" ' +
                'not matched with previous value. Expected: "' + arrVariables[index] + '", Found: "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    var arrMultiHeaderDates = ['18-JUN-2015', '19-JUN-2015'];
    arrMultiHeaderDates.forEach(function(name) {
      it('Verifying that "Port. Ending Spread Duration" column value for "88579YAE" security under "' + name + '" ' +
        'is displaying "999.00" and is not highlighted in "Pink" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', name)
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== '999.00') {
                expect(false).customError('Expected: "999.00", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue === 'rgba(254, 224, 224, 1)') {
                expect(false).customError('Cell is highlighted in "Pink" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

    it('Verifying that "Port. Ending Modified Duration" column value for "88579YAE" security under "20-JUN-2015" ' +
      'is displaying "777.00" and is not highlighted in "Pink" color', function() {
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Modified Duration', '20-JUN-2015')
        .then(function(cellRef) {
          // Verifying cell text
          cellRef.getText().then(function(text) {
            if (text !== '777.00') {
              expect(false).customError('Expected: "777.00", Found: "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });

          // Verifying cell background color
          cellRef.getCssValue('background-color').then(function(cssValue) {
            if (cssValue === 'rgba(254, 224, 224, 1)') {
              expect(false).customError('Cell is highlighted in "Pink" color.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });

  });

  describe('Test Step ID: 600825', function() {

    it('Should select "Automatic Calculation"', function() {
      // Click on the Wrench button
      PA3MainPage.getWrenchIcon().click();

      // Verifying if drop down menu appeared
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        expect(value).customError('Menu list did not appear after performing click on "Wrench" button from app toolbar.');
        if (!value) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Select "Automatic Calculation"
      PA3MainPage.setOptionFromWrenchMenu(true, 'Automatic Calculation');
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "View Overrides" under "Analytics Overrides" menu', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|View Overrides').then(function(value) {
        if (!value) {
          expect(false).customError('"View Overrides" is still un-checked.');
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrMultiHeaderDates = ['18-JUN-2015', '19-JUN-2015'];
    arrMultiHeaderDates.forEach(function(name) {
      it('Verifying that "Port. Ending Spread Duration" column value for "88579YAE" security under "' + name + '" ' +
        'is displaying "999.00" and is highlighted in "Pink" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', name)
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== '999.00') {
                expect(false).customError('Expected: "999.00", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue !== 'rgba(254, 224, 224, 1)') {
                expect(false).customError('Cell is not highlighted in "Pink" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

    it('Verifying that "Port. Ending Modified Duration" column value for "88579YAE" security under "20-JUN-2015" ' +
      'is displaying "777.00" and is highlighted in "Pink" color', function() {
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Modified Duration', '20-JUN-2015')
        .then(function(cellRef) {
          // Verifying cell text
          cellRef.getText().then(function(text) {
            if (text !== '777.00') {
              expect(false).customError('Expected: "777.00", Found: "' + text + '"');
              CommonFunctions.takeScreenShot();
            }
          });

          // Verifying cell background color
          cellRef.getCssValue('background-color').then(function(cssValue) {
            if (cssValue !== 'rgba(254, 224, 224, 1)') {
              expect(false).customError('Cell is not highlighted in "Pink" color.');
              CommonFunctions.takeScreenShot();
            }
          });
        });
    });

  });

  describe('Test Step ID: 600829', function() {

    it('Should select "Attribution" report from LHP', function() {
      PA3MainPage.getReports('Attribution').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Attribution" report is selected
      PA3MainPage.getReports('Attribution').getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('selected') < 0) {
          expect(false).customError('"Attribution" report is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Attribution" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);

      // Wait for report to load
      browser.sleep(3000);
    });

    it('Verifying that "Attribution" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Attribution" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for report to load
      browser.sleep(3000);
    });

    it('Scroll the grid to get "Port. Ending Spread Duration" column under "18-JUN-2015 to 19-JUN-2015" multi-header into view',
      function() {
        SlickGridFunctions.scrollCellIntoView('Attribution', '3m Company 1.0% 26-jun-2017', '',
          'Port. Ending Spread Duration', '18-JUN-2015 to 19-JUN-2015');
      });

    it('Verifying that "Port. Ending Spread Duration" column value for "3m Company 1.0% 26-jun-2017" ' +
      'security under "18-JUN-2015 to 19-JUN-2015" is displaying "999.00" and is highlighted in "Pink" color', function() {
      SlickGridFunctions.getCellReference('Attribution', '3m Company 1.0% 26-jun-2017', '', 'Port. Ending Spread Duration',
        '18-JUN-2015 to 19-JUN-2015').then(function(cellRef) {
        // Verifying cell text
        cellRef.getText().then(function(text) {
          if (text !== '999.00') {
            expect(false).customError('Expected: "999.00", Found: "' + text + '"');
            CommonFunctions.takeScreenShot();
          }
        });

        // Verifying cell background color
        cellRef.getCssValue('background-color').then(function(cssValue) {
          if (cssValue !== 'rgba(254, 224, 224, 1)') {
            expect(false).customError('Cell is not highlighted in "Pink" color.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 600839', function() {

    it('Should select "Document Options" from app toolbar "Wrench" menu', function() {
      // Click on the "Wrench" button
      PA3MainPage.getWrenchIcon().click();

      // Select "Document Options" from the menu
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Verifying that view is changed to "Document Options"', function() {
      expect(DocumentOptions.isDocumentOptionsMode()).toBeTruthy();
    });

    it('Should select "Fixed Income > Analytics Sources" from LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(ref) {
        ref.click();
      });

      // Verifying that "Fixed Income - Analytics Sources" option is selected
      expect(DocumentOptions.getOptionTitle().getText()).toEqual('Fixed Income - Analytics Sources');
    });

    it('Should un-check "Client" checkbox from "Override Hierarchy" section', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy('Client').toggle();
    });

    it('Verifying that "Client" checkbox is not selected from "Override Hierarchy" section', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy('Client').isChecked()
        .then(function(value) {
          if (value) {
            expect(false).customError('"Client" checkbox is still selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button to close "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Document Options" mode is not closed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Attribution" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Attribution" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Attribution').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Attribution" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Attribution" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Weights" report from LHP', function() {
      PA3MainPage.getReports('Weights').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if "Weights" report is selected
      PA3MainPage.getReports('Weights').getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('selected') < 0) {
          expect(false).customError('"Weights" report is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "View Overrides" under "Analytics Overrides" menu', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|View Overrides').then(function(value) {
        if (!value) {
          expect(false).customError('"View Overrides" is still un-checked.');
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrMultiHeaderDates = ['18-JUN-2015', '19-JUN-2015'];
    arrMultiHeaderDates.forEach(function(name) {
      it('Verifying that "Port. Ending Spread Duration" column value for "88579YAE" security under "' + name + '" ' +
        'is displaying "1.99" and is not highlighted in "Pink" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', name)
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== '1.99') {
                expect(false).customError('Expected: "1.99", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue === 'rgba(254, 224, 224, 1)') {
                expect(false).customError('Cell is highlighted in "Pink" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

    var arrColumns = ['Port. Ending Spread Duration', 'Port. Ending Modified Duration'];
    var arrValues = ['888.00', '777.00'];
    arrColumns.forEach(function(name, index) {
      it('Verifying that "' + name + '" column value for "88579YAE" security under "20-JUN-2015" ' +
        'is displaying "' + arrValues[index] + '" and is highlighted in "Pink" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', name, '20-JUN-2015')
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== arrValues[index]) {
                expect(false).customError('Expected: "' + arrValues[index] + '", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue !== 'rgba(254, 224, 224, 1)') {
                expect(false).customError('Cell is not highlighted in "Pink" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

  });

  describe('Test Step ID: 600840', function() {

    it('Should select "Document Options" from app toolbar "Wrench" menu', function() {
      // Click on the "Wrench" button
      PA3MainPage.getWrenchIcon().click();

      // Select "Document Options" from the menu
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click();
    });

    it('Verifying that view is changed to "Document Options"', function() {
      expect(DocumentOptions.isDocumentOptionsMode()).toBeTruthy();
    });

    it('Should select "Fixed Income > Analytics Sources" from LHP', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(ref) {
        ref.click();
      });

      // Verifying that "Fixed Income - Analytics Sources" option is selected
      expect(DocumentOptions.getOptionTitle().getText()).toEqual('Fixed Income - Analytics Sources');
    });

    it('Should check "Client" checkbox from "Override Hierarchy" section', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy('Client').toggle();
    });

    it('Verifying that "Client" checkbox is selected from "Override Hierarchy" section', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBoxFromOverrideHierarchy('Client').isChecked()
        .then(function(value) {
          if (!value) {
            expect(false).customError('"Client" checkbox is still not selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button to close "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Document Options" mode is not closed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrMultiHeaderDates = ['18-JUN-2015', '19-JUN-2015'];
    arrMultiHeaderDates.forEach(function(name) {
      it('Verifying that "Port. Ending Spread Duration" column value for "88579YAE" security under "' + name + '" ' +
        'is displaying "999.00"', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', name)
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== '999.00') {
                expect(false).customError('Expected: "999.00", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

    var arrColumns = ['Port. Ending Spread Duration', 'Port. Ending Modified Duration'];
    var arrValues = ['888.00', '777.00'];
    arrColumns.forEach(function(name, index) {
      it('Verifying that "' + name + '" column value for "88579YAE" security under "20-JUN-2015" ' +
        'is displaying "' + arrValues[index] + '"', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', name, '20-JUN-2015')
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== arrValues[index]) {
                expect(false).customError('Expected: "' + arrValues[index] + '", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

  });

  describe('Test Step ID: 600835', function() {

    it('Should select "Toggle Theme" from app toolbar "Wrench" menu', function() {
      // Click on the "Wrench" button
      PA3MainPage.getWrenchIcon().click();

      // Select "Toggle Theme" from the menu
      PA3MainPage.getOptionFromWrenchMenu('Toggle Theme').click();
    });

    it('Verifying that application theme changed to "Carbon"', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('carbon') < 0) {
          expect(false).customError('Application theme is not changed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should check "View Overrides" under "Analytics Overrides" menu', function() {
      PA3MainPage.setOptionFromWrenchMenu(true, 'Analytics Overrides|View Overrides').then(function(value) {
        if (!value) {
          expect(false).customError('"View Overrides" is still un-checked.');
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    var arrMultiHeaderDates = ['18-JUN-2015', '19-JUN-2015'];
    arrMultiHeaderDates.forEach(function(name) {
      it('Verifying that "Port. Ending Spread Duration" column value for "88579YAE" security under "' + name + '" ' +
        'is displaying "999.00" and is highlighted in "Red" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', name)
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== '999.00') {
                expect(false).customError('Expected: "999.00", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue !== 'rgba(102, 0, 0, 1)') {
                expect(false).customError('Cell is not highlighted in "Red" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

    var arrColumns = ['Port. Ending Spread Duration', 'Port. Ending Modified Duration'];
    var arrValues = ['888.00', '777.00'];
    arrColumns.forEach(function(name, index) {
      it('Verifying that "' + name + '" column value for "88579YAE" security under "20-JUN-2015" ' +
        'is displaying "' + arrValues[index] + '" and is highlighted in "Red" color', function() {
        SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', name, '20-JUN-2015')
          .then(function(cellRef) {
            // Verifying cell text
            cellRef.getText().then(function(text) {
              if (text !== arrValues[index]) {
                expect(false).customError('Expected: "' + arrValues[index] + '", Found: "' + text + '"');
                CommonFunctions.takeScreenShot();
              }
            });

            // Verifying cell background color
            cellRef.getCssValue('background-color').then(function(cssValue) {
              if (cssValue !== 'rgba(102, 0, 0, 1)') {
                expect(false).customError('Cell is not highlighted in "Red" color.');
                CommonFunctions.takeScreenShot();
              }
            });
          });
      });
    });

  });

  describe('Test Step ID: 600826', function() {

    it('Should select "Toggle Theme" from app toolbar "Wrench" menu', function() {
      // Click on the "Wrench" button
      PA3MainPage.getWrenchIcon().click();

      // Select "Toggle Theme" from the menu
      PA3MainPage.getOptionFromWrenchMenu('Toggle Theme').click();
    });

    it('Verifying that application theme is not more "Carbon"', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(attrValue) {
        if (attrValue.indexOf('carbon') > -1) {
          expect(false).customError('Application theme is still carbon.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should right click on "Port. Ending Spread Duration" column from "18-JUN-2015" for "88579YAE" security and ' +
      'select "Override Security Value…"', function() {
      // Get cell into visibility
      SlickGridFunctions.scrollCellIntoView('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration', '18-JUN-2015');

      // Get cell value
      SlickGridFunctions.getCellReference('Weights', '88579YAE', 'Symbol', 'Port. Ending Spread Duration',
        '18-JUN-2015').then(function(reference) {
        // Right click and select "Override Security Value…"
        PA3MainPage.rightClickAndSelectOption(reference, 'Override Security Value…');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Analytics Override Editor" dialog is opened', function() {
      Utilities.verifyDialogTitle('Analytics Override Editor');
    });

    it('Verifying that "Identifier" widget is showing "88579YAE" security', function() {
      AnalyticsOverrideEditor.getInputField('Identifier').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '88579YAE') {
          expect(false).customError('"88579YAE" is not seen in the "Identifier" widget.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Analytic" drop down is showing value as "Spread Duration"', function() {
      AnalyticsOverrideEditor.getDropdown('Analytic').getSelectedText().then(function(text) {
        if (text !== 'Spread Duration') {
          expect(false).customError('"Spread Duration" is not the selected value for "Analytic" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Start Date" field is showing "18-Jun-2015" as value selected', function() {
      AnalyticsOverrideEditor.getInputField('Start Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '18-Jun-2015') {
          expect(false).customError('"Start Date" field is not showing "18-Jun-2015" as value selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "End Date" field is showing "19-Jun-2015" as value selected', function() {
      AnalyticsOverrideEditor.getInputField('End Date').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '19-Jun-2015') {
          expect(false).customError('"End Date" field is not showing "19-Jun-2015" as value selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Value" field is showing "999.0000"', function() {
      AnalyticsOverrideEditor.getInputField('Value').getAttribute('value').then(function(attrValue) {
        if (attrValue !== '999.0000') {
          expect(false).customError('"Value" field is not showing "999.0000"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Save Location" drop down is showing value as "Client"', function() {
      AnalyticsOverrideEditor.getDropdown('Save Location').getSelectedText().then(function(text) {
        if (text !== 'Client') {
          expect(false).customError('"Client" is not the selected value for "Save Location" drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that same row with values is highlighted in "Preview" section below', function() {
      var arrValues = [
        '88579YAE',
        '3m Company 1.0% 26-jun-2017',
        '18-Jun-2015', '19-Jun-2015',
        'Spread Duration',
        '999.0000',
        'Client',
      ];
      AnalyticsOverrideEditor.getSelectedRows().then(function(rows) {
        // Get all column Names
        AnalyticsOverrideEditor.getColumnNames().then(function(colNames) {
          colNames.forEach(function(name, index) {
            AnalyticsOverrideEditor.getCellReference(rows[0], name).then(function(cellRef) {
              cellRef.getText().then(function(text) {
                if (text !== arrValues[index]) {
                  expect(false).customError('Highlighted cell for "' + name + '" column is not having expected value. ' +
                    'Expected: "' + arrValues[index] + '", Found: "' + text + '"');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
        });
      });
    });

    it('Should click on "Add" button from "Analytics Override Editor"', function() {
      AnalyticsOverrideEditor.getButton('Add').click();
    });

    it('Verifying that "Analytics Override Editor" pop-up saying "Override data already exists." appear', function() {
      Utilities.getDialogClassReference('Analytics Override Editor', 2).getContent().getText().then(function(text) {
        if (text !== 'Override data already exists.') {
          expect(false).customError('Content of "Analytics Override Editor" dialog is not equal to ' +
            '"Override data already exists."');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 600828', function() {

    // Variable(s)
    var countOfRowsBeforeDeletion;

    it('Should click "OK" button from pop-up', function() {
      Utilities.getDialogClassReference('Analytics Override Editor', 2).getFooter().$('tf-button').click();
    });

    it('Get the count of number of rows in grid before deleting', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(count) {
        countOfRowsBeforeDeletion = count;
      });
    });

    it('Should hover over "88579YAE" under "Preview" section and click on "X" icon to delete the row', function() {
      AnalyticsOverrideEditor.getSelectedRows().then(function(rows) {
        // Get cell reference of "88579YAE" from "Identifier" column
        AnalyticsOverrideEditor.getCellReference(rows[0], 'Identifier').then(function(cellRef) {
          // Hover over the cell and click on "X" icon
          AnalyticsOverrideEditor.getXIconForGivenCellReference(cellRef, '88579YAE').click();
        });
      });
    });

    it('Verifying if row is deleted', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(count) {
        if (count !== countOfRowsBeforeDeletion - 1) {
          expect(false).customError('"88579YAE" security is not deleted even after performing click on "X" icon');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on drop down under "PREVIEW" section', function() {
      AnalyticsOverrideEditor.getDropdown('Preview').open();

      // Verifying if drop down menu appear
      Utilities.isDropDownOpen().then(function(status) {
        if (!status) {
          expect(false).customError('Menu list did not appear after clicking on drop down from "Preview" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Personal" from drop down', function() {
      Utilities.getOptionFromDropDown('Personal').click();

      // Verifying that drop down value is now "Personal"
      AnalyticsOverrideEditor.getDropdown('Preview').getSelectedText().then(function(text) {
        if (text !== 'Personal') {
          expect(false).customError('"Personal" is not selected from drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrColNamesPersonal = ['Identifier', 'Analytic', 'Value'];
    var arrValuesPersonal = ['88579YAE', 'Modified Duration', '777.0000'];

    it('Verifying that row with "Identifier=88579YAE", "Analytic=Modified Duration" and "Value=777.0000" appears', function() {
      arrColNamesPersonal.forEach(function(name, index) {
        AnalyticsOverrideEditor.getCellReference(0, name).then(function(cellRef) {
          cellRef.getText().then(function(text) {
            if (text !== arrValuesPersonal[index]) {
              expect(false).customError('"' + name + '" column value is not equal to "' + arrValuesPersonal[index] + '".');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should hover over "88579YAE" under "Preview" section and click on "X" icon to delete the row', function() {
      // Get cell reference of "88579YAE" from "Identifier" column
      AnalyticsOverrideEditor.getCellReference(0, 'Identifier').then(function(cellRef) {
        // Hover over the cell and click on "X" icon
        AnalyticsOverrideEditor.getXIconForGivenCellReference(cellRef, '88579YAE').click();
      });
    });

    it('Should click on drop down under "PREVIEW" section', function() {
      AnalyticsOverrideEditor.getDropdown('Preview').open();

      // Verifying if drop down menu appear
      Utilities.isDropDownOpen().then(function(status) {
        if (!status) {
          expect(false).customError('Menu list did not appear after clicking on drop down from "Preview" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "SuperClient" from drop down', function() {
      Utilities.getOptionFromDropDown('SuperClient').click();

      // Verifying that drop down value is now "SuperClient"
      AnalyticsOverrideEditor.getDropdown('Preview').getSelectedText().then(function(text) {
        if (text !== 'SuperClient') {
          expect(false).customError('"SuperClient" is not selected from drop down.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrColNamesSuper = ['Identifier', 'Analytic', 'Value'];
    var arrValuesSuper = ['88579YAE', 'Spread Duration', '888.0000'];

    it('Verifying that row with "Identifier=88579YAE", "Analytic=Spread Duration" and "Value=888.0000" appears', function() {
      arrColNamesSuper.forEach(function(name, index) {
        AnalyticsOverrideEditor.getCellReference(0, name).then(function(cellRef) {
          cellRef.getText().then(function(text) {
            if (text !== arrValuesSuper[index]) {
              expect(false).customError('"' + name + '" column value is not equal to "' + arrValuesSuper[index] + '".');
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it('Should hover over "88579YAE" under "Preview" section and click on "X" icon to delete the row', function() {
      // Get cell reference of "88579YAE" from "Identifier" column
      AnalyticsOverrideEditor.getCellReference(0, 'Identifier').then(function(cellRef) {
        // Hover over the cell and click on "X" icon
        AnalyticsOverrideEditor.getXIconForGivenCellReference(cellRef, '88579YAE').click();
      });
    });

    it('Should click on "Apply" button from "Analytics Override Editor" dialog', function() {
      AnalyticsOverrideEditor.getButton('Apply').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Waiting for new changes to save', function() {
      Utilities.waitUntilElementDisappears(element(by.xpath(AnalyticsOverrideEditor.xpathProgressIndicator)), 60000)
        .then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Verifying that "Analytics Override Editor" dialog is still open', function() {
      Utilities.isDialogOpen('Analytics Override Editor').then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('"Analytics Override Editor" dialog is closed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "88579YAE" security is no more displayed', function() {
      AnalyticsOverrideEditor.getAllRows(true).then(function(count) {
        if (count !== countOfRowsBeforeDeletion - 3) {
          expect(false).customError('There are still entries for "88579YAE" security in the grid.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "X" button from "Analytics Override Editor" dialog', function() {
      Utilities.getDialogClassReference('Analytics Override Editor').close();
    });

    it('Verifying that "Analytics Override Editor" dialog is closed', function() {
      Utilities.isDialogOpen('Analytics Override Editor').then(function(isOpen) {
        if (isOpen) {
          expect(false).customError('"Analytics Override Editor" dialog is still open.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 600836', function() {

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Document Options" from menu', function() {
      PA3MainPage.getOptionFromWrenchMenu('Document Options').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if mode is changed to "Document Options"', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (!value) {
          expect(false).customError('View is not switched to "Document Options"');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Analytics Sources" under "Fixed Income"', function() {
      DocumentOptions.getLHPOptionItemFromCategory('Analytics Sources', 'Fixed Income').then(function(reference) {
        reference.click().then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if workspace is switched to "Analytics Sources" view
      DocumentOptions.getOptionTitle().getText().then(function(value) {
        if (value !== 'Fixed Income - Analytics Sources') {
          expect(false).customError('Workspace is not showing "Fixed Income - Analytics Sources" view.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Un-check "Apply Analytics Overrides" checkbox', function() {
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').click()
        .then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });

      // Verifying if "Apply Analytics Overrides" checkbox is un-checked
      DocumentOptionsFixedIncomeAnalyticsSource.getCheckBox('Apply Analytics Overrides').getAttribute('class')
        .then(function(attrValue) {
          if (attrValue.indexOf('checked') > -1) {
            expect(false).customError('"Apply Analytics Overrides" checkbox is still selected.');
            CommonFunctions.takeScreenShot();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button to close "Document Options" mode', function() {
      DocumentOptions.getHeaderButton('OK').click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Document Options" mode is closed', function() {
      DocumentOptions.isDocumentOptionsMode().then(function(value) {
        if (value) {
          expect(false).customError('"Document Options" mode is not closed.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Wait for "Weights" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000);
    });

    it('Verifying that "Weights" report is calculated without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(reportFound) {
        expect(reportFound).customError('Calculated "Weights" report is not displayed');
        if (!reportFound) {
          CommonFunctions.takeScreenShot();
        }
      });

      // Check if "Calculation Error" appeared
      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        expect(!found).customError('"Calculation Error" dialog is seen while "Weights" report was calculating.');
        if (found) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Wrench" button from application toolbar', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if wrench menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (!value) {
          expect(false).customError('Menu list did not appear after clicking on Wrench button.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that "Enable Overrides" is un-checked', function() {
      PA3MainPage.isOptionChecked('Analytics Overrides|Enable Overrides').then(function(value) {
        if (value) {
          expect(false).customError('"Enable Overrides" is selected.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on Wrench button from application toolbar to close the menu', function() {
      PA3MainPage.getWrenchIcon().click().then(function() {
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if menu list appear
      PA3MainPage.getWrenchIcon(true).isPresent().then(function(value) {
        if (value) {
          expect(false).customError('Menu list still appear after clicking on Wrench button to close it.');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "Port. Ending Spread Duration" column for "88579YAE" security ' +
      'and verify that "Override Security Value..." option is not seen in custom menu', function() {
      // Get reference of "Port. Ending Spread Duration" from first multi-header ie., 15-JUN-2015
      PA3MainPage.getColumnIndexFromCalculatedReport('Weights', 'Port. Ending Spread Duration').then(function(colIndex) {
        PA3MainPage.getCellValueForMultiHeaderColumn('Weights', '88579YAE', colIndex,
          'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', true)
          .then(function(reference) {
            // Perform right click on the cell
            PA3MainPage.rightClickOnGivenElement(reference).then(function() {
              // Get the reference of "Override Security Value..." from custom menu
              PA3MainPage.getOptionFromCustomMenu('Override Security Value…').isPresent().then(function(value) {
                if (value) {
                  expect(false).customError('"Override Security Value…" option is found in custom menu.');
                  CommonFunctions.takeScreenShot();
                }
              }, function(error) {

                expect(false).customError(error);
                CommonFunctions.takeScreenShot();
              });
            }, function() {

              expect(false).customError('"Custom menu" did not appear after performing right click.');
              CommonFunctions.takeScreenShot();
            });
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

  });

});
