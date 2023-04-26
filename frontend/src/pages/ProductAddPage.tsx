import React, { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/CategoriesApi';
import { upload } from '../api/FilesApi';
import { getManufacturers } from '../api/ManufacturersApi';
import { addImage, addProduct } from '../api/ProductsApi';
import { CategoryGet } from '../models/Category';
import { ManufacturerGet } from '../models/Manufacturer';
import { ProductAdd, ProductGet, ProductImageAdd } from '../models/Product';

function ProductAddPage() {
    const [manufacturers, setManufacturers] = useState<ManufacturerGet[]>([]);
    const [categories, setCategories] = useState<CategoryGet[]>([]);

    useEffect(() => {
        getManufacturers().then((response) => {
            setManufacturers(response.data);
        });
    }, []);
    useEffect(() => {
        getCategories().then((response) => {
            setCategories(response.data);
        });
    }, []);
    // console.log(categories);
    const handleManufacturerChange = (event: { target: { value: string } }) => {
        setproductManufacturer(parseInt(event.target.value));
    };

    const handleCategoriesChange = (event: { target: { value: string } }) => {
        setproductCategory(parseInt(event.target.value));
    };

    const [productManufacturer, setproductManufacturer] = React.useState(1);
    const [productName, setproductName] = useState<string>('');
    const [productDescription, setproductDescription] = useState<string>('');
    const [productPrice, setproductPrice] = useState<number>(0);
    const [productCategory, setproductCategory] = React.useState(1);

    const [fileList, setFileList] = useState<FileList | null>(null);
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileList(e.target.files);
    };

    async function handleSubmit() {
        if (fileList == null) {
            addProduct(
                new ProductAdd(
                    productManufacturer,
                    productCategory,
                    productName,
                    productDescription,
                    productPrice
                )
            );
            return;
        }
        const fileArray: File[] = Array.from(fileList);
        addProduct(
            new ProductAdd(
                productManufacturer,
                productCategory,
                productName,
                productDescription,
                productPrice
            )
        ).then((response) => {
            const req: ProductGet = response.data;
            fileArray.forEach((file) => {
                const name = 'products/' + String(req.id) + '_' + file.name;
                upload(file, name);
                addImage(new ProductImageAdd('', name, name, req.id));
            });
        });
    }

    return (
        <div className="flex flex-col">
            <div className="grid grid-rows-2 items-center justify-center">
                <div>
                    <div className="pt-[30px] text-fs-heading mb-[30px] font-bold ">
                        <dl className="max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700">
                            <div className="flex flex-col pb-3">
                                <label>
                                    Name
                                    <br />
                                    <input
                                        type="text"
                                        className="w-[448px] bg-bg-secondary  focus:outline-none"
                                        value={productName}
                                        onChange={(event) => setproductName(event.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col py-3">
                                <label>
                                    Manufacturer
                                    <br />
                                    <select
                                        className="w-[448px] bg-bg-secondary  focus:outline-none"
                                        value={productManufacturer}
                                        onChange={handleManufacturerChange}>
                                        {manufacturers.map((option) => (
                                            <option value={option.id}>{option.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="flex flex-col py-3">
                                <label>
                                    Category
                                    <br />
                                    <select
                                        className="w-[448px] bg-bg-secondary  focus:outline-none"
                                        value={productCategory}
                                        onChange={handleCategoriesChange}>
                                        {categories.map((option) => (
                                            <option value={option.id}>{option.name}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <div className="flex flex-col pt-3">
                                <label>
                                    Price
                                    <br />
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="w-[448px] bg-bg-secondary  focus:outline-none"
                                        value={productPrice}
                                        onChange={(event) =>
                                            setproductPrice(parseFloat(event.target.value))
                                        }
                                    />
                                </label>
                            </div>
                            <div className="flex flex-col py-3">
                                <label>
                                    Description
                                    <br />
                                    <textarea
                                        className="w-[448px] h-[100px] bg-bg-secondary border-b-[1px] focus:outline-none"
                                        value={productDescription}
                                        onChange={(event) =>
                                            setproductDescription(event.target.value)
                                        }
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col py-3">
                                <label>
                                    Files
                                    <br />
                                    <input
                                        type="file"
                                        className="mb-2"
                                        onChange={handleFileChange}
                                        multiple
                                    />
                                </label>
                            </div>
                        </dl>
                    </div>
                    <div className="flex flex-col mx-auto ml-[150px]">
                        <Link to={'/products/'} className="pb-1">
                            <button
                                className="bg-bg-extra w-[100px]"
                                type="submit"
                                onClick={handleSubmit}>
                                Save
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductAddPage;