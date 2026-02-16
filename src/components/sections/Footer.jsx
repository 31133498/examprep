import { Icon } from '../ui/Icon';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <Icon name="school" className="text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                JAMB<span className="text-primary">Prep</span>
              </span>
            </div>
            
            <p className="text-slate-400 max-w-sm mb-8">
              The most trusted JAMB preparation platform in Nigeria. Empowering students to achieve their academic dreams through technology.
            </p>
            
            <div className="flex gap-4">
              {['facebook-f', 'twitter', 'instagram'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social}
                >
                  <i className={`fab fa-${social}`} />
                </a>
              ))}
            </div>
          </div>
          
          <FooterColumn 
            title="Exam Tools"
            links={['CBT Simulator', 'Syllabus Guide', 'Novel Summaries', 'Past Questions']}
          />
          
          <FooterColumn 
            title="Company"
            links={['About Us', 'Careers', 'Contact', 'Privacy Policy']}
          />
          
          <div>
            <h5 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">Contact</h5>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <Icon name="email" size="sm" className="text-primary" />
                support@jambprep.com.ng
              </li>
              <li className="flex items-center gap-2">
                <Icon name="phone" size="sm" className="text-primary" />
                +234 800 123 4567
              </li>
              <li className="flex items-center gap-2">
                <Icon name="location_on" size="sm" className="text-primary" />
                Lagos, Nigeria
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          <p>© 2024 JAMBPrep Platform. All rights reserved. Not affiliated with JAMB Board.</p>
        </div>
      </div>
    </footer>
  );
};

const FooterColumn = ({ title, links }) => {
  return (
    <div>
      <h5 className="font-bold mb-6 uppercase text-sm tracking-widest text-primary">{title}</h5>
      <ul className="space-y-4 text-slate-400">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="hover:text-white transition-colors">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};
