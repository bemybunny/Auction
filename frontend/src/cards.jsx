import Dhoni from '../public/Dhoni.webp';
import AshishNehra from '../public/Ashish-Nehra.jpg';
import sachin from '../public/sachin.jpeg';
import SureshRaina from '../public/Suresh-Raina.jpeg';
import ViratKohli from '../public/Virat-Kohli.jpeg';
import Yuvraj from '../public/Yuvraj.jpeg';

const cards = [
  {
    id: 1,
    playerName: 'MS Dhoni',
    image: Dhoni,
    basePrice: 1000000,
    creditScore: 85,
    recentPerformance: 'Outstanding performance in the last series.',
  },
  {
    id: 2,
    playerName: 'Ashish Nehra',
    image: AshishNehra,
    basePrice: 750000,
    creditScore: 78,
    recentPerformance: 'Consistent wicket-taking ability.',
  },
  {
    id: 3,
    playerName: 'Sachin Tendulkar',
    image: sachin,
    basePrice: 1500000,
    creditScore: 95,
    recentPerformance: 'Highest run-scorer in the previous tournament.',
  },
  {
    id: 4,
    playerName: 'Suresh Raina',
    image: SureshRaina,
    basePrice: 1200000,
    creditScore: 80,
    recentPerformance: 'Aggressive batting in T20 matches.',
  },
  {
    id: 5,
    playerName: 'Virat Kohli',
    image: ViratKohli,
    basePrice: 2000000,
    creditScore: 90,
    recentPerformance: 'Consistent across all formats.',
  },
  {
    id: 6,
    playerName: 'Yuvraj Singh',
    image: Yuvraj,
    basePrice: 900000,
    creditScore: 75,
    recentPerformance: 'Notable contributions in the previous series.',
  },
];

export default cards;