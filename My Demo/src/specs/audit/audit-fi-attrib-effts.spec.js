'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: audit-fi-attrib-effts', function() {

  describe('Test Step ID: Start Up', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    // Commenting as we don't have this test step in QAI. And this is failing due to the incompatable chrome driver.
    xit('Should resize the browser window', function() {
      var width = 1920;
      var height = 1080;
      browser.driver.manage().window().setSize(width, height);
      browser.sleep(3000);
    });

  });

  describe('Test Step ID: 634002', function() {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3;Audit/AUDIT_FI_ATTRIB', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('audit-fi-attrib');
    });

    it('Should wait for "Spread Effect_Contribution" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Spread Effect_Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Spread Effect_Contribution', true).then(function(displayed) {
        expect(displayed).customError('"Spread Effect_Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Spread Effect_Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for element to load
      browser.sleep(5000);
    });

    it('Verifying if "Date" hyperlink is set to "5/23/2016 - 5/26/2016"', function() {
      PA3MainPage.getDateHyperLink('Spread Effect_Contribution').getText().then(function(text) {
        if (text !== '5/23/2016 - 5/26/2016') {
          expect(false).customError('"Date" hyperlink did not set to "5/23/2016 - 5/26/2016"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

  });

  describe('Test Step ID: 634012', function() {

    it('Should right click on "Allocation Effect(Local)" group value for security "3M company" and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Spread Effect_Contribution', '3M Company', '', 'Allocation Effect ( Local )')
        .then(function(ref) {
          PA3MainPage.rightClickAndSelectOption(ref, 'Audit Value');
        });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the title  is "Allocation Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Allocation Effect ( Local )') {
          expect(false).customError('Title did not "Allocation Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "3M Company"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== '3M Company') {
          expect(false).customError('Security value did not "3M Company"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all values for different securities as hyperlink for "Allocation Effect ( Local )" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Allocation Effect ( Local )', '').then(function(arr) {
        arr.forEach(function(value, index) {
          // Adding logic for Total row
          var rowNum = index - 1;
          if (value !== 'Total') {
            AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', 'Allocation Effect ( Local )',
              'slick-pane slick-pane-bottom slick-pane-right', rowNum, true).then(function(value1) {
              Utilities.scrollElementToVisibility(value1);
              expect(value1.$('a').isPresent()).toBeTruthy();
            });
          }

        });
      });
    });

    it('Verifying if values are displayed in "Allocation Effect ( Local )" column for different sceurites', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Allocation Effect ( Local )', 'Allocation Effect ( Local )').then(function(arr) {
        arr.forEach(function(ele) {
          if (ele === '') {
            expect(false).customError('Values did not display in "Allocation Effect ( Local )"  column ' +
              ' for different securities');
            CommonFunctions.takeScreenShot();
          }

        });
      });

    });

  });

  describe('Test Step ID: 634003', function() {

    it('Should click on "Allocation Effect ( Local )" column hyperlink for the security "5/25/2016 to 5/26/2016"', function() {
      SlickGridFunctions.getCellReference('Allocation Effect ( Local )', '5/25/2016 to 5/26/2016', '', 'Allocation Effect ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Allocation Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Allocation Effect ( Local )') {
          expect(false).customError('Title did not "Allocation Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/25/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/25/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/25/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "3M Company"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== '3M Company') {
          expect(false).customError('Security value did not "3M Company"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['Allocation Effect ( Local )', 'Port. Beginning Weight', 'Bench. Beginning Weight',
      'Port. Residual Return ( Local )', 'Bench. Residual Return ( Local )',];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Allocation Effect ( Local )', 2, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            });
          });
      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Allocation Effect ( Local )', 2, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                value1.getText().then(function(ele) {
                  if (ele === '') {
                    expect(false).customError('Values did not display in "' + column + '"  column ' +
                      ' for different securities');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            });
          });
      });
    });

  });

  describe('Test Step ID: 636423', function() {

    it('Should click on "Port. Residual Return ( Local )" column hyperlink for the security "Total"', function() {
      SlickGridFunctions.getCellReference('Allocation Effect ( Local )', 'Total', '', 'Port. Residual Return ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Port. Residual Return ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Port. Residual Return ( Local )') {
          expect(false).customError('Title did not "Port. Residual Return ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/25/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/25/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/25/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['Port. Residual Return ( Local )', 'Port. Fixed Income Total Return', 'Port. Shift Return ( Local )',
      'Port. Twist Return ( Local )', 'Port. Carry Return ( Local )', 'Port. Spread Return ( Local )',
      'Port. Fixed Income Currency Return',];

    columns.forEach(function(columnName, index) {
      it('Verifying if "' + columnName + '" column is present in the audit view', function() {
        SlickGridFunctions.getColumnNames('Port. Residual Return ( Local )').then(function(arr) {
          if (arr[index + 2] !== columnName) {
            expect(false).customError(columns[index] + 'column is not present in the calculated report.');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    var flag = 0;

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Port. Residual Return ( Local )', 1, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Port. Residual Return ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                value1.$('a').isPresent().then(function(isExist) {
                  if (!isExist) {
                    flag = flag + 1;
                    expect(false).customError(column + 'column ,"' + value + '" row  value is not a hyperlink');
                    if (flag === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });

              }, function(err) {
                flag = flag + 1;
                expect(false).customError(err);
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });

      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Port. Residual Return ( Local )', column).then(function(arr) {
          arr.forEach(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "' + column + '"  column ' +
                ' for different securities');
              CommonFunctions.takeScreenShot();
            }

          });
        });
      });

    });
  });

  describe('Test Step ID: 636490', function() {

    it('Should click on "ReturnAttr_Port. Total Return" column hyperlink for the security "Total" i first report', function() {
      SlickGridFunctions.getCellReference('Spread Effect_Contribution', 'Total', '', 'ReturnAttr_Port. Total Return')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "ReturnAttr_Port. Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'ReturnAttr_Port. Total Return') {
          expect(false).customError('Title did not "ReturnAttr_Port. Total Return" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['Port. Fixed Income Total Return', 'Cumulative Port. Fixed Income Total Return'];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('ReturnAttr_Port. Total Return', '').then(function(arr) {
          arr.forEach(function(value, index) {
            // Adding logic for Total row
            var rowNum = index - 1;
            if (value !== 'Total') {
              AuditMode.getValueFromReportOfGivenColumn('ReturnAttr_Port. Total Return', column,
                'slick-pane slick-pane-bottom slick-pane-right', rowNum, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            }

          });
        });
      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('ReturnAttr_Port. Total Return', column).then(function(arr) {
          arr.forEach(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "' + column + '"  column ' +
                ' for different securities');
              CommonFunctions.takeScreenShot();
            }

          });
        });
      });

    });

  });

  describe('Test Step ID: 636370', function() {

    it('Should click on "Port. Fixed Income Total Return" column hyperlink for the security "5/25/2016 to 5/26/2016"', function() {
      SlickGridFunctions.getCellReference('ReturnAttr_Port. Total Return', '5/25/2016 to 5/26/2016', '', 'Port. Fixed Income Total Return')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Port. Fixed Income Total Return"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Port. Fixed Income Total Return') {
          expect(false).customError('Title did not "Port. Fixed Income Total Return" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/25/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/25/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/25/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['ReturnAttr_Port. Total Return', 'Port. Fixed Income Price Return', 'Port. Fixed Income Coupon Return',
      'Port. Fixed Income Paydown Return', 'Port. Fixed Income Currency Return',];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Port. Fixed Income Total Return', 1, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Port. Fixed Income Total Return', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            });
          });

      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Port. Fixed Income Total Return', column).then(function(arr) {
          arr.forEach(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "' + column + '"  column ' +
                ' for different securities');
              CommonFunctions.takeScreenShot();
            }

          });
        });
      });

    });

  });

  describe('Test Step ID: 634009', function() {

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Spread Effect_Contribution" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Spread Effect_Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Spread Effect_Contribution', true).then(function(displayed) {
        expect(displayed).customError('"Spread Effect_Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Spread Effect_Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on Info Box to close', function() {
      PA3MainPage.closeQAInfoBox().then(function(flag) {
        if (!flag) {
          expect(false).customError('InfoBox dod not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Hamburger" icon next to "Portfolio" widget', function() {
      PA3MainPage.getHamburgerIcon('Portfolio').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Account menu drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Bloomberg Barclays Emerging Markets Brazil International Issue - Corporate" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Bloomberg Barclays Emerging Markets Brazil International Issue - Corporate')
        .click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Bloomberg Barclays Emerging Markets Brazil International Issue - Corporate" account is selected
      PA3MainPage.getSingleAccountFromList('Portfolio', 'Bloomberg Barclays Emerging Markets Brazil International Issue - Corporate')
        .getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Bloomberg Barclays Emerging Markets Brazil International Issue - Corporate" ' +
            'did not select in Portfolio drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Portfolio').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Portfolio" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Spread Effect_Contribution" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Spread Effect_Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Spread Effect_Contribution', true).then(function(displayed) {
        expect(displayed).customError('"Spread Effect_Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Spread Effect_Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the "Hamburger" icon next to "Benchmark" widget', function() {
      PA3MainPage.getHamburgerIcon('Benchmark').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that Account window opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Account menu drop down is not displayed');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Bloomberg Barclays Emerging Market Local Currency: Brazil" from the list of accounts', function() {
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Bloomberg Barclays Emerging Market Local Currency: Brazil')
        .click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // Verifying that "Bloomberg Barclays Emerging Market Local Currency: Brazil" account is selected
      PA3MainPage.getSingleAccountFromList('Benchmark', 'Bloomberg Barclays Emerging Market Local Currency: Brazil')
        .getAttribute('class').then(function(text) {
        if (text.indexOf('selected') < 0) {
          expect(false).customError('"Bloomberg Barclays Emerging Market Local Currency: Brazil" ' +
            'did not select in Benchmark drop down');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "OK" button to close the "Account" drop down', function() {
      ThiefHelpers.getButtonClassReference('OK').press().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      // verifying that "Accounts" drop down is closed
      PA3MainPage.getHamburgerIcon('Benchmark').getAttribute('Class').then(function(text) {
        if (text.indexOf('active') > 0) {
          expect(false).customError('"Benchmark" account drop down did not close');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should wait for "Spread Effect_Contribution" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Spread Effect_Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Spread Effect_Contribution', true).then(function(displayed) {
        expect(displayed).customError('"Spread Effect_Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Spread Effect_Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait to element appear
      browser.sleep(5000);
    });

    it('Should right click on "Allocation Effect(Local)" group value for security "Total" and select "Audit Value"', function() {
      SlickGridFunctions.getCellReference('Spread Effect_Contribution', 'Total', '', 'Allocation Effect ( Local )')
        .then(function(ref) {
          PA3MainPage.rightClickAndSelectOption(ref, 'Audit Value');
        });
    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if "Audit Mode" page is opened', function() {
      AuditMode.isAuditMode().then(function(flag) {
        if (!flag) {
          expect(false).customError('"Audit Mode" page did not open');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the title  is "Allocation Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Allocation Effect ( Local )') {
          expect(false).customError('Title did not "Allocation Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all values for different securities as hyperlink for "Allocation Effect ( Local )" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Allocation Effect ( Local )', '').then(function(arr) {
        arr.forEach(function(value, index) {
          // Adding logic for Total row
          var rowNum = index - 1;
          if (value !== 'Total') {
            AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', 'Allocation Effect ( Local )',
              'slick-pane slick-pane-bottom slick-pane-right', rowNum, true).then(function(value1) {
              expect(value1.$('a').isPresent()).toBeTruthy();
            });
          }

        });
      });
    });

    var arr = ['5/25/2016 to 5/26/2016', '5/24/2016 to 5/25/2016', '5/23/2016 to 5/24/2016'];

    arr.forEach(function(rowName) {
      it('Verifying if values are displayed in "Cumulative Allocation Effect ( Local )" column for "' + rowName + '" row', function() {
        SlickGridFunctions.getCellReference('Allocation Effect ( Local )', rowName, '', 'Cumulative Allocation Effect ( Local )').then(function(ref) {
          ref.getText().then(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "Cumulative Allocation Effect ( Local )"  column ' +
                ' for "' + rowName + '" row');
              CommonFunctions.takeScreenShot();
            }

          });
        });

      });
    });

  });

  describe('Test Step ID: 634013', function() {

    it('Should click on "Allocation Effect ( Local )" column hyperlink for the security "5/24/2016 to 5/25/2016"', function() {
      SlickGridFunctions.getCellReference('Allocation Effect ( Local )', '5/24/2016 to 5/25/2016', '', 'Allocation Effect ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Allocation Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Allocation Effect ( Local )') {
          expect(false).customError('Title did not "Allocation Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/24/2016 - 5/25/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/24/2016 - 5/25/2016') {
          expect(false).customError('The Audit date range is not matched with "5/24/2016 - 5/25/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['Allocation Effect ( Local )', 'Port. Beginning Weight', 'Bench. Beginning Weight',
      'Port. Residual Return ( Local )', 'Bench. Residual Return ( Local )',];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Allocation Effect ( Local )', 1, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            });
          });
      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Allocation Effect ( Local )', column).then(function(arr) {
          arr.forEach(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "' + column + '"  column ' +
                ' for different securities');
              CommonFunctions.takeScreenShot();
            }

          });
        });
      });
    });

  });

  describe('Test Step ID: 634014', function() {

    it('Should click on "Allocation Effect ( Local )" column hyperlink for the security "Andrade Gutierrez SA"', function() {
      SlickGridFunctions.getCellReference('Allocation Effect ( Local )', 'Andrade Gutierrez SA', '', 'Allocation Effect ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Allocation Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Allocation Effect ( Local )') {
          expect(false).customError('Title did not "Allocation Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/24/2016 - 5/25/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/24/2016 - 5/25/2016') {
          expect(false).customError('The Audit date range is not matched with "5/24/2016 - 5/25/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Andrade Gutierrez SA"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Andrade Gutierrez SA') {
          expect(false).customError('Security value did not "Andrade Gutierrez SA"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Senior is child of "Andrade Gutierrez SA"', function() {
      AuditMode.getElementFromCalculatedTree('Allocation Effect ( Local )', 'Andrade Gutierrez SA', 'Senior', undefined, true).isPresent()
        .then(function(flag) {
          if (!flag) {
            expect(false).customError('Senior did not child of "Andrade Gutierrez SA"');
            CommonFunctions.takeScreenShot();
          }

        });
    });

    var columns = ['Allocation Effect ( Local )', 'Port. Beginning Weight', 'Bench. Beginning Weight',
      'Port. Residual Return ( Local )', 'Bench. Residual Return ( Local )',];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Allocation Effect ( Local )', 2, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            });
          });
      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Allocation Effect ( Local )', 2, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Allocation Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                value1.getText().then(function(ele) {
                  if (ele === '') {
                    expect(false).customError('Values did not display in "' + column + '"  column ' +
                      ' for different securities');
                    CommonFunctions.takeScreenShot();
                  }
                });
              });
            });
          });
      });
    });

  });

  describe('Test Step ID: 634015', function() {

    it('Should click on "Total Effect ( Local )" column hyperlink for the security "Cielo" first report', function() {
      SlickGridFunctions.getCellReference('Spread Effect_Contribution', 'Cielo', '', 'Total Effect ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Total Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Total Effect ( Local )') {
          expect(false).customError('Title did not "Total Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Cielo"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Cielo') {
          expect(false).customError('Security value did not "Cielo"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all values for different securities as hyperlink for "Total Effect ( Local )" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Effect ( Local )', '').then(function(arr) {
        arr.forEach(function(value, index) {
          // Adding logic for Total row
          var rowNum = index - 1;
          if (value !== 'Total') {
            AuditMode.getValueFromReportOfGivenColumn('Total Effect ( Local )', 'Total Effect ( Local )',
              'slick-pane slick-pane-bottom slick-pane-right', rowNum, true).then(function(value1) {
              expect(value1.$('a').isPresent()).toBeTruthy();
            });
          }

        });
      });
    });

    var arr = ['5/25/2016 to 5/26/2016', '5/24/2016 to 5/25/2016', '5/23/2016 to 5/24/2016'];

    arr.forEach(function(rowName) {
      it('Verifying if values are displayed in "Cumulative Total Effect ( Local )" column for "' + rowName + '" row', function() {
        SlickGridFunctions.getCellReference('Total Effect ( Local )', rowName, '', 'Cumulative Total Effect ( Local )').then(function(ref) {
          ref.getText().then(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "Cumulative Total Effect ( Local )"  column ' +
                ' for "' + rowName + '" row');
              CommonFunctions.takeScreenShot();
            }

          });
        });

      });
    });

  });

  describe('Test Step ID: 634016', function() {

    it('Should click on "Total Effect ( Local )" column hyperlink for the security "5/23/2016 to 5/24/2016"', function() {
      SlickGridFunctions.getCellReference('Total Effect ( Local )', '5/23/2016 to 5/24/2016', '', 'Total Effect ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Total Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Total Effect ( Local )') {
          expect(false).customError('Title did not "Total Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/24/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/24/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/24/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Cielo"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Cielo') {
          expect(false).customError('Security value did not "Cielo"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if Senior is child of "Cielo"', function() {
      AuditMode.getElementFromCalculatedTree('Total Effect ( Local )', 'Cielo', 'Senior', undefined, true).isPresent()
        .then(function(flag) {
          if (!flag) {
            expect(false).customError('Senior did not child of "Andrade Gutierrez SA"');
            CommonFunctions.takeScreenShot();
          }

        });
    });

    var columns = ['Total Effect ( Local )', 'Shift Effect ( Local )', 'Twist Effect ( Local )',
      'Carry Effect ( Local )', 'Spread Effect ( Local )', 'Allocation Effect ( Local )', 'Selection Effect ( Local )',];
    var flag = 0;

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Total Effect ( Local )', 2, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Total Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                value1.$('a').isPresent().then(function(isExist) {
                  if (!isExist) {
                    flag = flag + 1;
                    expect(false).customError(column + 'column ,"' + value + '" row  value is not a hyperlink');
                    if (flag === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              }, function(err) {
                flag = flag + 1;
                expect(false).customError(err);
                if (flag === 1) {
                  CommonFunctions.takeScreenShot();
                }
              });
            });
          });
      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Total Effect ( Local )', 2, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Total Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                value1.getText().then(function(ele) {
                  if (ele === '') {
                    flag = flag + 1;
                    expect(false).customError('Values did not display in "' + column + '"  column ' +
                      ' for different securities');
                    if (flag === 1) {
                      CommonFunctions.takeScreenShot();
                    }
                  }
                });
              });
            });
          });
      });
    });

  });

  describe('Test Step ID: 634017', function() {

    it('Should click on "Total Effect ( Local )" column hyperlink for the security "Total"', function() {
      SlickGridFunctions.getCellReference('Total Effect ( Local )', 'Total', '', 'Twist Effect ( Local )')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Twist Effect ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Twist Effect ( Local )') {
          expect(false).customError('Title did not "Total Effect ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/24/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/24/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/24/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['Twist Effect ( Local )', 'Port. Beginning Weight', 'Port. Twist Return ( Local )',
      'Port. Beginning Effective Duration', 'Port. DMT Yield Change', 'Bench. Beginning Weight',
      'Bench. Twist Return ( Local )', 'Bench. Beginning Effective Duration', 'Bench. DMT Yield Change', 'Shift Point Yield Change',];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Twist Effect ( Local )', 1, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Twist Effect ( Local )', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                Utilities.scrollElementToVisibility(value1);
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            });
          });

      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Twist Effect ( Local )', column).then(function(arr) {
          arr.forEach(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "' + column + '"  column ' +
                ' for different securities');
              CommonFunctions.takeScreenShot();
            }

          });
        });
      });

    });

  });

  describe('Test Step ID: 634018', function() {

    it('Should click on "Total Currency Effect" column hyperlink for the security "Total" first report', function() {
      SlickGridFunctions.getCellReference('Spread Effect_Contribution', 'Total', '', 'Total Currency Effect')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Total Currency Effect"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Total Currency Effect') {
          expect(false).customError('Title did not "Total Currency Effect" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/23/2016 - 5/26/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/23/2016 - 5/26/2016') {
          expect(false).customError('The Audit date range is not matched with "5/23/2016 - 5/26/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if all values for different securities as hyperlink for "Total Currency Effect" column', function() {
      SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Currency Effect', '').then(function(arr) {
        arr.forEach(function(value, index) {
          // Adding logic for Total row
          var rowNum = index - 1;
          if (value !== 'Total') {
            AuditMode.getValueFromReportOfGivenColumn('Total Currency Effect', 'Total Currency Effect',
              'slick-pane slick-pane-bottom slick-pane-right', rowNum, true).then(function(value1) {
              expect(value1.$('a').isPresent()).toBeTruthy();
            });
          }

        });
      });
    });

    var arr = ['5/25/2016 to 5/26/2016', '5/24/2016 to 5/25/2016', '5/23/2016 to 5/24/2016'];

    arr.forEach(function(rowName) {
      it('Verifying if values are displayed in "Cumulative Total Currency Effect" column for "' + rowName + '" row', function() {
        SlickGridFunctions.getCellReference('Total Currency Effect', rowName, '', 'Cumulative Total Currency Effect').then(function(ref) {
          ref.getText().then(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "Cumulative Total Currency Effect"  column ' +
                ' for "' + rowName + '" row');
              CommonFunctions.takeScreenShot();
            }

          });
        });

      });
    });

  });

  describe('Test Step ID: 636364', function() {

    it('Should click on "Total Currency Effect" column hyperlink for the security "5/24/2016 to 5/25/2016"', function() {
      SlickGridFunctions.getCellReference('Total Currency Effect', '5/24/2016 to 5/25/2016', '', 'Total Currency Effect')
        .then(function(ref) {
          ref.click().then(function() {
          }, function(err) {

            expect(false).customError(err);
            CommonFunctions.takeScreenShot();
          });
        });

    });

    it('Should Wait for "Audit" report to calculate', function() {
      Utilities.waitUntilElementDisappears(AuditMode.getReportCalculationDlg(), 120000);
    });

    it('Verifying if any error dialog box is not appeared', function() {
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });

      // Wait for the web element to load.
      browser.sleep(3000);
    });

    it('Verifying if the title  is "Total Currency ( Local )"', function() {
      AuditMode.getAuditViewHeaderName().getText().then(function(text) {
        if (text !== 'Total Currency Effect') {
          expect(false).customError('Title did not "Total Currency ( Local )" Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that Date range on top of the Audit view should display as "5/24/2016 - 5/25/2016"', function() {
      element(by.xpath(AuditMode.xpathAuditDate)).getText().then(function(value) {
        if (value !== '5/24/2016 - 5/25/2016') {
          expect(false).customError('The Audit date range is not matched with "5/24/2016 to 5/25/2016"; Found: ' + value);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if the security is "Total"', function() {
      AuditMode.getAuditViewSubHeader().getText().then(function(text) {
        if (text !== 'Total') {
          expect(false).customError('Security value did not "Total"; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var columns = ['Total Currency Effect', 'Total Effect', 'Total Effect ( Local )'];

    columns.forEach(function(column) {

      it('Verifying if all values for different securities as hyperlink for "' + column + '" column', function() {
        AuditMode.getAllElementFromSpecifiedLevelOfCalculatedReport('Total Currency Effect', 1, true).getText()
          .then(function(arr) {
            arr.forEach(function(value, index) {
              AuditMode.getValueFromReportOfGivenColumn('Total Currency Effect', column,
                'slick-pane slick-pane-bottom slick-pane-right', index, true).then(function(value1) {
                expect(value1.$('a').isPresent()).toBeTruthy();
              });
            });
          });

      });

      it('Verifying if values are displayed in "' + column + '" Column column for different sceurites', function() {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('Total Currency Effect', column).then(function(arr) {
          arr.forEach(function(ele) {
            if (ele === '') {
              expect(false).customError('Values did not display in "' + column + '"  column ' +
                ' for different securities');
              CommonFunctions.takeScreenShot();
            }

          });
        });
      });

    });

    it('Should click on "Done" button to close the Audit mode', function() {
      ThiefHelpers.getButtonClassReference('Done').press().then(function() {
      }, function() {

        expect(false).customError('Unable to click on "Done" button');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should wait for "Spread Effect_Contribution" report to calculate', function() {
      // Wait for report calculation to start
      expect(Utilities.waitUntilElementDisappears(PA3MainPage.getReportCalculationDlg(), 600000)).toBeTruthy();
    });

    it('Verifying if calculated data for "Spread Effect_Contribution" report appeared without any errors', function() {
      PA3MainPage.isReportCalculated('Spread Effect_Contribution', true).then(function(displayed) {
        expect(displayed).customError('"Spread Effect_Contribution" report is not displayed on the webpage.');
        if (!displayed) {
          CommonFunctions.takeScreenShot();
        }
      }, function(error) {

        if (error.name === 'StaleElementReferenceError') {
          expect(PA3MainPage.isReportCalculated('Spread Effect_Contribution')).toBeTruthy();
        } else {
          expect(false).customError(error);
          CommonFunctions.takeScreenShot();
        }
      });

      // Verifying if any error dialog box appeared
      ThiefHelpers.isDialogOpen('Calculation Error').then(function(flag) {
        if (flag) {
          expect(false).customError('"Calculation Error" dialog opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Commenting as we don't have this test step in QAI. And this is failing due to the incompatable chrome driver.
    xit('Should maximize the browser window', function() {
      browser.driver.manage().window().maximize();
      browser.sleep(5000);
    });

  });

});
