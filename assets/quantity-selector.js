// Looks Max - Quantity Selector & Product Card Logic (Event Delegation with Detailed Debug Logging)

document.addEventListener('DOMContentLoaded', function() {
  // Image thumbnail logic (delegated)
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('product-thumb-img')) {
      const thumb = e.target;
      const card = thumb.closest('.product-card');
      const mainImgs = card.querySelectorAll('.product-main-img');
      const thumbs = card.querySelectorAll('.product-thumb-img');
      const idx = parseInt(thumb.getAttribute('data-thumb-index'));
      mainImgs.forEach((img, i) => {
        img.style.opacity = (i === idx) ? '1' : '0';
      });
      thumbs.forEach((t, i) => {
        t.classList.toggle('border-purple-500', i === idx);
      });
    }
  });

  // Set first thumb as active on load
  document.querySelectorAll('.product-card').forEach(function(card) {
    const thumbs = card.querySelectorAll('.product-thumb-img');
    if (thumbs.length > 0) {
      thumbs[0].classList.add('border-purple-500');
    }
  });

  // Quantity controls (delegated)
  document.body.addEventListener('click', function(e) {
    if (e.target.classList.contains('qty-minus') || e.target.classList.contains('qty-plus')) {
      const card = e.target.closest('.product-card');
      const qtyInput = card.querySelector('[data-qty-input]');
      const hiddenQtyInput = card.querySelector('.hidden-qty-input');
      let val = parseInt(qtyInput.value) || 1;
      console.log('Quantity button clicked:', e.target, 'Before:', val);
      if (e.target.classList.contains('qty-minus')) {
        if (val > 1) val--;
      } else {
        val++;
      }
      console.log('After:', val);
      qtyInput.value = val;
      hiddenQtyInput.value = val;
    }
  });

  // Input validation
  document.body.addEventListener('input', function(e) {
    if (e.target.matches('[data-qty-input]')) {
      const card = e.target.closest('.product-card');
      const qtyInput = card.querySelector('[data-qty-input]');
      const hiddenQtyInput = card.querySelector('.hidden-qty-input');
      let val = parseInt(qtyInput.value) || 1;
      if (val < 1) val = 1;
      qtyInput.value = val;
      hiddenQtyInput.value = val;
    }
  });

  // On form submit, ensure hidden input is up to date
  document.body.addEventListener('submit', function(e) {
    if (e.target.classList.contains('add-to-cart-form')) {
      const card = e.target.closest('.product-card');
      const qtyInput = card.querySelector('[data-qty-input]');
      const hiddenQtyInput = card.querySelector('.hidden-qty-input');
      hiddenQtyInput.value = qtyInput.value;
    }
  }, true);
}); 