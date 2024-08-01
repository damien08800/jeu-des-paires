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
            case 8:
                link.href = `css/8.css`;
                break;
            case 16:
                link.href = `css/16.css`;
                break;
            case 32:
                link.href = `css/32.css`;
                break;
            default:
                console.error('Nombre de cartes non supporté');
                return; 
        }

        document.head.appendChild(link);

        for (let i = 0; i < savedManyCards; i++) {
            const divCard = document.createElement('div');
            divCard.classList.add('div-card', `card-${i+1}`);
            gameDiv.appendChild(divCard);
        }
    } else {
        console.error('Aucune valeur trouvée pour le nombre de cartes');
    }
});
