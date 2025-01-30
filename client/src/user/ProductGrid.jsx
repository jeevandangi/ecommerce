import { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { apiResponseHandler } from '../apiResponse/apiResponse';
import { Loader } from '../component/Loader';

const ProductGrid = () => {
    const [product, setProduct] = useState([]); // For the displayed products
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(''); // For the selected filter
    const [currentPage, setCurrentPage] = useState(1); // Current page state
    const itemsPerPage = 12; // Number of products per page

    // Fetch products initially and on filter change
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const url = filter
                    ? `/api/v1/product/getproduct?sort=${filter}`
                    : `/api/v1/product/getproduct`;

                const res = await apiResponseHandler(url, 'GET');
                if (res && res.data && res.data.success) {
                    setProduct(res.data.data || []);
                } else {
                    console.error('Invalid API Response:', res);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [filter]);

    // Calculate total pages
    const totalPages = Math.ceil(product.length / itemsPerPage);

    // Get products for the current page
    const currentProducts = product.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Handle filter change
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setCurrentPage(1); // Reset to the first page on filter change
    };

    // Handle page change
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <section id="products" className="container shadow-lg bg-white px-7 py-8 mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">Our Products</h2>

            <div className="flex justify-between items-center py pb-5">
                <p className="text-gray-500">
                    Showing {Math.min((currentPage - 1) * itemsPerPage + 1, product.length)}-
                    {Math.min(currentPage * itemsPerPage, product.length)} of {product.length} products
                </p>
                <div className="flex items-center space-x-2">
                    <p className="text-gray-500">Sort by:</p>
                    <select
                        className="border px-2 py-1 rounded"
                        name="sort"
                        id="sort"
                        onChange={handleFilterChange}
                        value={filter}
                    >
                        <option value="">None</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>

            {/* Product Grid */}
            {!loading ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {currentProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex justify-center items-center space-x-2 mt-8">
                        {/* Previous Button */}
                        <button
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${currentPage === 1
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => changePage(page)}
                                className={`px-3 py-1 rounded ${currentPage === page
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 hover:bg-blue-500 hover:text-white'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded ${currentPage === totalPages
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-500 text-white hover:bg-blue-600'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </section>
    );
};

export { ProductGrid };
