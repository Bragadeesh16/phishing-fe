import { motion } from 'framer-motion';
import { Shield, Lock, ShieldAlert, Scan, AlertCircle } from 'lucide-react';
import React from 'react';

const Matrix = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-10">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-emerald-500 font-mono text-sm whitespace-nowrap"
          style={{
            left: `${Math.random() * 100}%`,
            top: -20,
          }}
          initial={{ y: -100 }}
          animate={{ y: '100vh' }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...Array(20)].map(() => Math.random().toString(36).charAt(2)).join('')}
        </motion.div>
      ))}
    </div>
  );
};

const HexGrid = () => {
  const hexagons = Array(80).fill(0);
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      {hexagons.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-16 h-16 border-2 border-emerald-500/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            rotate: [0, 90, 180]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

const CircuitLines = () => {
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-0.5 bg-gradient-to-r from-emerald-500/0 via-emerald-500 to-emerald-500/0"
          style={{
            top: `${(i + 1) * 8}%`,
            left: '0',
            width: '100%'
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{
            scaleX: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const GlitchText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [glitchText, setGlitchText] = React.useState(text);
  
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.8) {
        const glitched = text
          .split('')
          .map(char => Math.random() > 0.8 ? String.fromCharCode(Math.random() * 20 + 33) : char)
          .join('');
        setGlitchText(glitched);
        setTimeout(() => setGlitchText(text), 100);
      }
    }, 100);
    
    return () => clearInterval(glitchInterval);
  }, [text]);

  return (
    <motion.div
      className="relative text-2xl font-mono text-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay }}
    >
      <motion.span
        className="absolute inset-0 text-red-500"
        animate={{
          x: [-2, 2, -2],
          y: [1, -1, 1],
          opacity: [1, 0.8, 1]
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity
        }}
      >
        {glitchText}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-blue-500"
        animate={{
          x: [2, -2, 2],
          y: [-1, 1, -1],
          opacity: [1, 0.8, 1]
        }}
        transition={{
          duration: 0.15,
          repeat: Infinity,
          delay: 0.05
        }}
      >
        {glitchText}
      </motion.span>
      <span className="relative">{glitchText}</span>
    </motion.div>
  );
};

const CoreAnimation = () => {
  const [currentIcon, setCurrentIcon] = React.useState(0);
  const icons = [Shield, Lock, ShieldAlert, Scan, AlertCircle];
  const Icon = icons[currentIcon];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.div
        className="absolute -inset-32 opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(10,10,15,0) 70%)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="relative w-32 h-32"
        animate={{
          rotate: 360
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 border-2 border-emerald-500/30 rounded-full"
            style={{
              transform: `rotate(${i * 45}deg)`
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut"
            }}
          />
        ))}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            scale: [0.8, 1, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Icon className="w-16 h-16 text-emerald-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};

const LoadingProgress = () => {
  const [progress, setProgress] = React.useState(0);
  const [phase, setPhase] = React.useState(0);
  const phases = [
    "INITIALIZING SYSTEM",
    "SCANNING NETWORK",
    "ANALYZING THREATS",
    "UPDATING SECURITY",
    "FINALIZING PROTOCOLS"
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          setPhase(p => (p + 1) % phases.length);
          return 0;
        }
        return prev + 0.5;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-8 w-96">
      <GlitchText text={phases[phase]} delay={0.5} />
      <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-emerald-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      <motion.div 
        className="mt-2 text-right font-mono text-sm text-emerald-500"
        animate={{
          opacity: [1, 0.5, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      >
        {progress.toFixed(1)}%
      </motion.div>
    </div>
  );
};

const StatusMessages = () => {
  const messages = [
    "DETECTING THREATS...",
    "ANALYZING NETWORK TRAFFIC...",
    "SCANNING FOR VULNERABILITIES...",
    "UPDATING SECURITY PROTOCOLS...",
    "MONITORING SYSTEM INTEGRITY..."
  ];
  const [currentMessage, setCurrentMessage] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="text-emerald-500/70 text-sm font-mono mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      {messages[currentMessage]}
    </motion.div>
  );
};

export default function LoadingScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#0a0a0f] overflow-hidden">
      <Matrix />
      <HexGrid />
      <CircuitLines />
      <div className="relative z-10 flex flex-col items-center">
        <CoreAnimation />
        <div className="mt-12 space-y-4">
          <LoadingProgress />
          <StatusMessages />
        </div>
      </div>
    </div>
  );
}