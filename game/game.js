document.addEventListener('DOMContentLoaded', function() {
    const SAVED_MANY_CARDS = parseInt(localStorage.getItem('selectedManyCards'));
    const SAVED_SKIN = localStorage.getItem('selectedSkin');
    const MUTED = localStorage.getItem('muted');

    console.log(SAVED_MANY_CARDS, SAVED_SKIN, MUTED);

    function shuffle(arr) {
        const arrCopy = [...arr];
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        }
        return arrCopy;
    }
    
    function randomCardsList(){
        let tab = [];
        for (let i = 1; i <= 7; i++){
            tab.push(i);
        }
        const shuffledNewTab = shuffle(shuffle(tab).slice(0, SAVED_MANY_CARDS/2));

        // Doublage des valeurs dans le tableau
        let doubledTab = [];
        for (let value of shuffledNewTab) {
            doubledTab.push(value, value);
        }

        return shuffle(doubledTab);
    }

    if (SAVED_MANY_CARDS && SAVED_SKIN) {

        const GAME_DIV = document.getElementById("game");


        //##################################################################
        //### chargement du bon fichier css
        //################################################################## 
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';

        switch (SAVED_MANY_CARDS) {
            case 6:
                link.href = `css/6.css`;
                break;
            case 10:
                link.href = `css/10.css`;
                break;
            case 14:
                link.href = `css/14.css`;
                break;
            default:
                console.error('Nombre de cartes non supporté');
                return; 
        }
        document.head.appendChild(link);
        
        
        //##################################################################
        //### ajout des div et des images en background de la fonction flip
        //################################################################## 

        const loadRandomCards = () =>{
            let cardsList = randomCardsList();

            for (let i = 0; i < SAVED_MANY_CARDS; i++) {
                var divCard = document.createElement('div');
                if(i+1 <= SAVED_MANY_CARDS/2){
                    divCard.classList.add('div-card', `card-${i+1}`, 'first-line');
                }
                else{
                    divCard.classList.add('div-card', `card-${i+1}`, 'last-line');
                }
    
                var container = document.createElement('div');
                container.classList.add('cards-container');
    
                var backImage = document.createElement('span');
                backImage.classList.add('back-image');
                
                var frontImage = document.createElement('span');
                frontImage.classList.add('front-image');

                switch (SAVED_SKIN) {
                    case "onepiece":
                        backImage.style.backgroundImage = "url('../src/img/onepiece/onepieceback.png')";
                        frontImage.style.backgroundImage = `url('../src/img/onepiece/${cardsList[i]}.png')`;
                        break;
                    case "naruto":
                        backImage.style.backgroundImage = "url('../src/img/naruto/narutoback.png')";
                        frontImage.style.backgroundImage = `url('../src/img/naruto/${cardsList[i]}.png')`;
                        break;
                    case "jujutsu kaisen":
                        backImage.style.backgroundImage = "url('../src/img/onepiece/onepieceback.png')";
                        frontImage.style.backgroundImage = `url('../src/img/onepiece/${cardsList[i]}.png')`;
                        break;
                    case "hxh":
                        backImage.style.backgroundImage = "url('../src/img/hxh/hxhback.png')";
                        frontImage.style.backgroundImage = `url('../src/img/hxh/${cardsList[i]}.png')`;
                        break;
                    default:
                        backImage.style.backgroundImage = "url('../src/img/onepiece/onepieceback.png')";
                        frontImage.style.backgroundImage = `url('../src/img/onepiece/${cardsList[i]}.png')`;
                        return; 
                }
                
                container.addEventListener('click', function(){
                    flipCard(this);
                })
                
                container.appendChild(backImage);
                container.appendChild(frontImage);
                divCard.appendChild(container); 
                GAME_DIV.appendChild(divCard);
            }
        }
        loadRandomCards();
        console.log(randomCardsList());




        const flipCard = (container) =>{
            container.classList.toggle('flip');
        }


        //##################################################################
        //### mise en place du titre selon le thème
        //################################################################## 
        let title = document.querySelector('#theme_name h3');
        title.textContent = SAVED_SKIN;

        //##################################################################
        //### fonctionnement de la navigation (leave et reset)
        //##################################################################
        const leaveButton = document.querySelector('#leave');
        const resetButton = document.querySelector('#reset');
        const timerButton = document.querySelector('#timer');

        leaveButton.addEventListener("click", function(){
            window.location.href = "../";
        })



    } else {
        console.error('Aucune valeur trouvée pour le nombre de cartes ou de thème');
    }

});



// fonction shuffle
// ajout du son sur la page de jeu
// fonction pour lancer le timer
// fonction pour stopper le timer
// fonction qui met dans un tableau X nombres de cartes représenté par [1,6,4,3,2,5] -> pour retrouver la carte 1.png
// initialisation des variable de jeu: nombre de coups, temps, ...
// ajouter les cartes dans les span selon le thème
// trouver un moyen de retrouver le paires sans le voir dans l'inspecteur
// fonction pour vérifier si les deux cartes retournées sont des paires 
    //-> si oui: les enlevé et ajouter un point
    //-> si non: les retourner
// 

