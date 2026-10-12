let uploadBtn = document.querySelector("#upload");
let uploadResponse = document.querySelector("#uploadResponse");

let searchBtn = document.querySelector("#search");
let searchResponse = document.querySelector("#searchResponse");

let updateBtn = document.querySelector("#update");
let updateResponse = document.querySelector("#updateResponse");


let deleteBtn = document.querySelector("#delete");
let deleteResponse = document.querySelector("#deleteResponse");


//upload
let url;

let uploadImage = async () => {
  url = "http://localhost:8080/api/image/upload";

//   const data = { 
//   username: "exampleUser", 
//   email: "user@example.com" 
// };





  let response = await fetch(url, {
    method:"post" 
  });

  let data = await response.json();

  uploadResponse.innerText=data;
  console.log(data);
};

 
uploadBtn.addEventListener("click", uploadImage);


let formData=document.querySelector("#form");
formData.









// //search  //all image search kabaki hai

// let searchImage = async () => {
//   url = "http://localhost:8080/api/image/search";

//   let searchResponse = await fetch(url, get);

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




 
