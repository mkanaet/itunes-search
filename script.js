"use strict";
function wrap() {

    const loaderContainer = document.querySelector(".loader-container");

    document.getElementById("searchInput").addEventListener("keyup", startSearch);

    function startSearch() {
        function displayLoading() {
            loaderContainer.style.display = "block";
        };
        displayLoading();
        const pojam = document.getElementById("searchInput");
        //console.log(pojam.value);
        if (pojam.value !== "") {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", "https://itunes.apple.com/search?term=" + pojam.value + "&entity=song&attributes=songTerm", true);

            xhr.onload = function () {
                function hideLoading() {
                    loaderContainer.style.display = "none";
                };
                if (this.status == 200) {
                    var data = JSON.parse(this.response);
                };
                //console.log(xhr.response);
                hideLoading();

                var output = "";
                for (var i in data.results) {
                    output +=
                        "<div>" +
                        "<ul>" +
                        "<li>Song: " + data.results[i].trackName + "</li>" +
                        "<li>Artist: " + data.results[i].artistName + "</li>" +
                        "</ul>" +
                        "</div>";
                }
                document.getElementById("info").innerHTML = output;
                if (data.resultCount == "0") {
                    document.getElementById("info").innerHTML = "There is no result for your search.";
                }
            }
            xhr.send();
        }
        else {
            document.getElementById("info").innerText = "Please enter at least one character or number to start search.";
            function hideLoading() {
                loaderContainer.style.display = "none";
            };
            hideLoading();
        };

    }
};
wrap();