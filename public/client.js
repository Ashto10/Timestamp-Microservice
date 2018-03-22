$(function() {
  $('form').submit(function(event) {
    event.preventDefault()
    window.location.href += $('input').val()
  })
})
