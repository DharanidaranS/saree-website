import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import ScrollReveal from '../components/common/ScrollReveal';
import GoldLine from '../components/common/GoldLine';

export default function WishlistPage() {
  const { state, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <>
      <section className="pt-[110px] pb-8 px-6 md:px-8">
        <div className="max-w-[1440px] mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-gold text-xs tracking-[0.3em] uppercase mb-3 font-body">
                Your Wishlist
              </p>
              <h1 className="font-heading text-3xl md:text-4xl text-charcoal">
                Saved Pieces
              </h1>
              <GoldLine className="mt-6" />
            </div>
          </ScrollReveal>

          {state.items.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-charcoal/15 mx-auto mb-6" />
              <h2 className="font-heading text-2xl text-charcoal mb-3">
                Your wishlist is empty
              </h2>
              <p className="text-sm text-charcoal/50 font-body mb-8">
                Save your favourite sarees and come back to them anytime.
              </p>
              <Link
                to="/sarees"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-charcoal text-ivory text-xs tracking-[0.15em] uppercase font-medium hover:bg-charcoal-light transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                Explore Sarees
              </Link>
            </div>
          ) : (
            <>
              <div className="flex justify-end mb-6">
                <button
                  onClick={clearWishlist}
                  className="text-xs text-charcoal/40 hover:text-wine transition-colors font-body"
                >
                  Clear Wishlist
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {state.items.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-beige mb-4">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </Link>
                      <button
                        onClick={() => removeItem(product.id)}
                        className="absolute top-3 right-3 p-2 bg-ivory/80 rounded-full hover:bg-wine hover:text-ivory transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => addItem(product)}
                        className="absolute bottom-3 left-3 right-3 py-2.5 bg-charcoal/90 text-ivory text-[11px] tracking-[0.1em] uppercase font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Move to Bag
                      </button>
                    </div>
                    <div className="px-1">
                      <Link to={`/product/${product.id}`}>
                        <h3 className="font-heading text-base text-charcoal hover:text-wine transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-sm font-body font-semibold text-charcoal mt-1">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
