'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-grp-total', function() {

  // Variable(s)
  var rowClassName = 'slick-pane slick-pane-bottom slick-pane-left';
  var colClassName = 'slick-pane slick-pane-bottom slick-pane-right';
  var rowClassName1 = 'slick-pane slick-pane-top slick-pane-left';
  var colClassName1 = 'slick-pane slick-pane-top slick-pane-right';

  describe('Test Step ID: 549896', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch PA3 Application with "Client:/Pa3/Audit/AUDIT_STATISTICS" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-statistics');
    });

    it('Should select "Contribution - Audit Tests" from the LHP', function() {
      PA3MainPage.getReports('Contribution - Audit Tests').click();
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution - Audit Tests`);

    it('Verifying that the report is grouped by "Economic Sector"', function() {
      expect(PA3MainPage.getGroupingsHyperLink('Contribution - Audit Tests').getText()).toEqual('Economic Sector');
      browser.sleep(3000);
    });

  });

  describe('Test Step ID: 549897', function() {

    it('Should right click on the "Market Capitalization" value for "Communications" grouping and select audit Value', function() {
      PA3MainPage.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Market Capitalization',
        rowClassName, colClassName, 'true').then(function(reference) {
          PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
        });
    });

    it('Verifying if the PA3MainPage launched in "AUDIT" mode', function() {
      expect(AuditMode.isAuditMode()).toBeTruthy();
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying audit section Title is "Market Capitalization"', function() {
      expect(AuditMode.getAuditViewHeaderName().getText()).toContain('Market Capitalization');
    });

    it('Verify that Audit View displays Market Capitalization, Port. Beginning Weight and Normalized Weight columns.',
      function() {
        var arrOptions = ['Market Capitalization', 'Port. Beginning Weight', 'Normalized Weight'];
        AuditMode.getAllColumnOfCalculatedReport('Market Capitalization', true).each(function(eleRef, index) {
          Utilities.scrollElementToVisibility(eleRef);
          eleRef.getText().then(function(value) {
            value = value.replace(/\n/g, ' ');
            if (index >= 1) {
              expect(value).toEqual(arrOptions[index - 1]);
            }
          });
        });
      });

    it('Verifying that the "Total" value for "Market Capitalization" should be same in both Report and Audit views ', function() {

      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').then(function(references) {
        references.forEach(function(eleRef, index) {
          if (index <= 11) {
            browser.actions().mouseMove(eleRef).perform();
          }
        });
      });

      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Total', 'Market Capitalization',
        rowClassName1, colClassName1).then(function(reportValue) {
          browser.sleep(3000);
          AuditMode.getValueFromCalculatedReport('Market Capitalization', 'Total', 'Market Capitalization',
            rowClassName1, colClassName1, undefined, true).then(function(contentValue) {
              AuditMode.roundAndMatch(reportValue, contentValue);
            });
        });
    });

    it('Verifying that the the "Communications" value for "Market Capitalization" should be same in both Report and Audit views ',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Market Capitalization',
          rowClassName, colClassName).then(function(reportValue) {
            browser.sleep(3000);
            AuditMode.getValueFromCalculatedReport('Market Capitalization', 'Communications',
              'Market Capitalization', rowClassName, colClassName, undefined, true).then(function(contentValue) {
                AuditMode.roundAndMatch(reportValue, contentValue);
              });
          });
      });

    it('Verifying that Column Help section is displayed with Title "Market Capitalization"', function() {
      expect(AuditMode.getColumnHelpSectionName().getText()).toEqual('Market Capitalization');
    });

  });

  describe('Test Step ID: 549898', function() {

    it('In report view should click on the "Price to Earnings" value for "Communications"', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Price to Earnings',
        undefined, undefined, true).then(function(reference) {
          reference.click();
        });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 300000);
    });

    it('Verify that Audit View displays Price to Earnings, Port. Beginning Weight and Normalized Weight columns.',
      function() {
        var arrOptions = ['Price to Earnings', 'Port. Beginning Weight', 'Normalized Weight'];
        AuditMode.getAllColumnOfCalculatedReport('Price to Earnings', true).each(function(eleRef, index) {
          Utilities.scrollElementToVisibility(eleRef);
          eleRef.getText().then(function(value) {
            value = value.replace(/\n/g, ' ');
            if (index >= 1) {
              expect(value).toEqual(arrOptions[index - 1]);
            }
          });
        });
      });

    it('Verifying that the "Total" row value for "Price to Earnings" should be same in both Report and Audit views ', function() {
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Total', 'Price to Earnings',
        rowClassName1, colClassName1).then(function(reportValue) {
          browser.sleep(3000);
          AuditMode.getValueFromCalculatedReport('Price to Earnings', 'Total', 'Price to Earnings', rowClassName1,
            colClassName1, undefined, true).then(function(contentValue) {
              AuditMode.roundAndMatch(reportValue, contentValue);
            });
        });
    });

    it('Verifying that the Communications value for "Price to Earnings" should be same in both Report and Audit views ',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Price to Earnings',
          rowClassName, colClassName).then(function(reportValue) {
            AuditMode.getValueFromCalculatedReport('Price to Earnings', 'Communications', 'Price to Earnings',
              rowClassName, colClassName, undefined, true).then(function(contentValue) {
                AuditMode.roundAndMatch(reportValue, contentValue);
              });
          });
      });
  });

  describe('Test Step ID: 549899', function() {

    it('In report view should click on the "Latest Quarter Mean Estimate" value for "Communications"', function() {
      AuditMode.getAllColumnOfCalculatedReport('Contribution - Audit Tests').each(function(eleRef, index) {
        if (index <= 11) {
          browser.actions().mouseMove(eleRef).perform();
        }
      });
      AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications', 'Latest Quarter Mean Estimate',
        undefined, undefined, true).then(function(reference) {
          reference.click();
        });
    });

    it('Waiting for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 300000);
    });

    it('Verify that Audit View displays Latest Quarter Mean Estimate, Port. Beginning Weight and Normalized Weight columns.',
      function() {
        var arrOptions = ['Latest Quarter Mean Estimate', 'Port. Beginning Weight', 'Normalized Weight'];
        AuditMode.getAllColumnOfCalculatedReport('Latest Quarter Mean Estimate', true).each(function(eleRef, index) {
          Utilities.scrollElementToVisibility(eleRef);
          eleRef.getText().then(function(value) {
            value = value.replace(/\n/g, ' ');
            if (index >= 1) {
              expect(value).toEqual(arrOptions[index - 1]);
            }
          });
        });
      });

    it('Verifying that the "Total" value for "Latest Quarter Mean Estimate" should be same in both Report and Audit views ',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Total', 'Latest Quarter Mean Estimate',
          rowClassName1, colClassName1).then(function(reportValue) {
            AuditMode.getValueFromCalculatedReport('Latest Quarter Mean Estimate', 'Total', 'Latest Quarter Mean Estimate',
              rowClassName1, colClassName1).then(function(contentValue) {
                AuditMode.roundAndMatch(reportValue, contentValue);
              });
          });
      });

    it('Verifying that the "Communications" value for "Latest Quarter Mean Estimate" should be same in both Report and Audit views ',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications',
          'Latest Quarter Mean Estimate', rowClassName, colClassName).then(function(reportValue) {
            AuditMode.getValueFromCalculatedReport('Latest Quarter Mean Estimate', 'Communications',
              'Latest Quarter Mean Estimate', rowClassName, colClassName).then(function(contentValue) {
                AuditMode.roundAndMatch(reportValue, contentValue);
              });
          });
      });
  });

  describe('Test Step ID: 549900', function() {

    it('Click on the left arrow in the Audit View', function() {
      AuditMode.getArrowButton('left').click();
    });

    it('Verifying audit section title is "Price to Earnings" ', function() {
      expect(AuditMode.getAuditViewHeaderName().getText()).toContain('Price to Earnings');
    });

    it('Verify that "Latest Quarter Mean Estimate" total value cell for Communications should be highlighted in yellow color',
      function() {
        AuditMode.getValueFromCalculatedReport('Contribution - Audit Tests', 'Communications',
          'Latest Quarter Mean Estimate', undefined, undefined, true).then(function(value) {
            expect(value.getAttribute('class')).toContain('selected');
          });
      });

  });

  describe('Test Step ID: 549902', function() {

    it('Click on the right arrow in the Audit View', function() {
      AuditMode.getArrowButton('right').click();
    });

    it('Verifying audit section title is "Latest Quarter Mean Estimate" ', function() {
      expect(AuditMode.getAuditViewHeaderName().getText()).toContain('Latest Quarter Mean Estimate');
    });

  });

  describe(`Test Step ID: 777539`, () => {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should launch PA3 Application with "Client:;Pa3;Audit;Audit_Multi_Port_OA" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-multi-port-oa');
    });

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Performance', true, 'isSelected');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Performance`);

    it('Should right click on "4/30/2015 to 5/29/2015" group value from "Total Return" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Performance', '4/30/2015 to 5/29/2015', '', 'Total Return', 'Russell 1000 Value').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Total Return - Russell 1000 Value`);

    it(`Double click on dates column`, () => {
      SlickGridFunctions.getHeaderCellReference(`Total Return - Russell 1000 Value`, ``).then(function(ref) {

        // Double clicking on the cell
        browser.actions().doubleClick(ref).perform();
      });
    });

    AuditMode.verifyIfReportIsCalculated(`Total Return - Russell 1000 Value`);

    let arrOfFirstDate1 = [];
    let arrOfFirstDate = [];
    let arrOfLastDate1 = [];
    let arrOfLastDate = [];
    it(`Storing the values for future use`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Return - Russell 1000 Value', '').then(function(arr) {
        arr.forEach(function(rowRef) {
          if (rowRef !== 'Total') {
            var colvalue = rowRef.split(' to ');
            arrOfFirstDate.push(colvalue[0]);
            arrOfFirstDate1.push(colvalue[0]);
            arrOfLastDate.push(colvalue[1]);
            arrOfLastDate1.push(colvalue[1]);
          }
        });
      });
    });

    it(`Verify if dates are displayed in decending order`, () => {
      let needScreenShot = 0;
      var verify = (i) => {
        if (arrOfFirstDate[i] !== arrOfFirstDate1[i]) {
          if (arrOfLastDate[i] === arrOfLastDate1[i]) {
            expect(false).customError(`Dates are not sorted in decending order.`);
            needScreenShot++;
          }
        } else {
          expect(false).customError(`Dates are not sorted in decending order.`);
          needScreenShot++;
        }

        if (needScreenShot === 1) {
          CommonFunctions.takeScreenShot();
        }
      };

      arrOfFirstDate.sort();
      arrOfLastDate.sort();
      for (let i = 0; i < arrOfFirstDate.length; i++) {
        if (arrOfFirstDate.length % 2 === 0) {
          verify(i);
        } else {
          if (i !== ((arrOfFirstDate.length - 1) / 2) + 1) {
            verify(i);
          }
        }

      }
    });

    it(`Verifying dates are displayed with one day difference under "Total" column header`, () => {
      // Number Of days between the given dates
      let date_diff_indays = (dat1, dat2) => (new Date(dat2) - new Date(dat1)) / (24 * 60 * 60 * 1000);

      // Verifying if given date is a business day
      let format = (fullDate, ExpectedDate) => {
        Utilities.getBusinessDate(fullDate, '/').then(date2 => {
          if (date2 !== ExpectedDate) {
            expect(false).customError(`Expected "${ExpectedDate}" but Found: "${date2}".`);
            CommonFunctions.takeScreenShot();
          }
        });
      };

      // Getting the next day if the difference between the days is more then 1
      let verifyIfNextIsNotBusinessDate = (date) => {
        let date1 = date.split(`/`);
        let date2 = parseInt(date1[1]) + 1;
        var fullDate = date1[0] + `/` + date2 + `/` + date1[2];
        format(fullDate, date);
      };

      for (let i = 0; i < arrOfFirstDate.length; i++) {
        if (date_diff_indays(arrOfFirstDate1[i], arrOfLastDate1[i]) !== 1) {
          verifyIfNextIsNotBusinessDate(arrOfFirstDate1[i]);
        } else {
          format(arrOfFirstDate1[i], arrOfFirstDate1[i]);
        }
      }
    });
  });

  describe('Test Step ID: 549901', function() {

    it('Should click on "Done" button in Audit Window', function() {
      AuditMode.getButton('Done').click();
    });

    it('Should verify that the report is not auto calculated', function() {
      expect(PA3MainPage.getReportCalculationDlg().isPresent()).toBeFalsy();
    });

    it('Should verify that the report is displayed ', function() {
      expect(PA3MainPage.getReportCalculationDlg('Performance').isPresent()).toBeFalsy();
      PA3MainPage.isReportCalculated('Performance', true).then(function(displayed) {
        if (!displayed) {
          expect(false).customError('"Performance" report is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe(`Test Step ID: 779678`, () => {

    it('Should launch PA3 Application with "Client:;Pa3;Bench_fixed_average_weight" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('bench-fixed-average-weight');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Contribution to Return`);

    it('Should click on "Hamburger" icon next to "Portfolio"', function() {
      var xpathOfPortfolioHambergerIcon = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfPortfolioOrBenchmarkHambergerIcon, 'Portfolio');

      ThiefHelpers.getButtonClassReference(undefined, xpathOfPortfolioHambergerIcon).press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Hamburger" icon next to "Portfolio"');
        CommonFunctions.takeScreenShot();
      });

      ThiefHelpers.isDropDownOpen().then(function(found) {
        if (!found) {
          expect(false).customError('Account dropdown was not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrAccounts1 = [`Russell 3000`, `PRICING_SOURCES2`];
    it('Verify if expected accountsmare displayed', function() {
      PA3MainPage.getListFromAccountDropdown('Portfolio', true).then(function(arrayOfReferences) {
        arrayOfReferences.forEach(function(ref, index) {
          ref.getText().then(function(text) {
            if (text !== arrAccounts1[index]) {
              expect(false).customError(`Expected "${arrAccounts1[index]}" but Found "${text}".`);
              CommonFunctions.takeScreenShot();
            }
          });
        });
      });
    });

    it(`Verifying that "Use Multiple Portfolios" check box is checked`, () => {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xptahCheckboxFromAccountsDropdown, 'Use Multiple Portfolios');

      ThiefHelpers.getCheckBoxClassReference(undefined, xpath).isChecked().then(value => {
        if (!value) {
          expect(false).customError('"Use Multiple Portfolios" checkbox is not checked');
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe(`Test Step ID: 779681`, () => {

    it('Should click on "Cancel" button of the porfolio drop down', function() {
      var xpath = CommonFunctions.replaceStringInXpath(PA3MainPage.xpathOfHambergeraIconButtons, 'cancel');

      ThiefHelpers.getButtonClassReference(undefined, xpath).press().then(function() { }, function() {

        expect(false).customError('Unable to click on "Cancel" button of the hamberger icon.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should right click on "1-800-FLOWERS.COM, Inc. Class A" group value from "Bench. Average Weight" column and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Contribution to Return', '1-800-FLOWERS.COM, Inc. Class A', '', 'Bench. Average Weight', '').then(function(reference) {
        PA3MainPage.rightClickAndSelectOption(reference, 'Audit Value');
      });
    });

    it(`verify if the error text saying "Auditing is unavailable for this column." is displayed`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AuditMode.xpathOfAuditErrorMessage, 'Auditing is unavailable for this column.'))).isDisplayed().
      then(displayed=> {
        if (!displayed) {
          expect(false).customError(`Text saying "Auditing is unavailable for this column." is not displayed`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

});
