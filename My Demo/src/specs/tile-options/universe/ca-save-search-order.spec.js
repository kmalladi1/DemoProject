require(`${__dirname}/../../../index.js`);
describe(`Test Case: ca-save-search-order`, () => {

  let arrOfItemsInCategory = [];
  let arrOfItemsInOrdering = [];
  let arrayOfArras = [arrOfItemsInCategory, arrOfItemsInOrdering];
  let arrayOfXpaths = [AssetOrdering.xpathOfCategoriesContainer, AssetOrdering.xpathOfOrderingContainer];
  let arrOfItemsInOrderingSectionAfterUncheck = [`Client:`, `FactSet:/Mutual_Funds/`, `FactSet:/ETF_INDEX/`, `FactSet:/ETF/`,];
  let arrOfItemsInOrderingSection = [];

  describe(`Test Step ID: 445135`, () => {

    // Should open default document and select automatic calculation option
    CommonPageObjectsForPA3.OpenDefaultDocumentAndSetAutomaticCalculation(true);

    it(`Should open "Client:;Pa3;Universe;CA_Order_1" document`, () => {
      PA3MainPage.launchHtmlDialogAndOpenDocument(`ca-order-1`);
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);
  });

  describe(`Test Step ID: 445137`, () => {

    CommonPageObjectsForPA3.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench(`Sector Weights`);

    arrayOfXpaths.forEach((xpath, index) => {
      it('Storing the items present in the Assert ordering for future use', () => {
        let children = ThiefHelpers.getVirtualListboxClassReference(xpath).getChildrenText();
        children.then(childArr => {
          for (let i = 0; i < childArr.length; ++i) {
            arrayOfArras[index].push(childArr[i].text);
          }
        });
      });
    });

  });

  describe(`Test Step ID: 445138`, () => {

    it(`Should de-select "Use Default Ordering"`, () => {
      ThiefHelpers.setCheckBox(`Use Default Ordering`, undefined, false);
    });

    let arrOfOrderingSectionsButtons = [`up`, `down`, `remove`];
    let arrOfTransferButtons = [`right`, `left`];

    arrOfOrderingSectionsButtons.forEach(buttonName => {

      it(`Verifying if \`"${buttonName}" is displayed next to ordering section`, () => {
        element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfButtonNextToOrderingSection, buttonName))).isDisplayed().then((displayed) => {
          if (!displayed) {
            expect(false).customError(`\`"${buttonName}" is not displayed next to ordering section`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });

    arrOfTransferButtons.forEach(buttonName => {

      it(`Verifying if \`"${buttonName}" is displayed between category and ordering sections`, () => {
        element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfTransferButtons, buttonName))).isDisplayed().then((displayed) => {
          if (!displayed) {
            expect(false).customError(`\`"${buttonName}" is not displayed next to ordering section`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445139`, () => {

    let indexOfMutualFunds;

    it(`Getting the index of "FactSet:/Mutual_Funds/"`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          if (childArr[i].text === `FactSet:/Mutual_Funds/`) {
            indexOfMutualFunds = i;
          }
        }
      });
    });

    it(`Should select "FactSet:/Mutual_Funds/" in the ordering section`, () => {
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/Mutual_Funds/`).select();

      // Verifying that "FactSet:/Mutual_Funds/" is selected
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/Mutual_Funds/`).isSelected().then(bool => {
        if (!bool) {
          expect(false).customError(`"FactSet:/Mutual_Funds/" is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click on the up arrow button`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfButtonNextToOrderingSection, `up`))).click();
    });

    it(`Verifying if "FactSet:/Mutual_Funds/" is moved one level up`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          if (childArr[i].text === `FactSet:/Mutual_Funds/`) {
            if (i !== indexOfMutualFunds - 1) {
              expect(false).customError(`"FactSet:/Mutual_Funds/" has not moved one level up.`);
              CommonFunctions.takeScreenShot();
            }

          }
        }
      });
    });
  });

  describe(`Test Step ID: 445140`, () => {

    let indexOfETFIndex;

    it(`Getting the index of "FactSet:/ETF_INDEX/"`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          if (childArr[i].text === `FactSet:/ETF_INDEX/`) {
            indexOfETFIndex = i;
          }
        }
      });
    });

    it(`Should select "FactSet:/ETF_INDEX/" in the ordering section`, () => {
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/ETF_INDEX/`).select();

      // Verifying that "FactSet:/ETF_INDEX/" is selected
      ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getItemByText(`FactSet:/ETF_INDEX/`).isSelected().then(bool => {
        if (!bool) {
          expect(false).customError(`"FactSet:/ETF_INDEX/" is not selected`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click on the down arrow button`, () => {
      element(by.xpath(CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfButtonNextToOrderingSection, `down`))).click();
    });

    it(`Verifying if "FactSet:/ETF_INDEX/" is moved one down up`, () => {
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        for (let i = 0; i < childArr.length - 1; ++i) {
          arrOfItemsInOrderingSection.push(childArr[i].text);
          if (childArr[i].text === `FactSet:/ETF_INDEX/`) {
            if (i !== indexOfETFIndex + 1) {
              expect(false).customError(`"FactSet:/ETF_INDEX/" has not moved one level down.`);
              CommonFunctions.takeScreenShot();
            }

          }
        }
      });
    });

  });

  describe(`Test Step ID: 445141`, () => {

    it(`Should click on "OK" button in the Asset ordering dialog`, () => {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'OK'))
        .press().then(() => { }, (err) => {

          expect(false).customError(`Unable to click on "OK" button in the Asset ordering dialog.` + err);
          CommonFunctions.takeScreenShot();
        });
    });

    it(`Verifying if "Asset Ordering" dialog is not displayed after clicking Ok button`, () => {
      ThiefHelpers.isDialogOpen(`Asset Ordering`).then(dialogStatus => {
        if (dialogStatus) {
          expect(false).customError(`"Asset Ordering" dialog is still displayed after clicking OK button.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Should click "Expand Composite Assets:" drop down and select "All Levels"`, () => {
      ThiefHelpers.selectOptionFromDropDown(`All Levels`, `Expand Composite Assets:`);
    });

    it(`Verifying if "All Levels" drop down displays "Expand Composite Assets:"`, () => {
      ThiefHelpers.verifySelectedDropDownText(`All Levels`, `Expand Composite Assets:`);
    });

    // Click on "Ok" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`OK`, `Tile Options - Sector Weights`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    it(`Verifying if composite asset is in expanded mode`, () => {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Sector Weights`).then(dataView => {
        dataView.forEach((rowRef, index) => {
          if (rowRef.metadata.type === `group`) {
            expect(false).customError(` \`"${rowRef[0]}" group is displayed in report.`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445142`, () => {

    // Click on the folder icon and select "Save As..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Save As…`);

    // Select personal directory and enter the document name
    CommonPageObjectsForPA3.selectPersonalAndEnterDocumentNameInSaveAsDialog(`CA_ORDER_1`, undefined, true);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    // Click on the Folder icon and click and select "New" from drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`New`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Weights`);

    it(`Verifying if PA_DOCUMENT:DEFAULT is displayed`, () => {
      browser.getTitle().then(function(title) {
        if (title !== `Portfolio Analysis 3.0 - Weights | Exposures [PA_DOCUMENTS:DEFAULT]`) {
          expect(false).customError(`Title of browser did not match. ` +
            `Expected: "Portfolio Analysis 3.0 - Weights | Exposures [PA_DOCUMENTS:DEFAULT]" but Found: "' + title + '".`);
          CommonFunctions.takeScreenShot();
        }
      });
    });
  });

  describe(`Test Step ID: 445144`, () => {

    // Click on the folder icon and select "Open..." from the drop-down
    CommonPageObjectsForPA3.clickOnTheFolderIconAndSelectRequiredOption(`Open...`);

    // Select the reuqired document from personal directory
    CommonPageObjectsForPA3.openRequiredDocumentFromPersonal(`CA_ORDER_1`);

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    it(`Verifying if composite asset is in expanded mode`, () => {
      let parentID;
      SlickGridFunctions.getAllRowsFromReport(`Sector Weights`).then(dataView => {
        dataView.forEach((rowRef, index) => {
          if (rowRef.metadata.type === `group`) {
            expect(false).customError(` \`"${rowRef[0]}" group is displayed in report.`);
            CommonFunctions.takeScreenShot();
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445145`, () => {

    CommonPageObjectsForPA3.clickUniverseAndClickOnSearchOrderButtonAfterClickingOnOptionInWrench(`Sector Weights`);

    it(`Verifying if first four items in the ordering section are displayed as expected`, () => {
      let needScreenShot = 0;
      const children = ThiefHelpers.getVirtualListboxClassReference(AssetOrdering.xpathOfOrderingContainer).getChildrenText();
      children.then(childArr => {
        arrOfItemsInOrderingSection.forEach((itemName, index) => {
          if (itemName !== childArr[index].text) {
            expect(false).customError(`Expected "${itemName}" but Found: "${childArr[index].text}".`);
            needScreenShot++;
          }

          if (needScreenShot > 0) {
            CommonFunctions.takeScreenShot();
          }

        });
      });
    });
  });

  describe(`Test Step ID: 445146`, () => {

    it(`Should select "Use Default Ordering"`, () => {
      ThiefHelpers.setCheckBox(`Use Default Ordering`, undefined, true);
    });

    arrayOfXpaths.forEach((xpath, index) => {
      it('Storing the items present in the Assert ordering for future use', () => {
        let children = ThiefHelpers.getVirtualListboxClassReference(xpath).getChildrenText();
        var arrOfItems = arrayOfArras[index];
        children.then(childArr => {
          for (let i = 0; i < childArr.length; ++i) {
            if (childArr[i].text !== arrOfItems[i]) {
              expect(false).customError(`Expected: \`"${arrOfItems[i]}" but Found: \`"${childArr[i].text}".`);
              CommonFunctions.takeScreenShot();
            }
          }
        });
      });
    });
  });

  describe(`Test Step ID: 445148`, () => {

    it(`Should click on "Cancel" button in the Asset ordering dialog`, () => {
      ThiefHelpers.getButtonClassReference(undefined, CommonFunctions.replaceStringInXpath(AssetOrdering.xpathOfClearAllOrOkOrCancelButton, 'Cancel'))
        .press().then(() => { }, (err) => {

          expect(false).customError(`Unable to click on "Cancel" button in the Asset ordering dialog.` + err);
          CommonFunctions.takeScreenShot();
        });
    });

    it(`Verifying if "Asset Ordering" dialog is not displayed after clicking Ok button`, () => {
      ThiefHelpers.isDialogOpen(`Asset Ordering`).then(dialogStatus => {
        if (dialogStatus) {
          expect(false).customError(`"Asset Ordering" dialog is still displayed after clicking OK button.`);
          CommonFunctions.takeScreenShot();
        }
      });
    });

    it(`Disabling wait for angular`, () => {
      browser.ignoreSynchronization = true;
    });

    // Click on "Cancel" button of header and verify if "Tile options" view is closed
    CommonPageObjectsForPA3.clickOkOrCancelButtonOfHeader(`Cancel`, `Tile Options - Sector Weights`);

    it(`Verify if the loading icon does not appear`, () => {
      ThiefHelpers.getProgressIndicatorClassReference().getProgress().then(() => {
        expect(false).customError(`Report is recalculated.`);
        CommonFunctions.takeScreenShot();
      }, (error) => {
        expect(true).toBeTruthy();
      });
    });

    // Wait for the loading icon to disappear and verify if report is calculated
    CommonPageObjectsForPA3.verifyIfReportIsCalculated(`Sector Weights`);

    it(`Enabling wait for angular`, () => {
      browser.ignoreSynchronization = false;
    });
  });

});
