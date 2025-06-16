import service1 from '../assets/images/services1.png'
import service2 from '../assets/images/services2.png'
import service3 from '../assets/images/services3.png'
import service4 from '../assets/images/services4.png'
import service5 from '../assets/images/services5.png'
import service6 from '../assets/images/services6.png'
import servicesStar  from '../assets/images/services-star.png'


const services = [
  {
    title: "Generative AI",
    description: "Generative AI is a fascinating branch of artificial intelligence that focuses on creating new content.",
    icon: service1,
    highlighted: false,
    readMore: "Read More",
  },
  {
    title: "LLM Finetuning",
    description: "In the realm of Natural Language Processing (NLP), fine-tuning models like BERT, GPT, and RoBERTa has emerged as a powerful technique to adapt pre-trained language.",
    icon: service2,
    highlighted: true,
    readMore: "Read More",
  },
  {
    title: "Chat Bot",
    description: "Empower your business with our advanced chatbot solutions designed to enhance customer experience.",
    icon: service3,
    highlighted: false,
    readMore: "Read More",
  },
  {
    title: "Computer Vision",
    description: "Computer vision is a revolutionary field within artificial intelligence that enables machines to interpret visual data.",
    icon: service4,
    highlighted: false,
    readMore: "Read More",
  },
  {
    title: "Speech Recognition",
    description: "Speech recognition technology has revolutionized how we interact with devices and applications.",
    icon: service5,
    highlighted: false,
    readMore: "Read More",
  },
  {
    title: "Anomaly Detection",
    description: "Anomaly detection is a crucial aspect of data analysis, providing the capability to identify unusual patterns.",
    icon: service6,
    highlighted: false,
    readMore: "Read More",
  },
];

const Services = () => {
  return (
    <section className="py-16 px-20 bg-gray-50 min-h-screen mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <img src={servicesStar} alt="" className='w-55'/>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
                service.highlighted 
                  ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white' 
                  : 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-blue-600 hover:text-white'
              }`}
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                service.highlighted 
                  ? 'bg-white backdrop-blur-sm' 
                  : 'bg-[var(--primary-color)] group-hover:bg-white/20 group-hover:backdrop-blur-sm'
              }`}>
                <img 
                  src={service.icon} 
                  alt={service.title}
                  className="w-8 h-8 object-contain transition-all duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className={`text-xl font-bold transition-all duration-500 ${
                  service.highlighted 
                    ? 'text-white' 
                    : 'text-gray-800 group-hover:text-white'
                }`}>
                  {service.title} 
                </h3>
                
                <p className={`text-sm leading-relaxed transition-all duration-500 ${
                  service.highlighted 
                    ? 'text-white/90' 
                    : 'text-gray-600 group-hover:text-white/90'
                }`}>
                  {service.description}
                </p>

                <button className={`text-sm font-semibold transition-all duration-500 hover:underline ${
                  service.highlighted 
                    ? 'text-white' 
                    : 'text-purple-600 group-hover:text-white'
                }`}>
                  {service.readMore}
                </button>
              </div>

              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-600/0 group-hover:from-purple-500 group-hover:to-blue-600 rounded-2xl transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10"></div>
              
              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-purple-400/20 to-blue-500/20 blur-xl -z-20"></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;