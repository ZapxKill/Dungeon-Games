import { Footprints, FlaskConical, Skull, Sword, TrendingUp, Shield, Crown, X, Award, Trophy, Target, Zap, Star, Swords, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import playerBg from "../../assets/player-bg.png"; // 多加一個 ../ 來跳出兩層資料夾
import stepsImg from "../../assets/steps.png";
import potionImg from "../../assets/potion.png";
import monsterImg from "../../assets/monster.png";
import equipmentImg from "../../assets/equipment.png";
import characterImg from "../../assets/character.png";


interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  subtitle?: string;
  imageUrl?: string;
}

function StatCard({ icon, label, value, subtitle, imageUrl }: StatCardProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <>
      <div className="relative bg-[#f4e8d0] border-4 border-[#8b6f47] rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="absolute -top-3 -left-3 bg-[#8b6f47] rounded-full p-2 border-4 border-[#f4e8d0]">
          <div className="text-[#f4e8d0]">
            {icon}
          </div>
        </div>
        
        {/* Image Section - Click to Enlarge */}
        {imageUrl && (
          <div className="mt-4 mb-4 flex justify-center">
            <img
              src={imageUrl}
              alt={label}
              className="w-32 h-32 object-cover rounded-lg border-2 border-[#8b6f47] cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setIsEnlarged(true)}
            />
          </div>
        )}
        
        <div className="mt-4 text-center">
          <div className="text-[#2c1810] opacity-70 text-sm mb-2" style={{ fontFamily: 'Spectral, serif' }}>
            {label}
          </div>
          <div className="text-4xl text-[#8b6f47] mb-1" style={{ fontFamily: 'Cinzel, serif' }}>
            {value}
          </div>
          {subtitle && (
            <div className="text-xs text-[#2c1810] opacity-60" style={{ fontFamily: 'Spectral, serif' }}>
              {subtitle}
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && imageUrl && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setIsEnlarged(false)}
              className="absolute -top-4 -right-4 bg-[#8b6f47] text-[#f4e8d0] rounded-full p-2 hover:bg-[#6d5837] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={imageUrl}
              alt={label}
              className="max-w-full max-h-[85vh] object-contain rounded-lg border-4 border-[#8b6f47] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

interface AchievementProps {
  completed: boolean;
  name: string;
  description: string;
  icon: React.ReactNode;
  imageUrl?: string;
}

function Achievement({ completed, name, description, icon, imageUrl }: AchievementProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <>
      <div 
        className={`relative bg-[#e8dcc0] border-3 rounded-lg p-4 transition-all ${
          completed 
            ? 'border-[#d4af37] shadow-lg hover:shadow-xl' 
            : 'border-[#8b6f47] opacity-60 hover:opacity-80'
        }`}
      >
        {/* Achievement Content */}
        <div className="flex flex-col items-center gap-3">
          
          {/* Achievement Image - Click to Enlarge */}
          {imageUrl && completed && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt={name}
                className="w-32 h-32 object-cover rounded-lg border-2 border-[#8b6f47] cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsEnlarged(true)}
              />
            </div>
          )}
          
          {/* Locked achievement placeholder */}
          {!completed && (
            <div className="mt-2 w-32 h-32 bg-[#c4b4a0] rounded-lg border-2 border-[#8b6f47] flex items-center justify-center">
              <HelpCircle className="w-16 h-16 text-[#8b6f47] opacity-50" />
            </div>
          )}
          
          {/* Achievement Name */}
          <div className="text-center">
            <h3 
              className={`text-lg mb-1 ${completed ? 'text-[#8b6f47]' : 'text-[#8b6f47] opacity-50'}`}
              style={{ fontFamily: 'Cinzel, serif' }}
            >
              {completed ? name : '???'}
            </h3>
            <p 
              className={`text-sm ${completed ? 'text-[#2c1810] opacity-70' : 'text-[#2c1810] opacity-40'}`}
              style={{ fontFamily: 'Spectral, serif' }}
            >
              {completed ? description : 'Locked Achievement'}
            </p>
          </div>
        </div>
        
        {/* Completion ribbon */}
        {completed && (
          <div className="absolute -top-2 -right-2">
            <div className="bg-[#d4af37] rounded-full p-1 border-2 border-[#8b6f47] shadow-md">
              <Star className="w-4 h-4 text-[#2c1810]" fill="#2c1810" />
            </div>
          </div>
        )}
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && imageUrl && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              onClick={() => setIsEnlarged(false)}
              className="absolute -top-4 -right-4 bg-[#8b6f47] text-[#f4e8d0] rounded-full p-2 hover:bg-[#6d5837] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={imageUrl}
              alt={name}
              className="max-w-full max-h-[85vh] object-contain rounded-lg border-4 border-[#8b6f47] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}

export function RPGProfile() {
  const stats = {
    stepsTaken: 45327,
    potionsConsumed: 183,
    monstersSlain: 892,
    equipmentCollected: 347,
    level: 42,
    levelProgress: 68
  };

  // Player information - easily customizable
  const playerName = "Rizzler";
  const characterImageUrl = characterImg;
  // Achievements - easily customizable
  const achievements = [
    {
      completed: true,
      name: "First Steps",
      description: "Take your first 100 steps",
      icon: <Footprints className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=First+Steps"
    },
    {
      completed: true,
      name: "Monster Hunter",
      description: "Defeat 500 monsters",
      icon: <Swords className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Monster+Hunter"
    },
    {
      completed: true,
      name: "Potion Master",
      description: "Consume 100 potions",
      icon: <FlaskConical className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Potion+Master"
    },
    {
      completed: false,
      name: "Legendary Warrior",
      description: "Reach level 50",
      icon: <Trophy className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Legendary+Warrior"
    },
    {
      completed: true,
      name: "Treasure Seeker",
      description: "Collect 200 items",
      icon: <Award className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Treasure+Seeker"
    },
    {
      completed: false,
      name: "Speed Demon",
      description: "Take 100,000 steps",
      icon: <Zap className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Speed+Demon"
    },
    {
      completed: false,
      name: "Perfect Aim",
      description: "Hit 1000 critical strikes",
      icon: <Target className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Perfect+Aim"
    },
    {
      completed: true,
      name: "Elite Champion",
      description: "Defeat a legendary boss",
      icon: <Crown className="w-10 h-10" />,
      imageUrl: "https://via.placeholder.com/300x300?text=Elite+Champion"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#3a2817] via-[#5c4a3a] to-[#3a2817] p-8 flex items-center justify-center">
      {/* Main Character Sheet */}
      <div className="max-w-6xl w-full">
        {/* Parchment Background with Decorative Border */}
<div 
  className="relative rounded-lg shadow-2xl " 
  style={{ 
    backgroundImage: `url(${playerBg})`,
    backgroundSize: '120% 120%', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent' // 務必加上這行，確保米色不會跑出來
  }}
>
          {/* Decorative Corner Ornaments */}
          <div className="absolute top-0 left-0 w-24 h-24">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b6f47] opacity-60">
              <path d="M 0 0 L 100 0 L 80 20 L 20 20 L 0 40 Z" fill="currentColor" />
              <path d="M 0 0 L 0 100 L 20 80 L 20 20 L 40 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b6f47] opacity-60">
              <path d="M 0 0 L 100 0 L 80 20 L 20 20 L 0 40 Z" fill="currentColor" />
              <path d="M 0 0 L 0 100 L 20 80 L 20 20 L 40 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-24 h-24 -rotate-90">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b6f47] opacity-60">
              <path d="M 0 0 L 100 0 L 80 20 L 20 20 L 0 40 Z" fill="currentColor" />
              <path d="M 0 0 L 0 100 L 20 80 L 20 20 L 40 0 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 rotate-180">
            <svg viewBox="0 0 100 100" className="w-full h-full text-[#8b6f47] opacity-60">
              <path d="M 0 0 L 100 0 L 80 20 L 20 20 L 0 40 Z" fill="currentColor" />
              <path d="M 0 0 L 0 100 L 20 80 L 20 20 L 40 0 Z" fill="currentColor" />
            </svg>
          </div>

          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-lg border-8 border-[#8b6f47] pointer-events-none" />
          <div className="absolute inset-3 rounded-lg border-2 border-[#8b6f47] opacity-40 pointer-events-none" />

          {/* Content */}
          <div className="relative p-12 pt-16">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="w-8 h-8 text-[#d4af37]" />
                <h1 
                  className="text-5xl text-[#2c1810]"
                  style={{ fontFamily: 'Cinzel, serif' }}
                >
                  Character Profile
                </h1>
                <Crown className="w-8 h-8 text-[#d4af37]" />
              </div>
              <div className="w-32 h-1 bg-[#8b6f47] mx-auto mb-4" />
              <p 
                className="text-xl text-[#5c4a3a]"
                style={{ fontFamily: 'Spectral, serif' }}
              >
                Adventurer's Chronicle
              </p>
            </div>

            {/* Character Portrait and Name Section */}
            <div className="mb-10 flex flex-col items-center">
              {/* Character Portrait */}
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#8b6f47] rounded-lg transform rotate-3"></div>
                <div className="relative bg-[#e8dcc0] border-4 border-[#8b6f47] rounded-lg p-3 shadow-xl">
                  <img
                    src={characterImageUrl}
                    alt="Character Portrait"
                    className="w-48 h-48 object-cover rounded border-2 border-[#8b6f47]"
                  />
                  {/* Corner decorations on portrait */}
                  <div className="absolute top-1 left-1 w-6 h-6 border-t-2 border-l-2 border-[#8b6f47]"></div>
                  <div className="absolute top-1 right-1 w-6 h-6 border-t-2 border-r-2 border-[#8b6f47]"></div>
                  <div className="absolute bottom-1 left-1 w-6 h-6 border-b-2 border-l-2 border-[#8b6f47]"></div>
                  <div className="absolute bottom-1 right-1 w-6 h-6 border-b-2 border-r-2 border-[#8b6f47]"></div>
                </div>
              </div>

              {/* Player Name Banner */}
              <div className="relative">
                <div className="bg-[#8b6f47] px-12 py-4 rounded-lg border-4 border-[#6d5837] shadow-lg">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="bg-[#d4af37] px-4 py-1 rounded-full border-2 border-[#8b6f47]">
                      <span 
                        className="text-xs text-[#2c1810]"
                        style={{ fontFamily: 'Spectral, serif' }}
                      >
                        Hero Name
                      </span>
                    </div>
                  </div>
                  <h2 
                    className="text-3xl text-[#f4e8d0] text-center"
                    style={{ fontFamily: 'Cinzel, serif' }}
                  >
                    {playerName}
                  </h2>
                </div>
                {/* Decorative ribbons on sides */}
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-[#d4af37] border-2 border-[#8b6f47]" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}></div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-12 bg-[#d4af37] border-2 border-[#8b6f47]" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}></div>
              </div>
            </div>

            {/* Level Display */}
            <div className="mb-10 max-w-md mx-auto">
              <div className="bg-[#e8dcc0] border-4 border-[#8b6f47] rounded-lg p-6 text-center shadow-lg">
                <div className="flex items-center justify-center gap-4 mb-3">
                  <Shield className="w-8 h-8 text-[#8b6f47]" />
                  <div>
                    <div 
                      className="text-sm text-[#2c1810] opacity-70 mb-1"
                      style={{ fontFamily: 'Spectral, serif' }}
                    >
                      Current Level
                    </div>
                    <div 
                      className="text-5xl text-[#8b6f47]"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {stats.level}
                    </div>
                  </div>
                  <Shield className="w-8 h-8 text-[#8b6f47]" />
                </div>
                
                {/* Level Progress Bar */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-sm text-[#2c1810] opacity-70"
                      style={{ fontFamily: 'Spectral, serif' }}
                    >
                      Progress to Level {stats.level + 1}
                    </span>
                    <span 
                      className="text-sm text-[#8b6f47]"
                      style={{ fontFamily: 'Cinzel, serif' }}
                    >
                      {stats.levelProgress}%
                    </span>
                  </div>
                  <div className="relative h-6 bg-[#d4c4a8] rounded-full border-2 border-[#8b6f47] overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f4d03f] transition-all duration-500"
                      style={{ width: `${stats.levelProgress}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-[#8b6f47]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={<Footprints className="w-6 h-6" />}
                label="Steps Taken"
                value={stats.stepsTaken.toLocaleString()}
                subtitle="Distance traveled"
                imageUrl={stepsImg}
              />
              <StatCard
                icon={<FlaskConical className="w-6 h-6" />}
                label="Potions Consumed"
                value={stats.potionsConsumed}
                subtitle="Elixirs & brews"
                imageUrl={potionImg}
              />
              <StatCard
                icon={<Skull className="w-6 h-6" />}
                label="Monsters Slain"
                value={stats.monstersSlain}
                subtitle="Enemies defeated"
                imageUrl={monsterImg}
              />
              <StatCard
                icon={<Sword className="w-6 h-6" />}
                label="Equipment Collected"
                value={stats.equipmentCollected}
                subtitle="Items gathered"
                imageUrl={equipmentImg}
              />
            </div>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {achievements.map((achievement, index) => (
                <Achievement
                  key={index}
                  completed={achievement.completed}
                  name={achievement.name}
                  description={achievement.description}
                  icon={achievement.icon}
                  imageUrl={achievement.imageUrl}
                />
              ))}
            </div>

            {/* Footer Flourish */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-[#8b6f47]" />
              <div className="text-[#8b6f47] opacity-60">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 5 L25 15 L35 20 L25 25 L20 35 L15 25 L5 20 L15 15 Z" />
                  <circle cx="20" cy="20" r="3" fill="#f4e8d0" />
                </svg>
              </div>
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-[#8b6f47]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}