require(`${__dirname}/../../../index.js`);
describe(`Test Case: expand-comp-asset`, () => {
  let indexOfTotal;
  let totalValueofTotalReturns1;
  let totalValueofTotalReturns2;
  let arrOfGroupings = [];
  let arrOfTotalValues = [];
  let caWithInCaChildCount = 0;

  describe(`Test Step ID: 443449`, () => {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it(`Should open "Client:;Pa3;Universe;CA_Attribution" document`, () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument(`ca-attribution`);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem('REPORTS', 'Reports', 'Attribution', true, 'isSelected');

    it(`Getting the position of Total in the report`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Attribution`, ``, ``).then((values) => {
        values.forEach((name, index) => {
          if (name === `Total`) {
            indexOfTotal = index;
          }
        });
      });
    });

    it(`Storing the total value of "Total Return" under "81820" portfolio(Multi header)`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Attribution`, `Total Return`, `81820`).then((values) => {
        totalValueofTotalReturns1 = values[indexOfTotal];
      });
      CommonFunctions.captureScreenShot('refImage443449');
    });
  });

  describe(`Test Step ID: 443450`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Attribution`, `Universe`);

    it(`Should click "Expand Composite Assets:" drop down and select "All Levels"`, () => {
      ThiefHelpers.selectOptionFromDropDown(`All Levels`, `Expand Composite Assets:`);
    });

    it(`Verifying if "All Levels" drop down displays "Expand Composite Assets:"`, () => {
      ThiefHelpers.verifySelectedDropDownText(`All Levels`, `Expand Composite Assets:`);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Attribution`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Attribution`);

    it(`Verifying that total value of "Total Return" under "81820" portfolio(Multi header) is different`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Attribution`, `Total Return`, `81820`).then((values) => {
        totalValueofTotalReturns2 = values[indexOfTotal];
        if (values[indexOfTotal] === totalValueofTotalReturns1) {
          expect(false).customError(`Expected: it should be different from previous value "${totalValueofTotalReturns1}"  but Found: "${values[indexOfTotal]}".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Verifying if portfolio values at total level remains same  `, () => {
      SlickGridFunctions.getRowData('Attribution', 'Total', '').then(function(rowdata) {
        arrOfTotalValues = rowdata;
      });
    });

    it(`Storing the values for future use`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Attribution`, ``, ``).then((values) => {
        arrOfGroupings = values;
      });
    });
  });

  describe(`Test Step ID: 443451`, () => {

    // Click on "Economic Sector" Hyperlink and verify if Groupings is selected by default in tile options
    CommonPageObjectsForPA3.clickOnGroupingsHyperlink('Attribution', 'Economic Sector');

    it(`Should click on "Left" arrow to remove "Economic Sector - MSCI" item from "Selected" section`, () => {
      ThiefHelpers.sendElementToAvailableSection();
    });

    it(`Verifying that "Economic Sector - FactSet" is not displayed in the selected section`, () => {
      let needScreenShot = 0;
      let group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      let arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(childArr => {
        if (childArr.length > 0) {
          expect(false).customError(`Elements are displayed in the selected section.`);
          CommonFunctions.takeScreenShot();
        }

      });

    });
  });

  describe(`Test Step ID: 443452`, () => {

    it(`Should expand "FactSet > Other" in "Available" section and select "Composite Assets"`, () => {
      ThiefHelpers.expandAndGetListBoxItem(TileOptionsGroupings.xpathOfAvailableContainer, `Composite Assets`, `FactSet|Other`, `FactSet`).select();
    });

    it(`Should click on "right" arrow to add "Composite Assets" item to "Selected" section`, () => {
      ThiefHelpers.sendElementToSelectedSection();
    });

    it(`Verifying if "Composite Assets" is displayed in selected section`, () => {
      let needScreenShot = 0;
      let group = ThiefHelpers.getListboxClassReference(TileOptionsGroupings.xpathOfSelectedContainer);
      let arrOfChildren;
      arrOfChildren = group.getChildrenText();
      arrOfChildren.then(childArr => {
        if (childArr[0].text !== `Composite Assets`) {
          expect(false).customError(`Expeted: "Composite Assets" but Found: "${childArr[0].text}".`);
          CommonFunctions.takeScreenShot();
        }

      });

    });

    it(`Disabling wait for angular`, () => {
      browser.ignoreSynchronization = true;
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Attribution`);

    it(`Verify if the loading icon does appears`, () => {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(() => {

      }, (error) => {
        expect(false).customError(`Report is recalculated.` + error);
        CommonFunctions.takeScreenShot();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Attribution`);

    it(`Enabling wait for angular`, () => {
      browser.ignoreSynchronization = false;
    });

    it(`Veriyfing that groupings total are different`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Attribution`, ``, ``).then((colNames) => {
        if (colNames.length === arrOfGroupings.length) {
          expect(false).customError(`Number of groupings displayed are same.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Verifying if portfolio values at total level remains same  `, () => {
      SlickGridFunctions.getRowData('Attribution', 'Total', '').then(function(rowdata) {
        rowdata.forEach((value, index) => {
          if (index < 3) {
            if (value !== arrOfTotalValues[index]) {
              expect(false).customError(`Expected: "${arrOfTotalValues[index]}" but Found: "${value}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

  });

  describe(`Test Step ID: 443453`, () => {

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save As…`);

    // Select personal directory and enter the document name
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`CA_Test_`, `MMDD`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);
  });

  describe(`Test Step ID: 443454`, () => {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Open...`);

    // Select the reuqired document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`CA_Test_`, `MMDD`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    // Select the option from the lhp and verify the same
    CommonPageObjectsForPA3.selectOrVerifyTheStatusOfLHPItem(`REPORTS`, `Reports`, `Attribution`, true, `isSelected`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Attribution`);

    it(`Verifying that report is grouped by "Composite Assets"`, () => {
      PA3MainPage.getGroupingsHyperLink(`Attribution`).getText().then(refVal => {
        if (!refVal.includes(`Composite Assets`)) {
          expect(false).customError(`The report is not grouped by "Composite Assets"`);
          CommonFunctions.takeScreenShot();
        }
      });

    });
  });

  describe(`Test Step ID: 443460`, () => {

    it(`Should open "Client:;Pa3;Universe;Multiple_CA_Levels" document`, () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument(`multiple-ca-levels`);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it('Verifying if only one group "Direct" is displayed', function() {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Weights`).then(function(dataView) {
        dataView.forEach(function(rowRef) {
          if (rowRef[0] === `Direct` && rowRef.metadata.type === `group`) {
            expect(true).toBeTruthy();
          } else if (rowRef.metadata.type === 'group') {
            expect(false).customError(`Expected: "Direct" to be the only group but found :"${rowRef[0]}".`);
          }
        });
      });
    });
  });

  describe(`Test Step ID: 443461`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Universe`);

    it(`Should click "Expand Composite Assets:" drop down and select "Top Level Only"`, () => {
      ThiefHelpers.selectOptionFromDropDown(`Top Level Only`, `Expand Composite Assets:`);
    });

    it(`Verifying if "Top Level Only" drop down displays "Expand Composite Assets:"`, () => {
      ThiefHelpers.verifySelectedDropDownText(`Top Level Only`, `Expand Composite Assets:`);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    let arrOfGroups2 = [`CA Within CA`, `Direct`];
    it(`Verifying that total value of "Total Return" under "81820" portfolio(Multi header) is different`, () => {
      SlickGridFunctions.getAllCellValuesFromSingleColumn(`Weights`, ``).then((groupNames) => {
        arrOfGroups2.forEach(groupName => {
          if (!groupNames.includes(groupName)) {
            expect(false).customError(`FOund: "${groupName} group is not present in the report.`);
          }
        });
      });
    });

    it('Verifying if only two groups "CA Within CA" and "Direct" are displayed and note the count of securities under "CA Within CA"', function() {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Weights`).then(function(dataView) {
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === `CA Within CA` && rowRef.metadata.type === `group`) {
            SlickGridFunctions.scrollRowToTop(`Weights`, index);
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element) {
                if (parentID === element.parentId && element.metadata.type !== `group`) {
                  caWithInCaChildCount++;
                }
              });
            } else {
              expect(false).customError(`"Financials" grouping is present in the report but it is not expanded by default`);
              CommonFunctions.takeScreenShot();
            }
          } else if (rowRef[0] === `Direct` && rowRef.metadata.type === `group`) {
            expect(true).toBeTruthy();
          } else if (rowRef.metadata.type === `group`) {
            expect(true).customError(`Expected: "Direct" and "CA Within CA" to be the only 2 groups but found :"${rowRef[0]}".`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe(`Test Step ID: 443462`, () => {

    CommonPageObjectsForPA3.clickOnOptionsAndNavigateToRequiredTab(`Weights`, `Universe`);

    it(`Should click "Expand Composite Assets:" drop down and select "All Levels"`, () => {
      ThiefHelpers.selectOptionFromDropDown(`All Levels`, `Expand Composite Assets:`);
    });

    it(`Verifying if "All Levels" drop down displays "Expand Composite Assets:"`, () => {
      ThiefHelpers.verifySelectedDropDownText(`All Levels`, `Expand Composite Assets:`);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Scrolling the Grid elements`, () => {
      SlickGridFunctions.getAllRowsFromReport(`Weights`).then(function(dataView) {
        SlickGridFunctions.scrollRowToTop(`Weights`, dataView.length - 1);
        browser.sleep(2000);
      });
    });

    let caWithInCaChildCount2 = 0;
    it(`Verifying if only two groups "CA Within CA" and "Direct" are displayed and note the count of securities under "CA Within CA"`, function() {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Weights`).then(function(dataView) {
        dataView.forEach(function(rowRef, index) {
          if (rowRef[0] === `CA Within CA` && rowRef.metadata.type === `group`) {
            parentID = rowRef.id;
            if (rowRef.expanded) {
              dataView.forEach(function(element, index1) {
                SlickGridFunctions.scrollRowToTop(`Weights`, index1);
                if (parentID === element.parentId && element.metadata.type !== `group`) {
                  caWithInCaChildCount2++;
                }
              });
            } else {
              expect(false).customError(`"CA Within CA" grouping is present in the report but it is not expanded by default.`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });

    it(`verifying if number of items listed are more`, () => {
      if (caWithInCaChildCount === caWithInCaChildCount2) {
        expect(false).customError(`Number of items displayed are not same.`);
        CommonFunctions.takeScreenShot();
      }
    });

  });

  describe(`Test Step ID: 768111`, () => {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Delete…`);

    // Select the reuqired document from personal directory
    // Add .toUpperCase() if you want the document name to be in upper case to the function
    CommonPageObjectsForPA3.deleteRequiredDocumentFromPersonalDirectory(`CA_Test_`, `MMDD`);

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Delete…`);
  });

});
