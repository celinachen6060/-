import React, { useEffect, useState } from 'react';
import { ViewState, DailyTopic, CommunityPost } from '../types';
import { Heart, MoreHorizontal, Send, ChevronRight, X } from 'lucide-react';
import { MOCK_COMMUNITY_POSTS, MOCK_USER, MOCK_DAILY_COMMENTS } from '../constants';
import { getDailyCatTopic } from '../services/geminiService';

interface CommunityViewProps {
  setView: (view: ViewState) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ setView }) => {
  const [dailyTopic, setDailyTopic] = useState<DailyTopic | null>(null);
  const [loadingTopic, setLoadingTopic] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [expandedPost, setExpandedPost] = useState<CommunityPost | null>(null);

  useEffect(() => {
    const fetchTopic = async () => {
        setLoadingTopic(true);
        const topic = await getDailyCatTopic();
        setDailyTopic(topic);
        setLoadingTopic(false);
    };
    fetchTopic();
  }, []);

  const handleSendReply = () => {
      if (!replyText.trim()) return;
      alert("Reply posted to community!");
      setReplyText("");
      setIsReplying(false);
  }

  return (
    <div className="h-full bg-gradient-to-b from-[#FAE37C] via-[#C1E9D2] to-[#5D9BEC] flex flex-col pt-12 pb-24 overflow-y-auto relative text-[#423E37]">
      
      {/* Header with Avatar */}
      <div className="flex justify-between items-center px-6 mb-6">
        <h1 className="font-handwriting text-3xl">Square</h1>
        <button 
            onClick={() => setView(ViewState.PROFILE)}
            className="w-10 h-10 rounded-full border-2 border-white/50 overflow-hidden shadow-sm hover:scale-105 transition-transform"
        >
            <img src={MOCK_USER.avatar} alt="Profile" className="w-full h-full object-cover" />
        </button>
      </div>

      {/* Daily Question Card - Interactive */}
      <div className="px-6 mb-8">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl p-1 shadow-xl">
            <div className="bg-white/50 rounded-xl p-5 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                     <span className="text-[#423E37] text-[10px] uppercase tracking-widest border border-[#423E37] px-2 py-0.5 rounded-full font-bold">Daily Topic</span>
                     <span className="text-[#423E37]/50 text-[10px]">{new Date().toLocaleDateString()}</span>
                </div>
                
                {loadingTopic ? (
                    <div className="h-16 flex items-center justify-center">
                        <span className="text-[#423E37]/50 text-sm animate-pulse">Consulting the Cat Oracle...</span>
                    </div>
                ) : (
                    <div className="mb-4">
                        <h3 className="text-[#423E37] text-lg font-serif italic mb-1">"{dailyTopic?.question}"</h3>
                        <p className="text-[#423E37]/60 text-xs">{dailyTopic?.description}</p>
                    </div>
                )}

                {/* Reply Interaction */}
                {isReplying ? (
                    <div className="animate-in fade-in slide-in-from-bottom-2">
                        <input 
                            type="text" 
                            autoFocus
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full bg-white/60 text-[#423E37] text-sm p-3 rounded-lg border border-[#423E37]/10 outline-none placeholder-[#423E37]/30 mb-2"
                            placeholder="Type your answer..."
                        />
                        <div className="flex justify-end gap-2">
                            <button onClick={() => setIsReplying(false)} className="text-xs text-[#423E37]/50 px-3 py-1">Cancel</button>
                            <button onClick={handleSendReply} className="bg-[#FAE37C] text-[#423E37] text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1 hover:brightness-110 transition-all">
                                Send <Send size={12}/>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => setIsReplying(true)}
                        className="w-full bg-[#423E37]/5 hover:bg-[#423E37]/10 text-[#423E37]/70 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                    >
                        Tap to reply
                        <ChevronRight size={14} />
                    </button>
                )}

                {/* Other Comments Section */}
                <div className="mt-4 pt-4 border-t border-[#423E37]/10">
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[#423E37]/60">Community Answers</p>
                    <div className="space-y-2">
                        {MOCK_DAILY_COMMENTS.map(comment => (
                            <div key={comment.id} className="flex gap-2 items-start">
                                <div className="w-6 h-6 rounded-full bg-white/50 flex items-center justify-center text-[10px] font-bold shrink-0">
                                    {comment.author[0]}
                                </div>
                                <div className="bg-white/40 rounded-lg p-2 rounded-tl-none text-xs">
                                    <span className="font-bold mr-1">{comment.author}:</span>
                                    {comment.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
      </div>

      {/* Community Feed */}
      <div className="px-6">
          <h2 className="text-[#423E37] font-serif text-sm font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#423E37] rounded-full"></span>
              Trending Moments
          </h2>
          
          <div className="masonry-grid space-y-5">
            {MOCK_COMMUNITY_POSTS.map(post => (
                <div 
                    key={post.id} 
                    onClick={() => setExpandedPost(post)}
                    className="bg-white/60 rounded-2xl overflow-hidden shadow-sm border border-white/50 backdrop-blur-sm cursor-pointer hover:shadow-md transition-shadow"
                >
                    <div className="p-3 pb-2 flex items-center gap-2">
                        <img src={post.authorAvatar} className="w-8 h-8 rounded-full border border-white/50" alt="avatar" />
                        <div>
                            <span className="block text-xs font-bold text-[#423E37]">{post.catName}</span>
                            <span className="block text-[10px] text-[#423E37]/60">{post.author}</span>
                        </div>
                    </div>
                    
                    <div className="aspect-square w-full bg-[#C1E9D2]">
                        <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover" />
                    </div>

                    <div className="p-4">
                        <div className="flex items-center gap-4 mb-2">
                            <button className="text-[#5D9BEC] hover:scale-110 transition-transform"><Heart size={20} /></button>
                            <button className="text-[#423E37] opacity-60"><MoreHorizontal size={20} /></button>
                        </div>
                        <p className="text-xs text-[#423E37] leading-relaxed line-clamp-2">
                            <span className="font-bold mr-1">{post.catName}</span>
                            {post.caption}
                        </p>
                        <p className="text-[10px] text-[#423E37]/40 mt-3 uppercase font-bold tracking-wider">2 hours ago</p>
                    </div>
                </div>
            ))}
          </div>
      </div>

      {/* Fullscreen Post Modal */}
      {expandedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm h-[80vh] bg-[#FFFBF0] rounded-3xl overflow-hidden flex flex-col relative shadow-2xl animate-in zoom-in-95 duration-200">
                <button 
                    onClick={(e) => { e.stopPropagation(); setExpandedPost(null); }}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/20 text-white rounded-full flex items-center justify-center z-10"
                >
                    <X size={18} />
                </button>

                <div className="w-full h-3/5 bg-gray-200">
                    <img src={expandedPost.imageUrl} className="w-full h-full object-cover" alt="Full" />
                </div>

                <div className="flex-1 p-6 flex flex-col overflow-y-auto">
                     <div className="flex items-center gap-3 mb-4">
                        <img src={expandedPost.authorAvatar} className="w-10 h-10 rounded-full border border-black/10" alt="avatar" />
                        <div>
                            <span className="block text-sm font-bold text-[#423E37]">{expandedPost.catName}</span>
                            <span className="block text-xs text-[#423E37]/60">{expandedPost.author}</span>
                        </div>
                    </div>

                    <p className="text-[#423E37] font-serif italic text-lg leading-relaxed mb-6">
                        "{expandedPost.caption}"
                    </p>

                    <div className="mt-auto flex items-center justify-between border-t border-black/5 pt-4">
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1 text-[#423E37]/70">
                                <Heart size={20} />
                                <span className="text-xs font-bold">{expandedPost.likes}</span>
                            </div>
                        </div>
                        <span className="text-xs text-[#423E37]/40 uppercase font-bold tracking-wider">2 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};