import axios from "axios";

console.log("axios conect");

console.log(localStorage.getItem("token"));

console.log(localStorage.getItem("email"));

//const axios = require('axios');

const container = document.querySelector("#js-list-order");
const getOrgersQuery =
  localStorage.getItem("email") === "admin@gmail.com"
    ? "http://localhost:3003/order"
    : "http://localhost:3003/userOrders/" + localStorage.getItem("email");

axios
  .get(getOrgersQuery)
  .then((response) => {
    try {
      console.log("Отримана відповідь від сервера:");
      console.log(response.data); // Вивести отримані дані у консоль

      const itemNew = response.data
        .map((itemOrder) => {
          return `<li class="item-order">
      <div class="main-container">
          <div class="title-container">
              <div class="title-grup">
                  <h3 class="title-order text-order" >І'мя:</h3>
                  <p class="name-order text-order">${
                    itemOrder.user.fullName + " / " + itemOrder.fullName
                  }</p>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Електронна адреса:</h3>
                  <p class="email-order text-order" ></p>${
                    itemOrder.user.email
                  }</p>
              </div>
              <div class="title-grup">
                  <h3 class="title-order text-order">Телефон:</h3>
                  <p class="email-order text-order" ></p>${
                    itemOrder.user.tel
                  }</p>
              </div>
          </div>
          <div class="title-grup">
              <h3 class="title-order text-order">Комунікація:</h3>
              <p class="communication-order text-order">${
                itemOrder.communication
              }</p>
          </div>
          <div class="title-grup">
              <h3 class="title-order text-order">Опис замовлення:</h3>
              <p class="description-order text-order">${
                itemOrder.description
              }</p>
          </div>
          <div class="title-grup container-checkbox">
              <h3 class="title-order text-order">Замовлення виконано</h3>
              <input class="checkbox-order text-order" type="checkbox" >
          </div>
      </div>
  </li>`;
        })
        .join("");

      console.log(itemNew);

      if(itemNew != "")
      {
        container.innerHTML = itemNew;       
      }
      else{
        const listClear = `<li class="item-order">
        <div class="main-container">
            <div class="title-container">
                <div class="title-grup">
                    <h3 class="title-order text-order" >У вас немаэ замовлень!</h3>
                </div>            
            </div>         
        </div>
        </li>`;
        container.innerHTML = listClear;
      }
      

      
    } catch (err) {
      console.log(err);
    }
  })
  .catch((error) => {
    console.error("Сталася помилка під час виконання запиту:", error);
  });
