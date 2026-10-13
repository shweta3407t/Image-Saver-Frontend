let url;
//upload

let uploadBox = document.querySelector(".uploadBox");

const uploadForm = document.querySelector("#uploadForm");

let uploadImage = async (event) => {
  event.preventDefault(); 
  const formData = new FormData(uploadForm);

  url = "http://localhost:8080/api/image/upload";

  let response = await fetch(url, {
    method: "post",
    body: formData,
  });

  let data = await response.text();

  const responseParagraph = document.createElement("p");
  responseParagraph.textContent = data;

  uploadBox.append(responseParagraph);
};

uploadForm.addEventListener("submit", uploadImage);



//serach
 
let searchBox = document.querySelector(".searchBox");

const searchForm = document.querySelector("#searchForm");
 
let searchImage = async (event) => {

  event.preventDefault(); 

  const formData=new FormData(searchForm);

  const keyword =formData.get("keyword");

    url = "http://localhost:8080/api/image/search";

  response = await fetch(url);

  let data = await response.json();
  console.log(data )


  let arrayData =data.get("content");

  for(singleData of arrayData){
    singleData.get({
      "id" : id ,
            "title":  title,
            "tag": tag , 
            "category": category,
            "thumbnailUrl":  thumbnailUrl , 
            "description": description ,
            "createdAt": createdAt ,
            "updatedAt":  updatedAt 
    })
  }


  let currentPage = data.get("currentPage");
  let totalElements  = data.get("totalElement");
  let itemLimit = data.get("itemLimit");
  let totalPages = data.get("totalPages");
  let hasPrevious = data.get("hasPrevious");
  let hasNext =data.get("hasNext");

  

   

};

searchForm.addEventListener("submit", searchImage);

//{
//    "content": [ ..... ],
//     "currentPage": 0,
//   "totalElements": 22,
//      "itemLimit": 5,
//    "totalPages": 5,
//   "hasPrevious": false,
//     "hasNext": true
//}

