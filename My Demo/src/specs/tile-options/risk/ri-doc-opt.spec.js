'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-doc-opt', function() {

  // Local Functions
  var verifyRiskSummeryReportValues = function(arrRiskSummeryValues1, arrRiskSummeryValues2, arrRiskSummeryColumnNames, arrRiskSummeryMultiHeadername) {

    it('Verify if the values for "RiskSummery" are displayed as expected', function() {
      var needScreenShot = 0;
      arrRiskSummeryMultiHeadername.forEach(function(multiHeaderName, index) {
        SlickGridFunctions.getAllCellValuesFromSingleColumn('RiskSummary', arrRiskSummeryColumnNames[index], multiHeaderName).then(function(columnValues) {
          columnValues.forEach(function(value, index) {
            var reportvalues = parseFloat(value).toFixed(2);
            if (multiHeaderName === 'RI_FDS_MSFT vs. RI_IBM_GE') {
              if (reportvalues !== arrRiskSummeryValues1[index]) {
                expect(false).customError('Values under "' + multiHeaderName + '" in "' + arrRiskSummeryColumnNames[index] + '"not displayed' +
                  ' as Expected: "' + arrRiskSummeryValues1[index] + '" but Found: "' + reportvalues + '".');
                needScreenShot++;
              }
            } else {
              if (reportvalues !== arrRiskSummeryValues2[index]) {
                expect(false).customError('Values under "' + multiHeaderName + '" in "' + arrRiskSummeryColumnNames[index] + '"not displayed' +
                  ' as Expected: "' + arrRiskSummeryValues2[index] + '" but Found: "' + reportvalues + '".');
                needScreenShot++;
              }
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }
          });
        });

      });
    });

  };

  var verifyFactorExposureORFactorSubperiodReportValues = function(reportName, firstRowValues, lastRowValues) {
    it(' Verifying if the first and last row values of "' + reportName + '" report', function() {
      var needScreenShot = 0;
      SlickGridFunctions.getAllCellValuesFromSingleColumn(reportName, '').then(function(values) {
        var lastAndFirst = [0, values.length - 2];
        lastAndFirst.forEach(function(index) {
          SlickGridFunctions.getRowData(reportName, index, '').then(function(rowData) {
            rowData.forEach(function(values, indexs) {
              if (indexs !== 0) {
                if (index === 0) {
                  if (values !== firstRowValues[indexs - 1]) {
                    expect(false).customError('Expected: "' + firstRowValues[indexs - 1] + '" but Found: "' + values + '" in "' + reportName + '" report.');
                    needScreenShot++;
                  }
                }else {
                  if (values !== lastRowValues[indexs - 1]) {
                    expect(false).customError('Expected: "' + lastRowValues[indexs - 1] + '" but Found: "' + values + '" in "' + reportName + '" report.');
                    needScreenShot++;
                  }
                }
              }

              if (needScreenShot === 1) {
                CommonFunctions.takeScreenShot();
              }
            });
          });
        });
      });
    });
  };

  var verifyPerformanceSummaryReportValues = function(arrPerformenceSummeryReportValues) {

    it('Verifying the values in PerformanceSummary report', function() {
      SlickGridFunctions.getRowData('PerformanceSummary', 0, '').then(function(rowData) {
        rowData.forEach(function(reportValues, index) {
          if (index !== 0) {
            if (reportValues !== arrPerformenceSummeryReportValues[index - 1]) {
              expect(false).customError('Expected: "' + arrPerformenceSummeryReportValues[index - 1] + '" but Found: "' + reportValues + '" in PerformanceSummary report.');
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  };

  var verifyWeightsOrSecuritySubperiodReportValues = function(reportName, arrRowValues0, arrRowValues1, arrRowValues2, arrRowValues3, arrRowValues4) {
    it(' Verifying the values of SecuritySubperiod report', function() {
      var  needScreenShot = 0;
      var compareRowValues = function(i) {
        SlickGridFunctions.getRowData(reportName, i, '').then(function(rowData) {
          rowData.forEach(function(reportValues, index) {
            if (index !== 0) {
              if (i === 0) {
                if (reportValues !== arrRowValues0[index - 1]) {
                  expect(false).customError('Expected: "' + arrRowValues0[index - 1] + '" but Found: "' + reportValues + '" in "' + rowData[0] + '" of "' + reportName + '" report.');
                  needScreenShot++;
                }
              } else if (i === 1) {
                if (reportValues !== arrRowValues1[index - 1]) {
                  expect(false).customError('Expected: "' + arrRowValues1[index - 1] + '" but Found: "' + reportValues + '" in "' + rowData[0] + '" of "' + reportName + '" report.');
                  needScreenShot++;
                }
              } else if (i === 2) {
                if (reportValues !== arrRowValues2[index - 1]) {
                  expect(false).customError('Expected: "' + arrRowValues2[index - 1] + '" but Found: "' + reportValues + '" in "' + rowData[0] + '" of "' + reportName + '" report.');
                  needScreenShot++;
                }
              } else if (i === 3) {
                if (reportValues !== arrRowValues3[index - 1]) {
                  expect(false).customError('Expected: "' + arrRowValues3[index - 1] + '" but Found: "' + reportValues + '" in "' + rowData[0] + '" of "' + reportName + '" report.');
                  needScreenShot++;
                }
              }else {
                if (reportValues !== arrRowValues4[index - 1]) {
                  expect(false).customError('Expected: "' + arrRowValues4[index - 1] + '" but Found: "' + reportValues + '" in "' + rowData[0] + '" of "' + reportName + '" report.');
                  needScreenShot++;
                }
              }
            }

            if (needScreenShot === 1) {
              CommonFunctions.takeScreenShot();
            }

          });
        });
      };

      SlickGridFunctions.getAllCellValuesFromSingleColumn(reportName, '').then(function(reportRows) {
        for (var i = 0; i < reportRows.length; i++) {
          compareRowValues(i);
        }
      });
    });
  };

  describe('Test Step ID: 721809', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Risk;ri_doc_opt"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ri-doc-opt');
    });

    var arrReports = ['RiskSummary','FactorExposure','Weights'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrRiskSummeryValues1 = ['NaN', '13.77', '5.80', '12.49', '0.56', 'NaN', '13.77', '0.00', '5.80', '12.49', '0.00', '0.00'];
    var arrRiskSummeryValues2 = ['NaN', '11.77', '3.77', '11.15', '1.05', 'NaN', '11.77', '0.00', '3.77', '11.15', '0.00', '0.00'];
    var arrRiskSummeryColumnNames = ['Data', 'Data'];
    var arrRiskSummeryMultiHeadername = ['RI_FDS_MSFT vs. RI_IBM_GE', 'RI_IBM vs. RI_IBM_FDS_GE_MSFT'];

    // Verify the values of Risk Summery report
    verifyRiskSummeryReportValues(arrRiskSummeryValues1, arrRiskSummeryValues2, arrRiskSummeryColumnNames, arrRiskSummeryMultiHeadername);

    var arrWeightsReportRowValues0 = ['33.63691','33.63691','--','14.19417','14.19417','--'];
    var arrWeightsReportRowValues1 = ['14.92391','14.92391','--','1.43230','1.43230','--'];
    var arrWeightsReportRowValues2 = ['4.85264','4.85264','--','2.19273','2.19273','--'];
    var arrWeightsReportRowValues3 = ['-4.85264','-4.85264','--','10.64563','10.64563','--'];
    var arrWeightsReportRowValues4 = ['18.71300','18.71300','--','-0.07649','-0.07649','--'];

    // Verify the values of Weights report
    verifyWeightsOrSecuritySubperiodReportValues('Weights', arrWeightsReportRowValues0, arrWeightsReportRowValues1, arrWeightsReportRowValues2, arrWeightsReportRowValues3, arrWeightsReportRowValues4);

    var firstRowValues = ['0.47780','0.47780','0.30470','0.30470','-0.64975','-0.64975','0.56348','0.56348'];
    var lastRowValues = ['--','--','--','--','--','--','--','--'];

    // Verify the first and last row values in FactorExposure report
    verifyFactorExposureORFactorSubperiodReportValues('FactorExposure', firstRowValues, lastRowValues);
  });

  describe('Test Step ID: 721810', function() {

    it('Should select "RBPA" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'RBPA').select();

      // Verifying "RBPA" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'RBPA').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"RBPA" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrReports = ['PerformanceSummary','FactorSubperiod','SecuritySubperiod'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrPerformenceSummeryReportValues = ['-1.1809','0.3046','--','-0.8763','1.1886','-1.7969','--','-0.6083'];

    // Verify the values of performanceSummery report
    verifyPerformanceSummaryReportValues(arrPerformenceSummeryReportValues);

    var arrSecuritySubperiodRowValues0 = ['-1.1809','0.3046','--','-0.8763','1.1886','-1.7969','--','-0.6083'];
    var arrSecuritySubperiodRowValues1 = ['-1.7878','1.1127','--','-0.6751','0.6421','-0.3315','--','0.3106'];
    var arrSecuritySubperiodRowValues2 = ['0.3322','-3.8169','--','-3.4847','0.0987','-2.4581','--','-2.3594'];
    var arrSecuritySubperiodRowValues3 = ['0.2748','3.0087','--','3.2835','0.4478','0.9927','--','1.4405'];

    // Verify the values of SecuritySubperiod report
    verifyWeightsOrSecuritySubperiodReportValues('SecuritySubperiod', arrSecuritySubperiodRowValues0, arrSecuritySubperiodRowValues1, arrSecuritySubperiodRowValues2, arrSecuritySubperiodRowValues3);

    var firstRowValues = ['0.0992','-0.0673'];
    var lastRowValues = ['--','--'];

    // Verify the first and last row values in FactorSubperiod report
    verifyFactorExposureORFactorSubperiodReportValues('FactorSubperiod', firstRowValues, lastRowValues);
  });

  describe('Test Step ID: 721811', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Risk" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk').select();

      // Verifying if "Risk" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Risk" tab is opened', function() {
      DocumentOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Risk') {
          expect(false).customError('"Risk" tab did not open; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should check the checkbox "Use benchmark as the market portfolio"', function() {
      ThiefHelpers.setCheckBox('Use benchmark as the market portfolio', undefined, true);

      // Verifying if the checkbox is checked
      ThiefHelpers.verifyStatusOfCheckbox('Use benchmark as the market portfolio', undefined, 'IsChecked');
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    var arrReports = ['PerformanceSummary','FactorSubperiod','SecuritySubperiod'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrPerformenceSummeryReportValues = ['-0.0987','2.9277','-3.7053','-0.8763','0.9675','-2.4920','0.9163','-0.6083'];

    // Verify the values of performanceSummery report
    verifyPerformanceSummaryReportValues(arrPerformenceSummeryReportValues);

    var arrSecuritySubperiodRowValues0 = ['-0.0987','2.9277','-3.7053','-0.8763','0.9675','-2.4920','0.9163','-0.6083'];
    var arrSecuritySubperiodRowValues1 = ['-0.7341','-1.7352','1.7941','-0.6751','0.4079','1.6097','-1.7070','0.3106'];
    var arrSecuritySubperiodRowValues2 = ['0.3959','-1.7828','-2.0977','-3.4847','0.1307','-0.8813','-1.6088','-2.3594'];
    var arrSecuritySubperiodRowValues3 = ['0.2395','6.4457','-3.4017','3.2835','0.4289','-3.2205','4.2321','1.4405'];

    // Verify the values of SecuritySubperiod report
    verifyWeightsOrSecuritySubperiodReportValues('SecuritySubperiod', arrSecuritySubperiodRowValues0, arrSecuritySubperiodRowValues1, arrSecuritySubperiodRowValues2, arrSecuritySubperiodRowValues3);

    var firstRowValues = ['0.1098','-0.0644'];
    var lastRowValues = ['-3.7053','0.9163'];

    // Verify the first and last row values in FactorSubperiod report
    verifyFactorExposureORFactorSubperiodReportValues('FactorSubperiod', firstRowValues, lastRowValues);

  });

  describe('Test Step ID: 721812', function() {

    it('Should select "Risk" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Risk').select();

      // Verifying "Risk" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrReports = ['RiskSummary','FactorExposure','Weights'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrRiskSummeryValues1 = ['NaN', '13.77', '5.80', '12.49', '0.56', 'NaN', '13.77', '6.33', '6.89', '10.10', '0.56', '14.41'];
    var arrRiskSummeryValues2 = ['NaN', '11.77', '3.77', '11.15', '1.05', 'NaN', '11.77', '0.59', '3.81', '11.13', '1.05', '12.67'];
    var arrRiskSummeryColumnNames = ['Data', 'Data'];
    var arrRiskSummeryMultiHeadername = ['RI_FDS_MSFT vs. RI_IBM_GE', 'RI_IBM vs. RI_IBM_FDS_GE_MSFT'];

    // Verify the values of Risk Summery report
    verifyRiskSummeryReportValues(arrRiskSummeryValues1, arrRiskSummeryValues2, arrRiskSummeryColumnNames, arrRiskSummeryMultiHeadername);

    var arrWeightsReportRowValues0 = ['33.63691','47.43372','14.40657','14.19417','14.49552','12.67139'];
    var arrWeightsReportRowValues1 = ['14.92391','11.72247','--','1.43230','1.55105','6.47304'];
    var arrWeightsReportRowValues2 = ['4.85264','10.24150','8.22027','2.19273','2.32833','6.01649'];
    var arrWeightsReportRowValues3 = ['-4.85264','9.11075','11.83116','10.64563','10.56432','6.48113'];
    var arrWeightsReportRowValues4 = ['18.71300','16.35900','--','-0.07649','0.05182','6.36087'];

    // Verify the values of Weights report
    verifyWeightsOrSecuritySubperiodReportValues('Weights', arrWeightsReportRowValues0, arrWeightsReportRowValues1, arrWeightsReportRowValues2, arrWeightsReportRowValues3, arrWeightsReportRowValues4);

    var firstRowValues = ['0.47780','0.21555','0.30470','0.06201','-0.64975','-0.63525','0.56348','0.53861'];
    var lastRowValues = ['--','0.43943','--','26.23182','--','-0.04644','--','0.29293'];

    // Verify the first and last row values in FactorExposure report
    verifyFactorExposureORFactorSubperiodReportValues('FactorExposure', firstRowValues, lastRowValues);
  });

  describe('Test Step ID: 721813', function() {

    it('Should select "RBPA" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'RBPA').select();

      // Verifying "RBPA" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Risk', 'RBPA').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"RBPA" is not selected.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    var arrReports = ['PerformanceSummary','FactorSubperiod','SecuritySubperiod'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Risk" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk').select();

      // Verifying if "Risk" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Risk" tab is opened', function() {
      DocumentOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Risk') {
          expect(false).customError('"Risk" tab did not open; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter the value "1" into "Market Risk Premium(Annual %)" field', function() {
      ThiefHelpers.getNumberInputClassReference(ModifyAccountRiskUniverse.xpathOfMarketPremiumAnnualPercentage).setNumber(1);

      // Verifying if Market Risk Premium(Annual %) field is set to "1"
      ThiefHelpers.getNumberInputClassReference(ModifyAccountRiskUniverse.xpathOfMarketPremiumAnnualPercentage).getNumber().then(function(value) {
        if (value !== 1) {
          expect(false).customError('Failed to enter "1" into the "Market Risk Premium(Annual %)" field. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrPerformenceSummeryReportValues = ['-0.0458','3.0355','-3.8659','-0.8763','0.9586','-2.5213','0.9543','-0.6083'];

    // Verify the values of performanceSummery report
    verifyPerformanceSummaryReportValues(arrPerformenceSummeryReportValues);

    var arrSecuritySubperiodRowValues0 = ['-0.0458','3.0355','-3.8659','-0.8763','0.9586','-2.5213','0.9543','-0.6083'];
    var arrSecuritySubperiodRowValues1 = ['-0.6823','-1.8619','1.8691','-0.6751','0.3957','1.6966','-1.7817','0.3106'];
    var arrSecuritySubperiodRowValues2 = ['0.3992','-1.6922','-2.1917','-3.4847','0.1333','-0.8084','-1.6843','-2.3594'];
    var arrSecuritySubperiodRowValues3 = ['0.2372','6.5896','-3.5433','3.2835','0.4296','-3.4095','4.4204','1.4405'];

    // Verify the values of SecuritySubperiod report
    verifyWeightsOrSecuritySubperiodReportValues('SecuritySubperiod', arrSecuritySubperiodRowValues0, arrSecuritySubperiodRowValues1, arrSecuritySubperiodRowValues2, arrSecuritySubperiodRowValues3);

    var firstRowValues = ['0.1103','-0.0643'];
    var lastRowValues = ['-3.8659','0.9543'];

    // Verify the first and last row values in FactorSubperiod report
    verifyFactorExposureORFactorSubperiodReportValues('FactorSubperiod', firstRowValues, lastRowValues);
  });

  describe('Test Step ID: 721814', function() {

    // Click on the wrench icon of application toolbar and select "Document Options"
    CommonPageObjectsForPA3.clickOnApplicationToolbarWrenchIconAndSelectOption('Document Options');

    it('Verifying if "Document Options" page is opened', function() {
      ThiefHelpers.isModeBannerDisplayed('Document Options').then(function(found) {
        if (!found) {
          expect(false).customError('View is not changed to "Document Options".');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Risk" tab from LHP', function() {
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk').select();

      // Verifying if "Risk" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(undefined, 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying if "Risk" tab is opened', function() {
      DocumentOptions.getOptionTitle().getText().then(function(text) {
        if (text !== 'Risk') {
          expect(false).customError('"Risk" tab did not open; Found: ' + text);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should enter the value "252" into "Deannualization Factor (Days)" field', function() {
      ThiefHelpers.getNumberInputClassReference(ModifyAccountRiskUniverse.xpathOfDeannualizationFactorDays).setNumber(252);

      // Verifying if Deannualization Factor (Days) field is set to "252"
      ThiefHelpers.getNumberInputClassReference(ModifyAccountRiskUniverse.xpathOfDeannualizationFactorDays).getNumber().then(function(value) {
        if (value !== 252) {
          expect(false).customError('Failed to enter "252" into the "Deannualization Factor (Days)" field. Found: "' + value + '"');
          CommonFunctions.takeScreenShot();
        }

      });
    });

    // Click on "Ok" button of header and verify if "Document Options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Document Options');

    var arrReports = ['PerformanceSummary','FactorSubperiod','SecuritySubperiod'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrPerformenceSummeryReportValues = ['-0.0506','3.0258','-3.8515','-0.8763','0.9594','-2.5186','0.9509','-0.6083'];

    // Verify the values of performanceSummery report
    verifyPerformanceSummaryReportValues(arrPerformenceSummeryReportValues);

    var arrSecuritySubperiodRowValues0 = ['-0.0506','3.0258','-3.8515','-0.8763','0.9594','-2.5186','0.9509','-0.6083'];
    var arrSecuritySubperiodRowValues1 = ['-0.6869','-1.8506','1.8624','-0.6751','0.3968','1.6888','-1.7750','0.3106'];
    var arrSecuritySubperiodRowValues2 = ['0.3989','-1.7003','-2.1832','-3.4847','0.1331','-0.8149','-1.6776','-2.3594'];
    var arrSecuritySubperiodRowValues3 = ['0.2374','6.5767','-3.5306','3.2835','0.4296','-3.3925','4.4035','1.4405'];

    // Verify the values of SecuritySubperiod report
    verifyWeightsOrSecuritySubperiodReportValues('SecuritySubperiod', arrSecuritySubperiodRowValues0, arrSecuritySubperiodRowValues1, arrSecuritySubperiodRowValues2, arrSecuritySubperiodRowValues3);

    var firstRowValues = ['0.1102','-0.0643'];
    var lastRowValues = ['-3.8515','0.9509'];

    // Verify the first and last row values in FactorSubperiod report
    verifyFactorExposureORFactorSubperiodReportValues('FactorSubperiod', firstRowValues, lastRowValues);
  });
});
