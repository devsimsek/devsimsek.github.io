let posts = []
let repos = []

console.info("Fetching projects")
fetch('https://api.github.com/users/devsimsek/repos', {
    headers: {
        'Accept': 'application/vnd.github.v3+json'
    }
}).then(response => response.json()).then(data => {
    const projectsContainer = document.querySelector('#projects-container');
    let i = 0;
    data.sort((a, b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    }).forEach(project => {
        if (i <= 5) {
            let project_e = document.createElement("div")
            if (project["description"] === null) project["description"] = "No description, website, or topics provided."
            project_e.innerHTML = '<div class="project-container flex-inline"><img class="post-image" src="https://opengraph.githubassets.com/' + generateUniqueHash() + '/devsimsek/' + project["name"] + '" alt="Post image"><div class="text-end"><a href="' + project["html_url"] + '" class="heading h3 bold text-red">' + project["name"] + '</a><p class="ms-2">' + project["description"] + '</p></div></div>'
            projectsContainer.appendChild(project_e)
        }
        i++
        repos.push(project)
    })
}).catch(error => console.error(error));
console.info("Fetched projects")

fetchJson("https://stories.smsk.me/api.json", (response) => {
    let postsContainer = document.querySelector("#posts-container")
    console.info("Fetching Posts...")
    let i = 0;
    Object.keys(response).forEach(r => {
        if (response[r]["type"] === "post") {
            if (i <= 5) {
                let post = response[r]
                let post_e = document.createElement("div")
                post_e.innerHTML = '<div class="post-container flex-inline"><div><a href="' + "https://stories.smsk.me/post/" + r + '" class="heading h3 bold text-red">' + post["title"] + '</a><p class="me-2">' + post["description"] + '</p></div><img class="post-image" src="' + post["image"] + '" alt="Post image"></div>'
                postsContainer.appendChild(post_e)
            }
            i++
            posts.push(response[r])
        }
    })
    console.info("Fetched Posts...")
})

function fetchJson(location, callback) {
    fetch(location).then(resp => {
        if (!resp.ok) {
            throw `Server error: [${resp.status}] [${resp.statusText}] [${resp.url}]`;
        }
        return resp.json();
    }).then(out => {
        callback(out)
    }).catch(err => {
        console.error("FetchError, ", err);
    });
}

function fetchXml(location, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if ((this.readyState === 4) && (this.status === 200)) {
            let sitemapContent = this.responseText;
            let sitemapObject = parseXml(sitemapContent);
            callback(sitemapObject);
        }
    };
    xhttp.open('GET', location, true);
    xhttp.send();
}

function parseXml(xml) {
    return new DOMParser().parseFromString(xml, 'text/xml');
}

function generateHash(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function generateUniqueHash() {
    return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2);
}