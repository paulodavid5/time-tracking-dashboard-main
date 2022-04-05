const json_url = 'data.json';


async function getData() {
    const response = await fetch(json_url);
    const data = await response.json();

    console.log(data)

    const buttons = document.querySelectorAll('button');


    const activateClickedButton = (button) => {
        buttons.forEach(b => b.classList.remove('active'))
        button.classList.add('active')
    }

    const clearCards = () => {
        const cards = document.querySelectorAll('.card')
        cards.forEach(a => a.remove())
    }


    const renderCards = (clickedOption) => {
        clearCards()
        const content = document.querySelector('section.content')


        const calcTimeframe = (option) => {
            if (option === 'daily') {
                return 'Yesterday'
            } else if (option === 'weekly') {
                return 'Last Week'
            } else if (option === 'monthly') {
                return 'Last Month'
            }
        }

        data.forEach(card => {
            const name = card.title
            const cardClass = name.toLowerCase().replace(' ', '-')
            console.log(cardClass)
            const timeframeData = card.timeframes[clickedOption]
            const previousTimeFrame = calcTimeframe(clickedOption)
            const section = document.createElement('section')
            section.classList.add('card', cardClass)
            const stringToInject = `
            
                <div class="card__img">
                    <img src="images/icon-${cardClass}.svg" alt="">
                </div>
                <div class="card__timeframe">
                    <div class="header">
                        <h3>${name}</h3>
                    <div class="header__menu">
                        <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
                            <path
                            d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
                            fill="#BBC0FF" fill-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="timeframes">
                    <h1 class="current">${timeframeData.current}</h1>
                    <div class="previous">
                    <p class="time-window">${previousTimeFrame}</p>
                    <p>-</p>
                    <p class="time">${timeframeData.previous}</p>
                </div>
            

    
            `

            section.innerHTML = stringToInject
            content.append(section)

        });

    };


    buttons.forEach(button => {
        button.addEventListener('click', () => {
            activateClickedButton(button)
            const clickedOption = button.dataset.option
            renderCards(clickedOption)
        })
    })

    buttons[0].click()

}

getData();

