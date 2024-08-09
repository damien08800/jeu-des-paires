document.addEventListener('DOMContentLoaded', function() {
    const SAVED_MANY_CARDS = parseInt(localStorage.getItem('selectedManyCards'));
    const SAVED_SKIN = localStorage.getItem('selectedSkin');
    const MUTED = localStorage.getItem('muted');
    const GAME_DIV = document.getElementById("game");
    const BOARD = document.getElementById("board");
    const board_theme = document.getElementById("board_theme");
    const board_nbCoups = document.getElementById("board_nbCoups");
    const board_temps = document.getElementById("board_temps");
    const board_best = document.getElementById("best");

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
    const loadRandomCards = (cardsList) =>{

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
        // let cardsList = randomCardsList();
        loadRandomCards(randomCardsList());

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
            if(newValue == SAVED_MANY_CARDS/2){
                stopChronometer();
                let newTime = document.querySelector("#timer").textContent
                BOARD.style.zIndex = 3;
                BOARD.style.opacity = 1;
                board_theme.textContent = "thème: "+SAVED_SKIN;
                board_nbCoups.textContent = "nombres de coups: "+state.nbCoups;
                board_temps.textContent = "temps: "+newTime;
                const BEST = localStorage.getItem('best');
                if(BEST){
                    if(compareTimes(newTime, BEST)){
                        localStorage.setItem('best', newTime);
                    }
                }
                else{
                    localStorage.setItem('best', newTime);
                }
                board_best.textContent = "meilleur temps: "+localStorage.getItem("best");

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
                startChronometer();
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
        function addEventListenerClick(){
            let containers = document.querySelectorAll('.cards-container');
            containers.forEach(container => {
                container.addEventListener('click', handleClick);
            });
        }
        addEventListenerClick();

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

        leaveButton.addEventListener("click", function(){
            window.location.href = "../";
        })
        resetButton.addEventListener("click", function(){
            clearGameDiv();
            loadRandomCards(randomCardsList());
            addEventListenerClick();
            resetChronometer();
            state.nbPairesTrouve = 0;
            state.nbCoups = 0;
            BOARD.style.zIndex = -3;
            BOARD.style.opacity = 0;
        })
        //##################################################################
        //### timer
        //##################################################################
        let chronometerInterval;
        let totalTime = 0;

        function startChronometer() {
            if (chronometerInterval) return; // Empêche de lancer plusieurs chronomètres en même temps
            chronometerInterval = setInterval(updateChronometer, 10);
        }

        function stopChronometer() {
            clearInterval(chronometerInterval);
            chronometerInterval = null;
        }

        function resetChronometer() {
            stopChronometer();
            totalTime = 0;
            document.getElementById('timer').innerText = "00:00:00";
        }

        function updateChronometer() {
            totalTime++;
            let minutes = Math.floor(totalTime / 6000);
            let seconds = Math.floor((totalTime % 6000) / 100);
            let time = totalTime % 100;

            // Formatage pour toujours afficher deux chiffres
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            time = time < 10 ? '0' + time : time;

            document.getElementById('timer').innerText = `${minutes}:${seconds}:${time}`;
        }

        function convertTimeToCentiseconds(timeString) {
            const [minutes, seconds, centiseconds] = timeString.split(':').map(Number);
            return (minutes * 6000) + (seconds * 100) + centiseconds;
        }
        
        function compareTimes(newTime, bestTime) {
            const time1InCentiseconds = convertTimeToCentiseconds(newTime);
            const time2InCentiseconds = convertTimeToCentiseconds(bestTime);
        
            if (time1InCentiseconds < time2InCentiseconds) {
                return true;
            } return false;
        }

    } else {
        console.error('Aucune valeur trouvée pour le nombre de cartes ou de thème');
    }

});



// ajout du son au click
// ajout du son quand c'est une paire
// ajout du son quand c'est pas une paire
// ajout du son en fond
// mettre une crois pour fermer fenêtre fin de partie
//bug -> on peut clicker deux fois sur la même cartes
//faire les version 6 et 10 cartes
//version mobile de la page d’accueil
//refaire le style
//