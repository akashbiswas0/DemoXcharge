'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation' // Import useRouter from Next.js
import Navbar from '@/components/Navbar'

export default function Component() {
  const [originalPrice, setOriginalPrice] = useState(0)
  const router = useRouter() // Initialize the router

  const boxes = [
    { title: 'Watch ad for a token', price: 60, link: '/watchAd' },
    { title: 'Signup for platform x', price: 50, link: '/platform-x' },
    { title: 'Try application y', price: 30, link: '/application-y' },
  ]

  useEffect(() => {
    const maxBoxPrice = Math.max(...boxes.map(box => box.price))
    setOriginalPrice(Math.floor(Math.random() * (100 - maxBoxPrice)) + maxBoxPrice + 1)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const boxVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: '0px 0px 8px rgb(59, 130, 246)',
      transition: {
        type: 'spring',
        stiffness: 300,
      },
    }
  }

  // Handle box click to navigate to the respective page
  const handleBoxClick = (link) => {
    router.push(link) // Navigate to the specified link
  }

  return (
    <div className='bg-gray-900'>
      <Navbar />
      <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <h2 className="text-5xl font-bold text-center text-green-400 -mt-40 mb-8">
            ORIGINAL PRICE: ${originalPrice}
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {boxes.map((box, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer"
                variants={boxVariants}
                whileHover="hover"
                onClick={() => handleBoxClick(box.link)} // Trigger navigation on click
              >
                <h3 className="text-xl font-semibold text-white mb-4">{box.title}</h3>
                <p className="text-3xl font-bold text-green-400">${box.price}</p>
                <div className="mt-4 h-2 bg-gray-700 rounded overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${(box.price / originalPrice) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
