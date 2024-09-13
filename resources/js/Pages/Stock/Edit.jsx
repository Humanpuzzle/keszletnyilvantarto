import Container from '@/Layouts/ContainerLayout';
import Breadcrumb from '@/Components/Breadcrumb'
import PrimaryButton from '@/Components/PrimaryButton'
import { Head} from "@inertiajs/react";
import React, { useState, useEffect }from "react";
import axios from 'axios';

export default function Edit({ product_id, stock, actual_stock, csrfToken, laravelVersion, phpVersion }) {

    console.log(actual_stock) 

    const [formData, setFormData] = useState({
        amount: '',
        move_type: ''  
    });
    
    const [actualData, setActualStock] = useState({
        amount: ''  
    });

    useEffect(() => {
        if (actual_stock) {
            setActualStock({
                amount: actual_stock
            });
        }
    }, [actual_stock]); 

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        
    };

    // Submit form handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setSuccessMessage('');

        console.log(formData)
        try {
            const response = await axios.post('/stock/store/'+ product_id, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            
            // Reset form and show success message
            setFormData({ amount: '', move_type: '' });
            setSuccessMessage(response.data.message);

            let newStock = parseInt(actualData.amount);
            if(formData.move_type === "in") {
                newStock += parseInt(formData.amount )  
            }
            else if(formData.move_type === "out") {
                newStock -= parseInt(formData.amount)  
            }
            setActualStock({
                amount: newStock 
            });            
        } catch (error) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors); // Laravel validation errors
            } else {
                console.error("An error occurred:", error);
            }
        } finally {
            setProcessing(false);
        }
    };    

    return (
        <>
            <Head title="Készlet bevételezése, kiadása" />
            <Container 
                    laravelVersion = { laravelVersion }
                    phpVersion = { phpVersion }    
            >
                <Breadcrumb>Készlet bevételezése, kiadása</Breadcrumb>
                <h2 className="mt-8 mb-4 text-base font-semibold leading-7 text-gray-900">Készlet bevételezése, kiadása</h2>
                <span className='font-bold mb-4 block'>Aktualis készlet: { actualData.amount }</span>
                <form onSubmit={handleSubmit}>
                    <div className="col-span-full">
                        <label htmlFor="item_number" className="block text-sm font-bold leading-6 text-gray-900">
                            Mennyiseg
                        </label>
                        <div className="mt-2">
                            <input
                            id="amount"
                            name="amount"
                            type="number"
                            min="1"
                            value={formData.amount}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                            />
                            {errors.amount && <div className='my-2 text-red-700'>{errors.amount}</div>}
                        </div>
                    </div>

                    <div className="sm:col-span-3 mt-4">
                        <label htmlFor="condition" className="block text-sm font-bold leading-6 text-gray-900">                         
                            Tipus
                        </label>
                        <div className="mt-2">
                            <select
                            id="move_type"
                            name="move_type"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleChange}
                            value={formData.move_type}
                            >
                                <option></option>
                                <option value="in">Bevételezés</option>
                                <option value="out">Kiadás</option>
                            </select>
                            {errors.tymove_typepe && <div className='my-2 text-red-700'>{errors.move_type}</div>}
                        </div>
                    </div>

                    <PrimaryButton className="mt-8" type="submit" disabled={processing}>Mentés</PrimaryButton>
                    {successMessage && <p  className='my-2 text-green-700 text-xl'>{successMessage}</p>}
                </form>
            </Container>
        </>
    );

}[]
