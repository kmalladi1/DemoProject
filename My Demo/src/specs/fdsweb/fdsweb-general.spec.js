'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: fdsweb-general', function() {

  // Local function(s)
  var switchToWindow = function(windowName, expectedTitle) {

    // Variable(s)
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    if (windowName === 'FACTSET') {

      // Wait for the "FACTSET" window to appear.
      browser.wait(function() {
        return browser.getAllWindowHandles().then(function(handles) {
          return handles.length === 2;
        });
      }, 30000, 'Fails to display "FACTSET" application window.');

      browser.getAllWindowHandles().then(function(handles) {
        browser.switchTo().window(handles[1]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf(expectedTitle) > -1;
            });
          }, 30000, '"FactSet" web page is not loaded within 30 seconds.').then(function() {
            defer.fulfill(true);
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
            defer.reject('"FactSet" did not launch.');
          });
        });
      });
    } else if (windowName === 'PA3') {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[0]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
            defer.fulfill(true);
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
            defer.reject('"PA3" did not launch.');
          });
        });
      });
    }

    return promise;
  };

  var verifyAndCloseWindow = function(windowName, close, expectedTitle) {
    browser.ignoreSynchronization = true;
    browser.getAllWindowHandles().then(function(handles) {
      if (handles[1]) {
        switchToWindow(windowName, expectedTitle).then(function() {
          if (close === true) {
            browser.driver.close();
          }
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      }
    }).then(function() {
      browser.ignoreSynchronization = false;
      if (close === true) {
        switchToWindow('PA3').then(function() {
        }, function(error) {

          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        });
      }

    });

    browser.ignoreSynchronization = false;
    browser.rootElement = '#pa3App';
  };

  describe('Test Step ID: 935003', function() {

    // Open default document and un-check automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with Client;default_doc_auto and verify', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto');
    });
  });

  describe('Test Step ID: 935004', function() {

    it('Should click on dates hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should enter "02/06/2017" in the "End Date" field', function() {
      ThiefHelpers.getTextBoxClassReference('End Date:').setText('02/06/2017');

      // Verifying "02/06/2017"  is entered in End Date text box
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '02/06/2017') {
          expect(false).customError('End Date text box did not contain "02/06/2017". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Added delay to process the request
      browser.sleep(1000);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Weights');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    // Click on "Economic Sector" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Contribution', 'Economic Sector');

    it('Should click "Left" arrow to move "Economic Sector" to Available section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).transferToSource();
    });

    it('Should verify if the "Selected" section is empty', function() {
      ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer).getChildrenText().then(function(children) {
        if (children.length > 0) {
          expect(false).customError('Tile Options > Groupings selected section is not empty');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter "industry" into the search field of "Available" section', function() {
      ThiefHelpers.getTextBoxClassReference('Available').setText('industry');

      // Verifying that "Average" is typed into the search box
      ThiefHelpers.getTextBoxClassReference('Available').getText().then(function(text) {
        if (text !== 'industry') {
          expect(false).customError('"industry" is not typed into the search field. Found:"' + text + '"');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the Search Result to appear
      browser.sleep(2000);
    });

    it('Should select "Industry" under "FactSet|Sector & Industry|FactSet" from the "Available" section', function() {
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Industry', 'FactSet|Sector & Industry|FactSet', 'FactSet|Sector & Industry|FactSet').select();

      // Verifying if the Item 'Industry' is selected.
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, 'Industry', 'FactSet|Sector & Industry|FactSet', 'FactSet|Sector & Industry|FactSet').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Industry" is not selected in "Available section"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click "Right" arrow to move "Industry" to Selected section', function() {
      ThiefHelpers.getTransferBoxReference(TileOptionsGroupings.xpathOfTransferBox).transferToTarget();
    });

    it('Should verify if "Industry - FactSet" is present in the "Selected" section of "Tile Options - Contribution"', function() {
      ThiefHelpers.getListBoxItem(TileOptionsGroupings.xpathOfSelectedContainer, 'Industry - FactSet').getText().then(function(text) {
        if (text !== 'Industry - FactSet') {
          expect(false).customError('"Industry - FactSet" is not present in the "Selected" section of "Tile Options - Contribution"');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.toString().indexOf('No direct child') > 0) {
          expect(true).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Contribution');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should expand "Advertising/Marketing Services" in the report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution', 'Advertising/Marketing Services');

      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Advertising/Marketing Services');
    });

    it('Should perform right click on the "Interpublic Group of Companies, Inc." and select "Estimate Summary" from the menu', function() {
      var elementReference = PA3MainPage.getElementFromSpecifiedLevelOfCalculatedReport('Contribution', 2, 'Interpublic Group of Companies, Inc.');

      // Right click on "Interpublic Group of Companies, Inc." and select "Estimate Summary" from the menu
      PA3MainPage.rightClickAndSelectOption(elementReference, 'Estimate Summary');
    });

    it('Should verify if "Estimate Summary" web page is displayed', function() {
      verifyAndCloseWindow('FACTSET', false, 'FactSet');

      // Wait for web page to load
      browser.sleep(3000);
    });

  });

  describe('Test Step ID: 935005', function() {

    it('Should close "Estimate Summary" web page.', function() {
      verifyAndCloseWindow('FACTSET', true, 'FactSet');
      browser.sleep(3000);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should verify if "Contribution" report is grouped by "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(refVal) {
        if (refVal.indexOf('Industry') === -1) {
          expect(false).customError('"Contribution" report is not grouped by "Industry", Found:' + refVal);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Advertising/Marketing Services" grouping is expanded', function() {
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution', 'Advertising/Marketing Services');
    });
  });

  describe('Test Step ID: 935006', function() {

    it('Should open new tab with "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/#/doc/PA_DOCUMENTS:DEFAULT/report/report0';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[1]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    it('Should open "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto', undefined, false);
    });

    it('Should verify if "Factset" pop up appears saying "CLIENT:DEFAULT_DOC_AUTO" and content displayed in it', function() {
      ThiefHelpers.isDialogOpen('CLIENT:DEFAULT_DOC_AUTO').then(function(flag) {
        if (!flag) {
          expect(false).customError('"CLIENT:DEFAULT_DOC_AUTO" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying the content
      ThiefHelpers.getDialogClassReference('CLIENT:DEFAULT_DOC_AUTO').getContent().getText().then(function(content) {
        if (content !== 'FactSet has found unsaved changes to specified document. Would you like to continue editing them or discard them?') {
          expect(false).customError('Expected dialog box content: "FactSet has found unsaved changes to specified document. Would you like to continue editing them or discard them?"' +
            ' but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrIfButtons = ['Continue Editing', 'Discard Changes'];

    arrIfButtons.forEach(function(buttonName) {
      it('Verifying if "' + buttonName + '" button is displayed in "CLIENT:DEFAULT_DOC_AUTO" pop up', function() {
        ThiefHelpers.isPresent('Button', buttonName).then(function(option) {
          if (!option) {
            expect(false).customError('"' + buttonName + '" button is not displayed.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 935007', function() {

    it('Should click on "Continue Editing" button in the pop up', function() {
      PA3MainPage.editOrDiscardReportChanges('Continue Editing');
    });

    it('Should verify if date hyperlink is set to "2/06/2017"', function() {
      PA3MainPage.getDateHyperLink('Weights').getText().then(function(dateHyperLink) {
        if (dateHyperLink !== '2/06/2017') {
          expect(false).customError('Date hyperlink is not displayed as "2/06/2017"; Found: ' + dateHyperLink);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 935013', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should verify if "Contribution" report is grouped by "Industry"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(refVal) {
        if (refVal.indexOf('Industry') === -1) {
          expect(false).customError('"Contribution" report is not grouped by "Industry", Found:' + refVal);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935008', function() {

    it('Should open "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[2]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    it('Should open "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto', undefined, false);
    });

    it('Should verify if "Factset" pop up appears saying "CLIENT:DEFAULT_DOC_AUTO" and content displayed in it', function() {
      ThiefHelpers.isDialogOpen('CLIENT:DEFAULT_DOC_AUTO').then(function(flag) {
        if (!flag) {
          expect(false).customError('"CLIENT:DEFAULT_DOC_AUTO" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying the content
      ThiefHelpers.getDialogClassReference('CLIENT:DEFAULT_DOC_AUTO').getContent().getText().then(function(content) {
        if (content !== 'FactSet has found unsaved changes to specified document. Would you like to continue editing them or discard them?') {
          expect(false).customError('Expected dialog box content: "FactSet has found unsaved changes to specified document. Would you like to continue editing them or discard them?"' +
            ' but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrIfButtons = ['Continue Editing', 'Discard Changes'];

    arrIfButtons.forEach(function(buttonName) {
      it('Should verify if "' + buttonName + '" button is displayed in "CLIENT:DEFAULT_DOC_AUTO" pop up', function() {
        ThiefHelpers.isPresent('Button', buttonName).then(function(option) {
          if (!option) {
            expect(false).customError('"' + buttonName + '" button is not displayed.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 935009', function() {

    it('Should click on "Discard Changes" button in the pop up', function() {
      PA3MainPage.editOrDiscardReportChanges('Discard Changes');
    });

    it('Should click on Dates Hyperlink from "Weights" report', function() {
      PA3MainPage.getDateHyperLink('Weights').click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should verify if End dates drop down is displayed with "10/10/2018"', function() {
      // Verifying End Date text box text
      ThiefHelpers.getTextBoxClassReference('End Date:').getText().then(function(value) {
        if (value !== '10/10/2018') {
          expect(false).customError('End Date text box did not contain "10/10/2018". Found:"' + value + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935014', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Contribution', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Contribution');

    it('Should verify if "Contribution" report is grouped by "Economic Sector"', function() {
      PA3MainPage.getGroupingsHyperLink('Contribution').getText().then(function(refVal) {
        if (refVal.indexOf('Economic Sector') === -1) {
          expect(false).customError('"Contribution" report is not grouped by "Economic Sector", Found:' + refVal);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe('Test Step ID: 935015', function() {

    it('Should open "PA_DOCUMENTS:DEFAULT" document', function() {
      var url = 'https://pa.apps.factset.com/';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[3]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    it('Should open "Client:default_doc_auto" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('default-doc-auto', undefined, false);
    });

    // Known issue RPD:42465670
    it('Should verify if "Factset" pop up appears saying "CLIENT:DEFAULT_DOC_AUTO"', function() {
      ThiefHelpers.isDialogOpen('CLIENT:DEFAULT_DOC_AUTO').then(function(flag) {
        if (!flag) {
          expect(false).customError('"CLIENT:DEFAULT_DOC_AUTO" dialog is not displayed (Known issue RPD:42465670 might fixed)');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 935010', function() {

    it('Should click on "Discard Changes" button in the pop up', function() {
      PA3MainPage.editOrDiscardReportChanges('Discard Changes');
    });

    it('Should click on the folder icon on app toolbar and select New from menu', function() {
      PA3MainPage.launchHtmlDialog('New');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    // Should check if the chart is calculated
    CommonPageObjectsForPA3.verifyChartHasAppeared('Weights Difference');
  });

  describe('Test Step ID: 935011', function() {

    it('Should open new tab with "https://pa.apps.factset.com/#/doc/Client:test_this_doesnt_exist/report/report0" url', function() {
      var url = 'https://pa.apps.factset.com/#/doc/Client:test_this_doesnt_exist/report/report0';
      return browser.executeScript('return window.open(arguments[0], \'_blank\')', url);
    });

    it('Should verify if "Portfolio window" is displayed', function() {
      browser.getAllWindowHandles().then(function(handles) {
        browser.driver.switchTo().window(handles[4]).then(function() {
          browser.driver.wait(function() {
            return browser.driver.getTitle().then(function(title) {
              return title.indexOf('Portfolio Analysis 3.0') > -1;
            });
          }, 30000, '"PA3" application page is not loaded within 30 seconds.').then(function() {
          }, function(error) {

            expect(false).customError(error);
            CommonFunctions.takeScreenShot();
          });
        });
      });
    });

    it('Should verify if "Document Error" pop up is displayed', function() {
      // Verifying if any error dialog box appeared
      PA3MainPage.getDialog('Document Error').isDisplayed().then(function(option) {
        if (!option) {
          expect(false).customError('"Document Error" dialog is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 935012', function() {

    it('Should click "OK" button to close error pop-up', function() {
      PA3MainPage.getButton('OK').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    var documentArray = [{documentKey:'default-doc-old', documentName: 'Client:/default_doc_old'},
      {documentKey:'default-doc-auto', documentName: 'Client:/default_doc_auto'}, {documentKey: '3-tile-chart', documentName: 'Client:/3-tile-chart'},
      {documentKey:'audit-multi-port', documentName: 'Client:/Pa3/Audit/AUDIT_MULTI_PORT'}, {documentKey: 'audit-multi-port-oa', documentName: 'Client:/pa3/audit/AUDIT_MULTI_PORT_OA'},];

    documentArray.forEach(function(documentName) {
      it('Should open "' + documentName.documentName + '" document', function() {
        PA3MainPage.launchHtmlDialogAndOpenDocument(documentName.documentKey);
      });
    });

    it('Should click on the folder icon on app toolbar', function() {
      PA3MainPage.getFolderDropDown().click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

    });

    var recentList = ['CLIENT:DEFAULT_DOC_OLD', 'CLIENT:DEFAULT_DOC_AUTO', 'CLIENT:3-TILE-CHART', 'CLIENT:/PA3/AUDIT/AUDIT_MULTI_PORT', 'CLIENT:/PA3/AUDIT/AUDIT_MULTI_PORT_OA'];

    it('Should verify if documents are displayed in "' + recentList + '" order in the menu', function() {
      var count = 0;
      ThiefHelpers.getMenuClassReference().getItems().then(function(itemsArr) {
        // Slicing the array to expected length.
        var temp = itemsArr.slice(0, recentList.length);
        temp.forEach(function(itemRef, index) {
          itemRef.getText().then(function(menuItem) {
            if (menuItem !== recentList[recentList.length - (index + 1)]) {
              count = count + 1;
              expect(false).customError('Documents are not displayed in specified order, Expected: ' + recentList[recentList.length - (index + 1)] + ' but Found: ' + menuItem);
            }
          });
        });
      }).then(function() {
        if (count !== 0) {
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should verify if "Client:test_this_doesnt_exist" document is not displayed in the recent list', function() {
      var documentArray = [];
      ThiefHelpers.getMenuClassReference().getItems().then(function(itemsArr) {
        itemsArr.forEach(function(itemRef) {
          itemRef.getText().then(function(menuItem) {
            documentArray.push(menuItem);
          });
        });
      }).then(function() {
        if (documentArray.indexOf('CLIENT:TEST_THIS_DOESNT_EXIST') !== -1) {
          expect(false).customError('"CLIENT:TEST_THIS_DOESNT_EXIST" is displayed in the recently opened documents list');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });
});
