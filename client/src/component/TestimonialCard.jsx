import React from 'react';

const TestimonialCard = ({ testimonial }) => {
    return (
        <div className="bg-white p-6 border-2 border-blue-200 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transform transition duration-300">
            <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200"
            />
            <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{testimonial.role}</p>
            <p className="text-gray-500 italic">"{testimonial.message}"</p>
        </div>
    );
};

export default TestimonialCard;
