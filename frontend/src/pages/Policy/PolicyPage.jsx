import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { policiesData } from '../../utils/policies';

const PolicyPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const policy = policiesData[slug];

  useEffect(() => {
    if (!policy) {
      navigate('/not-found');
    }
  }, [slug, policy, navigate]);

  if (!policy) return null;

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      <div>
        <Header />
      </div>
      <div data-aos="fade-up" className="flex-1 mt-[120px] max-w-4xl mx-auto w-full px-6 py-10 bg-white shadow-sm rounded-lg mb-10 border border-gray-100">
        <h1 className="text-2xl lg:text-3xl font-bold text-red-700 mb-6 uppercase border-b pb-4">
          {policy.title}
        </h1>
        <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
          {policy.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PolicyPage;
