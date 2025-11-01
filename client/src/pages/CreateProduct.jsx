import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css';
import { crearProducto } from '../api';



function CreateProduct() {

    const navigate = useNavigate();

    const [hasImage, setHasImage] = useState(false);

    const [product, setProduct] = useState({
        name: "",
        price: 0,
        description: "",
        stock: 0,
        image: "",
        features: []
    });

    const { name, price, description, stock, image, features } = product;

    const [newFeature, setNewFeature] = useState({
        name: "",
        value: ""
    });

    const onChangeHasImage = () => {
        setHasImage(prevHasImage => !prevHasImage);
    }

    const onInputChangeProduct = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const onInputChangeFeature = (e) => {
        const { name, value } = e.target;
        setNewFeature(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleAddFeature = () => {
        if (newFeature.name === "" || newFeature.value === "") {
            alert("Complete los campos de la caracteristica a agregar");
            return;
        }

        setProduct(prev => ({
            ...prev,
            features: [...prev.features, newFeature]
        }));

        setNewFeature({ name: "", value: "" });

    };

    const handleRemoveFeature = (indexToRemove) => {
        setProduct(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== indexToRemove)
        }));
    };

    const formReset = () => {
        setProduct({
            name: "",
            price: 0,
            description: "",
            image: "",
            features: []
        });
        setNewFeature({ name: "", value: "" });
        setHasImage(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await crearProducto(product);
            console.log('Producto creado:', data);
            alert('Producto creado con exito');

            //reset de formulario, mas "ordenado" en una funcion
            formReset();
            alert('Redirigiendo al catalogo...')
            navigate("/productos");

        } catch (error) {
            console.error(error);
            console.log(product);
            alert('No fue posible crear el producto');
        }
    };

    return (
        <div className="add-product-page">
            <div className="add-product-box">
                <div className="add-product-content">
                    {/* izquierda*/}
                    <div className="add-product-left">
                        <form onSubmit={handleSubmit} className="add-product-form">
                            <h1>Crear producto</h1>

                            <div className="form-group">
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="name" value={name} onChange={onInputChangeProduct} required minLength="1" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Precio</label>
                                <input type="number" id="price" name="price" value={price} onChange={onInputChangeProduct} required />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Descripción</label>
                                <textarea id="description" name="description" value={description} onChange={onInputChangeProduct} required minLength="1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" id="stock" name="stock" value={stock} onChange={onInputChangeProduct} />
                            </div>
                            <div className="form-group-w-checkbox">
                                <label htmlFor="imageCbx">El producto posee imagen</label>
                                <input type="checkbox" id="imageCbx" onChange={onChangeHasImage} checked={hasImage} />
                                {hasImage && (
                                    <div className="form-group">
                                        <label htmlFor="image">URL de la imagen</label>
                                        <input type="text" id="image" name="image" placeholder='ej. Mesa-de-Noche-Aconcagua.png' value={image} onChange={onInputChangeProduct} required minLength="1" />
                                    </div>
                                )}
                            </div>
                            <div className="form-group">
                                <p>Agregar caracteristica</p>
                                <label htmlFor="name">Nombre</label>
                                <input type="text" id="name" name="name" value={newFeature.name} onChange={onInputChangeFeature} />
                                <label htmlFor="value">Valores de la caracteristica</label>
                                <input type="text" id="value" name="value" value={newFeature.value} onChange={onInputChangeFeature} />
                                <button type='button' onClick={handleAddFeature} className="btn-caracteristica">Añadir caracteristica</button>
                            </div>

                            <button type="submit" className="btn btn-primary">Crear</button>
                        </form>
                    </div>
                    {/* derecha */}
                    <div className="add-product-right">
                        <h2>Lista de caracteristicas</h2>
                        <div className="grid grid-cols-2 gap-4 text-black">
                            {features.length === 0 ? (<p className='add-product-right-p'>Todavia no se agrego ninguna caracteristica del producto</p>) : null}
                            {features.map((f, index) => (
                                <div key={index} >
                                    <p>Nombre: {f.name}</p>
                                    <p>Propiedades: {f.value}</p>
                                    <button type="button" onClick={() => handleRemoveFeature(index)}>Eliminar</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct
