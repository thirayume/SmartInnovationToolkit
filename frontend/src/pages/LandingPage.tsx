// src/pages/LandingPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui/button';
// import { Input } from '../components/ui/input';
import Image from '../components/common/Image';
import { IMAGES } from '../constants/images';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [
    IMAGES.SLIDER.BANNER_1,
    IMAGES.SLIDER.BANNER_2,
    IMAGES.SLIDER.BANNER_3,
  ];

  const Slider = () => (
    <div className="relative h-[400px] bg-gray-100">
      <div className="absolute inset-0">
        <Image 
          src={sliderImages[currentSlide]} 
          fallback={IMAGES.PLACEHOLDER.BANNER}
          alt={`Slide ${currentSlide + 1}`} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );

  // const ClassroomSection = () => (
  //   <div className="py-16 bg-white">
  //     <div className="container mx-auto px-4">
  //       <h2 className="text-3xl font-bold text-center mb-12">{t('menu.classroom')}</h2>
  //       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  //         <div className="p-6 bg-[#ff5722] text-white rounded-lg hover:shadow-lg transition-shadow">
  //           <h3 className="text-xl font-semibold mb-4">{t('classroom.create')}</h3>
  //           <p>{t('classroom.createDesc')}</p>
  //         </div>
  //         <div className="p-6 bg-[#ffc107] text-white rounded-lg hover:shadow-lg transition-shadow">
  //           <h3 className="text-xl font-semibold mb-4">{t('classroom.addStudent')}</h3>
  //           <p>{t('classroom.addStudentDesc')}</p>
  //         </div>
  //         <div className="p-6 bg-[#00bcd4] text-white rounded-lg hover:shadow-lg transition-shadow">
  //           <h3 className="text-xl font-semibold mb-4">{t('classroom.evaluate')}</h3>
  //           <p>{t('classroom.evaluateDesc')}</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );

  const RegisterSection = () => (
    <div className="py-16 bg-green-500 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">{t('auth.register.title')}</h2>
        <Button 
          onClick={() => navigate('/register')}
          className="bg-white text-green-500 hover:bg-gray-100"
          size="lg"
        >
          {t('auth.register.action')}
        </Button>
      </div>
    </div>
  );

  // const SummarySection = () => (
  //   <div className="py-16 bg-gray-50">
  //     <div className="container mx-auto px-4">
  //       <h2 className="text-3xl font-bold text-center mb-8">{t('summary.title')}</h2>
  //       <div className="max-w-2xl mx-auto flex">
  //         <Input
  //           placeholder={t('summary.search')}
  //           className="rounded-r-none"
  //         />
  //         <Button 
  //           className="rounded-l-none bg-yellow-500 hover:bg-yellow-600"
  //         >
  //           {t('summary.searchButton')}
  //         </Button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="min-h-screen">
      <Slider />
      {/* <ClassroomSection /> */}
      <br />
      <RegisterSection />
      {/* <SummarySection /> */}
    </div>
  );
};

export default LandingPage;