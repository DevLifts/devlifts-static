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

  // Order Submission
  $( '#orderForm' ).submit( function(e) {
    e.preventDefault();
    $( '.order-form' ).slideToggle();
    $( '.loader' ).show();


    $.ajax({
      url: 'https://hooks.zapier.com/hooks/catch/1776164/i716nq/',
      type: 'post',
      data: $( '#orderForm' ).serialize(),
      success: function() {
        $( '.loader' ).hide();
        $( '.thank-you' ).slideToggle();
        decrementDiscounts();
      },
      error: function() {
        $( '.loader' ).hide();
        $( '.error' ).slideToggle();
      }
    });
  });

});