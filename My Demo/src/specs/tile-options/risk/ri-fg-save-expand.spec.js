'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-save-expand', function() {

  // Local function
  var verifyIfTotalColumnIsOnRightOfReport = function(reportName) {
    it('Verifying if "Total" is present on the right side of the "' + reportName + '"report', function() {
      SlickGridFunctions.getColumnNames(reportName).then(function(columnName) {
        SlickGridFunctions.getMultiHeaderNames(reportName).then(function(multiheaderNames) {
          if (multiheaderNames[columnName.length - 2] !== 'Total') {
            expect(false).customError('"Total" is not present on the right side of the "' + reportName + '"report');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  };

  describe('Test Step ID: 721817', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:/Pa3/Risk/Ri_fg_save_expd_coll"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('ri-fg-save-expd-coll');
    });

    var arrReports = ['ShowTopLevelFactorGroupOnlyDefaultBehavior', 'CollapseFactorGroups'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    it('Should click "Refresh" button from the application toolbar', function() {
      ThiefHelpers.getButtonClassReference('Refresh').press();
    });

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrOfFactors = ['Risk Indices', 'Industries', 'Market'];
    arrReports.forEach(function(reportName) {

      //verify that expected factors are in the group
      CommonPageObjectsForPA3.verifyTheItemsInGroup(reportName, 'Factor Contribution (Variance)', arrOfFactors);
    });

    arrOfFactors.forEach(function(factorName) {

      var factorPath = 'Factor Contribution (Variance)|' + factorName;

      //verify the factors are in collapsed state in the group
      CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport('CollapseFactorGroups', factorPath, 'is collapsed', 'grid-canvas grid-canvas-top grid-canvas-left');
    });

  });

  describe('Test Step ID: 721818', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Risk', 'ExpandCombination', true, 'isSelected');

    var arrReports1 = ['ExpandIndustriesOnly', 'ExpandMarketOnly', 'ExpandRiskIndicesOnly', 'ExpandAllFactorGroups'];

    arrReports1.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrReports = ['ExpandMarketOnly', 'ExpandIndustriesOnly', 'ExpandRiskIndicesOnly'];
    var arrOfFactors = ['Market', 'Industries', 'Risk Indices'];
    arrReports.forEach(function(reportName, indexOfReport) {

      arrOfFactors.forEach(function(factorName, indexOfFactor) {

        var factorPath = 'Factor Contribution (Variance)|' + factorName;

        if (indexOfFactor === indexOfReport) {

          //verify the factors are in expanded state in the group in report
          CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(reportName, factorPath, 'is expanded', 'grid-canvas grid-canvas-top grid-canvas-left');
        } else {
          //verify the factors are in collapsed state in the group in report
          CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(reportName, factorPath, 'is collapsed', 'grid-canvas grid-canvas-top grid-canvas-left');
        }

      });

    });

    arrOfFactors.forEach(function(factorName) {

      var factorPath = 'Factor Contribution (Variance)|' + factorName;

      //verify the factors are in expanded state in the group in report
      CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport('ExpandAllFactorGroups', factorPath, 'is expanded', 'grid-canvas grid-canvas-top grid-canvas-left');
    });

  });

  describe('Test Step ID: 721819', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'RBPA', 'RBPA_ExpandCollapse', true, 'isSelected');

    var arrReports = ['RBPAShowTopLevelFactorGroupOnlyDefaultBehavior', 'RBPACollapseFactorGroups'];

    arrReports.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrOfFactors = ['Risk Indices', 'Industries', 'Market'];

    //verify that expected factors are in the group
    CommonPageObjectsForPA3.verifyTheItemsInGroup('RBPAShowTopLevelFactorGroupOnlyDefaultBehavior', 'Compounded Factor Impact', arrOfFactors);

    arrOfFactors.forEach(function(factorName) {

      var factorPath = 'Compounded Factor Impact|' + factorName;

      //verify the factors are in collapsed state in the group in report
      CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport('RBPACollapseFactorGroups', factorPath, 'is collapsed', 'grid-canvas grid-canvas-top grid-canvas-left');
    });

    arrReports.forEach(function(reportName) {

      // verifying if Total column is displayed in the right side of both the reports
      verifyIfTotalColumnIsOnRightOfReport(reportName);
    });
  });

  describe('Test Step ID: 721820', function() {

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'RBPA', 'RBPA_ExpandCombination', true, 'isSelected');

    var arrReports1 = ['RBPAExpandIndustriesOnly', 'RBPAExpandMarketOnly', 'RBPAExpandRiskIndicesOnly', 'RBPAExpandAllFactorGroups'];

    arrReports1.forEach(function(reportName) {

      // Wait for the loading icon to disappear and verify if report is calculated
      CommonPageObjectsForPA3.verifyIfReportIsCalculated(reportName);

    });

    var arrReports = ['RBPAExpandMarketOnly', 'RBPAExpandIndustriesOnly', 'RBPAExpandRiskIndicesOnly'];
    var arrOfFactors = ['Market', 'Industries', 'Risk Indices'];
    arrReports.forEach(function(reportName, indexOfReport) {

      arrOfFactors.forEach(function(factorName, indexOfFactor) {

        var factorPath = 'Compounded Factor Impact|' + factorName;

        if (indexOfFactor === indexOfReport) {

          //verify the factors are in expanded state in the group in report
          CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(reportName, factorPath, 'is expanded', 'grid-canvas grid-canvas-top grid-canvas-left');
        } else {
          //verify the factors are in collapsed state in the group in report
          CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport(reportName, factorPath, 'is collapsed', 'grid-canvas grid-canvas-top grid-canvas-left');
        }

      });

    });

    arrOfFactors.forEach(function(factorName) {

      var factorPath = 'Compounded Factor Impact|' + factorName;

      //verify the factors are in expanded state in the group in report
      CommonPageObjectsForPA3.verifyExpandedOrCollapsedStateOfGroupInReport('RBPAExpandAllFactorGroups', factorPath, 'is expanded', 'grid-canvas grid-canvas-top grid-canvas-left');
    });

    arrReports1.forEach(function(reportName) {

      // verifying if Total column is displayed in the right side of all the reports
      verifyIfTotalColumnIsOnRightOfReport(reportName);
    });
  });

});
