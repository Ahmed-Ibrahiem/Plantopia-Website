// [1] Get Product Data From Plant Json File
function get_data_products() {
  return fetch("plants.json")
    .then((res) => res.json())
    .catch(Error("Can Not Found The Data"));
}

// [2] Create Product Element From Data Product
function create_pro_element(data_pro) {
  let html = `
        <div class="product display_f gap_20 product_cover data-id="${data_pro.id}"">
            <div class="img_box"><img src="${data_pro.img}" alt=""></div>
            <h2 class="title">${data_pro.title}</h2>
            <p class="details">${data_pro.details}</p>
            <div class="cart_nav dis_align_center gap_30">
                <p>RS <span>${data_pro.price}</span>/-</p>
                <button class="prodcut_cart_btn" data-id="${data_pro.id}">
                    <i class="fa-solid fa-cart-shopping"></i>
                </button>
            </div>
        </div>
    `;
  return html;
}

// [3] UI Products Cards
async function UI_cards() {
  const products_data = await get_data_products();
  let products_container = document.querySelector(".products");
  products_container.innerHTML = ``;
  products_data.forEach((data_pro) => {
    products_container.innerHTML += create_pro_element(data_pro);
  });

  return Array.from(products_container.children);
}
UI_cards();

const see_all_btn = document.getElementById("see_all");

// [4] View Just 6 Products Cards
async function display_products() {
  see_all_btn.classList.remove("all_pro");
  see_all_btn.innerText = "See All";
  let all_products = await UI_cards();
  all_products.forEach((pro) => pro.classList.remove("view_pro"));
  for (let x = 0; x < 6; x++) {
    all_products[x].classList.add("view_pro");
  }
}
display_products();

// [5] View All Products Cards When User Press On See More
async function view_all_products() {
  see_all_btn.classList.add("all_pro");
  see_all_btn.innerText = "See Less";
  const all_products = await UI_cards();
  all_products.forEach((pro) => pro.classList.add("view_pro"));
}

// Adjust Clickable see all button
see_all_btn.addEventListener("click", () => {
  if (see_all_btn.classList.contains("all_pro")) {
    display_products();
  } else {
    view_all_products();
  }
});

// Add Event Listener For Right And Left Buttons

const images_slider = document.querySelector(".images_slider");
const all_btns = document.querySelectorAll(".part_three .nav_btns button");

async function setUpImageProducts() {
  const all_data = await get_data_products();
  all_data.forEach((data) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    div.classList.add("img_box");
    img.src = data.img;

    div.appendChild(img);
    images_slider.appendChild(div);
  });
  return all_data;
}
setUpImageProducts()
.then((all_data) => {
  const sliderChildren = [...images_slider.children];
  // insert A few first cards in beggin the slider
  images_slider.insertAdjacentHTML('afterbegin' , sliderChildren[sliderChildren.length - 1].outerHTML);
  images_slider.insertAdjacentHTML('beforeend' , sliderChildren[0].outerHTML);
});
let isDragging = false,
  startX,
  startScrollPoint;

let drag_Start = (e) => {
  isDragging = true;
  startX = e.pageX;
  startScrollPoint = images_slider.scrollLeft;
  images_slider.classList.add("isDragging");
};

let dragging = (e) => {
  if (!isDragging) return;
  images_slider.scrollLeft = startScrollPoint - (e.pageX - startX);
};

let drag_end = (e) => {
  isDragging = false;
  images_slider.classList.remove("isDragging");
};


const infinity = ()=>{
  if(images_slider.scrollLeft === 0){
    images_slider.classList.add("not-transition");
    images_slider.scrollLeft =  images_slider.scrollWidth - 2 * images_slider.offsetWidth;
    images_slider.classList.remove("not-transition");
  }else if(Math.ceil(images_slider.scrollLeft) ===
              images_slider.scrollWidth - images_slider.offsetWidth + 1 ||
            Math.ceil(images_slider.scrollLeft) ===
              images_slider.scrollWidth - images_slider.offsetWidth ||
            Math.ceil(images_slider.scrollLeft) ===
              images_slider.scrollWidth - images_slider.offsetWidth - 1 ){
    images_slider.classList.add("not-transition");
    images_slider.scrollLeft = images_slider.offsetWidth;
    images_slider.classList.remove("not-transition");
  }
}


images_slider.addEventListener("mousedown", drag_Start);
images_slider.addEventListener("mousemove", dragging);
images_slider.addEventListener("mouseup", drag_end);
images_slider.addEventListener("mouseleave", drag_end);
images_slider.addEventListener("scroll", infinity);

// Start Adjust Scrolling By Buttons

all_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const firstCardWidht = images_slider.querySelector(".img_box").offsetWidth;
    images_slider.scrollLeft += 
      btn.dataset.btn_type == "previos" ? -firstCardWidht : firstCardWidht;
  });
});



// Adjust Reviews Cards 
const reviews_slider = document.querySelector('.reviews')


