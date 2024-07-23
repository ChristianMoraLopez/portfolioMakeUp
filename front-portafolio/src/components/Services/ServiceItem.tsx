import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import useServices from '@/hooks/useservices';
import { useAuth } from '@/hooks/auth';
import { useCart, useCartMutations, Service } from '@store/Cart';
import { useRouter } from 'next/router';
import { Trash2, Edit2, ShoppingCart, Plus, Minus, DollarSign } from 'lucide-react';

interface ServiceItemProps {
    service: Service;
    onDelete: (id: number) => void;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ service, onDelete }) => {
    const { deleteService } = useServices();
    const { user, checkRole } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { itemsById } = useCart();
    const { addToCart, removeFromCart } = useCartMutations();
    const router = useRouter();

    useEffect(() => {
        const fetchUserStatus = async () => {
            const role = await checkRole();
            setIsAdmin(role === 'admin');
            setIsAuthenticated(!!user);
        };
        fetchUserStatus();
    }, [checkRole, user]);

    const handleDelete = async () => {
        if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
            setIsDeleting(true);
            try {
                await deleteService(service.id);
                onDelete(service.id);
            } catch (error) {
                console.error('Error al eliminar el servicio:', error);
            } finally {
                setIsDeleting(false);
            }
        }
    };

    const handleModify = () => {
        console.log('Modificar servicio:', service.id);
    };

    const handleAddToCart = () => {
        addToCart(service);
    };

    const handleRemoveFromCart = () => {
        removeFromCart(service.id);
    };

    const handleBuy = () => {
        addToCart(service);
        router.push('/cart');
    };

    const itemInCart = itemsById[service.id];
    const quantityInCart = itemInCart ? itemInCart.quantity : 0;

    const formatPrice = (price: number | string) => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
    };

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative w-full h-96 overflow-hidden">
                <Image 
                    src={service.image_url || '/placeholder-image.jpg'} 
                    alt={service.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 600px) 100vw, 50vw" // Ajusta según el diseño de tu página
                    className="transition-transform duration-300 hover:scale-105"
                />
                {(isAdmin || isAuthenticated) && (
                    <div className="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 rounded-bl-lg font-semibold">
                        <DollarSign className="inline-block mr-1" size={16} />
                        {formatPrice(service.price)}
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{service.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
                
                {isAdmin && (
                    <div className="flex justify-between space-x-4">
                        <button
                            className="flex-1 flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                            onClick={handleDelete}
                            disabled={isDeleting}
                        >
                            <Trash2 className="mr-2" size={18} />
                            {isDeleting ? 'Eliminando...' : 'Eliminar'}
                        </button>
                        <button
                            className="flex-1 flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={handleModify}
                        >
                            <Edit2 className="mr-2" size={18} />
                            Modificar
                        </button>
                    </div>
                )}
                
                {isAuthenticated && !isAdmin && (
                    <div className="space-y-3">
                        <button
                            className="w-full bg-green-500 text-white px-6 py-3 rounded-full transition-colors duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 font-semibold text-lg"
                            onClick={handleBuy}
                        >
                            Comprar ahora
                        </button>
                        <div className="flex items-center justify-between">
                            <button
                                className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-full transition-colors duration-300 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 mr-2 font-semibold"
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart className="inline-block mr-2" size={18} />
                                Agregar al carrito
                            </button>
                            {quantityInCart > 0 && (
                                <div className="flex items-center bg-gray-100 rounded-full p-1">
                                    <button
                                        className="p-2 text-red-500 hover:text-red-600 focus:outline-none transition-colors duration-300"
                                        onClick={handleRemoveFromCart}
                                    >
                                        <Minus size={18} />
                                    </button>
                                    <span className="px-3 font-medium text-gray-700">{quantityInCart}</span>
                                    <button
                                        className="p-2 text-green-500 hover:text-green-600 focus:outline-none transition-colors duration-300"
                                        onClick={handleAddToCart}
                                    >
                                        <Plus size={18} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            {isDeleting && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl">
                        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                        <p className="text-gray-700 font-semibold">Eliminando servicio...</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceItem;
