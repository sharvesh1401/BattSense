export interface SoHStatus {
  color: string;
  bg: string;
  status: string;
}

export const getSoHStatus = (soh: number): SoHStatus => {
  if (soh >= 0.9) return { color: 'text-highlight', bg: 'bg-highlight/10', status: 'Excellent' };
  if (soh >= 0.8) return { color: 'text-primary', bg: 'bg-primary/10', status: 'Good' }; // Using primary for "Good"
  if (soh >= 0.6) return { color: 'text-yellow-400', bg: 'bg-yellow-500/10', status: 'Moderate' }; // Tailwind yellow
  if (soh >= 0.4) return { color: 'text-orange-400', bg: 'bg-orange-500/10', status: 'Poor' }; // Tailwind orange
  return { color: 'text-red-400', bg: 'bg-red-500/10', status: 'Critical' }; // Tailwind red
};
