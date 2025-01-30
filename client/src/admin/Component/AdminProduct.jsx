import { useEffect, useState } from 'react';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";

import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { MdFavoriteBorder } from "react-icons/md";

import { IoEyeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { apiResponseHandler } from '../../apiResponse/apiResponse';
import { useNavigate } from 'react-router-dom';


const AdminProduct = () => {


    const [product, setProduct] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const allProduct = async () => {
            try {
                const res = await apiResponseHandler("/api/v1/product/getproduct", 'GET')
                if (res.data.success === true) {
                    setProduct(res.data.data)
                }

            } catch (error) {
                console.log(error);

            }
        }
        allProduct()
    }, [])



    return (
        <>
            <div className=" w-full h-screen bg-white rounded-lg border-2 border-blue-100 px-7 py-8 overflow-y-scroll">
                <div className=" ">
                    <h1 className=" text-xl font-extrabold underline text-gray-400">All Product</h1>
                </div>
                <div>
                    <section className="  py-8 antialiased  md:py-12">
                        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                            {/* Heading & Filters */}





                            {/* product section  */}
                            <div className="mb-4 grid overflow-x-scroll gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">


                                {product.map((productItem, index) => (
                                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm w4t v`" key={productItem._id || index}>
                                        < div className="h-56 w-full" >
                                            <a href="#">
                                                <img className="mx-auto h-full w-full " src={productItem.image} alt="image" />
                                            </a>
                                        </ div>
                                        <div className="pt-6">
                                            <div className="mb-4 flex items-center justify-between gap-4">
                                                <span className="me-2 rounded bg-primary-100 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:bg-primary-900 dark:text-primary-300">Up to {productItem.discount} off</span>
                                                <Link to={`/admin/productview/${productItem._id}`} className="flex gap-3" >
                                                    <div className="rounded-full overflow-hidden w-8 flex items-center justify-center">
                                                        <Button>
                                                            <IoEyeOutline />
                                                        </Button>
                                                    </div>
                                                    <div className="rounded-full overflow-hidden w-8 flex items-center justify-center">
                                                        <Button>
                                                            <MdFavoriteBorder />
                                                        </Button>
                                                    </div>
                                                </Link>
                                            </div>
                                            <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline">{productItem.productName}</a>

                                            {/* Rating */}
                                            <Stack spacing={1}>
                                                <Rating name="half-rating" defaultValue={productItem.rating || 2.5} precision={0.5} />
                                            </Stack>

                                            <ul className="mt-2 flex items-center gap-4">
                                                <li className="flex items-center gap-2">
                                                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                                    </svg>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Fast Delivery</p>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                    </svg>
                                                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Best Price</p>
                                                </li>
                                            </ul>

                                            <div className="mt-4 flex items-center justify-between gap-4">
                                                <p className="text-2xl font-extrabold leading-tight text-gray-900">${productItem.price}</p>
                                                <div type="button" className="bg-blue-400 rounded-md">
                                                    <Button>
                                                        <p className="text-white">Add To Cart</p>
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div >
                                ))}










                            </div >
                        </div >

                    </section >
                </div >
            </div >
        </>
    )
}


export { AdminProduct }