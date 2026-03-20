import React, { useState } from 'react';
import { 
  Mail, 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Archive, 
  Trash2, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  Image as ImageIcon,
  CheckCheck
} from 'lucide-react';
import { motion } from 'motion/react';

const Inbox: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState(0);
  const chats = [
    { id: 1, name: 'Alex Thompson', lastMessage: 'The strategic leadership module is excellent. I have some questions about the final assessment.', time: '10:45 AM', unread: 2, avatar: 'https://i.pravatar.cc/150?u=alex', status: 'online' },
    { id: 2, name: 'Jessica Chen', lastMessage: 'Can we schedule a live training session for the product team next Tuesday?', time: 'Yesterday', unread: 0, avatar: 'https://i.pravatar.cc/150?u=jessica', status: 'offline' },
    { id: 3, name: 'Marcus Wright', lastMessage: 'I have uploaded the new data analytics dataset for the upcoming course.', time: 'Mar 18', unread: 0, avatar: 'https://i.pravatar.cc/150?u=marcus', status: 'online' },
    { id: 4, name: 'Elena Rodriguez', lastMessage: 'The digital transformation strategy needs a slight update in the second module.', time: 'Mar 17', unread: 0, avatar: 'https://i.pravatar.cc/150?u=elena', status: 'online' },
    { id: 5, name: 'Robert Wilson', lastMessage: 'Financial risk management assessment results are now available for review.', time: 'Mar 15', unread: 0, avatar: 'https://i.pravatar.cc/150?u=robert', status: 'offline' },
  ];

  return (
    <div className="h-[calc(100vh-160px)] flex bg-surface-container-lowest rounded-3xl border border-outline-variant overflow-hidden shadow-sm">
      {/* Sidebar */}
      <div className="w-96 border-r border-outline-variant flex flex-col">
        <div className="p-6 border-b border-outline-variant">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-display font-bold text-on-surface">Communications</h1>
            <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20">
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
            <input 
              type="text" 
              placeholder="Search discussions..." 
              className="w-full bg-surface-container-low border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {chats.map((chat, index) => (
            <button 
              key={chat.id}
              onClick={() => setSelectedChat(index)}
              className={`w-full p-6 flex gap-4 hover:bg-surface-container-low transition-all border-b border-outline-variant text-left relative ${selectedChat === index ? 'bg-surface-container-low' : ''}`}
            >
              {selectedChat === index && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              )}
              <div className="relative shrink-0">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-xl object-cover border border-outline-variant" referrerPolicy="no-referrer" />
                {chat.status === 'online' && (
                  <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-surface-container-lowest"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold text-on-surface truncate">{chat.name}</h3>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">{chat.time}</span>
                </div>
                <p className={`text-xs truncate ${chat.unread > 0 ? 'text-on-surface font-bold' : 'text-on-surface-variant font-medium'}`}>
                  {chat.lastMessage}
                </p>
                {chat.unread > 0 && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full">{chat.unread} New</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-surface-container-low/30">
        {/* Chat Header */}
        <div className="p-6 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={chats[selectedChat].avatar} alt={chats[selectedChat].name} className="w-12 h-12 rounded-xl object-cover border border-outline-variant" referrerPolicy="no-referrer" />
            <div>
              <h2 className="text-base font-bold text-on-surface leading-none">{chats[selectedChat].name}</h2>
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className={`w-2 h-2 rounded-full ${chats[selectedChat].status === 'online' ? 'bg-emerald-500' : 'bg-outline-variant'}`}></div>
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-widest">
                  {chats[selectedChat].status === 'online' ? 'Active Now' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">
              <Star size={20} />
            </button>
            <button className="p-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">
              <Archive size={20} />
            </button>
            <button className="p-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">
              <Trash2 size={20} />
            </button>
            <div className="w-px h-6 bg-outline-variant mx-2"></div>
            <button className="p-2.5 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
          <div className="flex justify-center">
            <span className="px-4 py-1.5 bg-surface-container-low text-on-surface-variant text-[10px] font-bold uppercase tracking-widest rounded-full border border-outline-variant">Today, March 20</span>
          </div>

          <div className="flex gap-4 max-w-2xl">
            <img src={chats[selectedChat].avatar} alt={chats[selectedChat].name} className="w-10 h-10 rounded-xl object-cover shrink-0" referrerPolicy="no-referrer" />
            <div className="space-y-2">
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-outline-variant shadow-sm">
                <p className="text-sm text-on-surface leading-relaxed">
                  Hi John, I've been going through the Strategic Leadership & Management module. It's quite comprehensive!
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-outline-variant shadow-sm">
                <p className="text-sm text-on-surface leading-relaxed">
                  I have a few questions regarding the final assessment criteria. Could we discuss this briefly?
                </p>
              </div>
              <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest ml-1">10:45 AM</p>
            </div>
          </div>

          <div className="flex gap-4 max-w-2xl ml-auto flex-row-reverse">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shrink-0">JD</div>
            <div className="space-y-2 text-right">
              <div className="bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/10">
                <p className="text-sm text-white leading-relaxed">
                  Hello {chats[selectedChat].name.split(' ')[0]}! Glad to hear you're enjoying the course.
                </p>
              </div>
              <div className="bg-primary p-4 rounded-2xl rounded-tr-none shadow-lg shadow-primary/10">
                <p className="text-sm text-white leading-relaxed">
                  I'd be happy to clarify the assessment criteria. Are you free for a quick call at 2:00 PM today?
                </p>
              </div>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">10:52 AM</p>
                <CheckCheck size={14} className="text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 bg-surface-container-lowest border-t border-outline-variant">
          <div className="flex items-end gap-4">
            <div className="flex-1 bg-surface-container-low rounded-2xl p-2 border border-outline-variant focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <textarea 
                placeholder="Type your message here..." 
                className="w-full bg-transparent border-none outline-none text-sm p-3 resize-none max-h-32 min-h-[48px] text-on-surface"
                rows={1}
              ></textarea>
              <div className="flex items-center justify-between px-2 pb-1">
                <div className="flex items-center gap-1">
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-white rounded-lg transition-all">
                    <Smile size={20} />
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-white rounded-lg transition-all">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-white rounded-lg transition-all">
                    <ImageIcon size={20} />
                  </button>
                </div>
                <button className="px-4 py-2 bg-primary text-white font-bold rounded-xl hover:bg-primary-container transition-all shadow-lg shadow-primary/20 text-xs flex items-center gap-2">
                  <span>Send Message</span>
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
