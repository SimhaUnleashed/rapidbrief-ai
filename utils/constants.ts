export const DEMO_SUMMARY = `
# 🎨 Your Quick Guide to Killer Tailwind CSS Layouts! 🚀
❤️ Master Tailwind CSS with this cheat sheet and build beautiful, responsive designs in a flash!
✨ Quickly reference common classes for layout, typography, backgrounds, and more.

# Document Details
📄 Type: Cheat Sheet
👥 For: Web Developers & Designers

# Key Highlights
. 📍 Layout classes for container, display, flexbox, and grid.
. 📌 Typography styles for font size, weight, alignment, and color.
. 💡 Background, border, sizing, and positioning utilities.

# Why It Matters
- Tailwind CSS makes styling web pages incredibly fast and consistent. This cheat sheet gives you the essential classes at your fingertips, so you can spend less time searching and more time building amazing interfaces.

# Main Points
. 🌱 Easily control spacing with margin, padding, and space-between utilities.
. 💪 Create responsive designs using breakpoint prefixes like \`sm:\`, \`md:\`, \`lg:\`, \`xl:\`, and \`2xl:\`.
. 🏆 Achieve polished effects with transitions, transforms, and interactivity classes.

# Pro Tips
. ⭐ Use arbitrary values (e.g., \`w-[450px]\`) for custom sizing and positioning.
. 💎 Leverage hover/focus states (e.g., \`hover:bg-blue-700\`) for interactive elements.
. ✨ Explore dark mode variants (e.g., \`dark:bg-gray-800\`) for stunning themes.

# Key Terms to Know
. 📚 Flexbox: A CSS layout model that provides an efficient way to align and distribute space among items in a container.
. 📖 Breakpoints: Specific screen widths (e.g., \`sm:\`, \`md:\`) used to apply different styles for various devices.

# Bottom Line
. 🔥 Tailwind CSS empowers you to craft stunning, responsive web designs with ease—this cheat sheet is your essential companion!
`;

export const pricingPlans = [
    {
        name:'Basic',
        price:9,
        description:'Perfect for occasional use',
        items:[
            '5 PDF summaries per month',
            'Standard processing speed',
            'Email support',],
        id:'basic',
        paymentLink:'https://buy.stripe.com/test_9B64gB7m62Oxg1f4rS5J601',
        priceId:'price_1RRUxCSAQsJqpqrI4twI69wI'
    },
    {
        name:'Pro',
        price:19,
        description:'For Professionals and teams',
        items:[
            'Unlimited PDF summaries ',
            'Priority processing',
            '24/7 priority support',
            'Markdown Export'],
        id:'pro',
        paymentLink:'https://buy.stripe.com/test_00wdRb7m6agZaGVcYo5J600',
        priceId: 'price_1RRUxCSAQsJqpqrIcoAy5jLR'
    }
]

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden:{opacity:0,y:20},
  visible:{opacity:1,
    transition:{
      type:"spring",
      damping:15,
      stiffness:50,
      duration:0.8
    }
  }
}

export const buttonVariants = {
  scale:1.05,
  transition: {
    type:"spring",
    damping:10,
    stiffness:300
  }
}

export const listVariant = {
  hidden:{opacity:0,x:-20},
  visible:{
    opacity:1,
    x:0,
    transition:{
      type:"spring",
      damping:20,
      stiffness:100,
    }
  }
}