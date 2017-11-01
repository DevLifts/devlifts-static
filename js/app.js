$( document ).ready( function() {
  $( '.menu-icon' ).click( function(e) {
    e.preventDefault();
    $( this ).toggleClass( 'open' );
    $('.nav-container').toggleClass( 'open' );
  });
});