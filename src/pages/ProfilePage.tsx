import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, Heart, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ScrollReveal from '../components/common/ScrollReveal';
import { supabase } from '../lib/supabase';
import { formatPrice } from '../data/products';

export default function ProfilePage() {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    } else if (user) {
      const fetchOrders = async () => {
        try {
          const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
            
          if (!error && data) {
            setOrders(data);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen pt-[120px] pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-[120px] pb-20 bg-ivory-warm">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 border-b border-beige-dark pb-8">
            <div>
              <h1 className="font-heading text-4xl text-charcoal mb-2">
                My Account
              </h1>
              <p className="text-charcoal/60 font-body text-sm">
                Welcome back, {user.name} ({user.email})
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory transition-colors duration-300 text-xs tracking-[0.1em] uppercase font-medium rounded-sm"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar Navigation */}
          <div className="space-y-2">
            {[
              { icon: Package, label: 'Order History', active: true },
              { icon: Heart, label: 'Wishlist', active: false },
              { icon: MapPin, label: 'Addresses', active: false },
            ].map((item, idx) => (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-6 py-4 text-left transition-colors ${
                  item.active
                    ? 'bg-white shadow-sm border border-beige-dark text-charcoal font-medium'
                    : 'text-charcoal/70 hover:bg-white/50'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="text-sm tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area (Order History) */}
          <div className="md:col-span-2">
            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 border border-beige-dark/30 shadow-sm rounded-sm">
                <h2 className="font-heading text-2xl text-charcoal mb-6">
                  Recent Orders
                </h2>

                {/* Mock Orders List */}
                <div className="space-y-6">
                  {loadingOrders ? (
                    <div className="flex justify-center p-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-charcoal"></div>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center p-8 border border-beige-dark rounded-sm">
                      <p className="text-charcoal/60 mb-4">No orders yet.</p>
                    </div>
                  ) : (
                    orders.map((order) => (
                      <div key={order.id} className="border border-beige-dark rounded-sm p-6">
                        <div className="flex flex-wrap justify-between items-center mb-4 pb-4 border-b border-beige-dark/50 gap-4">
                          <div>
                            <p className="text-xs text-charcoal/50 uppercase tracking-[0.1em] mb-1">
                              Order Placed
                            </p>
                            <p className="text-sm font-medium">
                              {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-charcoal/50 uppercase tracking-[0.1em] mb-1">
                              Total
                            </p>
                            <p className="text-sm font-medium">{formatPrice(order.total)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-charcoal/50 uppercase tracking-[0.1em] mb-1">
                              Order #
                            </p>
                            <p className="text-sm font-medium">
                              {order.id.slice(0, 8).toUpperCase()}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {order.items?.map((item: any, idx: number) => (
                            <div key={idx} className="flex items-center gap-4">
                              <div className="flex-1">
                                <h3 className="font-medium text-charcoal">
                                  Product #{item.product_id?.slice(0, 4) || 'Item'}
                                </h3>
                                <p className="text-sm text-charcoal/60 mt-1">Qty: {item.quantity}</p>
                              </div>
                              <div>
                                <span className="px-3 py-1 bg-ivory-warm text-wine text-[10px] uppercase tracking-[0.1em] rounded-full border border-wine/20">
                                  {order.status || 'Processing'}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
