const productsBtns = document.querySelectorAll('.wrapper__list-btn');
const basketBtn = document.querySelector('.wrapper__navbar-btn');
const basketModal = document.querySelector('.wrapper__navbar-basket');
const closeBasketModal = document.querySelector('.wrapper__navbar-close');
const basketCheckList = document.querySelector('.wrapper__navbar-checklist');
const totalPriceBasket = document.querySelector('.wrapper__navbar-totalprice');
const basketBtnCount = document.querySelector('.warapper__navbar-count');
const btnCard = document.querySelector('.wrapper__navbar-bottom');
const closeMenu = document.querySelector('.close__menu');

basketBtn.addEventListener('click', function () { // navbar 
    basketModal.classList.toggle('active');
});

closeBasketModal.addEventListener('click', function () { // close tag for menu
    basketModal.classList.remove('active');
});

closeMenu.addEventListener('click', function () { // close tag in any random place
    basketModal.classList.remove('active');
});

const products = { // the array of products (includes some info)
    crazy: {
        name: 'Crazy',
        price: 31000,
        img: "images/products/burger-1.png",
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        }
    },
    light: {
        name: 'Light',
        price: 26000,
        img: "images/products/burger-2.png",
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        }
    },
    cheeseburger: {
        name: 'Cheeseburger',
        price: 26000,
        img: "images/products/burger-3.png",
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        }
    },
    dburger: {
        name: 'dBurger',
        price: 24000,
        img: "images/products/burger-4.png",
        amount: 0,
        get totalSum() {
            return this.amount * this.price;
        }
    },
};

productsBtns.forEach((btn) => { // goes through each button (under each burger section)
    btn.addEventListener('click', function () {
        plusOrMinus(btn); // calling the function for (+-) amount, function below
    });
});

function plusOrMinus(btn) { // function for the 'amount' process
    let parent = btn.closest('.wrapper__list-card');
    let parentId = parent.getAttribute('id');
    products[parentId].amount++;

    basket();
};

function basket() {
    const productsArray = [];

    for (const key in products) {
        let totalCount = 0; 

        const pr = products[key];
        const productCard = document.querySelector(`#${pr.name.toLowerCase()}`);
        const parentIndicator = productCard.querySelector('.wrapper__list-count');

        if (pr.amount) {
            productsArray.push(pr);
            basketBtnCount.classList.add('active');
            totalCount += pr.amount;
            parentIndicator.classList.add('active');
            parentIndicator.innerHTML = pr.amount;
        } else {
            parentIndicator.classList.remove('active');
            parentIndicator.innerHTML = 0;
        }

        basketBtnCount.innerHTML = totalCount; // shows the total num of burgers over the basket btn

    }
    
    basketCheckList.innerHTML = '';
    for (let i = 0; i < productsArray.length; i++) {
        basketCheckList.innerHTML += cardItemBurger(productsArray[i]);
    }
    basketBtnCount.innerHTML = productTotalCount(); // showing total count
    totalPriceBasket.innerHTML = productsTotalSum(); // showing total sum
};

function cardItemBurger(productData) { // generating html template 
    const {name, totalSum: price, amount, img} = productData;
    const className = 'wrapper__navbar-';
    return `
        <div class="${className}product">
            <div class="${className}info">
                <img class="${className}productImage" src="${img}" alt="">
                
                <div class="${className}infoSub">
                    <p class="${className}infoName">${name}</p>
                    <p class="${className}infoPrice">${price}</p>
                </div>
            </div>
            
            <div class="${className}option" id="${name.toLowerCase()}_card">
                <button class="${className}symbol fa-minus" data-symbol="-">-</button>
                <output class="${className}count">${amount}</output>
                <button class="${className}symbol fa-plus" data-symbol="+">+</button>
            </div>
            
        </div>
    `;
}

function productTotalCount() { // total amount
    let count = 0;
    for(const key in products){
        count += products[key].amount;
    };
    
    return count;
};

function productsTotalSum(){ // total sum
    let count = 0;
    for( const key in products){
        count += products[key].totalSum;
    };
    
    return count; 
};

window.addEventListener('click', e => { // window - object
    const btn = e.target; // storing the 'target' in btn
    
    if(btn.classList.contains('wrapper__navbar-symbol')){ // check if contains
        const attr = btn.getAttribute('data-symbol');
        const parent = btn.closest('.wrapper__navbar-option');
        
        if(parent) {
            const parentId = parent.getAttribute('id').split('_')[0];
            
            if(attr == '-'){
                products[parentId].amount--;
            } else if (attr == '+'){
                products[parentId].amount++;
            }
            
            basket();
        }
    }
});