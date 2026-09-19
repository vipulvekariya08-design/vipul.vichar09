/* Vipul Vekariya Literary Website
   Basic protection against casual copying
*/

document.addEventListener("DOMContentLoaded", function () {

  const book = document.getElementById("book");

  /* If this page has no book reader, do nothing */
  if (!book) return;


  /* Disable text selection inside the book */

  book.style.userSelect = "none";
  book.style.webkitUserSelect = "none";


  /* Disable right-click inside the book */

  book.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });


  /* Disable copying from the book */

  book.addEventListener("copy", function (event) {
    event.preventDefault();
  });


  /* Disable cutting */

  book.addEventListener("cut", function (event) {
    event.preventDefault();
  });


  /* Disable drag */

  book.addEventListener("dragstart", function (event) {
    event.preventDefault();
  });


  /* Prevent selection starting inside the book */

  book.addEventListener("selectstart", function (event) {
    event.preventDefault();
  });

});
