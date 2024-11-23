const defaultUrl = 'https://api.currentsapi.services/v1/latest-news?' +
                   'language=en&' + 
                   'apikey=';

let buttons = document.getElementsByClassName("button");
let hiddenInput = document.getElementById("srchbar");
let div1 = document.getElementById("news1");
let div2 = document.getElementById("news2");
let div3 = document.getElementById("news3");
let div4 = document.getElementById("news4");
let div5 = document.getElementById("news5");
let div6 = document.getElementById("news6");
let div7 = document.getElementById("mnews1");
let div8 = document.getElementById("mnews2");
let div9 = document.getElementById("mnews3");

const divs = [div1, div2, div3, div4, div5, div6, div7, div8,div9];

// Initial load with default URL
gen(defaultUrl);

hiddenInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let query = hiddenInput.value.trim();
        if (query) {
            let searchUrl = `https://api.currentsapi.services/v1/search?keywords=${query}&language=en&apiKey=Rg6bJBSmrCFyCtCLt7wP_0yhz7A15C56sGs5AcbTbAHrHcFH`;
            gen(searchUrl);
        }
    }
});

// Loop through buttons and add click event listeners
for (let button of buttons) {
    button.addEventListener("click", function(event) {
        let s = event.target.innerText;
        let searchUrl = `https://api.currentsapi.services/v1/search?keywords=${s}&language=en&apiKey=Rg6bJBSmrCFyCtCLt7wP_0yhz7A15C56sGs5AcbTbAHrHcFH`;
        gen(searchUrl);
    });
}

async function gen(url) {
    try {
        let req = new Request(url);
        let response = await fetch(req);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();
        console.log(data);

        if (data.news && data.news.length > 0) {
            for (let i = 0; i < divs.length; i++) {
                if (data.news[i]) {
                    let titleElement = divs[i].querySelector("h2");
                    let descElement = divs[i].querySelector("p");
                    let desImg = divs[i].querySelector("img");
                    divs[i].addEventListener("click", function() {
                        window.open(data.news[i].url, '_blank'); 
                    });
                    if (desImg) {
                        desImg.src = data.news[i].image || 'default-image-url'; // Use a default image if no image is found
                    }

                    titleElement.innerText = data.news[i].title;
                    descElement.innerText = data.news[i].description;

                    divs[i].addEventListener("click", function() {
                        window.open(data.news[i].url, '_blank'); 
                    });
                } else {
                    let titleElement = divs[i].querySelector("h2");
                    let descElement = divs[i].querySelector("p");

                    titleElement.innerText = "No news article available";
                    descElement.innerText = "";
                }
            }
        } else {
            divs.forEach(div => {
                let titleElement = div.querySelector("h2");
                let descElement = div.querySelector("p");
                let desImg = div.querySelector("img");
                divs[i].addEventListener("click", function() {
                    window.open(data.news[i].url, '_blank'); 
                });
                if (desImg) {
                    desImg.src = 'default-image-url'; // Set a default image
                }

                titleElement.innerText = "No news articles found.";
                descElement.innerText = "";
            });
        }
    } catch (error) {
        console.error("Error fetching the news:", error);
        div1.querySelector("p").innerText = "An error occurred. Please try again later.";
    }
}
