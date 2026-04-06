import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const childVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const AnimationWrapper = ({ children, className = '', fullHeight = false, noStagger = false }) => {
  // Use container variants for groups, child variants for single elements
  const selectedVariants = noStagger ? childVariants : containerVariants;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={selectedVariants}
      style={fullHeight ? { height: '100vh' } : {}}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;