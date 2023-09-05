import React from 'react'
import { useState } from 'react';
import { FcPrevious, FcNext } from "react-icons/fc";
import { motion, AnimatePresence } from "framer-motion";

const Slider = () => {

    const images = [
        "https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png",
        "https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png"
    ];

    const variants = {
        enter: (direction) => {
            return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
            };
        },
        visible: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction) => {
            return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
            };
        }
    };

    const transition = {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
    }

    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    
    const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev+1)%images.length)
    }

    const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => {
        if(prev > 0) return prev - 1
        if(prev === 0) return images.length - 1
    })
    }

    return (
        <div className='sliderContainer'>
            <AnimatePresence initial={false} custom={direction} >
                <motion.img
                    key={index}
                    src={images[index]} 
                    alt='Slider' 
                    className='image'
                    custom={direction}
                    variants={variants}
                    initial = 'enter'
                    animate = 'visible'
                    exit = 'exit'
                    transition={transition}
                />
            </AnimatePresence>
            <button onClick={handleNext} className='next'>
                <FcNext />
            </button>

            <button onClick={handlePrev} className='prev'>
                <FcPrevious />
            </button>
        </div>
    )
}

export default Slider