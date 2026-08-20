// src/context/ShopContext.tsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react';

import { useAuth } from './AuthContext';

export interface ProductItem {
    id: number | string; // تم تعديلها لتقبل الرقم والنص لمنع أي خطأ في المفضلة
    name: string;
    price: number;
    oldPrice?: number;
    image: string;
    quantity?: number;
    discount?: string;
    rating?: number | string;
    reviews?: number | string;
    selectedSize?: string;
    category?: string;
    description?: string;
}

interface ShopContextType {
    cart: ProductItem[];
    wishlist: ProductItem[];
    products: ProductItem[];

    productsLoading: boolean;
    productsError: string;

    addToCart: (product: ProductItem) => void;
    removeFromCart: (id: number | string) => void;
    updateCartQuantity: (id: number | string, delta: number) => void;
    clearCart: () => void;

    addToWishlist: (product: ProductItem) => void;
    removeFromWishlist: (id: number | string) => void;

    cartCount: number;
    wishlistCount: number;
    cartTotal: number;

    searchTerm: string;
    setSearchTerm: (term: string) => void;

    darkMode: boolean;
    toggleDarkMode: () => void;

    notification: string | null;
    notify: (message: string) => void;
}

const ShopContext = createContext<ShopContextType>({
    cart: [],
    wishlist: [],
    products: [],

    productsLoading: true,
    productsError: '',

    addToCart: () => { },
    removeFromCart: () => { },
    updateCartQuantity: () => { },
    clearCart: () => { },

    addToWishlist: () => { },
    removeFromWishlist: () => { },

    cartCount: 0,
    wishlistCount: 0,
    cartTotal: 0,

    searchTerm: '',
    setSearchTerm: () => { },

    darkMode: false,
    toggleDarkMode: () => { },

    notification: null,
    notify: () => { },
});

const API_URL =
    import.meta.env.VITE_API_URL ||
    'http://localhost:5000/api';

export function ShopProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { user } = useAuth();

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

    const [searchTerm, setSearchTerm] = useState('');
    const [notification, setNotification] = useState<string | null>(null);

    const [products, setProducts] = useState<ProductItem[]>([]);
    const [productsLoading, setProductsLoading] = useState(true);
    const [productsError, setProductsError] = useState('');

    const [cartLoadedFromServer, setCartLoadedFromServer] =
        useState(false);


    // ============================================================
    // DYNAMIC NOTIFICATION SYSTEM (Professional)
    // ============================================================
    const notify = (message: string) => {
        setNotification(message);
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    // ============================================================
    // LOCAL STORAGE & NOTIFICATION TIMEOUT
    // ============================================================

    useEffect(() => {
        localStorage.setItem(
            'wishlist',
            JSON.stringify(wishlist)
        );
    }, [wishlist]);

    useEffect(() => {
        localStorage.setItem(
            'darkMode',
            JSON.stringify(darkMode)
        );

        if (darkMode) {
            document.body.style.backgroundColor = '#121212';
            document.body.style.color = '#FFFFFF';
        } else {
            document.body.style.backgroundColor = '#FFFFFF';
            document.body.style.color = '#000000';
        }
    }, [darkMode]);


    // ============================================================
    // LOAD PRODUCTS
    // ============================================================

    useEffect(() => {
        async function loadProducts() {
            try {
                setProductsLoading(true);
                setProductsError('');

                const response = await fetch(
                    `${API_URL}/products`
                );

                if (!response.ok) {
                    throw new Error(
                        'Failed to load products'
                    );
                }

                const data: ProductItem[] =
                    await response.json();

                setProducts(data);
            } catch (error) {
                console.error(
                    'Products loading error:',
                    error
                );

                setProductsError(
                    'تعذر تحميل المنتجات من السيرفر.'
                );
            } finally {
                setProductsLoading(false);
            }
        }

        loadProducts();
    }, []);


    // ============================================================
    // LOAD CART FOR LOGGED USER
    // ============================================================

    useEffect(() => {
        let cancelled = false;

        async function loadServerCart() {
            if (!user) {
                setCartLoadedFromServer(false);
                return;
            }

            try {
                const response = await fetch(
                    `${API_URL}/cart`,
                    {
                        credentials: 'include',
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        'Failed to load server cart'
                    );
                }

                const data = await response.json();

                if (!cancelled) {
                    setCart(
                        Array.isArray(data.items)
                            ? data.items
                            : []
                    );

                    setCartLoadedFromServer(true);
                }
            } catch (error) {
                console.error(
                    'Cart loading error:',
                    error
                );

                if (!cancelled) {
                    setCartLoadedFromServer(true);
                }
            }
        }

        loadServerCart();

        return () => {
            cancelled = true;
        };
    }, [user]);


    // ============================================================
    // SAVE CART LOCALLY + SERVER
    // ============================================================

    useEffect(() => {
        localStorage.setItem(
            'cart',
            JSON.stringify(cart)
        );

        if (!user || !cartLoadedFromServer) {
            return;
        }

        const saveCart = async () => {
            try {
                await fetch(`${API_URL}/cart`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type':
                            'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        items: cart,
                    }),
                });
            } catch (error) {
                console.error(
                    'Cart save error:',
                    error
                );
            }
        };

        saveCart();
    }, [cart, user, cartLoadedFromServer]);


    // ============================================================
    // DARK MODE
    // ============================================================

    const toggleDarkMode = () => {
        setDarkMode((prev) => !prev);
    };


    // ============================================================
    // CART (Add with Professional Toast Notification)
    // ============================================================

    const addToCart = (product: ProductItem) => {
        const addedQty = product.quantity || 1;

        setCart((prev) => {
            const existing = prev.find(
                (item) =>
                    String(item.id) === String(product.id) &&
                    item.selectedSize ===
                    product.selectedSize
            );

            if (existing) {
                return prev.map((item) =>
                    String(item.id) === String(product.id) &&
                        item.selectedSize ===
                        product.selectedSize
                        ? {
                            ...item,
                            quantity:
                                (item.quantity || 1) +
                                addedQty,
                        }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    quantity: addedQty,
                },
            ];
        });

        notify(`تمت إضافة "${product.name}" إلى السلة بنجاح! 🛒`);
    };

    const removeFromCart = (id: number | string) => {
        setCart((prev) =>
            prev.filter((item) => String(item.id) !== String(id))
        );
    };

    const updateCartQuantity = (
        id: number | string,
        delta: number
    ) => {
        setCart((prev) =>
            prev
                .map((item) => {
                    if (String(item.id) === String(id)) {
                        const newQty =
                            (item.quantity || 1) + delta;

                        return newQty > 0
                            ? {
                                ...item,
                                quantity: newQty,
                            }
                            : null;
                    }

                    return item;
                })
                .filter(Boolean) as ProductItem[]
        );
    };

    const clearCart = () => {
        setCart([]);
    };


    // ============================================================
    // WISHLIST
    // ============================================================

    const addToWishlist = (product: ProductItem) => {
        setWishlist((prev) => {
            const productId = String(product.id);
            const exists = prev.some(
                (item) => String(item.id) === productId
            );

            if (exists) {
                notify('تمت الإزالة من المفضلة 💔');
                return prev.filter(
                    (item) => String(item.id) !== productId
                );
            }

            notify('تمت الإضافة للمفضلة! ❤️');
            return [...prev, product];
        });
    };

    const removeFromWishlist = (id: number | string) => {
        setWishlist((prev) =>
            prev.filter(
                (item) => String(item.id) !== String(id)
            )
        );
    };


    // ============================================================
    // TOTALS
    // ============================================================

    const cartCount = cart.reduce(
        (sum, item) =>
            sum + (item.quantity || 1),
        0
    );

    const wishlistCount = wishlist.length;

    const cartTotal = cart.reduce(
        (sum, item) =>
            sum +
            item.price *
            (item.quantity || 1),
        0
    );


    return (
        <ShopContext.Provider
            value={{
                cart,
                wishlist,
                products,

                productsLoading,
                productsError,

                addToCart,
                removeFromCart,
                updateCartQuantity,
                clearCart,

                addToWishlist,
                removeFromWishlist,

                cartCount,
                wishlistCount,
                cartTotal,

                searchTerm,
                setSearchTerm,

                darkMode,
                toggleDarkMode,

                notification,
                notify,
            }}
        >
            {children}

            {/* نظام التنبيه الاحترافي بتصميم أنيق */}
            {notification && (
                <div style={{
                    position: 'fixed',
                    top: '25px',
                    right: '25px',
                    width: '320px',
                    backgroundColor: darkMode ? '#1a1a1a' : '#ffffff',
                    color: darkMode ? '#ffffff' : '#111827',
                    borderRadius: '8px',
                    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
                    zIndex: 999999,
                    overflow: 'hidden',
                    border: darkMode ? '1px solid #333' : '1px solid #eee',
                    animation: 'slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                    fontFamily: 'Inter, sans-serif'
                }}>
                    <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '18px' }}>✨</div>
                        <p style={{ margin: 0, fontSize: '14px', fontWeight: '500', lineHeight: '1.4' }}>{notification}</p>
                    </div>
                    <div style={{ height: '4px', width: '100%', backgroundColor: '#eee' }}>
                        <div style={{ height: '100%', backgroundColor: '#DB4444', width: '100%', animation: 'progress 3s linear' }}></div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes progress {
                    from { width: 100%; }
                    to { width: 0%; }
                }
            `}</style>
        </ShopContext.Provider>
    );
}

export function useShop() {
    return useContext(ShopContext);
}