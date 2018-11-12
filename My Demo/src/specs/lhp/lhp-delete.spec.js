'use strict';

require(__dirname + '/../../index.js');

describe('Test Case: lhp-delete', function() {

  describe('Test Step ID: 514300', function() {

    // Should open default document and check automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should launch the PA3 application with "LHP-REPORT" document', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('lhp-report');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Weights');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Portfolio', PA3MainPage.xpathPortfolioWidget, 'CLIENT:PA3_TEST.ACCT');

    CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue('Benchmark', PA3MainPage.xpathBenchmarkWidget, 'RUSSELL:1000');

  });

  describe('Test Step ID: 514304', function() {

    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Reports', 'Performance Chart', true, 'isSelected');

    it('Should click on the wrench icon next to "Performance Chart" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Performance Chart').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Verifying that a dialog box saying "Are you sure you want to delete the Performance Chart report?" appears', function() {
      ThiefHelpers.isDialogOpen('');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete the Performance Chart report?') {
          expect(false).customError('Expected dialog box content: Are you sure you want to delete the ' +
            'Performance Chart report? but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Performance Chart" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Performance Chart').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Performance Chart found') {
          expect(false).customError('"Performance Chart" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Top/Bottom 5 Contributors" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Top/Bottom 5 Contributors').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Top/Bottom 5 Contributors" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514305', function() {

    it('Should select "Weights" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights').then(function(ref) {
        ref.click();
      });

      // Verifying "Weights" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Weights" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on wrench icon next to the "Weights" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Weights').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Verifying that a dialog box saying "Are you sure you want to delete the Weights report?" appears', function() {
      ThiefHelpers.isDialogOpen('');

      // Verifying the dialog content
      ThiefHelpers.getDialogClassReference('').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete the Weights report?') {
          expect(false).customError('Expected dialog box content: "Are you sure you want to delete the ' +
            'Weights report?" but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Weights" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Weights found') {
          expect(false).customError('"Weights" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Weights Difference Chart" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights Difference Chart').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Weights Difference Chart" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514306', function() {

    it('Should select "Pre & Post Trade" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Pre & Post Trade').then(function(ref) {
        ref.click();
      });

      // Verifying "Pre & Post Trade" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Pre & Post Trade').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Pre & Post Trade" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on wrench icon next to the "Pre & Post Trade" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Pre & Post Trade').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Verifying that a dialog box saying "Are you sure you want to delete the Pre & Post Trade report?" appears', function() {
      ThiefHelpers.isDialogOpen('');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete the Pre & Post Trade report?') {
          expect(false).customError('Expected dialog box content: "Are you sure you want to delete the ' +
            'Pre & Post Trade report?" but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Pre & Post Trade" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Pre & Post Trade').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Pre & Post Trade found') {
          expect(false).customError('"Pre & Post Trade" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Contribution').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Contribution" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514307', function() {

    it('Should select "Multi-Horizon Returns" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 3', 'Multi-Horizon Returns').then(function(ref) {
        ref.click();
      });

      // Verifying "Multi-Horizon Returns" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 3', 'Multi-Horizon Returns').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Multi-Horizon Returns" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on wrench icon next to the "Multi-Horizon Returns" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Multi-Horizon Returns').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Should click on "OK" button from the delete confirmation popup', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Multi-Horizon Returns" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 3', 'Multi-Horizon Returns').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Multi-Horizon Returns found') {
          expect(false).customError('"Multi-Horizon Returns" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Performance" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 3', 'Performance').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Performance" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514308', function() {

    it('Should select "Attribution Over Time Chart" report from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution Over Time Chart').then(function(ref) {
        ref.click();
      });

      // Verifying "Attribution Over Time Chart" Report is selected.
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Attribution Over Time Chart').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Attribution Over Time Chart" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    it('Should click on the wrench icon next to "Attribution Over Time Chart" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Attribution Over Time Chart').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Attribution Over Time Chart" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 3', 'Attribution Over Time Chart').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Attribution Over Time Chart found') {
          expect(false).customError('"Attribution Over Time Chart" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Top/Bottom 5 Contributors" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Top/Bottom 5 Contributors').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') < 0) {
            expect(false).customError('"Top/Bottom 5 Contributors" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514309', function() {

    it('Should click on the wrench icon next to "Top/Bottom 5 Contributors" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Top/Bottom 5 Contributors').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Top/Bottom 5 Contributors" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Top/Bottom 5 Contributors').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Top/Bottom 5 Contributors found') {
          expect(false).customError('"Top/Bottom 5 Contributor" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the wrench icon next to "Charaterisctics - Summary" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Characteristics - Summary').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Charaterisctics - Summary" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Charaterisctics - Summary').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Charaterisctics - Summary found') {
          expect(false).customError('"Charaterisctics - Summary" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights Difference Chart" is the only tile displayed under "Reports" category in the LHP', function() {
      PA3MainPage.getAllReportsFromGivenGroup('Reports', 'Reports').then(function(val) {
        if (val.length !== 1 && val[0] !== 'Weights Differene Chart') {
          expect(false).customError('"Weights Difference Chart" is not the only tile displayed under "Reports" category');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verify that "Weights Difference Chart" is highlighted under "Reports" category in the LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights Difference Chart').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') <= 0) {
            expect(false).customError('"Weights Difference Chart" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514310', function() {

    it('Should click on the wrench icon next to "Weights Difference Chart" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Weights Difference Chart').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Verifying that a dialog box saying "Are you sure you want to delete the Weights Difference Chart report?" ' +
      'appears', function() {
        ThiefHelpers.isDialogOpen('');

        // Verifying the content
        ThiefHelpers.getDialogClassReference('').getContent().getText().then(function(content) {
          if (content !== 'Are you sure you want to delete the Weights Difference Chart report?') {
            expect(false).customError('Expected dialog box content: "Are you sure you want to delete the ' +
              'Weights Difference Chart report?" but Found: "' + content + '"');
            CommonFunctions.takeScreenShot();
          }
        });
      });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Weights Difference Chart" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Reports', 'Weights Difference Chart').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Weights Difference Chart found') {
          expect(false).customError('"Weights Difference Chart" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Contribution" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Contribution').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') < 0) {
            expect(false).customError('"Contribution" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

  describe('Test Step ID: 514311', function() {

    it('Should click on the wrench icon next to "Contribution" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Contribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
    });

    it('Verifying that a dialog box saying "Are you sure you want to delete the Contribution report?" appears', function() {
      ThiefHelpers.isDialogOpen('');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete the Contribution report?') {
          expect(false).customError('Expected dialog box content: "Are you sure you want to delete the ' +
            'Contribution report?" but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Contribution" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Contribution').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Contribution found') {
          expect(false).customError('"Contribution" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on the wrench icon next to "Attribution" in LHP', function() {
      PA3MainPage.getReportWrenchButton('Attribution').click().then(function() {
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });

      //Verifying wrench menu list is opened
      ThiefHelpers.isDropDownOpen().then(function(isOpen) {
        if (!isOpen) {
          expect(false).customError('Wrench menu drop down list is not opened');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should select "Remove" from reports options list', function() {
      ThiefHelpers.getOptionFromDropdown('Remove').isDisplayed().then(function(isDisplayed) {
        if (!isDisplayed) {
          expect(false).customError('"Remove" option is not displayed in the drop down');
          CommonFunctions.takeScreenShot();
        } else {
          ThiefHelpers.getMenuClassReference().selectItemByText('Remove');
        }
      }, function(err) {

        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verifying that a dialog box saying "Are you sure you want to delete the Attribution report?" appears', function() {
      ThiefHelpers.isDialogOpen('');

      // Verifying the content
      ThiefHelpers.getDialogClassReference('').getContent().getText().then(function(content) {
        if (content !== 'Are you sure you want to delete the Attribution report?') {
          expect(false).customError('Expected dialog box content: "Are you sure you want to delete the ' +
            'Attribution report?" but Found: "' + content + '"');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Should click on "OK" button from the dialog box', function() {
      ThiefHelpers.getButtonClassReference('', CommonFunctions.replaceStringInXpath(CommonPageObjectsForPA3.xpathOfOkOrCancelButtonOfDialog, 'OK')).
      press().then(function() { }, function() {

        expect(false).customError('Unable to click on "OK" button.');
        CommonFunctions.takeScreenShot();
      });
    });

    it('Verify that "Attribution" report is deleted', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 2', 'Attribution').then(function() {
      }, function(err) {

        if (err.message !== 'No item with text: Attribution found') {
          expect(false).customError('"Attribution" report is not deleted');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it('Verifying that "Valuation - Detail" report is highlighted from LHP', function() {
      ThiefHelpers.getNavepaneItemReference('Reports', 'Category 3', 'Valuation - Detail').then(function(ref) {
        ref.getAttribute('class').then(function(value) {
          if (value.indexOf('selected') < 0) {
            expect(false).customError('"Valuation - Detail" report is not selected');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

  });

});
