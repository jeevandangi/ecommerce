import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        // Simulate fetching testimonials from an API or local data source
        const testimonialData = [
            {
                id: 1,
                name: 'Jeevan Dangi',
                role: 'Customer',
                message: 'This is the best eCommerce site I have ever used. Easy to navigate and fast delivery!',
                image: '../../public/image/profile.JPG',
            },


        ];
        setTestimonials(testimonialData);
    }, []);

    return (
        <section id="testimonials" className="container  bg-white px-4 py-8 mx-auto mb-3 shadow-lg">
            <h2 className="text-3xl font-bold mb-6 text-center pb-6">What Our Customers Say</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial) => (
                    <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
            </div>
        </section>
    );
};

export default TestimonialSection;
