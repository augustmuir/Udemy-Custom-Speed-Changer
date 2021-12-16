try {
  var udemyChangerSpeeds = document.getElementById('speedInjection').getAttribute('speeds')
  window.udemyChangerSpeeds = JSON.parse(udemyChangerSpeeds);
} catch (e) {
  window.udemyChangerSpeeds = [0.50, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 5, 7.5, 10, 13, 16];
}
