import { Icon } from '../ui/Icon';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "The mock tests were almost identical to the actual exam. I scored 310 in my JAMB thanks to the consistent practice here!",
      name: "Chinelo Adebayo",
      school: "UNILAG Aspirant",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCdBLBmrPGbeWiUn3TO9bRjf0IKkNhyuEqYnLU3wsBsNDgw2vYKQKdKXydS8jsA_bub7rk93ilu1q4dkxSNCxtiJ44O-bst4YFo38G48j8CXMd9o9HxbIbUPUM2BpabqbmmQh21EjCgQgNtpxahl9yt2COklc66K9FKHo_mUXFTL7hP5tCy9Q7nwpmsXpj5iI8nehTn5byEvnxE0y-MgH56yzx0huOrJ3hC6pVl5ijzEFrcDDe0zecy1Z_cbc74GDzgShNc8OJXn8r",
    },
    {
      quote: "The analytics really helped me identify that my physics calculations were weak. I worked on them and saw my score jump from 210 to 285.",
      name: "Tunde Ibrahim",
      school: "UI Aspirant",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBqTrFr1LjaTsQZR6RZA4_7RE4B8BkO_YJFrPmBzORabz1X9bF8rf5vY0kib9-MSOw01ar3AzswzvWBv_sIgpKrCVRdGFHG83z9mU-PIjHpmL5KanjHOM-n0TsmrkBqzxDbr-EldJ4J1XRZpziNyLixJgBjIl85DgrjkBwq6HMF1redJwKxr5jEFFPOSq8kg2qa6ez3Kq_pE53Mb8Sy-ompIW62BG4vQSbim-vjlZIG8BrSrEh7uwPUlakrX1yFT45XOnKaslHpijDm",
    },
  ];
  
  const leaderboard = [
    { rank: 1, name: 'Buchi K.', score: 342, color: 'bg-yellow-400' },
    { rank: 2, name: 'Sarah O.', score: 338, color: 'bg-slate-300' },
    { rank: 3, name: 'David W.', score: 335, color: 'bg-orange-400' },
  ];
  
  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-[2rem] p-8 md:p-16 relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Icon name="format_quote" className="text-white text-[120px]" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">What our Top Scorers are saying</h2>
              
              <div className="space-y-8">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="flex gap-4">
                    <img 
                      className="w-14 h-14 rounded-full border-2 border-white/30 object-cover" 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                    />
                    <div>
                      <p className="text-lg text-white/90 italic mb-2">"{testimonial.quote}"</p>
                      <p className="font-bold text-white">
                        {testimonial.name} <span className="text-white/60 font-medium ml-2">— {testimonial.school}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-white font-bold">Weekly Ranking</span>
                  <span className="bg-white text-primary px-3 py-1 rounded-full text-xs font-bold">LIVE</span>
                </div>
                
                <div className="space-y-4">
                  {leaderboard.map((entry) => (
                    <div key={entry.rank} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10">
                      <div className="flex items-center gap-3">
                        <span className="text-white/60 font-bold">{entry.rank.toString().padStart(2, '0')}</span>
                        <div className={`w-8 h-8 rounded-full ${entry.color}`} />
                        <span className="text-white font-medium">{entry.name}</span>
                      </div>
                      <span className="text-white font-bold">{entry.score}</span>
                    </div>
                  ))}
                </div>
                
                <button className="w-full mt-6 py-3 border border-white/30 rounded-xl text-white font-bold hover:bg-white/10 transition-colors">
                  Join the Ranking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
