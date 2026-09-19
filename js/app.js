function header() {

  return `
    <header class="site-header">

      <div class="wrap nav">

        <a class="brand" href="index.html">

          <img
            src="assets/logo.png"
            alt="Vipul Vekariya logo"
            onerror="this.style.visibility='hidden'"
          >

          <span>Vipul Vekariya</span>

        </a>


        <nav class="links" aria-label="Main navigation">

          <a href="index.html">
            Home
          </a>

          <a href="library.html">
            Library
          </a>

          <a href="quotes.html">
            Quotes
          </a>

          <a href="videos.html">
            Videos
          </a>

          <a href="about.html">
            About
          </a>

          <a href="donate.html">
            Support Education
          </a>

          <a href="copyright.html">
            Copyright
          </a>

          <a
            href="contact.html"
            class="contact-nav-button"
          >
            Contact & Permissions
          </a>

        </nav>

      </div>

    </header>
  `;
}



function footer() {

  return `
    <footer class="site-footer">

      <div class="wrap">

        <div class="footer-main">

          © ${new Date().getFullYear()}
          Vipul Vekariya.
          All rights reserved.

        </div>


        <div class="footer-navigation">

          <a href="about.html">
            About
          </a>

          <a href="copyright.html">
            Copyright
          </a>

          <a href="donate.html">
            Support Education
          </a>

        </div>


        <div class="footer-contact-area">

          <a
            href="contact.html"
            class="footer-contact-button"
          >
            Contact & Permissions
          </a>

        </div>

      </div>

    </footer>
  `;

}



document.addEventListener(
  "DOMContentLoaded",
  () => {

    document.body.insertAdjacentHTML(
      "afterbegin",
      header()
    );

    document.body.insertAdjacentHTML(
      "beforeend",
      footer()
    );

  }
);
