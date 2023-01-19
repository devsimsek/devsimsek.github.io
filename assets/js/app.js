let welcome = ["Bonjour", "Hello", "Merhaba", "Hallo", "Hola", "привет"]

function updateHeroText() {
    let letter = 0;
    document.getElementById("hero_welcome").innerText = ""
    let lastIndex = Math.floor(Math.random() * welcome.length)
    const text = welcome[lastIndex];

    function typeText() {
        if (letter < text.length) {
            document.getElementById("hero_welcome").innerText += text.charAt(letter);
            letter++;
            let speed = Math.floor(Math.random() * 150) + 50;
            setTimeout(typeText, speed);
        }
    }

    typeText();
    setTimeout(updateHeroText, 10000);
}

Array.from(document.getElementsByClassName('post-container')).forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let r = e.target.querySelector(".heading").href
        window.location.assign(r);
    });
});

Array.from(document.getElementsByClassName('project-container')).forEach((button) => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        let r = e.target.querySelector(".heading").href
        window.location.assign(r);
    });
});

function runSearch() {
    let searchbar = document.querySelector("#searchbar")
    if (searchbar.classList.contains("hidden")) searchbar.classList.remove("hidden")
}

function closeModal(e) {
    // Todo: find a better aproach for accessing parent divider
    if (!e.parentElement.parentElement.parentElement.parentElement.classList.contains("hidden")) e.parentElement.parentElement.parentElement.parentElement.classList.add("hidden")
}

function slugify(str) {
    str = str.replace(/^\s+|\s+$/g, ""); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;şığ";
    var to = "aaaaeeeeiiiioooouuuunc------sig";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
    }

    str = str
        .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes

    return str;
}

// Event Listeners

/* soon...
document.addEventListener("keyup", e => {
    if (e.which === 27) {
        console.info("Escape...")
    }
})
*/

document.querySelector("#searchinput").addEventListener("keyup", (e) => {
    let i = document.querySelector("#searchinput")
    let r_e = document.querySelector("#searchresults")
    r_e.innerHTML = ""
    if (i.value !== "") {
        if (r_e.classList.contains("hidden")) r_e.classList.remove("hidden")
        posts.forEach(p => {
            if (p['title'].includes(i.value)) {
                let e = document.createElement("div")
                e.classList.add("my-4")
                e.innerHTML += "<span class='badge'>Post</span> <a href='https://stories.smsk.me/post/" + slugify(p['title']) + "'>" + p["title"] + "</a>"
                r_e.append(e)
            }
        })
        repos.forEach(r => {
            if (r['name'].includes(i.value)) {
                let e = document.createElement("div")
                e.classList.add("my-4")
                e.innerHTML += "<span class='badge'>Project</span> <a href='https://github.com/devsimsek/" + r["name"] + "'>" + r["name"] + "</a>"
                r_e.append(e)
            }
        })
    }
})

updateHeroText();