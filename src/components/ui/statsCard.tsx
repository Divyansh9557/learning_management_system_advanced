import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative';
  gradient?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  change,
  changeType,
  gradient = 'from-blue-500 to-purple-600'
}) => {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={`text-sm font-medium mt-1 ${
                changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div
          className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg flex items-center justify-center`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
