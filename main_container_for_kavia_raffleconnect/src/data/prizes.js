// Mock prize data for the Kavia RaffleConnect application

const prizes = [
  {
    id: 1,
    name: 'Kavia Pro AI License',
    description: 'One year premium subscription to Kavia Pro AI with unlimited access to all features',
    image: 'https://via.placeholder.com/300x200?text=Kavia+Pro+AI',
    value: '$1200',
    category: 'software'
  },
  {
    id: 2,
    name: 'MacBook Pro M2',
    description: 'Latest MacBook Pro with M2 chip, 16GB RAM and 512GB storage',
    image: 'https://via.placeholder.com/300x200?text=MacBook+Pro',
    value: '$2499',
    category: 'hardware'
  },
  {
    id: 3,
    name: 'AI Conference Ticket',
    description: 'All-access pass to the Kavia AI Innovation Summit with workshops and networking events',
    image: 'https://via.placeholder.com/300x200?text=AI+Conference',
    value: '$999',
    category: 'event'
  },
  {
    id: 4,
    name: 'Kavia AI Development Kit',
    description: 'Complete developer kit with tools and resources to build with Kavia AI',
    image: 'https://via.placeholder.com/300x200?text=Dev+Kit',
    value: '$499',
    category: 'software'
  },
  {
    id: 5,
    name: 'AI-Powered Smart Speaker',
    description: 'Premium smart speaker with Kavia AI integration for voice commands',
    image: 'https://via.placeholder.com/300x200?text=Smart+Speaker',
    value: '$299',
    category: 'hardware'
  },
  {
    id: 6,
    name: 'One-on-One AI Consultation',
    description: 'Personal consultation with a Kavia AI expert to optimize your workflows',
    image: 'https://via.placeholder.com/300x200?text=AI+Consultation',
    value: '$750',
    category: 'service'
  }
];

// Categories for filtering prizes
export const prizeCategories = [
  { id: 'all', label: 'All Prizes' },
  { id: 'software', label: 'Software' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'event', label: 'Events' },
  { id: 'service', label: 'Services' }
];

export default prizes;
