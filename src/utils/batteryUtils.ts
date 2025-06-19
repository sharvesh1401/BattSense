export interface SoHStatus {
  color: string;
  bg: string;
  status: string;
}

export const getSoHStatus = (soh: number): SoHStatus => {
  if (soh >= 0.9) return { color: 'text-green-600', bg: 'bg-green-50', status: 'Excellent' };
  if (soh >= 0.7) return { color: 'text-yellow-600', bg: 'bg-yellow-50', status: 'Good' };
  if (soh >= 0.5) return { color: 'text-orange-600', bg: 'bg-orange-50', status: 'Degraded' };
  return { color: 'text-red-600', bg: 'bg-red-50', status: 'Needs Replacement' };
};
