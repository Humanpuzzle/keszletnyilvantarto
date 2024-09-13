import Container from '@/Layouts/ContainerLayout';
import Breadcrumb from '@/Components/Breadcrumb'
import PrimaryButton from '@/Components/PrimaryButton'
import { Head } from "@inertiajs/react";
import { React, useState, useEffect }from "react";
import axios from 'axios';

export default function Edit({ item, csrfToken, laravelVersion, phpVersion }) {

    const [formData, setFormData] = useState({
        item_number: '',
        name: '',
        description: '',
        condition: '',   
    });

    useEffect(() => {
        if (item) {
          setFormData({
            item_number: item.item_number,
            name: item.name,
            description: item.description,
            condition: item.condition,
          });
        }
      }, [item]);    

    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});
        setSuccessMessage('');

        try {
            const response = await axios.patch('/product/'+ item.id, formData, {
                headers: {
                    'X-CSRF-TOKEN': csrfToken,
                },
            });
            setSuccessMessage(response.data.message);
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
            <Head title="Termék szerkesztése" />
            <Container 
                    laravelVersion = { laravelVersion }
                    phpVersion = { phpVersion }    
            >
                <Breadcrumb>Termék szerkesztése</Breadcrumb>
                <h2 className="my-8 text-base font-semibold leading-7 text-gray-900">Termék szerkesztése: { formData.name }</h2>
                <form onSubmit={handleSubmit}>
                    <div className="col-span-full">
                        <label htmlFor="item_number" className="block text-sm font-bold leading-6 text-gray-900">
                            Cikkszám
                        </label>
                        <div className="mt-2">
                            <input
                            id="item_number"
                            name="item_number"
                            type="text"
                            maxLength="7"
                            value={formData.item_number}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                            />
                            {errors.item_number && <div className='my-2 text-red-700'>{errors.item_number}</div>}
                        </div>
                    </div>
                    
                    <div className="col-span-full mt-4">
                        <label htmlFor="name" className="block text-sm font-bold leading-6 text-gray-900">
                        Megnevezés
                        </label>
                        <div className="mt-2">
                            <input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                            />
                            {errors.name && <div className='my-2 text-red-700'>{errors.name}</div>}
                        </div>
                    </div>

                    <div className="col-span-full mt-4">
                        <label htmlFor="description" className="block text-sm font-bold leading-6 text-gray-900">
                            Leírás
                        </label>
                        <div className="mt-2">
                            <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                            />
                        </div>
                        {errors.description && <div className='my-2 text-red-700'>{errors.description}</div>}
                        <p className="mt-3 text-sm leading-6 text-gray-600">A termék leírása.</p>
                    </div>                   

                    <div className="sm:col-span-3 mt-4">
                        <label htmlFor="condition" className="block text-sm font-bold leading-6 text-gray-900">                         
                            Állapot
                        </label>
                        <div className="mt-2">
                            <select
                            id="condition"
                            name="condition"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={handleChange}
                            value={formData.condition}
                            >
                                <option></option>
                                <option>Új</option>
                                <option>Használt</option>
                                <option>Felújított</option>
                                <option>Tesztelt</option>
                                <option>Sérült</option>
                            </select>
                            {errors.condition && <div className='my-2 text-red-700'>{errors.condition}</div>}
                        </div>
                    </div>

                    <PrimaryButton className="mt-8" type="submit" disabled={processing}>Mentés</PrimaryButton>
                    {successMessage && <p  className='my-2 text-green-700 text-xl'>{successMessage}</p>}
                </form>
            </Container>
        </>
    );

}[]
