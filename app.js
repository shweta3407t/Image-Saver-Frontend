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

// uploadForm.addEventListener("submit", uploadImage);

//serach

const searchBox = document.querySelector(".searchBox");

const searchForm = document.querySelector("#searchForm");

const hasPreviousBtn = document.querySelector("#prev-btn");
const hasNextBtn = document.querySelector("#next-btn");

const page = 0;

let currentPage = 1;
let totalPages = 0;
let itemLimit = 10;
let hasPrevious;
let hasNext;

let li = document.createElement("li");

let thumbnailUrl;

let imageButton = document.createElement("button");

let searchImage = async (event) => {
    event.preventDefault();

  const keyword = document.querySelector("#keyword").value;

  url = `http://localhost:8080/api/image/search?keyword=${encodeURIComponent(keyword)}&page=${currentPage}`;

  const response = await fetch(url);

  let data = await response.json();
  console.log(data);

  const content = data.content;
  currentPage = data.currentPage;
  totalPages = data.totalPages;
  const totalElements = data.totalElements;
  itemLimit = data.itemLimit;
  hasPrevious = data.hasPrevious;
  hasNext = data.hasNext;

  const listContainer = document.getElementById("results-list");
  listContainer.innerHTML = "";

   

  content.forEach((item) => {


    //content

    li = document.createElement("li");
    imageButton = document.createElement("button");

    imageButton.textContent = "Title : " + item.title;
    li.appendChild(imageButton);

    imageButton.addEventListener("click" , displayImage);

    const id = document.createElement("li");
    id.textContent = "Id : " + item.id;
    li.appendChild(id);

    const description = document.createElement("li");
    description.textContent = "Description : " + item.description;
    li.appendChild(description);

    const tag = document.createElement("li");
    tag.textContent = "Tag : " + item.tag;
    li.appendChild(tag);

    const category = document.createElement("li");
    category.textContent = "Categpry : " + item.category;
    li.appendChild(category);

    thumbnailUrl = item.thumbnailUrl;

    const createdAt = document.createElement("li");
    createdAt.textContent = "CreatedAt : " + item.createdAt;
    li.appendChild(createdAt);

    const updatedAt = document.createElement("li");
    updatedAt.textContent = "UpdatedAt : " + item.updatedAt;
    li.appendChild(updatedAt);

    listContainer.appendChild(li);



  });

  // displayList(currentPage, totalPages, itemLimit);

   
  hasPrevious.dispatchEvent = currentPage === 1;
   hasNext.disabled = currentPage === totalPages;

    
};




const imageDiv=document.querySelector(".imageDiv");

imageDiv.classList.add("hide");

 

let displayImage = async () => {

  let url = `http://localhost:8080/api/image/download/${encodeURIComponent(thumbnailUrl)}`;

  const response = await fetch(url);

  const blobImage = await response.blob();
  const localUrl = URL.createObjectURL(blobImage);

     const imgElement = document.getElementById('myImage');
    imgElement.src = localUrl;

    imageDiv.classList.remove("hide");


  
};

imageButton.addEventListener("click", displayImage);


 
searchForm.addEventListener("submit", (event)=>{
  currentPage-1;
  searchImage(event);
});



function displayList(currentPage, totalPages, maxVisiblePages = 10) {
  console.log("displayList  call");
  const pagenationData = getPage(currentPage, totalPages, maxVisiblePages);
  const pageNumbers = document.getElementById("page-numbers");

  pageNumbers.innerHTML ="";

  pagenationData.pages.forEach((page) => {
    const btn = document.createElement("button");
    btn.innerText = page;

    btn.classList.toggle("active", page === currentPage);

    btn.addEventListener("click", () => {
      currentPage = page;
      searchImage(currentPage);
    });
    pageNumbers.appendChild(btn);
  });

  hasPreviousBtn.dispatchEvent = !hasPrevious;
  hasNextBtn.disabled = !hasNext;



  console.log("display exit");
 
}

//get search response page function
function getPage(currentPage, totalPages, maxVisiblePages = 10) {
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else {
    let maxPageBeforeCurrentPage = Math.floor(maxVisiblePages / 2);
    let maxPageAfterCurrentPage = Math.ceil(maxVisiblePages / 2) - 1;

    if (currentPage <= maxPageBeforeCurrentPage) {
      startPage = 1;
      endPage = maxVisiblePages;
    } else if (currentPage + maxPageAfterCurrentPage >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - maxPageBeforeCurrentPage;
      endPage = currentPage + maxPageAfterCurrentPage;
    }
  }

  const pages = Array.from(
    { length: endPage + 1 - startPage },
    (_, i) => startPage + i,
  );

  return {
    currentPage,
    totalPages,
    startPage,
    endPage,
    pages,
  };
}

//pagination

hasPreviousBtn.addEventListener("click", () => {
  console.log("previous call");
  if (currentPage > 1) {
    currentPage--;
     displayList(currentPage , totalPages , 10 );
   }

});

hasNextBtn.addEventListener("click", () => {
  console.log("next call");
  if (currentPage < totalPages) {
    currentPage++;
         displayList(currentPage , totalPages , 10 );

    
  }

  
});


