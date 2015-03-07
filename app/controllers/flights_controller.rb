class FlightsController < ApplicationController
  layout 'application', except: :confirmation

  def index
  end

  def new
    @flight = Flight.new
  end

end
