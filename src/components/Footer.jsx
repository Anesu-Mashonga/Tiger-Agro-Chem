import logo from "./Tiger Agro Chem log.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-brand-top">
              <img
                src={logo}
                alt="Tiger Agro Chem logo"
                className="footer-logo"
              />
              <div>
                <h2 className="footer-brand-title">Tiger Agrochem</h2>
                <p className="footer-brand-tagline">
                  Trusted crop protection and agricultural support across
                  Zimbabwe.
                </p>
              </div>
            </div>

            <p className="footer-text">
              We supply growers with quality farm inputs, expert guidance, and
              reliable service throughout Harare and beyond.
            </p>

            <address className="footer-address">
              <strong>Address</strong>
              <br />
              2 Sandringham Drive,
              <br />
              Alexandra Park, Harare - Zimbabwe
            </address>
          </div>

          <div className="footer-block">
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-list">
              <li>
                <a
                  href="mailto:sales@tigeragrochem.co.zw"
                  className="footer-link"
                >
                  sales@tigeragrochem.co.zw
                </a>
              </li>
              <li>
                <a href="tel:+263242799008" className="footer-link">
                  Tel: +263 242 799 008
                </a>
              </li>
              <li>
                <a href="tel:+263710938772" className="footer-link">
                  Mobile: +263 710 938 772
                </a>
              </li>
              <li>
                <a href="tel:+263773998545" className="footer-link">
                  Mobile: +263 773 998 545
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-block">
            <h3 className="footer-heading">Quick links</h3>
            <ul className="footer-list">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="footer-link">
                  Products
                </a>
              </li>
              <li>
                <a href="/guidelines" className="footer-link">
                  Crop protection scheme
                </a>
              </li>
              <li>
                <a href="/events" className="footer-link">
                  Events
                </a>
              </li>
              <li>
                <a href="/testimonials" className="footer-link">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Tiger Agrochem. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a
              href="https://niytto-tech.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Niytto Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
