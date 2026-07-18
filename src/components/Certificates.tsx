"use client";

import { motion } from "framer-motion";

export default function Certificates() {
  const certificates = [
    {
      id: 1,
      title: "Coursera Credential",
      url: "/certificates/Coursera-Certificate-1.pdf",
    },
    {
      id: 2,
      title: "Coursera Credential",
      url: "/certificates/Coursera-Certificate-2.pdf",
    }
  ];

  return (
    <section id="certificates" className="py-24 sm:py-32 border-t border-white/10 relative overflow-hidden">
      {/* subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white mb-4">
            Certificates
          </h2>
          <p className="font-mono text-sm sm:text-base text-white/50 max-w-2xl">
            Continuous learning and skill development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative"
            >
              <div className="relative h-[300px] sm:h-[400px] lg:h-[450px] rounded-xl overflow-hidden border border-white/10 bg-white/[0.02] flex flex-col">
                <div className="h-10 bg-black/40 border-b border-white/10 flex items-center px-4 font-mono text-xs text-white/50 tracking-wider uppercase">
                  {cert.title} {index + 1}
                </div>
                <div className="flex-1 w-full relative">
                  <iframe 
                    src={`${cert.url}#view=FitH&toolbar=0&navpanes=0`} 
                    className="absolute inset-0 w-full h-full border-none"
                    title={cert.title}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
