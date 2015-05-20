var Resultmatter = function (resultsobject, TestResult) {
    if (!(resultsobject instanceof TestResult)) {
        throw new Error("ResultsFormatter:constructo requires an instance"
            + "of TestResult as an argument");
    }
    this.resultsObject = resultsobject;
}
Resultmatter.prototype.renderResults = function () {
    var dateOfTest = this.resultsObject.getDate();
    var resultsArray = this.resultsObject.getResults();
    var resultsContainer = document.createElement("div");
    var resultsHeader = document.createElement("h3");
    resultsHeader.innerHTML = "test results from" + dateOfTest.toUTCString();
    resultsContainer.appendChild(resultsHeader);
    var resultList = document.createElement("ul");

    for (var i = 0, len = resultsArray.length; i < len; i++) {
        debugger;
        var listitem = document.createElement("li");
        listitem.innerHTML = resultsArray[i];
        resultList.appendChild(listitem);
    }
        resultsContainer.appendChild(resultList);
    return resultsContainer;
}