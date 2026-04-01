import { useState } from "react";
import {
  Leaf,
  Target,
  Eye,
  Heart,
  Award,
  Users,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Linkedin,
  Mail,
  Sprout,
  ShieldCheck,
  FlaskConical,
  TrendingUp,
} from "lucide-react";

const teamMembers = [
  {
    name: "John Moyo",
    role: "Managing Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    bio: "With over 20 years of experience in agricultural business, John leads Tiger Agrochem with a vision for sustainable farming solutions across Zimbabwe.",
    linkedin: "#",
    email: "john@tigeragrochem.co.zw",
  },
  {
    name: "Sarah Chikwanha",
    role: "Chief Agronomist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    bio: "Sarah brings 15 years of agronomic expertise, helping farmers maximize yields through science-based crop protection strategies.",
    linkedin: "#",
    email: "sarah@tigeragrochem.co.zw",
  },
  {
    name: "David Ncube",
    role: "Sales Director",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    bio: "David leads our sales team with passion, ensuring every farmer gets the right products and advice for their specific needs.",
    linkedin: "#",
    email: "david@tigeragrochem.co.zw",
  },
  {
    name: "Grace Mupfudze",
    role: "Operations Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    bio: "Grace ensures smooth operations across all departments, maintaining our commitment to quality and customer satisfaction.",
    linkedin: "#",
    email: "grace@tigeragrochem.co.zw",
  },
  {
    name: "Michael Zimuto",
    role: "Technical Support Lead",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Michael provides expert technical guidance to farmers, helping them implement effective crop protection programs.",
    linkedin: "#",
    email: "michael@tigeragrochem.co.zw",
  },
  {
    name: "Tendai Madziva",
    role: "Marketing Manager",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    bio: "Tendai connects our solutions with farmers through innovative marketing and educational initiatives.",
    linkedin: "#",
    email: "tendai@tigeragrochem.co.zw",
  },
];

const milestones = [
  {
    year: "2008",
    title: "Company Founded",
    description:
      "Tiger Agrochem was established with a mission to provide quality agricultural inputs to Zimbabwean farmers.",
  },
  {
    year: "2012",
    title: "Expanded Product Range",
    description:
      "Introduced a comprehensive range of crop protection chemicals and fertilizers.",
  },
  {
    year: "2016",
    title: "Regional Expansion",
    description:
      "Extended operations to cover all major agricultural regions in Zimbabwe.",
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description:
      "Launched online platform and digital advisory services for farmers.",
  },
  {
    year: "2024",
    title: "Sustainability Initiative",
    description:
      "Introduced eco-friendly product lines and sustainable farming programs.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description:
      "We source only certified, high-quality products from trusted global manufacturers.",
  },
  {
    icon: Heart,
    title: "Customer First",
    description:
      "Our farmers' success is our success. We prioritize their needs in everything we do.",
  },
  {
    icon: Sprout,
    title: "Sustainability",
    description:
      "We promote farming practices that protect the environment for future generations.",
  },
  {
    icon: TrendingUp,
    title: "Innovation",
    description:
      "We continuously seek new solutions and technologies to improve agricultural productivity.",
  },
];

const stats = [
  { value: "15+", label: "Years of Experience" },
  { value: "5,000+", label: "Farmers Served" },
  { value: "200+", label: "Products Available" },
  { value: "10", label: "Provinces Covered" },
];

function AboutUsPage() {
  const [expandedMember, setExpandedMember] = useState(null);

  const toggleMember = (index) => {
    setExpandedMember(expandedMember === index ? null : index);
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
              About Tiger Agrochem
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Growing Zimbabwe's <br />
              <span className="text-amber-300">Agricultural Future</span>
            </h1>
            <p className="text-xl text-emerald-100 leading-relaxed">
              For over 15 years, we've been empowering farmers with quality
              agrochemicals, expert guidance, and innovative solutions to help
              them achieve sustainable success.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-emerald-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Who We Are
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Tiger Agrochem is a leading agricultural input supplier in
                Zimbabwe, dedicated to providing farmers with high-quality crop
                protection products, fertilizers, seeds, and expert agronomic
                advice.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Based in Harare, we serve farmers across all provinces, helping
                them maximize yields, protect their crops, and adopt sustainable
                farming practices that ensure long-term productivity.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of experienced agronomists and technical advisors work
                closely with farmers to understand their unique challenges and
                provide tailored solutions that deliver real results.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop"
                alt="Zimbabwean farming"
                className="rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="bg-emerald-100 p-3 rounded-full">
                    <Award className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">15+</p>
                    <p className="text-sm text-gray-600">Years of Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Foundation
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on strong principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-emerald-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="bg-emerald-600 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Mission
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower Zimbabwean farmers with access to quality agricultural
                inputs, innovative technologies, and expert guidance that enhance
                productivity, profitability, and sustainability.
              </p>
            </div>

            <div className="bg-amber-50 p-8 rounded-2xl">
              <div className="flex items-center mb-4">
                <div className="bg-amber-500 p-3 rounded-full mr-4">
                  <Eye className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">
                  Our Vision
                </h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be Zimbabwe's most trusted agricultural partner, recognized
                for delivering excellence in products, services, and farmer
                support that transform agriculture across the nation.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gray-50 card-hover"
              >
                <div className="bg-emerald-600 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Key milestones that shaped Tiger Agrochem
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-200"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pl-12" : "md:pr-12"
                    }`}
                  >
                    <div
                      className={`bg-white p-6 rounded-xl shadow-md ${
                        index % 2 === 0 ? "md:ml-auto" : ""
                      }`}
                    >
                      <div className="flex items-center mb-3">
                        <Calendar className="h-5 w-5 text-emerald-600 mr-2" />
                        <span className="text-emerald-600 font-bold">
                          {milestone.year}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:flex w-12 h-12 bg-emerald-600 rounded-full items-center justify-center z-10 my-4 md:my-0">
                    <Leaf className="h-6 w-6 text-white" />
                  </div>

                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-bold mb-4">
              Meet Our Experts
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your farming success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100"
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">
                      {member.name}
                    </h3>
                    <p className="text-emerald-300 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="p-6">
                  <button
                    onClick={() => toggleMember(index)}
                    className="w-full flex items-center justify-between text-left text-gray-600 hover:text-emerald-600 transition"
                  >
                    <span className="font-medium">Learn more</span>
                    {expandedMember === index ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  {expandedMember === index && (
                    <div className="mt-4 animate-fade-in">
                      <p className="text-gray-600 mb-4">{member.bio}</p>
                      <div className="flex space-x-3">
                        <a
                          href={member.linkedin}
                          className="bg-gray-100 p-2 rounded-full hover:bg-emerald-100 transition"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <Linkedin className="h-5 w-5 text-gray-600 hover:text-emerald-600" />
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className="bg-gray-100 p-2 rounded-full hover:bg-emerald-100 transition"
                          aria-label={`Email ${member.name}`}
                        >
                          <Mail className="h-5 w-5 text-gray-600 hover:text-emerald-600" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                Why Farmers Choose Us
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-400 p-2 rounded-full mr-4 mt-1">
                    <ShieldCheck className="h-5 w-5 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Genuine Products
                    </h3>
                    <p className="text-emerald-100">
                      We source directly from reputable manufacturers, ensuring
                      every product is authentic and effective.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-400 p-2 rounded-full mr-4 mt-1">
                    <Users className="h-5 w-5 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Expert Support
                    </h3>
                    <p className="text-emerald-100">
                      Our agronomists provide personalized advice, helping you
                      choose the right products for your crops.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-400 p-2 rounded-full mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Nationwide Reach
                    </h3>
                    <p className="text-emerald-100">
                      With distribution across all provinces, we ensure farmers
                      everywhere have access to quality inputs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-400 p-2 rounded-full mr-4 mt-1">
                    <FlaskConical className="h-5 w-5 text-emerald-900" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Training & Education
                    </h3>
                    <p className="text-emerald-100">
                      We regularly conduct farmer training sessions on proper
                      product use and best agronomic practices.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=600&h=500&fit=crop"
                alt="Farmer in field"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Partner with Us?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of farmers who trust Tiger Agrochem for their
            agricultural needs. Contact us today to learn how we can help you
            achieve better yields.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="mailto:sales@tigeragrochem.co.zw"
              className="bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-700 transition shadow-lg"
            >
              Contact Us
            </a>
            <a
              href="/products"
              className="bg-white text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition"
            >
              View Products
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;