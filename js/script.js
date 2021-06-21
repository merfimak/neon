window.onload = function() {

//////////////////////////////////////////////////////////////////////бургер////////////////////////////////////////////////////////////////////
    const header__burger = document.querySelector('.header__burger');
    const menu__nav = document.querySelector('.menu__nav');
    const menu__link = document.querySelectorAll('.menu__link');
    header__burger.addEventListener('click', (event) => { 
      header__burger.classList.toggle('active');
      menu__nav.classList.toggle('active');
    })
    for (i = 0; i < menu__link.length; i++) {
      menu__link[i].addEventListener('click', (event) => { 
      header__burger.classList.toggle('active');
      menu__nav.classList.toggle('active');
    })
    }


    //////////////////////////////////////////////////////////////////////плавный скрол////////////////////////////////////////////////////////////////////
    document.querySelectorAll('._slow_scroll').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let arr= this.getAttribute('href').split('#');//достаем ссылку делим ее по #  
            let href = arr[arr.length - 1];//достаем последний элимент массива это и будет название нужного нам блока
            const scrollTarget = document.getElementById(href);
             const topOffset = document.querySelector('.menu').offsetHeight;//тут мы узнаем какой высоты у нас меню и пропишем ее в падинге у первого блока
           // const topOffset = 0; // если не нужен отступ сверху 
            const elementPosition = scrollTarget.getBoundingClientRect().top;//возвращает размер элемента и его позицию относительно viewport (часть страницы, показанная на экране, и которую мы видим).
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

//////////////////////////////////////////////////////////////////////Анимация при прокрутке////////////////////////////////////////////////////////////////////
const animItems = document.querySelectorAll('._anim_items');

if(animItems.length > 0){//проверяем есть ли они такие items и только тогад выполняем эту функцию
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(){
    for(let index = 0; index < animItems.length; index++){
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;// высота элемента с учётом вертикальных полей и границ в пикселях.
      const animItemOffset = offset(animItem).top;//позицию элемента относительно верха
      const animStart = 4;//коофициэнт начала анимации

      //момент когда нашему обьекту бедет даваться класс _active
      let animItemPoint = window.innerHeight - animItemHeight / animStart;//когда мы проскролим 1/4 часть нужного itema
      if(animItemHeight > window.innerHeight){//если анимурованый обьект выше окна браузера
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        animItem.classList.add('_active');
      }else{
        if(!animItem.classList.contains('_anim_no_hide')){//если добавить элементу _anim_no_hide то повторной анимации не будет
          animItem.classList.remove('_active');
        }
        
      }

    }
  }
  //функция offset спизжена из интернета она возвращает позицию элемента относительно верха или лева, например offset(el).top;
  function offset(el){
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  setTimeout(() =>{
    animOnScroll()//вызываем эту функцию и при скроле и изначально потому что нужный блок может быть уже должен быть отображонным на экране
  }, 300);
}

////////////////////////////////////////////////////////////////////попап////////////////////////////////////////////////////////////////////


 let popup_btn = document.querySelectorAll('._popup_btn');

 for(let i = 0; i < popup_btn.length; i++){
  

const popup = popup_btn[i]
const modal_body = document.querySelector('.modal_body_'+ popup_btn[i].dataset.popup)
const modal = document.querySelector('.modal_'+ popup_btn[i].dataset.popup)
const cross = document.querySelector('.cross_'+ popup_btn[i].dataset.popup)

   popup.addEventListener('click', (event) => {
            modal.classList.toggle("active");
            modal_body.classList.toggle("active");
          })

          cross.addEventListener('click', (event) => {
            modal_body.classList.remove("active");
            modal.classList.remove("active");
          }) 


}


////////////////////////////////////////////////////////////////////форма////////////////////////////////////////////////////////////////////
    const form = document.getElementById('form');
    const message = document.getElementById('message');
    let formReq = document.querySelectorAll('._req');
    form.addEventListener('submit', formSend); 



    async function formSend(e){
      e.preventDefault();
        let error = formValidate(form);// проверяем своим валидатором
        if(error === 0){
        message.className = 'message';//оставляем только класс message(на случай если посетитель уже совершал ошибку то там будет еще и _error, нам такое не недо)
        message.classList.add('_success');
        message.innerHTML = 'Заявка отправлена';
        for(let index = 0; index < formReq.length; index++){//удоляем все плейсхолдеры если в них были сообщения об ошибках
            const input = formReq[index];
            input.placeholder = '';
        }
        }else{
          message.classList.add('_false');
          message.innerHTML = 'Заполните все поля';
        }
    }



    function formValidate(form){
    let error = 0;// обнуляем все ошибки

    for(let index = 0; index < formReq.length; index++){
      const input = formReq[index];
      formRemoveError(input);

       if(input.classList.contains('_text')){
          if(input.value === ''){
            input.placeholder = 'это поле обязательно для заполнения';
             formAddError(input);
             error++;
          }
          if(input.value != '' && input.value.length < 2){
            input.value = '';
            input.placeholder = 'минимальное количество знаков больше 2';
             formAddError(input);
             error++;
          }
          if(input.value != '' && input.value.length > 50){
            input.value = '';
            input.placeholder = 'максимально количество знаков не больше 5';
             formAddError(input);
             error++;
          }
        }else if(input.getAttribute("type") ==="checkbox" && input.checked === false){
          formAddError(input);
          error++;
        }
    }
    return error;
    }

          function formAddError(input){
            
            input.parentElement.classList.add('_error');
            input.classList.add('_error');
          }

          function formRemoveError(input){
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
          }

////////////////////////////////////////////////////////////////////колькулятор ////////////////////////////////////////////////////////////////////

let vol = document.getElementById('cost_vol');// куда выводим сумму
const calculate_btn = document.querySelector('.calculate_btn')

  calculate_btn.addEventListener('click', (event) => {
            
    let inputs = document.getElementsByClassName('calc_input');
   let res = 0;
      for (i = 0; i < inputs.length; i++) {
        let price = inputs[i].dataset.price;
        let value = inputs[i].value;
        if(isNaN(value)){
          value = 0;
        }
        res += price * value;
      }
     vol.innerHTML = res;
})





////////////////////////////////////////////////////////////////////slider////////////////////////////////////////////////////////////////////

 let swiper = new Swiper(".portfolio_slider", {
        slidesPerView: 3,
        spaceBetween: 80,
        loop: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
        },
        mousewheel: false,
        keyboard: true,
        breakpoints: {
   
         320: {
            slidesPerView: 1,
            spaceBetweenSlides: 10
        },
        768: {
            slidesPerView: 2,
            spaceBetweenSlides: 20
        },
       
        999: {
            slidesPerView: 2,
            spaceBetweenSlides: 30
        },
        1200: {
            slidesPerView: 3,
            spaceBetweenSlides: 30
        },
       
        1420: {
            slidesPerView: 3,
            spaceBetweenSlides: 50
          }
    }
      });





}    