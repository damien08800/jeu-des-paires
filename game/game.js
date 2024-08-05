document.addEventListener('DOMContentLoaded', function() {
    const savedManyCards = parseInt(localStorage.getItem('selectedManyCards'));
    const savedSkin = localStorage.getItem('selectedSkin');

    console.log(savedManyCards, savedSkin);

    //##################################################################
    //### chargement du bon fichier css
    //################################################################## 
    const gameDiv = document.getElementById("game");
    if (savedManyCards) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';

        switch (savedManyCards) {
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
        //### ajout des div et de la fonction flip
        //################################################################## 
        const flipCard = (container) =>{
            container.classList.toggle('flip');
        }

        for (let i = 0; i < savedManyCards; i++) {
            const divCard = document.createElement('div');
            if(i+1 <= savedManyCards/2){
                divCard.classList.add('div-card', `card-${i+1}`, 'first-line');
            }
            else{
                divCard.classList.add('div-card', `card-${i+1}`, 'last-line');
            }

            const container = document.createElement('div');
            container.classList.add('cards-container');

            const backImage = document.createElement('span')
            const frontImage = document.createElement('span')
            backImage.classList.add('back-image')
            frontImage.classList.add('front-image')

            container.addEventListener('click', function(){
                console.log('oui')
                flipCard(container);
            })

            container.appendChild(backImage);
            container.appendChild(frontImage);
            divCard.appendChild(container); 
            gameDiv.appendChild(divCard);
        }
    } else {
        console.error('Aucune valeur trouvée pour le nombre de cartes');
    }

    //##################################################################
    //### mise en place du titre selon le thème
    //################################################################## 
    let title = document.querySelector('#theme_name h3');
    title.textContent = savedSkin;

    //##################################################################
    //### fonctionnement de la navigation (leave et reset)
    //##################################################################
    const leaveButton = document.querySelector('#leave');
    const resetButton = document.querySelector('#reset');
    const timerButton = document.querySelector('#timer');

    leaveButton.addEventListener("click", function(){
        window.location.href = "../";
    })


    function shuffle(arr) {
        const arrCopy = [...arr];
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        }
        return arrCopy;
    }
    
    function randomCards(){
        let tab = [];
        for (let i = 1; i <= parseInt(savedManyCards); i++){
            tab.push(i);
        }
        return shuffle(tab);
    }
    console.log(randomCards());

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

