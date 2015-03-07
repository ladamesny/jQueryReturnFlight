// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require jquery-ui
//= require turbolinks
//= require_tree .

function Confirmation(el) {
  this.el = el;
  this.ticket = this.el.find('.ticket');
  this.boardingPass = this.el.find('.boarding-pass');
  var confirmation = this;

  this.loadConfirmation = function() {
    $.ajax('/assets/confirmation.html', {
        timeout: 3000,
        context: confirmation,
        success: function(response) {
          this.ticket.html(response).fadeIn();
        },
        error: function(request, errorType, errorMessage) {
          alert('Error: ' + errorType + ' with message: ' + errorMessage)
        },
        beforeSend: function() {
          this.el.addClass('is-loading');
        },
        complete: function(){
          this.el.removeClass('is-loading');
          }
      });
    }

  this.showBoardingPass = function(e){
      e.preventDefault();
      $(this).fadeOut();
      confirmation.el.find('.boarding-pass').fadeIn();
    }
  this.el.on('click', 'button.flight-details', this.loadConfirmation);
  this.el.on('click','.view-boarding-pass', this.showBoardingPass);

}

function Tour(el) {
  var tour = this;
  this.el = el;
  this.fetchPhotos = function() {
    $.ajax('/photos.html', {
      data: {location: tour.el.data('location')},
      context: tour,
      success: function(response) {
        this.el.find('.photos').html(response).fadeIn();
      },
      error: function() {
        this.el.find('.photos').html('<li>There was a problem fetching the latest photos. Please try again.</li>');
      },
      timeout: 3000,
      beforeSend: function() {
        this.el.addClass('is-fetching');
      },
      complete: function() {
        this.el.removeClass('is-fetching');
      }
    });
  }
  this.el.on('click', 'button.pics', this.fetchPhotos);
}

$(document).ready(function(){

  var paris = new Confirmation($('#paris'));
  var london = new Confirmation($('#london'));
  var hawaii = new Confirmation($('#hawaii'));

  $('form').on('submit', function(e) {
      e.preventDefault();
      var form = $(this);
    $.ajax( '/flights/book.json', {
        type: 'GET',
        data: form.serialize(),
        dataType: 'json',
        success: function(result) {
          var msg = $('<p></p>');
          msg.append('Your vacation to '+result.destination);
          msg.append(' has been booked for '+result.price);
          msg.append(' for  '+result.days);
          msg.append(' nights. Confirmation #'+result.confirmation);
          form.remove();
          $('#vacation').hide().html(msg).fadeIn();
        },
        contentType: 'application/json'
    });
  });
});
