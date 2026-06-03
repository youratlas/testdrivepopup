/* ============================================================
   ATLAS REVENUE ENGINE — Test Drive Emma Popup
   v4 — Final behavior
   ============================================================ */

(function() {
  'use strict';

  var SESSION_KEY = 'atlas_emma_popup_dismissed';
  var DELAY_MS = 12000;
  var WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/eDv3Z93FnteTxZgpWqNe/webhook-trigger/73bd0ca0-c1c6-48c5-a42a-7353e1208531';

  function whenReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  whenReady(function() {

    if (document.getElementById('atlas-emma-popup')) return;

    var dismissedThisSession = false;
    try {
      dismissedThisSession = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {}

    var html = ''
      + '<div id="atlas-emma-popup" role="dialog" aria-modal="true">'
      +   '<div class="atlas-emma-modal">'
      +     '<button class="atlas-emma-close" data-atlas-action="close" aria-label="Close">'
      +       '<svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 1L13 13M13 1L1 13"/></svg>'
      +     '</button>'
      +     '<div class="atlas-emma-form-state">'
      +       '<h2 class="atlas-emma-headline">Clone Your Best Human</h2>'
      +       '<p class="atlas-emma-subhead">Pick how you want to test Emma</p>'
      +       '<div class="atlas-emma-eyebrow-wrap"><div class="atlas-emma-eyebrow"><span class="atlas-emma-dot"></span>Live Test Drive</div></div>'
      +       '<div class="atlas-emma-toggle" data-mode="voice">'
      +         '<div class="atlas-emma-tside" data-side="voice">'
      +           '<div class="atlas-emma-ticon">'
      +             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'
      +               '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>'
      +               '<line x1="8" y1="9" x2="8" y2="15"/><line x1="12" y1="7" x2="12" y2="17"/><line x1="16" y1="9" x2="16" y2="15"/>'
      +             '</svg>'
      +           '</div>'
      +           'Voice Clone'
      +         '</div>'
      +         '<div class="atlas-emma-ttrack" data-atlas-action="toggleTrack"><div class="atlas-emma-tthumb"></div></div>'
      +         '<div class="atlas-emma-tside atlas-emma-inactive" data-side="imessage">'
      +           '<div class="atlas-emma-ticon">'
      +             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">'
      +               '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>'
      +               '<text x="12" y="14" text-anchor="middle" font-size="7" font-weight="700" fill="currentColor" stroke="none" font-family="Montserrat, sans-serif">AI</text>'
      +             '</svg>'
      +           '</div>'
      +           'iMessage Clone'
      +         '</div>'
      +       '</div>'
      +       '<div class="atlas-emma-field"><label class="atlas-emma-label">First Name</label><input type="text" class="atlas-emma-input" data-atlas-field="firstName" placeholder="Your first name" required></div>'
      +       '<div class="atlas-emma-field"><label class="atlas-emma-label">Email</label><input type="email" class="atlas-emma-input" data-atlas-field="email" placeholder="your@email.com" required></div>'
      +       '<div class="atlas-emma-field"><label class="atlas-emma-label">Phone</label><div class="atlas-emma-phone-wrap"><div class="atlas-emma-country">\uD83C\uDDFA\uD83C\uDDF8 +1</div><input type="tel" class="atlas-emma-input" data-atlas-field="phone" placeholder="(555) 123-4567" required></div></div>'
      +       '<button type="button" class="atlas-emma-submit" data-atlas-action="submit">'
      +         '<span class="atlas-emma-btn-label">Test the clone right now</span>'
      +         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>'
      +       '</button>'
      +       '<div class="atlas-emma-trust">'
      +         '<div class="atlas-emma-trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>Under 60 seconds</div>'
      +         '<div class="atlas-emma-trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>No commitment</div>'
      +         '<div class="atlas-emma-trust-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>100% live AI</div>'
      +       '</div>'
      +       '<div class="atlas-emma-availability">Live Test Drives Only Available in the U.S. and Canada</div>'
      +     '</div>'
      +     '<div class="atlas-emma-success">'
      +       '<div class="atlas-emma-icon"><svg class="atlas-emma-sicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>'
      +       '<h3 class="atlas-emma-stitle">You\'re in, <span class="atlas-emma-sname">friend</span>.</h3>'
      +       '<span class="atlas-emma-sitalic">Emma\'s calling you now.</span>'
      +       '<p class="atlas-emma-stext">Your phone will ring in <strong>under 60 seconds</strong>. Pick up. Emma sounds exactly like a real human. Ask her anything, push her, try to break her. She\'ll handle it.</p>'
      +     '</div>'
      +   '</div>'
      + '</div>';

    var container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstChild);

    var popup = document.getElementById('atlas-emma-popup');
    if (!popup) return;

    var formState = popup.querySelector('.atlas-emma-form-state');
    var successState = popup.querySelector('.atlas-emma-success');
    var toggle = popup.querySelector('.atlas-emma-toggle');
    var sides = popup.querySelectorAll('.atlas-emma-tside');
    var track = popup.querySelector('[data-atlas-action="toggleTrack"]');
    var btnLabel = popup.querySelector('.atlas-emma-btn-label');
    var submitBtn = popup.querySelector('[data-atlas-action="submit"]');
    var closeBtn = popup.querySelector('[data-atlas-action="close"]');

    var currentMode = 'voice';
    var popupShown = false;

    // Track scroll position for proper lock/unlock
    var savedScrollY = 0;

    function lockScroll() {
      savedScrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      // Lock by fixing the body in place. This is the only method that reliably
      // works on iOS Safari, Framer wrappers, and all modern browsers.
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + savedScrollY + 'px';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }

    function unlockScroll() {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      // Restore scroll position
      window.scrollTo(0, savedScrollY);
    }

    function showPopup() {
      // If already visible, do nothing
      if (popup.classList.contains('atlas-emma-active')) return;

      // Reset to form state in case it was previously submitted
      if (formState) formState.style.display = '';
      if (successState) successState.classList.remove('atlas-emma-show');

      // Re-enable submit button in case it was disabled
      if (submitBtn) submitBtn.disabled = false;
      if (btnLabel) {
        btnLabel.textContent = currentMode === 'voice' ? 'Get a live call now' : 'Send me an iMessage';
      }

      popup.style.display = 'flex';
      void popup.offsetWidth;
      popup.classList.add('atlas-emma-active');
      lockScroll();
      popupShown = true;
    }

    function hidePopup() {
      popup.classList.remove('atlas-emma-active');
      unlockScroll();
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch (e) {}
      setTimeout(function() {
        popup.style.display = 'none';
      }, 400);
    }

    function switchMode(mode) {
      currentMode = mode;
      toggle.setAttribute('data-mode', mode);
      for (var i = 0; i < sides.length; i++) {
        if (sides[i].getAttribute('data-side') === mode) {
          sides[i].classList.remove('atlas-emma-inactive');
        } else {
          sides[i].classList.add('atlas-emma-inactive');
        }
      }
      if (btnLabel) {
        btnLabel.textContent = mode === 'voice' ? 'Get a live call now' : 'Send me an iMessage';
      }
    }

    function showSuccess(name, mode) {
      var sname = popup.querySelector('.atlas-emma-sname');
      var sitalic = popup.querySelector('.atlas-emma-sitalic');
      var stext = popup.querySelector('.atlas-emma-stext');
      var sicon = popup.querySelector('.atlas-emma-sicon');

      if (sname) sname.textContent = name;

      if (mode === 'voice') {
        if (sitalic) sitalic.textContent = "Emma's calling you now.";
        if (stext) stext.innerHTML = 'Your phone will ring in <strong>under 60 seconds</strong>. Pick up. Emma sounds exactly like a real human. Ask her anything, push her, try to break her. She\'ll handle it.';
        if (sicon) sicon.innerHTML = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>';
      } else {
        if (sitalic) sitalic.textContent = "Emma's texting you now.";
        if (stext) stext.innerHTML = 'Check your messages in <strong>under 60 seconds</strong>. A real iMessage. Blue bubble, not green. Reply naturally. She handles objections, answers questions, and books the appointment.';
        if (sicon) sicon.innerHTML = '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>';
      }

      if (formState) formState.style.display = 'none';
      if (successState) successState.classList.add('atlas-emma-show');

      // Fire Google Tag Manager conversion event when "You're In" screen appears
      try {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'lead_optin_completed',
          'form_type': mode === 'voice' ? 'voice_clone_popup' : 'imessage_clone_popup'
        });
      } catch (e) {}

      setTimeout(hidePopup, 8000);
    }

    function handleSubmit() {
      var name = popup.querySelector('[data-atlas-field="firstName"]').value.trim();
      var email = popup.querySelector('[data-atlas-field="email"]').value.trim();
      var phone = popup.querySelector('[data-atlas-field="phone"]').value.trim();

      if (!name || !email || !phone) return;

      submitBtn.disabled = true;
      if (btnLabel) btnLabel.textContent = 'Connecting...';

      // Build payload for GHL inbound webhook
      var payload = {
        firstName: name,
        email: email,
        phone: phone.replace(/[^\d+]/g, '').replace(/^(\d)/, '+1$1'),
        clone_type: currentMode,
        tags: [currentMode === 'voice' ? 'voice-clone-test' : 'imessage-clone-test'],
        source: 'Atlas Popup - Test Drive Emma',
        submitted_at: new Date().toISOString()
      };

      // Ensure phone starts with + for E.164 format
      if (payload.phone.charAt(0) !== '+') {
        payload.phone = '+' + payload.phone;
      }

      // Append UTM tracking data from the global getAtlasUTMs() function.
      // Defined elsewhere on the site (Framer <head>). Safe-guarded so the popup
      // still works if the function isn't loaded for any reason.
      try {
        if (typeof window.getAtlasUTMs === 'function') {
          var utmData = window.getAtlasUTMs() || {};
          payload.utm_source   = utmData.utm_source   || '';
          payload.utm_medium   = utmData.utm_medium   || '';
          payload.utm_campaign = utmData.utm_campaign || '';
          payload.utm_term     = utmData.utm_term     || '';
          payload.utm_content  = utmData.utm_content  || '';
          payload.gclid        = utmData.gclid        || '';
        }
      } catch (e) {
        console.warn('Atlas popup UTM capture skipped:', e);
      }

      // Send to GHL — fire and continue (don't block UX on webhook response)
      try {
        fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          mode: 'cors',
          keepalive: true
        }).catch(function(err) {
          console.warn('Atlas popup webhook error:', err);
        });
      } catch (e) {
        console.warn('Atlas popup webhook exception:', e);
      }

      setTimeout(function() {
        showSuccess(name, currentMode);
      }, 700);
    }

    closeBtn.addEventListener('click', hidePopup);

    popup.addEventListener('click', function(e) {
      if (e.target === popup) hidePopup();
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && popup.classList.contains('atlas-emma-active')) {
        hidePopup();
      }
    });

    for (var i = 0; i < sides.length; i++) {
      (function(side) {
        side.addEventListener('click', function() {
          switchMode(side.getAttribute('data-side'));
        });
      })(sides[i]);
    }

    if (track) {
      track.addEventListener('click', function() {
        switchMode(currentMode === 'voice' ? 'imessage' : 'voice');
      });
    }

    submitBtn.addEventListener('click', handleSubmit);

    // Auto-trigger: only fire 12s timer if not previously dismissed this session
    if (!dismissedThisSession) {
      setTimeout(function() {
        if (!popupShown) showPopup();
      }, DELAY_MS);
    }

    // ============================================================
    // CLICK TRIGGERS — multiple methods to handle Framer's wrappers
    // ============================================================

    // METHOD 1: Expose a global function. Bulletproof.
    // Framer users can attach this to any button via the "Click" interaction
    // pointing to "javascript:window.atlasOpenPopup()" or by using a code override.
    window.atlasOpenPopup = function() {
      showPopup();
    };

    // METHOD 2: Capture-phase click listener so we run BEFORE Framer's own handlers
    // can preventDefault or stop propagation.
    document.addEventListener('click', function(e) {
      var target = e.target;
      var depth = 0;
      var maxDepth = 10; // safety cap on DOM walking

      while (target && target !== document.body && depth < maxDepth) {
        depth++;

        // 2a. Anchor links pointing to #atlas-open-popup
        if (target.tagName === 'A') {
          var href = target.getAttribute('href') || '';
          if (href === '#atlas-open-popup' || href.indexOf('#atlas-open-popup') !== -1) {
            e.preventDefault();
            e.stopPropagation();
            showPopup();
            return;
          }
        }

        // 2b. Any element with data-atlas-trigger="open-popup"
        if (target.getAttribute) {
          var trigger = target.getAttribute('data-atlas-trigger');
          if (trigger === 'open-popup') {
            e.preventDefault();
            e.stopPropagation();
            showPopup();
            return;
          }
        }

        // 2c. Framer often wraps buttons. Check if any ancestor has a child
        // that contains the atlas-open-popup link or attribute.
        if (target.querySelector) {
          var nestedLink = target.querySelector('a[href*="atlas-open-popup"], [data-atlas-trigger="open-popup"]');
          if (nestedLink && target.contains(nestedLink)) {
            e.preventDefault();
            e.stopPropagation();
            showPopup();
            return;
          }
        }

        target = target.parentNode;
      }
    }, true); // <-- true = capture phase, runs before bubble-phase listeners

    // METHOD 3: Hash-based trigger. If URL hash changes to #atlas-open-popup, open it.
    // This catches Framer's case where it navigates the URL on click.
    function checkHash() {
      if (window.location.hash === '#atlas-open-popup') {
        showPopup();
        // Clean the hash so back button doesn't re-trigger awkwardly
        if (history.replaceState) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    }
    window.addEventListener('hashchange', checkHash);
    // Also check on initial load in case someone hits the page with the hash already there
    checkHash();
  });
})();
