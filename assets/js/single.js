//DOM elements
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");
//variables
//functions
var getRepoName = function(){
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    //checking for valid repo name
    if (repoName) {
        repoNameEl.textContent = repoName;
        GetRepoIssues(repoName);
    } else {
        //redirecting back to home page if invalid repo name
        document.location.replace("./index.html");
    }
};
var GetRepoIssues = function(repo) {
    //console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl).then(function(response){
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                //pass response data to dom function
                displayIssues(data);
                //check if api has pageinated issues
                if (response.headers.get("link")){
                    displayWarning(repo);
                }
            });
        }
        else {
            //if not successful, redirect to home page
            document.location.replace("./index.html");
        }
    });
};
// function for manipulating DOM
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "this repo has no open issues!";
        return;
    }
    //loop to go through the response data
    for (i = 0; i < issues.length; i++){
        // create a link element to take user to the issue on git hub
        var issueEl = document.createElement("a");
        //giving <a> created above its classes
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        //setting the link value for <a>
        issueEl.setAttribute("href", issues[i].html_url);
        //oppening issue on new tab
        issueEl.setAttribute("target", "_blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        //create a type element
        var typeEl = document.createElement("span");

        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }
        //append to container
        issueEl.appendChild(typeEl);
        //appending to html page
        issueContainerEl.appendChild(issueEl);
    }

};

//limit warning
var displayWarning = function(repo) {

    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit" ;

    //making warning element
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
}
getRepoName();