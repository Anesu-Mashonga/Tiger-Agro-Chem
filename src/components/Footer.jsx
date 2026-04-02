import { Facebook, Twitter, MessageCircle, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "./Tiger Agro Chem log.png";

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Tiger-Agro-Chem-102957438165808/?ref=br_rs",
    Icon: Facebook,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/TigerAgro",
    Icon: Twitter,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/263773416214",
    Icon: MessageCircle,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCQFcy5kTGpuOyravqSZW19g/",
    Icon: Youtube,
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.88367108688!2d31.0512147!3d-17.7971635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a575965efa13%3A0xd8c643fa192fdbf5!2sTiger%20Agro%20Chem!5e0!3m2!1sen!2szw!4v1774972222755!5m2!1sen!2szw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Tiger Agrochem Location"
            />
          </div>

          <div className="footer-content">
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

                <div className="footer-social">
                  {socialLinks.map(({ name, href, Icon }) => (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="footer-social-link"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="footer-block">
                <h3 className="footer-heading">Contact</h3>
                <ul className="footer-list">
                  <li>
                    <a
                      href="mailto:sales@tigeragrochem.co.zw"
                      className="footer-link"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      sales@tigeragrochem.co.zw
                    </a>
                  </li>
                  <li>
                    <a href="tel:+263242799008" className="footer-link">
                      <Phone className="h-4 w-4 mr-2" />
                      Tel: +263 242 799 008
                    </a>
                  </li>
                  <li>
                    <a href="tel:+263710938772" className="footer-link">
                      <Phone className="h-4 w-4 mr-2" />
                      Mobile: +263 710 938 772
                    </a>
                  </li>
                  <li>
                    <a href="tel:+263773998545" className="footer-link">
                      <Phone className="h-4 w-4 mr-2" />
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
                  <li>
                    <a href="/about" className="footer-link">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="footer-link">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
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