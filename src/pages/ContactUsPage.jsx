import { useState } from "react";
import emailjs from "@emailjs/browser";
import { emailjsConfig } from "../config/emailjs";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Twitter,
  MessageCircle,
  Youtube,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const faqs = [
  {
    question: "What are your business hours?",
    answer:
      "We are open Monday to Friday from 8:00 AM to 5:00 PM, and Saturday from 8:00 AM to 1:00 PM. We are closed on Sundays and public holidays.",
  },
  {
    question: "Do you offer delivery services?",
    answer:
      "Yes, we offer delivery services within Harare and surrounding areas. For deliveries outside Harare, please contact us to discuss options and associated costs.",
  },
  {
    question: "How can I get technical advice on products?",
    answer:
      "Our team of agronomists is available to provide technical advice. You can reach us by phone, email, or visit our office. We also conduct regular farmer training sessions.",
  },
  {
    question: "Do you offer credit terms?",
    answer:
      "We offer credit terms to established customers. Please contact our sales team to discuss your requirements and eligibility for credit facilities.",
  },
  {
    question: "How do I become a distributor?",
    answer:
      "We welcome partnerships with potential distributors. Please contact us with details about your business and distribution capabilities, and our team will get in touch.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, bank transfers, mobile money (EcoCash, OneMoney), and major credit/debit cards. Payment terms can be discussed for bulk orders.",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/Tiger-Agro-Chem-102957438165808/?ref=br_rs",
    Icon: Facebook,
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    name: "Twitter",
    href: "https://twitter.com/TigerAgro",
    Icon: Twitter,
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/263710938772",
    Icon: MessageCircle,
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCQFcy5kTGpuOyravqSZW19g/",
    Icon: Youtube,
    color: "bg-red-600 hover:bg-red-700",
  },
];

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null); // 'success', 'error', or null
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus(null);

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "Not provided",
      subject: formData.subject,
      message: formData.message,
      to_email: "sales@tigeragrochem.co.zw",
    };

    try {
      // Send email using EmailJS
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        templateParams,
        emailjsConfig.publicKey
      );

      setFormStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      // Clear success message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");

      // Clear error message after 5 seconds
      setTimeout(() => setFormStatus(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-block bg-amber-400 text-emerald-900 px-4 py-1 rounded-full text-sm font-bold mb-6">
              Get In Touch
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Contact <span className="text-amber-300">Us</span>
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              Have questions about our products or services? We're here to help.
              Reach out to our team and let's discuss how we can support your
              farming success.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Details Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form - Left Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Send Us a Message
              </h2>

              {formStatus === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <p className="text-green-700">
                    Thank you! Your message has been sent successfully. We'll
                    get back to you soon.
                  </p>
                </div>
              )}

              {formStatus === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
                  <p className="text-red-700">
                    Something went wrong. Please try again later.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                      placeholder="+263 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="technical-support">Technical Support</option>
                      <option value="order">Place an Order</option>
                      <option value="partnership">Partnership/Distribution</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column - Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full flex flex-col">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>
              <div className="space-y-6 flex-grow">
                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Our Location
                    </h3>
                    <p className="text-gray-600">
                      2 Sandringham Drive,
                      <br />
                      Alexandra Park, Harare
                      <br />
                      Zimbabwe
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Phone Numbers
                    </h3>
                    <p className="text-gray-600">
                      Tel: +263 242 799 008
                      <br />
                      Mobile: +263 710 938 772
                      <br />
                      Mobile: +263 710 938 775
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Email Address
                    </h3>
                    <a
                      href="mailto:sales@tigeragrochem.co.zw"
                      className="text-emerald-600 hover:text-emerald-700 transition"
                    >
                      sales@tigeragrochem.co.zw
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-emerald-100 p-3 rounded-full mr-4">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM
                      <br />
                      Saturday: 8:00 AM - 1:00 PM
                      <br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Connect With Us and Map */}
          <div className="grid lg:grid-cols-2 gap-12 mt-12 items-stretch">
            {/* Connect With Us - Left Column */}
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Connect With Us
              </h2>
              <p className="text-gray-600 mb-6">
                Follow us on social media for the latest updates, farming
                tips, and product information.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, href, Icon, color }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    className={`${color} text-white p-3 rounded-full transition transform hover:scale-110`}
                  >
                    <Icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Map - Right Column */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.88367108688!2d31.0512147!3d-17.7971635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1931a575965efa13%3A0xd8c643fa192fdbf5!2sTiger%20Agro%20Chem!5e0!3m2!1sen!2szw!4v1774972222755!5m2!1sen!2szw"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Tiger Agrochem Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 transition"
                >
                  <span className="font-bold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Immediate Assistance?
          </h2>
          <p className="text-emerald-100 mb-6">
            For urgent inquiries, give us a call during business hours and our
            team will be happy to assist you.
          </p>
          <a
            href="tel:+263242799008"
            className="inline-flex items-center bg-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-600 transition shadow-lg"
          >
            <Phone className="h-5 w-5 mr-2" />
            Call +263 242 799 008
          </a>
        </div>
      </section>
    </div>
  );
}

export default ContactUsPage;