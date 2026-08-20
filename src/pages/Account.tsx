// src/pages/Account.tsx
import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api';

type Tab =
  | 'profile'
  | 'address'
  | 'payment'
  | 'orders'
  | 'returns'
  | 'cancellations';

type OrderItem = {
  id: string;
  productLegacyId: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string | null;
};

type Order = {
  id: string;
  total: number;
  address: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
};

export default function Account() {
  const {
    user,
    loading,
    updateUser,
    logout,
  } = useAuth();

  const {
    wishlist,
    darkMode,
  } = useShop();

  const navigate = useNavigate();

  const [activeTab, setActiveTab] =
    useState<Tab>('profile');

  const [editingProfile, setEditingProfile] =
    useState(false);

  const [firstName, setFirstName] =
    useState('');

  const [lastName, setLastName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [address, setAddress] =
    useState('');

  const [currentPassword, setCurrentPassword] =
    useState('');

  const [newPassword, setNewPassword] =
    useState('');

  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [ordersLoading, setOrdersLoading] =
    useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    const nameParts =
      user.username
        .trim()
        .split(/\s+/);

    setFirstName(
      nameParts[0] || ''
    );

    setLastName(
      nameParts
        .slice(1)
        .join(' ')
    );

    setEmail(
      user.email || ''
    );

    setAddress(
      user.address || ''
    );
  }, [user]);

  useEffect(() => {
    if (
      activeTab !== 'orders' ||
      !user
    ) {
      return;
    }

    const loadOrders =
      async () => {
        try {
          setOrdersLoading(true);

          const response =
            await fetch(
              `${API_URL}/orders`,
              {
                credentials:
                  'include',
              }
            );

          if (!response.ok) {
            throw new Error(
              'Failed to load orders'
            );
          }

          const data =
            await response.json();

          setOrders(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (err) {
          console.error(
            'Orders loading error:',
            err
          );
        } finally {
          setOrdersLoading(
            false
          );
        }
      };

    loadOrders();
  }, [activeTab, user]);

  const resetForm = () => {
    if (!user) {
      return;
    }

    const nameParts =
      user.username
        .trim()
        .split(/\s+/);

    setFirstName(
      nameParts[0] || ''
    );

    setLastName(
      nameParts
        .slice(1)
        .join(' ')
    );

    setEmail(
      user.email || ''
    );

    setAddress(
      user.address || ''
    );

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMessage('');
    setError('');
  };

  const handleSaveProfile =
    async (
      e: FormEvent
    ) => {
      e.preventDefault();

      setMessage('');
      setError('');

      if (!email.trim()) {
        setError(
          'البريد الإلكتروني مطلوب.'
        );
        return;
      }

      if (
        newPassword ||
        currentPassword ||
        confirmPassword
      ) {
        if (!currentPassword) {
          setError(
            'أدخل كلمة المرور الحالية.'
          );
          return;
        }

        if (!newPassword) {
          setError(
            'أدخل كلمة المرور الجديدة.'
          );
          return;
        }

        if (
          newPassword !==
          confirmPassword
        ) {
          setError(
            'تأكيد كلمة المرور غير مطابق.'
          );
          return;
        }
      }

      setSaving(true);

      try {
        await updateUser({
          firstName:
            firstName.trim(),
          lastName:
            lastName.trim(),
          email:
            email.trim(),
          address:
            address.trim(),
          currentPassword:
            currentPassword ||
            undefined,
          newPassword:
            newPassword ||
            undefined,
          confirmPassword:
            confirmPassword ||
            undefined,
        });

        setMessage(
          'تم حفظ التغييرات بنجاح ✅'
        );

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        setEditingProfile(false);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
          'حدث خطأ أثناء حفظ البيانات.'
        );
      } finally {
        setSaving(false);
      }
    };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const selectTab = (tab: Tab) => {
    setActiveTab(tab);
    setEditingProfile(false);
    setMessage('');
    setError('');
  };

  if (loading) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '100px 0',
        }}
      >
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '100px 0',
        }}
      >
        <h2>Please login first</h2>

        <Link
          to="/login"
          style={{
            display: 'inline-block',
            marginTop: '20px',
            backgroundColor: '#DB4444',
            color: '#fff',
            padding: '12px 30px',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Login
        </Link>
      </div>
    );
  }

  const cardBg = darkMode
    ? '#1e1e1e'
    : '#ffffff';

  const textColor = darkMode
    ? '#ffffff'
    : '#111111';

  const secondaryColor = darkMode
    ? '#aaaaaa'
    : '#808080';

  const inputBg = darkMode
    ? '#292929'
    : '#F5F5F5';

  const borderColor = darkMode
    ? '#333333'
    : '#eeeeee';

  return (
    <div
      style={{
        marginTop: '50px',
        marginBottom: '120px',
        color: textColor,
        padding: '0 50px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          marginBottom: '50px',
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            color: secondaryColor,
          }}
        >
          <Link
            to="/"
            style={{
              color: secondaryColor,
              textDecoration: 'none',
            }}
          >
            Home
          </Link>

          {' / '}

          <span
            style={{
              color: textColor,
            }}
          >
            My Account
          </span>
        </div>

        <div
          style={{
            fontSize: '14px',
          }}
        >
          Welcome!{' '}
          <span
            style={{
              color: '#DB4444',
              fontWeight: '600',
            }}
          >
            {user.username}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: '60px',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* SIDEBAR */}
        <aside
          style={{
            width: '230px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
          }}
        >
          <AccountMenu
            title="Manage My Account"
            items={[
              {
                label: 'My Profile',
                value: 'profile',
              },
              {
                label: 'Address Book',
                value: 'address',
              },
              {
                label:
                  'My Payment Options',
                value: 'payment',
              },
            ]}
            activeTab={activeTab}
            onSelect={selectTab}
            textColor={textColor}
            secondaryColor={secondaryColor}
          />

          <AccountMenu
            title="My Orders"
            items={[
              {
                label: 'My Orders & Tracking',
                value: 'orders',
              },
              {
                label: 'My Returns',
                value: 'returns',
              },
              {
                label:
                  'My Cancellations',
                value:
                  'cancellations',
              },
            ]}
            activeTab={activeTab}
            onSelect={selectTab}
            textColor={textColor}
            secondaryColor={secondaryColor}
          />

          <button
            type="button"
            onClick={() =>
              navigate(
                '/wishlist'
              )
            }
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              textAlign: 'left',
              cursor: 'pointer',
              color: textColor,
            }}
          >
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                margin:
                  '0 0 10px 0',
              }}
            >
              My WishList
            </h4>

            <span
              style={{
                color: secondaryColor,
                fontSize: '13px',
              }}
            >
              {wishlist.length}{' '}
              saved item
              {wishlist.length !== 1
                ? 's'
                : ''}
            </span>
          </button>

          <button
            type="button"
            onClick={
              handleLogout
            }
            style={{
              marginTop:
                '8px',
              alignSelf:
                'flex-start',
              border: 'none',
              background: 'none',
              padding: 0,
              color: '#DB4444',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
            }}
          >
            Logout
          </button>
        </aside>

        {/* MAIN CONTENT */}
        <main
          style={{
            flex: 1,
            minWidth: '320px',
          }}
        >
          {activeTab ===
            'profile' && (
              <div
                style={{
                  background:
                    cardBg,
                  borderRadius:
                    '10px',
                  border:
                    `1px solid ${borderColor}`,
                  boxShadow:
                    '0 8px 30px rgba(0,0,0,0.05)',
                  padding:
                    '35px',
                }}
              >
                {!editingProfile ? (
                  <>
                    <div
                      style={{
                        display:
                          'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'center',
                        gap:
                          '20px',
                        marginBottom:
                          '30px',
                        flexWrap:
                          'wrap',
                      }}
                    >
                      <div>
                        <p
                          style={{
                            margin:
                              '0 0 8px',
                            fontSize:
                              '13px',
                            color:
                              '#DB4444',
                            fontWeight:
                              '600',
                            textTransform:
                              'uppercase',
                            letterSpacing:
                              '1px',
                          }}
                        >
                          My Profile
                        </p>

                        <h2
                          style={{
                            margin:
                              0,
                            fontSize:
                              '28px',
                          }}
                        >
                          Account Overview
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setEditingProfile(
                            true
                          )
                        }
                        style={{
                          backgroundColor:
                            '#DB4444',
                          color:
                            '#fff',
                          border:
                            'none',
                          borderRadius:
                            '5px',
                          padding:
                            '12px 24px',
                          cursor:
                            'pointer',
                          fontWeight:
                            '600',
                        }}
                      >
                        Edit Profile
                      </button>
                    </div>

                    <div
                      style={{
                        display:
                          'grid',
                        gridTemplateColumns:
                          'repeat(auto-fit, minmax(220px, 1fr))',
                        gap:
                          '18px',
                      }}
                    >
                      <InfoCard
                        label="Name"
                        value={
                          user.username
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoCard
                        label="Email"
                        value={
                          user.email
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoCard
                        label="Address"
                        value={
                          user.address ||
                          'No address saved yet'
                        }
                        darkMode={
                          darkMode
                        }
                      />

                      <InfoCard
                        label="Account"
                        value="Active"
                        darkMode={
                          darkMode
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        marginBottom:
                          '25px',
                      }}
                    >
                      <p
                        style={{
                          margin:
                            '0 0 8px',
                          color:
                            '#DB4444',
                          fontSize:
                            '13px',
                          fontWeight:
                            '600',
                        }}
                      >
                        PROFILE SETTINGS
                      </p>

                      <h2
                        style={{
                          margin: 0,
                          fontSize:
                            '28px',
                        }}
                      >
                        Edit Your Profile
                      </h2>
                    </div>

                    <form
                      onSubmit={
                        handleSaveProfile
                      }
                      style={{
                        display:
                          'flex',
                        flexDirection:
                          'column',
                        gap:
                          '22px',
                      }}
                    >
                      <div
                        style={{
                          display:
                            'grid',
                          gridTemplateColumns:
                            'repeat(auto-fit, minmax(220px, 1fr))',
                          gap:
                            '20px',
                        }}
                      >
                        <Field
                          label="First Name"
                          id="first-name"
                          name="firstName"
                          value={
                            firstName
                          }
                          onChange={
                            setFirstName
                          }
                          autoComplete="given-name"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                        />

                        <Field
                          label="Last Name"
                          id="last-name"
                          name="lastName"
                          value={
                            lastName
                          }
                          onChange={
                            setLastName
                          }
                          autoComplete="family-name"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                        />
                      </div>

                      <div
                        style={{
                          display:
                            'grid',
                          gridTemplateColumns:
                            'repeat(auto-fit, minmax(220px, 1fr))',
                          gap:
                            '20px',
                        }}
                      >
                        <Field
                          label="Email"
                          id="account-email"
                          name="email"
                          type="email"
                          value={
                            email
                          }
                          onChange={
                            setEmail
                          }
                          autoComplete="email"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                        />

                        <Field
                          label="Address"
                          id="account-address"
                          name="address"
                          value={
                            address
                          }
                          onChange={
                            setAddress
                          }
                          autoComplete="street-address"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                        />
                      </div>

                      <div
                        style={{
                          display:
                            'flex',
                          flexDirection:
                            'column',
                          gap:
                            '12px',
                        }}
                      >
                        <strong
                          style={{
                            fontSize:
                              '14px',
                          }}
                        >
                          Password Changes
                        </strong>

                        <Field
                          label=""
                          id="current-password"
                          name="currentPassword"
                          type="password"
                          placeholder="Current Password"
                          value={
                            currentPassword
                          }
                          onChange={
                            setCurrentPassword
                          }
                          autoComplete="current-password"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                          showLabel={false}
                        />

                        <Field
                          label=""
                          id="new-password"
                          name="newPassword"
                          type="password"
                          placeholder="New Password"
                          value={
                            newPassword
                          }
                          onChange={
                            setNewPassword
                          }
                          autoComplete="new-password"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                          showLabel={false}
                        />

                        <Field
                          label=""
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          placeholder="Confirm New Password"
                          value={
                            confirmPassword
                          }
                          onChange={
                            setConfirmPassword
                          }
                          autoComplete="new-password"
                          background={
                            inputBg
                          }
                          color={
                            textColor
                          }
                          showLabel={false}
                        />
                      </div>

                      {message && (
                        <Alert
                          type="success"
                          text={
                            message
                          }
                        />
                      )}

                      {error && (
                        <Alert
                          type="error"
                          text={
                            error
                          }
                        />
                      )}

                      <div
                        style={{
                          display:
                            'flex',
                          justifyContent:
                            'flex-end',
                          gap:
                            '12px',
                          marginTop:
                            '8px',
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            setEditingProfile(
                              false
                            );
                          }}
                          style={{
                            border:
                              `1px solid ${borderColor}`,
                            background:
                              cardBg,
                            color:
                              textColor,
                            borderRadius:
                              '5px',
                            padding:
                              '12px 22px',
                            cursor:
                              'pointer',
                          }}
                        >
                          Cancel
                        </button>

                        <button
                          type="submit"
                          disabled={
                            saving
                          }
                          style={{
                            border:
                              'none',
                            background:
                              saving
                                ? '#999'
                                : '#DB4444',
                            color:
                              '#fff',
                            borderRadius:
                              '5px',
                            padding:
                              '12px 26px',
                            cursor:
                              saving
                                ? 'not-allowed'
                                : 'pointer',
                            fontWeight:
                              '600',
                          }}
                        >
                          {saving
                            ? 'Saving...'
                            : 'Save Changes'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            )}

          {activeTab ===
            'address' && (
              <SectionCard
                title="Address Book"
                subtitle="Manage your shipping address"
                darkMode={
                  darkMode
                }
              >
                <div
                  style={{
                    border:
                      `1px solid ${borderColor}`,
                    borderRadius:
                      '8px',
                    padding:
                      '20px',
                  }}
                >
                  <div
                    style={{
                      display:
                        'flex',
                      justifyContent:
                        'space-between',
                      alignItems:
                        'center',
                      gap:
                        '15px',
                      marginBottom:
                        '15px',
                    }}
                  >
                    <strong>
                      Default Shipping Address
                    </strong>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(
                          'profile'
                        );
                        setEditingProfile(
                          true
                        );
                      }}
                      style={{
                        border:
                          'none',
                        background:
                          'none',
                        color:
                          '#DB4444',
                        cursor:
                          'pointer',
                        fontWeight:
                          '600',
                      }}
                    >
                      Edit
                    </button>
                  </div>

                  <p
                    style={{
                      margin:
                        '0',
                      color:
                        secondaryColor,
                      lineHeight:
                        1.7,
                    }}
                  >
                    {user.address ||
                      'No shipping address saved yet.'}
                  </p>
                </div>
              </SectionCard>
            )}

          {activeTab ===
            'payment' && (
              <SectionCard
                title="My Payment Options"
                subtitle="Manage your preferred payment method"
                darkMode={
                  darkMode
                }
              >
                <div
                  style={{
                    border:
                      `1px solid ${borderColor}`,
                    borderRadius:
                      '8px',
                    padding:
                      '25px',
                  }}
                >
                  <div
                    style={{
                      display:
                        'flex',
                      alignItems:
                        'center',
                      gap:
                        '15px',
                      marginBottom:
                        '12px',
                    }}
                  >
                    <div
                      style={{
                        width:
                          '45px',
                        height:
                          '30px',
                        borderRadius:
                          '5px',
                        backgroundColor:
                          '#111',
                        color:
                          '#fff',
                        display:
                          'flex',
                        alignItems:
                          'center',
                        justifyContent:
                          'center',
                        fontSize:
                          '11px',
                      }}
                    >
                      CARD
                    </div>

                    <div>
                      <strong>
                        Payment at checkout
                      </strong>

                      <p
                        style={{
                          margin:
                            '4px 0 0',
                          color:
                            secondaryColor,
                          fontSize:
                            '13px',
                        }}
                      >
                        Choose your payment method during checkout.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        '/checkout'
                      )
                    }
                    style={{
                      marginTop:
                        '12px',
                      border:
                        'none',
                      backgroundColor:
                        '#DB4444',
                      color:
                        '#fff',
                      padding:
                        '11px 20px',
                      borderRadius:
                        '4px',
                      cursor:
                        'pointer',
                    }}
                  >
                    Go to Checkout
                  </button>
                </div>
              </SectionCard>
            )}

          {activeTab ===
            'orders' && (
              <SectionCard
                title="My Orders & Tracking"
                subtitle="Track your shipments and order history"
                darkMode={
                  darkMode
                }
              >
                {ordersLoading ? (
                  <p>
                    Loading orders...
                  </p>
                ) : orders.length ===
                  0 ? (
                  <div
                    style={{
                      textAlign:
                        'center',
                      padding:
                        '50px 20px',
                      color:
                        secondaryColor,
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          '45px',
                        marginBottom:
                          '10px',
                      }}
                    >
                      📦
                    </div>

                    <h3
                      style={{
                        color:
                          textColor,
                      }}
                    >
                      No Orders Yet
                    </h3>

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          '/'
                        )
                      }
                      style={{
                        marginTop:
                          '12px',
                        border:
                          'none',
                        backgroundColor:
                          '#DB4444',
                        color:
                          '#fff',
                        padding:
                          '11px 22px',
                        borderRadius:
                          '4px',
                        cursor:
                          'pointer',
                      }}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div
                    style={{
                      display:
                        'flex',
                      flexDirection:
                        'column',
                      gap:
                        '24px',
                    }}
                  >
                    {orders.map(
                      (
                        order
                      ) => {
                        // تتبع حالة الطلب لشريط التقدم البروفيشنال
                        const isCompleted = order.status === 'Completed';
                        const progressWidth = isCompleted ? '100%' : '50%';

                        return (
                          <div
                            key={
                              order.id
                            }
                            style={{
                              border:
                                `1px solid ${borderColor}`,
                              borderRadius:
                                '12px',
                              padding:
                                '24px',
                              backgroundColor: darkMode ? '#252525' : '#fafafa',
                            }}
                          >
                            <div
                              style={{
                                display:
                                  'flex',
                                justifyContent:
                                  'space-between',
                                gap:
                                  '15px',
                                flexWrap:
                                  'wrap',
                                marginBottom:
                                  '18px',
                              }}
                            >
                              <div>
                                <strong style={{ fontSize: '16px' }}>
                                  Order #
                                  {order.id.slice(
                                    -8
                                  ).toUpperCase()}
                                </strong>

                                <p
                                  style={{
                                    margin:
                                      '4px 0 0',
                                    color:
                                      secondaryColor,
                                    fontSize:
                                      '13px',
                                  }}
                                >
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleString()}
                                </p>
                              </div>

                              <span
                                style={{
                                  padding:
                                    '6px 14px',
                                  borderRadius:
                                    '999px',
                                  backgroundColor: isCompleted ? '#d1fae5' : '#fef3c7',
                                  color: isCompleted ? '#10b981' : '#f59e0b',
                                  fontSize:
                                    '13px',
                                  fontWeight:
                                    '700',
                                }}
                              >
                                {order.status}
                              </span>
                            </div>

                            {/* تتبع شريط الحالة (Order Tracking Progress Bar) */}
                            <div style={{ marginBottom: '20px', padding: '15px', background: darkMode ? '#1e1e1e' : '#fff', borderRadius: '8px', border: `1px solid ${borderColor}` }}>
                              <p style={{ margin: '0 0 10px', fontSize: '13px', fontWeight: '600', color: secondaryColor }}>Live Order Tracking</p>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '600', marginBottom: '6px' }}>
                                <span style={{ color: '#10b981' }}>✓ Order Placed</span>
                                <span style={{ color: isCompleted ? '#10b981' : secondaryColor }}>Processing</span>
                                <span style={{ color: isCompleted ? '#10b981' : secondaryColor }}>Delivered</span>
                              </div>
                              <div style={{ height: '6px', width: '100%', backgroundColor: darkMode ? '#333' : '#e2e8f0', borderRadius: '3px', overflow: 'hidden' }}>
                                <div style={{ height: '100%', backgroundColor: '#10b981', width: progressWidth, transition: 'width 0.4s ease' }}></div>
                              </div>
                            </div>

                            <div
                              style={{
                                display:
                                  'flex',
                                flexDirection:
                                  'column',
                                gap:
                                  '12px',
                              }}
                            >
                              {order.items.map(
                                (
                                  item
                                ) => (
                                  <div
                                    key={
                                      item.id
                                    }
                                    style={{
                                      display:
                                        'flex',
                                      alignItems:
                                        'center',
                                      gap:
                                        '15px',
                                    }}
                                  >
                                    <img
                                      src={
                                        item.image
                                      }
                                      alt={
                                        item.name
                                      }
                                      style={{
                                        width:
                                          '55px',
                                        height:
                                          '55px',
                                        objectFit:
                                          'contain',
                                        borderRadius:
                                          '6px',
                                        background:
                                          '#fff',
                                        padding: '4px',
                                        border: `1px solid ${borderColor}`
                                      }}
                                    />

                                    <div
                                      style={{
                                        flex:
                                          1,
                                      }}
                                    >
                                      <strong>
                                        {
                                          item.name
                                        }
                                      </strong>

                                      <p
                                        style={{
                                          margin:
                                            '2px 0 0',
                                          color:
                                            secondaryColor,
                                          fontSize:
                                            '13px',
                                        }}
                                      >
                                        Quantity:{' '}
                                        {
                                          item.quantity
                                        }
                                      </p>
                                    </div>

                                    <strong>
                                      $
                                      {(
                                        item.price *
                                        item.quantity
                                      ).toFixed(
                                        2
                                      )}
                                    </strong>
                                  </div>
                                )
                              )}
                            </div>

                            <div
                              style={{
                                borderTop:
                                  `1px solid ${borderColor}`,
                                marginTop:
                                  '15px',
                                paddingTop:
                                  '15px',
                                display:
                                  'flex',
                                justifyContent:
                                  'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '10px'
                              }}
                            >
                              <span style={{ fontSize: '14px', color: secondaryColor }}>
                                <strong>Shipping Address:</strong> {order.address}
                              </span>

                              <span
                                style={{
                                  fontSize:
                                    '18px',
                                  fontWeight:
                                    '700',
                                  color: '#DB4444'
                                }}
                              >
                                Total: ${order.total.toFixed(
                                  2
                                )}
                              </span>
                            </div>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}
              </SectionCard>
            )}

          {activeTab ===
            'returns' && (
              <SectionCard
                title="My Returns"
                subtitle="Track your returned items"
                darkMode={
                  darkMode
                }
              >
                <EmptyState
                  icon="↩️"
                  title="No Returns"
                  text="You currently have no returned orders."
                  darkMode={
                    darkMode
                  }
                />
              </SectionCard>
            )}

          {activeTab ===
            'cancellations' && (
              <SectionCard
                title="My Cancellations"
                subtitle="View cancelled orders"
                darkMode={
                  darkMode
                }
              >
                <EmptyState
                  icon="✕"
                  title="No Cancellations"
                  text="You currently have no cancelled orders."
                  darkMode={
                    darkMode
                  }
                />
              </SectionCard>
            )}
        </main>
      </div>
    </div>
  );
}

function AccountMenu({
  title,
  items,
  activeTab,
  onSelect,
  textColor,
  secondaryColor,
}: {
  title: string;
  items: {
    label: string;
    value: Tab;
  }[];
  activeTab: Tab;
  onSelect: (tab: Tab) => void;
  textColor: string;
  secondaryCardColor?: string;
  secondaryColor: string;
}) {
  return (
    <div>
      <h4
        style={{
          fontSize: '16px',
          fontWeight: '600',
          margin:
            '0 0 14px 0',
          color: textColor,
        }}
      >
        {title}
      </h4>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}
      >
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() =>
              onSelect(
                item.value
              )
            }
            style={{
              border: 'none',
              background:
                'none',
              padding:
                '7px 0 7px 20px',
              textAlign:
                'left',
              cursor:
                'pointer',
              fontSize:
                '14px',
              color:
                activeTab ===
                  item.value
                  ? '#DB4444'
                  : secondaryColor,
              fontWeight:
                activeTab ===
                  item.value
                  ? '600'
                  : '400',
              transition:
                'all 0.2s ease',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionCard({
  title,
  subtitle,
  children,
  darkMode,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  darkMode: boolean;
}) {
  return (
    <div
      style={{
        background:
          darkMode
            ? '#1e1e1e'
            : '#ffffff',
        border:
          `1px solid ${darkMode
            ? '#333'
            : '#eeeeee'
          }`,
        borderRadius:
          '10px',
        boxShadow:
          '0 8px 30px rgba(0,0,0,0.05)',
        padding:
          '35px',
      }}
    >
      <div
        style={{
          marginBottom:
            '28px',
        }}
      >
        <p
          style={{
            margin:
              '0 0 7px',
            color:
              '#DB4444',
            fontSize:
              '13px',
            fontWeight:
              '600',
            textTransform:
              'uppercase',
            letterSpacing:
              '1px',
          }}
        >
          Account
        </p>

        <h2
          style={{
            margin: 0,
            fontSize:
              '28px',
          }}
        >
          {title}
        </h2>

        <p
          style={{
            margin:
              '8px 0 0',
            color:
              darkMode
                ? '#aaa'
                : '#808080',
            fontSize:
              '14px',
          }}
        >
          {subtitle}
        </p>
      </div>

      {children}
    </div>
  );
}

function InfoCard({
  label,
  value,
  darkMode,
}: {
  label: string;
  value: string;
  darkMode: boolean;
}) {
  return (
    <div
      style={{
        border:
          `1px solid ${darkMode
            ? '#333'
            : '#eeeeee'
          }`,
        borderRadius:
          '8px',
        padding:
          '20px',
        background:
          darkMode
            ? '#252525'
            : '#fafafa',
      }}
    >
      <p
        style={{
          margin:
            '0 0 8px',
          fontSize:
            '12px',
          color:
            darkMode
              ? '#999'
              : '#888',
          textTransform:
            'uppercase',
        }}
      >
        {label}
      </p>

      <strong
        style={{
          fontSize:
            '15px',
        }}
      >
        {value}
      </strong>
    </div>
  );
}

function Field({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  autoComplete,
  background,
  color,
  showLabel = true,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  background: string;
  color: string;
  showLabel?: boolean;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '7px',
      }}
    >
      {showLabel && (
        <label
          htmlFor={id}
          style={{
            fontSize:
              '14px',
          }}
        >
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={
          autoComplete
        }
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        style={{
          backgroundColor:
            background,
          color,
          border: 'none',
          borderRadius:
            '5px',
          padding:
            '13px 15px',
          outline:
            'none',
          width:
            '100%',
          boxSizing:
            'border-box',
        }}
      />
    </div>
  );
}

function Alert({
  type,
  text,
}: {
  type: 'success' | 'error';
  text: string;
}) {
  return (
    <div
      style={{
        padding:
          '12px 15px',
        borderRadius:
          '5px',
        backgroundColor:
          type ===
            'success'
            ? '#e9f8ee'
            : '#fff0f0',
        color:
          type ===
            'success'
            ? '#1f7a3f'
            : '#c62828',
        fontSize:
          '14px',
      }}
    >
      {text}
    </div>
  );
}

function EmptyState({
  icon,
  title,
  text,
  darkMode,
}: {
  icon: string;
  title: string;
  text: string;
  darkMode: boolean;
}) {
  return (
    <div
      style={{
        textAlign: 'center',
        padding:
          '60px 20px',
      }}
    >
      <div
        style={{
          fontSize:
            '48px',
          marginBottom:
            '12px',
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          margin:
            '0 0 8px',
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color:
            darkMode
              ? '#aaa'
              : '#808080',
        }}
      >
        {text}
      </p>
    </div>
  );
}