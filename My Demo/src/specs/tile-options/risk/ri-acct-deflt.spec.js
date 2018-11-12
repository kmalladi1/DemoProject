'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-acct-deflt', function() {

  var values2 = [];

  describe('Test Step ID: 555346', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Risk;RISK_ACCT_RESTORE"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('risk-acct-restore');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Asset Detail');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Risk', 'Risk Asset Detail', undefined, 'isSelected');

    var arrValues = [{name: 'Portfolio', val: 'BENCH:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'CASH:USD', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 555347', function() {

    it('Should click on "Footnotes" and verifying if "Axioma US Fundamental Equity Risk Model SH 2" is displayed next to "Risk Model Date"', function() {
      ThiefHelpers.getFootnotesClassReference().withFootnotes(function(footnotesRef1) {
        footnotesRef1.forEach(function(footnoteRef) {
          footnoteRef.getText().then(function(text) {
            if (text.indexOf('Risk Model Date') !== -1) {
              var value = text.split(': ')[1].split('|')[0];
              if (value !== 'Axioma US Fundamental Equity Risk Model SH 2') {
                expect(false).customError('"Risk Model Date" should display "Axioma US Fundamental Equity Risk Model SH 2" next to it instead displayed' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555354', function() {

    var values1 = [];

    it('Should note all the values in "Total" row for future verification', function() {
      SlickGridFunctions.getRowData('Risk Asset Detail', 'Total', '').then(function(data) {
        values1 = data;
      });
    });

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Carbon" from third drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Carbon').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Carbon"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Theme" is converted into "Carbon" mode', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
        if (text.indexOf('carbon') < 0) {
          expect(false).customError('Theme did not change into the "Carbon" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Total" rows are same after changing to carbon theme (with values1)', function() {
      SlickGridFunctions.getRowData('Risk Asset Detail', 'Total', '').then(function(data) {
        Utilities.arrayCompare(values1, data);
      });
    });
  });

  describe('Test Step ID: 555353', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Asset Detail', 'Risk Models', 'Risk');

    it('Verifying that "Restore Defaults" button is grayed out in "Risk Models"', function() {
      TileOptions.getRestoreDefaultsButton().getAttribute('class').then(function(value) {
        if (value.indexOf('disabled') === -1) {
          expect(false).customError('"Restore Defaults" button is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 555348', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

    it('Should click on "Hamburger" icon next to portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to portfolio widget');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Risk_default_Acct1" in the account list menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Risk_default_Acct1').click().then(function() {
        },

        function() {
          expect(false).customError('Unable to select "Risk_default_Acct1" account ');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Asset Detail');

    it('Should note all the values in "Total" row for future verification', function() {
      SlickGridFunctions.getRowData('Risk Asset Detail', 'Total', '').then(function(data) {
        values2 = data;
      });
    });

    it('Should click on "Footnotes" and verifying if "Axioma US Fundamental Equity Risk Model SH 2" is displayed next to "Risk Model Date"', function() {
      ThiefHelpers.getFootnotesClassReference().withFootnotes(function(footnotesRef1) {
        footnotesRef1.forEach(function(footnoteRef) {
          footnoteRef.getText().then(function(text) {
            if (text.indexOf('Risk Model Date') !== -1) {
              var value = text.split(': ')[1].split('|')[0];
              if (value !== 'Axioma US Fundamental Equity Risk Model SH 2') {
                expect(false).customError('"Risk Model Date" should display "Axioma US Fundamental Equity Risk Model SH 2" next to it instead displayed' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555355', function() {

    it('Should click on the "Wrench" button from the application toolbar', function() {
      PA3MainPage.selectWrenchIcon();
    });

    it('Should click on "Quartz" from "Format Options|Theme" drop down', function() {
      PA3MainPage.getOptionFromWrenchMenu('Format Options|Theme|Quartz').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Quartz"');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Theme" is converted into "Quartz" mode', function() {
      element(by.xpath(PA3MainPage.xpathApp)).getAttribute('class').then(function(text) {
        if (text.indexOf('carbon') >= 0) {
          expect(false).customError('Theme did not change into the "Quartz" mode');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Total" rows are same after changing to Quartz theme (with values2)', function() {
      SlickGridFunctions.getRowData('Risk Asset Detail', 'Total', '').then(function(data) {
        Utilities.arrayCompare(values2, data);
      });
    });
  });

  describe('Test Step ID: 555351', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Asset Detail', 'Risk Models', 'Risk');

    it('Should click on "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click();
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Should select "Barra Global Long-Term Model (GEM3L)" from "Selected" section if not selected', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('Barra Global Long-Term Model (GEM3L)');

      // Verifying if "Barra Global Long-Term Model (GEM3L)" is selected.
      item.isSelected().then(function(selected) {
        if (!selected) {
          item.select();

          // Verifying if "Barra Global Long-Term Model (GEM3L)" is selected.
          item.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"Barra Global Long-Term Model (GEM3L)" is not selected from "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Asset Detail');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Asset Detail');

    it('Should click on "Footnotes" and verifying if "Barra Global Long-Term Model (GEM3L)" is displayed next to "Risk Model Date"', function() {
      ThiefHelpers.getFootnotesClassReference().withFootnotes(function(footnotesRef1) {
        footnotesRef1.forEach(function(footnoteRef) {
          footnoteRef.getText().then(function(text) {
            if (text.indexOf('Risk Model Date') !== -1) {
              var value = text.split(': ')[1].split('|')[0];
              if (value !== 'Barra Global Long-Term Model (GEM3L)') {
                expect(false).customError('"Risk Model Date" should display "Barra Global Long-Term Model (GEM3L)" next to it instead displayed' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555349', function() {

    it('Should click on "Hamburger" icon next to portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to portfolio widget');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Risk_default_Acct2" in the account list menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Risk_default_Acct2').click().then(function() {
        },

        function() {
          expect(false).customError('Unable to select "Risk_default_Acct2" account ');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Asset Detail');

    it('Should click on "Footnotes" and verifying if "NIS US Fundamental Model" is displayed next to "Risk Model Date"', function() {
      ThiefHelpers.getFootnotesClassReference().withFootnotes(function(footnotesRef1) {
        footnotesRef1.forEach(function(footnoteRef) {
          footnoteRef.getText().then(function(text) {
            if (text.indexOf('Risk Model Date') !== -1) {
              var value = text.split(': ')[1].split('|')[0];
              if (value !== 'NIS US Fundamental Model') {
                expect(false).customError('"Risk Model Date" should display "NIS US Fundamental Model" next to it instead displayed' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });

  describe('Test Step ID: 555350', function() {

    // Select Risk Models tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Asset Detail', 'Risk Models', 'Risk');

    it('Verifying if "Defaults Applied" is checked (icon is displayed)', function() {
      // Verifying that "Defaults Applied" checked icon is visible
      DocumentOptions.getDefaultsApplied().element(by.xpath('./i[@data-qa-id="icon-defaults-applied"]')).isDisplayed().then(function(value) {
        if (value !== true) {
          expect(false).customError('"Defaults Applied" checked icon is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "NIS US Fundamental Model" is selected in the selected section and highlighted in ' +
      'yellow color ', function() {
      var item = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getItemByText('NIS US Fundamental Model');

      // Verifying if "NIS US Fundamental Model" is selected.
      item.isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"NIS US Fundamental Model" is not selected from "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "NIS US Fundamental Model" is checked off in selected section', function() {
      // Verifying that text box is set to the value
      var xpath = CommonFunctions.replaceStringInXpath(TileOptionsRiskRiskModels.xpathCheckboxOfElementFromSelected, 'NIS US Fundamental Model');
      ThiefHelpers.getCheckBoxClassReference('undefined', xpath).isChecked().then(function(flag) {
        if (!flag) {
          expect(false).customError('"NIS US Fundamental Model" is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 555352', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Asset Detail');

    it('Should click on "Hamburger" icon next to portfolio widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to portfolio widget');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Risk_default_Acct1" in the account list menu', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Risk_default_Acct1').click().then(function() {
        },

        function() {
          expect(false).customError('Unable to select "Risk_default_Acct1" account ');
          CommonFunctions.takeScreenShot();
        });
    });

    it('Should click on "OK" button', function() {
      PA3MainPage.getOkOrCancelButton('Portfolio', 'OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button');
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Asset Detail');

    it('Should click on "Footnotes" and verifying if "Barra Global Long-Term Model (GEM3L)" is displayed next to "Risk Model Date"', function() {
      ThiefHelpers.getFootnotesClassReference().withFootnotes(function(footnotesRef1) {
        footnotesRef1.forEach(function(footnoteRef) {
          footnoteRef.getText().then(function(text) {
            if (text.indexOf('Risk Model Date') !== -1) {
              var value = text.split(': ')[1].split('|')[0];
              if (value !== 'Barra Global Long-Term Model (GEM3L)') {
                expect(false).customError('"Risk Model Date" should display "Barra Global Long-Term Model (GEM3L)" next to it instead displayed' + value);
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });
    });
  });
});
