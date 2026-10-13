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

const searchBox = document.querySelector(".searchBox");

const searchForm = document.querySelector("#searchForm");

const listContainer = document.createElement("ol");

const searchInput = document.querySelector("#keyword");


const hasPreviousBtn = document.querySelector("#prev-btn");
const hasNextBtn = document.querySelector("#next-btn");
const pageNumbers = document.querySelector("#page-numbers");

const keyword = searchInput.value;
const page = 1;

let searchImage = async (event) => {
  event.preventDefault();

  url = `http://localhost:8080/api/image/searchkeyword=${encodeURIComponent(keyword)}&page=${page}`;

  const response = await fetch(url);

  let data = await response.json();
  console.log(data);

  const {
    content,
    currentPage,
    totalPages,
    totalElements,
    itemLimit,
     hasPrevious,
    hasNext,
  } = data;

  content.forEach((item) => {
    //content
    const id = item.id;

    const title = item.title;
    const description = item.description;
    const tag = item.tag;
    const category = item.category;
    const thumbnailUrl = item.thumbnailUrl;
    const updatedAt = item.updatedAt;
    const createdAt = item.createdAt;

    const li = document.createElement("li");
    li.textContent = li.item;

    listContainer.appendChild(li);

    //other data


 document.getElementById('prev-btn').dispatchEvent = currentPage === 1;

    document.getElementById('next-btn').disabled = currentPage === totalPages;

  });
};
searchForm.addEventListener("submit", searchImage);



  //pagination

 
 

hasPreviousBtn.addEventListener("click" , ()=>{
  if( currentPage > 1){
    currentPage--;

    searchImage();

  }

})

hasNextBtn.addEventListener("click" , ()=>{
  if( currentPage < 1){
    currentPage++;

    searchImage();

  }
  });

 