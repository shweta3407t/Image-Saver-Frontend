 const express = require('express');
const cors = require('cors');
const app = express();

 app.use(cors({ origin: 'http://localhost:3000' })); 





// let submitBtn = document.querySelector("#submitButton");
let uploadResponsePara = document.querySelector("#uploadResponse");

 
//upload
 

const form = document.querySelector("#form");

let url;

let uploadImage = async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  // const allData =Object.fromEntries(formData.entries());

const title = formData.get("title");
const description = formData.get("description");
const tag = formData.get("tag");
const category = formData.get("category");
const file = formData.get("file");

  url = "http://localhost:8080/api/image/upload";

  let response = await fetch(url, {
    method: "post",
    body: {
      "title" : title ,
      "description" : description ,
      "tag" : tag,
      "category" : category ,
      "file" : file 
    }
  });

  let data = await response.json();

  const responseParagraph = document.createElement("p");
  responseParagraph.textContent = data;

  uploadBox.append(newParagraph);
};

form.addEventListener("submit", uploadImage);













// let searchBtn = document.querySelector("#search");
// let searchResponse = document.querySelector("#searchResponse");

// let updateBtn = document.querySelector("#update");
// let updateResponse = document.querySelector("#updateResponse");

// let deleteBtn = document.querySelector("#delete");
// let deleteResponse = document.querySelector("#deleteResponse");


// //search  //all image search kabaki hai

// let searchImage = async () => {
//   url = "http://localhost:8080/api/image/search";

//   let searchResptext-align: center;onse = await fetch(url, get);

//   let searchdata = searchResponse.json();

//   let imageUrl; // get image like from searchData and send to dowmload endpoint

//   let imagereaponse= await fetch(imageUrl , get);

//   let imageData=imagereaponse.json();

//   searchResponse.innerText=imageData;

// };

// searchBtn.addEventListener("click", searchImage);

// //update

// let updateImage = async () => {
//   url = "http://localhost:8080/api/image/update";
//   let response = await fetch(url, put);

//   let data = await response.json();

//   updateResponse.innerText=data;
//  };
// updateBtn.addEventListener("click" , updateImage);

// //delete

// let deleteImage = async () => {
//   url = "http://localhost:8080/api/image/delete";
//   let response = await fetch(url, "delete");

//   let data = await response.json();

//   deleteResponse.innerText=data;
//  };
// deleteBtn.addEventListener("click" , deleteImage);
