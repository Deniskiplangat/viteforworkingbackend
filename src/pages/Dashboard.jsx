import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider'; // Import the AuthProvider

const Dashboard = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const { user, logout } = useAuth(); // Use the AuthProvider context

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/productinfo', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setProducts(response.data);
                console.log(response.data)
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch products');
                if (err.response?.status === 403) {
                    logout(); // Logout if token is invalid
                }
            }
        };

        fetchProducts();
    }, [logout]);

    return (
        <div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {products.map((product) => (
                    <li key={product.productid}>{product.productname}</li> // Adjust according to your product structure
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;