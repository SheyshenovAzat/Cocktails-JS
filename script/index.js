const API = 'https://www.thecocktaildb.com/api/json/v1/1/'
const GET_ALL_COKTAILS = API + 'filter.php?c=Cocktail'
const Get_By_Name = API + 'search.php?s='
const Get_Filter = API + 'filter.php?a='
const Get_By_Id = API + 'lookup.php?i='
const Get_By_Ingredient = API + 'search.php?i='
// const API2 = 'www.thecocktaildb.com/images/ingredients/'  '-Medium.png'


const form = document.querySelector('#search')
const input = document.getElementById('inp')
const btn = document.getElementById('btn')
const select = document.getElementById('select')
const output = document.getElementById('output')


async function getAllCoctails() {
    const request = await fetch(GET_ALL_COKTAILS)
    const response = await request.json()
    renderCoctails(response.drinks)
}

const getByName = async () => {
    let request = ''
    if (input.value.length > 2) {
        request = await fetch(Get_By_Name + input.value)
    } else {
        request = await fetch(GET_ALL_COKTAILS)
    }
    const response = await request.json()
    renderCoctails(response.drinks);
}

const GetFiltered = async () => {
    const request = await fetch(Get_Filter + select.value)
    const response = await request.json()
    renderCoctails(response.drinks);
}

const GetById = async (id) => {
    const request = await fetch(Get_By_Id + id)
    const response = await request.json()
    // console.log(response)
    description(response.drinks[0])
}

const GetByIngredient = async (name) => {
    const request = await fetch(Get_By_Ingredient + name)
    const response = await request.json()
    // console.log(response)
    renderIngredient(response.ingredients[0])
}

const renderCoctails = (drinks) => {
    // console.log(drinks);
    output.innerHTML = ''
    drinks ?
        drinks.map(el => {
            const card = document.createElement('div')
            const img = document.createElement('img')
            const title = document.createElement('h2')
            title.style.textAlign = 'center'
            title.style.color = 'white'
            title.style.width = '320px'
            title.style.fontSize = '20px'

            img.src = el.strDrinkThumb
            img.style.width = '300px'
            img.style.borderRadius = '25px'
            title.textContent = el.strDrink
            card.style.marginBottom = '20px'

            card.addEventListener('click', () => GetById(el.idDrink))
            card.append(img, title)
            output.append(card)
        })
        :
        output.innerHTML = `<h1>server error</h1>`
}

const description = (cocktail) => {
    output.innerHTML = ''
    const card1 = document.createElement('div')
    const card2 = document.createElement('div')
    const img = document.createElement('img')
    const nameOfCoktail = document.createElement('h2')
    const des = document.createElement('p')

    nameOfCoktail.style.textAlign = 'center'
    img.src = cocktail.strDrinkThumb
    img.style.width = '400px'
    img.style.borderRadius = '25px'
    nameOfCoktail.textContent = cocktail.strDrink
    des.textContent = cocktail.strInstructions

    card2.append(nameOfCoktail, des,)
    for (let key in cocktail) {
        if (key.includes('strIngredient') && cocktail[key] != null) {
            const ingridient = document.createElement('li')
            ingridient.textContent = cocktail[key]
            ingridient.addEventListener('click', () => GetByIngredient(cocktail[key]))
            card2.append(ingridient)
        }
    }



    card1.append(img)
    output.append(card1, card2)
    output.style = `
    width: 1000px;
    height: 500px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 2px solid white;
    border-radius: 20px;
    color: white;
    `

    card2.style = `
    width: 400px;
    `
}

const renderIngredient = (ingr) => {
    console.log(ingr);
    output.innerHTML = ''
    const title = document.createElement('h1')
    title.textContent = ingr.strIngredient
    const descr = document.createElement('p')
    descr.textContent = ingr.strDescription == null ? 'Описание отсутствует...' : ingr.strDescription
    const img = document.createElement('img')
    img.src = `https://www.thecocktaildb.com/images/ingredients/${ingr.strIngredient}-Small.png`
    descr.style = `
    width: 60%;
     `
    // if (ingr.strIngredient == 'vodka') {
    //     output.innerHTML = ''
    //     const vodka = document.createElement('div')
    //     const tit = document.createElement('h1')
    //     tit.textContent = ingr.strIngredient
    //     const des = document.createElement('p')
    //     des.textContent = ingr.strDescription
    //     vodka.style = `
    //     width: 80%;
    //     height: 1500px;
    //     `
    //     vodka.append(tit, des)
    //     output.append(vodka)
    // } else {
    //     alert('error')
    // }
    output.append(title, descr, img)
}


form.addEventListener('submit', (e) => { e.preventDefault() })
input.addEventListener('keyup', getByName)
select.addEventListener('change', GetFiltered)


getAllCoctails()
// GetById()