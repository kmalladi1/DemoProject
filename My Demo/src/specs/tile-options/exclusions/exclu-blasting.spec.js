'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: exclu-blasting', function() {
  // Variable(s)
  var csAvgVal;
  var arrCalculatedReportElementsFromWebPage = [];
  var portfolioBox;
  var xpathAvailableVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'available');
  var xpathSelectedVirtualListBox = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfSelectedOrAvailableSection, 'selected');

  var verify = function() {
    var flag = 0;
    it('Elements of "Available" section should match to elements of calculated report from web page', function() {
      var arrEle = [];
      ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getChildrenText().then(function(ele) {
        ele.forEach(function(element) {
          arrEle.push(element.text);
        });
      }).then(function() {
        arrCalculatedReportElementsFromWebPage.forEach(function(val) {
          if (arrEle.indexOf(val) < 0) {
            console.log(element);
            flag = flag + 1;
            expect(false).customError(val + ' is not found in the Available section');
            if (flag === 1) {
              CommonFunctions.takeScreenShot();
            }
          }
        });

      });
    });

    it('Verifying if "Finance" present under "Economic Sector > Industry" tree of "Selected" container', function() {
      ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
        if (columnName[0].text !== 'Finance') {
          expect(false).customError('"Finance" is not added to "Selected" section');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Defaults Applied" is checked by default', function() {
      TileOptions.getDefaultsApplied().isDisplayed().then(function(isFound) {
        if (!isFound) {
          expect(false).customError('"Defaults Applied" button is checked by default');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });
  };

  describe('Test Step ID: 544888', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "Client:default_doc_OLD" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-old');
    });

    it('Should launch the PA3 application with "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Should verify that "Portfolio" widget shows "CLIENT:/PA3/TEST.ACCT"', function() {
      PA3MainPage.getWidgetBox('Portfolio').getAttribute('value').then(function(path) {
        if (path !== 'CLIENT:/PA3/TEST.ACCT') {
          expect(false).customError('"Portfolio" is not set to "CLIENT:/PA3/TEST.ACCT". ' +
            'Expected: "CLIENT:/PA3/TEST.ACCT" but Found: "' + path + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify that "Benchmark" widget shows "RUSSELL:1000"', function() {
      PA3MainPage.getWidgetBox('Benchmark').getAttribute('value').then(function(name) {
        if (name !== 'RUSSELL:1000') {
          expect(false).customError('"Benchmark" is not set to "RUSSELL:1000".' +
            'Expected: "RUSSELL:1000" but Found: "' + name + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 544899', function() {

    it('Collect all the grouping elements into an array', function() {
      PA3MainPage.getAllElementFromSpecifiedLevelOfCalculatedReport('Weights', 1).each(function(ele, index) {
        ele.getText().then(function(text) {
          arrCalculatedReportElementsFromWebPage[index] = text;
        });
      });
      CommonFunctions.captureScreenShot();
    });

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Should click on "Apply To Weights" button', function() {
      ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
      }, function() {
        expect(false).customError('Unable to click on "Apply To Weights" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying if "Blasting" widget is opened', function() {
      ThiefHelpers.isPresent(undefined, undefined, TileOptions.xpathBlastingPannel).then(function(blastWindow) {
        if (!blastWindow) {
          expect(false).customError('"Blasting" widget is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check "Contribution" item under "Weights" group in "Blasting" menu', function() {
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution').toggle();
    });

    it('Verifying if "Contribution" item under "Weights" group in "Blasting" menu is checked off', function() {
      // Verifying if the checkbox is checked
      ThiefHelpers.getChecklistClassRef().getItemByText('Contribution').isChecked().then(function(checked) {
        if (!checked) {
          expect(false).customError('"Contribution" item under "Weights" group in "Blasting" menu is unchecked');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    verify();
  });

  describe('Test Step ID: 759981', function() {

    it('Should click on "OK" button from blasting window', function() {
      TileOptionsGroupings.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "OK" button from blasting window');
        CommonFunctions.takeScreenShot();
      });
    });

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnReportWrenchIconAndSelectOption('Contribution', 'Options');

    it('Should click on "Exclusions" options from LHP', function() {
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').select();

      // Verifying if "Exclusions" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Exclusions').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Exclusions" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    verify();

  });

  describe('Test Step ID: 544889', function() {

    // Click on "Ok" button of header and verify if "Tile Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile Options - Contribution');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Click on report wrench icon and select "Options" from the menu
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

    it('Wait for data in "Available" container to load', function() {
      expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000)).toBeTruthy();
    });

    it('Expand "Commercial Services > Personnel Services" and select "Robert Half International Inc." from "Available" container', function() {
      var group = ThiefHelpers.getVirtualListboxClassReference(xpathAvailableVirtualListBox).getGroupByText('Commercial Services');
      group.expand();

      group.isExpanded().then(function(expanded) {
        if (expanded) {
          group.getGroupByText('Personnel Services').then(function(subGroup) {
            subGroup.expand();
            subGroup.isExpanded().then(function(expanded) {
              if (expanded) {
                subGroup.getItemByText('Robert Half International Inc.').then(function(item) {
                  item.select();

                  // Check if 'Robert Half International Inc.' is selected
                  item.isSelected().then(function(selected) {
                    if (!selected) {
                      expect(false).customError('"Robert Half International Inc." did not selected from "Selected" section');
                      CommonFunctions.takeScreenShot();
                    }
                  });

                });
              } else {
                expect(false).customError('"Personnel services" is not expanded');
                CommonFunctions.takeScreenShot();
              }
            });
          });
        } else {
          expect(false).customError('"Commercial Services" is not expanded');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Click "Right" arrow button to add "Robert Half International Inc." to "Selected" container', function() {
      ThiefHelpers.sendElementToSelectedSection();
    });

    var arrEle = ['Commercial Services > Personnel Services > Robert Half International Inc.', 'Finance'];
    var flag = 0;

    it('Verifying if "Commercial Services > Personnel Services > Robert Half International Inc.", "Finance" ' +
      'present under "Economic Sector > Industry" tree of "Selected" container', function() {
        ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(elements) {
          elements.forEach(function(ele, index) {
            console.log(ele.text);
            if (ele.text !== arrEle[index]) {
              flag = flag + 1;
              expect(false).customError('"' + arrEle[index] + '" is not added to "Available" section');
              if (flag === 1) {
                CommonFunctions.takeScreenShot();
              }
            }
          });
        });
      });

    describe('Test Step ID: 544890', function() {

      it('Should click on "Weights" blast button', function() {
        TileOptionsExclusions.getApplyToButton().click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Verifying if popup window appeared after clicking on "Weights" link
        expect(element(by.xpath(TileOptionsExclusions.xpathBlastingWindow)).isDisplayed()).toBeTruthy();
      });

      it('Select "Contribution" checkbox from the blast panel', function() {
        TileOptionsExclusions.getCheckBoxFromBlastWindow('Contribution').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Verifying if "Contribution" checkbox is selected
        expect(Utilities.isCheckboxSelected(TileOptionsExclusions.getCheckBoxFromBlastWindow('Contribution'))).toBeTruthy();
      });

      it('Click "OK" button from blast panel', function() {
        TileOptionsExclusions.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if blast button text is changed to "Apply To Multiple Reports"', function() {
        expect(TileOptionsExclusions.getApplyToButton().getText()).toEqual('Apply To Multiple Reports');
      });

    });

    describe('Test Step ID: 544895', function() {

      // Clicking on Hidden LHP item to select.
      it('Should click on Hidden LHP item to select', function() {
        ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

        // Verifying if "Exclusions" is selected in the LHP
        ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Hidden" tab is not selected in the LHP.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Wait for data in "Available" container to load', function() {
        expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsHidden.xpathDataSpinner)), 60000))
          .toBeTruthy();
      });

      it('Expand "Commercial Services > Advertising/Marketing Services" and select "Nielsen Holdings Plc" from "Available" container', function() {
        var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Available');

        var group = ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Commercial Services');
        group.expand();

        group.isExpanded().then(function(expanded) {
          if (expanded) {
            group.getGroupByText('Advertising/Marketing Services').then(function(subGroup) {
              subGroup.expand();
              subGroup.isExpanded().then(function(expanded) {
                if (expanded) {
                  subGroup.getItemByText('Nielsen Holdings Plc').then(function(item) {
                    item.select();

                    // Check if 'Robert Half International Inc.' is selected
                    item.isSelected().then(function(selected) {
                      if (!selected) {
                        expect(false).customError('"Nielsen Holdings Plc" is not selected from "Available" section');
                        CommonFunctions.takeScreenShot();
                      }
                    });

                  });
                } else {
                  expect(false).customError('"Advertising/Marketing Services" is not expanded');
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          } else {
            expect(false).customError('"Commercial Services" is not expanded');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Click "Right" arrow button to add "Nielsen Holdings Plc" to "Selected" container', function() {
        TileOptionsHidden.getArrowButton('Right').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying if "Commercial Services > Advertising/Marketing Services > Nielsen Holdings Plc" ' +
        'falls under "Economic Sector > Industry" tree of "Selected" container', function() {
          var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

          ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
            if (columnName[0].text !== 'Commercial Services > Advertising/Marketing Services > Nielsen Holdings Plc') {
              expect(false).customError('"Commercial Services > Advertising/Marketing Services > Nielsen Holdings Plc" is not added to "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        });

    });

    describe('Test Step ID: 544896', function() {

      it('Should click on blast button', function() {
        TileOptionsHidden.getApplyToButton().click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Verifying if popup window appeared after clicking on "Weights" link
        expect(element(by.xpath(TileOptionsHidden.xpathBlastingWindow)).isDisplayed()).toBeTruthy();
      });

      it('Select "Contribution" checkbox from the blast panel', function() {
        TileOptionsHidden.getCheckBoxFromBlastWindow('Contribution').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });

        // Verifying if "Contribution" checkbox is selected
        expect(Utilities.isCheckboxSelected(TileOptionsHidden.getCheckBoxFromBlastWindow('Contribution'))).toBeTruthy();
      });

      it('Click "OK" button from blast panel', function() {
        TileOptionsHidden.getOkOrCancelButtonFromBlastedWindow('OK').click().then(function() {
        }, function(err) {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });

      // Click on "OK" button of header and verify if "options" view is closed
      CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    });

    describe('Test Step ID: 544891', function() {

      it('Expand "Commercial Services > Personnel Services" from the calculated report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Personnel Services');

        // Verifying if "Commercial Services > Personnel Services" is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Personnel Services');

        // Wait for the element to load
        browser.sleep(2000);
      });

      it('Verifying that "Robert Half International Inc." is not displayed under "Commercial Services > Personnel Services"',
        function() {
          expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services|Personnel Services',
            'Robert Half International Inc.').isPresent()).toBeFalsy();
        });

      it('Verifying that "Total" value for "Port. Weight" column is "100.00"', function() {
        expect(PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Port. Weight',
          'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right')).toEqual('100.00');
      });

      it('Verifying that "Total" value for "Bench. Weight" column is "100.00"', function() {
        expect(PA3MainPage.getValueFromCalculatedReport('Weights', 'Total', 'Bench. Weight',
          'slick-pane slick-pane-top slick-pane-left', 'slick-pane slick-pane-top slick-pane-right')).toEqual('100.00');
      });

    });

    describe('Test Step ID: 544897', function() {

      it('Expand "Commercial Services > Advertising/Marketing Services" from the calculated report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services',
          'Commercial Services');

        // Verifying if "Commercial Services > Advertising/Marketing Services" is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Commercial Services|Advertising/Marketing Services');
      });

      it('Verifying that "Nielsen Holdings Plc" is not displayed under "Commercial Services > Advertising/Marketing Services"',
        function() {
          expect(PA3MainPage.getElementFromCalculatedTree('Weights', 'Commercial Services|Advertising/Marketing Services',
            'Nielsen Holdings Plc').isPresent()).toBeFalsy();
        });

    });

    describe('Test Step ID: 544893', function() {

      // Select the option from the lhp and verify the same
      CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Contribution', true, 'isSelected');

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

      it('Expand "Commercial Services" from the calculated report', function() {
        PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Commercial Services', undefined, 'Pane');

        // Verifying if "Commercial Services" is expanded
        PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Commercial Services', 'Pane');
      });

      it('Verifying that "Nielsen Holdings Plc" is not displayed under "Commercial Services"', function() {
        expect(PA3MainPage.getElementFromCalculatedTree('Contribution', 'Commercial Services', 'Nielsen Holdings Plc',
          'slick-pane slick-pane-bottom slick-pane-left').isPresent()).toBeFalsy();
      });

      it('Verifying that "Robert Half International Inc." is not displayed under "Commercial Services"', function() {
        expect(PA3MainPage.getElementFromCalculatedTree('Contribution', 'Commercial Services', 'Robert Half International Inc.',
          'slick-pane slick-pane-bottom slick-pane-left').isPresent()).toBeFalsy();
      });

    });

    describe('Test Step ID: 544892', function() {

      it('Type "SPN:SP50" into "Portfolio" widget box', function() {
        // Get the reference of "Portfolio" widget box
        portfolioBox = PA3MainPage.getWidgetBox('Portfolio');
        portfolioBox.clear();   // Clear the portfolio if already exists
        portfolioBox.sendKeys('SPN:SP50', protractor.Key.ENTER);
      });

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

      it('Verifying that "Nielsen Holdings Plc" is not displayed under "Commercial Services"', function() {
        expect(PA3MainPage.getElementFromCalculatedTree('Contribution', 'Commercial Services', 'Nielsen Holdings Plc',
          'slick-pane slick-pane-bottom slick-pane-left').isPresent()).toBeFalsy();
      });

      it('Verifying that "Robert Half International Inc." is not displayed under "Commercial Services"', function() {
        expect(PA3MainPage.getElementFromCalculatedTree('Contribution', 'Commercial Services', 'Robert Half International Inc.',
          'slick-pane slick-pane-bottom slick-pane-left').isPresent()).toBeFalsy();

        //wait for web Element to load
        browser.sleep(2000);
      });

    });

    describe('Test Step ID: 544894', function() {

      it('Get "Commercial Services" value for "Average Weight"', function() {
        PA3MainPage.getValueFromCalculatedReport('Contribution', 'Commercial Services', 'Average Weight')
          .then(function(cellValue) {
            csAvgVal = cellValue;
          });
        CommonFunctions.captureScreenShot();
      });

      CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Exclusions');

      it('Wait for data in "Available" container to load', function() {
        expect(Utilities.waitUntilElementDisappears(element(by.xpath(TileOptionsExclusions.xpathDataSpinner)), 60000))
          .toBeTruthy();
      });

      var arrEle = ['Commercial Services > Personnel Services > Robert Half International Inc.', 'Finance'];
      var flag = 0;
      it('Verifying if "Commercial Services > Personnel Services > Robert Half International Inc.", "Finance" ' +
        'present under "Economic Sector > Industry" tree of "Selected" container', function() {
          ThiefHelpers.getVirtualListboxClassReference(xpathSelectedVirtualListBox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(elements) {
            elements.forEach(function(ele, index) {
              console.log(ele.text);
              if (ele.text !== arrEle[index]) {
                flag = flag + 1;
                expect(false).customError('"' + arrEle[index] + '" is not added to "Available" section');
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        });

    });

    describe('Test Step ID: 544898', function() {

      // Clicking on Hidden LHP item to select.
      it('Should click on Hidden LHP item to select', function() {
        ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').select();

        // Verifying if "Exclusions" is selected in the LHP
        ThiefHelpers.getOptionspaneItem(CommonPageObjectsForPA3.xpathOptionsPane, 'Hidden').isSelected().then(function(selected) {
          if (!selected) {
            expect(false).customError('"Hidden" tab is not selected in the LHP.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

      it('Verifying if "Commercial Services > Advertising/Marketing Services > Nielsen Holdings Plc" ' +
        'falls under "Economic Sector > Industry" tree of "Selected" container', function() {
          var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

          ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(columnName) {
            if (columnName[0].text !== 'Commercial Services > Advertising/Marketing Services > Nielsen Holdings Plc') {
              expect(false).customError('"Commercial Services > Advertising/Marketing Services > Nielsen Holdings Plc" ' +
                'is not added to "Selected" section');
              CommonFunctions.takeScreenShot();
            }
          });
        });

    });

    describe('Test Step ID: 544900', function() {

      it('Hover over "Economic Sector > Industry" from "Selected" section and click remove icon to delete it', function() {

        var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

        ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').select();

        ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getActions().then(function(actions) {
          actions.triggerAction('remove');
        });
      });

      it('Verifying if "Economic Sector > Industry" tree is deleted from "Selected" container', function() {
        var xpathVirtualListbox = CommonFunctions.replaceStringInXpath(TileOptionsHidden.xpathOfSelectedOrAvailableSection, 'Selected');

        ThiefHelpers.getVirtualListboxClassReference(xpathVirtualListbox).getGroupByText('Economic Sector > Industry').getChildrenText().then(function(val) {
          console.log(val);
        }, function(err) {
          if (err.message.indexOf('Cannot read property \'nodes\' of undefined') < 0) {
            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          }
        });
      });

      // Click on "OK" button of header and verify if "options" view is closed
      CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options');

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution`);

      it('Verifying that "Nielsen Holdings Plc" is displayed under "Commercial Services"', function() {
        PA3MainPage.getElementFromCalculatedTree('Contribution', 'Commercial Services', 'Nielsen Holdings Plc',
          'slick-pane slick-pane-bottom slick-pane-left').isPresent().then(function(value) {
            expect(value).customError('"Nielsen Holdings Plc" is not displayed under "Commercial Services"');
            if (!value) {
              CommonFunctions.takeScreenShot();
            }
          });
      });

      it('Verifying that "Commercial Services" value for "Average Weight" remained same', function() {
        PA3MainPage.getValueFromCalculatedReport('Contribution', 'Commercial Services', 'Average Weight').then(function(value) {
          if (value !== csAvgVal) {
            expect(false).customError('"Commercial Services" value for "Average Weight" is not same. ' +
              'Expected: "' + csAvgVal + '", Found: "' + value + '"');
            CommonFunctions.takeScreenShot();
          }

        });
      });

    });

    describe('Test Step ID: 760286', function() {

      CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights', true, 'isSelected');

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

      CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Weights', 'Exclusions');

      it('Should select "Exclude from Report" from "Assets not covered by the risk model" drop down', function() {
        ThiefHelpers.selectOptionFromDropDown('Exclude from Report', 'Assets not covered by the risk model');

        ThiefHelpers.verifySelectedDropDownText('Exclude from Report', 'Assets not covered by the risk model');
      });

      it('Should click on "Apply To Weights" button from Tile Options Page', function() {
        ThiefHelpers.getButtonClassReference('Apply To Weights').press().then(function() {
        }, function() {

          expect(false).customError('Unable to click on "Apply To Weights" button');
          CommonFunctions.takeScreenShot();
        });
      });

      it('Should check "All Tiles" checkbox', function() {
        ThiefHelpers.setCheckBox('All Tiles', undefined, true);
      });

      var xpathOfBlastingButtons = CommonFunctions.replaceStringInXpath(TileOptionsExclusions.xpathOfBlastingButtons, 'OK');

      it('Should click on "Apply To Weights" button from Tile Options Page', function() {
        ThiefHelpers.getButtonClassReference(undefined, xpathOfBlastingButtons).press().then(function() {
        }, function() {

          expect(false).customError('Unable to click on "Apply To Weights" button');
          CommonFunctions.takeScreenShot();
        });
      });

      it('Verifying that "Apply To All" is displayed at the top right corner of tile options', function() {
        ThiefHelpers.isPresent('Button', 'Apply To All').then(function(option) {
          if (!option) {
            expect(false).customError('"Apply To All" button is not displayed.');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    });

    describe('Test Step ID: 760293', function() {

      // Click on "Ok" button of header and verify if "Tile options" view is closed
      CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

      CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

      CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Contribution', 'Exclusions');

      it('Veriying that "Exclude from Report" is displayed as "Assets not covered by the risk model" drop down', function() {
        ThiefHelpers.verifySelectedDropDownText('Exclude from Report', 'Assets not covered by the risk model');
      });
    });

  });
});
