// ServiceItem.tsx
import React, { useState, useEffect } from 'react';
import ImageWithFallback from '@components/Services/ImageWithFallback';
import useServices from '@/hooks/useservices';
import { useAuth } from '@/hooks/auth';
import { useCart, useCartMutations, Service } from '@store/Cart'; // Importa los hooks del carrito
import { useRouter } from 'next/router'; // Importa useRouter

interface ServiceItemProps {
    service: Service;
    onDelete: (id: number) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onDelete }) => {
    const { deleteService } = useServices();
    const { user, checkRole } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const { itemsById } = useCart(); // Obtiene el estado actual del carrito
    const { addToCart, removeFromCart } = useCartMutations(); // Obtiene las funciones para modificar el carrito
    const router = useRouter(); // Obtén el router

    useEffect(() => {
        const fetchRole = async () => {
            const role = await checkRole();
            setIsAdmin(role === 'admin');
        };
        fetchRole();
    }, [checkRole]);

    const handleDelete = async () => {
        if (confirm('Are you sure you want to delete this service?')) {
            setIsDeleting(true);
            try {
                await deleteService(service.id);
                onDelete(service.id);
            } catch (error) {
                console.error('Error deleting service:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleModify = () => {
        // Implement modify functionality
        console.log('Modify service:', service.id);
    };

    const handleAddToCart = () => {
        addToCart(service);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(service.id);
    };

    const handleBuy = () => {
        addToCart(service); // Agrega el producto al carrito
        router.push('/cart'); // Redirige a la página de carrito
    };

    const itemInCart = itemsById[service.id];
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-lg font-bold">{service.name}</h3>
            <ImageWithFallback src={service.image_url} alt={service.name} />
            <p>{service.description}</p>
            <p>Precio: {service.price}</p>
           
            {isAdmin ? (
                <>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded mt-2 mr-2"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Eliminando...' : 'Eliminar'}
                    </button>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        onClick={handleModify}
                    >
                        Modificar
                    </button>
                </>
            ) : (
                <>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mt-2 mr-2"
                        onClick={handleBuy}
                    >
                        Comprar
                    </button>
                    <div className="flex items-center mt-2">
                        <button
                            className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleAddToCart}
                        >
                            Agregar al carrito
                        </button>
                        {quantityInCart > 0 && (
                            <>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                                    onClick={handleRemoveFromCart}
                                >
                                    -
                                </button>
                                <span>{quantityInCart} en el carrito</span>
                            </>
                        )}
                    </div>
                </>
            )}
            {isDeleting && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default ServiceItem;
