export const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background-dark rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
              Ready to secure your admission?
            </h2>
            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
              Create your free account today and start with our diagnostic assessment to see where you stand.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a 
                className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-primary-dark transition-all shadow-xl shadow-primary/20" 
                href="#"
              >
                Create Free Account
              </a>
              <a 
                className="bg-white/10 text-white border border-white/20 px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/20 transition-all" 
                href="#"
              >
                View Pricing Plans
              </a>
            </div>
            
            <p className="mt-8 text-slate-500 font-medium">
              Join 2,400+ students who signed up today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
