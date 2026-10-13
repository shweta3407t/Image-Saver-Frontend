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

  //TODO: search by keyword remaiining

    url = "http://localhost:8080/api/image/search";

  response = await fetch(url);

  let data = await response.json();
  console.log(data )


   

  const { content, currentPage, totalPages,
    totalElements , itemLimit , hasPrevious , hasNext } = data;

  // console.log("arrayData" + arrayData);

    content.forEach((item) => {

      console.log(item);
      const li = document.createElement('li');
      li.textContent = item. ; // Use item directly if your list is just strings
      listContainer.appendChild(li);
    });

    // if (Array.isArray(dataArray)) {
    //   dataArray.forEach(item => {
    //     console.log(item); // Process each item in the array
    //   });
    // } else {
    //   console.error('Expected an array but received:', typeof dataArray);
    // }

  for(singleData of arrayData){

    console.log(singleData);

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

