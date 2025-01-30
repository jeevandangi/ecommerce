
import Button from '@mui/material/Button';
import { FaProductHunt } from "react-icons/fa6";
import { LineChart } from '@mui/x-charts/LineChart';
import { FaUsers } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { FcSalesPerformance } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { apiResponseHandler } from '../apiResponse/apiResponse';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalOrders: 0,
        totalUsers: 0,
        totalSales: 0,
    });
    useEffect(() => {
        const fetchRecentSales = async () => {
            try {
                const response = await apiResponseHandler('/api/v1/orders/recent', 'GET'); // Adjust API endpoint as needed
                setOrders(response.data);

            } catch (error) {
                console.error('Error fetching orders:', error);

            }
        };

        fetchRecentSales();
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiResponseHandler("/api/V1/product/dashboard", "GET");
                if (response.data.success) {
                    setStats(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            }
        };

        fetchStats();
    }, []);

    console.log(stats);



    return (
        <>
            <div className="flex flex-col gap-y-4 px-4 w-full">
                <h1 className="title">Dashboard</h1>


                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
                    <div className=" flex items-center gap-8  bg-gradient-to-r from-slate-400 to-green-500 px-4 py-5">
                        <div className=" ">
                            <FaUsers className=' text-white text-4xl' />
                            <h1 className=' text-xl text-red-50'>Total User</h1>
                        </div>
                        <p className=' text-3xl font-extrabold text-white'>{stats.totalUsers}</p>
                    </div>

                    <div className=" flex items-center gap-8  bg-gradient-to-r from-blue-400 to-yellow-500 px-4 py-5">
                        <div className=" ">
                            <FaProductHunt className=' text-white text-4xl' />
                            <h1 className=' text-xl font-extrabold text-red-50'>Total Product</h1>
                        </div>
                        <p className=' text-3xl font-extrabold text-white'>{stats.totalProducts}</p>
                    </div>
                    <div className=" flex items-center gap-8  bg-gradient-to-r from-pink-400 to-red-500 px-4 py-5">
                        <div className=" ">
                            <CiDeliveryTruck className=' text-white text-4xl' />
                            <h1 className=' text-xl text-red-50'>Total Order</h1>
                        </div>
                        <p className=' text-3xl font-extrabold text-white'>{stats.totalOrders}</p>
                    </div>
                    <div className=" flex items-center gap-8  bg-gradient-to-r from-orange-400 to-red-500 px-4 py-5">
                        <div className=" ">
                            <FcSalesPerformance className=' text-white text-4xl' />
                            <h1 className=' text-xl text-red-50'>Total Sales</h1>
                        </div>
                        <p className=' text-3xl font-extrabold text-white'>{stats.totalSales}</p>
                    </div>


                </div>



                {/*  chart */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <div className="card col-span-1 md:col-span-2 overflow-x-scroll rounded-xl lg:col-span-4 border-2 border-blue-100 bg-white px-5 py-3 ">
                        <h1 className=" text-md text-gray-500">Overview</h1>
                        <LineChart
                            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                            series={[
                                {
                                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                                    area: true,
                                },
                            ]}
                            width={500}
                            height={300}
                        />
                    </div>

                    {/* recent sales */}

                    <div className="card col-span-1 md:col-span-2 lg:col-span-3 rounded-lg border-2 border-blue-100 bg-white px-4 py-4">
                        <div className="card-header">
                            <p className="card-title">Recent Sales</p>
                        </div>
                        <div className="card-body h-[300px] overflow-auto p-0">

                            {
                                Array.isArray(orders) && orders.length > 0 ? (
                                    orders.map(order => (
                                        <div
                                            key={order._id}
                                            className="flex items-center justify-between border-b-2 border-gray-200 gap-x-4 py-2 pr-2"
                                        >
                                            <div className="flex items-center gap-x-4">
                                                {/* Use the user's profile image or fallback */}
                                                <img
                                                    src={order.user.avatar || '../../public/image/profile.JPG'}
                                                    className="size-10 flex-shrink-0 rounded-full object-cover"
                                                    alt="User Avatar"
                                                />
                                                <div className="flex flex-col gap-y-2">
                                                    <p className="font-medium text-slate-900">{order.user.userName}</p>
                                                    <p className="text-sm text-slate-600">{order.user.email}</p>
                                                </div>
                                            </div>
                                            <p className="font-medium text-slate-900 dark:text-slate-50">
                                                {order.totalAmt}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No recent sales found.</p>
                                )
                            }

                        </div>
                    </div>
                </div>


                {/* table */}

                <div className=" w-full overflow-auto bg-white px-5 py-5 rounded-lg border-2 border-blue-100">
                    <div className=" py-4">
                        <p className="">Top Orders</p>
                    </div>
                    <table className=" w-full  ">
                        <thead className=" w-full bg-gray-600 py-5">

                            <tr className="">
                                <th>ID</th>
                                <th className=" py-4 text-white">Product</th>
                                <th className=" py-4 text-white">Price</th>
                                <th className=" py-4 text-white">Status</th>
                                <th className=" py-4 text-white">Rating</th>
                                <th className=" py-4 text-white">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="">
                                <th className="">1</th>
                                <th className="">Kurta</th>
                                <th className="">250</th>
                                <th className="">pending</th>
                                <th className="">Rating</th>
                                <th className=" flex items-center justify-center">
                                    <div className=" flex itemc justify-center overflow-hidden w-14 h-7">
                                        <Button>
                                            <div className=" bg-blue-300 text-white px-3 capitalize">
                                                <span>View</span>
                                            </div>
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                            <tr className="">
                                <th className="">1</th>
                                <th className="">Kurta</th>
                                <th className="">250</th>
                                <th className="">pending</th>
                                <th className="">Rating</th>
                                <th className=" flex items-center justify-center">
                                    <div className=" flex itemc justify-center overflow-hidden w-14 h-7">
                                        <Button>
                                            <div className=" bg-blue-300 text-white px-3 capitalize">
                                                <span>View</span>
                                            </div>
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                            <tr className="">
                                <th className="">1</th>
                                <th className="">Kurta</th>
                                <th className="">250</th>
                                <th className=" bg-green-500">pending</th>
                                <th className=" ">Rating</th>
                                <th className=" flex items-center justify-center">
                                    <div className=" flex itemc justify-center overflow-hidden w-14 h-7">
                                        <Button>
                                            <div className=" bg-blue-300 text-white px-3 capitalize">
                                                <span>View</span>
                                            </div>
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                            <tr className="">
                                <th className="">1</th>
                                <th className="">Kurta</th>
                                <th className="">250</th>
                                <th className="">pending</th>
                                <th className="">Rating</th>
                                <th className=" flex items-center justify-center">
                                    <div className=" flex itemc justify-center overflow-hidden w-14 h-7">
                                        <Button>
                                            <div className=" bg-blue-300 text-white px-3 capitalize">
                                                <span>View</span>
                                            </div>
                                        </Button>
                                    </div>
                                </th>
                            </tr>
                        </tbody>
                    </table>
                </div >

            </div >
        </>
    );
};

export { AdminDashboard }