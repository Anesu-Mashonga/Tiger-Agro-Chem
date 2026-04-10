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

const contactItems = [
  {
    href: "mailto:sales@tigeragrochem.co.zw",
    Icon: Mail,
    text: "sales@tigeragrochem.co.zw",
  },
  {
    href: "tel:+263242799008",
    Icon: Phone,
    text: "Tel: +263 242 799 008",
  },
  {
    href: "tel:+263710938772",
    Icon: Phone,
    text: "Mobile: +263 710 938 772",
  },
  {
    href: "tel:+263773998545",
    Icon: Phone,
    text: "Mobile: +263 773 998 545",
  },
];

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/guidelines", label: "Crop Protection Scheme" },
  { href: "/events", label: "Events" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          {/* Map Section */}
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

          {/* Brand and Social Section */}
          <div className="footer-content">
            <div className="footer-brand-section">
              <div className="footer-brand-header">
                <img
                  src={logo}
                  alt="Tiger Agro Chem logo"
                  className="footer-logo"
                />
                <div>
                  <h2 className="footer-brand-title">Tiger Agrochem</h2>
                  <p className="footer-brand-tagline">
                    Trusted crop protection and agricultural support across Zimbabwe.
                  </p>
                </div>
              </div>

              <p className="footer-description">
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

            {/* Contact and Quick Links Grid */}
            <div className="footer-links-grid">
              <div className="footer-links-column">
                <h3 className="footer-heading">Contact</h3>
                <ul className="footer-list">
                  {contactItems.map(({ href, Icon, text }) => (
                    <li key={text}>
                      <a href={href} className="footer-link">
                        <Icon className="footer-link-icon" />
                        <span className="footer-link-text">{text}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Added hidden-mobile class here to hide this column on mobile */}
              <div className="footer-links-column hidden-mobile">
                <h3 className="footer-heading">Quick links</h3>
                <ul className="footer-list">
                  {quickLinks.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className="footer-link footer-link-simple">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>© 2026 Tiger Agrochem. All rights reserved.</p>
          <p>
            Designed by{" "}
            <a
              href="https://niytto-tech.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-bottom-link"
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