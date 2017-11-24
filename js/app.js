$( document ).ready( function() {
  
  // Mobile Menu Icon Handler
  $( '.menu-icon' ).click( function(e) {
    e.preventDefault();
    $( this ).toggleClass( 'open' );
    $('.nav-container').toggleClass( 'open' );
  });

  // FAQ Show/Hide
  $( '.question' ).click( function() {
    $( this ).parent().find(' .answer ').slideToggle();
  });  

  // Stripe
  var handler = StripeCheckout.configure({
    key: 'pk_test_rkaLVAiIshvS5n9HE7OHyY5A',
    name: 'DevLifts',
    image: 'images/dist/avatar.png',
    locale: 'auto',
    token: function( token ) {
      var $input = $('<input type=hidden name=stripeToken />').val(token.id);
      console.log($('#orderForm'))
      $('#orderForm').append($input);
      handleSubmit();
    },
    zipCode: true,
    bitcoin: true
  });

  // Order Submission
  $( '#orderFormSubmit' ).on('click', function(e) {
    handler.open({
      description: 'Personalized Fitness Plan'
    });

    e.preventDefault();
  });

  // Contact Form
  $( '#contactForm' ).submit( function(e) {
    e.preventDefault();

    var message = $( '#message' ).val();

    $( '.contact-form' ).slideToggle();
    $( '.loader' ).show();

    $.ajax({
      url: 'https://hooks.zapier.com/hooks/catch/1776164/sr7f60/',
      type: 'post',
      data: $( '#contactForm' ).serialize(),
      success: function() {
        $( '.loader' ).hide();
        $( '.thank-you' ).slideToggle();;
      },
      error: function() {
        $( '.loader' ).hide();
        $( '#typedMessage' ).html( "<strong>" + message + "</strong>" );
        $( '.error' ).slideToggle();
      }
    })
  })

});

function handleSubmit() {
  $( '.order-form' ).slideToggle();
  $( '.loader' ).show();

  $.ajax({
    url: '/charge',
    type: 'post',
    data: $( '#orderForm' ).serialize(),
    success: function() {
      $( '.loader' ).hide();
      $( '.thank-you' ).slideToggle();
      gtag('event', 'purchase');
    },
    error: function() {
      $( '.loader' ).hide();
      $( '.error' ).slideToggle();
    }
  })
}