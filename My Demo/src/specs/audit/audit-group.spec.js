'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-group', function() {

  var rowCount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  var indexCount;

  var arrOfIndexes = [];
  var portEndingMarketingValueIndex;

  var compareTheReqiredColumnValues = function(rowName, arrOfIndexes) {
    var arrOfValuesInAuditView = [];

    var arr = ['Port. Ending Market Value', 'Port. Ending Price', 'Port. Ending Quantity Held'];

    var convertToString = function(value) {
      var valueToString = value.toString();
      var len = valueToString.length - 2;
      var expectedValue = valueToString.slice(0, len);
      arrOfValuesInAuditView.push(expectedValue);
    };

    arr.forEach(function(columnName, index) {
      it('Getting the value of "' + columnName + '" for verification', function() {
        if (columnName === 'Port. Ending Market Value') {
          element(by.xpath('//*[@data-qa-id="simple-table-view"]//*[contains(@class,"total")]//*[normalize-space(.)="Port. Ending Market Value"]/following-sibling::*')).getText().then(function(value) {
            convertToString(value);
          });
        } else {
          element.all(by.xpath('//*[@data-qa-id="simple-table-view"]//*[@ng-repeat]')).then(function(objRef) {
            objRef[index - 1].getText().then(function(text) {
              if (text.indexOf(columnName) > -1) {
                AuditMode.getReportInputsSectionValues(index, 2).getText().then(function(value) {
                  convertToString(value);
                });
              } else {
                expect(false).customError(columnName + ' is not found in the Report Input Section. Found ' + text);
                CommonFunctions.takeScreenShot();
              }
            });
          });
        }
      });
    });

    it('Verifying if report value matches with audit value for "' + rowName + '" security', function() {
      SlickGridFunctions.getRowData('Weights', rowName, '').then(function(rowData) {
        arrOfIndexes.forEach(function(colIndex, index) {
          if (rowData[colIndex] !== arrOfValuesInAuditView[index]) {
            expect(false).customError('Report value: "' + rowData[colIndex] + '" is not equal to Audit value: "' + arrOfValuesInAuditView[index] + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  };

  describe('Test Step ID: 549885', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:/Pa3/Audit/AUDIT_STATISTICS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-statistics');
    });

    it('Should Wait for "Weights" report to calculate', function() {
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 180000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Weights" report appeared without any issues', function() {
      PA3MainPage.isReportCalculated('Weights').then(function(found) {
        if (!found) {
          expect(false).customError('"Weights" report is not calculated');
          CommonFunctions.takeScreenShot();
        }
      }, function(err) {
        if (err.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Weights')).toBeTruthy();
        } else {
          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared

      PA3MainPage.getDialog('Calculation Error').isPresent().then(function(found) {
        if (found) {
          expect(false).customError('"Calculation Error" is found during report calculation.');
          CommonFunctions.takeScreenShot();
        }
      });
      browser.sleep(4000);
    });

    it('Verifying that report is grouped by "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Weights').getText()).toContain('Economic Sector');
    });
  });

  describe('Test Step ID: 549886', function() {

    it('Expand "Electronic Technology " in the "Weights" Report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Weights', 'Electronic Technology');

      // Verifying that "Electronic Technology|Computer Communications" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Weights', 'Electronic Technology');
    });

    it('Should right click in the "Price to Earnings Column" value for "Computer Communications', function() {
      PA3MainPage.getValueFromCalculatedReport('Weights', 'Computer Communications', 'Price to Earnings', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
      browser.sleep(4000);
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var arr = ['Arista Networks, Inc.', 'Cisco Systems, Inc.', 'F5 Networks, Inc.', 'Fortinet, Inc.', 'Juniper Networks, Inc.', 'Palo Alto Networks, Inc.'];
    it('Verify that Audit View contains securities which has values for "Port Weight" in the Report view for Computer Communications', function() {
      var count = 0;
      arr.forEach(function(optionName) {
        AuditMode.getValueFromCalculatedReport('Weights', optionName, 'Port. Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right').then(function(value) {
          if (value !== '--' && value !== '.0') {
            AuditMode.getElementFromSpecifiedLevelOfCalculatedReport('Price to Earnings', '3', optionName).isPresent().then(function(found) {
              if (!found) {
                expect(false).customError('"' + optionName + '" is not displayed ' + 'in "Price to Earnings" report ');
                if (count !== 1) {
                  ++count;
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          }
        });
      });
    });

    var portWeightValue = [];
    var normalizedValue = [];
    var colClassName = 'slick-pane slick-pane-bottom slick-pane-right';
    it('Fetching "Normalized Weight" column values', function() {
      AuditMode.getAllColumnOfCalculatedReport('Price to Earnings').each(function(eleRef, index) {
        eleRef.getText().then(function(eleName) {
          eleName = eleName.replace(/\n/g, ' ');
          if (eleName === 'Port. Ending Weight' && indexCount <= index) {
            browser.actions().mouseMove(eleRef).perform();
          }
        });
      });
      AuditMode.getAllCellsOfGivenColumn('Price to Earnings', 'Normalized Weight', colClassName).then(function(element) {
        element.forEach(function(ele) {
          ele.getText().then(function(value) {
            normalizedValue.push(value);
          });
        });
      });
    });

    it('Fetching  "Port. Ending Weight" column values', function() {
      AuditMode.getAllCellsOfGivenColumn('Price to Earnings', 'Port. Ending Weight', colClassName).then(function(element) {
        element.forEach(function(ele) {
          ele.getText().then(function(value) {
            portWeightValue.push(value);
          });
        });
      });
    });

    it('Verifying that Normalized weight and Port Ending Weight column values should be different in Audit View', function() {
      for (var i = 0; i < portWeightValue.length; i++) {
        expect(portWeightValue[i]).not.toEqual(normalizedValue[i]);
      }
    });

    it('Verifying that Column Help section is diplayed with Title " Price / Earnings"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Price / Earnings');
    });
  });

  describe('Test Step ID: 549887', function() {

    it('In Report View Expand "Finance" in the "Weights" Report', function() {
      AuditMode.expandTreeInCalculatedReport('Weights', 'Finance');

      // Verifying that "Electronic Technology|Computer Communications" is expanded
      AuditMode.checkIfTreeExpandedInCalculatedReport('Weights', 'Finance');
    });

    it('Should click in the "Price to Earnings" Column value for "Specialty Insurance"', function() {
      AuditMode.getAllColumnOfCalculatedReport('Weights').each(function(eleRef, index) {
        if (index <= 6) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
      AuditMode.getValueFromCalculatedReport('Weights', 'Specialty Insurance', 'Price to Earnings', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', 'true').then(function(reference) {
        reference.click();
      });
      browser.sleep(4000);
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    var portWeightValue = [];
    var normalizedValue = [];
    it('Fetching  "Normalized Weiget", "Port. Ending Weight" Values', function() {
      AuditMode.getAllCellsOfGivenColumn('Price to Earnings', 'Port. Ending Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(element) {
        element.forEach(function(ele) {
          ele.getText().then(function(value) {
            portWeightValue.push(value);
          });
        });
      });
      AuditMode.getAllCellsOfGivenColumn('Price to Earnings', 'Normalized Weight', 'slick-pane slick-pane-bottom slick-pane-right').then(function(element) {
        element.forEach(function(ele) {
          ele.getText().then(function(value) {
            normalizedValue.push(value);
          });
        });
      });
    });

    it('Verifying that Normalized weight and Port Ending Weight column values should be different in Audit View', function() {
      for (var i = 0; i < portWeightValue.length; i++) {
        expect(portWeightValue[i]).not.toEqual(normalizedValue[i]);
      }
    });
  });

  describe('Test Step ID: 549888', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should select "Contribution - Audit Tests" from the LHP', function() {
      PA3MainPage.getReports('Contribution - Audit Tests').click();
      browser.sleep(4000);
    });

    it('Waiting for "Contribution - Audit Tests" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('Expand "Communications" in the "Contribution - Audit Tests" Report', function() {
      PA3MainPage.expandTreeInCalculatedReport('Contribution - Audit Tests', 'Communications');

      // Verifying that "Electronic Technology|Computer Communications" is expanded
      PA3MainPage.checkIfTreeExpandedInCalculatedReport('Contribution - Audit Tests', 'Communications');
    });

    it('Should right click in the "Average Weight" Column value for "Computer Communications"', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-left', 'slick-pane slick-pane-bottom slick-pane-right', 'true').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
      browser.sleep(4000);
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('In AuditView double click on "Average Weight" column header', function() {
      AuditMode.getAllColumnOfCalculatedReport('Average Weight', true).each(function(eleRef, index) {
        if (index === 1) {
          browser.actions().doubleClick(eleRef).perform();
        }
      });
    });

    var arrValue = [];
    it('Verify that the "Average Weight" values are displayed in descending order', function() {
      rowCount.forEach(function(value, index) {
        AuditMode.getValueFromReportOfGivenColumn('Average Weight', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-right', value, true).then(function(value1) {
          value1.getText().then(function(ele) {
            arrValue.push(ele.replace(/\,/g, ''));
            if (index >= 1) {
              if (arrValue[index - 1] < arrValue[index]) {
                expect(false).toBeTruthy();
              }
            }
          });
        });
      });
    });

    it('Verifying if "Average Weight" column header shows "downward" arrow', function() {
      AuditMode.getAllColumnOfCalculatedReport('Average Weight', true).each(function(colRef) {
        colRef.getText().then(function(text) {
          if (text.replace(/\n/g, ' ').indexOf('Average Weight') >= 0) {
            // Verifying if column is displaying "DOWN" arrow
            expect(colRef.$('.slick-sort-indicator').getAttribute('class')).toContain('indicator-desc');
          }
        });
      });
    });
  });

  describe('Test Step ID: 549889', function() {

    it('In AuditView double click on "Average Weight" column header', function() {
      AuditMode.getAllColumnOfCalculatedReport('Average Weight', true).each(function(eleRef, index) {
        Utilities.makeElementVisible(eleRef);
        if (index === 1) {
          browser.actions().doubleClick(eleRef).perform();
        }
      });
    });

    var arrValue = [];
    it('Verify that the "Average Weight" values are displayed in "ascending" order', function() {
      rowCount.forEach(function(value, index) {
        AuditMode.getValueFromReportOfGivenColumn('Average Weight', 'Average Weight', 'slick-pane slick-pane-bottom slick-pane-right', value, true).then(function(reference) {
          reference.getText().then(function(ele) {
            arrValue.push(ele.replace(/\,/g, ''));
            if (index > 1) {
              expect(arrValue[index]).not.toBeLessThan(arrValue[index - 1]);
            }
          });
        });
      });
    });

    it('Verifying if "Average Weight" column header shows upward arrow', function() {
      AuditMode.getAllColumnOfCalculatedReport('Average Weight', true).each(function(colRef) {
        colRef.getText().then(function(text) {
          if (text.replace(/\n/g, ' ').indexOf('Average Weight') >= 0) {
            // Verifying if column is displaying "UP" arrow
            expect(colRef.$('.slick-sort-indicator').getAttribute('class')).toContain('indicator-asc');
          }
        });
      });
    });
  });

  describe('Test Step ID: 549890', function() {

    it('In report view should click on the "Market Capitalization" value for "Communications"', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 9) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Market Capitalization', undefined, undefined, 'true').then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 120000);
    });

    it('In AuditView double click on "Market Capitalization" column header', function() {
      AuditMode.getAllColumnOfCalculatedReport('Market Capitalization', true).each(function(eleRef, index) {
        if (index === 1) {
          browser.actions().doubleClick(eleRef).perform();
        }
      });
    });

    var arrValue = [];
    it('Verify that the "Market Capitalization" values are displayed in descending order', function() {
      rowCount.forEach(function(value, index) {
        AuditMode.getValueFromReportOfGivenColumn('Market Capitalization', 'Market Capitalization', 'slick-pane slick-pane-bottom slick-pane-right', value, true).then(function(value1) {
          Utilities.makeElementVisible(value1);
          value1.getText().then(function(ele) {
            var element = ele.replace(/\,/g, '');
            arrValue.push(parseFloat(element));
            if (index > 1) {
              expect(arrValue[index - 1]).not.toBeLessThan(arrValue[index]);
            }
          });
        });
      });
    });

    it('Verifying if "Market Capitalization" column header shows downward arrow', function() {
      AuditMode.getAllColumnOfCalculatedReport('Market Capitalization', true).each(function(colRef) {
        colRef.getText().then(function(text) {
          if (text.replace(/\n/g, ' ').indexOf('Market Capitalization') >= 0) {
            // Verifying if column is displaying "Down" arrow
            expect(colRef.$('.slick-sort-indicator').getAttribute('class')).toContain('indicator-desc');
          }
        });
      });
    });
  });

  describe('Test Step ID: 549891', function() {

    it('In AuditView double click on "Market Capitalization" column header', function() {
      AuditMode.getAllColumnOfCalculatedReport('Market Capitalization', true).then(function(references) {
        references.forEach(function(eleRef, index) {
          if (index === 1) {
            browser.actions().doubleClick(eleRef).perform();
          }
        });
        browser.sleep(4000);
      });
    });

    var arrValue = [];
    it('Verify that the "Market Capitalization" values are displayed in "ascending" order', function() {
      rowCount.forEach(function(value, index) {
        AuditMode.getValueFromReportOfGivenColumn('Market Capitalization', 'Market Capitalization', 'slick-pane slick-pane-bottom slick-pane-right', value, true).then(function(reference) {
          Utilities.makeElementVisible(reference);
          reference.getText().then(function(ele) {
            arrValue.push(parseFloat(ele.replace(/\,/g, '')));
            if (index > 1) {
              expect(arrValue[index]).not.toBeLessThan(arrValue[index - 1]);
            }
          });
        });
      });
    });

    it('Verifying if "Market Capitalization" column header shows "Upward"arrow', function() {
      AuditMode.getAllColumnOfCalculatedReport('Market Capitalization', true).each(function(colRef) {
        colRef.getText().then(function(text) {
          if (text.replace(/\n/g, ' ').indexOf('Market Capitalization') >= 0) {
            // Verifying if column is displaying "UP" arrow
            expect(colRef.$('.slick-sort-indicator').getAttribute('class')).toContain('indicator-asc');
          }
        });
      });
    });
  });

  describe('Test Step ID: 549892', function() {

    it('Should click on the "Debt to Equity" value for "Communications" In report view', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 14) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Debt to Equity', undefined, undefined, 'true').then(function(reference) {
        reference.click();
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('In AuditView double click on "Debt to Equity" column header', function() {
      AuditMode.getAllColumnOfCalculatedReport('Debt to Equity', true).each(function(eleRef, index) {
        if (index === 1) {
          browser.actions().doubleClick(eleRef).perform();
        }
      });
    });

    var arrValue = [];
    it('Verify that the "Debt to Equity" values are displayed in descending order', function() {
      rowCount.forEach(function(value, index) {
        AuditMode.getValueFromReportOfGivenColumn('Debt to Equity', 'Debt to Equity', 'slick-pane slick-pane-bottom slick-pane-right', value, true, true).then(function(value1) {
          Utilities.makeElementVisible(value1);
          value1.getText().then(function(ele) {
            arrValue.push(parseFloat(ele.replace(/\,/g, '')));
            if (index > 1) {
              expect(arrValue[index - 1]).not.toBeLessThan(arrValue[index]);
            }
          });
        });
      });
    });

    it('Verifying if "Debt to Equity" column header shows downward arrow', function() {
      AuditMode.getAllColumnOfCalculatedReport('Debt to Equity', true).each(function(colRef) {
        colRef.getText().then(function(text) {
          if (text.replace(/\n/g, ' ').indexOf('Debt to Equity') >= 0) {
            // Verifying if column is displaying "Down" arrow
            expect(colRef.$('.slick-sort-indicator').getAttribute('class')).toContain('indicator-desc');
          }
        });
      });
    });
  });

  describe('Test Step ID: 549893', function() {

    it('In AuditView double click on "Debt to Equity" column header', function() {
      AuditMode.getAllColumnOfCalculatedReport('Debt to Equity', true).each(function(eleRef, index) {
        if (index === 1) {
          browser.actions().doubleClick(eleRef).perform();
        }

        browser.sleep(4000);
      });
    });

    var arrValue = [];
    it('Verify that the "Debt to Equity" values are displayed in ascending order', function() {
      rowCount.forEach(function(value, index) {
        AuditMode.getValueFromReportOfGivenColumn('Debt to Equity', 'Debt to Equity', 'slick-pane slick-pane-bottom slick-pane-right', value, true).then(function(reference) {
          reference.getText().then(function(ele) {
            arrValue.push(parseFloat(ele.replace(/\,/g, '')));
            if (index > 1) {
              expect(arrValue[index]).not.toBeLessThan(arrValue[index - 1]);
            }
          });
        });
      });
    });

    it('Verifying if "Debt to Equity" column header shows upward arrow', function() {
      AuditMode.getAllColumnOfCalculatedReport('Debt to Equity', true).each(function(colRef) {
        colRef.getText().then(function(text) {
          if (text.replace(/\n/g, ' ').indexOf('Debt to Equity') >= 0) {
            // Verifying if column is displaying "UP" arrow
            expect(colRef.$('.slick-sort-indicator').getAttribute('class')).toContain('indicator-asc');
          }
        });
      });
    });
  });

  describe('Test Step ID: 549894', function() {

    it('In the Report view, move the bottom scroll bar to the right to view all columns.', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 14) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
    });

    var arrOptions = ['Engine Formulas', 'Screening Formulas', 'Custom Formulas'];
    arrOptions.forEach(function(optionName) {
      it('Verifying the report contains "' + optionName + '" Column', function() {
        expect(AuditMode.getMultiHeaderColumnNames('Contribution - Audit Tests', optionName).isPresent()).toBeTruthy();
      });
    });
  });

  describe('Test Step ID: 549895', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    xit('Verifying that report should not auto calculate', function() {
      browser.sleep(4000);
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeTruthy();
    });

    it('Verifying that report should not auto calculate', function() {
      browser.sleep(4000);
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });
  });

  describe('Test Step ID: 753213', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Weights-Grouping', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    it('Verifying if U.S.Doller is displayed under "Advertising/Marketing Services" and no groups under "Aerospace & Defense"', function() {
      var group1Found;
      var parentID;
      SlickGridFunctions.getAllRowsFromReport('Weights').then(function(dataView) {
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === 'Advertising/Marketing Services' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            group1Found = true;
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element.metadata.type === 'group') {
                  console.log(element[0]);
                  if (element[0] !== 'U.S. Dollar') {
                    expect(false).customError('"U.S. Dollar" group is not displayed under "Advertising/Marketing Services".');
                    CommonFunctions.takeScreenShot();
                  }
                }
              });
            } else {
              expect(false).customError('"Advertising/Marketing Services" grouping is present in the report but it is not expanded by default');
              CommonFunctions.takeScreenShot();
            }
          } else if (rowRef[0] === 'Aerospace &amp; Defense' && rowRef.metadata.type === 'group') {
            SlickGridFunctions.scrollRowToTop('Weights', index);
            group1Found = true;
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element.metadata.type === 'group') {
                  console.log(element[0], 'fggghfghcgnhhg');
                  expect(false).customError('Groups are displayed under "Aerospace & Defense".');
                  CommonFunctions.takeScreenShot();
                }
              });
            } else {
              expect(false).customError('"Aerospace & Defense" grouping is present in the report but it is not expanded by default.');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe('Test Step ID: 734523', function() {

    it('Should right click on "Port. Ending Market Value" for "Google Inc. Cl A" and select "Audit Value" from the drop down ', function() {
      // Get cell value
      SlickGridFunctions.getCellReference('Weights', 'Interpublic Group of Companies, Inc.', '', 'Port. Ending Market Value', 'Advertising/Marketing Services|U.S. Dollar').then(function(reference) {
        // Right click and select "Audit Value"
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      }, function(error) {

        expect(false).customError(error);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Getting the indexes of required columns for comparing values', function() {
      SlickGridFunctions.getColumnNames('Weights').then(function(arrColumnNames) {
        arrColumnNames.forEach(function(columnName, index) {
          if (columnName === 'Port. Ending Market Value' || columnName === 'Port. Ending Price' || columnName === 'Port. Ending Quantity Held') {
            arrOfIndexes.push(index);
          }
        });
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    compareTheReqiredColumnValues('Interpublic Group of Companies, Inc.', arrOfIndexes);

  });

  describe('Test Step ID: 734528', function() {

    it('Should click on "Port. Ending Market Value" value for the "FLIR Systems, Inc." ticker, In report view', function() {
      AuditMode.getValueFromCalculatedReport('Weights', 'FLIR Systems, Inc.', 'Port. Ending Market Value', undefined, undefined,
        true).then(function(reference) {
        Utilities.scrollElementToVisibility(reference);
        reference.click().then(function() {
        }, function(err) {

          expect(false).customError(err);
          CommonFunctions.takeScreenShot();
        });
      });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    compareTheReqiredColumnValues('FLIR Systems, Inc.', arrOfIndexes);
  });

  var arrofStepIds = ['734532', '734538', '734539'];
  var arrOfRowNames = ['Advertising/Marketing Services', 'U.S. Dollar', 'Aerospace & Defense'];

  arrofStepIds.forEach(function(idnumber, indexOfId) {
    describe('Test Step ID:' + idnumber, function() {

      it('Should click on "Port. Ending Market Value" value for the "' + arrOfRowNames[indexOfId] + '" group, In report view', function() {
        AuditMode.getValueFromCalculatedReport('Weights', arrOfRowNames[indexOfId], 'Port. Ending Market Value', undefined, undefined,
          true).then(function(reference) {
          Utilities.scrollElementToVisibility(reference);
          reference.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });
      });

      it('Waiting for "Audit" report to calculate', function() {
        Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
      });

      it('Verifying if audit value matches with report value of "Port. Ending Market value" of "' + arrOfRowNames[indexOfId] + '"', function() {
        SlickGridFunctions.getRowData('Weights', arrOfRowNames[indexOfId], '').then(function(rowData) {
          rowData.forEach(function(rowValues, index) {
            if (index === portEndingMarketingValueIndex) {
              AuditMode.getValueFromCalculatedReport(arrOfRowNames[indexOfId], arrOfRowNames[indexOfId], 'Port. Ending Market Value', undefined, undefined, 'true').then(function(reference) {
                reference.getText().then(function(value) {
                  if (value !== rowValues) {
                    expect(false).customError('Audit value:"' + value + '" report value "' + rowValues + '"');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            }
          });
        });
      });

    });
  });

  describe('Test Step ID: 734540', function() {
    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');
  });
});
