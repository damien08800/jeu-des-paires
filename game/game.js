document.addEventListener('DOMContentLoaded', function() {
    const SAVED_MANY_CARDS = parseInt(localStorage.getItem('selectedManyCards'));
    const SAVED_SKIN = localStorage.getItem('selectedSkin');
    const MUTED = localStorage.getItem('muted');
    const GAME_DIV = document.getElementById("game");

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
    function clearGameDiv() {
        while (GAME_DIV.firstChild) {
            GAME_DIV.removeChild(GAME_DIV.firstChild);
        }
    }
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
            container.classList.add('cards-container', 'notFound');

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
            
            container.appendChild(backImage);
            container.appendChild(frontImage);
            divCard.appendChild(container); 
            GAME_DIV.appendChild(divCard);
        }
    }
    const flipCard = (container) =>{
        container.classList.toggle('flip');
    }
    function unflipAll(){
        let containers = document.querySelectorAll('.notFound');
        for(let container of containers){
            container.classList.remove('flip');
        }
    } 

    if (SAVED_MANY_CARDS && SAVED_SKIN) {

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
        //### ajout des div et des images en background
        //################################################################## 
        loadRandomCards();

        

        let state = {
            _nbCoups: 0,
            _nbPairesTrouve: 0,
            _canFlip: true,
            _nbFlippedCards: 0,
            _card1: null,
            _card2: null,
        
            get card1() {
                return this._card1;
            },
            set card1(value) {
                this._card1 = value;
            },
            get card2() {
                return this._card2;
            },
            set card2(value) {
                this._card2 = value;
                // onCard2Change();
            },
            get nbCoups() {
                return this._nbCoups;
            },
            set nbCoups(value) {
                this._nbCoups = value;
            },
        
            get nbPairesTrouve() {
                return this._nbPairesTrouve;
            },
            set nbPairesTrouve(value) {
                this._nbPairesTrouve = value;
                onNbPairesTrouveChange(value);
            },
        
            get canFlip() {
                return this._canFlip;
            },
            set canFlip(value) {
                this._canFlip = value;
            },
        
            get nbFlippedCards() {
                return this._nbFlippedCards;
            },
            set nbFlippedCards(value) {
                this._nbFlippedCards = value;
                onNbFlippedCardsChange(value);
            }
        };

        function onCard2Change(){
            if(state.card1 != null && state.card2 != null){
                console.log(state.card1, state.card2);
                state.card1 = null;
                state.card2 = null;
            }
        }
        
        function onNbFlippedCardsChange(newValue) {
            console.log("La valeur de nbFlippedCards a changé :", newValue);
            if(state.nbFlippedCards == 2){
                state.canFlip = false;
                setTimeout(() => {
                    if(state.card1 != null && state.card2 != null){
                        if(state.card1.style.backgroundImage == state.card2.style.backgroundImage){
                            removeClassFromPaire(state.card1.style.backgroundImage);
                            state.nbPairesTrouve++;
                        }
                        state.card1 = null;
                        state.card2 = null;
                    }                        
                    unflipAll();
                    state.nbFlippedCards = 0;
                    state.canFlip = true;
                  }, "300");
            }
        }
        function onNbPairesTrouveChange(newValue) {
            if(state.nbPairesTrouve == SAVED_MANY_CARDS/2){
                console.log(state.nbCoups);
                console.log(state.nbPairesTrouve);
                alert("gg ez")
            }
        }
        function removeClassFromPaire(url1){
            let containers = document.querySelectorAll('.notFound');
            containers.forEach(container => {
                if(container.lastChild.style.backgroundImage == url1){
                    container.classList.remove('notFound');
                    container.removeEventListener('click', handleClick);
                }
            })
        }

        function handleClick() {
            if (state.canFlip) {
                state.card1 == null ? state.card1 = this.lastChild : state.card2 = this.lastChild;
                state.canFlip = false;
                flipCard(this);
                state.nbCoups++;
                setTimeout(() => {
                    state.canFlip = true;
                    state.nbFlippedCards++;
                }, 500);
            }
        }

        let containers = document.querySelectorAll('.cards-container');
        containers.forEach(container => {
            container.addEventListener('click', handleClick);
        });





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