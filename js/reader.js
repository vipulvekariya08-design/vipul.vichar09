/* =========================================================
   VIPUL VEKARIYA
   FINAL REUSABLE LITERARY READER
   ========================================================= */


let bookData = null;

/*
  page = 0       Cover
  page = 1...N   Actual writing pages
  page = N + 1   Completion page
*/

let page = 0;


const params =
  new URLSearchParams(
    window.location.search
  );


const id =
  params.get("id");



/* =========================================================
   SAFE HTML
   ========================================================= */

function escapeHTML(value) {

  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

}



/* =========================================================
   START READER
   ========================================================= */

async function start() {

  const book =
    document.getElementById("book");


  if (!id) {

   book.innerHTML = `

  <h1>
    ${escapeHTML(bookData.title)}
  </h1>

  <div class="cover-small">
    A LITERARY WORK BY
  </div>

  <div class="cover-author">
    ${escapeHTML(bookData.author)}
  </div>

  <div class="cover-meta">

    ${escapeHTML(bookData.category)}

    &nbsp;·&nbsp;

    ${escapeHTML(bookData.language)}

  </div>

`;
    }


    bookData =
      await response.json();


    if (
      !bookData ||
      !Array.isArray(bookData.pages)
    ) {

      throw new Error(
        "Invalid writing data."
      );

    }


    document.title =
      `${bookData.title} | Vipul Vekariya`;


    draw();

  }

  catch (error) {

    console.error(error);


    book.className = "book";


    book.innerHTML = `

      <h1>
        Writing not found
      </h1>

      <p>
        This literary work could not be loaded.
      </p>

    `;


    document.getElementById(
      "pageNo"
    ).textContent = "";


    document.getElementById(
      "prev"
    ).disabled = true;


    document.getElementById(
      "next"
    ).disabled = true;

  }

}



/* =========================================================
   DRAW CURRENT PAGE
   ========================================================= */

function draw() {

  if (!bookData) {
    return;
  }


  const totalReadingPages =
    bookData.pages.length;


  const finishPage =
    totalReadingPages + 1;


  const book =
    document.getElementById(
      "book"
    );


  const pageNumber =
    document.getElementById(
      "pageNo"
    );


  const previousButton =
    document.getElementById(
      "prev"
    );


  const nextButton =
    document.getElementById(
      "next"
    );


  previousButton.disabled =
    page === 0;


  nextButton.disabled =
    page === finishPage;



  /* -------------------------------------------------------
     COVER
     ------------------------------------------------------- */

  if (page === 0) {

    pageNumber.textContent =
      "Cover";


    book.className =
      "book cover-page";


book.innerHTML = `

  <div class="cover-small">
    A LITERARY WORK BY
  </div>

  <h1>
    ${escapeHTML(bookData.title)}
  </h1>

  <div class="cover-author">
    ${escapeHTML(bookData.author)}
  </div>

  <div class="cover-meta">

    ${escapeHTML(bookData.category)}

    &nbsp;·&nbsp;

    ${escapeHTML(bookData.language)}

  </div>

`;

  }


  /* -------------------------------------------------------
     READING PAGES
     ------------------------------------------------------- */

  else if (
    page >= 1 &&
    page <= totalReadingPages
  ) {

    pageNumber.textContent =
      `${page} / ${totalReadingPages}`;


    book.className =
      "book";


    const text =
      escapeHTML(
        bookData.pages[page - 1]
      );


    book.innerHTML = `

      <div class="meta">

        ${escapeHTML(bookData.title)}

        &nbsp;·&nbsp;

        Page ${page}

      </div>


      <div class="reading-text">

        ${text}

      </div>

    `;

  }


  /* -------------------------------------------------------
     COMPLETION PAGE
     ------------------------------------------------------- */

  else {

    pageNumber.textContent =
      "Finished";


    book.className =
      "book finish-page";


    const endWord =
      getEndWord(
        bookData.language
      );


    book.innerHTML = `

      <div class="finish-mark">
        ✦
      </div>

      <h2>
        ${endWord}
      </h2>

      <div class="finish-title">
        ${escapeHTML(bookData.title)}
      </div>

      <div class="finish-author">
        — ${escapeHTML(bookData.author)}
      </div>

    `;

  }



  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}



/* =========================================================
   LANGUAGE-AWARE ENDING
   ========================================================= */

function getEndWord(language) {

  const lang =
    String(language || "")
      .toLowerCase();


  if (lang === "hindi") {
    return "समाप्त";
  }


  if (lang === "gujarati") {
    return "સમાપ્ત";
  }


  return "The End";

}



/* =========================================================
   PREVIOUS
   ========================================================= */

function previousPage() {

  if (page > 0) {

    page--;

    draw();

  }

}



/* =========================================================
   NEXT
   ========================================================= */

function nextPage() {

  if (!bookData) {
    return;
  }


  const finishPage =
    bookData.pages.length + 1;


  if (page < finishPage) {

    page++;

    draw();

  }

}



/* =========================================================
   SHARE
   ========================================================= */

async function shareWriting() {

  if (!bookData) {
    return;
  }


  const shareData = {

    title:
      bookData.title,

    text:
      `${bookData.title} — ${bookData.author}`,

    url:
      window.location.href

  };


  try {

    if (navigator.share) {

      await navigator.share(
        shareData
      );

    }

    else if (
      navigator.clipboard
    ) {

      await navigator.clipboard.writeText(
        window.location.href
      );


      alert(
        "Reading link copied."
      );

    }

    else {

      alert(
        window.location.href
      );

    }

  }

  catch (error) {

    /*
      Closing the phone's share sheet
      should not create an error message.
    */

    if (
      error.name !== "AbortError"
    ) {

      console.error(error);

    }

  }

}



/* =========================================================
   KEYBOARD READING
   Desktop users can use arrow keys.
   ========================================================= */

function keyboardNavigation(event) {

  if (event.key === "ArrowLeft") {

    previousPage();

  }


  if (event.key === "ArrowRight") {

    nextPage();

  }

}



/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    document
      .getElementById("prev")
      .addEventListener(
        "click",
        previousPage
      );


    document
      .getElementById("next")
      .addEventListener(
        "click",
        nextPage
      );


    document
      .getElementById("share")
      .addEventListener(
        "click",
        shareWriting
      );


    document.addEventListener(
      "keydown",
      keyboardNavigation
    );


    start();

  }
);
