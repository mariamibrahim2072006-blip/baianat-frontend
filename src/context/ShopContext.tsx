import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface ProductItem {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    quantity?: number;
    discount?: string;
    rating?: string;
    reviews?: string;
}

interface ShopContextType {
    cart: ProductItem[];
    wishlist: ProductItem[];
    addToCart: (product: ProductItem) => void;
    removeFromCart: (id: number) => void;
    updateCartQuantity: (id: number, delta: number) => void;
    addToWishlist: (product: ProductItem) => void;
    removeFromWishlist: (id: number) => void;
    cartCount: number;
    wishlistCount: number;
    cartTotal: number;
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    darkMode: boolean;
    toggleDarkMode: () => void;
}

const ShopContext = createContext<ShopContextType>({
    cart: [],
    wishlist: [],
    addToCart: () => { },
    removeFromCart: () => { },
    updateCartQuantity: () => { },
    addToWishlist: () => { },
    removeFromWishlist: () => { },
    cartCount: 0,
    wishlistCount: 0,
    cartTotal: 0,
    searchTerm: '',
    setSearchTerm: () => { },
    darkMode: false,
    toggleDarkMode: () => { },
});

export function ShopProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<ProductItem[]>(() => {
        const saved = localStorage.getItem('cart');
        return saved ? JSON.parse(saved) : [];
    });

    const [wishlist, setWishlist] = useState<ProductItem[]>(() => {
        const saved = localStorage.getItem('wishlist');
        return saved ? JSON.parse(saved) : [];
    });

    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#FFFFFF';
        } else {
            document.body.style.backgroundColor = '#FFFFFF';
            document.body.style.color = '#000000';
        }
    }, [darkMode]);

    const toggleDarkMode = () => setDarkMode((prev) => !prev);

    const addToCart = (product: ProductItem) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const addToWishlist = (product: ProductItem) => {
        setWishlist((prev) => {
            const exists = prev.some((item) => item.id === product.id);
            if (exists) {
                return prev.filter((item) => item.id !== product.id);
            }
            return [...prev, product];
        });
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const updateCartQuantity = (id: number, delta: number) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (item.id === id) {
                        const newQty = (item.quantity || 1) + delta;
                        return newQty > 0 ? { ...item, quantity: newQty } : null;
                    }
                    return item;
                })
                .filter(Boolean) as ProductItem[]
        );
    };

    const removeFromWishlist = (id: number) => {
        setWishlist((prev) => prev.filter((item) => item.id !== id));
    };

    const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const wishlistCount = wishlist.length;
    const cartTotal = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    return (
        <ShopContext.Provider
            value={{
                cart,
                wishlist,
                addToCart,
                removeFromCart,
                updateCartQuantity,
                addToWishlist,
                removeFromWishlist,
                cartCount,
                wishlistCount,
                cartTotal,
                searchTerm,
                setSearchTerm,
                darkMode,
                toggleDarkMode,
            }}
        >
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    return useContext(ShopContext);
}