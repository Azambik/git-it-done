//DOM elements
var issueContainerEl = document.querySelector("#issues-container");
//variables
//functions
var GetRepoIssues = function(repo) {
    //console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    
    fetch(apiUrl).then(function(response){
        //request was successful
        if (response.ok) {
            response.json().then(function(data){
                //pass response data to dom function
                displayIssues(data);
            });
        }
        else {
            alert("There was a problem with your request!");
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

GetRepoIssues("Azambik/taskinator");