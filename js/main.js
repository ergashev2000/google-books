async function getData(
  search = "python",
  order = "",
  maxResult = "9",
  pageIndex = "1"
) {
  try {
    console.log(pageIndex);
    const res = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${search}${order}&maxResults=${maxResult}&startIndex=${pageIndex}`
    );

    let result = await res.json();

    dataRender(result.items);
    $(".resultNumbers").textContent = result.totalItems;
    return result;
  } catch (err) {
    alert("Serverda muommo bor!!!");
  }
}




// PAGINATE
function paginate(totalItemsNum, maxResultNum) {
  let pageIndexNum = Math.ceil(totalItemsNum / maxResultNum);

  if (pageIndexNum <= 5) {
    for (let i = 0; i < pageIndexNum; i++) {
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

    $(".next").addEventListener("click", (e) => {
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

        // e.target.classList.add("new");


        a = e.target.textContent == 1 || e.target.textContent < 1
            ? 0
            : Number(e.target.textContent) - 2;

        b = e.target.textContent == 1 || e.target.textContent < 1
            ? 4
            : Number(e.target.textContent) + 2;

        console.log(e.target.textContent);

        for (let i = a; i < b; i++) {
          const li = createElement("li", `${i+1 == e.target.textContent ? "pag act" : "pag"}`, i + 1);
          $(".pagination").appendChild(li);
        }

        $(".cards").innerHTML = " ";
        
        dataRender(getData("python", " ", "9", e.target.textContent));
      }
    });
  }
}

//////////////////////////////////
// NEWEST ORDER
$(".newest").addEventListener("click", (e) => {
    $(".cards").innerHTML = " ";
    getData("python", "&orderBy=newest", "9","1");
})

//////////////////////////////////

paginate(getData().totalItems, 9);

// RENDER DATA
function dataRender(test1) {
  console.log(test1);
  test1.forEach((item) => {
    console.log(item);
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
                          <a href="#" class="bookmark__btn">Bookmark</a>
                          <a href="#" class="bookmark__info">More Info</a>
                      </div>
                          <a href="#" class="bookmark__read">Read</a>
                      </div>
                  </div>
              `
    );
    $(".cards").appendChild(tr);
  });
}

//   for (let i = 1; i <= Math.ceil(totalItemsNum / current); i++) {
//     dot.push(i);
//   }

//   const li1 = createElement("li", "pag next", "Next");
//   $(".pagination").appendChild(li1);

//   dot.forEach((i) => {
//     const li = createElement("li", `${i == num ? "pag act " : "pag"}`, i);
//     $(".pagination").appendChild(li);
//   });

//   const li2 = createElement("li", "pag prev", "Prev");
//   $(".pagination").appendChild(li2);

//   data.forEach((item) => {
//     const tr = createElement(
//       "div",
//       "card",
//       `
//         <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="">
//         <div class="card__text">
//             <h3>${item.volumeInfo.title}</h3>
//             <p>
//             ${item.volumeInfo.authors}
//             </p>
//             <span>${item.volumeInfo.publishedDate}</span>
//             <div class="card__btn">
//                 <div class="top__btn">
//                     <a href="#" class="bookmark__btn">Bookmark</a>
//                     <a href="#" class="bookmark__info">More Info</a>
//                 </div>
//                     <a href="#" class="bookmark__read">Read</a>
//                 </div>
//             </div>
//         `
//     );
//     $(".cards").appendChild(tr);
//   });

// async function paginateRender(num) {
//   $(".cards").innerHTML = "";
//   $(".pagination").innerHTML = "";
//   const dat = await data();

//   const currentPage = num || 1;

//   const totalPage = 9;

//   let allData = dat.totalItems;
//   console.log(allData);
// //   const lastData = allData.slice(start, end);
//   //   console.log(lastData);

//   paginate(allData, totalPage, currentPage);
// }

// // PAGINATE
// function paginate(all, data, current, num) {
//   let dot = [];

//   for (let i = 1; i <= Math.ceil(all.length / current); i++) {
//     dot.push(i);
//   }

//   const li1 = createElement("li", "pag next", "Next");
//   $(".pagination").appendChild(li1);
//   dot.forEach((i) => {
//     const li = createElement("li", `${i == num ? "pag act " : "pag"}`, i);
//     $(".pagination").appendChild(li);
//   });

//   const li2 = createElement("li", "pag prev", "Prev");
//   $(".pagination").appendChild(li2);

//   data.forEach((item) => {
//     const tr = createElement(
//       "div",
//       "card",
//       `
//         <img src="${item.volumeInfo.imageLinks.thumbnail}" alt="">
//         <div class="card__text">
//             <h3>${item.volumeInfo.title}</h3>
//             <p>
//             ${item.volumeInfo.authors}
//             </p>
//             <span>${item.volumeInfo.publishedDate}</span>
//             <div class="card__btn">
//                 <div class="top__btn">
//                     <a href="#" class="bookmark__btn">Bookmark</a>
//                     <a href="#" class="bookmark__info">More Info</a>
//                 </div>
//                     <a href="#" class="bookmark__read">Read</a>
//                 </div>
//             </div>
//         `
//     );
//     $(".cards").appendChild(tr);
//   });
// }

// $(".pagination").addEventListener("click", (e) => {
//   console.log(e.target.textContent);
//   if (e.target.textContent) {
//     paginateRender(e.target.textContent);
//   }
// });

// paginateRender();
