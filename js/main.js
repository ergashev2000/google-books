async function getData(
  search = "python",
  order = "",
  maxResult = "9",
  pageIndex = "1"
) {
  let startIndexNum = pageIndex * 9;
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}${order}&maxResults=${maxResult}&startIndex=${startIndexNum}`
    );

    let result = await res.json();

    if (result.items === undefined) {
      alert("Bunday kitob yo'q")
      $(".resultNumbers").textContent = "0";
    }else{
      dataRender(result.items);
      moreInfo(result.items);
      addBookmark(result.items);
      $(".resultNumbers").textContent = result.totalItems;
      return result.items;
    }

}
getData()



// Get history orders by load =============
window.addEventListener("load", () => {
  let b = localStorage.getItem("bookmarkId");
  $(".bookmarks__items").innerHTML = b;
})
// ========================================


// PAGINATE=================================
function paginate2(totalItemsNum) {

  if (totalItemsNum <= 5) { 
    for (let i = 1; i < totalItemsNum; i++) {
      const li = createElement("li", "pag", i);
      $(".pagination").appendChild(li);
    }
  } else {
    for (let i = 0; i < 4; i++) {
      const li = createElement("li", "pag", i + 1);
      $(".pagination").appendChild(li);
    }

    let a = 0,
      b = 4;

    $(".next").addEventListener("click", () => {
      a += 1;
      b += 1;
      $(".pagination").innerHTML = " ";
      for (let i = a; i < b; i++) {
        const li = createElement("li", "pag", i + 1);
        $(".pagination").appendChild(li);
      }
      $(".prev").style.backgroundColor = "white";
    });

    $(".prev").style.backgroundColor = "gray";
    $(".prev").addEventListener("click", (e) => {

      if (a != 0) {
        a -= 1;
        b -= 1;
        $(".pagination").innerHTML = " ";

        for (let i = a; i < b; i++) {
          const li = createElement("li", "pag", i + 1);
          $(".pagination").appendChild(li);
        }
        $(".prev").style.backgroundColor = "white";
      } else {
        $(".prev").style.backgroundColor = "gray";
      }
    });


    $(".pagination").addEventListener("click", (e) => {
      if (e.target.className == "pag") {
        a > 1
          ? ($(".prev").style.backgroundColor = "white")
          : ($(".prev").style.backgroundColor = "gray");
        $(".pagination").innerHTML = " ";


        a = e.target.textContent == 1 || e.target.textContent < 1
            ? 0
            : Number(e.target.textContent) - 2;

        b = e.target.textContent == 1 || e.target.textContent < 1
            ? 4
            : Number(e.target.textContent) + 2;

            for (let i = a; i < b; i++) {
              const li = createElement("li", `${i+1 == e.target.textContent ? "pag act" : "pag"}`, i + 1);
              $(".pagination").appendChild(li);
            }
            
            $(".cards").innerHTML = " ";
          let search33 = localStorage.getItem("searchValue");

          if (search33 == null) {
            getData("python" , " ", 9, e.target.textContent)
          }else{
              localStorage.setItem("number" , e.target.textContent)
              searchFun()
          }
      }
    });

  }
}

paginate2(99);



// SEARCH
function searchFun() {
  let searchVall = localStorage.getItem("searchValue");
  let ss = localStorage.getItem("number");
  getData(searchVall, " ", 9, ss);
}






function searchBook(){
  
  $(".search__btn").addEventListener("click", () => {
    localStorage.setItem("searchValue", $("#search").value);
    $(".cards").innerHTML = " ";
    $(".pagination").innerHTML = " ";
    paginate2(99);
    searchFun()

  })
}
searchBook()



//////////////////////////////////
// NEWEST ORDER
$(".newest").addEventListener("click", (e) => {
    $(".cards").innerHTML = " ";
    let searchValLast = localStorage.getItem("searchValue");
    getData(searchValLast, "&orderBy=newest", 9, 1);
})

//////////////////////////////////



// RENDER DATA
function dataRender(dataRen) {
  dataRen.forEach((item) => {
    const tr = createElement(
      "div",
      "card",
      `
              <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="">
              <div class="card__text">
                  <h3>${item.volumeInfo.title}</h3>
                  <p>
                  ${item.volumeInfo.authors}
                  </p>
                  <span>${item.volumeInfo.publishedDate}</span>
                  <div class="card__btn">
                      <div class="top__btn">
                          <div class="bookmark__btn" data-id=${item.id}>Bookmark</div>
                          <div class="bookmark__info" data-id=${item.id}>More Info</div>
                      </div>
                          <a href="${item.volumeInfo.previewLink}" class="bookmark__read" target="_blank"> Read</a>
                      </div>
                  </div>
              `
    );
    $(".cards").appendChild(tr);
  });
}


// More info
function moreInfo(getMoreInfo){
  $(".cards").addEventListener("click", (e) => {
    if (e.target.textContent == "More Info") {
      $(".modal").classList.remove("close");
      $("body").style.overflowY = "hidden"
      $(".modal").classList.add("modal__mask")

      let getId = e.target.getAttribute("data-id");

      getMoreInfo.forEach((el) => {
        if (el.id == getId) {
          
          let modal = createElement("div", "box__modal", 
          `
            <div class="modal__header">
                <h3 class="modal__title">${el.volumeInfo.title}</h3>
                <img src="./images/close.svg" class="xmark">
            </div>
            <img src="${el.volumeInfo.imageLinks.thumbnail}" alt="">
            <p class="modal__description">
                ${el.volumeInfo.description}
            </p>
            <ul class="modal__items">
                <li class="modal__item">Author : <span class="name__author">${el.volumeInfo.authors}</span></li>
                <li class="modal__item">Published :<span class="year">${el.volumeInfo.publishedDate}</span></li>
                <li class="modal__item">Publishers:<span class="publishers">${el.volumeInfo.publisher}</span></li>
                <li class="modal__item">Categories:<span class="categories:">${el.volumeInfo.categories}</span></li>
                <li class="modal__item">Pages Count:<span class="page__count">${el.volumeInfo.pageCount}</span></li>

            </ul>
            <a href="${el.volumeInfo.previewLink}" class="more-btn__modal" target="_blank"> 
              Read
            </a>
          `);
          $(".modal").appendChild(modal);
        }
      });
    }
  })
}




// Add Bookmark

function addBookmark(getBookmark) {

  $(".cards").addEventListener("click", (e) => {

    if (e.target.textContent == "Bookmark") {
     
        getBookmark.forEach((el) => {

          if (el.id == e.target.getAttribute("data-id")) {

            let a = $(".bookmarks__items").innerHTML;
            localStorage.setItem("bookmarkId", a);

            let addBook = createElement("li", "bookmarks__item", 
            `
                            <div class="bookmarks__text">
                                <h3>${el.volumeInfo.title}</h3>
                                <p>
                                    ${el.volumeInfo.authors}
                                </p>
                            </div>
                            <div class="read__more">
                                <a href="${el.volumeInfo.previewLink}" target="_blank">
                                    <img src="./images/book-open.svg" alt="open book" class="readMoreBtn">
                                </a>
                                <div>
                                    <img src="./images/delete.svg" alt="Delete" data-id="${el.id}" class="deleteMoreBtn">
                                </div>
                            </div>
            `
            )
            $(".bookmarks__items").appendChild(addBook);
          }
        });
    }
  })

}
addBookmark()


// Delete Book
function deleteBooks() {

  $(".bookmarks__items").addEventListener("click", (e) => {
    if (e.target.className == "deleteMoreBtn") {
      let p = e.target.parentElement.parentElement.parentElement;
      p.remove();
      let li = $(".bookmarks__items").innerHTML;
      localStorage.setItem("bookmarkId", li);
    }
  })


}
deleteBooks()

// CLOSE TOGGLE MODAL

function toggle() {

  $(".modal").addEventListener("click", (e) => {
    if (e.target.classList == "xmark") {
      $(".modal").classList.add("close");
      $("body").style.overflowY = "visible";
    }
  })

}
toggle()


