const modal = document.querySelector('.modal');
const modalBasket = document.querySelector('.modalBasket');
const overlay = document.querySelector('.overlay');
const body = document.querySelector('body');
let goToCart = document.querySelector('.goToCart');
const btnBasket = document.getElementById('basket');
const CartEmptyWarn = document.querySelector('.CartIsEmpty');




// работа с БД(ДБ)
async function fetchData(){
  try{
    const response = await fetch('http://localhost:3000/api');

    if (!response.ok) {
      console.log('Network response was not ok');
  }

    // Парсим JSON данные
    const data = await response.json();
    render(data);
  }
  catch (error) {
    console.error('There was a problem with the fetch operation:', error);
}
  
}


function render(data) {

  console.log('Goods:', data.Goods);
  console.log('Additives:', data.Additives);
  console.log('Volumes:', data.Volumes);
  renderAdditives(data);
  let htmlCatalogPopular = '';
  
  data.Goods.forEach(
    ({
      id,
      name,
      photo,
      category,
      general_info
    }) => {

      const volumes = (data.Volumes.filter(volume => volume.id_good === id))
      const volume = volumes[0].volume
      const price = volumes[0].price
      htmlCatalogPopular = `
      <div id = "${id}">
        <p class="cardTitile">${name}</p>
        <div class="cardImg"><img src="${'http://' + photo}" alt="Photo" /></div>

        <div class="cardPriceVolume">
            <p class="price">${price} руб</p>
            <p class="volume"><span>${volume}</span> мл</p>
        </div>
        <button class="goToCart ${goToCart}">Добавить</button>
      </div>
        `;

      const newCard = document.createElement('div');
      newCard.className = 'card';
      newCard.innerHTML = htmlCatalogPopular;
      const catalogParent = document.getElementById(`catalog${category}`);
      let card = catalogParent.appendChild(newCard);
      
      // ПРИ НАЖАТИИ НА ПОЗИЦИЮ(ОТКРЫТЬ МОДАЛКУ С ПОЗИЦИЕЙ)
      card.addEventListener('click', () => {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        body.classList.add('modalOpen');
        document.querySelector(".mainInformation").innerHTML = `
            <div class="modalImgname">
              <div class="modalImg">
                <img class = "Selfie" src="${photo}" alt="Photo" />
              </div>
              <div class="modalText">
                <p class="cardTitile">${name}</p>
                <p class="modalgeneral_info">${general_info}</p>
              </div>
            </div>
            <div class = "price_for_backend">${price}</div>
            <div class="volumeQuantity">
              <div class="twoVolume">
                <div class="modalVolume modalActive" id="VolumeSmall">
                  <p class="basicPrice">Маленький</p>
                  <p class="basicVolume"><span>${volume}</span> мл</p>
                 </div>

                </div>
              </div>
            </div>
            `
        document.getElementById('CartAddButton').innerHTML = `
              <p>Добавить</p>
              <p class="PriceDayn">${price} руб</p>
          `

        // добавляем обработку кнопки для корзины
        const addToCartCart = document.getElementById(`CartAddButton`);
        addToCartCart.addEventListener('click', AddToCartFunc);



        //ЕСТЬ ЛИ У КОФЕ ДВА РАЗМЕРА?
        if (volumes.length == 2){
          const secondVolume = document.createElement('div')
          secondVolume.className = "modalVolume"
          secondVolume.innerHTML = `<p class="basicPrice">Большой</p>
                  <p class="basicVolume"><span>${volumes[1].volume}</span> мл</p>`

          document.querySelector(".twoVolume").appendChild(secondVolume)

        }

        // 2 КНОПКИ С РАЗМЕРОМ В МОДАЛ
        document.querySelectorAll('.modalVolume').forEach(button =>{ 
          button.addEventListener('click', () =>{
            if (button.className.includes('modalActive')){
              null
            }
            else{
              document.querySelectorAll('.modalVolume ').forEach(button =>{
                button.className = `modalVolume`
              }
            )
              button.className = `modalVolume modalActive`
              const pickedVolume = button.querySelector('span').textContent;
              const pickedPrice = volumes.find(item => item.volume === Number(pickedVolume)).price

              // вносим изменения по объёму
              document.querySelector('.price_for_backend').innerHTML = `${pickedPrice}`
              document.querySelector('.PriceDayn').innerHTML = `${pickedPrice} руб`

            }
            
          })
        })
        
        // ЗАКРЫТИЕ ЧЕРЕЗ ОВЕРЛЕЙ
        overlay.addEventListener('click', () =>{
          modal.classList.add('hidden');
          modalBasket.classList.add('hidden');
          overlay.classList.add('hidden');
          body.classList.remove('modalOpen');
        });




      });
    },
  );


}

const quantityToMult = document.querySelector('.quantity')
const quantityPlus = document.querySelector('.quantityPlus')
const quantityMinus = document.querySelector('.quantityMinus')

// СЧЕТЧИК В МОДАЛКЕ
quantityPlus.addEventListener('click', () => {
  const GoodPrice = document.querySelector('.PriceDayn')
  const currentCount = ++quantityToMult.textContent;
  GoodPrice.textContent = `${document.querySelector('.price_for_backend').textContent * currentCount} руб`;
})

quantityMinus.addEventListener('click', () => {
  const GoodPrice = document.querySelector('.PriceDayn')
  if(quantityToMult.textContent > 1){
    const currentCount = --quantityToMult.textContent;
  
    GoodPrice.textContent = `${document.querySelector('.price_for_backend').textContent * currentCount} руб`;
  }

})


// ПОДГРУЗКА ДОБАВОК
function renderAdditives(data){
  data.Additives.forEach(
    ({
      id,
      name,
      price
    }) =>{
      let addivtive = document.createElement('div')
      addivtive.className = 'additives'
      addivtive.innerHTML = `
      <div class="additivesname">${name}</div>
      <div class="addToCoffee">
        <span class="additivesPlus">+</span>
        <span class="additivesPrice">${price} руб</span>
      </div>
    `
      document.querySelector('.allAdditives').appendChild(addivtive)
    }
  )
  // КНОПКИ С additives В МОДАЛ

  document.querySelectorAll('.addToCoffee ').forEach(button =>{

    button.addEventListener('click', () =>{
      let PRCBACK = document.querySelector('.price_for_backend')
      let PRCDAYN = document.querySelector('.PriceDayn')
      const quantityToMult = document.querySelector('.quantity').textContent
      if (button.className.includes('modalActive')){
        button.className = `addToCoffee`
        AddedAdditives.pop(button.parentElement.querySelector('.additivesname').textContent)
        PRCBACK.textContent =  Number(PRCBACK.textContent) - (Number(button.querySelector('.additivesPrice').textContent.replace(' руб', '')) * quantityToMult)

        PRCDAYN.textContent =  Number(PRCDAYN.textContent.replace(' руб', '')) - (Number(button.querySelector('.additivesPrice').textContent.replace(' руб', '')) * quantityToMult) + ' руб'
      }
      else{
        AddedAdditives.push(button.parentElement.querySelector('.additivesname').textContent)
        PRCBACK.textContent = (Number(button.querySelector('.additivesPrice').textContent.replace(' руб', '')) * quantityToMult) + Number(PRCBACK.textContent)
        PRCDAYN.textContent = (Number(button.querySelector('.additivesPrice').textContent.replace(' руб', '')) * quantityToMult) + Number(PRCDAYN.textContent.replace(' руб', '')) + ' руб'
        button.className = `addToCoffee modalActive`
      }
      
    })
  })
};
// ДОБАВИТЬ ПОЗИЦИЮ В КОРЗИНУ
function AddToCartFunc(event){
  document.querySelectorAll('.addToCoffee').forEach(button =>{
    button.className = 'addToCoffee'
  })


    htmlBasket = `
  <div class="cartImgText">
    <div class="goodImg">
      <img src="${document.querySelector('.mainInformation').querySelector('.Selfie').src}" alt="Photo" />
    </div>
    <div class="goodText">
      <p class="goodname">${document.querySelector('.mainInformation').querySelector('.cardTitile').textContent}</p>
      <p class="goodAdditives">${AddedAdditives + ''}</p>
      <p class="basicVolume basketVolume">300 мл</p>
    </div>
  </div>
  <div class = "price_for_backend">${document.querySelector('.price_for_backend').textContent}</div>
  <div class="cartQuantityPrice">
    <div class="basketPrice">${document.querySelector('.PriceDayn').textContent}</div>
    <div>
      <div class="quantitySelection">
         <span class="quantityBasket">${document.querySelector('.quantity').textContent}</span>
      </div>
    </div>
  </div>
        `;
  const newBasketGood = document.createElement('div');
  newBasketGood.classList.add('basketGood');
  newBasketGood.innerHTML = htmlBasket;
  const basketParent = document.getElementById('innerbasketGoods');

  AddedAdditives = []


  const NewBasketCard = basketParent.appendChild(newBasketGood);
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  body.classList.remove('modalOpen');
  ChangeCartSumma();



  document.querySelector('.quantity').textContent = 1;

  // КНОПКИ В КОРЗИНЕ
  let quantityPlusButton = document.createElement('span');
  quantityPlusButton.innerHTML = '<span class="quantityPlus" id="PlusInCart">+</span>'
  let quantityMinusButton = document.createElement('span');
  quantityMinusButton.innerHTML = '<span class="quantityMinus" id="MinusInCart">−</span>'

  
  let quantityMinusButtonJS = NewBasketCard.querySelector('.quantitySelection').insertBefore(quantityMinusButton,
    NewBasketCard.querySelector('.quantityBasket'))

  let quantityPlusButtonJS = NewBasketCard.querySelector('.quantitySelection').appendChild(quantityPlusButton)


  // ЛОГИКА КНОПОК
  quantityPlusButtonJS.addEventListener('click', () => {
    const PriceGoodInCart = quantityMinusButtonJS.parentElement.parentElement.parentElement.querySelector('.basketPrice')
    let zombie = ++(quantityMinusButtonJS.parentElement.querySelector('.quantityBasket').textContent)
    PriceGoodInCart.textContent = `${(NewBasketCard.querySelector('.price_for_backend').textContent) * zombie} руб`
    ChangeCartSumma()
  })

  quantityMinusButtonJS.addEventListener('click', () => {
    const PriceGoodInCart = quantityMinusButtonJS.parentElement.parentElement.parentElement.querySelector('.basketPrice')

    if (quantityMinusButtonJS.parentElement.querySelector('.quantityBasket').textContent > 0){
      let zombie = --(quantityMinusButtonJS.parentElement.querySelector('.quantityBasket').textContent)
      PriceGoodInCart.textContent = `${(NewBasketCard.querySelector('.price_for_backend').textContent) * zombie} руб`
    }
    ChangeCartSumma()
  })
}


// ЗАКРЫТИЕ МОДАЛКИ
const closeModalBtn = document.querySelector('.btnClose');
closeModalBtn.addEventListener('click', () => {
    console.log('Окно закрыто');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    body.classList.remove('modalOpen');
    document.querySelector('.quantity').textContent = 1
    document.querySelectorAll('.addToCoffee').forEach(button =>{
      button.className = 'addToCoffee'
    })
});


// ОТКРЫТЬ КОРЗИНУ
btnBasket.addEventListener('click', () => {
  CartEmptyWarn.classList.add('hidden');
  modalBasket.classList.remove('hidden');

  if (([].slice.call(document.getElementById('innerbasketGoods').getElementsByClassName('basketGood'),0).length) <= 0  ) {
    CartEmptyWarn.classList.remove('hidden');
    document.querySelector('.ToPayment').parentElement.classList.add('hidden'); // СПРЯТАТЬ КНОПКУ
  }else{
    document.querySelector('.ToPayment').parentElement.classList.remove('hidden');
  }
  
  overlay.classList.remove('hidden');
  body.classList.add('modalOpen');

  const closeBasketBtn = document.querySelector('.basketClose');
  closeBasketBtn.addEventListener('click', () => {
    ChangeCartSumma();
    modalBasket.classList.add('hidden');
    overlay.classList.add('hidden');
    body.classList.remove('modalOpen');
    });
});


// ОБНОВИТЬ СУММУ ПОЗИЦИЙ НА КНОПКЕ С КОРЗИНОЙ
function ChangeCartSumma(){
  var childrens = [].slice.call(document.getElementById('innerbasketGoods').getElementsByClassName('basketGood'),0);
  let summa = 0
  childrens.forEach(children => {
    summa += (Number(children.querySelector('.basketPrice').textContent.replace(' руб', '')))
  });
  btnBasket.innerHTML = `
  <button>
          <img class="basketImg" src="http://localhost:3000/icon_basket.png" alt="" /> ${summa}₽
        </button>`
  btnBasket.style.display = 'flex';
  document.querySelector('.ToPayment').textContent = `К оплате ${summa}₽`
}


let AddedAdditives = []

// ПЕРЕХОД К ОПЛАТЕ
// document.querySelector('.ToPayment').addEventListener('click', () =>{
  
//     const paschalca = document.createElement('div')
//     paschalca.innerHTML = `
//     <img id="pashalco" src="${'http://localhost:3000/pashalco.jfif '}"alt="Photo" />
//     <div id="pudgeText">PUDGE</div>` //pashalca.png pashalca.jpg pashalco.jfif DANGER_OCHEN_OPASNAYA_PASHALCO_UBRAT_POSTORONIH_ACHTUNG.png
//     document.querySelector('.modalBasket').appendChild(paschalca)
//     document.getElementById('pashalco').style.transform = 'rotate(0deg) scale(0)';
//     document.getElementById('pudgeText').style.transform = 'rotate(0deg) scale(0)';

//     // Используем setTimeout для задержки перед применением конечного состояния
//     setTimeout(() => {
//         document.getElementById('pashalco').style.transform = 'rotate(3600deg) scale(1)';
//         document.getElementById('pudgeText').style.transform = 'rotate(3600deg) scale(1)'
//     }, 1000)
    


// })
// КНОПКИ ХОТБАР
document.querySelectorAll('.hotbarLink').forEach(button =>{ 
  button.addEventListener('click', () =>{
    if (button.className.includes('onActive')){
    }
    else{
      document.querySelectorAll('.hotbarLink ').forEach(button =>{
        button.className = `hotbarLink`
      }
    )
      button.className = `hotbarLink onActive`
    }
    
  })
})

fetchData();

