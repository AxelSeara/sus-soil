import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser } from 'react-icons/fa';

const regions = [
  {
    id: 'Boreal',
    color: ['#284b55', '#EAF4F1'],
    info: 'Boreal',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel justo ligula. Fusce vitae ipsum et justo vestibulum efficitur. Cras in mauris tincidunt, pulvinar lorem nec, tincidunt metus. Praesent laoreet nibh nec libero interdum, in mollis nisl convallis. Integer tincidunt, nunc ac tempus lobortis, massa lorem hendrerit odio, ut sollicitudin neque enim a nibh. Aliquam erat volutpat. Proin et convallis sem. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed semper sem id mi hendrerit, eget tincidunt ipsum gravida. Nulla facilisi. Sed congue dui ac nulla commodo, in mollis lorem commodo. Vestibulum pharetra massa ac nulla feugiat, in porta ligula vulputate. Mauris rutrum, ipsum sit amet porta pretium, justo enim ultricies dui, a convallis mi ligula non ligula. Sed vitae dui nec metus laoreet tincidunt. Nulla facilisi. Donec non libero ac lorem ultrices vestibulum. Vivamus scelerisque orci a ante malesuada, a interdum odio pulvinar. Donec quis nisi id ligula pretium tempus. In hac habitasse platea dictumst. Proin condimentum, lorem sed vestibulum eleifend, lectus leo dictum libero, sed efficitur magna odio vel orci. Nulla ac urna non orci volutpat cursus. Vestibulum sed mauris eu ante congue fermentum. Sed a dui nec massa mattis porttitor. Quisque ut metus vel enim efficitur dapibus. Duis auctor lectus nec semper aliquet. Suspendisse potenti. Integer ut turpis nulla. Praesent congue purus at efficitur tristique. Suspendisse nec dignissim velit, id malesuada enim. Donec finibus, nibh ut sodales vestibulum, ex quam gravida eros, id consequat enim nibh ut ante. Curabitur nec dictum enim. Vestibulum sit amet venenatis velit. Mauris in risus vitae neque ornare sodales. Nulla facilisi. Sed ut urna sit amet neque ullamcorper scelerisque.',
    image: 'https://source.unsplash.com/r0aq9pYIadI/600x400',
  },
  {
    id: 'Atlantic',
    color: ['#2e8479', '#E2F1EE'],
    info: 'Atlantic',
    description: 'Description for Atlantic',
    image: 'https://source.unsplash.com/hkjsfuyxK10/600x400',
  },
  {
    id: 'Continental',
    color: ['#b7543d', '#F4E6E3'],
    info: 'Continental',
    description: 'Description for Continental',
    image: 'https://source.unsplash.com/TRhGEGdw-YY/600x400',
  },
  {
    id: 'Alpine',
    color: ['#775786', '#F1EAF3'],
    info: 'Alpine',
    description: 'Description for Alpine',
    image: 'https://source.unsplash.com/ZEVkLRWmnX4/600x400',
  },
  {
    id: 'Pannonian',
    color: ['#86884c', '#F4F4E5'],
    info: 'Pannonian',
    description: 'Description for Pannonian',
    image: 'https://source.unsplash.com/2cddwbyhTsY/600x400',
  },
  {
    id: 'Mediterranean',
    color: ['#ee9c39', '#FDF3E5'],
    info: 'Mediterranean',
    description: 'Description for Mediterranean',
    image: 'https://source.unsplash.com/mDa8FAg782c/600x400',
  },
  {
    id: 'BlackSea',
    color: ['#5c81b5', '#E6EDF5'],
    info: 'Black Sea',
    description: 'Description for Black Sea',
    image: 'https://source.unsplash.com/5UhayavS2d4/600x400',
  },
  {
    id: 'Anatolian',
    color: ['#a02b16', '#F4E4E1'],
    info: 'Anatolian',
    description: 'Description for Anatolian',
    image: 'https://source.unsplash.com/LSKmkJGog64/600x400',
  },
];

// Variants para el backdrop y modal
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: '-100vh', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100, damping: 15 },
  },
};

const LivingLabs = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [loadingImg, setLoadingImg] = useState(true);

  // Desactivar el scroll del fondo mientras el modal esté abierto
  useEffect(() => {
    if (selectedRegion) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedRegion]);

  const handleModalOpen = (region) => {
    setSelectedRegion(region);
    setLoadingImg(true);
  };

  const handleModalClose = () => {
    setSelectedRegion(null);
  };

  return (
    <div className="container mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-center mt-16 mb-8 text-brown font-serif">
        Living Labs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {regions.map((region) => (
          <motion.div
            key={region.id}
            className="w-full h-64 flex items-center justify-center text-center text-white border border-gray-300 rounded-lg shadow-lg cursor-pointer overflow-hidden"
            whileHover={{ scale: 1.05, backgroundSize: 'cover' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            style={{
              backgroundImage: `linear-gradient(to bottom, ${region.color[0]} 50%, ${region.color[1]} 100%), url(${region.image})`,
              backgroundSize: 'cover, cover',
              backgroundPosition: 'center',
            }}
            onClick={() => handleModalOpen(region)}
          >
            <h2 className="text-xl font-bold drop-shadow-lg font-serif">
              {region.id}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white p-8 rounded-lg shadow-xl relative w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto"
              variants={modalVariants}
            >
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl font-bold"
                onClick={handleModalClose}
              >
                &times;
              </button>
              <h2 className="text-2xl font-bold mb-4 text-brown font-serif">
                {selectedRegion.info}
              </h2>

              {/* Imagen */}
              <div className="w-full h-48 rounded-lg mb-6 overflow-hidden relative">
                {loadingImg && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                )}
                <img
                  src={selectedRegion.image}
                  alt={selectedRegion.info}
                  className="w-full h-full object-cover"
                  onLoad={() => setLoadingImg(false)}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/600x400?text=No+Image';
                  }}
                />
              </div>

              {/* Descripción extensa */}
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, justo quis facilisis fermentum, nisi lectus semper neque, et commodo massa lacus sed odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus fermentum metus et nulla ultricies, in convallis lectus elementum. Vestibulum ac ligula lorem. Sed ac lorem quis dolor blandit efficitur. Donec in lorem ac sem tincidunt laoreet. Vivamus feugiat, justo id efficitur dapibus, lorem nibh dictum justo, at dignissim leo ligula ac massa. In hac habitasse platea dictumst. Suspendisse potenti. Duis nec pharetra eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla facilisi. In hac habitasse platea dictumst. Praesent sed erat sit amet lorem pretium ultrices. Donec blandit libero ut dui fermentum, quis ullamcorper dolor tincidunt. Sed quis magna ac neque laoreet suscipit. Vestibulum dignissim interdum felis, sit amet convallis sapien aliquam nec.
                  
                  Mauris et urna vitae nibh mollis luctus. Cras in libero non felis sollicitudin gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce pretium urna at mauris aliquam, quis congue sem viverra. Mauris sodales dui et neque hendrerit, ac pretium nibh feugiat. Nulla facilisi. In vel dui vel mi maximus imperdiet. Suspendisse ut dui sit amet neque congue commodo. Fusce ut mauris arcu. Curabitur malesuada, lorem eget pretium interdum, nulla metus pretium purus, in scelerisque orci libero ut magna. Phasellus tincidunt consequat tortor, eget tincidunt ex luctus in. Integer quis molestie nulla. Curabitur volutpat auctor augue, sed lobortis justo bibendum ac. Praesent interdum mauris ut massa pretium, in dignissim urna vestibulum. Vestibulum tempus purus at lorem vehicula, sed porttitor lorem dictum. Suspendisse potenti. Integer efficitur interdum est, sit amet malesuada enim posuere quis.
                  
                  Donec feugiat purus ut turpis gravida, sed interdum lectus efficitur. Curabitur tincidunt, nunc non aliquam convallis, erat augue feugiat lorem, at volutpat urna neque in ipsum. Nam ultrices arcu ut libero tristique, a hendrerit purus gravida. Praesent eget scelerisque libero. Donec a commodo orci, vitae fermentum mi. Sed malesuada ex ac felis ullamcorper, in mollis sem porta. In imperdiet, arcu eget fermentum congue, justo nisl sodales mauris, non tempus ex lorem non nisi. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                </p>
              </div>

              {/* Sección: News related */}
              <div className="mb-6">
                <h3 className="text-xl font-bold font-serif text-brown mb-2">
                  News related with {selectedRegion.info}
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-20 bg-gray-200 flex items-center justify-center rounded shadow-sm"
                      >
                        <span className="text-sm text-gray-700">News Placeholder {i + 1}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Sección: Colaboradores */}
              <div className="mb-6">
                <h3 className="text-xl font-bold font-serif text-brown mb-2">
                  Collaborators
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {Array(3)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="w-full h-16 bg-gray-200 flex items-center justify-center rounded shadow-sm"
                      >
                        <span className="text-sm text-gray-700">Logo {i + 1}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Sección: Area Responsible */}
              <div className="mb-6">
                <h3 className="text-xl font-bold font-serif text-brown mb-2">
                  Area Responsible
                </h3>
                <div className="flex justify-around">
                  {[
                    { name: 'Alice' },
                    { name: 'Bob' },
                    { name: 'Charlie' },
                  ].map((person, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center shadow-sm mb-2">
                        <FaUser size={24} className="text-gray-700" />
                      </div>
                      <span className="text-sm text-gray-700 font-serif">{person.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="block bg-brown text-white py-2 px-6 rounded-lg hover:bg-opacity-80 mx-auto font-serif"
                onClick={handleModalClose}
              >
                Back to Living Labs
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LivingLabs;