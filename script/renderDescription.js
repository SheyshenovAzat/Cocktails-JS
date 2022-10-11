function renderDescription(drinks) {
    // console.log(drinks);
    output.innerHTML = '';
    drinks ?
        drinks.map(el => {
            const card = document.createElement('div');
            const img = document.createElement('img');
            const title = document.createElement('h2');
            title.style.textAlign = 'center';
            img.src = el.strDrinkThumb;
            img.style.width = '300px';
            img.style.borderRadius = '25px';
            title.textContent = el.strDrink;

            card.addEventListener('click', renderDescription);
            card.append(img, title);
            output.append(card);
        })
        :
        output.innerHTML = `<h1>server error</h1>`;
}
