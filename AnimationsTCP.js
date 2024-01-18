function clic(animation) {
    animation.fonction(animation)
    animation.compteur += 1
}

function dessinerFleche(animation, sens, texteHaut, texteBas, couleur) {
    if (sens == ">") {
        animation.svg.innerHTML += '<line x1="115" y1="'+animation.y+'" x2="385" y2="'+(animation.y+10)+'" marker-end="url(#'+couleur+'Triangle)" stroke="'+couleur+'"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(2)" fill="'+couleur+'">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(2)" fill="'+couleur+'">'+texteBas+'</text>'
    }
    if (sens == "<") {
        animation.svg.innerHTML += '<line x1="395" y1="'+animation.y+'" x2="125" y2="'+(animation.y+10)+'" marker-end="url(#'+couleur+'Triangle)" stroke="'+couleur+'"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(-2)" fill="'+couleur+'">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(-2)" fill="'+couleur+'">'+texteBas+'</text>'
    }
    animation.y += 40
}

function dessinerFlecheTronquee(animation, sens, texteHaut, texteBas,couleur) {
    if (sens == ">") {
        animation.svg.innerHTML += '<line x1="115" y1="'+animation.y+'" x2="317.5" y2="'+(animation.y+7.5)+'" stroke="'+couleur+'"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(2)" fill="'+couleur+'">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(2)" fill="'+couleur+'">'+texteBas+'</text>'
    }
    if (sens == "<") {
        animation.svg.innerHTML += '<line x1="395" y1="'+animation.y+'" x2="182.5" y2="'+(animation.y+7.5)+'" stroke="'+couleur+'"/>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y-5)+'" transform="rotate(-2)" fill="'+couleur+'">'+texteHaut+'</text>'
        animation.svg.innerHTML += '<text x="250" y="'+(animation.y+15)+'" transform="rotate(-2)" fill="'+couleur+'">'+texteBas+'</text>'
    }
    animation.y += 40
}

function ajouterTexteMarge(animation, deltaY, texte, position, couleur) {
    if (position == 'A') {
        animation.svg.innerHTML += '<text x="30" y="'+(animation.y+deltaY)+'" fill="'+couleur+'">'+texte+'</text>'
    }
    if (position == 'B') {
        animation.svg.innerHTML += '<text x="480" y="'+(animation.y+deltaY)+'" fill="'+couleur+'">'+texte+'</text>'
    }
}

function miseEnPlace(animation) {
        var txt = '<svg xml:lang="fr" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 500 580"><defs>'
        const couleurs = ["black", "red", "green", "gray"]
        couleurs.forEach(couleur => {
            txt += '<marker id="'+couleur+'Triangle" viewBox="0 0 10 10" refX="1" refY="5" markerUnits="strokeWidth" markerWidth="10" markerHeight="10" orient="auto" fill="'+couleur+'"><path d="M 0 0 L 10 5 L 0 10 z"/></marker>'
        })
        txt += '</defs><polygon points="95,10 115,10 115,550 95,550" fill="none" stroke="black"/><polygon points="395,10 415,10 415,550 395,550" fill="none" stroke="black"/><text x="105" y="20">A</text><text x="405" y="20">B</text></svg>'
        animation.div.innerHTML = txt
        animation.svg = animation.div.firstChild
}

function fonctionAnimation1(animation) {
    const fleches = [() => miseEnPlace(animation),
                     () => dessinerFleche(animation, '>', "SYN|seq=0|ack=0", "", "black"),
                     () => dessinerFleche(animation, '<', "ACK+SYN|seq=0|ack=1", "", "black"),
                     () => dessinerFleche(animation, '>', "ACK|seq=1|ack=1", "", "black"),
                     () => dessinerFleche(animation, '>', "GET|seq=1|ack=1", "491 octets", "black"),
                     () => dessinerFleche(animation, '<', "ACK|seq=1|ack=492", "", "black"),
                     () => dessinerFleche(animation, '<', "200OK|seq=1|ack=492", "623 octets", "black"),
                     () => dessinerFleche(animation, '>', "ACK|seq=492|ack=624", "", "black"),
                     () => {ajouterTexteMarge(animation, -8, "fermeture", "A", "black")
                            ajouterTexteMarge(animation, +8, "de la page", "A", "black")},
                     () => dessinerFleche(animation, '>', "FIN+ACK|seq=492|ack=624", "", "black"),
                     () => dessinerFleche(animation, '<', "FIN+ACK|seq=624|ack=493", "", "black"),
                     () => dessinerFleche(animation, '>', "ACK|seq=493|ack=625", "", "black"),]
    if (animation.compteur < fleches.length) {fleches[animation.compteur]()}
}

function fonctionAnimation2(animation) {
    const fleches = [() => miseEnPlace(animation),
                     () => {dessinerFleche(animation, '>', "SYN|seq=0|ack=0", "", "gray")
                            dessinerFleche(animation, '<', "ACK+SYN|seq=0|ack=1", "", "gray")
                            dessinerFleche(animation, '>', "ACK|seq=1|ack=1", "", "gray")},
                     () => dessinerFlecheTronquee(animation, '>', "GET|seq=1|ack=1", "491 octets", "red"),
                     () => {ajouterTexteMarge(animation, -48, "delais", "A", "red")
                            ajouterTexteMarge(animation, -32, "écoulé", "A", "red")},
                     () => {ajouterTexteMarge(animation, -8, "réémission", "A", "green")
                            ajouterTexteMarge(animation, +8, "du paquet", "A", "green")},
                     () => dessinerFleche(animation, '>', "GET|seq=1|ack=1", "491 octets", "green"),
                     () => {dessinerFleche(animation, '<', "ACK|seq=1|ack=492", "", "gray")
                            dessinerFleche(animation, '<', "200OK|seq=1|ack=492", "623 octets", "gray")
                            dessinerFleche(animation, '>', "ACK|seq=492|ack=624", "", "gray")
                            ajouterTexteMarge(animation, -8, "fermeture", "A", "gray")
                            ajouterTexteMarge(animation, +8, "de la page", "A", "gray")
                            dessinerFleche(animation, '>', "FIN+ACK|seq=492|ack=624", "", "gray")
                            dessinerFleche(animation, '<', "FIN+ACK|seq=624|ack=493", "", "gray")
                            dessinerFleche(animation, '>', "ACK|seq=493|ack=625", "", "gray")}]
    if (animation.compteur < fleches.length) {fleches[animation.compteur]()}
}

function fonctionAnimation3(animation) {
    const fleches = [() => miseEnPlace(animation),
                     () => {dessinerFleche(animation, '>', "SYN|seq=0|ack=0", "", "gray")
                            dessinerFleche(animation, '<', "ACK+SYN|seq=0|ack=1", "", "gray")
                            dessinerFleche(animation, '>', "ACK|seq=1|ack=1", "", "gray")
                            dessinerFleche(animation, '>', "GET|seq=1|ack=1", "491 octets", "gray")
                            dessinerFleche(animation, '<', "ACK|seq=1|ack=492", "", "gray")},
                     () => dessinerFlecheTronquee(animation, '<', "200OK|seq=1|ack=492", "623 octets", "red"),
                     () => {ajouterTexteMarge(animation, -48, "delais", "A", "red")
                            ajouterTexteMarge(animation, -32, "écoulé", "A", "red")},
                     () => {ajouterTexteMarge(animation, -8, "réémission", "A", "green")
                            ajouterTexteMarge(animation, +8, "du paquet", "A", "green")},
                     () => dessinerFleche(animation, '>', "GET|seq=1|ack=1", "491 octets", "green"),
                     () => {ajouterTexteMarge(animation, -38, "détection", "B", "green")
                            ajouterTexteMarge(animation, -22, "de doublon", "B", "green")},
                     () => dessinerFleche(animation, '<', "ACK|seq=1|ack=492", "", "green"),
                     () => dessinerFleche(animation, '<', "200OK|seq=1|ack=492", "623 octets", "green"),
                     () => {dessinerFleche(animation, '>', "ACK|seq=492|ack=624", "", "gray")
                            ajouterTexteMarge(animation, -8, "fermeture", "A", "gray")
                            ajouterTexteMarge(animation, +8, "de la page", "A", "gray")
                            dessinerFleche(animation, '>', "FIN+ACK|seq=492|ack=624", "", "gray")
                            dessinerFleche(animation, '<', "FIN+ACK|seq=624|ack=493", "", "gray")
                            dessinerFleche(animation, '>', "ACK|seq=493|ack=625", "", "gray")}]
    if (animation.compteur < fleches.length) {fleches[animation.compteur]()}
}

const animation1 = {div:document.getElementById("animationTCP1"), compteur:0, fonction:fonctionAnimation1, y:40}
animation1.div.addEventListener("click", event => clic(animation1))

const animation2 = {div:document.getElementById("animationTCP2"), compteur:0, fonction:fonctionAnimation2, y:40}
animation2.div.addEventListener("click", event => clic(animation2))

const animation3 = {div:document.getElementById("animationTCP3"), compteur:0, fonction:fonctionAnimation3, y:40}
animation3.div.addEventListener("click", event => clic(animation3))
