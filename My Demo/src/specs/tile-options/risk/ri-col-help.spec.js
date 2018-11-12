'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-col-help', function() {

  // Getting the xpath of the Available section
  var xpathOfAvailableSection = CommonFunctions.replaceStringInXpath(TileOptionsColumns.xpathOfSelectedOrAvailableSection, 'Available');

  describe('Test Step ID: Startup Instructions', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

  });

  describe('Test Step ID: 697982', function() {

    it('Should open PA3 Application with "Exclusions_UI_Risk_Factors" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('exclusions-ui-risk-factors');
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

  });

  describe('Test Step ID: 697983 ', function() {

    it('Should select "Risk Attribution" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('REPORTS', 'Attribution', 'Risk Attribution').then(function(reportRef) {
        reportRef.click().then(function() {
        }, function() {

          expect(false).customError('Unable to select "Risk Attribution" from LHP');
          CommonFunctions.takeScreenShot();
        });
      });
    });

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Attribution Detail Chart');

    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Risk Attribution Detail Chart', 'Options');

    it('Verifying if view changed to "Tile Options - Risk Attribution Detail Chart"', function() {
      ThiefHelpers.isModeBannerDisplayed('Tile Options - Risk Attribution Detail Chart').then(function(found) {
        if (!found) {
          expect(false).customError('View if not changed to "Tile Options - Risk Attribution Detail Chart".');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 697985 ', function() {

    it('Should select "Columns" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Columns').select();

      // Verifying if "Columns" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Columns').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Columns" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "risk factors effect model" in the avaialble section search filed', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('risk factors effect model');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'risk factors effect model') {
          expect(false).customError('Text in search field is not "risk factors effect model"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "i" icon for "Copy of Iraq War (3/2003) - Sim"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Risk Factors Effect Model Std Dev ‒ Risk-Based Attribution').then(function(item) {
            item.getIcons().then(function(icons) {
              icons.clickIcon('info');
            });
          });
        } else {
          expect(false).customError('"FactSet" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrTabNames = ['Description', 'Formula'];
    it('Verifying if 2 tabs is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
    });

    it('Verify if "Description" tab is selected by default', function() {
      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Description') {
          expect(false).customError('"Description" tab is not selected by default. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Risk Factors Effect Model Std Dev', 'The factor risk (which is an annual variance) is made into a monthly (daily) standard deviation by dividing the number by 12 months (252 days) and taking the square root.');

  });

  describe('Test Step ID: 705268 ', function() {

    it('Enter "Risk Factors Effect T-stat" in the avaialble section search filed', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('Risk Factors Effect T-stat');

      //Verifying the text in search field
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
        if (value !== 'Risk Factors Effect T-stat') {
          expect(false).customError('Text in search field is not "Risk Factors Effect T-stat"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "i" icon for "Risk Factors Effect  T-stat - Risk Based Attribution"', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
      group.expand();
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Risk Factors Effect  T-stat - Risk Based Attribution').then(function(item) {
            item.getIcons().then(function(icons) {
              icons.clickIcon('info');
            });
          });
        } else {
          expect(false).customError('"Factset" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrTabNames = ['Description', 'Formula'];
    it('Verifying if 2 tabs is displayed', function() {
      CommonPageObjectsForPA3.verifyIfExpectedTabsAreDisplayed(2, arrTabNames);
    });

    it('Verify if "Description" tab is selected by default', function() {
      ThiefHelpers.getTabsClassReference().getSelectedTabText().getText().then(function(tabName) {
        if (tabName !== 'Description') {
          expect(false).customError('"Description" tab is not selected by default. Found:"' + tabName + '".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // verify the style of title and content
    CommonPageObjectsForPA3.verifyIfTitleIsBoldAndExpectedContent('Risk Factors Effect T-Stat', '(Average Return - 0) / (Model Standard Deviation / Square Root of the number of periods)\nThis calculation tests whether the average return is statistically different than zero.');

  });

  describe('Test Step ID: 697995 ', function() {

    var arrAvailEle = ['Risk Factors Effect Model Std Dev - Risk Based Attribution', 'Risk Factors Effect T-stat - Risk Based Attribution'];
    arrAvailEle.forEach(function(ele) {

      it('Should enter "' + ele + '" in the avaialble section search filed', function() {
        ThiefHelpers.getTextBoxClassReference('Available').setText(ele);

        //Verifying the text in search field
        ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(value) {
          if (value !== ele) {
            expect(false).customError('Text in search field is not "' + ele + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should select "' + ele + '" from search results', function() {
        var group = ThiefHelpers.getVirtualListboxClassReference(xpathOfAvailableSection).getGroupByText('FactSet');
        group.expand();
        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getItemByText(ele).then(function(item) {
              item.select();
            });
          } else {
            expect(false).customError('"Factset" group was not expanded.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Should click on right arrow button to move "Axioma US Fundamental Equity Risk Model MH 2" to selected section', function() {
        ThiefHelpers.sendElementToSelectedSection();
      });

    });

    it('Should click on the "Risk Models" tab under "Risk" category on the LHP on tile options', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should expand "Barra" from the Available container and click "Barra Global Long-Term Model (GEM3L)" from the available section', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathAvailableContainer).getGroupByText('Barra');
      group.expand();

      // Verifying if "Barra" is expanding
      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getItemByText('Barra Global Long-Term Model (GEM3L)').then(function(element) {
            element.select();

            element.isSelected().then(function(selected) {
              if (!selected) {
                expect(false).customError('"Barra Global Long-Term Model (GEM3L)" is not selected');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Barra" group was not expanded.');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    it('Should click on right arrow button to move "Barra Global Long-Term Model (GEM3L)" to selected section', function() {
      ThiefHelpers.sendElementToSelectedSection(TileOptionsRiskRiskModels.xpathTransferBox);
    });

    it('Verifying if "Barra Global Long-Term Model (GEM3L)" is added to Selected section', function() {
      var myArray = [];
      var children = ThiefHelpers.getVirtualListboxClassReference(TileOptionsRiskRiskModels.xpathSelectedContainer).getChildrenText();
      children.then(function(childArr) {
        for (var i = 0; i < childArr.length; ++i) {
          myArray.push(childArr[i].text);
        }

        if (myArray.indexOf('Barra Global Long-Term Model (GEM3L)') === -1) {
          expect(false).customError('"Barra Global Long-Term Model (GEM3L)" is not added to selected section.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Attribution Detail Chart');

    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Attribution Detail Chart');

  });

  var verifyAuditColumnSectionValues = function(colSectionValue, colName) {

    it('Should right click on "Risk Factors Effect t-stat" column value and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Risk Attribution Detail Chart', 'Communications', '', colName).then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that Column Help section is displayed with data "' + colSectionValue + '"', function() {
      element(by.xpath(AuditMode.columnHelpSectionData)).getText().then(function(value) {
        if (value !== colSectionValue) {
          expect(false).customError('Column Help section is displayed with expected text, Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  };

  describe('Test Step ID: 697998 ', function() {
    var colSecValue = 'Risk Factors Effect T-stat\n(Average Return - 0) / (Model Standard Deviation / Square Root of the number of periods)\nThis calculation tests whether the average return is statistically different than zero.';
    verifyAuditColumnSectionValues(colSecValue, 'Risk Factors Effect T-Stat');
  });

  describe('Test Step ID: 705269 ', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    var colSecValue = 'Risk Factors Effect Model Std Deviation\nThe factor risk (which is an annual variance) is made into a monthly (daily) standard deviation by dividing the number by 12 months (252 days) and taking the square root.';
    verifyAuditColumnSectionValues(colSecValue, 'Risk Factors Effect Model Std Dev');

  });

});
