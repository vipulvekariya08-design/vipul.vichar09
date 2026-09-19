/* =========================================================
   VIPUL VEKARIYA LITERARY WEBSITE
   BASIC CONTENT PROTECTION

   Purpose:
   Discourage casual copying of original literary content.

   This is not DRM and cannot prevent determined technical
   users from accessing content delivered by the browser.
   ========================================================= */


document.addEventListener("DOMContentLoaded", function () {


  /* -------------------------------------------------------
     PROTECTED CONTENT AREAS
     ------------------------------------------------------- */

  const protectedSelectors = [
    ".book",
    ".reading-text",
    ".cover-page",
    ".finish-page",
    ".reader-note",
    ".profile-text"
  ];


  function isProtected(element) {

    if (!element || !element.closest) {
      return false;
    }


    return protectedSelectors.some(
      selector => element.closest(selector)
    );

  }



  /* -------------------------------------------------------
     PREVENT RIGHT CLICK
     ON WRITING + IMAGES
     ------------------------------------------------------- */

  document.addEventListener(
    "contextmenu",
    function (event) {

      if (
        isProtected(event.target) ||
        event.target.tagName === "IMG"
      ) {

        event.preventDefault();

      }

    }
  );



  /* -------------------------------------------------------
     PREVENT COPY EVENT
     ------------------------------------------------------- */

  document.addEventListener(
    "copy",
    function (event) {

      const selection =
        window.getSelection();


      if (!selection || !selection.rangeCount) {
        return;
      }


      const selectedNode =
        selection
          .getRangeAt(0)
          .commonAncestorContainer;


      const selectedElement =
        selectedNode.nodeType === 1
          ? selectedNode
          : selectedNode.parentElement;


      if (isProtected(selectedElement)) {

        event.preventDefault();

        selection.removeAllRanges();

      }

    }
  );



  /* -------------------------------------------------------
     PREVENT CUT
     ------------------------------------------------------- */

  document.addEventListener(
    "cut",
    function (event) {

      if (isProtected(event.target)) {

        event.preventDefault();

      }

    }
  );



  /* -------------------------------------------------------
     PREVENT TEXT SELECTION
     ------------------------------------------------------- */

  document.addEventListener(
    "selectstart",
    function (event) {

      if (isProtected(event.target)) {

        event.preventDefault();

      }

    }
  );



  /* -------------------------------------------------------
     PREVENT IMAGE DRAGGING
     ------------------------------------------------------- */

  document.addEventListener(
    "dragstart",
    function (event) {

      if (
        event.target.tagName === "IMG" ||
        isProtected(event.target)
      ) {

        event.preventDefault();

      }

    }
  );



  /* -------------------------------------------------------
     BLOCK COMMON COPY SHORTCUTS
     INSIDE PROTECTED CONTENT
     ------------------------------------------------------- */

  document.addEventListener(
    "keydown",
    function (event) {

      const key =
        event.key.toLowerCase();


      const copyShortcut =
        (event.ctrlKey || event.metaKey) &&
        (
          key === "c" ||
          key === "x" ||
          key === "a"
        );


      if (!copyShortcut) {
        return;
      }


      const selection =
        window.getSelection();


      let target =
        event.target;


      if (
        selection &&
        selection.rangeCount
      ) {

        const selectedNode =
          selection
            .getRangeAt(0)
            .commonAncestorContainer;


        target =
          selectedNode.nodeType === 1
            ? selectedNode
            : selectedNode.parentElement;

      }


      if (isProtected(target)) {

        event.preventDefault();

        if (selection) {
          selection.removeAllRanges();
        }

      }

    }
  );



  /* -------------------------------------------------------
     APPLY CSS USER-SELECT PROTECTION
     ------------------------------------------------------- */

  protectedSelectors.forEach(
    selector => {

      document
        .querySelectorAll(selector)
        .forEach(element => {

          element.style.userSelect =
            "none";

          element.style.webkitUserSelect =
            "none";

          element.style.msUserSelect =
            "none";

          element.setAttribute(
            "data-copy-protected",
            "true"
          );

        });

    }
  );



  /* -------------------------------------------------------
     IMAGE PROTECTION
     ------------------------------------------------------- */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.draggable = false;

      image.style.userSelect =
        "none";

      image.style.webkitUserSelect =
        "none";

    });


});
