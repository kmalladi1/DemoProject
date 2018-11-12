require(__dirname + '/../../index.js');

describe('Test Case: acct-fi-analytics-src', function() {

  describe('Test Step ID: 722554', function() {
    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:;Pa3;Accounts;ACCT_PA_PLM" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('acct-pa-plm');
    });

    it('Should Wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying that "Portfolio" widget is displaying "CLIENT:/PA3/ACCOUNTS/PA_TABS_TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(val) {
        if (val !== 'CLIENT:/PA3/ACCOUNTS/PA_TABS_TEST.ACCT') {
          expect(false).customError('Portfolio widget bax doesnot contain "CLIENT:/PA3/ACCOUNTS/PA_TABS_TEST.ACCT", Found:' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Benchmark" widget is displaying "CLIENT:RUSSELL1000.ACCT"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(val) {
        if (val !== 'CLIENT:RUSSELL1000.ACCT') {
          expect(false).customError('Benchmark widget bax doesnot contain "CLIENT:RUSSELL1000.ACCT", Found:' + val);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722595', function() {

    it('Should click on "Portfolio" hamburger icon', function() {
      ThiefHelpers.getButtonClassReference(undefined, PA3MainPage.getHamburgerIcon('Portfolio')).press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying if Account Drop Down appeared
      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('"Portfolio" Hamburger icon is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "pencil" icon next to "Tests PA tabs" ', function() {
      PA3MainPage.getAccountEditButton('portfolio', 'Tests PA tabs').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that Modify Account New dialog box appeared', function() {
      ModifyAccountNew.isModifyAccountMode().then(function(flag) {
        if (!flag) {
          expect(flag).customError('"Modify Account (New)" mode is not appeared');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "PA|Fixed Income" and select "Analytics Source" from LHP in "Account(New)" page', function() {
      ThiefHelpers.expandAndGetOptionspaneItem(undefined, 'Analytics Source', 'PA|Fixed Income').select();

      //Verifying if "Analytics Source" is selected
      ThiefHelpers.getOptionspaneItem(undefined, 'Analytics Source', 'PA|Fixed Income').isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Analytics Source" is not selected inside "PA|Fixed Income"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the checkbox "Use Pricing Source Hierarchy as Source Order" in "Portfolio" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').check();
    });

    var arr = ['Portfolio', 'Benchmark'];
    var xpathPortfolioOrBenchmarkSection = [ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSections,
      ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkSections,];

    arr.forEach(function(item, index) {
      it('Verifing if "' + item + '" section is disabled', function() {
        element(by.xpath(xpathPortfolioOrBenchmarkSection[index])).getAttribute('Class').then(function(attr) {
          if (attr.indexOf('disabled') < 0) {
            expect(false).customError('"' + item + '" section is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Use Pricing Source Hierarchy as Source Order" checkbox in "Portfolio" section is checked off', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Pricing Source Hierarchy as Source Order').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Pricing Source Hierarchy as Source Order" checkbox is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Use Portfolio Sources For Benchmark" checkbox in "Portfolio" section is "disabled"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').isDisabled().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Portfolio Sources For Benchmark" checkbox is not disabled');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Use Portfolio Sources For Benchmark" checkbox in "Portfolio" section is "unchecked"', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Sources For Benchmark" checkbox is not not unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 722596', function() {

    var arrCheckbox = ['Apply Analytics Overrides', 'Use Pricing Source Hierarchy as Source Order'];

    arrCheckbox.forEach(function(checkbox) {
      it('Should uncheck the checkbox "' + checkbox + '', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).uncheck();
      });

      it('Verifying if "' + checkbox + '" checkbox is unchecked', function() {
        ThiefHelpers.getCheckBoxClassReference(checkbox).isChecked().then(function(boolean) {
          if (boolean) {
            expect(false).customError('"' + checkbox + '" checkbox is not unchecked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should expand "Fixed Income" from "Portfolio" "Available" section', function() {
      ThiefHelpers.expandGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer, 'Fixed Income');
    });

    it('Should click on "Bloomberg Barclays" group source from "Portfolio" "Available" section to highlight it', function() {
      ThiefHelpers.getListboxGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer, 'Fixed Income|Bloomberg Barclays').select();
    });

    it('Should double click on "Bloomberg Barclays" source from "Portfolio" "Available" section to move it to selected section', function() {
      ThiefHelpers.getListboxGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer, 'Fixed Income|Bloomberg Barclays').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    var arrElement = ['BlackRock FI ETFs - FactSet','Bloomberg Barclays', 'Bloomberg Barclays - FactSet','Bloomberg Barclays Cash',
      'Bloomberg Barclays Cash - FactSet', 'Bloomberg Barclays Inflation Linked',
      'Bloomberg Barclays Inflation Linked - FactSet', 'Bloomberg Barclays Muni', 'Bloomberg Barclays Muni - FactSet',];

    arrElement.forEach(function(item) {
      it('Verifying if "' + item + '" is present in "Portfolio" "Selected" section', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, item).getText().then(function(text) {
          if (text !== item) {
            expect(false).customError('"' + item + '" is not shown in the "Portfolio Selected" listbox list; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + item + '" is not found in the "Portfolio Selected" listbox list');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Override Hierarchy" checklist is grayed out', function() {
      element(by.xpath('//*[@data-qa-id="fi-as-override-path-list"]')).getAttribute('Class').then(function(attr) {
        if (attr.indexOf('disabled') < 0) {
          expect(false).customError('"Override Hierarchy" checklist is not grayed out');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722597', function() {

    it('Should double click on "Bloomberg Barclays" to add it from "Portfolio" "Available" section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, 'Bloomberg Barclays')
        .then(function(ref) {
          browser.actions().doubleClick(ref).perform();
        });
    });

    it('Verifying if "Bloomberg Barclays" is removed from "Portfolio" "Selected" section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, 'Bloomberg Barclays')
        .getText().then(function(text) {
        if (text === 'Bloomberg Barclays') {
          expect(false).customError('"\'Bloomberg Barclays\'" is still shown in the selected section of "Portfolios"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError('"\'Bloomberg Barclays\'" is still shown in the selected section of "Portfolios"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Fixed Income|Bloomberg Barclays" from "Portfolio" "Available" section', function() {
      ThiefHelpers.expandGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer,
        'Fixed Income|Bloomberg Barclays', 'Fixed Income');
    });

    it('Verifying if "Bloomberg Barclays" is present under "Fixed Income|Bloomberg Barclays" in "Portfolio' +
      '" "Available" section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer,
        'Bloomberg Barclays', 'Fixed Income|Bloomberg Barclays')
        .getText().then(function(text) {
        if (text !== 'Bloomberg Barclays') {
          expect(false).customError('"Bloomberg Barclays" is not shown in the "Portfolio Available" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"Bloomberg Barclays" is not found in the "Portfolio Available" listbox list');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722598', function() {

    it('Should click on "X" icon to remove all elements from "Portfolio" "Selected" section', function() {
      var transferBox = ThiefHelpers.getTransferBoxReference(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSections);
      transferBox.target.clear();
    });

    var arrElement = ['Bloomberg Barclays', 'Bloomberg Barclays - FactSet','Bloomberg Barclays Cash',
      'Bloomberg Barclays Cash - FactSet', 'Bloomberg Barclays Inflation Linked',
      'Bloomberg Barclays Inflation Linked - FactSet', 'Bloomberg Barclays Muni', 'Bloomberg Barclays Muni - FactSet',];

    arrElement.forEach(function(item) {
      it('Verifying if "' + item + '" is present under "Fixed Income|Bloomberg Barclays" in "Portfolio" "Available" section', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer, item, 'Fixed Income|Bloomberg Barclays')
          .getText().then(function(text) {
          if (text !== item) {
            expect(false).customError('"' + item + '" is not shown in the "Portfolio Available" listbox list inside' +
              ' Fixed Income|Bloomberg Barclays group; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + item + '" is not found in the "Portfolio Available" listbox list inside ' +
              'Fixed Income|Bloomberg Barclays gropup');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if the Portfolio selected section is empty', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer)
        .getChildrenText().then(function(child) {
          if (child.length > 0) {
            expect(false).customError('The Portfolio selected section is not empty. Length is:' + child.length);
            CommonFunctions.takeScreenShot();
          }
        });
    });

  });

  describe('Test Step ID: 722599', function() {

    it('Should clear and enter "Client" in the "Portfolio" search box', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaFixedIncomeAnalyticsSource.getSearchField('Portfolio')).setText('Client');

      // Verifying if "Portfolio" search field is set to "Client"
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaFixedIncomeAnalyticsSource.getSearchField('Portfolio'))
        .getText().then(function(text) {
        if (text !== 'Client') {
          expect(false).customError('"Portfolio" search field is not set to "Client"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var groupname =  [];
    it('Should read all the group names visible in the portfolio available section', function() {
      ThiefHelpers.getListboxClassReference(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer)
        .getChildrenText().then(function(child) {
          child.forEach(function(item) {
            groupname.push(item.text);
          });
        });
    });

    it('Verifying if all the related child item contains a text client in it', function() {
      groupname.forEach(function(groupName) {
        ThiefHelpers.getListboxClassReference(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer)
          .getGroupByText(groupName).getChildrenText().then(function(children) {
          children.forEach(function(child) {
            if (child.text.toLowerCase().indexOf('client') < 0) {
              expect(false).customError('All the child items does not contains "Client" in it. Found: ' + child.text);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

  });

  describe('Test Step ID: 722604', function() {

    it('Should click on "X" icon in the Portfolio Available search box ', function() {
      ThiefHelpers.getTextBoxClassReference(undefined, ModifyAccountPaFixedIncomeAnalyticsSource.getSearchField('Portfolio')).clearText();
    });

    it('Should expand "Client Provided" and select "Client Portfolio" from "Portfolio" "Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer,
        'Client Portfolio', 'Client Provided').select();
    });

    it('Verifying if "Client Portfolio" under "Client Provided" in "Portfolio" "Available" section is selected', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer,
        'Client Portfolio', 'Client Provided')
        .isSelected().then(function(bool) {
        if (!bool) {
          expect(false).customError('"Client Portfolio" under "Client Provided" in "Portfolio"' +
            ' "Available" section is not selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should hold "Shift" key and select "Super Client Security Master" ', function() {
      browser.actions().keyDown(protractor.Key.SHIFT).perform();

      ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioAvailableContainer, 'Super Client Security Master',
        'Client Provided').select();

      browser.actions().keyUp(protractor.Key.SHIFT).perform();
    });

    it('Should click on "Right" arrow in "Portfolio section" ', function() {
      ThiefHelpers.sendElementToSelectedSection(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSections);
    });

    var arrElement = ['Client Portfolio', 'Client Security Master', 'Client Security Master - FactSet',
      'Super Client Security Master',];

    arrElement.forEach(function(item) {
      it('Verifying if "' + item + '" is present in "Portfolio" "Selected" section', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathPortfolioSelectedContainer, item).getText().then(function(text) {
          if (text !== item) {
            expect(false).customError('"' + item + '" is not shown in the "Portfolio Selected" listbox list; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + item + '" is not found in the "Portfolio Selected" listbox list');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 722600', function() {

    it('Should check the checkbox "Use Portfolio Sources For Benchmark" in "Portfolio" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').check();

      //Verifying if "Use Portfolio Sources For Benchmark" checkbox in "Portfolio" section is checked
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Use Portfolio Sources For Benchmark" checkbox in "Portfolio" ' +
            'section is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifing if "Benchmark" section is disabled', function() {
      element(by.xpath(ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkSections)).getAttribute('Class').then(function(attr) {
          if (attr.indexOf('disabled') < 0) {
            expect(false).customError('"' + item + '" section is not disabled');
            CommonFunctions.takeScreenShot();
          }
        });
    });

    it('Verifying if "BlackRock FI ETFs - FactSet" is present in "Benchmark" "Selected" section', function() {
      ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkSelectedContainer, 'BlackRock FI ETFs - FactSet')
        .getText().then(function(text) {
        if (text !== 'BlackRock FI ETFs - FactSet') {
          expect(false).customError('"BlackRock FI ETFs - FactSet" is not shown in the "Benchmark Selected" listbox list; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        if (err.toString().indexOf('No direct child') > 0) {
          expect(false).customError('"BlackRock FI ETFs - FactSet" is not found in the "Benchmark Selected" listbox list');
          CommonFunctions.takeScreenShot();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722601', function() {

    it('Should uncheck the checkbox "Use Portfolio Sources For Benchmark" in "Portfolio" section', function() {
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').uncheck();

      //Verifying if "Use Portfolio Sources For Benchmark" checkbox in "Portfolio" section is unchecked
      ThiefHelpers.getCheckBoxClassReference('Use Portfolio Sources For Benchmark').isChecked().then(function(boolean) {
        if (boolean) {
          expect(false).customError('"Use Portfolio Sources For Benchmark" checkbox in "Portfolio" ' +
            'section is checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Fixed Income" from "Benchmark" "Available" section', function() {
      ThiefHelpers.expandGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkAvailableContainer, 'Fixed Income');
    });

    it('Should click on "ICE BofAML" group source from "Benchmark" "Available" section to highlight it', function() {
      ThiefHelpers.getListboxGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkAvailableContainer,
        'Fixed Income|ICE BofAML').select();
    });

    it('Should double click on "ICE BofAML" source from "Benchmark" "Available" section to move it to selected section', function() {
      ThiefHelpers.getListboxGroup(ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkAvailableContainer,
        'Fixed Income|ICE BofAML').then(function(ref) {
        browser.actions().doubleClick(ref).perform();
      });
    });

    var arrElement = ['BlackRock FI ETFs - FactSet','ICE BofAML', 'ICE BofAML - FactSet'];

    arrElement.forEach(function(item) {
      it('Verifying if "' + item + '" is present in "Benchmark" "Selected" section', function() {
        ThiefHelpers.getListBoxItem(ModifyAccountPaFixedIncomeAnalyticsSource.xpathBenchmarkSelectedContainer, item)
          .getText().then(function(text) {
          if (text !== item) {
            expect(false).customError('"' + item + '" is not shown in the "Benchmark Selected" listbox list; Found: ' + text);
            CommonFunctions.takeScreenShot();
          }
        }, function(err) {

          if (err.toString().indexOf('No direct child') > 0) {
            expect(false).customError('"' + item + '" is not found in the "Benchmark Selected" listbox list');
            CommonFunctions.takeScreenShot();
          } else {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe('Test Step ID: 722602', function() {

    it('Should check the checkbox "Apply Analytics Overrides', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply Analytics Overrides').check();
    });

    it('Verifying if "Apply Analytics Overrides" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply Analytics Overrides').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Apply Analytics Overrides" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrChecklistItem = ['SuperClient','Client','Personal'];
    arrChecklistItem.forEach(function(checklistItem) {
      it('Verifying if the checklist item "' + checklistItem + '" is listed', function() {
        ThiefHelpers.getChecklistClassRef().getItemByText(checklistItem).getText().then(function(text) {
          if (text !== checklistItem) {
            expect(false).customError('the checklist item "' + checklistItem + '" is not listed');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Client" item in the checklist is unchecked ', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Client').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Client" item in the checklist is not unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrChecklist = ['SuperClient','Personal'];
    arrChecklist.forEach(function(item) {
      it('Verifying if "' + item + '" item in the checklist is checked off ', function() {
        ThiefHelpers.getChecklistClassRef().getItemByText(item).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + item + '" item in the checklist is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 722603', function() {

    it('Should Check off "Client" item in the checklist', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Client').toggle();
    });

    it('Should uncheck "Personal" item in the checklist', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Personal').toggle();
    });

    it('Verifying if "Apply Analytics Overrides" checkbox is checked', function() {
      ThiefHelpers.getCheckBoxClassReference('Apply Analytics Overrides').isChecked().then(function(boolean) {
        if (!boolean) {
          expect(false).customError('"Apply Analytics Overrides" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrchecklist = ['SuperClient', 'Client'];
    arrchecklist.forEach(function(item) {
      it('Verifying if "' + item + '" item in the checklist is checked ', function() {
        ThiefHelpers.getChecklistClassRef().getItemByText(item).isChecked().then(function(checked) {
          if (!checked) {
            expect(false).customError('"' + item + '" item in the checklist is not checked');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Verifying if "Personal" item in the checklist is unchecked ', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Personal').isChecked().then(function(checked) {
        if (checked) {
          expect(false).customError('"Personal" item in the checklist is not unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 722557', function() {

    it('Should click on "Cancel" button to close the "Modify Account(New)" dailog', function() {
      ThiefHelpers.clickOnButton('Cancel');
    });

  });

});
