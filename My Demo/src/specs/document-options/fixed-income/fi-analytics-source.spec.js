'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: fi-analytics-source', function() {

  // Variables
  var arrayClientProvidedOptions;
  var arrayOptions;
  describe('Test Step ID: 541837', function() {

    // Open default document and un-check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(false);

    it('Should open PA3 Application with "Client:/Pa3/Automation/auto_doc_fi"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('auto-doc-fi');
    });

  });

  describe('Test Step ID: 541829', function() {

    // Select Analytics Sources tab from Document options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Analytics Sources', 'Fixed Income', 'Document Options');

  });

  describe('Test Step ID: 541830', function() {

    it('Should select the checkbox next to "Use Pricing Tab Hierarchy as Source Order"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Tab Hierarchy as Source Order').check();

      // Verify that the checkbox is selected
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Tab Hierarchy as Source Order').isChecked().then(function(bool) {
        if (!bool) {
          expect(false).customError('The checkbox next to "Use Pricing Tab Hierarchy as Source Order" is not checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the options under the Portfolio are grayed out.', function() {
      expect(DocumentOptionsFixedIncomeAnalyticsSource.getPortfolioSection().getAttribute('disabled')).toBeTruthy();
    });

    it('Verify that the options under the Benchmark are grayed out.', function() {
      expect(DocumentOptionsFixedIncomeAnalyticsSource.getBenchmarkSection().getAttribute('disabled')).toBeTruthy();
    });

  });

  describe('Test Step ID: 541831', function() {

    it('Should un-check the checkbox next to "Use Pricing Tab Hierarchy as Source Order"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Tab Hierarchy as Source Order').uncheck();

      // Verify that the checkbox is selected
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Tab Hierarchy as Source Order').isChecked().then(function(bool) {
        if (bool) {
          expect(false).customError('The checkbox next to "Use Pricing Tab Hierarchy as Source Order" is still checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should un-check the checkbox next to "Use Portfolio Analytics Sources for Benchmark"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Analytics Sources for Benchmark').uncheck();

      // Verify that the checkbox is selected
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Analytics Sources for Benchmark').isChecked().then(function(bool) {
        if (bool) {
          expect(false).customError('The checkbox next to "Use Portfolio Analytics Sources for Benchmark" is still checked off');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that the options under the Portfolio are enabled.', function() {
      expect(DocumentOptionsFixedIncomeAnalyticsSource.getPortfolioSection().getAttribute('disabled')).toBeFalsy();
    });

    it('Verify that the options under the Benchmark are enabled.', function() {
      expect(DocumentOptionsFixedIncomeAnalyticsSource.getBenchmarkSection().getAttribute('disabled')).toBeFalsy();
    });

  });

  describe('Test Step ID: 541832', function() {

    it('Should select "Client Provided" option under Portfolio Available section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'available');
      ThiefHelpers.getListboxGroup(xpath, 'Client Provided').select();
    });

    it('Should click on "Right Arrow" icon to add "Client Provided" to "Selected" pane', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioTransferbox);
    });

    it('Verify that the options under "Client Provided" are added to the Portfolio selected section.', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'selected');

      // Creating array for options under 'Client Provided'
      arrayClientProvidedOptions = ['Client Security Master', 'Client Security Master - FactSet', 'Super Client Security Master',
        'Super Client Security Master - FactSet',];
      arrayClientProvidedOptions.forEach(function(option) {
        ThiefHelpers.getListBoxItem(xpath, option).getText().then(function(text) {
          if (text !== option) {
            expect(false).customError('' + option + '" is not shown in the "Selected" container of "Portfolio" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + option + '" is not found in the "Selected" container of "Portfolio" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });

      });
    });

    it('Verify that "Client Provided" is removed from Portfolio "Available" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'available');

      ThiefHelpers.getListboxGroup(xpath, 'Client Provided').getText().then(function(text) {
        if (text === 'Client Provided') {
          expect(false).customError('"Client Provided" is still shown in the "Available" container of "PRICES"' +
            ' section;Found: ' + text);
          CommonFunctions.takeScreenShot();

        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Client Provided" is still found in the "available" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 541833', function() {

    it('Should select "Client Provided" option under Benchmark Available section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'available');
      ThiefHelpers.getListboxGroup(xpath, 'Client Provided').select();
    });

    it('Should click on "Right Arrow" icon to add "Client Provided" to "Selected" pane', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkTransferbox);
    });

    it('Verify that the options under "Client Provided" are added to the Benchmark selected section.', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'selected');

      // Creating array for options under 'Client Provided'
      arrayClientProvidedOptions = ['Client Portfolio', 'Client Security Master', 'Client Security Master - FactSet',
        'Super Client Security Master', 'Super Client Security Master - FactSet',];
      arrayClientProvidedOptions.forEach(function(option) {
        ThiefHelpers.getListBoxItem(xpath, option).getText().then(function(text) {
          if (text !== option) {
            expect(false).customError('' + option + '" is not shown in the "Selected" container of "Benchmarks" section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + option + '" is not found in the "Selected" container of "Benchmarks" section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify that "Client Provided" is removed from Benchmarks "Available" section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'available');

      ThiefHelpers.getListboxGroup(xpath, 'Client Provided').getText().then(function(text) {
        if (text === 'Client Provided') {
          expect(false).customError('"Client Provided" is still shown in the "Available" container of "Benchmarks"' +
            ' section;Found: ' + text);
          CommonFunctions.takeScreenShot();

        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Client Provided" is still found in the "available" container of "Benchmarks" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 541834', function() {

    arrayOptions = ['Client Security Master', 'Client Security Master - FactSet', 'Super Client Security Master'];
    arrayOptions.forEach(function(option) {

      var xpathSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'selected');
      it('Should click on "' + option + '" from Portfolio\'s selected section to select it', function() {
        ThiefHelpers.getListBoxItem(xpathSelectedSection, option).select();
      });

      it('Should click on "Left Arrow" to move "' + option + '" to Available section', function() {
        ThiefHelpers.sendElementToAvailableSection(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioTransferbox);
      });

      it('Verify that "' + option + '" is removed from selected section', function() {
        ThiefHelpers.getListBoxItem(xpathSelectedSection, option).getText().then(function(text) {
          if (text === option) {
            expect(false).customError('"' + option + '" is still shown in the "selected" container of "Portfolio"' +
              ' section;Found: ' + text);
            CommonFunctions.takeScreenShot();

          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(true).toBeTruthy();
          } else {
            expect(false).customError('"' + option + '" is still found in the "selected" container of "Portfolio" section');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    var xpathAvailableSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'Available');
    it('Expand "Client Provided" to see if the options are added', function() {
      // Expand 'Client Provided' to see if options are added
      ThiefHelpers.expandGroup(xpathAvailableSection, 'Client Provided', undefined, 'Listbox');
    });

    arrayOptions.forEach(function(option) {
      it('Verify that "' + option + '" is added back to Available section', function() {
        // Verify that options under are added back to Available section
        ThiefHelpers.getListBoxItem(xpathAvailableSection, option, 'Client Provided').getText().then(function(text) {
          if (text !== option) {
            expect(false).customError('"' + option + '" is not added back to available section;Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + option + '" is not added back to available section');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 541835', function() {

    var xpathSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'selected');

    it('Should click to select "Client Portfolio" from Benchmark selected', function() {
      ThiefHelpers.getListBoxItem(xpathSelectedSection, 'Client Portfolio', undefined).select();

      // Verifying if "Client Portfolio" is selected
      ThiefHelpers.getListBoxItem(xpathSelectedSection, 'Client Portfolio', undefined).isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Client Portfolio" is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "Left Arrow" icon to add "Client Provided" to "Selected" pane', function() {
      ThiefHelpers.sendElementToAvailableSection(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkTransferbox);
    });

    it('Verify that "Client Portfolio" is removed from Benchmark selected section', function() {
      ThiefHelpers.getListBoxItem(xpathSelectedSection, 'Client Portfolio', undefined).getText().then(function(text) {
        if (text === 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" is not removed from selected section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"Client Portfolio" is still found in the "Selected" container of "Benchmark" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Client Portfolio" inside "Client Provided" is added back "Available" section', function() {
      var xpathAvailableSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathBenchmarkAvailableOrSelectedSection, 'Available');

      ThiefHelpers.expandAndGetListBoxItem(xpathAvailableSection, 'Client Portfolio', 'Client Provided')
        .getText().then(function(text) {
        if (text !== 'Client Portfolio') {
          expect(false).customError('"Client Portfolio" inside "Client provided" is not added back to available ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Portfolio" inside "Client Provided" is not added back to available section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 541836', function() {

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

  });

  describe('Test Step ID: 721239', function() {

    it('Should open PA3 Application with "Client:;pa3;Fixed_income;MSLPORT_ANLT_SRC_ISS"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('mslport-anlt-src-iss');
    });

    it('Verifying if calculated data for "Ratings Distribution" report appeared blank', function() {
      // Verifying that the "Ratings Distribution" report is calculated
      PA3MainPage.isReportCalculated('Ratings Distribution').then(function(option) {
        if (option) {
          expect(false).customError('Calculated data for "Ratings Distribution" report appeared');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'NoSuchElementError') {
          expect(true).customError('');
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

  describe('Test Step ID: 721240', function() {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Ratings Distribution', 'Analytics Sources', 'Fixed Income', 'Document Options');

    it('Should enter "MSL_CL" into the search filed in "Available" section', function() {
      var xpathSearchBox = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioOrBenchmarkSearchBox, 'Portfolio');
      ThiefHelpers.getTextBoxClassReference(undefined, xpathSearchBox).setText('MSL_CL');

      // Verifying that "MSL_CL" is typed into the search field
      ThiefHelpers.getTextBoxClassReference(undefined, xpathSearchBox).getText().then(function(text) {
        if (text !== 'MSL_CL') {
          expect(false).customError('"MSL_CL" is not typed into the search field.');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the element to load
      browser.sleep(2000);
    });

    var xpathPortfolioAvailableSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource
      .xpathPortfolioAvailableOrSelectedSection, 'Available');
    var xpathPortfolioSelectedSection = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'selected');

    it('Should select "MSL_CL5_EOD - FactSet" option under Portfolio Available section', function() {
      ThiefHelpers.getListBoxItem(xpathPortfolioAvailableSection, 'MSL_CL5_EOD - FactSet', 'Additional Security Masters', true).select().then(function() {
      }, function(error) {
        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should click on "Right Arrow" icon to add "MSL_CL5_EOD - FactSet" to "Selected" pane', function() {
      ThiefHelpers.sendElementToSelectedSection(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioTransferbox);
    });

    it('Verify that "MSL_CL5_EOD - FactSet" is added to the Portfolio selected section.', function() {
      ThiefHelpers.getListBoxItem(xpathPortfolioSelectedSection, 'MSL_CL5_EOD - FactSet').getText().then(function(text) {
        if (text !== 'MSL_CL5_EOD - FactSet') {
          expect(false).customError('"MSL_CL5_EOD - FactSet" is not shown in the "Selected" container of "Portfolio" ' +
            'section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Restore Defaults" button', function() {
      DocumentOptions.getRestoreDefaultsButton().click();
    });

    CommonPageObjectsForPA3.verifyAndClickOnButtonFromDialogBox('Factset Research Systems', 'OK', 'Do you want to replace your current settings with the account defaults?');

    it('Verify that "MSL_CL5_EOD - FactSet" is removed from Portfolio selected section.', function() {
      ThiefHelpers.getListBoxItem(xpathPortfolioSelectedSection, 'MSL_CL5_EOD - FactSet').getText().then(function(text) {
        if (text === 'MSL_CL5_EOD - FactSet') {
          expect(false).customError('"MSL_CL5_EOD - FactSet" is present in the "Selected" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {
        if (error.name === 'NoSuchElementError') {
          expect(true).customError('');
        }
      });
    });

    it('Verify that "MSL_CL5_EOD - FactSet" is present and selected in Portfolio Available section.', function() {
      var item = ThiefHelpers.getListBoxItem(xpathPortfolioAvailableSection, 'MSL_CL5_EOD - FactSet',
        'Additional Security Masters', true);
      item.getText().then(function(text) {
        if (text === 'MSL_CL5_EOD - FactSet') {
          item.isSelected().then(function(selected) {
            if (!selected) {
              expect(false).customError('"MSL_CL5_EOD - FactSet" is not selected in the Available section.');
              CommonFunctions.takeScreenShot();
            }
          });
        } else {
          expect(false).customError('"MSL_CL5_EOD - FactSet" is not present in the Available section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
