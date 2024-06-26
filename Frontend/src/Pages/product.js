import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TiArrowBack } from "react-icons/ti";
import { Link, useParams } from 'react-router-dom';
import Rating from './Rating';
import './product.css';
import Navbar from '../Components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [loadingReview, setLoadingReview] = useState(false);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const res = await axios.get(`http://localhost:8000/api/Product/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                setError(error);
            }
        };
        fetchData();
    }, [id]);

    const submitHandler = async (e) => {
        e.preventDefault();
    
        confirmAlert({
            title: 'Confirm Review Submission',
            message: 'Are you sure you want to submit this review?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        setLoadingReview(true);
                        try {
                            await axios.post(`http://localhost:8000/api/Product/reviews/${id}`, { rating, comment });
    
                            setLoadingReview(false);
                            toast.success('Review created successfully'); // Modify this as per your requirement
                            setRating(0);
                            setComment('');
    
                            const res = await axios.get(`http://localhost:8000/api/Product/products/${id}`);
                            setProduct(res.data);
                        } catch (err) {
                            setLoadingReview(false);
                            toast.error(err?.response?.data?.message || 'Failed to create review'); // Modify this as per your requirement
                        }
                    }
                },
                {
                    label: 'No',
                    onClick: () => {} // Do nothing if user cancels
                }
            ]
        });
    };
    const addToCartHandler = () => {
        // Add to cart logic
        toast.success('Added to cart'); // Modify this as per your requirement
    };

    const buyNowHandler = () => {
        // Buy now logic
        toast.success('Buy now'); // Modify this as per your requirement
    };

    return (
        <>
        <Navbar />
        <div className="Pproduct-container">
            <Link className='pgbutton' to='/ProductsView'>
            <TiArrowBack />Back
            </Link>
            {product ? (
                <div className="Pproduct-details">
                    <div className="Pproduct-image">
                        <img src={product.uquantity} alt={product.name} />
                    </div>
                    <div className="Pproduct-info">
                        <h1 class="Pname">{product.name}</h1>
                        <Rating
                            value={product.rating}
                            text={`  ${product.numReviews} reviews`}
                        />
                        <p className="Pcategory">Category: {product.type}</p>
                        <p className="Pquantity">Remaining Quantity: <span style={{ color: product.rquantity < 10 ? 'red' : 'black' }}>{product.rquantity < 10 ? 'Out of Stock' : product.rquantity}</span></p>
                        <p className="Pprice">Price: <span style={{ color: 'red', fontSize: '35px' }}>Rs. {product.totalPrice}</span></p>
                        <div className="Pquantity-control">
                        <div className="Pquant"> Quantity:
                            <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} className="Pbtn">-</button>
                            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            <button onClick={() => setQuantity(quantity + 1)} className="Pbtn">+</button>
                            </div>
                        </div>
                        <div className="Pbutton">
                        <button onClick={addToCartHandler} className="Pbtn Pbtn-primary">Add to Cart</button>
                        <button onClick={buyNowHandler} className="Pbtn Pbtn-success">Buy Now</button>
                        </div>
                    </div>
                </div>
            ) : loadingReview ? (
                <div>Loading product details...</div>
            ) : error ? (
                <div>Error: {error.message || 'Failed to fetch product details'}</div>
            ) : null}
            <div className="Preview-section">
                <div className="Preview">
                <h2>Reviews & Ratings</h2>
                {product && product.reviews.length === 0 && <div>No Reviews</div>}
                {product && (
                    <div className="Previews">
                        {product.reviews.map((review, index) => (
                            <div key={index} className="Preview-item">
                                <p>{review.comment}</p>
                                <Rating value={review.rating} />
                                
                            </div>
                        ))}
                    </div>
                )}
                </div>
                <div className="Pwrite-review">
                    <h2>Write Your Product Review</h2>
                    {loadingReview && <div>Submitting review...</div>}
                    <form onSubmit={submitHandler}>
                        <div className='Rating'>
                            <label>Rating: </label>
                            <select 
                                className='Rating-no'
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                required
                            >
                                <option value=''>Select...</option>
                                <option value='1'>1 - Poor</option>
                                <option value='2'>2 - Fair</option>
                                <option value='3'>3 - Good</option>
                                <option value='4'>4 - Very Good</option>
                                <option value='5'>5 - Excellent</option>
                            </select>
                        </div>
                        <div className='Comment'>
                            <label>Comment:</label>
                            <textarea
                                className='Comment-no'
                                rows={3}
                                value={comment}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value.length <= 50) {
                                        setComment(value);
                                    }
                                }}
                                required
                            ></textarea>
                        </div>
                        <button type='submit' className="PRbtn" disabled={loadingReview}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
};

export default Product;
