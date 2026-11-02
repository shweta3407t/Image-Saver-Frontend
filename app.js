// ==================== UPLOAD SEARCH ====================
let uploadBox = document.querySelector(".uploadBox");

const uploadForm = document.querySelector("#uploadForm");

let uploadImage = async (event) => {
  event.preventDefault();
  const formData = new FormData(uploadForm);

  let url = "http://localhost:8080/api/image/upload";

  let response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  let data = await response.text();

  const responseParagraph = document.createElement("p");
  responseParagraph.textContent = data;

  uploadBox.append(responseParagraph);
};

uploadForm.addEventListener("submit", uploadImage);

// ==================== IMAGE SEARCH ====================

const searchBox = document.querySelector(".searchBox");

const searchForm = document.querySelector("#searchForm");

const hasPreviousBtn = document.querySelector("#prev-btn");
const hasNextBtn = document.querySelector("#next-btn");

const page = 0;

let currentPage;
let totalPages;
const size = 4;
let hasPrevious = false;
let hasNext = false;

let li = document.createElement("li");

const listContainer = document.getElementById("results-list");

const singleImageDataList = document.createElement("ol");

async function searchImage(currentPage) {
  // event.preventDefault();

  listContainer.innerHTML = "";
  singleImageDataList.innerHTML = "";

  const keyword = document.querySelector("#keyword").value;

  let url;
  if (keyword) {
    url = `http://localhost:8080/api/image/search/keyword?keyword=${encodeURIComponent(keyword)}&page=${currentPage}&size=${size}`;
  } else {
    url = `http://localhost:8080/api/image/search?page=${currentPage}&size=${size}`;
  }

  console.log("Requesting page:", currentPage);
  console.log("Request URL:", url);

  const response = await fetch(url);

  let data = await response.json();
  console.log(data);

  const content = data.content;

  // currentPage = Number(data.currentPage);
  totalPages = Number(data.totalPages);

  hasPrevious = Boolean(data.hasPrevious);
  hasNext = Boolean(data.hasNext);

  content.forEach((item) => {
    //content

    li = document.createElement("li");

    //title button

    const imageButton = document.createElement("button");
    imageButton.textContent = "Title(Click to see image ) : " + item.title;
    li.appendChild(imageButton);

    //download button
    const downloadButton = document.createElement("button");
    downloadButton.textContent = "download Image";
    li.appendChild(downloadButton);

    //id
    const id = document.createElement("li");
    id.textContent = "Id : " + item.id;
    li.appendChild(id);

    //tag
    const tag = document.createElement("li");
    tag.textContent = "Tag : " + item.tag;
    li.appendChild(tag);

    //category
    const category = document.createElement("li");
    category.textContent = "Categpry : " + item.category;
    li.appendChild(category);

    //description
    const description = document.createElement("li");
    description.textContent = "Description : " + item.description;
    li.appendChild(description);

    //thummbnail
    const thumbnailUrl = item.thumbnailUrl;

    const thumbnail = document.createElement("li");
    thumbnail.textContent = "thumbnailUrl : " + thumbnailUrl;
    li.appendChild(thumbnail);

    //originalurl

    const originalUrl = item.originalUrl;
    const original = document.createElement("li");
    original.textContent = "originalUrl : " + originalUrl;
    li.appendChild(original);

    //create
    const createdAt = document.createElement("li");
    createdAt.textContent = "CreatedAt : " + item.createdAt;
    li.appendChild(createdAt);

    //update
    const updatedAt = document.createElement("li");
    updatedAt.textContent = "UpdatedAt : " + item.updatedAt;
    li.appendChild(updatedAt);

    singleImageDataList.appendChild(li);

    // show thumbnail image

    const imageItem = document.createElement("li");
    imageItem.classList.add("image-item");
    li.prepend(imageItem);

    // singleImageDataList.appendChild(imageItem);

    let imageVisible = false;
    let objectUrl = null;

    //async function for show thumbnail image
    imageButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (imageVisible) {
        imageItem.innerHTML = "";
        imageVisible = false;

        if (objectUrl) {
          URL.revokeObjectURL(objectUrl);
          objectUrl = null;
        }
        return;
      }

      
      imageItem.textContent = "loading image...";

      const img = document.createElement("img");
      img.alt = item.title || "Image";
      img.classList.add("image");
      img.src = thumbnailUrl;

      img.style.maxWidth = "300px";
      img.style.display = "center";

      imageItem.innerHTML = "";
      imageItem.appendChild(img);
      imageVisible = true;
    });

    // download image

    const downloadItem = document.createElement("li");
    downloadItem.classList.add("download-item");

    singleImageDataList.appendChild(downloadItem);

   
    //Async function for dowmload original image
    downloadButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const response = await fetch(originalUrl);

      const blobImage = await response.blob();
      if (blobImage) {
        URL.revokeObjectURL(objectUrl);
      }
      
      objectUrl = URL.createObjectURL(blobImage);


      const fileName = originalUrl.substring(originalUrl.lastIndexOf("/") + 1);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(objectUrl);
    }  );
  });

  listContainer.appendChild(singleImageDataList);

  displayList(currentPage, totalPages, 10);

  hasPreviousBtn.disabled = currentPage === 0;
  hasNextBtn.disabled = currentPage >= totalPages - 1;
}

// ==================== SEARCH FORM LISTENER ====================

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  currentPage = 0;
  searchImage(currentPage);
});
// ==================== PAGINATION DISPLAY ====================

function displayList(currentPage, totalPages, maxVisiblePages = 10) {
  const pageNumbers = document.getElementById("page-numbers");
  pageNumbers.innerHTML = "";

  // Disable buttons based on the current page
  hasPreviousBtn.disabled = currentPage === 0;
  hasNextBtn.disabled = currentPage >= totalPages - 1;

  if (totalPages <= 0) return;

  const pagenationData = getPage(currentPage, totalPages, maxVisiblePages);

  pagenationData.pages.forEach((page) => {
    const btn = document.createElement("button");

    btn.textContent = page + 1;
    btn.type = "button";
    btn.classList.toggle("active", page === currentPage);

    btn.addEventListener("click", () => {
      currentPage = page;
      searchImage(currentPage);
    });
    pageNumbers.appendChild(btn);
  });
}

//get search response page function
function getPage(currentPage, totalPages, maxVisiblePages = 10) {
  if (totalPages <= 0) {
    return {
      currentPage,
      totalPages,
      startPage: 0,
      endPage: -1,
      pages: [],
    };
  }

  let startPage, endPage;

  if (totalPages <= maxVisiblePages) {
    startPage = 0;
    endPage = totalPages - 1;
  } else {
    let maxPageBeforeCurrentPage = Math.floor(maxVisiblePages / 2);
    let maxPageAfterCurrentPage = Math.ceil(maxVisiblePages / 2) - 1;

    if (currentPage <= maxPageBeforeCurrentPage) {
      startPage = 0;
      endPage = maxVisiblePages - 1;
    } else if (currentPage + maxPageAfterCurrentPage >= totalPages - 1) {
      startPage = totalPages - maxVisiblePages;
      endPage = totalPages - 1;
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
  if (currentPage > 0) {
    currentPage--;
    searchImage(currentPage);
  }
});

hasNextBtn.addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    searchImage(currentPage);
  }
});

// ==================== DELETE IMAGE ====================

const deleteBox = document.querySelector(".deleteBox");
const deleteForm = document.querySelector("#deleteForm");

let deleteButton = document.querySelector("#delete");

async function deleteImage(event) {
  event.preventDefault();

  const id = deleteButton.value;

  console.log("id = " + id);

  if (!id) {
    let message = document.createElement("p");

    message.textContent = "Please enter image id to delete ! ";
    deleteBox.append(message);

    return;
  }

  const url = `http://localhost:8080/api/image/delete?id=${encodeURIComponent(id)}`;

  let response = await fetch(url, {
    method: "DELETE",
  });

  let data = await response.text();

  const responseParagraph = document.createElement("p");

  responseParagraph.textContent = data;

  deleteBox.append(responseParagraph);
}

deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  deleteImage(event);
});

// ==================== UPDATE SEARCH ====================

const updateBox = document.querySelector(".updateBox");
const updateForm = document.querySelector("#updateForm");

// const id = document.querySelector("#id").value;

async function updateImage(event) {
  event.preventDefault();

  const formData = new FormData(updateForm);

  const id = document.querySelector("#updateId").value;
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const tag = document.querySelector("#tag").value;
  const category = document.querySelector("#category").value;

  const url = `http://localhost:8080/api/image/update?id=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&tag=${encodeURIComponent(tag)}&category=${encodeURIComponent(category)}`;
  let response = await fetch(url, {
    method: "put",
    body: formData,
  });

  let data = await response.text();

  const responseParagraph = document.createElement("p");
  responseParagraph.textContent = data;

  updateBox.append(responseParagraph);
}

updateForm.addEventListener("submit", updateImage);
