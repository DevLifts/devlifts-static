;(function($) {
  $(document).ready(function() {
    // Mobile Menu Icon Handler
    $('.menu-icon').click(function(e) {
      e.preventDefault()
      $(this).toggleClass('open')
      $('.nav-container').toggleClass('open')
    })

    // FAQ Show/Hide
    $('.question').click(function() {
      $(this)
        .parent()
        .find(' .answer ')
        .slideToggle()
    })

    // Order Submission
    $('#orderForm').submit(function(e) {
      e.preventDefault()
      $('.order-form').slideToggle()
      $('.loader').show()

      $.ajax({
        url: 'https://hooks.zapier.com/hooks/catch/1776164/sgvxxf/',
        type: 'post',
        data: $('#orderForm').serialize(),
        success: function() {
          $('.loader').hide()
          $('.thank-you').slideToggle()
          gtag('event', 'purchase')
        },
        error: function() {
          $('.loader').hide()
          $('.error').slideToggle()
        }
      })
    })

    // Contact Form
    $('#contactForm').submit(function(e) {
      e.preventDefault()

      var message = $('#message').val()

      $('.contact-form').slideToggle()
      $('.loader').show()

      $.ajax({
        url: 'https://hooks.zapier.com/hooks/catch/1776164/sr7f60/',
        type: 'post',
        data: $('#contactForm').serialize(),
        success: function() {
          $('.loader').hide()
          $('.thank-you').slideToggle()
        },
        error: function() {
          $('.loader').hide()
          $('#typedMessage').html('<strong>' + message + '</strong>')
          $('.error').slideToggle()
        }
      })
    })
  })
})(window.jQuery)
