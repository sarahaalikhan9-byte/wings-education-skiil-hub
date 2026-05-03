import React from "react";
import { motion } from "motion/react";
import { Shield, Target, Award, Rocket } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-32 px-8 bg-midnight-black">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-black mb-6 italic tracking-tighter">
            ABOUT <span className="text-gold">WINGS GLOBAL</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Empowering the next generation with AI-driven education and skill mastery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Shield, title: "Secure Data", desc: "Your privacy is our priority with military-grade encryption." },
            { icon: Target, title: "Precision Learning", desc: "Adaptive AI tailoring every lesson to your unique pace." },
            { icon: Award, title: "Global Skills", desc: "Recognized certificates for the competitive modern market." },
            { icon: Rocket, title: "Future Ready", desc: "Preparing students for the AI-driven world of tomorrow." }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-all group"
            >
              <item.icon className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
