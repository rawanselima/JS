let price = document.getElementById("price");
let tax = document.getElementById("tax");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total_p = document.getElementById("total");
let create = document.getElementById("create");
let title = document.getElementById("title");
let count = document.getElementById("count");
let category = document.getElementById("category");
let tbody = document.querySelector("tbody");
let search = document.getElementById("search");
let search_title = document.getElementById("searchtitle");
let search_category = document.getElementById("searchcategory");
let mood = "create";
let mood_search = "title";
let index;

total_p.innerHTML = `Total : `;

let total = function () {
  if (price.value != 0) {
    let result = +price.value + +tax.value + +ads.value - +discount.value;
    total_p.innerHTML = `Total : ${result}`;
    return result;
  } else {
    total_p.innerHTML = `Total : `;
  }
};

let amount_total = [];
let arr;

if (localStorage.product != null) {
  arr = JSON.parse(localStorage.product);
} else {
  arr = [];
}

let j = 0;

create.onclick = function () {
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    +count.value <= 100
  ) {
    for (let i = 0; i < total_p.innerHTML.length; i++) {
      if (!isNaN(parseInt(total_p.innerHTML[i]))) {
        amount_total[j] = total_p.innerHTML[i];
        j++;
      }
    }

    new_product = {
      title: title.value.toLowerCase(),
      price: price.value,
      tax: tax.value,
      ads: ads.value,
      discount: discount.value,
      category: category.value.toLowerCase(),
      count: count.value,
      total: amount_total.join(""),
    };

    amount_total = [];
    if (mood === "create") {
      if (+count.value > 1) {
        for (let i = 0; i < +count.value; i++) {
          arr.push(new_product);
        }
      } else arr.push(new_product);
    } else {
      arr[index] = new_product;
      count.style.display = "block";
      create.textContent = "Create";
    }
    localStorage.setItem("product", JSON.stringify(arr));

    read();
    clear();
  }
};

function clear() {
  title.value = "";
  price.value = "";
  tax.value = "";
  ads.value = "";
  discount.value = "";
  count.value = "";
  category.value = "";
  count.value = "";
  total_p.innerHTML = `Total : `;
}

function read() {
  let table = "";
  for (let i = 0; i < arr.length; i++) {
    table += `
    <tr>
    <td>${i + 1}</td>
    <td>${arr[i].title}</td>
    <td>${arr[i].price}</td>
    <td>${arr[i].ads}</td>
    <td>${arr[i].discount}</td>
    <td>${arr[i].total}</td>
    <td>${arr[i].category}</td>
    <td class="update"><button onclick=update_data(${i})>Update</button></td>
    <td class="delete"><button onclick=delete_data(${i})> Delete </button></td>
    </tr>
    `;
  }

  tbody.innerHTML = table;
}

read();

function delete_data(i) {
  arr.splice(i, 1);
  localStorage.setItem("product", JSON.stringify(arr));
  read();
}

function update_data(i) {
  title.value = arr[i].title;
  price.value = arr[i].price;
  ads.value = arr[i].ads;
  tax.value = arr[i].tax;
  discount.value = arr[i].discount;
  category.value = arr[i].category;
  total_p.innerHTML = `Total : ${arr[i].total}`;

  create.textContent = "Update";
  count.style.display = "none";
  mood = "update";
  index = i;

  scroll({
    top: 0,
    behavior: "smooth",
  });
}

search_title.onclick = function () {
  search.focus();
  search.placeholder = "Search By Title";

  search.onkeyup = function () {
    let table = " ";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].title.includes(search.value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td class="update"><button onclick=update_data(${i})>Update</button></td>
        <td class="delete"><button onclick=delete_data(${i})> Delete </button></td>
        </tr>
        `;
      }
      tbody.innerHTML = table;
    }
  };
};

search_category.onclick = function () {
  search.focus();
  search.placeholder = "Search By Category";

  search.onkeyup = function () {
    let table = " ";
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].category.includes(search.value.toLowerCase())) {
        table += `
        <tr>
        <td>${i + 1}</td>
        <td>${arr[i].title}</td>
        <td>${arr[i].price}</td>
        <td>${arr[i].ads}</td>
        <td>${arr[i].discount}</td>
        <td>${arr[i].total}</td>
        <td>${arr[i].category}</td>
        <td class="update"><button onclick=update_data(${i})>Update</button></td>
        <td class="delete"><button onclick=delete_data(${i})> Delete </button></td>
        </tr>
        `;
      }
      tbody.innerHTML = table;
    }
  };
};
