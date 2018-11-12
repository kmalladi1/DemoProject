'use strict';

require(__dirname + '/../../../index.js');

describe('Test Case: ri-fg-ungroup', function() {

  var factorArr = ['Industries', 'Market',];
  var groupings = ['Factor Contribution (Variance)', 'Factor Contribution - Cov*2 (Variance)'];

  var getFactorsBeneathGrouping = function(groupingName) {
    var defer = protractor.promise.defer();
    var promise = defer.promise;
    var parentID;
    var portfoliosArr = [];
    var groupFound = false;
    browser.driver.executeScript(function() {
      var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
      return slickObject.grid.getData().getItems();
    }).then(function(dataView) {
      if (dataView.length === 0) {
        CommonFunctions.takeScreenShot();
        defer.reject('Grid is Empty');
      } else {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === groupingName && rowRef.hasChildren === true) {
            groupFound = true;
            parentID = rowRef.id;
            dataView.forEach(function(element) {
              if (parentID === element.parentId) {
                portfoliosArr.push(element[0]);
              }
            });
          }
        });
        if (!groupFound) {
          CommonFunctions.takeScreenShot();
          defer.reject(groupingName + ' grouping is not displayed');
        } else {
          defer.fulfill(portfoliosArr);
        }
      }
    });
    return promise;

  };

  var isGroupingExpandedAndDisplayContents = function(groupingPath) {
    var defer = protractor.promise.defer();
    var parentID;
    browser.driver.executeScript(function() {
      var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
      return slickObject.grid.getData().getItems();
    }).then(function(dataView) {
      if (dataView.length === 0) {
        CommonFunctions.takeScreenShot();
        defer.reject('Grid is Empty');
      } else {
        var groupingFound = false;
        var factorFound = false;
        var groupingNames = groupingPath.split('|');
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === groupingNames[0] && rowRef.hasChildren === true) {
            browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
              '.grid.scrollRowToTop( arguments[ 0 ] )', index);
            browser.sleep(3000);
            groupingFound = true;
            parentID = rowRef.id;
            dataView.forEach(function(element, index1) {
              if (element[0] === groupingNames[1] && parentID === element.parentId) {
                browser.driver.executeScript('return $( ".tf-slick-grid" ).data( "$tfSlickGridController" )' +
                  '.grid.scrollRowIntoView( arguments[ 0 ] )', index1 + 1);
                factorFound = true;
                if (element.hasChildren === true) {
                  if (element.expanded === true) {
                    if (element.hasChildren !== true) {
                      defer.reject(groupingNames[1] + ' grouping does not have contents under it');
                      CommonFunctions.takeScreenShot();
                    }
                  } else {
                    defer.reject(groupingNames[1] + ' is not expanded');
                    CommonFunctions.takeScreenShot();
                  }
                } else {
                  defer.reject(groupingNames[1] + ' is not displayed as group');
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          }
        });
        if (!groupingFound) {
          defer.reject(groupingNames[0] + ' grouping is not found in report');
          CommonFunctions.takeScreenShot();
        } else if (!factorFound) {
          defer.reject(groupingNames[1] + ' grouping is not found under ' + groupingNames[0] + ' in report');
          CommonFunctions.takeScreenShot();
        }
      }
    }).then(function() {
    }, function(err) {
      expect(false).customError(err);
      CommonFunctions.takeScreenShot();
    });
  };

  describe('Test Step ID: 674300', function() {

    // Open default document and check Automatic calculation
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it('Should open PA3 Application with "Client:;Pa3;Risk;Unevenly_Layered_Factor_Group"', function() {
      PA3MainPage.launchHtmlDialogAndOpenDocument('unevenly-layered-factor-group');
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Summary');

    // Verify the option from the lhp
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('Reports', 'Weights', 'Risk Summary', undefined, 'isSelected');

    var arrValues = [{name: 'Portfolio', val: 'US:DJII', xpath: PA3MainPage.xpathPortfolioWidget},
      {name: 'benchmark', val: 'SPN:OEX', xpath: PA3MainPage.xpathBenchmarkWidget},];

    arrValues.forEach(function(values) {
      CommonPageObjectsForPA3.verifyPortfolioOrBenchmarkWidgetValue(values.name, values.xpath, values.val);
    });
  });

  describe('Test Step ID: 674301', function() {

    // Select Other Options tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Summary', 'Other Options', 'Risk');

    it('Verifying if the "Show Top Level Factor Groups Only" checkbox is selected and check if not already selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(selected) {
        if (!selected) {
          ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').check();
        }
      });
    });

    it('Should select "Risk Models" under "Risk" from LHP', function() {
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').select();

      // Verifying if "Risk Models" is selected in the LHP
      ThiefHelpers.getOptionspaneItem(TileOptions.xpathOptionsPane, 'Risk Models', 'Risk').isSelected().then(function(selected) {
        if (!selected) {
          expect(false).customError('"Risk Models" tab is not selected in the LHP.');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    factorArr.forEach(function(factor) {
      it('Should expand "' + factor + '" groupings factor in "Visible" factors section', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factor).isExpanded().then(function(status) {
          if (!status) {
            ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factor).expand();
          } else {
            expect(false).customError('"' + factor + '" groupings factor is already expanded in "Visible" factors section');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    factorArr.forEach(function(factor) {
      it('Verifying if "' + factor + '" grouping is displayed with some factors under it', function() {
        ThiefHelpers.getVirtualChecklistClassReference().getGroupByText(factor).getChildrenText().then(function(arrElements) {
          if (arrElements.length <= 0) {
            expect(false).customError('"' + factor + '" grouping is not displayed with any factors under it');
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('Cancel', 'Tile options - Risk Summary');

    it('Should click on refresh icon on app toolbar', function() {
      PA3MainPage.getRefreshIcon().click().then(function() {
      }, function(err) {
        expect(false).customError(err);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Summary');

    it('Verifying if "Industries" and "Market" are displayed at the bottom of the "Factor Contribution (Variance)" section',
      function() {
        var count = 0;
        var flag = false;
        getFactorsBeneathGrouping('Factor Contribution (Variance)').then(function(factorsArr) {
          // factors should display at the bottom
          for (var i = (factorsArr.length - 2); i < factorsArr.length; i++) {
            if (factorArr.indexOf(factorsArr[i]) === -1) {
              flag = true;
              expect(false).customError('"Industries" and "Market" are not displayed at the bottom of the "Factor Contribution (Variance)" section');
            }

            count = count + 1;
          }

          if (flag) {
            CommonFunctions.takeScreenShot();
          }
        });
      });

    it('Verifying if "Industries" and "Market" is displayed at the bottom leaving one of the "Factor Contribution - Cov*2 (Variance)" section',
      function() {
        var count = 0;
        var flag = false;
        getFactorsBeneathGrouping('Factor Contribution - Cov*2 (Variance)').then(function(factorsArr) {

          // factors displayed at the bottom leaving one factor
          for (var i = (factorsArr.length - 3); i < (factorsArr.length - 1); i++) {
            if (factorArr.indexOf(factorsArr[i]) === -1) {
              flag = true;
              expect(false).customError('"Industries" and "Market" are not displayed at the bottom of the "Factor Contribution - Cov*2 (Variance)" section');
            }

            count = count + 1;
          }

          if (flag) {
            CommonFunctions.takeScreenShot();
          }
        });
      });

    it('Verifying if "' + factorArr + '" are not displayed as groupings(should not be expandable)', function() {
      var defer = protractor.promise.defer();
      browser.driver.executeScript(function() {
        var slickObject = $('.tf-slick-grid').data('$tfSlickGridController');
        return slickObject.grid.getData().getItems();
      }).then(function(dataView) {
        if (dataView.length === 0) {
          CommonFunctions.takeScreenShot();
          defer.reject('Grid is Empty');
        } else {
          dataView.forEach(function(rowRef) {
            factorArr.forEach(function(factor) {
              if (rowRef[0] === factor) {
                if (rowRef.hasChildren === true) {
                  expect(false).customError(factor + ' is displayed as grouping');
                  CommonFunctions.takeScreenShot();
                }
              }
            });
          });
        }
      });
    });
  });

  describe('Test Step ID: 674302', function() {

    // Select Other Options tab from Tile Options
    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab('Risk Summary', 'Other Options', 'Risk');

    it('Should un-check the "Show Top Level Factor Groups Only" checkbox', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').uncheck();
    });

    it('Verifying if the "Show Top Level Factor Groups Only" checkbox is not selected', function() {
      ThiefHelpers.getCheckBoxClassReference('Show Top Level Factor Groups Only').isChecked().then(function(selected) {
        if (selected) {
          expect(false).customError('"Show Top Level Factor Groups Only" checkbox is still selected');
          CommonFunctions.takeScreenShot();
        }
      });
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader('OK', 'Tile Options - Risk Summary');

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated('Risk Summary');

    it('Verifying if "Industries" and "Market" factors are displayed as expanded and should display contents under them', function() {
      groupings.forEach(function(groupName) {
        factorArr.forEach(function(factorGroupName) {
          var temp = groupName.concat('|' + factorGroupName);
          isGroupingExpandedAndDisplayContents(temp);
        });
      });
    });

  });
});
