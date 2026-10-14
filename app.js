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

const keyword = document.querySelector("#keyword").value;

const hasPreviousBtn = document.querySelector("#prev-btn");
const hasNextBtn = document.querySelector("#next-btn");
 
const page = 0;

let searchImage = async (event) => {
  event.preventDefault();

  url = `http://localhost:8080/api/image/search?keyword=${encodeURIComponent(keyword)}&page=${page}`;

  const response = await fetch(url);

  let data = await response.json();
  console.log(data);

  const content = data.content;
  const currentPage = data.currentPage;
  const totalPages = data.totalPages;
  const totalElements = data.totalElements;
  const itemLimit = data.itemLimit;
  const hasPrevious = data.hasPrevious;
  const hasNext = data.hasNext;

  content.forEach( item  => {
    //content

    const li = document.createElement("li");
    li.textContent = item.id;
    li.textContent = item.title;
    li.textContent = item.tag;
    li.textContent = item.category;
    li.textContent = item.thumbnailUrl;
    li.textContent = item.updatedAt;
    li.textContent = item.createdAt;

    listContainer.appendChild(li);

    displayList(currentPage , totalPages , maxVisiblePages = 1);

    
    //other data
  });

  document.getElementById("prev-btn").dispatchEvent = currentPage === 1;

  document.getElementById("next-btn").disabled = currentPage === totalPages;
};

searchForm.addEventListener("submit", searchImage);


function displayList(currentPage , totalPages , maxVisiblePages =10){
 const pagenationData= getPage(currentPage , totalPages ,maxVisiblePages );
    const pageNumbers = document.querySelector("#page-numbers");
 
    pageNumbers.innerHTML="";

    pagenationData.pages.forEach( (page) => {
      const btn = document.createElement("button");
      btn.innerText = page;

       btn.classList.toggle('active', page === currentPage);
        
        btn.addEventListener('click', () => {
            currentPage = page;
            renderUI();
        });
        pageNumbers.appendChild(btn);
    });
}



//get search response page function
function getPage(currentPage, totalPages, maxVisiblePages = 10) {
  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 1;
    endPage = totalPages;
  } else { 
    let maxPageBeforeCurrentPage = Math.floor(maxVisiblePages) / 2;
    let maxPageAfterCurrentPage = Math.ceil(maxVisiblePages) / 2 - 1;

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
}

//pagination

hasPreviousBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;

    searchImage();
  }
});

hasNextBtn.addEventListener("click", () => {
  if (currentPage < 1) {
    currentPage++;

    searchImage();
  }
});
