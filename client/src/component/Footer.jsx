import React from 'react'

function Footer() {
    return (
        <>
            <footer className=" text-black shadow-2xl border-2 border-blue-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h2 className="text-lg font-semibold mb-4">About</h2>
                            <ul>
                                <li><a href="#" className="hover:text-gray-400">Company</a></li>
                                <li><a href="#" className="hover:text-gray-400">Careers</a></li>
                                <li><a href="#" className="hover:text-gray-400">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Help</h2>
                            <ul>
                                <li><a href="#" className="hover:text-gray-400">Customer Service</a></li>
                                <li><a href="#" className="hover:text-gray-400">Returns</a></li>
                                <li><a href="#" className="hover:text-gray-400">FAQs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold mb-4">Policy</h2>
                            <ul>
                                <li><a href="#" className="hover:text-gray-400">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-gray-400">Terms of Use</a></li>
                                <li><a href="#" className="hover:text-gray-400">Security</a></li>
                            </ul>
                        </div>
                        <div className='  '>
                            <h2 className="text-lg font-semibold mb-4">Follow Us</h2>
                            <ul className="flex   flex-col  ">
                                <li><a href="#" className="hover:text-gray-400">Facebook</a></li>
                                <li><a href="#" className="hover:text-gray-400">Twitter</a></li>
                                <li><a href="#" className="hover:text-gray-400">Instagram</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-8 border-t border-gray-700 pt-4">
                        <p className="text-center text-sm">© 2025 SnapDEAL. All rights reserved.</p>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer