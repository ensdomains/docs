// Queues plausible() calls made before the deferred Plausible script loads.
// Kept as a file instead of an inline script so the CSP can omit 'unsafe-inline'.
window.plausible =
  window.plausible ||
  function () {
    ;(window.plausible.q = window.plausible.q || []).push(arguments)
  }
