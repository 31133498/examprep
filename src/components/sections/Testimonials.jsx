import { Icon } from '../ui/Icon';
import ChineduImg from '../../images/Chinedu.png';
import AminaImg from '../../images/Amina.png';

export const Testimonials = () => {
  const testimonials = [
    {
      quote: "The mock tests were almost identical to the actual exam. I scored 310 in my JAMB thanks to the consistent practice here!",
      name: "Chinelo Adebayo",
      school: "UNILAG Aspirant",
      image: ChineduImg,
    },
    {
      quote: "The analytics really helped me identify that my physics calculations were weak. I worked on them and saw my score jump from 210 to 285.",
      name: "Tunde Ibrahim",
      school: "UI Aspirant",
      image: AminaImg,
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
