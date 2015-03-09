class FlightsController < ApplicationController
  layout 'application', except: :confirmation

  def index
  end

  def new
    @flight = Flight.new
  end

  def book
    book = {
      destination: 'Paris, France',
      price: '1,399.99',
      days: '4',
      confirmation: '3dfeab4'
    }
    respond_to do |format|
        format.json { render json: book}
      end
  end

  def favorite
    favorite = [
      {
      image: '/assets/ticket.jpg',
      name: 'Paris, France!',
      },
      {
      image: '/assets/ticket.jpg',
      name: 'London, Uk',
      },
      {
      image: '/assets/ticket.jpg',
      name: 'Madrid, Spain',
      }
    ]

    respond_to do |format|
        format.json { render json: favorite}
      end
  end

  def status
    statuses = [
      {
      name: 'JFK - New York, NY',
      status: 'Departing Location',
      },
      {
      name: 'DEN - Denver, CO',
      status: 'Connecting Flight',
      },
      {
      name: 'SFO - San Fransisco, CA',
      status: 'Destination',
      }
    ]

    respond_to do |format|
        format.json { render json: statuses}
      end
  end

end
