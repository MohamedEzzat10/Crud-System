//get total
let title = document.querySelector("#title");
let price = document.querySelector("#price");
let taxes = document.querySelector("#taxes");
let ads = document.querySelector("#ads");
let discount = document.querySelector("#discount");
let count = document.querySelector("#count");
let category = document.querySelector("#category");
let totalPriceEle = document.querySelector(".total-count");
let creatBtn = document.querySelector(".creat .btn-creat");
let updatatBtn = document.querySelector(".creat .btn-updata");

let contantProduct = document.querySelector(" tbody");
let deletAll = document.querySelector(".delet-all");
title.focus();

// check local if includes product
let localProduct = JSON.parse(localStorage.getItem("product"));
if (localProduct !== null) {
  setupItems(localProduct);
}

ads.addEventListener("change", (e) => {
  totalPrice();
});
discount.addEventListener("change", () => {
  totalPrice();
});
ads.addEventListener("input", (e) => {
  totalPrice();
});
discount.addEventListener("input", () => {
  totalPrice();
});
price.addEventListener("change", () => {
  totalPrice();
});
price.addEventListener("input", (e) => {
  totalPrice();
});
taxes.addEventListener("change", () => {
  totalPrice();
});
taxes.addEventListener("input", (e) => {
  totalPrice();
});

function totalPrice() {
  if (
    price.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    price.value > 0
  ) {
    totalPriceEle.innerHTML = parseInt(
      +price.value + +taxes.value + +ads.value - +discount.value
    );
  }
}

function createProduct(item) {
  return `
    <tr>
    <td>${item.id}</td>
    <td>${truncateString(item.name, 7)}</td>
    <td>${nFormatter(+item.price, 2)}</td>
    <td>${nFormatter(+item.taxes, 2)}</td>
    <td>${nFormatter(+item.ads, 2)}</td>
    <td >${nFormatter(+item.discount, 2)}</td>
    <td>${nFormatter(+item.totalPrice, 2)}</td>
    <td>${nFormatter(+item.count, 2)}</td>
    <td>${truncateString(item.category, 7)}</td>
    <td ><button class="updata" id = "${item.id}" updata  >Updata</button></td>
    <td ><button class="delet"  id = "${item.id}"  delet >Delet</button></td>

</tr>
    
    
    `;
}
// format name
function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

// format Number
function nFormatter(num, digits) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

let product = JSON.parse(localStorage.getItem("product")) || [];
let id = +product.length;
if (product.length > 0) {
  deletAll.style.display = "block";
}

creatBtn.addEventListener("click", () => {
  add();
});
// window.addEventListener("keydown", (e) => {
//   if (e.keyCode === 13 && creatBtn.hasAttribute("create")) {
//     console.log("2321");
//     add();
//   }
// });

// add product
function add() {
  if (
    title.value != "" &&
    price.value != "" &&
    count.value != "" &&
    category.value != "" &&
    taxes.value != "" &&
    ads.value != "" &&
    +totalPriceEle.innerHTML > 0
  ) {
    if (product.length > 0) {
      for (let pro of product) {
       

        if (pro.name === title.value) {

          alert("The Name Of Product Already Same One Of Your Products");
          break;
        } else if (product.indexOf(pro) === product.length -1 ) {
          addAndTest();
          break;
        }
        
      }
    } else {
        addAndTest();
    }

  } else {
    alert("Plese Full Data Of product Or checked Your Total Price");
  }
}
function addAndTest() {
  deletAll.style.display = "block";

  id += 1;
  let item = {
    id: `${id}`,
    name: `${title.value}`,
    price: `${price.value}`,
    taxes: `${taxes.value}`,
    ads: `${ads.value}`,
    discount: `${discount.value}`,
    totalPrice: `${totalPriceEle.innerHTML}`,
    count: `${count.value}`,
    category: `${category.value}`,
  };
  product.push(item);

  setupItems(product);
  localStorage.setItem("product", JSON.stringify(product));
  removeInputValue();
  totalPriceEle.innerHTML = "";
}

// setup element in ui

function setupItems(product) {
  contantProduct.innerHTML = "";
  if (product.length > 0) {
    product.forEach((e) => {
      contantProduct.innerHTML += createProduct(e);
    });
  } else {
    // contantProduct.innerHTML = `<tr> No Product For You </tr>`
  }
}

// make input empty

let allInput = document.querySelectorAll("input");
function removeInputValue() {
  allInput.forEach((e) => {
    e.value = null;
  });
  title.focus();
}

// updata element
let idEle;
document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("updata")) {
    updatatBtn.style.display = "block";
    creatBtn.style.display = "none";
    idEle = e.target.getAttribute("id");
    product.forEach((ele) => {
      if (ele.id == idEle) {
        title.value = ele.name;
        price.value = ele.price;
        taxes.value = ele.taxes;
        ads.value = ele.ads;
        discount.value = ele.discount;
        count.value = ele.count;
        category.value = ele.category;
        totalPriceEle.innerHTML = ele.totalPrice;
      }
    });
  }
});

updatatBtn.addEventListener("click", () => {
  if (
    title.value != "" &&
    price.value != "" &&
    count.value != "" &&
    category.value != "" &&
    +totalPriceEle.innerHTML > 0
  ) {
    updatatBtn.style.display = "none";
    creatBtn.style.display = "block";
    product.forEach((ele) => {
      if (ele.id == idEle) {
        ele.name = title.value;
        ele.price = price.value;
        ele.taxes = taxes.value;
        ele.discount = discount.value;
        ele.count = count.value;
        ele.category = category.value;
        ele.totalPrice = totalPriceEle.innerHTML;
      }
    });
    localStorage.setItem("product", JSON.stringify(product));
    removeInputValue();

    setupItems(product);

    totalPriceEle.innerHTML = "";
  } else {
    alert("Plese Full Data Of product Or checked Your Total Price");
  }
});

// delet all product
deletAll.addEventListener("click", (e) => {
  product = [];
  localStorage.setItem("product", JSON.stringify(product));

  setupItems(product);
  deletAll.style.display = "none";
  id = product.length;
});

// delet item
document.addEventListener("click", (e) => {
  if (e.target.hasAttribute("delet")) {
    idEle = +e.target.getAttribute("id");
    console.log(typeof idEle);
    let productFilter = product.filter((e) => {
      return +e.id !== idEle;
    });

    console.log(productFilter);
    product = productFilter;

    product.forEach((e, index) => {
      e.id = index + 1;
    });
    setupItems(product);
    localStorage.setItem("product", JSON.stringify(product));
    if (product.length === 0) {
      deletAll.style.display = "none";
    }

    id = product.length;
    removeInputValue();
  }
});

// search

let searchInput = document.querySelector("#search");
let byCategoryele = document.querySelector(".by .category");
let byTitleEle = document.querySelector(".by .title");
byCategoryele.addEventListener("click", () => {
  searchInput.removeAttribute("title");
  searchInput.removeAttribute("placeholder");
  searchInput.setAttribute("placeholder", "Search By Category");
  searchInput.setAttribute("category", "");
});
byTitleEle.addEventListener("click", () => {
  searchInput.removeAttribute("category");
  searchInput.removeAttribute("placeholder");

  searchInput.setAttribute("placeholder", "Search By Title");
  searchInput.setAttribute("title", "");
});

searchInput.addEventListener("input", () => {
  if (searchInput.hasAttribute("title")) {
    byTitle(searchInput.value);
  } else if (searchInput.hasAttribute("category")) {
    byCategory(searchInput.value);
  }
});
function byCategory(keySearch) {
  let search = product.filter((e) => {
    return e.category.includes(`${keySearch}`);
  });

  setupItems(search);
}
function byTitle(keySearch) {
  let search = product.filter((e) => {
    return e.name.includes(`${keySearch}`);
  });

  setupItems(search);
}
