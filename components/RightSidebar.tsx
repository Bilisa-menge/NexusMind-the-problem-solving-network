
import React from 'react';

const RightSidebar: React.FC = () => {
  const contacts = [
    { name: 'Sarah Chen', status: 'online', avatar: 'https://picsum.photos/seed/sarah/50/50' },
    { name: 'John Doe', status: 'offline', avatar: 'https://picsum.photos/seed/john/50/50' },
    { name: 'Alex River', status: 'online', avatar: 'https://picsum.photos/seed/alex/50/50' },
    { name: 'Maria Lopez', status: 'online', avatar: 'https://picsum.photos/seed/maria/50/50' },
    { name: 'Tom Hardy', status: 'offline', avatar: 'https://picsum.photos/seed/tom/50/50' }
  ];

  return (
    <aside className="fixed right-0 top-[56px] bottom-0 w-[300px] overflow-y-auto hidden xl:block p-4">
      {/* Sponsored */}
      <section className="mb-6">
        <h3 className="text-gray-500 font-semibold text-[17px] mb-2">Sponsored</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <img src="https://picsum.photos/seed/ad1/150/150" className="w-[100px] h-[100px] object-cover rounded-lg" alt="Ad" />
            <div>
              <p className="font-semibold text-sm">Solved: Global Warming?</p>
              <p className="text-xs text-gray-500">nexusmind.org</p>
            </div>
          </div>
          <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 p-2 rounded-lg transition-colors">
            <img src="https://picsum.photos/seed/ad2/150/150" className="w-[100px] h-[100px] object-cover rounded-lg" alt="Ad" />
            <div>
              <p className="font-semibold text-sm">New Startup Grant 2026</p>
              <p className="text-xs text-gray-500">grants.com</p>
            </div>
          </div>
        </div>
      </section>

      {/* Climate Action */}
      <section className="mb-6 pt-4 border-t border-gray-300">
        <h3 className="text-gray-500 font-semibold text-[17px] mb-2">Climate Action</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors">
            <i className="fa-solid fa-leaf text-2xl text-green-500"></i>
            <div>
              <p className="text-sm font-semibold">Carbon Reduction Challenge</p>
              <p className="text-xs text-gray-500">Join 1,247 solvers working on emissions</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2 cursor-pointer hover:bg-gray-200 rounded-lg transition-colors">
            <i className="fa-solid fa-globe text-2xl text-blue-500"></i>
            <div>
              <p className="text-sm font-semibold">Global Warming Solutions</p>
              <p className="text-xs text-gray-500">89 innovative approaches submitted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section className="pt-4 border-t border-gray-300">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-gray-500 font-semibold text-[17px]">Contacts</h3>
          <div className="flex gap-4 text-gray-500">
            <i className="fa-solid fa-video cursor-pointer hover:text-gray-700"></i>
            <i className="fa-solid fa-magnifying-glass cursor-pointer hover:text-gray-700"></i>
            <i className="fa-solid fa-ellipsis cursor-pointer hover:text-gray-700"></i>
          </div>
        </div>
        <div className="space-y-1">
          {contacts.map((contact, idx) => (
            <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors relative">
              <div className="relative">
                <img src={contact.avatar} className="w-8 h-8 rounded-full" alt={contact.name} />
                {contact.status === 'online' && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <span className="text-sm font-semibold">{contact.name}</span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default RightSidebar;
