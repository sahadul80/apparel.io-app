'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { CartItem } from '../types/productDisplay';

interface CartProps {
    isOpen: boolean;
    closeCart: () => void;
    cartItems: CartItem[];
    updateQuantity: (id: number, newQuantity: number) => void;
    removeItem: (id: number) => void;
}

const Cart = ({ isOpen, closeCart, cartItems, updateQuantity, removeItem }: CartProps) => {
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price! * item.quantity!, 0);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        key="overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50"
                        onClick={closeCart}
                    />

                    {/* Cart Panel */}
                    <motion.div
                        key="cart"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', ease: 'easeInOut' }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-amber-50 shadow-lg flex flex-col z-50 dark:bg-stone-900 text-emerald-700 dark:text-emerald-300 border-l border-stone-200 dark:border-stone-700"
                    >
                        <div className="flex justify-between items-center p-4 border-b border-stone-200 dark:border-stone-700">
                            <h2 className="text-xl font-bold text-emerald-900 dark:text-emerald-100">Your Shopping Bag</h2>
                            <button
                                onClick={closeCart}
                                className="text-stone-600 hover:text-amber-600 transition-colors dark:text-stone-400 dark:hover:text-amber-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto flex-1">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <svg
                                        className="mx-auto h-12 w-12 text-stone-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1}
                                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                        />
                                    </svg>
                                    <p className="mt-4 text-stone-500 dark:text-stone-400">Your bag is empty</p>
                                    <button
                                        onClick={closeCart}
                                        className="mt-4 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="flex gap-4 border-b border-stone-200 dark:border-stone-700 pb-4"
                                        >
                                            <div className="w-20 h-20 relative flex-shrink-0">
                                                <Image
                                                    src={item.image!}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover rounded-lg"
                                                    sizes="(max-width: 80px) 100vw"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium text-emerald-900 dark:text-emerald-100">{item.name}</h3>
                                                <p className="text-emerald-600 dark:text-emerald-400">${item.price?.toFixed(2)}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center border border-stone-300 dark:border-stone-600 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity! - 1)}
                                                            className="px-3 py-1 hover:bg-stone-100 dark:hover:bg-stone-800 text-emerald-700 dark:text-emerald-300 transition-colors"
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-3 text-emerald-900 dark:text-emerald-100">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity! + 1)}
                                                            className="px-3 py-1 hover:bg-stone-100 dark:hover:bg-stone-800 text-emerald-700 dark:text-emerald-300 transition-colors"
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 text-sm transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="border-t border-stone-200 dark:border-stone-700 p-4"
                            >
                                <div className="flex justify-between text-lg font-bold mb-4">
                                    <span className="text-emerald-900 dark:text-emerald-100">Total:</span>
                                    <span className="text-emerald-900 dark:text-emerald-100">${calculateTotal().toFixed(2)}</span>
                                </div>
                                <button className="w-full bg-amber-600 text-white py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium shadow-lg">
                                    Proceed to Checkout
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;