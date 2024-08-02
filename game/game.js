document.addEventListener('DOMContentLoaded', function() {
    const savedManyCards = parseInt(localStorage.getItem('selectedManyCards'));
    const savedSkin = localStorage.getItem('selectedSkin');

    console.log(savedManyCards, savedSkin);

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

        for (let i = 0; i < savedManyCards; i++) {
            const divCard = document.createElement('div');

            if(i+1 <= savedManyCards/2){
                divCard.classList.add('div-card', `card-${i+1}`, 'first-line');
            }
            else{
                divCard.classList.add('div-card', `card-${i+1}`, 'last-line');
            }

            const backImage = document.createElement('span')
            const frontImage = document.createElement('span')
            backImage.classList.add('back-image')
            frontImage.classList.add('front-image')
            backImage.src = `../src/img/onepiece/onepieceback.png`;

            divCard.appendChild(backImage);
            divCard.appendChild(frontImage);
            gameDiv.appendChild(divCard);
        }
    } else {
        console.error('Aucune valeur trouvée pour le nombre de cartes');
    }
});

