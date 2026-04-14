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
import angiraiImg from "../img/Angirai.jpg";
import davidImg from "../img/David.jpg";
import tawandaImg from "../img/Tawanda.jpg";
import tinasheImg from "../img/Tinashe.jpg";
import wonderfulImg from "../img/Wonderfull.jpg";

const teamMembers = [
  {
    name: "David Tigere",
    role: "Chief Executive Officer",
    image: davidImg,
  },
  {
    name: "Tawanda Mutenure",
    role: "General Manager",
    image: tawandaImg,
  },
  {
    name: "Wonderful Manyonganise",
    role: "Chief Agronomist",
    image: wonderfulImg,
  },
  {
    name: "Angirayi Njeni",
    role: "Regional Technical Agronomist",
    image: angiraiImg,
  },
  {
    name: "Tinashe John",
    role: "Regional Technical Agronomist",
    image: tinasheImg,
  },
];

const milestones = [
  {
    year: "2018",
    title: "Company Founded",
    description:
      "Tiger Agro Chem (TAC) was established with the mission of enhancing Zimbabwe’s agricultural productivity and helping the nation reclaim its status as Africa’s breadbasket. It launched as the official representative of Avgust Crop Protection (a leading European/Russian supplier)",
  },
  {
    year: "2019 - 2020",
    title: "Strategic Product Registration",
    description:
      "The company successfully registered a comprehensive range of products—including herbicides, insecticides, fungicides, and plant growth regulators—with Zimbabwe’s Ministry of Lands, Agriculture, Fisheries, Water, Climate and Rural Resettlement, ensuring full statutory compliance.",
  },
  {
    year: "2021",
    title: "Strategic Partnership with Tiger Agro Solutions (TAS)",
    description:
      "To provide a universal solution for farmers, TAC partnered with its sister company, Tiger Agro Solutions. This allowed the company to offer not just chemicals, but also contract hiring for heavy machinery like Rostselmash tractors, planters, and combine harvesters.",
  },
  {
    year: "2022 - 2023",
    title: "Nationwide Distribution Network",
    description:
      "TAC significantly expanded its reach by partnering with major national agro-dealers. Its products became available across Zimbabwe through outlets such as Farmbiz, Windmill, Farmers Choice, and NTS, covering regions from Harare and Bulawayo to Mutare and Chivhu.",
  },
  {
    year: "2024",
    title: "Advanced Agronomic Support & Sustainability",
    description:
      "The company shifted focus toward Smart Farming by providing hands-on technical support. This includes free field visits and boom spraying services for large-scale farmers (over 100-250 hectares) and specialized advisory on soil analysis and eco-friendly chemical application to ensure sustainable yields.",
  },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Good work ethic.",
  },
  {
    icon: Heart,
    title: "Customer Satisfaction",
    description:
      "Driven by customer focus.",
  },
  {
    icon: Users,
    title: "Teamwork",
    description:
      "Together we go far.",
  },
  {
    icon: Award,
    title: "Professionalism",
    description:
      "Passionate with our work.",
  },
];

const stats = [
  { value: "2018", label: "Year Established" },
  { value: "21%", label: "Avgust Market Share in Russia" },
  { value: "100+", label: "Products Registered" },
  { value: "10", label: "Provinces Covered" },
];

function AboutUsPage() {
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
              Established in 2018, Tiger Agro Chem (TAC) is dedicated to enhancing 
              Zimbabwe's agricultural productivity and reclaiming Africa's breadbasket 
              status as the representative of Avgust Crop Protection from Russia.
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
                Tiger Agro Chem (TAC) was established in 2018 with the goal of 
                enhancing Zimbabwe's agricultural productivity and reclaiming 
                Africa's breadbasket status. As the representative of Avgust 
                Crop Protection from Russia, one of Europe's leading agrochemical 
                suppliers, TAC brings the expertise of a company with a remarkable 
                21% marketshare in Russia.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                TAC ensures compliance with all applicable statutory requirements 
                and has successfully registered its wide range of products, including 
                herbicides, insecticides, fungicides, plant growth regulators, and 
                seed dressers, with Zimbabwe's Ministry of Lands, Agriculture, 
                Fisheries, Water, Climate and Rural Resettlement.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team has vast experience in different corporate management areas, 
                including commercial farming, financial management, operational control, 
                customs clearing and transport, and working capital management. We are 
                passionate about improving the sustainability of farming systems and technology.
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
                    <p className="text-2xl font-bold text-gray-800">{new Date().getFullYear() - 2018}+</p>
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
                To provide farmers with sustainable chemical crop protection 
                products (herbicides, fungicides, insecticides, seed dressers 
                and bio stimulants) which are affordable and effective to ensure 
                high yields and profits.
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
                To be the preferred agro chemical supplier in Southern Africa.
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
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              The Executive team has vast experience in different corporate 
              management areas, including commercial farming, financial management, 
              operational control, customs clearing and transport, and working 
              capital management. The team is passionate about improving the 
              sustainability of farming systems and technology.
            </p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              TAC has qualified and hands-on agronomists who have experience in 
              agro-retail, agro-technical service, agro-consultancy, and farm 
              administration to assist farmers at any level with comprehensive 
              crop protection solutions that are practical and cost-effective.
            </p>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The field team comprises experienced supervisors who know how to 
              calibrate sprayers, the ideal times and conditions to spray, and 
              the proper equipment to use depending on the products. They have a 
              hands-on approach and are always on the ground, assisting farmers 
              to analyse and solve problems.
            </p>
          </div>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  {teamMembers.map((member, index) => (
    <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        {/* Text Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {member.name}
          </h3>
          <p className="text-emerald-300 font-semibold text-lg">
            {member.role}
          </p>
        </div>
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

      {/* Strategic Partnerships */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Strategic Partnerships
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Working together to provide comprehensive agricultural solutions
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              To supply farmers with a universal solution including the acute 
              shortage on tillage, planting, chemical application and harvesting 
              equipment, TAC has partnered with its sister company Tiger Agro 
              Solutions (TAS). TAS is an accredited dealer of Rostselmash and 
              has a fleet of tractors, planters, boom sprayers and combine 
              harvesters that they offer for contract hiring to farmers to ensure 
              optimum productivity.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              If farmers buy chemicals for more than 100 hectares, the agronomy 
              team will visit the field and ensure correct chemical application. 
              Farmers that buy chemicals from TAC for more than 250 hectares 
              receive the first round of boom spraying by TAS at a discounted 
              price (Terms and conditions apply).
            </p>
          </div>
        </div>
      </section>

      {/* TAC Engagements with Avgust */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              TAC Engagements with Avgust in Europe and Asia
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gaining first-hand knowledge of production processes
            </p>
          </div>

          <div className="bg-emerald-50 p-8 rounded-2xl">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              We are extremely proud to share with you the valuable experience 
              we gained during our visit to the Avgust Crop Protection factories 
              in China and Russia. The purpose of this visit was to deepen our 
              understanding of the production processes involved in the 
              manufacturing of our exceptional range of products.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              By gaining first-hand knowledge of these processes, we are now 
              equipped to articulate the unique features and benefits of our 
              products to our esteemed clients. We were given a tour of the 
              manufacturing facilities and witnessed the process from formulation 
              to packaging using advanced techniques employed to maintain the 
              highest quality standards. This visit not only gave us insight into the attention to the detail involved in the cultivation process but also allowed us to appreciate the dedication and expertise of our Avgust Chinese partners.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Similarly, in Russia, we had the opportunity to observe the 
              state-of-the-art manufacturing facilities. We witnessed the seamless 
              integration of technology and precision in various production stages. 
              From formulation to packaging, every step is executed with utmost 
              care, ensuring that our products reach the market in their optimal form. Through this visit, we gained a deeper appreciation for the commitment of our Russian counterparts to delivering excellence.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              With the valuable experience gained from these visits, we at TAC, 
              are excited to share our comprehensive understanding of our products 
              with our clients. We believe that by knowing the production process 
              inside out, we can better assist our clients in selecting the right 
              solutions for their specific crop protection needs. We look forward to bringing our clients closer to the heart of our operations and delivering the highest level of satisfaction through our exceptional products, supported by our comprehensive knowledge of the production process.
            </p>
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
