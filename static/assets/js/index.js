const nameTitle = document.getElementById("nameText")
const xhttp = new XMLHttpRequest
var changed = ["UFINAT0R | MATEO SNJEGOTINAC", "UF1NAT0R | MATEO SNJEGOTINAC", "UF1NAT0R | MATE0 SNJEGOTINAC", "UF1NAT0R | MATE0 SNJEG0TINAC", "UF1NAT0R | MATE0 SNJEG0T1NAC", "UF1NAT0R 1 MATE0 SNJEG0T1NAC", "UFINATOR | MATEO SNJEGOTINAC"]

setInterval(() => {
    nameTitle.textContent = changed[Math.round(Math.random() * 6)]
}, 1000);
document.documentElement.style.setProperty('--animate-duration', '.5s');

particle()
if (window.location.pathname.endsWith("projects/")) {
        fetchdata()
}

xhttp.onload = function() {
    let parser = new DOMParser;
    let doc = parser.parseFromString(this.responseText, "text/html")
    document.getElementById("content").classList.remove('animate__animated', 'animate__fadeOut')
    document.getElementById("content").innerHTML = doc.getElementById("content").innerHTML
    if (this.responseURL.endsWith("projects/")) {
        fetchdata()
    }
    particle()
}

function particle() {
    particlesJS('particles-js',
    {
        "particles": {
        "number": {
            "value": 80,
            "density": {
            "enable": true,
            "value_area": 850
            }
        },
        "color": {
            "value": "#ff0000"
        },
        "shape": {
            "type": "circle",
            "stroke": {
            "width": 0,
            "color": "#000000"
            },
            "polygon": {
            "nb_sides": 5
            },
            "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
            }
        },
        "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 200,
            "color": "#ff0000",
            "opacity": 0.4,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 4,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "bounce",
            "bounce": false,
            "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
            }
        }
        },
        "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
            "enable": false,
            "mode": "bubble"
            },
            "onclick": {
            "enable": false,
            "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
            "distance": 400,
            "line_linked": {
                "opacity": 1
            }
            },
            "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
            },
            "repulse": {
            "distance": 200,
            "duration": 0.4
            },
            "push": {
            "particles_nb": 4
            },
            "remove": {
            "particles_nb": 2
            }
        }
        },
        "retina_detect": true
    });
}

function publickey() {
    let content = document.querySelector("#content")
    content.classList.add('animate__animated', 'animate__fadeOut')
    content.addEventListener('animationend', () => {
        xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/publickey/")
        xhttp.send()
    }, {once: true});
    window.history.pushState('Publickey', 'Publickey | mateo.snjegotinac.ch', '/publickey/')
}

function project() {
    let content = document.querySelector("#content")
    content.classList.add('animate__animated', 'animate__fadeOut')
    content.addEventListener('animationend', () => {
        xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/projects/")
        xhttp.send("ok")
    }, {once: true});
    window.history.pushState('projectpage', 'Projectpage | mateo.snjegotinac.ch', '/projects/')
}

function home() {
    let content = document.querySelector("#content")
    content.classList.add('animate__animated', 'animate__fadeOut')
    content.addEventListener('animationend', () => {
        console.log(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/")
        xhttp.open("GET", window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/")
        xhttp.send()
    }, {once: true});
    window.history.pushState('homepage', 'Homepage | mateo.snjegotinac.ch', '/')
}

function fetchdata() {
        fetch("/api/projects/").then((e) => e.json()).then((e) => {
            e.forEach(element => {
                let boxgroup = document.getElementById("boxgroup")
                let abox = document.createElement("div")
                abox.setAttribute("class", "abox")
                let padder = document.createElement("div")
                padder.setAttribute("id", "padder")
                let h1 = document.createElement("h1")
                h1.textContent = element[0]
                let h2 = document.createElement("h2");
                h2.textContent = element[1]
                let a = document.createElement("a")
                a.setAttribute("href", element[3])
                a.setAttribute("target", "_blank")
                a.textContent = element[3]
                let othera = document.createElement("a")
                othera.setAttribute("href", element[3])
                othera.setAttribute("target", "_blank")
                othera.style.textDecoration = "none"
                let img = document.createElement("div")
                img.style.background = "url('" + element[2] + "') no-repeat"
                img.style.backgroundSize = "350px"
                img.setAttribute("id", "img")
                padder.appendChild(h1)
                padder.appendChild(h2)
                padder.appendChild(a)
                abox.appendChild(padder)
                abox.appendChild(img)
                othera.appendChild(abox)
                boxgroup.appendChild(othera)
            })
            document.getElementById("boxgroup").setAttribute("class", "animate__animated animate__zoomIn animate__faster animate__delay-1s")
        })
}