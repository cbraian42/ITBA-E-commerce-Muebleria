import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CreateProduct.css';
import { crearProducto } from '../api';



function CreateProduct() {

    const navigate = useNavigate();

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
        <div className="create-product-page">
            <form onSubmit={handleSubmit} className="form-container">
                <h1 className="form-title">Crear Producto</h1>

                {/* Detalles principales del producto */}
                <div className="form-section">
                    <div className="form-group">
                        <label htmlFor="name">Nombre del Producto</label>
                        <input type="text" id="name" name="name" value={name} onChange={onInputChangeProduct} required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" name="price" value={price} onChange={onInputChangeProduct} required min="0" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Descripción</label>
                        <textarea id="description" name="description" value={description} onChange={onInputChangeProduct} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="stock">Stock</label>
                        <input type="number" id="stock" name="stock" value={stock} onChange={onInputChangeProduct} min="0" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">URL de la Imagen (opcional)</label>
                        <input type="text" id="image" name="image" placeholder="ej. Mesa-Aconcagua.png" value={image} onChange={onInputChangeProduct} />
                    </div>
                </div>

                {/* Sección de Características */}
                <div className="form-section">
                    <h2 className="section-title">Características</h2>

                    {/* Formulario para añadir nueva característica */}
                    <div className="add-feature-form">
                        <div className="form-group">
                            <label htmlFor="feature-name">Nombre</label>
                            <input type="text" id="feature-name" name="name" value={newFeature.name} onChange={onInputChangeFeature} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="feature-value">Valor</label>
                            <input type="text" id="feature-value" name="value" value={newFeature.value} onChange={onInputChangeFeature} />
                        </div>
                        <button type="button" onClick={handleAddFeature} className="btn btn-secondary">
                            Añadir Característica
                        </button>
                    </div>

                    {/* Lista de características añadidas */}
                    <div className="feature-list">
                        {features.length > 0 ? (
                            features.map((feature, index) => (
                                <div key={index} className="feature-chip">
                                    <span><strong>{feature.name}:</strong> {feature.value}</span>
                                    <button type="button" onClick={() => handleRemoveFeature(index)} className="btn-remove-feature" aria-label="Eliminar característica">
                                        &times;
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="no-features-text">Aún no se han agregado características.</p>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-submit">
                    Crear Producto
                </button>
            </form>
        </div>
    );
}

export default CreateProduct
