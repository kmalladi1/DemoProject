require(__dirname + '/../../../index.js');

describe('Test Case: fi-acct-setting', function() {

  describe('Test Step ID: 697993', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;pa3;accounts;FI_Acct_settings"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('fi-acct-settings');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying the "Weights Report" calculates for "CLIENT:/PA3/ACCOUNTS/FI_SETTINGS_TEST.ACCT" in "Portfolio" widget', function() {
      // Verifying value "CLIENT:/PA3/ACCOUNTS/FI_SETTINGS_TEST.ACCT" in the "Portfolio" widget
      ThiefHelpers.getTextBoxClassReference('Portfolio', PA3MainPage.xpathPortfolioWidget).getText().then(function(value) {
        if (value !== 'CLIENT:/PA3/ACCOUNTS/FI_SETTINGS_TEST.ACCT') {
          expect(false).customError('"CLIENT:/PA3/ACCOUNTS/FI_SETTINGS_TEST.ACCT" is not displayed. Found ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying the "Weights Report" calculates for "LFI:LHMN0001" in "Benchmark" widget', function() {
      // Verifying value "LFI:LHMN0001" in the "Benchmark" widget
      ThiefHelpers.getTextBoxClassReference('Benchmark', PA3MainPage.xpathBenchmarkWidget).getText().then(function(value) {
        if (value !== 'LFI:LHMN0001') {
          expect(false).customError('"LFI:LHMN0001" is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 697997', function() {

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Should click on the "Analytics Sources" in "Fixed Income"', function() {
      //Clicking on Analytics Pill in Fixed income tab
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if Analytics pill is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" is not selected in "Fixed income tab"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrCheckbox = ['Client', 'Use Portfolio Sources For Benchmark'];
    it('Verifying if the ' + arrCheckbox + ' checkboxes are checked', function() {
      arrCheckbox.forEach(function(checkboxName) {
        ThiefHelpers.getCheckBoxClassReference(checkboxName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError(checkboxName + ' checkbox is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "' + arrCheckbox + '" check box is disabled', function() {
      arrCheckbox.forEach(function(checkboxName) {
        ThiefHelpers.getCheckBoxClassReference(checkboxName).isDisabled().then(function(flag) {
          if (!flag) {
            expect(false).customError(checkboxName + ' check box is enabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Use Pricing Source Hierarchy as Source Order" is checked and enabled', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Use Pricing Source Hierarchy as Source Order" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });

      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').isDisabled().then(function(flag) {
        if (flag) {
          expect(false).customError('"Use Pricing Source Hierarchy as Source Order" check box is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var sections = ['portfolio', 'benchmark'];
    it('Verifying if Portfolio and Benchmark Available sections are disabled', function() {
      sections.forEach(function(sectionName) {
        var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioOrBenchmarkAvailableSection, sectionName);
        (element(by.xpath(xpath))).getAttribute('class').then(function(value) {
          if (value.indexOf('disabled') === -1) {
            expect(false).customError(sectionName + ' Available section is enabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Restore Defaults" button is displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Restore Defaults" button is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 697999', function() {

    it('Should click on the "Analytics" in "Fixed Income"', function() {
      //Clicking on Analytics Pill in Fixed income tab
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics', 'Fixed Income').select();

      // Verifying if Analytics pill is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics" is not selected in "Fixed income tab"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying if "Reference Curve" dropdown displays "LIBOR"', function() {
      ThiefHelpers.getDropDownSelectClassReference('Reference Curve:').getSelectedText().then(function(selectedElement) {
        if (selectedElement !== 'LIBOR') {
          expect(false).customError('"LIBOR" is not displayed in the "Reference Curve:" drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCheckListItems = ['1 Month', '6 Month', '2 Year', '4 Year'];
    var screenShot = 0;
    it('Verifying if "' + arrCheckListItems + '" are checked under "Partial Duration Points:"', function() {
      arrCheckListItems.forEach(function(itemName) {
        ThiefHelpers.getCheckBoxClassReference(itemName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + itemName + '" is not checked under "Partial Duration Points:"');
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it('Verifying if "' + arrCheckListItems + '" are enabled under "Partial Duration Points:"', function() {
      arrCheckListItems.forEach(function(itemName) {
        ThiefHelpers.getCheckBoxClassReference(itemName).isDisabled().then(function(disabled) {
          if (disabled) {
            expect(false).customError('"' + itemName + '" is disabled under "Partial Duration Points:"');
            screenShot++;
            if (screenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    var arrDropdown = [{name: 'Mixed Currency Options:', value: 'Show per Currency'},
      {name: 'Analytics for Forwards:', value: 'Include Analytics'}, {
        name: 'Analytics for Lot-Level Detail:',
        value: 'Use Security-Level Data',
      },];

    arrDropdown.forEach(function(dropdown) {
      it('Verifying if ' + dropdown.name + ' contains ' + dropdown.value, function() {
        ThiefHelpers.getDropDownSelectClassReference(dropdown.name).getSelectedText().then(function(selectedElement) {
          if (selectedElement !== dropdown.value) {
            expect(false).customError(dropdown.value + 'is not displayed on ' + dropdown.name);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698003', function() {

    it('Should click on the "Attribution" in "Fixed Income"', function() {
      //Clicking on Attribution Pill in Fixed income tab
      ThiefHelpers.getOptionspaneItem(undefined, 'Attribution', 'Fixed Income').select();

      // Verifying if Attribution pill is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Attribution', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Attribution" is not selected in "Fixed income tab"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrDropdown = [{name: 'Shift Point:', value: 'Portfolio'}, {name: 'Treat Cash Return as:', value: 'Price Return'}];

    arrDropdown.forEach(function(dropDown) {
      it('Verifying if "' + dropDown.name + '" dropdown displays "' + dropDown.value + '" in the Attribution tab', function() {
        ThiefHelpers.getDropDownSelectClassReference(dropDown.name).getSelectedText().then(function(selectedElement) {
          if (selectedElement !== dropDown.value) {
            expect(false).customError('"' + dropDown.value + '" is not displayed in the "' + dropDown.name + '" drop down. Found: "' + selectedElement + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verify if "Effective" is displayed in "Duration:" drop-dwon', function() {
      ThiefHelpers.verifySelectedDropDownText('Effective', undefined, DocumentOptionsFixedIncomeAttribution.xpathOfDurationDropdown);
    });

    it('Verifying if "Portfolio Effective Duration" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Portfolio Effective Duration').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Portfolio Effective Duration" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Expand Partial Twist" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Expand Partial Twist').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Expand Partial Twist" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the "Expand Partial Twist" checkbox is enabled', function() {
      ThiefHelpers.getCheckBoxClassReference('Expand Partial Twist').isDisabled().then(function(disabled) {
        if (disabled) {
          expect(false).customError('"Expand Partial Twist" checkbox is disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698011', function() {

    // Click on "Cancel" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Document options');

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Weights', 'Options');

    it('Should click on the " Scenarios and Cash Flows " in Tile Options view', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Scenarios and Cash Flows').select();

      ThiefHelpers.getOptionspaneItem(undefined, 'Scenarios and Cash Flows').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Scenarios and Cash Flows" is not selected in Tile Options view');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    var arrListItems = ['1', '3', '5'];
    it('Verifying if Horizon Months: dialog displays 1,3 and 5 ', function() {
      ThiefHelpers.getListboxClassReference(TileOptionsScenariosAndCashFlows.xpathHorizonListBox).getChildrenText().then(function(children) {
        children.forEach(function(child) {
          if (arrListItems.indexOf(child.text) === -1) {
            expect(false).customError(child.text + ' is not present int the Horizon Months: dialog');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Custom" radio button is selected', function() {
      ThiefHelpers.getRadioClassReference('Custom').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Custom" radio button is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrCheckBoxes = ['Daily', 'Weekly', 'Use Actual Frequency'];
    it('Verifying if "' + arrCheckBoxes + '" are checked', function() {
      arrCheckBoxes.forEach(function(checkboxName) {
        ThiefHelpers.getCheckBoxClassReference(checkboxName).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError(checkboxName + ' checkbox is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var arrTextBox = [{name: 'Daily', value: '1'}, {name: 'Weekly', value: '2'}];

    arrTextBox.forEach(function(textBox) {
      it('Verifying the "' + textBox.name + '" text box shows "' + textBox.value + '"', function() {
        // Getting the xpath of the text box
        var xpath = CommonFunctions.replaceStringInXpath(TileOptionsScenariosAndCashFlows.xpathFrequenciesTextbox, textBox.name);
        ThiefHelpers.getTextBoxClassReference(undefined, xpath).getText().then(function(value) {
          if (value !== textBox.value) {
            expect(false).customError('"' + textBox.name + '" text box is not showing "' + textBox.value + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying that "Defaults Applied" button is displayed', function() {
      DocumentOptions.getDefaultsApplied().isPresent().then(function(option) {
        if (!option) {
          expect(false).customError('"Defaults Applied" button is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698012', function() {

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options');

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Should click on the "Analytics Sources" in "Fixed Income"', function() {
      //Clicking on Analytics Pill in Fixed income tab
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if Analytics pill is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" is not selected in "Fixed income tab"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Should uncheck "Use Pricing Source Hierarchy as Source Order"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').uncheck();

      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Use Pricing Source Hierarchy as Source Order" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should double click on "Client Provided | Client Security Master" option under Portfolio Available section', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'available');
      ThiefHelpers.expandGroup(xpath, 'Client Provided', undefined, 'listbox');

      browser.actions().doubleClick(DocumentOptionsFixedIncomeAnalyticsSource.getElement('Client Security Master', 'Available', 'Portfolio', 'Client Provided'))
        .perform();
    });

    it('Verify that "Client Provided" is added to the Portfolio selected section.', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'selected');

      ThiefHelpers.getListBoxItem(xpath, 'Client Security Master').getText().then(function(text) {
        if (text !== 'Client Security Master') {
          expect(false).customError('"Client Security Master" is not shown in the "Selected" container of "Portfolio" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Security Master" is not found in the "Selected" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that "Restore Defaults" button is displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Restore Defaults" button is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 698020', function() {

    // Click on "OK" button of header and verify if "Document options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document options');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Should type "FI_SCENARIO.ACCT" into "Portfolio" widget and select "TEST.ACCT | Client:/pa3/" from type ahead', function() {
      PA3MainPage.setPortfolio('FI_SCENARIO.ACCT', 'FI_SCENARIO.ACCT | Client:/pa3/', 'Client:/pa3/FI_SCENARIO.ACCT').then(function(option) {
        if (!option) {
          expect(false).customError('Not able to Type "FI_SCENARIO.ACCT" into "Portfolio" ' +
            'widget and select "FI_SCENARIO.ACCT | Client:/pa3/" from type ahead');
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Should click on the "Analytics Sources" in "Fixed Income"', function() {
      //Clicking on Analytics Pill in Fixed income tab
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').select();

      // Verifying if Analytics pill is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Sources', 'Fixed Income').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Analytics Sources" is not selected in "Fixed income tab"');
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verify if "Use Pricing Source Hierarchy as Source Order" is unchecked', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Use Pricing Source Hierarchy as Source Order" checkbox is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Client Provided" is added to the Portfolio selected section.', function() {
      var xpath = CommonFunctions.replaceStringInXpath(DocumentOptionsFixedIncomeAnalyticsSource.xpathPortfolioAvailableOrSelectedSection, 'selected');

      ThiefHelpers.getListBoxItem(xpath, 'Client Security Master').getText().then(function(text) {
        if (text !== 'Client Security Master') {
          expect(false).customError('"Client Security Master" is not shown in the "Selected" container of "Portfolio" section;Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Client Security Master" is not found in the "Selected" container of "Portfolio" section');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

    });

    it('Verifying that "Restore Defaults" button is displayed', function() {
      DocumentOptions.getRestoreDefaultsButton().isPresent().then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Restore Defaults" button is not displayed.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
