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
 

const keyword = document.querySelector("#keyword").value;

const hasPreviousBtn = document.querySelector("#prev-btn");
const hasNextBtn = document.querySelector("#next-btn");

const page = 0;

let currentPage = 1;
let totalPages = 0;
let itemLimit = 10;
let hasPrevious;
let hasNext;

let searchImage = async ( event ) => {
    
   if (event) event.preventDefault();

  url = `http://localhost:8080/api/image/search?keyword=${encodeURIComponent(keyword)}&page=${page}`;

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


const listContainer = document.createElement("ol");

  content.forEach((item) => {
    //content

    let li = document.createElement("li");

    li.textContent = item.id;
    listContainer.appendChild(li);

    li.textContent = item.title;
    listContainer.appendChild(li);

    li.textContent = item.tag;
    listContainer.appendChild(li);

    li.textContent = item.category;
    listContainer.appendChild(li);

    li.textContent = item.thumbnailUrl;
    listContainer.appendChild(li);

    li.textContent = item.updatedAt;
    listContainer.appendChild(li);

    li.textContent = item.createdAt;
    listContainer.appendChild(li);

    listContainer.appendChild(li);



    
    displayList(currentPage, totalPages, itemLimit);
     

    //other data
  });

  document.getElementById("prev-btn").dispatchEvent = currentPage === 1;

  document.getElementById("next-btn").disabled = currentPage === totalPages;
};

searchForm.addEventListener("submit", searchImage);

function displayList(currentPage, totalPages, maxVisiblePages = 10) {
  const pagenationData = getPage(currentPage, totalPages, maxVisiblePages);
  const pageNumbers = document.querySelector("#page-numbers");

  pageNumbers.innerHTML = "";

  pagenationData.pages.forEach((page) => {
    const btn = document.createElement("button");
    btn.innerText = page;

    btn.classList.toggle("active", page === currentPage);

    btn.addEventListener("click", () => {
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
