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

end
