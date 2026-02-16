import { Icon } from '../ui/Icon';

export const SuccessStories = () => {
  const stories = [
    {
      quote: "The platform's interface is just like the real JAMB CBT. It helped me overcome exam anxiety. I scored 318!",
      name: "Chinelo O.",
      school: "UNILAG (Medicine)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdBLBmrPGbeWiUn3TO9bRjf0IKkNhyuEqYnLU3wsBsNDgw2vYKQKdKXydS8jsA_bub7rk93ilu1q4dkxSNCxtiJ44O-bst4YFo38G48j8CXMd9o9HxbIbUPUM2BpabqbmmQh21EjCgQgNtpxahl9yt2COklc66K9FKHo_mUXFTL7hP5tCy9Q7nwpmsXpj5iI8nehTn5byEvnxE0y-MgH56yzx0huOrJ3hC6pVl5ijzEFrcDDe0zecy1Z_cbc74GDzgShNc8OJXn8r",
      featured: false,
    },
    {
      quote: "The biology explanations are life-savers. I went from 40/100 to 88/100 in my practice tests. Totally worth it.",
      name: "Tunde A.",
      school: "UI (Mechanical Engr)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDuYtH0cHioCwYDr1StwZC6h_eNepEBG_sCO008Kg9eIa5AQppffyz7-ZAXdUDKBm_nGVZzOQUePo8DIUCg1ldLi2aVQGs1WJq0q6kaTN4RdAGk8x4Q4aKP2nL5GXeXyzO6P6m8W9ZDlCe_ej1KtO_-FokC6rMg4-A6Fvol8kny8pJD-Jcnw9eOsIwIlw3JMjnUYTLdrAzzj2A10iT-u_O9H0Fw8zAEwSm7ZNBthAoCQXSL_T9tj7Ly_mzps91FiSSmIbDfXZ2NBjRy",
      featured: true,
    },
    {
      quote: "I love the leaderboard. It made studying feel like a game. I didn't even realize I had done 1000 questions!",
      name: "Grace E.",
      school: "ABU (Law)",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAip5KtEFYd69EfAdH9vAMS1HjOpBBW2LtIpRaQqUQ4PeadpxB1FDQU4C3O9387sizaWqMVsg-fUvHthyBl12lx3U-Kh6Z3knqJIjfU15OiK1TAkYezIgfVI7fMKxPj0v75fLGwcKnHzraw3uy21fYmldh1L1IJ3oafoX2O5MvUBi3LQfaVWz0090Asc5oyNS15LSSNj2f22tkq1gfDY8LsK2suN17kBe1uMDDRziL9K4zB5eR5H7jEg6F1tSrkK5FMJVUMew4xlDvq",
      featured: false,
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-4">
            From Aspirants to Undergraduates
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            See how students are using JAMBPrep to crush their goals and gain admission into Nigeria's top universities.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <StoryCard key={index} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StoryCard = ({ story }) => {
  const cardClass = story.featured
    ? 'bg-primary p-8 rounded-3xl relative text-white'
    : 'bg-slate-50 dark:bg-slate-800 p-8 rounded-3xl relative';
  
  const quoteIconClass = story.featured
    ? 'bg-accent text-primary-dark'
    : 'bg-primary text-white';
  
  const textClass = story.featured
    ? 'text-green-50'
    : 'text-slate-600 dark:text-slate-300';
  
  const nameClass = story.featured
    ? 'text-white'
    : 'text-slate-900 dark:text-white';
  
  const schoolClass = story.featured
    ? 'text-accent'
    : 'text-primary';

  return (
    <div className={cardClass}>
      <div className={`absolute -top-4 -left-4 w-12 h-12 ${quoteIconClass} rounded-full flex items-center justify-center shadow-lg`}>
        <Icon name="format_quote" />
      </div>
      
      <p className={`${textClass} italic mb-8 leading-relaxed`}>
        "{story.quote}"
      </p>
      
      <div className="flex items-center gap-4">
        <img 
          alt={story.name} 
          className={`w-12 h-12 rounded-full object-cover ${story.featured ? 'border-2 border-white/30' : ''}`}
          src={story.image} 
        />
        <div>
          <h5 className={`font-bold ${nameClass}`}>{story.name}</h5>
          <p className={`text-xs ${schoolClass} font-black uppercase`}>{story.school}</p>
        </div>
      </div>
    </div>
  );
};
