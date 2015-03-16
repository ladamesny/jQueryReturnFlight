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


// Combination of level 1 and level 2 modifications
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

};

function Tour(el) {
  var tour = this;
  this.el = el;
  this.fetchPhotos = function() {
    $.ajax('/assets/photo.html', {
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
};

// Level 5 - plugins

$.fn.priceify = function (options) {
  this.each(function() {
    var settings = $.extend({
      days: 3,
      vacation: $(this),
      price: $(this).data('price')
       }, options);
    var show = function() {
      var details = $('<p>Book '+ settings.days +' days for $'+(settings.days * settings.price)+ '</p>');
      $(this).hide();
      settings.vacation.append(details);
    };
    var remove = function() {
      settings.vacation.hide().off('.priceify');
    };
    settings.vacation.on('click.priceify','button', show);
    settings.vacation.on('show.priceify', show);
    settings.vacation.on('click.priceify','.remove-vacation', remove);
  });
};

$(document).ready(function(){

// Level 2 modifications
  var paris = new Confirmation($('#paris'));
  var london = new Confirmation($('#london'));
  var hawaii = new Confirmation($('#hawaii'));

  var parisPics = new Tour($('#parisPics'));
  var london = new Tour($('#londonPics'));
  var hawaii = new Tour($('#hawaiiPics'));

// Level 3 functions
  $('form').on('submit', function(e) {
      e.preventDefault();
      var form = $(this);
    $.ajax( form.attr('action'), {
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

// Level 4 functions - Utility Methos $.getJSON, $.each, $.map, .detach()
  $('button.show_fav').on('click', function(){
    $.ajax('/flights/favorite', {
      contentType: 'application/json',
      dataType: 'json',
      success: function(result) {
        $.each(result, function(index, city) {
          var favorite = $('.favorite-' + index);
          favorite.find('p').html(city.name);
          favorite.find('img').attr('src', city.image);
        })
      }
    });
  });

  $('button.update-status').on('click', function(){
    $.getJSON('/flights/status', function(result) {
      var statusElements = $.map(result, function(status, index) {
        var listItem = $('<li></li>')
        $('<h3>'+status.name+'</h3>').appendTo(listItem);
        $('<p>'+status.status+'</p>').appendTo(listItem);
        return listItem;
      });
      $('.status-list').detach().html(statusElements).appendTo('.status')
    });
  });

  //Level 5 Advanced Handlers

  // var showPrice = function() {
  //   var vacation = $(this).closest('.vacation');
  //   var price = vacation.data('price');
  //   var details = $('<p>Book 3 days for $'+(3 * price)+ '</p>');
  //   vacation.append(details);
  // };

  // $('.vacation').on('click.price', 'button', showPrice);
  // $('.vacation').on('show.price', showPrice);

  // $('.show-prices').on('click', function(event){
  //   event.preventDefault();
  //   $('.vacation').trigger('show.price')
  // });

  //Level 5.2 Plugins

  $('.vacation').priceify();

  $('.show-prices').on('click', function(event) {
    event.preventDefault();
    $('.vacation').trigger('show.priceify');
  });

});
