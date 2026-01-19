import React, { useState } from 'react';
import { ViewState } from '../types';
import { ChevronLeft, Camera, UserPlus, Check, Grid, Users } from 'lucide-react';
import { MOCK_USER, MOCK_ENTRIES, MOCK_FOLLOWERS } from '../constants';

interface ProfileViewProps {
  setView: (view: ViewState) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ setView }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'memories' | 'followers'>('memories');

  return (
    <div className="h-full bg-gradient-to-b from-[#FAE37C] via-[#C1E9D2] to-[#5D9BEC] flex flex-col overflow-y-auto relative text-[#423E37]">
        {/* Texture Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] mix-blend-multiply fixed"></div>

        {/* Back Navigation */}
        <div className="absolute top-0 left-0 w-full p-6 pt-12 z-20">
            <button 
                onClick={() => setView(ViewState.COMMUNITY)}
                className="w-10 h-10 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm text-[#423E37]"
            >
                <ChevronLeft size={24} />
            </button>
        </div>

        {/* Header Image */}
        <div className="w-full h-64 relative z-0">
            <img src={MOCK_USER.coverImage} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAE37C] via-transparent to-transparent"></div>
        </div>

        {/* Profile Content */}
        <div className="px-6 -mt-12 z-10 pb-24">
            <div className="flex justify-between items-end mb-4">
                <div className="w-24 h-24 rounded-full border-4 border-[#FAE37C] overflow-hidden shadow-lg bg-white">
                    <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex gap-2 mb-2">
                    <button 
                        onClick={() => setIsFollowing(!isFollowing)}
                        className={`px-4 py-2 rounded-full text-xs font-bold shadow-md flex items-center gap-1 transition-all ${isFollowing ? 'bg-white text-[#423E37]' : 'bg-[#423E37] text-[#FAE37C]'}`}
                    >
                        {isFollowing ? (
                             <><Check size={14}/> Following</>
                        ) : (
                             <><UserPlus size={14}/> Follow</>
                        )}
                    </button>
                    <button className="bg-white/60 text-[#423E37] border border-[#423E37]/10 px-4 py-2 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm">
                        Edit
                    </button>
                </div>
            </div>

            <h1 className="font-handwriting text-4xl mb-1">{MOCK_USER.name}</h1>
            <p className="font-serif text-sm opacity-70 italic mb-6">{MOCK_USER.bio}</p>

            {/* Follower Stats */}
            <div className="flex gap-6 mb-6 px-2">
                <div className="flex flex-col cursor-pointer hover:opacity-70" onClick={() => setActiveTab('followers')}>
                    <span className="font-bold text-lg font-sans">{MOCK_USER.followers}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">Followers</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-lg font-sans">{MOCK_USER.following}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">Following</span>
                </div>
                <div className="flex flex-col cursor-pointer hover:opacity-70" onClick={() => setActiveTab('memories')}>
                    <span className="font-bold text-lg font-sans">{MOCK_ENTRIES.length}</span>
                    <span className="text-[10px] uppercase tracking-widest opacity-50">Posts</span>
                </div>
            </div>

            {/* Info Stats Cards */}
            <div className="grid grid-cols-3 gap-2 mb-8">
                <div className="bg-white/40 p-3 rounded-xl text-center border border-white/50 backdrop-blur-sm">
                    <span className="block text-[10px] uppercase tracking-widest opacity-50">Age</span>
                    <span className="font-bold font-sans">{MOCK_USER.age}</span>
                </div>
                <div className="bg-white/40 p-3 rounded-xl text-center border border-white/50 backdrop-blur-sm">
                    <span className="block text-[10px] uppercase tracking-widest opacity-50">Breed</span>
                    <span className="font-bold text-xs leading-5 font-sans">{MOCK_USER.breed}</span>
                </div>
                <div className="bg-white/40 p-3 rounded-xl text-center border border-white/50 backdrop-blur-sm">
                    <span className="block text-[10px] uppercase tracking-widest opacity-50">Weight</span>
                    <span className="font-bold font-sans">{MOCK_USER.weight}</span>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-[#423E37]/10 mb-4">
                <button 
                    onClick={() => setActiveTab('memories')}
                    className={`flex-1 py-2 flex justify-center items-center gap-2 ${activeTab === 'memories' ? 'border-b-2 border-[#423E37] text-[#423E37]' : 'text-[#423E37]/40'}`}
                >
                    <Grid size={18} />
                </button>
                <button 
                    onClick={() => setActiveTab('followers')}
                    className={`flex-1 py-2 flex justify-center items-center gap-2 ${activeTab === 'followers' ? 'border-b-2 border-[#423E37] text-[#423E37]' : 'text-[#423E37]/40'}`}
                >
                    <Users size={18} />
                </button>
            </div>

            {/* Content Section */}
            <div>
                {activeTab === 'memories' ? (
                    <div className="grid grid-cols-3 gap-1.5 animate-in fade-in zoom-in-95 duration-300">
                        {MOCK_ENTRIES.map((entry) => (
                            <div key={entry.id} className="aspect-square relative group overflow-hidden rounded-lg bg-white/30">
                                <img src={entry.imageUrl} alt="Cat" className="w-full h-full object-cover" />
                            </div>
                        ))}
                        <div className="aspect-square bg-black/5 rounded-lg flex items-center justify-center">
                            <Camera size={20} className="opacity-30" />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                        {MOCK_FOLLOWERS.map((follower) => (
                            <div key={follower.id} className="flex items-center justify-between bg-white/40 p-3 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <img src={follower.avatar} alt={follower.name} className="w-10 h-10 rounded-full object-cover border border-white" />
                                    <span className="font-bold text-sm">{follower.name}</span>
                                </div>
                                <button className="text-xs bg-white/60 px-3 py-1 rounded-full font-bold shadow-sm">Remove</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};