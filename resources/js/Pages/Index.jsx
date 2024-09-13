import Container from '@/Layouts/ContainerLayout';
import { Link, Head } from '@inertiajs/react';
import LinkButton from '@/Components/LinkButton'
import { FaRegEdit } from "react-icons/fa";
import { MdReadMore } from "react-icons/md";
import { PiPlusMinusFill } from "react-icons/pi";
import { FaAngleDoubleRight } from "react-icons/fa";
import React, { useState } from 'react';

export default function Index({ products, laravelVersion, phpVersion }) {

    console.log(products)
    const [expandedRows, setExpandedRows] = useState([]);
    const toggleRow = (productId) => {
        if (expandedRows.includes(productId)) {
            setExpandedRows(expandedRows.filter(id => id !== productId));
        } else {
            setExpandedRows([...expandedRows, productId]);
        }
    };

    return (
        <>
            <Head title="Home" />
                <Container 
                    laravelVersion = { laravelVersion }
                    phpVersion = { phpVersion }    
                >
                    <div className="grid gap-2">
                        <LinkButton href='/product/create'>Új Termék hozzáadása</LinkButton>
                        <table className="table-auto w-full text-left" id="productlist">
                            <thead>
                                <tr className='bg-black text-white'>
                                <th>Cikkszám</th>
                                <th>Megnevezés</th>
                                <th>Leírás</th>
                                <th>Állapot</th>
                                <th>Bekerülés</th>
                                <th>Készlet</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            { products.map((product, index) => ( 
                                <>
                                <tr key={product.id}>
                                    <td>{ product.item_number }</td>
                                    <td>{ product.name }</td>
                                    <td>
                                        <div className='block w-full'> 
                                            <span className='inline-block'>{ product.description_short } </span>
                                            <button 
                                                className='inline-block float-right text-green-700'
                                                onClick={() => toggleRow(product.id)}
                                            >
                                                {expandedRows.includes(product.id) ? '< Kevesebbet' : 'Többet >'}
                                            </button>
                                        </div>
                                    </td>
                                    <td>{ product.condition }</td>
                                    <td>{ product.entry_date }</td>
                                    <td>
                                        <div className='block w-full'>
                                            <span className='inline-block align-super w-10'>{ product.actual_stock }</span>
                                            <Link href={'/stock/' + product.id + '/edit'} className='inline-block' title="Bevételezés / Kiadás">
                                                <PiPlusMinusFill className='w-6 h-6' />
                                            </Link>   
                                        </div>                                     
                                    </td>
                                    <td>
                                        <Link href={ '/product/' + product.id + '/edit' }  title="Termek szerkesztése">
                                            <FaRegEdit className='w-6 h-6' />
                                        </Link>
                                    </td>
                                </tr>
                                {expandedRows.includes(product.id) && (   
                                    <tr className='bg-stone-200'>
                                        <td colSpan="7">
                                            <div>
                                                <strong>Leírás:</strong> 
                                                <p>{ product.description }</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}                                  

                                </>             
                            ))}
                            
                            </tbody>
                        </table>
                    </div>
                </Container>
        </>
    );
}
